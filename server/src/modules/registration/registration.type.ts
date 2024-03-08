import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { IsOptional, Max, Min } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { CreatePersonInputType, PersonType } from '../person/person.type'
import {
    RegistrationStatus,
    IntakeFoundVia,
    IntakeNetwork,
    IntakeParticipationLadder,
    DutchNTType,
    DutchNT2Level,
    SpeakingLevel,
    DesiredLearningMethod,
    IntakeDayTimeActivities,
    ReadingTestResult,
    WritingTestResult,
    ReferringOrganizationEnum,
} from './registration.entity'
import {
    CreateLearningNeedOutcomeInputType,
    CreateOrEditLearningNeedOutcomeInputType,
    LearningNeedOutcomeType,
} from '../learningNeedOutcome/learningNeedOutCome.type'

@ObjectType()
export class RegistrationType extends BaseEntityObjectType {
    @Field(() => ReferringOrganizationEnum, { nullable: true })
    public referringOrganization?: ReferringOrganizationEnum

    @Field({ nullable: true })
    public referringOrganizationOther?: string

    @Field(() => String, { nullable: true })
    public referringTeam?: string

    @Field(() => PersonType, { nullable: true })
    public referringPerson?: PersonType

    @Field({ nullable: true })
    public remarks?: string

    @Field(() => RegistrationStatus)
    public status: RegistrationStatus

    @Field()
    public registeredPublicly: boolean

    @Field(() => IntakeFoundVia, { nullable: true })
    public foundVia?: IntakeFoundVia

    @Field({ nullable: true })
    public foundViaOther?: string

    @Field({ nullable: true })
    public wentToLanguageHouseBefore?: boolean

    @Field({ nullable: true })
    public wentToLanguageHouseBeforeReason?: string

    @Field(() => Int, { nullable: true })
    public wentToLanguageHouseBeforeYear?: number

    @Field(() => [IntakeNetwork], { nullable: true })
    public network?: IntakeNetwork[]

    @Field(() => IntakeParticipationLadder, { nullable: true })
    public participationLadder?: IntakeParticipationLadder

    @Field(() => DutchNTType, { nullable: true })
    public dutchNTLevel?: DutchNTType

    @Field(() => Int, { nullable: true })
    public inNetherlandsSinceYear?: number

    @Field({ nullable: true })
    public languageInDailyLife?: string

    @Field({ nullable: true })
    public knowsLatinAlphabet?: boolean

    @Field(() => DutchNT2Level, { nullable: true })
    public lastKnownLevel?: DutchNT2Level

    @Field(() => SpeakingLevel, { nullable: true })
    public speakingLevel?: SpeakingLevel

    @Field({ nullable: true })
    public trainedForJob?: string

    @Field({ nullable: true })
    public lastJob?: string

    @Field(() => LearningNeedOutcomeType, { nullable: true })
    public desiredLearningNeedOutcome?: LearningNeedOutcomeType

    @Field({ nullable: true })
    public desiredSkillsOther?: string

    @Field({ nullable: true })
    public hasTriedThisBefore?: boolean

    @Field({ nullable: true })
    public hasTriedThisBeforeExplanation?: string

    @Field({ nullable: true })
    public whyWantTheseskills?: string

    @Field({ nullable: true })
    public whyWantThisNow?: string

    @Field(() => [DesiredLearningMethod], { nullable: true })
    public desiredLearningMethod?: DesiredLearningMethod[]

    @Field(() => [IntakeDayTimeActivities], { nullable: true })
    public dayTimeActivities?: IntakeDayTimeActivities[]

    @Field({ nullable: true })
    public dayTimeActivitiesOther?: string

    @Field(() => ReadingTestResult, { nullable: true })
    public readingTestResult?: ReadingTestResult

    @Field(() => WritingTestResult, { nullable: true })
    public writingTestResult?: WritingTestResult

    @Field({ nullable: true })
    public selfRegistered?: boolean
}

