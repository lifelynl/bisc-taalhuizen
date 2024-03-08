import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { Team } from './team.entity'
import { DomainError } from '../../errors/DomainError'

export class TeamRepository extends CustomBaseRepository<Team> {
    protected readonly entityName = 'Team'

    public async getAllInOrganizationOrFail(ids: string[], organizationId: string) {
        const teams = await this.qb()
            .where({ id: { $in: ids }, parentOrganization: { id: organizationId } })
            .getResultList()

        if (!teams.length || teams.length !== ids.length || !teams.every(t => ids.includes(t.id))) {
            throw new DomainError(`one or more teams not found for organization ${organizationId}`)
        }

        return teams
    }

    public async getWithMembersAndPostalCodeAreasOrFail(teamIds: string[]) {
        if (!teamIds.length) {
            return []
        }

        const teams = await this.qb()
            .leftJoinAndSelect('members', 'members')
            .leftJoinAndSelect('postalCodeAreas', 'postalCodeAreas')
            .where({ id: { $in: teamIds } })
            .getResult()

        if (!teams || !teams.length || teams.length !== teamIds.length || !teams.every(t => teamIds.includes(t.id))) {
            throw new DomainError(`one or more teams not found`)
        }

        return teams
    }

    public async getAmountOfOtherTeamsForParentOrganization(team: Team): Promise<number> {
        return this.qb()
            .where({ parentOrganization: team.parentOrganizationId, id: { $ne: team.id } })
            .getCount()
    }
}
