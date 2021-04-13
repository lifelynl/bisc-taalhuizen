import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsIn, IsUrl, ValidateNested } from 'class-validator'
import {
    CreateStudentInput,
    StudentCivicIntegrationRequirementEnum,
    StudentCivicIntegrationRequirementReasonEnum,
    StudentGenderEnum,
} from '../services/CreateStudentService'

registerEnumType(StudentCivicIntegrationRequirementEnum, { name: 'StudentCivicIntegrationRequirementEnum' })
registerEnumType(StudentCivicIntegrationRequirementReasonEnum, { name: 'StudentCivicIntegrationRequirementReasonEnum' })
registerEnumType(StudentGenderEnum, { name: 'StudentGenderEnum' })

@InputType()
class CreateStudentCivicIntegrationInputType {
    @Field(() => StudentCivicIntegrationRequirementEnum, { nullable: true })
    public civicIntegrationRequirement!: StudentCivicIntegrationRequirementEnum

    @Field(() => StudentCivicIntegrationRequirementReasonEnum, { nullable: true })
    @IsIn(Object.values(StudentCivicIntegrationRequirementReasonEnum))
    public civicIntegrationRequirementReason?: StudentCivicIntegrationRequirementReasonEnum

    @Field({ nullable: true })
    // @MinDate(new Date()) // Date should be in the future
    public civicIntegrationRequirementFinishDate?: string
}

@InputType()
class CreateStudentPersonInputType {
    @Field()
    public givenName!: string

    @Field(() => String, { nullable: true })
    public additionalName?: string | null

    @Field()
    public familyName!: string

    @Field(() => StudentGenderEnum, { nullable: true })
    @IsIn(Object.values(StudentGenderEnum))
    public gender!: StudentGenderEnum

    @Field(() => String, { nullable: true })
    public dateOfBirth!: string
}

enum StudentContactPreferenceEnum {
    PHONECALL = 'PHONECALL', // Bellen
    WHATSAPP = 'WHATSAPP', // Whatsapp
    EMAIL = 'EMAIL', // Mailen
    OTHER = 'OTHER', // Anders
}
registerEnumType(StudentContactPreferenceEnum, { name: 'StudentContactPreferenceEnum' })

@InputType()
class CreateStudentContactInputType {
    @Field({ nullable: true })
    public street?: string

    @Field({ nullable: true })
    public postalCode?: string

    @Field({ nullable: true })
    public locality?: string

    @Field({ nullable: true })
    public houseNumber?: string

    @Field({ nullable: true })
    public houseNumberSuffix?: string

    @Field({ nullable: true })
    public email?: string

    @Field({ nullable: true })
    public telephone?: string

    @Field({ nullable: true })
    public contactPersonTelephone?: string

    @Field(() => StudentContactPreferenceEnum, { nullable: true })
    public contactPreference?: StudentContactPreferenceEnum

    @Field({ nullable: true })
    public contactPreferenceOther?: string
}

enum StudentFamilyCompositionEnum {
    MARRIED_PARTNER = 'MARRIED_PARTNER', // Getrouwd/partner
    SINGLE = 'SINGLE', // Alleenstaand
    DIVORCED = 'DIVORCED', // Gescheiden
    WIDOW = 'WIDOW', // Weduwe/weduwnaar
}
registerEnumType(StudentFamilyCompositionEnum, { name: 'StudentFamilyCompositionEnum' })

@InputType()
class CreateStudentGeneralInputType {
    @Field({ nullable: true })
    public countryOfOrigin?: string

    @Field({ nullable: true })
    public nativeLanguage?: string

    @Field({ nullable: true })
    public otherLanguages?: string

    @Field(() => [StudentFamilyCompositionEnum], { nullable: true })
    public familyComposition?: StudentFamilyCompositionEnum[]

    @Field(() => Int, { nullable: true })
    public childrenCount?: number

    @Field({ nullable: true })
    public childrenDatesOfBirth?: string
}

enum StudentReferringOrganizationEnum {
    UWV = 'UWV', // UWV
    SOCIAL_SERVICE = 'SOCIAL_SERVICE', // Sociale dienst
    LIBRARY = 'LIBRARY', // Bibliotheek
    WELFARE_WORK = 'WELFARE_WORK', // Welzijnswerk
    NEIGHBORHOOD_TEAM = 'NEIGHBORHOOD_TEAM', // Buurt/dorpsteam
    VOLUNTEER_ORGANIZATION = 'VOLUNTEER_ORGANIZATION', // Vrijwilligersorganisatie
    LANGUAGE_PROVIDER = 'LANGUAGE_PROVIDER', // Taalaanbieder
    OTHER = 'OTHER', // Anders
}
registerEnumType(StudentReferringOrganizationEnum, { name: 'StudentReferringOrganizationEnum' })