@InputType()
export class OptionalRegistrationInputType {
    @Field(() => ReferringOrganizationEnum, { nullable: true })
    @IsOptional()
    public referringOrganization?: ReferringOrganizationEnum

    @Field({ nullable: true })
    @IsOptional()
    public referringOrganizationOther?: string

    @Field({ nullable: true })
    @IsOptional()
    public referringTeam?: string

    @Field(() => CreatePersonInputType, { nullable: true })
    @IsOptional()
    public referringPerson?: CreatePersonInputType

    @Field({ nullable: true })
    @IsOptional()
    public remarks?: string

    @Field(() => IntakeFoundVia, { nullable: true })
    @IsOptional()
    public foundVia?: IntakeFoundVia

    @Field({ nullable: true })
    @IsOptional()
    public foundViaOther?: string

    @Field({ nullable: true })
    @IsOptional()
    public wentToLanguageHouseBefore?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public wentToLanguageHouseBeforeReason?: string

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @Min(1920)
    @Max(new Date().getFullYear())
    public wentToLanguageHouseBeforeYear?: number

    @Field(() => [IntakeNetwork], { nullable: true })
    @IsOptional()
    public network?: IntakeNetwork[]

    @Field(() => IntakeParticipationLadder, { nullable: true })
    @IsOptional()
    public participationLadder?: IntakeParticipationLadder

    @Field(() => DutchNTType, { nullable: true })
    @IsOptional()
    public dutchNTLevel?: DutchNTType

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @Min(1920)
    @Max(new Date().getFullYear())
    public inNetherlandsSinceYear?: number

    @Field({ nullable: true })
    @IsOptional()
    public languageInDailyLife?: string

    @Field({ nullable: true })
    @IsOptional()
    public knowsLatinAlphabet?: boolean

    @Field(() => DutchNT2Level, { nullable: true })
    @IsOptional()
    public lastKnownLevel?: DutchNT2Level

    @Field(() => SpeakingLevel, { nullable: true })
    @IsOptional()
    public speakingLevel?: SpeakingLevel

    @Field({ nullable: true })
    @IsOptional()
    public trainedForJob?: string

    @Field({ nullable: true })
    @IsOptional()
    public lastJob?: string

    @Field({ nullable: true })
    @IsOptional()
    public desiredSkillsOther?: string

    @Field({ nullable: true })
    @IsOptional()
    public hasTriedThisBefore?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public hasTriedThisBeforeExplanation?: string

    @Field({ nullable: true })
    @IsOptional()
    public whyWantTheseskills?: string

    @Field({ nullable: true })
    @IsOptional()
    public whyWantThisNow?: string

    @Field(() => [DesiredLearningMethod], { nullable: true })
    @IsOptional()
    public desiredLearningMethod?: DesiredLearningMethod[]

    @Field(() => [IntakeDayTimeActivities], { nullable: true })
    @IsOptional()
    public dayTimeActivities?: IntakeDayTimeActivities[]

    @Field({ nullable: true })
    @IsOptional()
    public dayTimeActivitiesOther?: string

    @Field(() => ReadingTestResult, { nullable: true })
    @IsOptional()
    public readingTestResult?: ReadingTestResult

    @Field(() => WritingTestResult, { nullable: true })
    @IsOptional()
    public writingTestResult?: WritingTestResult
}

@InputType()
export class CreateRegistrationInputType extends OptionalRegistrationInputType {
    @Field(() => CreateLearningNeedOutcomeInputType, { nullable: true })
    @IsOptional()
    public desiredLearningNeedOutcome?: CreateLearningNeedOutcomeInputType
}

@InputType()
export class EditRegistrationInputType extends OptionalRegistrationInputType {
    @Field(() => CreateOrEditLearningNeedOutcomeInputType, { nullable: true })
    @IsOptional()
    public desiredLearningNeedOutcome?: CreateOrEditLearningNeedOutcomeInputType
}
