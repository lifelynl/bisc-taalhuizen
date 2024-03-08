import { Query, Args, Resolver, Mutation, ResolveField, Parent } from '@nestjs/graphql'
import { CurrentUser } from '../auth/auth.decorator'
import { PaginatedInputType } from '../utils/pagination.type'
import {
    CreateTestResultInputType,
    DeleteTestResultInputType,
    EditTestResultInputType,
    GetTestResultArgs,
    GetTestResultsArgs,
    PaginatedTestResultResponse,
    TestResultType,
} from './testResult.type'
import { TestResultRepository } from './testResult.repository'
import { TestResultService } from './testResult.service'
import { TestResultPolicy } from '../utils/policy/testResult.policy'
import { PolicyAction } from '../utils/policy/policy'
import { LearningNeedOutcomeRepository } from '../learningNeedOutcome/learningNeedOutcome.repository'
import { ParticipationRepository } from '../participation/participation.repository'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

@Resolver(TestResultType)
export class TestResultResolver {
    public constructor(
        private readonly testResultRepository: TestResultRepository,
        private readonly participationRepository: ParticipationRepository,
        private readonly learningNeedOutcomeRepository: LearningNeedOutcomeRepository,
        private readonly testResultService: TestResultService,
        private readonly testResultPolicy: TestResultPolicy
    ) {}

    @Query(() => PaginatedTestResultResponse)
    public async testResults(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') { skip, take }: PaginatedInputType,
        @Args() args: GetTestResultsArgs
    ) {
        await this.testResultPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            participationId: args.participationId,
        })

        const qb = this.testResultRepository.qb().where({ participation: args.participationId })
        return this.testResultRepository.queryPaginated(qb, take, skip)
    }

    @Query(() => TestResultType)
    public async testResult(@CurrentUser() user: UserWithCurrentEmployee, @Args() args: GetTestResultArgs) {
        await this.testResultPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { testResultId: args.testResultId })

        return this.testResultRepository.findOneOrFail(args.testResultId)
    }

    @Mutation(() => TestResultType)
    public async createTestResult(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: CreateTestResultInputType
    ) {
        await this.testResultPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, {
            participationId: input.participationId,
        })

        return this.testResultService.createTestResult(input)
    }

    @Mutation(() => TestResultType)
    public async editTestResult(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: EditTestResultInputType
    ) {
        await this.testResultPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, { testResultId: input.id })

        return this.testResultService.editTestResult(input)
    }

    @Mutation(() => Boolean)
    public async deleteTestResult(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: DeleteTestResultInputType
    ) {
        await this.testResultPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, { testResultId: input.id })

        return this.testResultService.deleteTestResult(input.id)
    }

    @ResolveField()
    public learningNeedOutcome(@Parent() testResult: TestResultType) {
        return this.learningNeedOutcomeRepository.getForTestResultOrFail(testResult.id)
    }

    @ResolveField()
    public participation(@Parent() testResult: TestResultType) {
        return this.participationRepository.getForTestResultOrFail(testResult.id)
    }
}
