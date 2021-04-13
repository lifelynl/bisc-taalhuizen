import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsUrl, MinLength, ValidateNested } from 'class-validator'
import { CreateAanbiederEmployeeInput } from '../CreateAanbiederEmployeeService'
import { AanbiederUserRoleType } from './AanbiederUserRoleType'

@InputType()
class CreateAanbiederEmployeeAvailabilityDayInputType {
    @Field()
    public morning?: boolean

    @Field()
    public afternoon?: boolean

    @Field()
    public evening?: boolean
}

@InputType()
class CreateAanbiederEmployeeAvailabilityInputType {
    @Field()
    @ValidateNested()
    public monday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public tuesday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public wednesday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public thursday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public friday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public saturday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public sunday?: CreateAanbiederEmployeeAvailabilityDayInputType
}

@InputType()
class CreateAanbiederEmployeeCurrentEducationYesInputType {
    @Field({ nullable: true })
    public dateSince?: string

    @Field({ nullable: true })
    public name?: string

    @Field({ nullable: true })
    public doesProvideCertificate?: boolean
}

@InputType()
class CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType {
    @Field({ nullable: true })
    public dateUntil?: string

    @Field({ nullable: true })
    public level?: string

    @Field({ nullable: true })
    public gotCertificate?: boolean
}

@InputType()
class AanbiederEmployeeAddressInputType {
    @Field({ nullable: true })
    public street!: string

    @Field({ nullable: true })
    public houseNumber!: string

    @Field({ nullable: true })
    @IsOptional()
    public houseNumberSuffix?: string

    @Field({ nullable: true })
    // @IsPostalCode('NL')
    public postalCode!: string

    @Field({ nullable: true })
    public locality!: string
}

export enum AanbiederEmployeeContactPreferenceEnum {
    PHONECALL = 'PHONECALL', // Bellen
    WHATSAPP = 'WHATSAPP', // Whatsapp
    EMAIL = 'EMAIL', // Mailen
    OTHER = 'OTHER', // Anders
}
registerEnumType(AanbiederEmployeeContactPreferenceEnum, { name: 'AanbiederEmployeeContactPreferenceEnum' })

export enum AanbiederEmployeeTargetGroupPreferenceEnum {
    NT1 = 'NT1',
    NT2 = 'NT2',
}
registerEnumType(AanbiederEmployeeTargetGroupPreferenceEnum, { name: 'AanbiederEmployeeTargetGroupPreferenceEnum' })

export enum AanbiederEmployeeCurrentEducationEnum {
    YES = 'YES',
    NO = 'NO',
    NO_BUT_DID_FOLLOW = 'NO_BUT_DID_FOLLOW',
}
registerEnumType(AanbiederEmployeeCurrentEducationEnum, { name: 'AanbiederEmployeeCurrentEducationEnum' })

export enum AanbiederEmployeeProfessionalismEnum {
    PROFESSIONAL = 'PROFESSIONAL',
    VOLUNTEER = 'VOLUNTEER',
    BOTH = 'PROFESSIONAL_AND_VOLUNTEER',
}
registerEnumType(AanbiederEmployeeProfessionalismEnum, { name: 'AanbiederEmployeeProfessionalismEnum' })

export enum AanbiederEmployeeGenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    X = 'X',
}
registerEnumType(AanbiederEmployeeGenderEnum, { name: 'AanbiederEmployeeGenderEnum' })

@InputType()
class BaseAanbiederEmployeeInputType {
    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field(() => String, { nullable: true })
    @MinLength(1)
    @IsOptional()
    public telephone?: string

    @Field({ nullable: true })
    @ValidateNested()
    public availability?: CreateAanbiederEmployeeAvailabilityInputType

    @Field({ nullable: true })
    public availabilityNotes?: string

    @Field()
    @IsEmail()
    public email!: string

    @Field(() => [String])
    public userGroupIds!: string[]

    @Field(() => AanbiederEmployeeGenderEnum, { nullable: true })
    public gender?: AanbiederEmployeeGenderEnum

