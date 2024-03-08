import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { dateMiddleware } from 'src/utils/graphql/DateMiddleware'
import { IsNotBlankString } from 'src/utils/graphql/IsNotBlankString'
import { AddressType, CreateAddressInputType } from '../address/address.type'
import { CreateEducationInputType, EditNestedEducationInputType, EducationType } from '../education/education.type'
import { EmployeeType } from '../employee/employee.type'
import { StudentType } from '../student/student.type'
import { UserType } from '../user/user.type'
import { Availability, ContactPreference, Gender, MaritalStatus, ProviderTargetGroupPreference } from './person.entity'

@ObjectType()
export class PersonType extends BaseEntityObjectType {
    @Field(() => AddressType, { nullable: true })
    public address?: AddressType

    @Field(() => String, { nullable: true })
    public givenName?: string

    @Field(() => String, { nullable: true })
    public email?: string

    @Field({ nullable: true })
    public secondaryEmail?: string

    @Field(() => String, { nullable: true })
    public additionalName?: string

    @Field(() => String, { nullable: true })
    public familyName?: string

    @Field(() => Gender, { nullable: true })
    public gender?: Gender

    @Field(() => String, { nullable: true })
    public birthplace?: string

    @Field(() => String, { middleware: [dateMiddleware], nullable: true })
    public birthday?: Date

    @Field(() => String, { nullable: true })
    public telephone?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public emergencyTelephone?: string

    @Field(() => ContactPreference, { nullable: true })
    public contactPreference?: ContactPreference

    @Field(() => String, { nullable: true })
    public contactPreferenceOther?: string

    @Field(() => MaritalStatus, { nullable: true })
    public maritalStatus?: MaritalStatus

    @Field(() => String, { nullable: true })
    public spokenLanguages?: string

    @Field(() => String, { nullable: true })
    public primaryLanguage?: string

    @Field(() => Int, { nullable: true })
    public children?: number

    @Field(() => [Availability], { nullable: true })
    public availability?: Availability[]

    @Field(() => String, { nullable: true })
    public availabilityNotes?: string

    @Field(() => StudentType, { nullable: true })
    public student?: StudentType

    @Field(() => [EmployeeType], { nullable: true })
    public employees?: EmployeeType[]

    @Field(() => UserType, { nullable: true })
    public user?: UserType

    @Field()
    public didSignPermissionForm: boolean

    @Field()
    public hasPermissionToSendInformationAboutLibraries: boolean

    @Field()
    public hasPermissionToShareDataWithLibraries: boolean

    @Field()
    public hasPermissionToShareDataWithProviders: boolean

    @Field(() => [ProviderTargetGroupPreference], { nullable: true })
    public providerTargetGroupPreference?: ProviderTargetGroupPreference[] | null

    @Field(() => String, { nullable: true })
    public providerVolunteeringPreference: string

    @Field(() => String, { nullable: true })
    public providerLanguageHouseVolunteeringReference: string

    @Field({ nullable: true })
    public providerTargetGroupIsExperienced: boolean

    @Field(() => String, { nullable: true })
    public providerTargetGroupExperience: string

    @Field(() => [EducationType])
    public educations: EducationType[]
}

@InputType()
class OptionalPersonInputType {
    @Field(() => CreateAddressInputType, { nullable: true })
    @IsOptional()
    public address?: CreateAddressInputType

    @Field(() => String, { nullable: true })
    public additionalName?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public familyName?: string

    @Field(() => Gender, { nullable: true })
    @IsOptional()
    public gender?: Gender

    @Field(() => String, { nullable: true })
    @IsOptional()
    public birthplace?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public birthday?: Date

    @Field(() => String, { nullable: true })
    @IsOptional()
    public telephone?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public emergencyTelephone?: string

    @Field(() => ContactPreference, { nullable: true })
    @IsOptional()
    public contactPreference?: ContactPreference

    @Field(() => String, { nullable: true })
    @IsOptional()
    public contactPreferenceOther?: string

    @Field(() => MaritalStatus, { nullable: true })
    @IsOptional()
    public maritalStatus?: MaritalStatus

    @Field(() => String, { nullable: true })
    @IsOptional()
    public spokenLanguages?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public primaryLanguage?: string

    @Field(() => Int, { nullable: true })
    @IsOptional()
    public children?: number

    @Field(() => [Availability], { nullable: true })
    @IsOptional()
    public availability?: Availability[]

    @Field(() => String, { nullable: true })
    @IsOptional()
    public availabilityNotes?: string

    @Field({ nullable: true })
    @IsOptional()
    public didSignPermissionForm?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public hasPermissionToSendInformationAboutLibraries?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public hasPermissionToShareDataWithLibraries?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public hasPermissionToShareDataWithProviders?: boolean

    @Field(() => [ProviderTargetGroupPreference], { nullable: true })
    @IsOptional()
    public providerTargetGroupPreference?: ProviderTargetGroupPreference[] | null

    @Field(() => String, { nullable: true })
    @IsOptional()
    public providerVolunteeringPreference?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public providerLanguageHouseVolunteeringReference?: string

    @Field({ nullable: true })
    @IsOptional()
    public providerTargetGroupIsExperienced?: boolean

    @Field(() => String, { nullable: true })
    @IsOptional()
    public providerTargetGroupExperience?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    public secondaryEmail?: string
}

@InputType()
export class CreatePersonInputType extends OptionalPersonInputType {
    @Field(() => String, { nullable: true })
    @IsNotBlankString()
    public givenName?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsEmail()
    public email?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public familyName?: string

    @Field(() => [CreateEducationInputType], { nullable: true })
    @IsOptional()
    public educations?: CreateEducationInputType[]
}

@InputType()
export class EditPersonInputType extends OptionalPersonInputType {
    @Field()
    @IsUUID()
    public id: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public givenName?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsEmail()
    public email?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public familyName?: string

    @Field(() => [EditNestedEducationInputType], { nullable: true })
    @IsOptional()
    public educations?: EditNestedEducationInputType[]
}

@InputType()
export class EditNestedPersonInputType extends OptionalPersonInputType {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public givenName?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsEmail()
    public email?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public familyName?: string

    @Field(() => [EditNestedEducationInputType], { nullable: true })
    @IsOptional()
    public educations?: EditNestedEducationInputType[]
}
