import { Field, InputType } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { CreateLearningNeedInput } from '../services/CreateLearningNeedService'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedTopicEnum,
} from '../services/LearningNeedService'

@InputType()
export class CreateLearningNeedInputType implements CreateLearningNeedInput {
    @Field()
    @IsUrl()
    public studentId!: string

    @Field()
    public learningNeedDescription!: string

    @Field()
    public learningNeedMotivation!: string

    @Field()
    public desiredOutComesGoal!: string

    @Field(() => LearningNeedTopicEnum)
    public desiredOutComesTopic!: LearningNeedTopicEnum

    @Field(() => String, { nullable: true })
    public desiredOutComesTopicOther?: string | null

    @Field(() => LearningNeedApplicationEnum)
    public desiredOutComesApplication!: LearningNeedApplicationEnum

    @Field(() => String, { nullable: true })
    public desiredOutComesApplicationOther?: string | null

    @Field(() => LearningNeedLevelEnum)
    public desiredOutComesLevel!: LearningNeedLevelEnum

    @Field(() => String, { nullable: true })
    public desiredOutComesLevelOther?: string | null

    @Field()
    public offerDesiredOffer!: string

    @Field()
    public offerAdvisedOffer!: string

    @Field(() => LearningNeedOfferDifferenceEnum)
    public offerDifference!: LearningNeedOfferDifferenceEnum

    @Field(() => String, { nullable: true })
    public offerDifferenceOther?: string | null

    @Field(() => String, { nullable: true })
    public offerEngagements?: string | null
}

@InputType()
export class UpdateLearningNeedInputType {
    @Field()
    @IsUrl()
    public learningNeedId!: string

    @Field()
    public learningNeedDescription!: string

    @Field()
    public learningNeedMotivation!: string

    @Field()
    public desiredOutComesGoal!: string

    @Field(() => LearningNeedTopicEnum)
    public desiredOutComesTopic!: LearningNeedTopicEnum

    @Field(() => String, { nullable: true })
    public desiredOutComesTopicOther?: string | null

    @Field(() => LearningNeedApplicationEnum)
    public desiredOutComesApplication!: LearningNeedApplicationEnum

    @Field(() => String, { nullable: true })
    public desiredOutComesApplicationOther?: string | null

    @Field(() => LearningNeedLevelEnum)
    public desiredOutComesLevel!: LearningNeedLevelEnum

    @Field(() => String, { nullable: true })
    public desiredOutComesLevelOther?: string | null

    @Field()
    public offerDesiredOffer!: string

    @Field()
    public offerAdvisedOffer!: string

    @Field(() => LearningNeedOfferDifferenceEnum)
    public offerDifference!: LearningNeedOfferDifferenceEnum

    @Field(() => String, { nullable: true })
    public offerDifferenceOther?: string | null

    @Field(() => String, { nullable: true })
    public offerEngagements?: string | null
}
