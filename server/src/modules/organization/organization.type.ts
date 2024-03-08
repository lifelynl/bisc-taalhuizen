import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql'
import {
    ArrayMinSize,
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNumber,
    IsOptional,
    IsUUID,
    Max,
    Min,
    ValidateIf,
} from 'class-validator'
import { IsNotBlankString } from 'src/utils/graphql/IsNotBlankString'
import { AddressType, CreateAddressInputType, EditAddressInputType } from '../address/address.type'
import { EmployeeType } from '../employee/employee.type'
import { OrganizationIntakeFields, OrganizationTypeEnum } from './organization.entity'
import paginationType from '../utils/pagination.type'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { StudentType } from '../student/student.type'
import { PostalCodeAreaType } from '../postalCodeArea/postalCodeArea.type'
import { PublicTeamType } from '../team/team.type'
import { SortInput } from 'src/utils/graphql/SortingInputField'

@ObjectType()
export class OrganizationType extends BaseEntityObjectType {
    @Field(() => String)
    public name: string

    @Field()
    public slug: string

    @Field(() => String, { nullable: true })
    public description?: string

    @Field(() => OrganizationTypeEnum)
    public type: OrganizationTypeEnum

    @Field(() => [EmployeeType], { nullable: true })
    public employees?: EmployeeType[]

    @Field(() => AddressType, { nullable: true })
    public address?: AddressType

    @Field(() => String, { nullable: true })
    public email?: string

    @Field(() => String, { nullable: true })
    public telephone?: string

    @Field(() => [StudentType], { nullable: true })
    public students?: StudentType[]

    // has to be completely optional since providers dont have this
    @Field(() => [PostalCodeAreaType], { nullable: true })
    @IsOptional()
    public postalCodes?: PostalCodeAreaType[]

    @Field(() => [OrganizationIntakeFields], { nullable: true })
    @IsOptional()
    public disabledIntakeFields?: OrganizationIntakeFields[]

    @Field(() => Boolean, { nullable: true })
    public isLanguageHouseProvider?: boolean

    @Field({ nullable: true })
    public hasLimitedEditRights?: boolean
}
@InputType()
export class CreateOrganizationInputType {
    @Field(() => String, { nullable: false })
    public name: string

    @Field(() => String, { nullable: true })
    @IsEmail()
    @IsOptional()
    public email?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public telephone?: string

    @Field(() => CreateAddressInputType, { nullable: true })
    public address?: CreateAddressInputType

    @Field(() => OrganizationTypeEnum)
    public type: OrganizationTypeEnum

    @Field(() => [Int], { nullable: true })
    @IsOptional()
    public postalCodes?: number[]

    @Field({ nullable: true, description: 'Used only to limit provider editing rights at the moment' })
    @ValidateIf(org => org.type === OrganizationTypeEnum.provider)
    @IsBoolean()
    public hasLimitedEditRights?: boolean
}

@ObjectType()
export class PaginatedOrganisationResponse extends paginationType<OrganizationType>(OrganizationType) {}

@InputType()
export class EditOrganizationInputType {
    @Field(() => String)
    public id: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public name?: string

    @Field(() => String, { nullable: true })
    @IsEmail()
    @IsOptional()
    public email?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public telephone?: string

    @Field(() => EditAddressInputType, { nullable: true })
    public address?: EditAddressInputType

    @Field(() => [Int], { nullable: true })
    @IsOptional()
    @IsNumber({}, { each: true })
    @Min(1000, { each: true })
    @Max(9999, { each: true })
    @ArrayMinSize(1)
    public postalCodes?: number[]

    @Field(() => [OrganizationIntakeFields], { nullable: true })
    @IsEnum(OrganizationIntakeFields, { each: true })
    @IsOptional()
    public disabledIntakeFields?: OrganizationIntakeFields[] | null

    @Field(() => [ID], { nullable: true })
    @IsOptional()
    @IsUUID(undefined, { each: true })
    public providers?: string[]

    @Field({ nullable: true, description: 'Used only to limit provider editing rights at the moment' })
    @ValidateIf(org => org.type === OrganizationTypeEnum.provider)
    @IsBoolean()
    public hasLimitedEditRights?: boolean
}

@InputType()
export class OrganizationsSortInputType {
    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public name?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public street?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public locality?: SortInput
}

@InputType()
export class OrganizationFiltersInputType {
    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID()
    public providersFor?: string
}

@ObjectType()
export class PublicOrganizationType {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public name: string

    @Field(() => [PublicTeamType])
    public teams: PublicTeamType[]
}

@ObjectType()
export class ParticipationProviderOrganizationType {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public name: string
}
