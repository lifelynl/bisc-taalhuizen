import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { IsNotBlankString } from 'src/utils/graphql/IsNotBlankString'
import { SortInput } from 'src/utils/graphql/SortingInputField'
import { Employee } from '../employee/employee.entity'
import { EmployeeType } from '../employee/employee.type'
import { Organization } from '../organization/organization.entity'
import { OrganizationType } from '../organization/organization.type'
import { PostalCodeArea } from '../postalCodeArea/postalCodeArea.entity'
import { PostalCodeAreaType } from '../postalCodeArea/postalCodeArea.type'
import { Student } from '../student/student.entity'
import { StudentType } from '../student/student.type'
import paginationType from '../utils/pagination.type'

@ObjectType()
export class TeamType extends BaseEntityObjectType {
    @Field(() => String)
    public name: string

    @Field(() => [EmployeeType])
    public members: Employee[]

    @Field(() => OrganizationType)
    public parentOrganization: Organization

    @Field(() => [PostalCodeAreaType])
    public postalCodeAreas: PostalCodeArea[]

    @Field(() => [StudentType], { nullable: true })
    public students: Student[]

    @Field({ nullable: true })
    public hiddenFromPublic?: boolean
}
@ObjectType()
export class PaginatedTeamResponse extends paginationType<TeamType>(TeamType) {}

@ArgsType()
export class GetTeamInput {
    @Field(() => ID)
    @IsUUID()
    public teamId: string
}

@ArgsType()
export class GetTeamsInput {
    @Field(() => ID)
    @IsUUID()
    public organizationId: string

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID()
    public filterForEmployeeId?: string
}

@InputType()
export class TeamInputType {
    @Field(() => [ID], { nullable: true })
    @IsOptional()
    public memberIds?: string[]

    @Field(() => [ID], { nullable: true })
    @IsUUID('4', { each: true })
    @IsOptional()
    public postalCodeAreaIds?: string[]
}

@InputType()
export class CreateTeamInputType extends TeamInputType {
    @Field(() => String)
    @IsString()
    @IsNotBlankString()
    public name: string

    @Field(() => ID)
    @IsUUID()
    public organizationId: string
}

@InputType()
export class EditTeamInputType extends TeamInputType {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public name?: string

    @Field(() => ID)
    @IsUUID()
    public teamId: string

    @Field({ nullable: true })
    @IsOptional()
    public hiddenFromPublic?: boolean
}

@InputType()
export class EditTeamsInputType {
    @Field(() => [EditTeamInputType])
    @IsArray()
    public teams: EditTeamInputType[]
}

@InputType()
export class DeleteTeamInputType {
    @Field(() => ID)
    @IsUUID()
    public id: string
}

@ObjectType()
export class PublicTeamType {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public name: string
}

@ArgsType()
export class PublicTeamsForOrganizationArgs {
    @Field(() => ID)
    @IsUUID()
    public organizationId: string
}

@InputType()
export class TeamsSortInputType {
    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public name?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public employeeCount?: SortInput
}
