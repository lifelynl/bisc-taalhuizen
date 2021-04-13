import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantStatusEnum'
import {
    StudentCivicIntegrationRequirementEnum,
    StudentCivicIntegrationRequirementReasonEnum,
    StudentGenderEnum,
} from '../services/CreateStudentService'
import {
    StudentBaseInputFields,
    StudentContactPreferenceEnum,
    StudentDutchLastKnownLevelEnum,
    StudentDutchNTLevelEnum,
    StudentFamilyCompositionEnum,
    StudentFollowingCourseGroupEnum,
    StudentFollowingCourseTeacherEnum,
    StudentFollowingEducationRightNowEnum,
    StudentFollowingEducationRightNowLevelEnum,
    StudentFoundViaEnum,
    StudentJobDaytimeActivitiesEnum,
    StudentLastFollowedEducationEnum,
    StudentMotivationDesiredLearningMethodsEnum,
    StudentMotivationDesiredSkillsEnum,
    StudentNetworkEnum,
    StudentReadingTestResultEnum,
    StudentReferringOrganizationEnum,
    StudentSpeakingLevelEnum,
    StudentWritingTestResultEnum,
} from './CreateStudentInputType'

@ObjectType()
class StudentRegistrarType {
    @Field()
    public id!: string

    @Field()
    public organisationName!: string

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    public email!: string

    @Field()
    public telephone!: string
}

@ObjectType()
class StudentCivicIntegrationType {
    @Field(() => StudentCivicIntegrationRequirementEnum, { nullable: true })
    public civicIntegrationRequirement!: StudentCivicIntegrationRequirementEnum

    @Field(() => StudentCivicIntegrationRequirementReasonEnum, { nullable: true })
    public civicIntegrationRequirementReason?: StudentCivicIntegrationRequirementReasonEnum

    @Field({ nullable: true })
    public civicIntegrationRequirementFinishDate?: string
}

@ObjectType()
class StudentPersonType {
    @Field()
    public givenName!: string

    @Field(() => String, { nullable: true })
    public additionalName?: string | null

    @Field()
    public familyName!: string

    @Field(() => StudentGenderEnum, { nullable: true })
    public gender!: StudentGenderEnum

    @Field(() => String, { nullable: true })
    public dateOfBirth!: string
}

@ObjectType()
class StudentContactType {
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

@ObjectType()
class StudentGeneralType {
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

@ObjectType()
class StudentReferrerType {
    @Field(() => StudentReferringOrganizationEnum, { nullable: true })
    public referringOrganization?: StudentReferringOrganizationEnum

    @Field({ nullable: true })
    public referringOrganizationOther?: string

    @Field({ nullable: true })
    public email?: string
}

@ObjectType()
class StudentBackgroundType {
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

@ObjectType()
class StudentDutchNTType {
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

@ObjectType()
class StudentEducationType {
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

@ObjectType()
class StudentCourseType {
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

@ObjectType()
class StudentJobType {
    @Field({ nullable: true })
    public trainedForJob?: string

    @Field({ nullable: true })
    public lastJob?: string

    @Field(() => [StudentJobDaytimeActivitiesEnum], { nullable: true })
    public dayTimeActivities?: StudentJobDaytimeActivitiesEnum[]

    @Field({ nullable: true })
    public dayTimeActivitiesOther?: string
}

@ObjectType()
class StudentMotivationType {
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

@ObjectType()
class StudentAvailabilityDayType {
    @Field()
    public morning?: boolean

    @Field()
    public afternoon?: boolean

    @Field()
    public evening?: boolean
}

@ObjectType()
class StudentAvailabilityDaysType {
    @Field()
    public monday?: StudentAvailabilityDayType

    @Field()
    public tuesday?: StudentAvailabilityDayType

    @Field()
    public wednesday?: StudentAvailabilityDayType

    @Field()
    public thursday?: StudentAvailabilityDayType

    @Field()
    public friday?: StudentAvailabilityDayType

    @Field()
    public saturday?: StudentAvailabilityDayType

    @Field()
    public sunday?: StudentAvailabilityDayType
}

@ObjectType()
class StudentAvailabilityType {
    @Field(() => StudentAvailabilityDaysType, { nullable: true })
    public availability?: StudentAvailabilityDaysType

    @Field({ nullable: true })
    public availabilityNotes?: string
}

@ObjectType()
class StudentPermissionType {
    @Field()
    public didSignPermissionForm!: boolean

    @Field()
    public hasPermissionToShareDataWithAanbieders!: boolean

    @Field()
    public hasPermissionToShareDataWithLibraries!: boolean

    @Field()
    public hasPermissionToSendInformationAboutLibraries!: boolean
}

@ObjectType()
export class StudentType {
    @Field()
    public id!: string

    @Field()
    public dateCreated!: string

    @Field(() => ParticipantStatusEnum)
    public status!: ParticipantStatusEnum

    @Field({ nullable: true })
    public memo?: string

    @Field(() => StudentRegistrarType, { nullable: true })
    public registrar?: StudentRegistrarType

    @Field(() => StudentCivicIntegrationType, { nullable: true })
    public civicIntegrationDetails!: StudentCivicIntegrationType

    @Field(() => StudentPersonType)
    public personDetails!: StudentPersonType

    @Field(() => StudentContactType, { nullable: true })
    public contactDetails!: StudentContactType

    @Field(() => StudentGeneralType, { nullable: true })
    public generalDetails!: StudentGeneralType

    @Field(() => StudentReferrerType, { nullable: true })
    public referrerDetails!: StudentReferrerType

    @Field(() => StudentBackgroundType, { nullable: true })
    public backgroundDetails!: StudentBackgroundType

    @Field(() => StudentDutchNTType, { nullable: true })
    public dutchNTDetails!: StudentDutchNTType

    @Field(() => StudentSpeakingLevelEnum, { nullable: true })
    public speakingLevel?: StudentSpeakingLevelEnum

    @Field(() => StudentEducationType, { nullable: true })
    public educationDetails!: StudentEducationType

    @Field(() => StudentCourseType, { nullable: true })
    public courseDetails!: StudentCourseType

    @Field(() => StudentJobType, { nullable: true })
    public jobDetails!: StudentJobType

    @Field(() => StudentMotivationType, { nullable: true })
    public motivationDetails!: StudentMotivationType

    @Field(() => StudentAvailabilityType, { nullable: true })
    public availabilityDetails!: StudentAvailabilityType

    @Field(() => StudentReadingTestResultEnum, { nullable: true })
    public readingTestResult?: StudentReadingTestResultEnum

    @Field(() => StudentWritingTestResultEnum, { nullable: true })
    public writingTestResult?: StudentWritingTestResultEnum

    @Field(() => StudentPermissionType)
    public permissionDetails!: StudentPermissionType
}