@InputType()
class CreateStudentReferrerInputType {
    @Field(() => StudentReferringOrganizationEnum, { nullable: true })
    public referringOrganization?: StudentReferringOrganizationEnum

    @Field({ nullable: true })
    public referringOrganizationOther?: string

    @Field({ nullable: true })
    public email?: string
}

enum StudentFoundViaEnum {
    VOLUNTEER_CENTER = 'VOLUNTEER_CENTER', // Vrijwilligerscentrale
    LIBRARY_WEBSITE = 'LIBRARY_WEBSITE', // Website bibliotheek
    SOCIAL_MEDIA = 'SOCIAL_MEDIA', // Social media
    NEWSPAPER = 'NEWSPAPER', // Krant
    VIA_VIA = 'VIA_VIA', // Via via
    OTHER = 'OTHER', // Anders
}
registerEnumType(StudentFoundViaEnum, { name: 'StudentFoundViaEnum' })

enum StudentNetworkEnum {
    HOUSEHOLD_MEMBERS = 'HOUSEHOLD_MEMBERS', // Gezinsleden
    NEIGHBORS = 'NEIGHBORS', // Buren
    FAMILY_MEMBERS = 'FAMILY_MEMBERS', // Familie (buiten gezin om)
    AID_WORKERS = 'AID_WORKERS', // Hulpverleners
    FRIENDS_ACQUAINTANCES = 'FRIENDS_ACQUAINTANCES', // Vrienden, kennissen
    PEOPLE_AT_MOSQUE_CHURCH = 'PEOPLE_AT_MOSQUE_CHURCH', // Mensen bij moskee of kerk
    ACQUAINTANCES_SPEAKING_OWN_LANGUAGE = 'ACQUAINTANCES_SPEAKING_OWN_LANGUAGE', // Ik ken mensen met wie ik mijn eigen taal spreek
    ACQUAINTANCES_SPEAKING_DUTCH = 'ACQUAINTANCES_SPEAKING_DUTCH', // Ik ken mensen met wie ik Nederlands spreek
}
registerEnumType(StudentNetworkEnum, { name: 'StudentNetworkEnum' })

@InputType()
class CreateStudentBackgroundInputType {
    @Field(() => StudentFoundViaEnum, { nullable: true })
    public foundVia?: StudentFoundViaEnum

    @Field({ nullable: true })
    public foundViaOther?: string

    @Field({ nullable: true })
    public wentToTaalhuisBefore?: boolean

    @Field({ nullable: true })
    public wentToTaalhuisBeforeReason?: string

    @Field({ nullable: true })
    public wentToTaalhuisBeforeYear?: number

    @Field(() => [StudentNetworkEnum], { nullable: true })
    public network?: StudentNetworkEnum[]

    @Field(() => Int, { nullable: true })
    public participationLadder?: number
}

enum StudentDutchNTLevelEnum {
    NT1 = 'NT1',
    NT2 = 'NT2',
}
registerEnumType(StudentDutchNTLevelEnum, { name: 'StudentDutchNTLevelEnum' })

enum StudentDutchLastKnownLevelEnum {
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
    UNKNOWN = 'UNKNOWN',
}
registerEnumType(StudentDutchLastKnownLevelEnum, { name: 'StudentDutchLastKnownLevelEnum' })

@InputType()
class CreateStudentDutchNTInputType {
    @Field(() => StudentDutchNTLevelEnum, { nullable: true })
    public dutchNTLevel?: StudentDutchNTLevelEnum

    @Field({ nullable: true })
    public inNetherlandsSinceYear?: number

    @Field({ nullable: true })
    public languageInDailyLife?: string

    @Field({ nullable: true })
    public knowsLatinAlphabet?: boolean

    @Field(() => StudentDutchLastKnownLevelEnum, { nullable: true })
    public lastKnownLevel?: StudentDutchLastKnownLevelEnum
}

enum StudentSpeakingLevelEnum {
    BEGINNER = 'BEGINNER', // Beginner
    REASONABLE = 'REASONABLE', // Redelijk
    ADVANCED = 'ADVANCED', // Gevorderd
}
registerEnumType(StudentSpeakingLevelEnum, { name: 'StudentSpeakingLevelEnum' })

