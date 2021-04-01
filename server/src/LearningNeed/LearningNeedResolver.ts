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
import { CreateLearningNeedInputType } from './types/CreateLearningNeedInputType'
import { LearningNeedType } from './types/LearningNeedType'
import { UpdateLearningNeedInputType } from './types/UpdateLearningNeedInputType'

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

@ArgsType()
class LearningNeedArgs {
    @Field()
    @IsUrl()
    public learningNeedId!: string
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

    @Query(() => LearningNeedType)
    public async learningNeed(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: LearningNeedArgs
    ): Promise<Omit<LearningNeedType, 'participations'>> {
        const learningNeed = await this.learningNeedService.findById(args.learningNeedId)

        // TODO: Add canView auth logic

        return learningNeed
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
    public async updateLearningNeed(
        @CurrentUser() contextUser: ContextUser,
        @Args('input') input: UpdateLearningNeedInputType
    ): Promise<Omit<LearningNeedType, 'participations'>> {
        const learningNeed = await this.learningNeedService.findById(input.learningNeedId)

        // TODO: Add canUpdate auth logic
        // TODO: Add update logic

        return learningNeed
    }

    @Mutation(() => Boolean)
    public async deleteLearningNeed(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: LearningNeedArgs
    ): Promise<boolean> {
        const learningNeed = await this.learningNeedService.findById(args.learningNeedId)

        // TODO: Add canDelete auth logic

        return true
    }

    // Field resolvers
    @ResolveField()
    public participations() {
        return []
    }
}
