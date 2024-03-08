import { ArgsType, Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql'
import { IsDate, IsOptional, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { dateMiddleware } from 'src/utils/graphql/DateMiddleware'
import { IsNotBlankString } from 'src/utils/graphql/IsNotBlankString'
import { Employee } from '../employee/employee.entity'
import { EmployeeType } from '../employee/employee.type'
import {
    CreateLearningNeedOutcomeInputType,
    CreateOrEditLearningNeedOutcomeInputType,
    LearningNeedOutcomeType,
} from '../learningNeedOutcome/learningNeedOutCome.type'
import { Organization } from '../organization/organization.entity'
import { OrganizationType } from '../organization/organization.type'
import { CreateParticipationInputType, EditParticipationInputType } from '../participation/participation.type'
import { Availability } from '../person/person.entity'
import paginationType from '../utils/pagination.type'
import { EducationGroupStatus, GroupFormality, GroupOfferType } from './educationGroup.entity'

@ObjectType()
export class EducationGroupType extends BaseEntityObjectType {
    @Field(() => String)
    public name: string

    @Field(() => GroupOfferType)
    public type: GroupOfferType

    @Field(() => LearningNeedOutcomeType)
    public desiredLearningNeedOutcome: LearningNeedOutcomeType

    @Field(() => GroupFormality, { nullable: true })
    public formality?: GroupFormality

    @Field(() => Int, { nullable: true })
    public lessonHours?: number

    @Field(() => Boolean, { nullable: true })
    public degree?: boolean

    @Field(() => String, { nullable: true, middleware: [dateMiddleware] })
    public start?: Date

    @Field(() => String, { nullable: true, middleware: [dateMiddleware] })
    public end?: Date

    @Field(() => [Availability], { nullable: true })
    public availability?: Availability[]

    @Field(() => String, { nullable: true })
    public availabilityNotes?: string

    @Field(() => String)
    public location: string

    @Field({ nullable: true })
    public minimumParticipants: number

    @Field({ nullable: true })
    public maximumParticipants: number

    @Field({ nullable: true })
    public participantCount: number

    @Field(() => String, { nullable: true })
    public evaluation: string

    @Field(() => [EmployeeType], { nullable: true })
    public employees: Employee[]

    @Field(() => OrganizationType)
    public organization: Organization

    @Field(() => EducationGroupStatus, { nullable: true })
    public status: EducationGroupStatus | null
}

@ObjectType()
export class PaginatedEducationGroupType extends paginationType(EducationGroupType) {}

@InputType({ isAbstract: true })
export abstract class OptionalEducationGroupInputType {
    @Field(() => GroupFormality, { nullable: true })
    @IsOptional()
    public formality?: GroupFormality

    @Field({ nullable: true })
    @IsOptional()
    public degree?: boolean

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    public start?: Date

    @Field({ nullable: true })
    @IsDate()
    @IsOptional()
    public end?: Date

    @Field(() => [Availability], { nullable: true })
    @IsOptional()
    public availability?: Availability[]

    @Field({ nullable: true })
    @IsOptional()
    public availabilityNotes?: string

    @Field({ nullable: true })
    @IsOptional()
    public minimumParticipants?: number

    @Field({ nullable: true })
    @IsOptional()
    public maximumParticipants?: number

    @Field({ nullable: true })
    @IsOptional()
    public evaluation?: string

    @Field(() => [ID], { nullable: true })
    @IsOptional()
    @IsUUID('4', { each: true })
    public employees?: string[]
}

@InputType()
export class CreateEducationGroupInputType extends OptionalEducationGroupInputType {
    @Field(() => ID)
    @IsUUID()
    public organizationId: string

    @Field()
    @IsNotBlankString()
    public name: string

    @Field({ nullable: true })
    @IsOptional()
    public lessonHours?: number

    @Field()
    @IsNotBlankString()
    public location: string

    @Field(() => GroupOfferType)
    public type: GroupOfferType

    @Field(() => CreateLearningNeedOutcomeInputType)
    public desiredLearningNeedOutcome: CreateLearningNeedOutcomeInputType

    @Field(() => CreateParticipationInputType, { nullable: true })
    public participation?: CreateParticipationInputType | null
}

@InputType()
export class EditEducationGroupInputType extends OptionalEducationGroupInputType {
    @Field(() => ID)
    @IsUUID()
    public educationGroupId: string

    @Field({ nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public name?: string

    @Field({ nullable: true })
    @IsOptional()
    public lessonHours?: number

    @Field({ nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public location?: string

    @Field(() => GroupOfferType, { nullable: true })
    @IsOptional()
    public type?: GroupOfferType

    @Field(() => CreateOrEditLearningNeedOutcomeInputType, { nullable: true })
    @IsOptional()
    public desiredLearningNeedOutcome?: CreateOrEditLearningNeedOutcomeInputType

    @Field(() => EditParticipationInputType, { nullable: true })
    public participation?: EditParticipationInputType | null
}

@InputType()
export class DeleteEducationGroupInputType {
    @Field(() => ID)
    @IsUUID()
    public educationGroupId: string
}

@ArgsType()
export class GetEducationGroupsArgs {
    @Field(() => ID)
    @IsUUID()
    public organizationId: string

    @Field(() => EducationGroupStatus, { nullable: true })
    @IsOptional()
    public status?: EducationGroupStatus

    @Field(() => [EducationGroupStatus], { nullable: true })
    @IsOptional()
    public oneOfStatuses?: EducationGroupStatus[]
}

@ArgsType()
export class GetEducationGroupArgs {
    @Field(() => ID)
    @IsUUID()
    public educationGroupId: string
}