enum StudentLastFollowedEducationEnum {
    NO_EDUCATION = 'NO_EDUCATION', // Geen onderwijs
    SOME_YEARS_PO = 'SOME_YEARS_PO', // enkele jaren po
    PO = 'PO', // po
    VO = 'VO', // vo (lbo, vmbo, mavo, havo, vwo)
    MBO = 'MBO', // mbo
    HBO = 'HBO', // hbo
    UNIVERSITY = 'UNIVERSITY', // universiteit
}
registerEnumType(StudentLastFollowedEducationEnum, { name: 'StudentLastFollowedEducationEnum' })

enum StudentFollowingEducationRightNowEnum {
    YES = 'YES',
    NO = 'NO',
    NO_BUT_DID_EARLIER = 'NO_BUT_DID_EARLIER',
}
registerEnumType(StudentFollowingEducationRightNowEnum, { name: 'StudentFollowingEducationRightNowEnum' })

enum StudentFollowingEducationRightNowLevelEnum {
    LANGUAGE_COURSE = 'LANGUAGE_COURSE', // Taalles
    BO = 'BO', // Beroepsopleiding
    HBO = 'HBO', // Hbo
    WO = 'WO', // WO
    OTHER = 'OTHER', // Anders
}
registerEnumType(StudentFollowingEducationRightNowLevelEnum, { name: 'StudentFollowingEducationRightNowLevelEnum' })

@InputType()
class CreateStudentEducationInputType {
    @Field(() => StudentLastFollowedEducationEnum, { nullable: true })
    public lastFollowedEducation?: StudentLastFollowedEducationEnum

    @Field({ nullable: true })
    public didGraduate?: boolean

    @Field(() => StudentFollowingEducationRightNowEnum, { nullable: true })
    public followingEducationRightNow?: StudentFollowingEducationRightNowEnum

    @Field({ nullable: true })
    public followingEducationRightNowYesStartDate?: string

    @Field({ nullable: true })
    public followingEducationRightNowYesEndDate?: string

    @Field(() => StudentFollowingEducationRightNowLevelEnum, { nullable: true })
    public followingEducationRightNowYesLevel?: StudentFollowingEducationRightNowLevelEnum

    @Field({ nullable: true })
    public followingEducationRightNowYesInstitute?: string

    @Field({ nullable: true })
    public followingEducationRightNowYesProvidesCertificate?: boolean

    @Field({ nullable: true })
    public followingEducationRightNowNoEndDate?: string

    @Field({ nullable: true })
    public followingEducationRightNowNoLevel?: string

    @Field({ nullable: true })
    public followingEducationRightNowNoGotCertificate?: boolean
}

enum StudentFollowingCourseTeacherEnum {
    PROFESSIONAL = 'PROFESSIONAL',
    VOLUNTEER = 'VOLUNTEER',
    BOTH = 'PROFESSIONAL_AND_VOLUNTEER',
}
registerEnumType(StudentFollowingCourseTeacherEnum, { name: 'StudentFollowingCourseTeacherEnum' })

enum StudentFollowingCourseGroupEnum {
    INDIVIDUALLY = 'INDIVIDUALLY',
    GROUP = 'GROUP',
}
registerEnumType(StudentFollowingCourseGroupEnum, { name: 'StudentFollowingCourseGroupEnum' })

@InputType()
class CreateStudentCourseInputType {
    @Field({ nullable: true })
    public isFollowingCourseRightNow?: boolean

    @Field({ nullable: true })
    public courseName?: string

    @Field(() => StudentFollowingCourseTeacherEnum, { nullable: true })
    public courseTeacher?: StudentFollowingCourseTeacherEnum

    @Field(() => StudentFollowingCourseGroupEnum, { nullable: true })
    public courseGroup?: StudentFollowingCourseGroupEnum

    @Field(() => Int, { nullable: true })
    public amountOfHours?: number

    @Field({ nullable: true })
    public doesCourseProvideCertificate?: boolean
}

enum StudentJobDaytimeActivitiesEnum {
    SEARCHING_FOR_JOB = 'SEARCHING_FOR_JOB', // Op zoek naar werk
    RE_INTEGRATION = 'RE_INTEGRATION', // Re-integratie
    SCHOOL = 'SCHOOL', // Studie/school
    VOLUNTEER_JOB = 'VOLUNTEER_JOB', // Vrijwilligerswerk
    JOB = 'JOB', // Werk
    OTHER = 'OTHER', // Werk
}
registerEnumType(StudentJobDaytimeActivitiesEnum, { name: 'StudentJobDaytimeActivitiesEnum' })