    @Field({ nullable: true })
    public dateOfBirth?: string

    @Field({ nullable: true })
    @ValidateNested()
    @IsOptional()
    public address?: AanbiederEmployeeAddressInputType

    @Field({ nullable: true })
    public contactTelephone?: string

    @Field(() => AanbiederEmployeeContactPreferenceEnum, { nullable: true })
    public contactPreference?: AanbiederEmployeeContactPreferenceEnum

    @Field({ nullable: true })
    public contactPreferenceOther?: string

    @Field(() => [AanbiederEmployeeTargetGroupPreferenceEnum], { nullable: true }) // enum for nt1, nt2
    public targetGroupPreference?: AanbiederEmployeeTargetGroupPreferenceEnum[]

    @Field({ nullable: true })
    public volunteringPreference?: string

    @Field({ nullable: true })
    public gotHereVia?: string

    @Field({ nullable: true })
    public hasExperienceWithTargetGroup?: boolean

    @Field({ nullable: true })
    public experienceWithTargetGroupYesReason?: boolean

    // //
    @Field(() => AanbiederEmployeeCurrentEducationEnum, { nullable: true })
    public currentEducation?: AanbiederEmployeeCurrentEducationEnum // [ yes, no, no but did follow ]

    @Field({ nullable: true })
    @ValidateNested()
    public currentEducationYes?: CreateAanbiederEmployeeCurrentEducationYesInputType

    @Field({ nullable: true })
    @ValidateNested()
    public currentEdicationNoButDidFollow?: CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType

    @Field({ nullable: true })
    public doesCurrentlyFollowCourse?: boolean // yes no but optional?

    @Field({ nullable: true })
    public currentlyFollowingCourseName?: string

    @Field({ nullable: true })
    public currentlyFollowingCourseInstitute?: string

    @Field(() => AanbiederEmployeeProfessionalismEnum, { nullable: true })
    public currentlyFollowingCourseTeacherProfessionalism?: AanbiederEmployeeProfessionalismEnum

    @Field(() => AanbiederEmployeeProfessionalismEnum, { nullable: true })
    public currentlyFollowingCourseCourseProfessionalism?: AanbiederEmployeeProfessionalismEnum

    @Field({ nullable: true })
    public doesCurrentlyFollowingCourseProvideCertificate?: boolean

    @Field({ nullable: true })
    public otherRelevantCertificates?: string

    @Field({ nullable: true })
    public isVOGChecked?: boolean
}

@InputType()
export class CreateAanbiederEmployeeInputType
    extends BaseAanbiederEmployeeInputType
    implements CreateAanbiederEmployeeInput {
    @Field()
    @IsUrl() // TODO make custom ID validator
    public aanbiederId!: string
}

@InputType()
export class UpdateAanbiederEmployeeInputType extends BaseAanbiederEmployeeInputType {
    @Field()
    @IsUrl() // TODO make custom ID validator
    public userId!: string
}

@ObjectType()
class AanbiederEmployeeAvailabilityDayType {
    @Field()
    public morning?: boolean

    @Field()
    public afternoon?: boolean

    @Field()
    public evening?: boolean
}

@ObjectType()
class AanbiederEmployeeAvailabilityDaysType {
    @Field()
    public monday?: AanbiederEmployeeAvailabilityDayType

    @Field()
    public tuesday?: AanbiederEmployeeAvailabilityDayType

    @Field()
    public wednesday?: AanbiederEmployeeAvailabilityDayType

    @Field()
    public thursday?: AanbiederEmployeeAvailabilityDayType

    @Field()
    public friday?: AanbiederEmployeeAvailabilityDayType

    @Field()
    public saturday?: AanbiederEmployeeAvailabilityDayType

    @Field()
    public sunday?: AanbiederEmployeeAvailabilityDayType
}

@ObjectType()
class AanbiederEmployeeAddressType {
    @Field({ nullable: true })
    public street!: string

    @Field({ nullable: true })
    public houseNumber!: string

    @Field({ nullable: true })
    @IsOptional()
    public houseNumberSuffix?: string

