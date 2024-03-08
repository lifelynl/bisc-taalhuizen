import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsOptional, IsUUID, ValidateNested } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { SortInput } from 'src/utils/graphql/SortingInputField'
import { Education } from '../education/education.entity'
import { EducationType } from '../education/education.type'
import { OrganizationType } from '../organization/organization.type'
import { CreatePersonInputType, EditPersonInputType, PersonType } from '../person/person.type'
import { Student } from '../student/student.entity'
import { StudentType } from '../student/student.type'
import { TeamType } from '../team/team.type'
import paginationType from '../utils/pagination.type'
import { EmployeeRole } from './employee.entity'
import { Type } from 'class-transformer'

@ObjectType()
export class EmployeeType extends BaseEntityObjectType {
    @Field(() => OrganizationType)
    public organization: OrganizationType

    @Field(() => PersonType)
    public person: PersonType

    @Field(() => EmployeeRole, { nullable: true })
    @IsOptional()
    public role?: EmployeeRole

    @Field(() => [EducationType], { nullable: true })
    public educations?: Education[]

    @Field(() => [TeamType], { nullable: true })
    public teams?: TeamType[]

    @Field(() => [StudentType], { nullable: true })
    public mentees?: Student[]
}

@ObjectType()
export class PaginatedEmployeeResponse extends paginationType(EmployeeType) {}

@InputType()
export class EmployeeInputType {
    @Field(() => EmployeeRole, { nullable: true })
    @IsOptional()
    public employeeRole?: EmployeeRole
}

@InputType()
export class CreateEmployeeInputType extends EmployeeInputType {
    @Field(() => String)
    @IsUUID()
    public organization: string

    @Field(() => [String], { nullable: true, description: 'only for language house employees' })
    @IsOptional()
    @IsUUID(undefined, { each: true })
    public teams?: string[]

    @Field(() => CreatePersonInputType)
    @ValidateNested()
    @Type(() => CreatePersonInputType)
    public person: CreatePersonInputType
}

@InputType()
export class OrganizationEmployeesSortInputType {
    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public familyName?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public givenName?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public createdAt?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public updatedAt?: SortInput
}

@InputType()
export class EditEmployeeInputType extends EmployeeInputType {
    @Field(() => EditPersonInputType, { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreatePersonInputType)
    public person?: EditPersonInputType

    @Field(() => ID)
    @IsUUID()
    public id: string

    @Field(() => [ID], { nullable: true })
    @IsOptional()
    @IsUUID('4', { each: true })
    public mentees?: string[]
}

@ArgsType()
export class GetOrganizationsArgs {
    @Field(() => ID)
    @IsUUID()
    public organizationId: string

    @Field(() => EmployeeRole, { nullable: true })
    public role?: EmployeeRole

    @Field(() => [EmployeeRole], { nullable: true })
    public oneOfRoles?: EmployeeRole[]

    @Field(() => ID, { nullable: true })
    public teamId?: string
}
