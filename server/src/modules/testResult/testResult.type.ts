import { ArgsType, Field, ID, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsOptional, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { dateMiddleware } from 'src/utils/graphql/DateMiddleware'
import {
    CreateLearningNeedOutcomeInputType,
    CreateOrEditLearningNeedOutcomeInputType,
    LearningNeedOutcomeType,
} from '../learningNeedOutcome/learningNeedOutCome.type'
import { ParticipationEndReason, ParticipationOutFlow } from '../participation/participation.entity'
import { ParticipationType } from '../participation/participation.type'
import paginationType from '../utils/pagination.type'
import { AchievedResultResponse, DidAchieveResultResponse, UnsuccessfulResultReasonResponse } from './testResult.entity'

registerEnumType(DidAchieveResultResponse, { name: 'DidAchieveResultResponse' })
registerEnumType(AchievedResultResponse, { name: 'AchievedResultResponse' })
registerEnumType(UnsuccessfulResultReasonResponse, { name: 'UnsuccessfulResultReasonResponse' })

@ObjectType()
export class TestResultType extends BaseEntityObjectType {
    @Field(() => String, { nullable: true, middleware: [dateMiddleware] })
    public examDate?: Date

    @Field(() => String, { nullable: true })
    public memo?: string

    @Field(() => String, { nullable: true })
    public usedExam?: string

    @Field(() => LearningNeedOutcomeType)
    public learningNeedOutcome: LearningNeedOutcomeType

    @Field(() => ParticipationType)
    public participation: ParticipationType

    @Field(() => DidAchieveResultResponse, { nullable: true })
    public didAchieveResultResponse?: DidAchieveResultResponse

    @Field(() => AchievedResultResponse, { nullable: true })
    public achievedResultResponse?: AchievedResultResponse

    @Field(() => UnsuccessfulResultReasonResponse, { nullable: true })
    public unsuccessfulResultReasonResponse?: UnsuccessfulResultReasonResponse

    @Field({ nullable: true })
    public achievedResultResponseOther?: string
}

@ObjectType()
export class PaginatedTestResultResponse extends paginationType(TestResultType) {}

@InputType()
export class CreateTestResultInputType {
    @Field({ nullable: true })
    @IsOptional()
    public endParticipation: Date

    @Field(() => ParticipationEndReason, { nullable: true })
    @IsOptional()
    public reasonEndParticipation: ParticipationEndReason

    @Field(() => ParticipationOutFlow, { nullable: true })
    @IsOptional()
    public outFlowParticipation?: ParticipationOutFlow

    @Field(() => String, { nullable: true })
    @IsOptional()
    public outFlowReasonOther: string | undefined

    @Field(() => CreateLearningNeedOutcomeInputType)
    public learningNeedOutcome: CreateLearningNeedOutcomeInputType

    @Field({ nullable: true })
    @IsOptional()
    public examDate?: Date

    @Field({ nullable: true })
    @IsOptional()
    public memo?: string

    @Field({ nullable: true })
    @IsOptional()
    public usedExam?: string

    @Field(() => ID)
    @IsUUID()
    public participationId: string

    @Field(() => DidAchieveResultResponse, { nullable: true })
    @IsOptional()
    public didAchieveResultResponse?: DidAchieveResultResponse

    @Field(() => AchievedResultResponse, { nullable: true })
    @IsOptional()
    public achievedResultResponse?: AchievedResultResponse

    @Field(() => UnsuccessfulResultReasonResponse, { nullable: true })
    @IsOptional()
    public unsuccessfulResultReasonResponse?: UnsuccessfulResultReasonResponse

    @Field({ nullable: true })
    @IsOptional()
    public achievedResultResponseOther?: string
}

@InputType()
export class EditTestResultInputType {
    @Field(() => ID)
    @IsUUID()
    public id: string

    @Field({ nullable: true })
    @IsOptional()
    public endParticipation: Date

    @Field(() => ParticipationEndReason, { nullable: true })
    @IsOptional()
    public reasonEndParticipation: ParticipationEndReason

    @Field(() => ParticipationOutFlow, { nullable: true })
    @IsOptional()
    public outFlowParticipation?: ParticipationOutFlow

    @Field(() => String, { nullable: true })
    @IsOptional()
    public outFlowReasonOther: string | undefined

    @Field({ nullable: true })
    @IsOptional()
    public examDate?: Date

    @Field(() => String, { nullable: true })
    @IsOptional()
    public memo?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public usedExam?: string

    @Field({ nullable: true })
    @IsOptional()
    public learningNeedOutcome?: CreateOrEditLearningNeedOutcomeInputType

    @Field(() => DidAchieveResultResponse, { nullable: true })
    @IsOptional()
    public didAchieveResultResponse?: DidAchieveResultResponse

    @Field(() => UnsuccessfulResultReasonResponse, { nullable: true })
    @IsOptional()
    public unsuccessfulResultReasonResponse?: UnsuccessfulResultReasonResponse

    @Field(() => AchievedResultResponse, { nullable: true })
    @IsOptional()
    public achievedResultResponse?: AchievedResultResponse

    @Field({ nullable: true })
    @IsOptional()
    public achievedResultResponseOther?: string
}

@InputType()
export class DeleteTestResultInputType {
    @Field(() => ID)
    @IsUUID()
    public id: string
}

@ArgsType()
export class GetTestResultArgs {
    @Field()
    @IsUUID()
    public testResultId: string
}

@ArgsType()
export class GetTestResultsArgs {
    @Field()
    @IsUUID()
    public participationId: string
}