@InputType()
class CreateStudentJobInputType {
    @Field({ nullable: true })
    public trainedForJob?: string

    @Field({ nullable: true })
    public lastJob?: string

    @Field(() => [StudentJobDaytimeActivitiesEnum], { nullable: true })
    public dayTimeActivities?: StudentJobDaytimeActivitiesEnum[]

    @Field({ nullable: true })
    public dayTimeActivitiesOther?: string
}

enum StudentMotivationDesiredSkillsEnum {
    KLIKTIK = 'KLIKTIK', // Klik & Tik
    USING_WHATSAPP = 'USING_WHATSAPP', // Leren whatsappen
    USING_SKYPE = 'USING_SKYPE', // Leren skypen
    DEVICE_FUNCTIONALITIES = 'DEVICE_FUNCTIONALITIES', // Functionaliteiten apparaat leren kennen
    DIGITAL_GOVERNMENT = 'DIGITAL_GOVERNMENT', // Met digitiale overheid werken
    RESERVE_BOOKS_IN_LIBRARY = 'RESERVE_BOOKS_IN_LIBRARY', // Boeken kunnen reserveren in de bibliotheek
    ADS_ON_MARKTPLAATS = 'ADS_ON_MARKTPLAATS', // Een advertentie op martkplaats zetten

    READ_FOR_CHILDREN = 'READ_FOR_CHILDREN', // Voorlezen aan mijn (klein)kind
    UNDERSTAND_PRESCRIPTIONS = 'UNDERSTAND_PRESCRIPTIONS', // Een bijsluiter begrijpen

    WRITE_APPLICATION_LETTER = 'WRITE_APPLICATION_LETTER', // Sollicitatiebrief schrijven
    WRITE_POSTCARD_FOR_FAMILY = 'WRITE_POSTCARD_FOR_FAMILY', // Een kaart aan familie kunnen sturen

    DO_ADMINISTRATION = 'DO_ADMINISTRATION', // Mijn eigen administratie kunnen doen
    CALCULATIONS_FOR_RECIPES = 'CALCULATIONS_FOR_RECIPES', // Hoeveelheden bij een recept kunnen uitrekenen

    OTHER = 'OTHER',
}
registerEnumType(StudentMotivationDesiredSkillsEnum, { name: 'StudentMotivationDesiredSkillsEnum' })

enum StudentMotivationDesiredLearningMethodsEnum {
    IN_A_GROUP = 'IN_A_GROUP', // In een groep
    ONE_ON_ONE = 'ONE_ON_ONE', // Een-op-een
    HOME_ENVIRONMENT = 'HOME_ENVIRONMENT', // In thuis omgeving
    IN_LIBRARY_OR_OTHER = 'IN_LIBRARY_OR_OTHER', // In de bibliotheek of elders
    ONLINE = 'ONLINE', // Online
}
registerEnumType(StudentMotivationDesiredLearningMethodsEnum, { name: 'StudentMotivationDesiredLearningMethodsEnum' })

@InputType()
class CreateStudentMotivationInputType {
    @Field(() => [StudentMotivationDesiredSkillsEnum], { nullable: true })
    public desiredSkills?: StudentMotivationDesiredSkillsEnum[]

    @Field({ nullable: true })
    public desiredSkillsOther?: string

    @Field({ nullable: true })
    public hasTriedThisBefore?: boolean

    @Field({ nullable: true })
    public hasTriedThisBeforeExplanation?: string

    @Field({ nullable: true })
    public whyWantTheseSkills?: string

    @Field({ nullable: true })
    public whyWantThisNow?: string

    @Field(() => [StudentMotivationDesiredLearningMethodsEnum], { nullable: true })
    public desiredLearningMethod?: StudentMotivationDesiredLearningMethodsEnum[]

    @Field({ nullable: true })
    public remarks?: string
}

@InputType()
class CreateStudentAvailabilityDayInputType {
    @Field()
    public morning?: boolean

    @Field()
    public afternoon?: boolean

    @Field()
    public evening?: boolean
}

@InputType()
class CreateStudentAvailabilityDaysInputType {
    @Field()
    @ValidateNested()
    public monday?: CreateStudentAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public tuesday?: CreateStudentAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public wednesday?: CreateStudentAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public thursday?: CreateStudentAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public friday?: CreateStudentAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public saturday?: CreateStudentAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public sunday?: CreateStudentAvailabilityDayInputType
}

