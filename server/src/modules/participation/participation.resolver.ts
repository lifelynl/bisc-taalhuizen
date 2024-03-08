import { Args, Resolver, Query, Mutation, ResolveField, Parent } from '@nestjs/graphql'
import { CurrentUser } from '../auth/auth.decorator'
import {
    CreateParticipationInputType,
    DeleteParticipationInputType,
    EditParticipationInputType,
    GetParticipationArgs,
    GetParticipationsArgs,
    PaginatedParticipationResponse,
    ParticipationType,
    StudentParticipationArgs,
    StudentParticipationSortInputType,
} from './participation.type'
import { PaginatedInputType } from '../utils/pagination.type'
import { ParticipationPolicy } from '../utils/policy/participation.policy'
import { PolicyAction } from '../utils/policy/policy'
import { ParticipationRepository } from './participation.repository'
import { ParticipationService } from './participation.service'
import { OrganizationRepository } from '../organization/organization.repository'
import { EmployeeRepository } from '../employee/employee.repository'
import { TestResultRepository } from '../testResult/testResult.repository'
import { EducationGroupRepository } from '../educationGroup/educationGroup.repository'
import { LearningNeedOutcomeRepository } from '../learningNeedOutcome/learningNeedOutcome.repository'
import { SortInput } from 'src/utils/graphql/SortingInputField'
import { LearningNeedRepository } from '../learningneed/learningneed.repository'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

@Resolver(ParticipationType)
export class ParticipationResolver {
    public constructor(
        private readonly participationRepository: ParticipationRepository,
        private readonly participationPolicy: ParticipationPolicy,
        private readonly participationServie: ParticipationService,
        private readonly organizationRepository: OrganizationRepository,
        private readonly employeeRepository: EmployeeRepository,
        private readonly educationGroupRepository: EducationGroupRepository,
        private readonly testResultRepository: TestResultRepository,
        private readonly learningNeedOutcomeRepository: LearningNeedOutcomeRepository,
        private readonly learningNeedRepository: LearningNeedRepository
    ) {}
    @Query(() => ParticipationType)
    public async participation(@CurrentUser() user: UserWithCurrentEmployee, @Args() args: GetParticipationArgs) {
        await this.participationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            paticipationId: args.participationId,
        })

        return this.participationRepository.findOneOrFail(args.participationId)
    }

    @Query(() => PaginatedParticipationResponse)
    public async participations(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') { skip, take }: PaginatedInputType,
        @Args() args: GetParticipationsArgs
    ) {
        await this.participationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            learningNeedId: args.learningNeedId,
        })

        const qb = this.participationRepository.qb().where({ learningNeed: args.learningNeedId })

        return this.participationRepository.queryPaginated(qb, take, skip)
    }

    @Query(() => PaginatedParticipationResponse)
    public async studentParticipations(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') { skip, take }: PaginatedInputType,
        @Args() { studentId }: StudentParticipationArgs,
        @Args('sort', { nullable: true }) sort?: StudentParticipationSortInputType
    ) {
        await this.participationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { studentId })

        const qb = this.participationRepository.qb().where({ learningNeed: { student: studentId } })

        if (sort?.learningNeedDescription) {
            qb.orderBy({ learningNeed: { description: sort.learningNeedDescription } })
        } else {
            qb.orderBy({ learningNeed: { description: SortInput.ASC } })
        }

        return this.participationRepository.queryPaginated(qb, take, skip)
    }

    @Mutation(() => ParticipationType)
    public async createParticipation(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') args: CreateParticipationInputType
    ) {
        await this.participationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, {
            learningNeedId: args.learningNeedId,
            studentIdForNewLearningNeed: args.newLearningNeed?.student,
            providerId: args.provider,
        })

        return this.participationServie.createParticipation(args, user)
    }

    @Mutation(() => ParticipationType)
    public async editParticipation(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') args: EditParticipationInputType
    ) {
        await this.participationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, {
            paticipationId: args.id,
        })

        return this.participationServie.editParticipation(args, user)
    }

    @Mutation(() => Boolean)
    public async deleteParticipation(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') args: DeleteParticipationInputType
    ) {
        await this.participationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, {
            paticipationId: args.id,
        })

        return this.participationServie.deleteParticipation(args.id)
    }

    @ResolveField()
    public async provider(@Parent() participation: ParticipationType) {
        return participation.provider ? this.organizationRepository.findOne(participation.provider) : null
    }

    @ResolveField()
    public async mentor(@Parent() participation: ParticipationType) {
        return participation.mentor ? this.employeeRepository.findOneOrFail(participation.mentor) : null
    }

    @ResolveField()
    public async testResult(@Parent() participation: ParticipationType) {
        return this.testResultRepository.findOne({ participation: participation.id })
    }

    @ResolveField()
    public async educationGroup(@Parent() participation: ParticipationType) {
        if (participation.educationGroup) {
            return this.educationGroupRepository.findOne(participation.educationGroup)
        }
    }

    @ResolveField()
    public async offerLearningNeedOutcome(@Parent() participation: ParticipationType) {
        return this.learningNeedOutcomeRepository.findOne({ participation: participation.id })
    }

    @ResolveField()
    public async learningNeed(@Parent() participation: ParticipationType) {
        return this.learningNeedRepository.getByParticipation(participation.id)
    }
}
