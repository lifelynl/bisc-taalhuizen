import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsEnum, IsOptional, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { dateMiddleware } from 'src/utils/graphql/DateMiddleware'
import { SortInput } from 'src/utils/graphql/SortingInputField'
import { EducationGroupType } from '../educationGroup/educationGroup.type'
import { Employee } from '../employee/employee.entity'
import { EmployeeType } from '../employee/employee.type'
import { CreateLearningNeedInputType, LearningNeedType } from '../learningneed/learningneed.type'
import { LearningNeedOutcomeInputType, LearningNeedOutcomeType } from '../learningNeedOutcome/learningNeedOutCome.type'
import { Organization } from '../organization/organization.entity'
import { OrganizationType } from '../organization/organization.type'
import { TestResultType } from '../testResult/testResult.type'
import paginationType from '../utils/pagination.type'
import {
    ParticipationProviderOption,
    ParticipationEndReason,
    ParticipationOfferType,
    ParticipationFormality,
    ParticipationGroupType,
    ParticipationStatus,
    ParticipationOutFlow,
} from './participation.entity'

@ObjectType()
export class ParticipationType extends BaseEntityObjectType {
    @Field(() => OrganizationType, { nullable: true })
    public provider: Organization

    @Field(() => ParticipationProviderOption, { nullable: true })
    public providerOption: ParticipationProviderOption

    @Field(() => String, { nullable: true })
    public providerOther?: string

    @Field(() => String, { nullable: true })
    public providerExplanation?: string

    @Field(() => String, { nullable: true, middleware: [dateMiddleware] })
    public startParticipation?: Date

    @Field(() => String, { nullable: true, middleware: [dateMiddleware] })
    public endParticipation?: Date

    @Field(() => ParticipationEndReason, { nullable: true })
    public reasonEndParticipation?: ParticipationEndReason

    @Field(() => ParticipationOutFlow, { nullable: true })
    public outFlowParticipation?: ParticipationOutFlow

    @Field(() => String, { nullable: true })
    public outFlowReasonOther: string | undefined

    @Field(() => String, { nullable: true })
    public offerName?: string

    @Field(() => ParticipationOfferType, { nullable: true })
    public offerType?: ParticipationOfferType

    @Field(() => ParticipationFormality, { nullable: true })
    public formality?: ParticipationFormality

    @Field(() => ParticipationGroupType, { nullable: true })
    public groupFormation?: ParticipationGroupType

    @Field(() => Boolean, { nullable: true })
    public degree?: boolean

    @Field(() => String, { nullable: true, middleware: [dateMiddleware] })
    public start?: Date

    @Field(() => String, { nullable: true, middleware: [dateMiddleware] })
    public end?: Date

    @Field(() => String, { nullable: true })
    public agreement?: string

    @Field(() => TestResultType, { nullable: true })
    public testResult?: TestResultType

    @Field(() => EmployeeType, { nullable: true })
    public mentor?: Employee

    @Field(() => EducationGroupType, { nullable: true })
    public educationGroup?: EducationGroupType

    @Field(() => ParticipationStatus)
    public status: ParticipationStatus

    @Field(() => LearningNeedOutcomeType, { nullable: true })
    public offerLearningNeedOutcome?: LearningNeedOutcomeType

    @Field(() => LearningNeedType)
    public learningNeed: LearningNeedType
}

@ObjectType()
export class PaginatedParticipationResponse extends paginationType(ParticipationType) {}

@ArgsType()
export class GetParticipationArgs {
    @Field()
    @IsUUID()
    public participationId: string
}

@ArgsType()
export class GetParticipationsArgs {
    @Field()
    @IsUUID()
    public learningNeedId: string
}

@ArgsType()
export class StudentParticipationArgs {
    @Field()
    @IsUUID()
    public studentId: string
}

@InputType()
export class ParticipationInputType {
    @Field(() => ID, { nullable: true })
    @IsUUID()
    @IsOptional()
    public provider?: string

    @Field(() => ID, { nullable: true })
    @IsUUID()
    @IsOptional()
    public mentor?: string

    @Field(() => ID, { nullable: true })
    @IsUUID()
    @IsOptional()
    public educationGroup?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public providerOther?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    // @MaxLength(255) TODO: re-add when error handling improved
    public providerExplanation?: string

    @Field({ nullable: true })
    @IsOptional()
    public startParticipation?: Date

    @Field(() => LearningNeedOutcomeInputType, { nullable: true })
    @IsOptional()
    public offerLearningNeedOutcome?: LearningNeedOutcomeInputType

    @Field(() => String, { nullable: true })
    @IsOptional()
    public offerName?: string

    @Field(() => ParticipationOfferType, { nullable: true })
    @IsOptional()
    public offerType?: ParticipationOfferType

    @Field(() => ParticipationFormality, { nullable: true })
    @IsOptional()
    public formality?: ParticipationFormality

    @Field(() => ParticipationGroupType, { nullable: true })
    @IsOptional()
    public groupFormation?: ParticipationGroupType

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    public degree?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public start?: Date

    @Field({ nullable: true })
    @IsOptional()
    public end?: Date

    @Field(() => String, { nullable: true })
    @IsOptional()
    public agreement?: string
}

@InputType()
export class CreateParticipationInputType extends ParticipationInputType {
    @Field(() => ID, { nullable: true })
    @IsUUID()
    @IsOptional()
    public learningNeedId?: string

    @Field(() => CreateLearningNeedInputType, { nullable: true })
    @IsOptional()
    public newLearningNeed?: CreateLearningNeedInputType

    @Field(() => ParticipationProviderOption)
    @IsEnum(ParticipationProviderOption)
    public providerOption: ParticipationProviderOption
}

@InputType()
export class EditParticipationInputType extends ParticipationInputType {
    @Field(() => ID)
    @IsUUID()
    public id: string

    @Field(() => ParticipationProviderOption, { nullable: true })
    @IsOptional()
    public providerOption?: ParticipationProviderOption
}

@InputType()
export class DeleteParticipationInputType {
    @Field()
    @IsUUID()
    public id: string
}

@InputType()
export class StudentParticipationSortInputType {
    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public learningNeedDescription: SortInput
}
