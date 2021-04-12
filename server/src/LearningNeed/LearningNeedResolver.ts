import { UnauthorizedException } from '@nestjs/common'
import { Resolver, Query, Args, Mutation, Field, registerEnumType, ArgsType, ResolveField } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { StudentService } from 'src/Student/services/StudentService'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { ContextUser } from 'src/User/entities/UserEntity'
import { CreateLearningNeedService } from './services/CreateLearningNeedService'
import { LearningNeedPolicyService } from './services/LearningNeedPolicyService'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedService,
    LearningNeedTopicEnum,
} from './services/LearningNeedService'
import { CreateLearningNeedInputType, UpdateLearningNeedInputType } from './types/CreateLearningNeedInputType'
import { LearningNeedType } from './types/LearningNeedType'

registerEnumType(LearningNeedApplicationEnum, { name: 'LearningNeedApplicationEnum' })
registerEnumType(LearningNeedLevelEnum, { name: 'LearningNeedLevelEnum' })
registerEnumType(LearningNeedOfferDifferenceEnum, { name: 'LearningNeedOfferDifferenceEnum' })
registerEnumType(LearningNeedTopicEnum, { name: 'LearningNeedTopicEnum' })

@ArgsType()
class LearningNeedsArgs {
    @Field()
    @IsUrl()
    public studentId!: string
}

@Resolver(() => LearningNeedType)
export class LearningNeedResolver {
    public constructor(
        private createLearningNeedService: CreateLearningNeedService,
        private learningNeedService: LearningNeedService,
        private learningNeedPolicyService: LearningNeedPolicyService,
        private studentService: StudentService
    ) {}

    @Query(() => [LearningNeedType])
    public async learningNeeds(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: LearningNeedsArgs
    ): Promise<Omit<LearningNeedType, 'participations'>[]> {
        const student = await this.studentService.findByStudentId(args.studentId)

        const isAuthorized = this.learningNeedPolicyService.canListForStudent(contextUser, student)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.learningNeedService.findByParticipantId(args.studentId)
    }

    @Mutation(() => LearningNeedType)
    public async createLearningNeed(
        @CurrentUser() contextUser: ContextUser,
        @Args('input') input: CreateLearningNeedInputType
    ): Promise<Omit<LearningNeedType, 'participations'>> {
        const student = await this.studentService.findByStudentId(input.studentId)

        const isAuthorized = this.learningNeedPolicyService.canCreateForStudent(contextUser, student)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.createLearningNeedService.createLearingNeed(input)
    }

    @Mutation(() => LearningNeedType)
    public async updateLearningNeed(@Args('input') input: UpdateLearningNeedInputType) {
        return undefined
    }

    @Mutation(() => Boolean)
    public async deleteLearningNeed(@Args('learningNeedId') learningNeedId: string) {
        return undefined
    }

    @Query(() => LearningNeedType)
    public async learningNeed(@Args('learningNeedId') learningNeedId: string) {
        return undefined
    }

    // Field resolvers
    @ResolveField()
    public participations() {
        return []
    }
}
