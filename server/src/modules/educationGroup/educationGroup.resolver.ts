import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql'
import { CurrentUser } from '../auth/auth.decorator'
import {
    CreateEducationGroupInputType,
    DeleteEducationGroupInputType,
    EditEducationGroupInputType,
    EducationGroupType,
    GetEducationGroupArgs,
    GetEducationGroupsArgs,
    PaginatedEducationGroupType,
} from './educationGroup.type'
import { PaginatedInputType } from '../utils/pagination.type'
import { EducationGroupRepository } from './educationGroup.repository'
import { EducationGroupService } from './educationGroup.service'
import { EducationGroupPolicy } from '../utils/policy/educationGroup.policy'
import { PolicyAction } from '../utils/policy/policy'
import { LearningNeedOutcomeRepository } from '../learningNeedOutcome/learningNeedOutcome.repository'
import { EmployeeRepository } from '../employee/employee.repository'
import { OrganizationRepository } from '../organization/organization.repository'
import { EmployeeRole } from '../employee/employee.entity'
import { ParticipationRepository } from '../participation/participation.repository'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { DomainError } from '../../errors/DomainError'

@Resolver(EducationGroupType)
export class EducationGroupResolver {
    public constructor(
        private readonly educationGroupRepository: EducationGroupRepository,
        private readonly educationGroupPolicy: EducationGroupPolicy,
        private readonly learningNeedOutcomeRepository: LearningNeedOutcomeRepository,
        private readonly employeeRepository: EmployeeRepository,
        private readonly organizationRepository: OrganizationRepository,
        private readonly educationGroupService: EducationGroupService,
        private readonly participationRepository: ParticipationRepository
    ) {}

    @Query(() => EducationGroupType)
    public async educationGroup(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args() { educationGroupId }: GetEducationGroupArgs
    ) {
        await this.educationGroupPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { educationGroupId })

        return this.educationGroupRepository.findOneOrFail(educationGroupId)
    }

    @Query(() => PaginatedEducationGroupType)
    public async educationGroups(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') { skip, take }: PaginatedInputType,
        @Args() { organizationId, status, oneOfStatuses }: GetEducationGroupsArgs
    ) {
        await this.educationGroupPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { organizationId })

        const qb = this.educationGroupRepository.qb().where({ organization: organizationId })

        /**
         * Policy for list calls
         * Mentor/volunteer employees should only be able to see their own groups
         */
        const userEmployee = await this.employeeRepository.getForUserAndOrganization(user.id, organizationId)
        if (!userEmployee) {
            throw new DomainError('Could not find employee')
        }

        if (!userEmployee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])) {
            if (userEmployee.hasOneOfRoles([EmployeeRole.mentor, EmployeeRole.volunteer])) {
                qb.andWhere({
                    employees: userEmployee.id,
                })
            }
        }

        if (status) {
            this.educationGroupRepository.applyStatusFilter(qb, status)
        }

        if (oneOfStatuses) {
            this.educationGroupRepository.applyOneOfStatusesFilter(qb, oneOfStatuses)
        }

        return this.educationGroupRepository.queryPaginated(qb, take, skip)
    }

    @Mutation(() => EducationGroupType)
    public async createEducationGroup(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: CreateEducationGroupInputType
    ) {
        const { organizationId } = input
        await this.educationGroupPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, { organizationId })

        return this.educationGroupService.createGroup(input)
    }

    @Mutation(() => EducationGroupType)
    public async editEducationGroup(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: EditEducationGroupInputType
    ) {
        const { educationGroupId } = input
        await this.educationGroupPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, { educationGroupId })

        return this.educationGroupService.editGroup(input)
    }

    @Mutation(() => Boolean)
    public async deleteEducationGroup(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') { educationGroupId }: DeleteEducationGroupInputType
    ) {
        await this.educationGroupPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, { educationGroupId })

        return this.educationGroupService.deleteGroup(educationGroupId)
    }

    @ResolveField()
    public participantCount(@Parent() educationGroup: EducationGroupType) {
        if (typeof educationGroup.participantCount === 'number') {
            // when field is prefilled from parent query, we can just return that
            return educationGroup.participantCount
        }

        return this.participationRepository.getCountForEducationGroupId(educationGroup.id)
    }

    @ResolveField()
    public desiredLearningNeedOutcome(@Parent() educationGroup: EducationGroupType) {
        return this.learningNeedOutcomeRepository.getForEducationGroupOrFail(educationGroup.id)
    }

    @ResolveField()
    public employees(@Parent() educationGroup: EducationGroupType) {
        return this.employeeRepository.find({ educationGroups: educationGroup.id })
    }

    @ResolveField()
    public organization(@Parent() educationGroup: EducationGroupType) {
        return this.organizationRepository.getForEducationGroupOrFail(educationGroup.id)
    }
}