@InputType()
class CreateStudentAvailabilityInputType {
    @Field({ nullable: true })
    @Type(() => CreateStudentAvailabilityDaysInputType)
    @ValidateNested()
    public availability?: CreateStudentAvailabilityDaysInputType

    @Field({ nullable: true })
    public availabilityNotes?: string
}

enum StudentReadingTestResultEnum {
    CAN_NOT_READ = 'CAN_NOT_READ', // Kan niet lezen
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
}
registerEnumType(StudentReadingTestResultEnum, { name: 'StudentReadingTestResultEnum' })

enum StudentWritingTestResultEnum {
    CAN_NOT_WRITE = 'CAN_NOT_WRITE', // Kan niet schrijven
    WRITE_NAW_DETAILS = 'WRITE_NAW_DETAILS', // Kan NAW gegevens schrijven
    WRITE_SIMPLE_TEXTS = 'WRITE_SIMPLE_TEXTS', // Kan eenvoudige teksten schrijven (boodschappenbriefje etc.)
    WRITE_SIMPLE_LETTERS = 'WRITE_SIMPLE_LETTERS', // Kan (eenvoudige) brieven schrijven
}
registerEnumType(StudentWritingTestResultEnum, { name: 'StudentWritingTestResultEnum' })

@InputType()
class CreateStudentPermissionInputType {
    @Field()
    public didSignPermissionForm!: boolean

    @Field()
    public hasPermissionToShareDataWithAanbieders!: boolean

    @Field()
    public hasPermissionToShareDataWithLibraries!: boolean

    @Field()
    public hasPermissionToSendInformationAboutLibraries!: boolean
}

@InputType()
// export class CreateStudentInputType implements CreateStudentInput {
export class CreateStudentInputType {
    @Field()
    @IsUrl()
    public taalhuisId!: string

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentCivicIntegrationInputType)
    @ValidateNested()
    public civicIntegrationDetails!: CreateStudentCivicIntegrationInputType

    // TOOD: Disable field to not break the frontend
    @Field()
    @Type(() => CreateStudentPersonInputType)
    @ValidateNested()
    public personDetails!: CreateStudentPersonInputType

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentContactInputType)
    @ValidateNested()
    public contactDetails!: CreateStudentContactInputType

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentGeneralInputType)
    @ValidateNested()
    public generalDetails!: CreateStudentGeneralInputType

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentReferrerInputType)
    @ValidateNested()
    public referrerDetails!: CreateStudentReferrerInputType

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentBackgroundInputType)
    @ValidateNested()
    public backgroundDetails!: CreateStudentBackgroundInputType

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentDutchNTInputType)
    @ValidateNested()
    public dutchNTDetails!: CreateStudentDutchNTInputType

    // TOOD: Disable field to not break the frontend
    @Field(() => StudentSpeakingLevelEnum, { nullable: true })
    public speakingLevel?: StudentSpeakingLevelEnum

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentEducationInputType)
    @ValidateNested()
    public educationDetails!: CreateStudentEducationInputType

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentCourseInputType)
    @ValidateNested()
    public courseDetails!: CreateStudentCourseInputType

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentJobInputType)
    @ValidateNested()
    public jobDetails!: CreateStudentJobInputType

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentMotivationInputType)
    @ValidateNested()
    public motivationDetails!: CreateStudentMotivationInputType

    // TOOD: Disable field to not break the frontend
    @Field({ nullable: true })
    @Type(() => CreateStudentAvailabilityInputType)
    @ValidateNested()
    public availabilityDetails!: CreateStudentAvailabilityInputType

    // TOOD: Disable field to not break the frontend
    @Field(() => StudentReadingTestResultEnum, { nullable: true })
    public readingTestResult?: StudentReadingTestResultEnum

    // TOOD: Disable field to not break the frontend
    @Field(() => StudentWritingTestResultEnum, { nullable: true })
    public writingTestResult?: StudentWritingTestResultEnum

    // TOOD: Disable field to not break the frontend
    @Field()
    @Type(() => CreateStudentPermissionInputType)
    @ValidateNested()
    public permissionDetails!: CreateStudentPermissionInputType

    // @Field()
    // public givenName!: string

    // @Field(() => String, { nullable: true })
    // public additionalName?: string | null

    // @Field()
    // public familyName!: string

    // @Field(() => String, { nullable: true })
    // public email?: string | null

    // @Field(() => String, { nullable: true })
    // public telephone?: string | null
}
