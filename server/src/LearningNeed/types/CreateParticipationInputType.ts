import { Field, Float, InputType, registerEnumType } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedTopicEnum,
} from '../services/LearningNeedService'
import {
    CreateParticipationInput,
    ParticipationGroupFormationEnum,
    ParticipationOfferCourseEnum,
} from '../services/ParticipationService'

@InputType()
class BaseParticipationInputType {
    @Field(() => String, { nullable: true })
    public aanbiederId?: string | null

    @Field(() => String, { nullable: true })
    public aanbiederName?: string | null

    @Field(() => String, { nullable: true })
    public aanbiederNote?: string | null

    @Field(() => String, { nullable: true })
    public offerName?: string | null

    @Field(() => ParticipationOfferCourseEnum, { nullable: true })
    public offerCourse?: ParticipationOfferCourseEnum | null

    @Field(() => String, { nullable: true })
    public outComesGoal?: string | null

    @Field(() => LearningNeedTopicEnum, { nullable: true })
    public outComesTopic?: LearningNeedTopicEnum | null

    @Field(() => String, { nullable: true })
    public outComesTopicOther?: string | null

    @Field(() => LearningNeedApplicationEnum, { nullable: true })
    public outComesApplication?: LearningNeedApplicationEnum | null

    @Field(() => String, { nullable: true })
    public outComesApplicationOther?: string | null

    @Field(() => LearningNeedLevelEnum, { nullable: true })
    public outComesLevel?: LearningNeedLevelEnum | null

    @Field(() => String, { nullable: true })
    public outComesLevelOther?: string | null

    @Field(() => Boolean, { nullable: true })
    public detailsIsFormal?: boolean | null

    @Field(() => ParticipationGroupFormationEnum, { nullable: true })
    public detailsGroupFormation?: ParticipationGroupFormationEnum | null

    @Field(() => Float, { nullable: true })
    public detailsTotalClassHours?: number | null

    @Field(() => Boolean, { nullable: true })
    public detailsCertificateWillBeAwarded?: boolean | null

    @Field(() => Date, { nullable: true })
    public detailsStartDate?: Date | null

    @Field(() => Date, { nullable: true })
    public detailsEndDate?: Date | null

    @Field(() => String, { nullable: true })
    public detailsEngagements?: string | null
}

@InputType()
export class CreateParticipationInputType extends BaseParticipationInputType implements CreateParticipationInput {
    @Field()
    @IsUrl()
    public learningNeedId!: string
}

export enum ParticipationPresenceEndParticipationReasonEnum {
    MOVED = 'MOVED', // verhuisd
    JOB = 'JOB', // werk
    ILLNESS = 'ILLNESS', // ziekte/gezondheid
    DEATH = 'DEATH', // overlijden
    COMPLETED_SUCCESSFULLY = 'COMPLETED_SUCCESSFULLY', // succesvol afgerond
    FAMILY_CIRCUMSTANCES = 'FAMILY_CIRCUMSTANCES', // familie omstandigheden
    DOES_NOT_MEET_EXPECTATIONS = 'DOES_NOT_MEET_EXPECTATIONS', // voldoet niet aan verwachting deelnemer
    OTHER = 'OTHER', // overig
}

registerEnumType(ParticipationPresenceEndParticipationReasonEnum, {
    name: 'ParticipationPresenceEndParticipationReasonEnum',
})

@InputType()
export class UpdateParticipationInputType extends BaseParticipationInputType {
    @Field()
    @IsUrl()
    public participationId!: string

    @Field(() => Date, { nullable: true })
    public presenceStartDate?: Date

    @Field(() => Date, { nullable: true })
    public presenceEndDate?: Date

    @Field(() => ParticipationPresenceEndParticipationReasonEnum, { nullable: true })
    public presenceEndParticipationReason?: ParticipationPresenceEndParticipationReasonEnum
}
