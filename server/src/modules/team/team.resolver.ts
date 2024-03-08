import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CurrentUser, DisableDefaultGuard } from '../auth/auth.decorator'
import {
    CreateTeamInputType,
    DeleteTeamInputType,
    EditTeamInputType,
    EditTeamsInputType,
    GetTeamInput,
    GetTeamsInput,
    PaginatedTeamResponse,
    PublicTeamsForOrganizationArgs,
    PublicTeamType,
    TeamsSortInputType,
    TeamType,
} from './team.type'
import { PaginatedInputType } from '../utils/pagination.type'
import { TeamPolicy } from '../utils/policy/team.policy'
import { PolicyAction } from '../utils/policy/policy'
import { TeamRepository } from './team.repository'
import { TeamService } from './team.service'
import { EmployeeRepository } from '../employee/employee.repository'
import { OrganizationRepository } from '../organization/organization.repository'
import { PostalCodeAreaRepository } from '../postalCodeArea/postalCodeArea.repository'
import { StudentRepository } from '../student/student.repository'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

@Resolver(TeamType)
export class TeamResolver {
    public constructor(
        private teamRepository: TeamRepository,
        private teamPolicy: TeamPolicy,
        private teamService: TeamService,
        private employeeRepository: EmployeeRepository,
        private organizationRepository: OrganizationRepository,
        private postalCodeAreaRepository: PostalCodeAreaRepository,
        private studentRepository: StudentRepository
    ) {}
    @Query(() => TeamType)
    public async team(@CurrentUser() user: UserWithCurrentEmployee, @Args() input: GetTeamInput) {
        await this.teamPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            teamId: input.teamId,
        })

        return this.teamRepository.findOneOrFail(input.teamId)
    }

    @Query(() => [PublicTeamType])
    @DisableDefaultGuard()
    public async publicTeamsForOrganization(@Args() { organizationId }: PublicTeamsForOrganizationArgs) {
        return this.teamService.getPublicTeamsForPublicOrganizaiton(organizationId)
    }

    @Query(() => PaginatedTeamResponse)
    public async teams(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') paginationArgs: PaginatedInputType,
        @Args() input: GetTeamsInput,
        @Args('sort', { nullable: true }) sort?: TeamsSortInputType
    ) {
        return this.teamService.getTeams(user, paginationArgs, input, sort)
    }

    @Mutation(() => TeamType)
    public async createTeam(@CurrentUser() user: UserWithCurrentEmployee, @Args('input') input: CreateTeamInputType) {
        await this.teamPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, {
            targetOrganizationId: input.organizationId,
        })

        return this.teamService.createTeam(input)
    }

    @Mutation(() => TeamType)
    public async editTeam(@CurrentUser() user: UserWithCurrentEmployee, @Args('input') input: EditTeamInputType) {
        await this.teamPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, {
            teamId: input.teamId,
        })

        return this.teamService.editTeam(input)
    }

    @Mutation(() => [TeamType])
    public async editTeams(@CurrentUser() user: UserWithCurrentEmployee, @Args('input') input: EditTeamsInputType) {
        await this.teamPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, {
            teamIds: input.teams.map(team => team.teamId),
        })

        return this.teamService.editTeams(input.teams, user.currentEmployee.organizationId)
    }

    @Mutation(() => Boolean)
    public async deleteTeam(@CurrentUser() user: UserWithCurrentEmployee, @Args('input') input: DeleteTeamInputType) {
        await this.teamPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, {
            teamId: input.id,
        })

        return this.teamService.deleteTeam(input.id)
    }

    @ResolveField()
    public members(@Parent() team: TeamType) {
        return this.employeeRepository.getMembersForTeam(team.id)
    }

    @ResolveField()
    public parentOrganization(@Parent() team: TeamType) {
        return this.organizationRepository.findOne(team.parentOrganization)
    }

    @ResolveField()
    public postalCodeAreas(@Parent() team: TeamType) {
        return this.postalCodeAreaRepository.getPostalCodeAreasForTeam(team.id)
    }

    @ResolveField()
    public students(@Parent() team: TeamType) {
        return this.studentRepository.find({ team: team.id })
    }
}
