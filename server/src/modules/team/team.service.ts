import { QBQueryOrderMap, QueryOrder } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { EmployeeRepository } from '../employee/employee.repository'
import { OrganizationTypeEnum } from '../organization/organization.entity'
import { OrganizationRepository } from '../organization/organization.repository'
import { PostalCodeAreaRepository } from '../postalCodeArea/postalCodeArea.repository'
import { PaginatedInputType } from '../utils/pagination.type'
import { PolicyAction } from '../utils/policy/policy'
import { TeamPolicy } from '../utils/policy/team.policy'
import { Team } from './team.entity'
import { TeamRepository } from './team.repository'
import { CreateTeamInputType, EditTeamInputType, GetTeamsInput, TeamsSortInputType } from './team.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class TeamService {
    public constructor(
        private readonly teamRepository: TeamRepository,
        private teamPolicy: TeamPolicy,
        private readonly organizationRepository: OrganizationRepository,
        private readonly employeeRepository: EmployeeRepository,
        private readonly postalCodeAreaRepository: PostalCodeAreaRepository
    ) {}

    public async getTeams(
        user: UserWithCurrentEmployee,
        { skip, take }: PaginatedInputType,
        input: GetTeamsInput,
        sort?: TeamsSortInputType
    ) {
        await this.teamPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            targetOrganizationId: input.organizationId,
        })

        const qb = this.teamRepository.qb().where({ parentOrganization: input.organizationId }).groupBy('"Team".id')

        if (input.filterForEmployeeId) {
            qb.andWhere({ members: { id: input.filterForEmployeeId } })
        }

        if (sort) {
            const { name, employeeCount } = sort
            let orderBy: QBQueryOrderMap<Team> = {}

            if (name) {
                orderBy.name = name
            }

            if (employeeCount) {
                // because of typing, we are doing this
                orderBy = { ...orderBy, 'length(members)': employeeCount }
                // this^ doesn't work yet (error: column "members" does not exist)
            }

            qb.orderBy(orderBy)
        }
        return this.teamRepository.queryPaginated(qb, take, skip)
    }

    public async createTeam(input: CreateTeamInputType) {
        const newTeam = new Team()
        newTeam.name = input.name
        newTeam.parentOrganization = await this.organizationRepository.findOneOrFail(input.organizationId)

        if (input.memberIds && input.memberIds.length) {
            await this.setMembers(newTeam, input.memberIds)
        }

        if (input.postalCodeAreaIds && input.postalCodeAreaIds.length) {
            await this.setPostalCodeAreas(newTeam, input.postalCodeAreaIds)
        }

        await this.teamRepository.persistAndFlush(newTeam)
        return newTeam
    }

    public async getPublicTeamsForPublicOrganizaiton(organizationId: string) {
        const org = await this.organizationRepository.findOne({
            id: organizationId,
            type: OrganizationTypeEnum.languageHouse,
        })
        if (!org) {
            throw new DomainError('Organization-not-found')
        }
        return this.teamRepository
            .qb()
            .where({ parentOrganization: org.id })
            .andWhere('"hiddenFromPublic" IS NOT TRUE')
            .orderBy({ name: QueryOrder.ASC })
            .getResult()
    }

    public async editTeam(input: EditTeamInputType) {
        const [team] = await this.teamRepository.getWithMembersAndPostalCodeAreasOrFail([input.teamId])

        if (input.name !== undefined) {
            team.name = input.name
        }

        if (input.memberIds !== undefined) {
            await this.checkForOrphanedMembers(team, input.memberIds)

            await this.setMembers(team, input.memberIds)
        }

        if (input.postalCodeAreaIds !== undefined) {
            await this.setPostalCodeAreas(team, input.postalCodeAreaIds)
        }

        if (input.hiddenFromPublic !== undefined) {
            team.hiddenFromPublic = input.hiddenFromPublic
        }

        await this.teamRepository.persistAndFlush(team)
        return team
    }

    public async editTeams(input: EditTeamInputType[], organizationId: string) {
        await this.throwIfAllTeamsWillBeHidden(input, organizationId)

        const ids = input.map(i => i.teamId)
        const teams = await this.teamRepository.getWithMembersAndPostalCodeAreasOrFail(ids)

        for (const team of teams) {
            const teamInput = input.find(t => t.teamId === team.id)
            if (!teamInput) {
                throw new DomainError('cannot find team input')
            }

            await this.updateTeamFields(team, teamInput)
        }

        this.teamRepository.persist(teams)
        await this.teamRepository.flush()

        return teams
    }

    private async checkForOrphanedMembers(team: Team, memberIds: string[]) {
        const existingMembers = team.members.isInitialized() ? team.members.getItems() : await team.members.loadItems()
        const membersToRemove = existingMembers.filter(m => !memberIds.includes(m.id)).map(m => m.id)

        if (!membersToRemove.length) {
            return
        }

        if (await this.employeeRepository.belongsToSingleTeam(membersToRemove)) {
            throw new DomainError('Cannot remove the last member of a team')
        }
    }

    private async setMembers(team: Team, memberIds: string[]) {
        if (memberIds.length === 0) {
            team.members.removeAll()
            return
        }

        const members = await this.employeeRepository.find({ id: memberIds, organization: team.parentOrganizationId })
        if (memberIds.length !== members.length || !members.every(e => memberIds?.includes(e.id))) {
            throw new DomainError('Invalid employeeIds for member')
        }
        team.members.set(members)
    }

    private async setPostalCodeAreas(team: Team, postalCodeAreaIds: string[]) {
        if (postalCodeAreaIds.length === 0) {
            team.postalCodeAreas.removeAll()
            return
        }

        const postalCodeAreas = await this.postalCodeAreaRepository.find({
            id: postalCodeAreaIds,
            organization: team.parentOrganization,
        })

        if (
            postalCodeAreaIds.length !== postalCodeAreas.length ||
            !postalCodeAreas.every(e => (postalCodeAreaIds?.includes(e.id) && !e.team) || e.teamId === team.id)
        ) {
            throw new DomainError('Invalid postalCodeAreas for team')
        }

        team.postalCodeAreas.set(postalCodeAreas)
    }

    private async updateTeamFields(team: Team, input: EditTeamInputType) {
        if (input.name !== undefined) {
            team.name = input.name
        }

        if (input.memberIds !== undefined) {
            await this.checkForOrphanedMembers(team, input.memberIds)

            await this.setMembers(team, input.memberIds)
        }

        if (input.postalCodeAreaIds !== undefined) {
            await this.setPostalCodeAreas(team, input.postalCodeAreaIds)
        }

        if (input.hiddenFromPublic !== undefined) {
            team.hiddenFromPublic = input.hiddenFromPublic
        }
    }

    private async throwIfAllTeamsWillBeHidden(input: EditTeamInputType[], organizationId: string) {
        const allTeams = await this.teamRepository.find({ parentOrganization: organizationId })

        for (const { id, hiddenFromPublic } of allTeams) {
            const teamToUpdate = input.find(t => t.teamId === id)

            if (hiddenFromPublic && (!teamToUpdate || teamToUpdate.hiddenFromPublic !== true)) {
                return
            }

            if (teamToUpdate?.hiddenFromPublic === false) {
                return
            }
        }

        throw new DomainError('Minimaal 1 team moet zichtbaar zijn op het online (zelf)registratie formulier.')
    }

    public async deleteTeam(teamId: string) {
        const team = await this.teamRepository.findOneOrFail(teamId)

        const amountOfOtherTeamsForParentOrganization =
            await this.teamRepository.getAmountOfOtherTeamsForParentOrganization(team)

        if (amountOfOtherTeamsForParentOrganization === 0) {
            throw new DomainError('Het taalhuis moet minstens één team bevatten.')
        }

        await this.teamRepository.removeAndFlush(team)

        return true
    }
}