    @Field({ nullable: true })
    // @IsPostalCode('NL')
    public postalCode!: string

    @Field({ nullable: true })
    public locality!: string
}

@ObjectType()
class AanbiederEmployeeCurrentEducationYesType {
    @Field({ nullable: true })
    public dateSince?: string

    @Field({ nullable: true })
    public name?: string

    @Field({ nullable: true })
    public doesProvideCertificate?: boolean
}

@ObjectType()
class AanbiederEmployeeCurrentEducationNoButDidFollowType {
    @Field({ nullable: true })
    public dateUntil?: string

    @Field({ nullable: true })
    public level?: string

    @Field({ nullable: true })
    public gotCertificate?: boolean
}

@ObjectType()
export class AanbiederEmployeeType {
    @Field()
    @IsUrl() // TODO make custom ID validator
    public userId!: string

    @Field()
    public dateCreated?: string

    @Field()
    public dateModified?: string

    @Field(() => [AanbiederUserRoleType])
    public userRoles!: AanbiederUserRoleType[]

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field(() => String, { nullable: true })
    public telephone?: string

    @Field(() => AanbiederEmployeeAvailabilityDaysType, { nullable: true })
    public availability?: AanbiederEmployeeAvailabilityDaysType

    @Field({ nullable: true })
    public availabilityNotes?: string

    @Field()
    @IsEmail()
    public email!: string

    @Field(() => AanbiederEmployeeGenderEnum, { nullable: true })
    public gender?: AanbiederEmployeeGenderEnum

    @Field({ nullable: true })
    public dateOfBirth?: string

    @Field(() => AanbiederEmployeeAddressType, { nullable: true })
    public address?: AanbiederEmployeeAddressType

    @Field({ nullable: true })
    public contactTelephone?: string

    @Field(() => AanbiederEmployeeContactPreferenceEnum, { nullable: true })
    public contactPreference?: AanbiederEmployeeContactPreferenceEnum

    @Field({ nullable: true })
    public contactPreferenceOther?: string

    @Field(() => [AanbiederEmployeeTargetGroupPreferenceEnum], { nullable: true }) // enum for nt1, nt2
    public targetGroupPreference?: AanbiederEmployeeTargetGroupPreferenceEnum[]

    @Field({ nullable: true })
    public volunteringPreference?: string

    @Field({ nullable: true })
    public gotHereVia?: string

    @Field({ nullable: true })
    public hasExperienceWithTargetGroup?: boolean

    @Field({ nullable: true })
    public experienceWithTargetGroupYesReason?: boolean

    // //
    @Field(() => AanbiederEmployeeCurrentEducationEnum, { nullable: true })
    public currentEducation?: AanbiederEmployeeCurrentEducationEnum // [ yes, no, no but did follow ]

    @Field(() => AanbiederEmployeeCurrentEducationYesType, { nullable: true })
    public currentEducationYes?: AanbiederEmployeeCurrentEducationYesType

    @Field(() => AanbiederEmployeeCurrentEducationNoButDidFollowType, { nullable: true })
    public currentEdicationNoButDidFollow?: AanbiederEmployeeCurrentEducationNoButDidFollowType

    @Field({ nullable: true })
    public doesCurrentlyFollowCourse?: boolean // yes no but optional?

    @Field({ nullable: true })
    public currentlyFollowingCourseName?: string

    @Field({ nullable: true })
    public currentlyFollowingCourseInstitute?: string

    @Field(() => AanbiederEmployeeProfessionalismEnum, { nullable: true })
    public currentlyFollowingCourseTeacherProfessionalism?: AanbiederEmployeeProfessionalismEnum

    @Field(() => AanbiederEmployeeProfessionalismEnum, { nullable: true })
    public currentlyFollowingCourseCourseProfessionalism?: AanbiederEmployeeProfessionalismEnum

    @Field({ nullable: true })
    public doesCurrentlyFollowingCourseProvideCertificate?: boolean

    @Field({ nullable: true })
    public otherRelevantCertificates?: string

    @Field({ nullable: true })
    public isVOGChecked?: boolean
}
