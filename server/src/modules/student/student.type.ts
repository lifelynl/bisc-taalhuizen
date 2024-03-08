import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { LearningNeedType } from '../learningneed/learningneed.type'
import {
    CreateRegistrationInputType,
    EditRegistrationInputType,
    RegistrationType,
} from '../registration/registration.type'
import { OrganizationType } from '../organization/organization.type'
import { CreatePersonInputType, EditNestedPersonInputType, PersonType } from '../person/person.type'
import { RegistrationStatus } from '../registration/registration.entity'
import {
    CivicIntegrationType,
    CreateCivicIntegrationInputType,
    EditNestedCivicIntegrationInputType,
} from '../civicIntegration/civicIntegration.type'
import { Employee } from '../employee/employee.entity'
import { EmployeeType } from '../employee/employee.type'

import paginationType from '../utils/pagination.type'
import { ParticipationStatus } from '../participation/participation.entity'
import { TeamType } from '../team/team.type'
import { Team } from '../team/team.entity'
import { SortInput } from 'src/utils/graphql/SortingInputField'
import { dateMiddleware } from 'src/utils/graphql/DateMiddleware'

@ObjectType()
export class StudentType extends BaseEntityObjectType {
    @Field(() => String, { middleware: [dateMiddleware] })
    public intakeDate: Date

    @Field(() => PersonType)
    public person: PersonType

    @Field(() => OrganizationType)
    public organization: OrganizationType

    @Field(() => RegistrationType)
    public registration: RegistrationType

    @Field(() => [LearningNeedType], { nullable: true })
    public learningNeeds: LearningNeedType[]

    @Field(() => CivicIntegrationType, { nullable: true })
    public civicIntegration?: CivicIntegrationType

    @Field(() => EmployeeType, { nullable: true })
    public mentor: Employee | null

    @Field(() => TeamType, { nullable: true })
    public team: Team | null

    @Field({ description: 'Can the current user create contact moments for this student?' })
    public canCreateContactMoment: boolean
}

@ObjectType()
export class PaginatedStudentResponse extends paginationType(StudentType) {}

@InputType()
export class RegisterStudentInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    public forSelf?: boolean

    @Field()
    @IsUUID()
    public organization: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUUID()
    public team?: string

    @Field(() => CreatePersonInputType)
    public person: CreatePersonInputType

    @Field(() => CreateRegistrationInputType)
    public registration: CreateRegistrationInputType
}

@InputType()
export class CreateStudentInput extends RegisterStudentInput {
    @Field(() => CreateCivicIntegrationInputType)
    public civicIntegration: CreateCivicIntegrationInputType
}

@InputType()
export class EditStudentInput {
    @Field()
    @IsUUID()
    public id: string

    @IsOptional()
    @Field({ nullable: true })
    public intakeDate?: Date

    @Field(() => EditNestedCivicIntegrationInputType, { nullable: true })
    @IsOptional()
    public civicIntegration?: EditNestedCivicIntegrationInputType

    @Field(() => EditNestedPersonInputType, { nullable: true })
    @IsOptional()
    public person?: EditNestedPersonInputType

    @Field(() => EditRegistrationInputType, { nullable: true })
    @IsOptional()
    public registration?: EditRegistrationInputType

    @Field(() => ID, { nullable: true })
    @IsUUID()
    @IsOptional()
    public mentor?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUUID()
    public team?: string
}

@ArgsType()
export class GetStudentsArgs {
    @Field()
    @IsUUID()
    public organizationId: string

    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    public educationGroupId?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsEnum(RegistrationStatus)
    public status?: RegistrationStatus

    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    public mentorEmployeeId?: string

    @Field(() => ParticipationStatus, { nullable: true })
    @IsOptional()
    public participationStatus?: ParticipationStatus

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsUUID()
    public team?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public searchName?: string
}

@ArgsType()
export class GetStudentArgs {
    @Field({ nullable: false })
    @IsUUID()
    public studentId: string
}

@ArgsType()
export class GetProviderStudentsArgs {
    @Field(() => ParticipationStatus, { nullable: true })
    @IsOptional()
    @IsEnum(ParticipationStatus)
    public participationStatus?: ParticipationStatus

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    public newOrReferred?: boolean

    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    public educationGroupId?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    public mentorId?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public searchName?: string
}

@InputType()
export class StudentsSortInputType {
    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public familyName?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public givenName?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public teamName?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public mentor?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public intakeDate?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public referringOrganizationOther?: SortInput
}

@InputType()
export class DeleteStudentInputType {
    @Field(() => ID)
    @IsUUID()
    public id: string
}
