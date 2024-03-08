import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../auth/auth.decorator'
import { LearningNeedOutcomeRepository } from '../learningNeedOutcome/learningNeedOutcome.repository'
import { ParticipationRepository } from '../participation/participation.repository'
import { StudentRepository } from '../student/student.repository'
import { PaginatedInputType } from '../utils/pagination.type'
import { LearningNeedService } from './learningneed.service'
import {
    CreateLearningNeedInputType,
    EditLearningNeedInputType,
    LearningNeedsSortInputType,
    LearningNeedType,
    PaginatedLearningNeedResponse,
} from './learningneed.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

@Resolver(LearningNeedType)
export class LearningNeedResolver {
    public constructor(
        private readonly learningNeedService: LearningNeedService,
        private readonly studentRepository: StudentRepository,
        private readonly participationRespository: ParticipationRepository,
        private readonly learningNeedOutcomeRepository: LearningNeedOutcomeRepository
    ) {}

    @Query(() => PaginatedLearningNeedResponse)
    public async learningNeeds(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') paginationArgs: PaginatedInputType,
        @Args('studentId') studentId: string,
        @Args('sort', { nullable: true }) sort?: LearningNeedsSortInputType
    ) {
        return this.learningNeedService.getLearningNeeds(user, studentId, paginationArgs, sort)
    }

    @Query(() => LearningNeedType)
    public async learningNeed(@CurrentUser() user: UserWithCurrentEmployee, @Args('id') id: string) {
        return this.learningNeedService.getLearningNeed(user, id)
    }

    @Mutation(() => LearningNeedType)
    public async createLearningNeed(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: CreateLearningNeedInputType
    ) {
        return this.learningNeedService.createLearningNeed(user, input)
    }

    @Mutation(() => LearningNeedType)
    public async editLearningNeed(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: EditLearningNeedInputType
    ) {
        return this.learningNeedService.editLearningNeed(user, input)
    }

    @Mutation(() => Boolean)
    public async deleteLearningNeed(@CurrentUser() user: UserWithCurrentEmployee, @Args('id') id: string) {
        return this.learningNeedService.deleteLearningNeed(user, id)
    }

    @ResolveField()
    public async student(@Parent() learningNeed: LearningNeedType) {
        return this.studentRepository.findOne({ learningNeeds: learningNeed.id })
    }

    @ResolveField()
    public async participations(@Parent() learningNeed: LearningNeedType) {
        return this.participationRespository.find({ learningNeed: learningNeed.id })
    }

    @ResolveField()
    public async desiredLearningNeedOutcome(@Parent() learningNeed: LearningNeedType) {
        return this.learningNeedOutcomeRepository.findOne({ learningNeed: learningNeed.id })
    }

    @ResolveField()
    public async createdByOrganization(@Parent() { id }: LearningNeedType) {
        return this.learningNeedService.getCreatedByOrganization(id)
    }
}
