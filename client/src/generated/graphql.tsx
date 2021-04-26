import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    DateTime: Date
}

export type ProviderAddressType = {
    __typename?: 'ProviderAddressType'
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type ProviderEmployeeAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type ProviderEmployeeAddressType = {
    __typename?: 'ProviderEmployeeAddressType'
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type ProviderEmployeeAvailabilityDaysType = {
    __typename?: 'ProviderEmployeeAvailabilityDaysType'
    monday: ProviderEmployeeAvailabilityDayType
    tuesday: ProviderEmployeeAvailabilityDayType
    wednesday: ProviderEmployeeAvailabilityDayType
    thursday: ProviderEmployeeAvailabilityDayType
    friday: ProviderEmployeeAvailabilityDayType
    saturday: ProviderEmployeeAvailabilityDayType
    sunday: ProviderEmployeeAvailabilityDayType
}

export type ProviderEmployeeAvailabilityDayType = {
    __typename?: 'ProviderEmployeeAvailabilityDayType'
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export enum ProviderEmployeeContactPreferenceEnum {
    Phonecall = 'PHONECALL',
    Whatsapp = 'WHATSAPP',
    Email = 'EMAIL',
    Other = 'OTHER',
}

export enum ProviderEmployeeCurrentEducationEnum {
    Yes = 'YES',
    No = 'NO',
    NoButDidFollow = 'NO_BUT_DID_FOLLOW',
}

export type ProviderEmployeeCurrentEducationNoButDidFollowType = {
    __typename?: 'ProviderEmployeeCurrentEducationNoButDidFollowType'
    dateUntil?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    gotCertificate?: Maybe<Scalars['Boolean']>
}

export type ProviderEmployeeCurrentEducationYesType = {
    __typename?: 'ProviderEmployeeCurrentEducationYesType'
    dateSince?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    doesProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type ProviderEmployeeDocumentDownloadType = {
    __typename?: 'ProviderEmployeeDocumentDownloadType'
    base64data: Scalars['String']
}

export type ProviderEmployeeDocumentType = {
    __typename?: 'ProviderEmployeeDocumentType'
    id: Scalars['String']
    filename: Scalars['String']
    dateCreated: Scalars['String']
}

export enum ProviderEmployeeGenderEnum {
    Male = 'MALE',
    Female = 'FEMALE',
    X = 'X',
}

export enum ProviderEmployeeProfessionalismEnum {
    Professional = 'PROFESSIONAL',
    Volunteer = 'VOLUNTEER',
    Both = 'BOTH',
}

export enum ProviderEmployeeTargetGroupPreferenceEnum {
    Nt1 = 'NT1',
    Nt2 = 'NT2',
}

export type ProviderEmployeeType = {
    __typename?: 'ProviderEmployeeType'
    userId: Scalars['String']
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<ProviderUserRoleType>
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    availability?: Maybe<ProviderEmployeeAvailabilityDaysType>
    availabilityNotes?: Maybe<Scalars['String']>
    email: Scalars['String']
    gender?: Maybe<ProviderEmployeeGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
    address?: Maybe<ProviderEmployeeAddressType>
    contactTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<ProviderEmployeeContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
    targetGroupPreference?: Maybe<Array<ProviderEmployeeTargetGroupPreferenceEnum>>
    volunteringPreference?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<ProviderEmployeeCurrentEducationEnum>
    currentEducationYes?: Maybe<ProviderEmployeeCurrentEducationYesType>
    currentEdicationNoButDidFollow?: Maybe<ProviderEmployeeCurrentEducationNoButDidFollowType>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<ProviderEmployeeProfessionalismEnum>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<ProviderEmployeeProfessionalismEnum>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    isVOGChecked?: Maybe<Scalars['Boolean']>
}

export type ProviderType = {
    __typename?: 'ProviderType'
    id: Scalars['String']
    name: Scalars['String']
    address?: Maybe<ProviderAddressType>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
}

export type ProviderUserRoleType = {
    __typename?: 'ProviderUserRoleType'
    id: Scalars['String']
    name: UserRoleEnum
}

export type AddOrRemoveMentorToParticipationInputType = {
    participationId: Scalars['String']
    providerEmployeeId: Scalars['String']
}

export type AddOrRemoveParticipationToGroupInputType = {
    participationId: Scalars['String']
    groupId: Scalars['String']
}

export type BiscEmployeeType = {
    __typename?: 'BiscEmployeeType'
    id: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
}

export type ContextUserType = {
    __typename?: 'ContextUserType'
    id: Scalars['String']
    username: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    userEnvironment: UserEnvironmentEnum
    organizationId?: Maybe<Scalars['String']>
    organizationName?: Maybe<Scalars['String']>
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<LanguageHouseUserRoleType>
}

export type CreateProviderAddressInputType = {
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type CreateProviderEmployeeAvailabilityDayInputType = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type CreateProviderEmployeeAvailabilityInputType = {
    monday: CreateProviderEmployeeAvailabilityDayInputType
    tuesday: CreateProviderEmployeeAvailabilityDayInputType
    wednesday: CreateProviderEmployeeAvailabilityDayInputType
    thursday: CreateProviderEmployeeAvailabilityDayInputType
    friday: CreateProviderEmployeeAvailabilityDayInputType
    saturday: CreateProviderEmployeeAvailabilityDayInputType
    sunday: CreateProviderEmployeeAvailabilityDayInputType
}

export type CreateProviderEmployeeCurrentEducationNoButDidFollowInputType = {
    dateUntil?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    gotCertificate?: Maybe<Scalars['Boolean']>
}

export type CreateProviderEmployeeCurrentEducationYesInputType = {
    dateSince?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    doesProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type CreateProviderEmployeeDocumentInputType = {
    providerEmployeeId: Scalars['String']
    filename: Scalars['String']
    base64data: Scalars['String']
}

export type CreateProviderEmployeeInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    availability?: Maybe<CreateProviderEmployeeAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    email: Scalars['String']
    userGroupIds: Array<Scalars['String']>
    gender?: Maybe<ProviderEmployeeGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
    address?: Maybe<ProviderEmployeeAddressInputType>
    contactTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<ProviderEmployeeContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
    targetGroupPreference?: Maybe<Array<ProviderEmployeeTargetGroupPreferenceEnum>>
    volunteringPreference?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<ProviderEmployeeCurrentEducationEnum>
    currentEducationYes?: Maybe<CreateProviderEmployeeCurrentEducationYesInputType>
    currentEdicationNoButDidFollow?: Maybe<CreateProviderEmployeeCurrentEducationNoButDidFollowInputType>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<ProviderEmployeeProfessionalismEnum>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<ProviderEmployeeProfessionalismEnum>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    isVOGChecked?: Maybe<Scalars['Boolean']>
    providerId: Scalars['String']
}

export type CreateBiscEmployeeInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type CreateGroupAvailabilityDayInputType = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type CreateGroupAvailabilityInputType = {
    monday: CreateGroupAvailabilityDayInputType
    tuesday: CreateGroupAvailabilityDayInputType
    wednesday: CreateGroupAvailabilityDayInputType
    thursday: CreateGroupAvailabilityDayInputType
    friday: CreateGroupAvailabilityDayInputType
    saturday: CreateGroupAvailabilityDayInputType
    sunday: CreateGroupAvailabilityDayInputType
}

export type CreateGroupInputType = {
    providerId: Scalars['String']
    name: Scalars['String']
    typeCourse: GroupTypeCourseEnum
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal: Scalars['Boolean']
    detailsTotalClassHours: Scalars['Int']
    detailsCertificateWillBeAwarded: Scalars['Boolean']
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    availability?: Maybe<CreateGroupAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    generalLocation: Scalars['String']
    generalParticipantsMin?: Maybe<Scalars['Int']>
    generalParticipantsMax?: Maybe<Scalars['Int']>
    generalEvaluation?: Maybe<Scalars['String']>
    providerEmployeeIds?: Maybe<Array<Scalars['String']>>
}

export type CreateLearningNeedInputType = {
    studentId: Scalars['String']
    learningNeedDescription: Scalars['String']
    learningNeedMotivation: Scalars['String']
    desiredOutComesGoal: Scalars['String']
    desiredOutComesTopic: LearningNeedTopicEnum
    desiredOutComesTopicOther?: Maybe<Scalars['String']>
    desiredOutComesApplication: LearningNeedApplicationEnum
    desiredOutComesApplicationOther?: Maybe<Scalars['String']>
    desiredOutComesLevel: LearningNeedLevelEnum
    desiredOutComesLevelOther?: Maybe<Scalars['String']>
    offerDesiredOffer: Scalars['String']
    offerAdvisedOffer: Scalars['String']
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther?: Maybe<Scalars['String']>
    offerEngagements?: Maybe<Scalars['String']>
}

export type CreateParticipationInputType = {
    providerId?: Maybe<Scalars['String']>
    providerName?: Maybe<Scalars['String']>
    providerNote?: Maybe<Scalars['String']>
    offerName?: Maybe<Scalars['String']>
    offerCourse?: Maybe<ParticipationOfferCourseEnum>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<LearningNeedTopicEnum>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<LearningNeedApplicationEnum>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<LearningNeedLevelEnum>
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['Boolean']>
    detailsGroupFormation?: Maybe<ParticipationGroupFormationEnum>
    detailsTotalClassHours?: Maybe<Scalars['Float']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['DateTime']>
    detailsEndDate?: Maybe<Scalars['DateTime']>
    detailsEngagements?: Maybe<Scalars['String']>
    learningNeedId: Scalars['String']
}

export type CreateStudentAvailabilityDayInputType = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type CreateStudentAvailabilityDaysInputType = {
    monday: CreateStudentAvailabilityDayInputType
    tuesday: CreateStudentAvailabilityDayInputType
    wednesday: CreateStudentAvailabilityDayInputType
    thursday: CreateStudentAvailabilityDayInputType
    friday: CreateStudentAvailabilityDayInputType
    saturday: CreateStudentAvailabilityDayInputType
    sunday: CreateStudentAvailabilityDayInputType
}

export type CreateStudentAvailabilityInputType = {
    availability?: Maybe<CreateStudentAvailabilityDaysInputType>
    availabilityNotes?: Maybe<Scalars['String']>
}

export type CreateStudentBackgroundInputType = {
    foundVia?: Maybe<StudentFoundViaEnum>
    foundViaOther?: Maybe<Scalars['String']>
    wentToLanguageHouseBefore?: Maybe<Scalars['Boolean']>
    wentToLanguageHouseBeforeReason?: Maybe<Scalars['String']>
    wentToLanguageHouseBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Array<StudentNetworkEnum>>
    participationLadder?: Maybe<Scalars['Int']>
}

export type CreateStudentCivicIntegrationInputType = {
    civicIntegrationRequirement?: Maybe<StudentCivicIntegrationRequirementEnum>
    civicIntegrationRequirementReason?: Maybe<StudentCivicIntegrationRequirementReasonEnum>
    civicIntegrationRequirementFinishDate?: Maybe<Scalars['String']>
}

export type CreateStudentContactInputType = {
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    contactPersonTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<StudentContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
}

export type CreateStudentCourseInputType = {
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<StudentFollowingCourseTeacherEnum>
    courseGroup?: Maybe<StudentFollowingCourseGroupEnum>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type CreateStudentDocumentInputType = {
    studentId: Scalars['String']
    filename: Scalars['String']
    base64data: Scalars['String']
}

export type CreateStudentDossierEventInputType = {
    studentId: Scalars['String']
    event: StudentDossierEventEnum
    eventDate: Scalars['String']
    eventDescription: Scalars['String']
}

export type CreateStudentDutchNtInputType = {
    dutchNTLevel?: Maybe<StudentDutchNtLevelEnum>
    inNetherlandsSinceYear?: Maybe<Scalars['Float']>
    languageInDailyLife?: Maybe<Scalars['String']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    lastKnownLevel?: Maybe<StudentDutchLastKnownLevelEnum>
}

export type CreateStudentEducationInputType = {
    lastFollowedEducation?: Maybe<StudentLastFollowedEducationEnum>
    didGraduate?: Maybe<Scalars['Boolean']>
    followingEducationRightNow?: Maybe<StudentFollowingEducationRightNowEnum>
    followingEducationRightNowYesStartDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesLevel?: Maybe<StudentFollowingEducationRightNowLevelEnum>
    followingEducationRightNowYesInstitute?: Maybe<Scalars['String']>
    followingEducationRightNowYesProvidesCertificate?: Maybe<Scalars['Boolean']>
    followingEducationRightNowNoEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowNoLevel?: Maybe<Scalars['String']>
    followingEducationRightNowNoGotCertificate?: Maybe<Scalars['Boolean']>
}

export type CreateStudentGeneralInputType = {
    countryOfOrigin?: Maybe<Scalars['String']>
    nativeLanguage?: Maybe<Scalars['String']>
    otherLanguages?: Maybe<Scalars['String']>
    familyComposition?: Maybe<Array<StudentFamilyCompositionEnum>>
    childrenCount?: Maybe<Scalars['Int']>
    childrenDatesOfBirth?: Maybe<Scalars['String']>
}

export type CreateStudentInputType = {
    civicIntegrationDetails?: Maybe<CreateStudentCivicIntegrationInputType>
    personDetails: CreateStudentPersonInputType
    contactDetails?: Maybe<CreateStudentContactInputType>
    generalDetails?: Maybe<CreateStudentGeneralInputType>
    referrerDetails?: Maybe<CreateStudentReferrerInputType>
    backgroundDetails?: Maybe<CreateStudentBackgroundInputType>
    dutchNTDetails?: Maybe<CreateStudentDutchNtInputType>
    speakingLevel?: Maybe<StudentSpeakingLevelEnum>
    educationDetails?: Maybe<CreateStudentEducationInputType>
    courseDetails?: Maybe<CreateStudentCourseInputType>
    jobDetails?: Maybe<CreateStudentJobInputType>
    motivationDetails?: Maybe<CreateStudentMotivationInputType>
    availabilityDetails?: Maybe<CreateStudentAvailabilityInputType>
    readingTestResult?: Maybe<StudentReadingTestResultEnum>
    writingTestResult?: Maybe<StudentWritingTestResultEnum>
    permissionDetails: CreateStudentPermissionInputType
    languageHouseId: Scalars['String']
}

export type CreateStudentJobInputType = {
    trainedForJob?: Maybe<Scalars['String']>
    lastJob?: Maybe<Scalars['String']>
    dayTimeActivities?: Maybe<Array<StudentJobDaytimeActivitiesEnum>>
    dayTimeActivitiesOther?: Maybe<Scalars['String']>
}

export type CreateStudentMotivationInputType = {
    desiredSkills?: Maybe<Array<StudentMotivationDesiredSkillsEnum>>
    desiredSkillsOther?: Maybe<Scalars['String']>
    hasTriedThisBefore?: Maybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: Maybe<Scalars['String']>
    whyWantTheseSkills?: Maybe<Scalars['String']>
    whyWantThisNow?: Maybe<Scalars['String']>
    desiredLearningMethod?: Maybe<Array<StudentMotivationDesiredLearningMethodsEnum>>
    remarks?: Maybe<Scalars['String']>
}

export type CreateStudentPermissionInputType = {
    didSignPermissionForm: Scalars['Boolean']
    hasPermissionToShareDataWithProviders: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
}

export type CreateStudentPersonInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    gender?: Maybe<StudentGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
}

export type CreateStudentReferrerInputType = {
    referringOrganization?: Maybe<StudentReferringOrganizationEnum>
    referringOrganizationOther?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
}

export type CreateLanguageHouseAddressInputType = {
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type CreateLanguageHouseEmployeeInputType = {
    languageHouseId: Scalars['String']
    userGroupId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type CreateTestResultInputType = {
    participationId: Scalars['String']
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    examUsedExam: Scalars['String']
    examDate: Scalars['String']
    examMemo?: Maybe<Scalars['String']>
}

export type DownloadDesiredLearningOutcomesReportInputType = {
    languageHouseId: Scalars['String']
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
}

export type DownloadParticipantsReportInputType = {
    languageHouseId: Scalars['String']
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
}

export type DownloadReportType = {
    __typename?: 'DownloadReportType'
    filename: Scalars['String']
    base64data: Scalars['String']
}

export type DownloadVolunteersReportInputType = {
    providerId: Scalars['String']
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
}

export type GroupAvailabilityDaysType = {
    __typename?: 'GroupAvailabilityDaysType'
    monday: GroupAvailabilityDayType
    tuesday: GroupAvailabilityDayType
    wednesday: GroupAvailabilityDayType
    thursday: GroupAvailabilityDayType
    friday: GroupAvailabilityDayType
    saturday: GroupAvailabilityDayType
    sunday: GroupAvailabilityDayType
}

export type GroupAvailabilityDayType = {
    __typename?: 'GroupAvailabilityDayType'
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type GroupType = {
    __typename?: 'GroupType'
    id: Scalars['String']
    name: Scalars['String']
    providerName: Scalars['String']
    typeCourse: GroupTypeCourseEnum
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal: Scalars['Boolean']
    detailsTotalClassHours: Scalars['Int']
    detailsCertificateWillBeAwarded: Scalars['Boolean']
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    availability?: Maybe<GroupAvailabilityDaysType>
    availabilityNotes?: Maybe<Scalars['String']>
    generalLocation: Scalars['String']
    generalParticipantsMin?: Maybe<Scalars['Int']>
    generalParticipantsMax?: Maybe<Scalars['Int']>
    generalEvaluation?: Maybe<Scalars['String']>
    providerEmployees?: Maybe<Array<ProviderEmployeeType>>
}

export enum GroupTypeCourseEnum {
    Language = 'LANGUAGE',
    Math = 'MATH',
    Digital = 'DIGITAL',
    Other = 'OTHER',
}

export enum LearningNeedApplicationEnum {
    FamilyAndParenting = 'FAMILY_AND_PARENTING',
    LaborMarketAndWork = 'LABOR_MARKET_AND_WORK',
    HealthAndWellbeing = 'HEALTH_AND_WELLBEING',
    AdministrationAndFinance = 'ADMINISTRATION_AND_FINANCE',
    HousingAndNeighborhood = 'HOUSING_AND_NEIGHBORHOOD',
    Selfreliance = 'SELFRELIANCE',
    Other = 'OTHER',
}

export enum LearningNeedLevelEnum {
    Inflow = 'INFLOW',
    Nlqf1 = 'NLQF1',
    Nlqf2 = 'NLQF2',
    Nlqf3 = 'NLQF3',
    Nlqf4 = 'NLQF4',
    Other = 'OTHER',
}

export enum LearningNeedOfferDifferenceEnum {
    No = 'NO',
    YesDistance = 'YES_DISTANCE',
    YesWaitinglist = 'YES_WAITINGLIST',
    YesOther = 'YES_OTHER',
}

export enum LearningNeedTopicEnum {
    DutchReading = 'DUTCH_READING',
    DutchWriting = 'DUTCH_WRITING',
    MathNumbers = 'MATH_NUMBERS',
    MathProportion = 'MATH_PROPORTION',
    MathGeometry = 'MATH_GEOMETRY',
    MathLinks = 'MATH_LINKS',
    DigitalUsingIctSystems = 'DIGITAL_USING_ICT_SYSTEMS',
    DigitalSearchingInformation = 'DIGITAL_SEARCHING_INFORMATION',
    DigitalProcessingInformation = 'DIGITAL_PROCESSING_INFORMATION',
    DigitalCommunication = 'DIGITAL_COMMUNICATION',
    Knowledge = 'KNOWLEDGE',
    Skills = 'SKILLS',
    Attitude = 'ATTITUDE',
    Behaviour = 'BEHAVIOUR',
    Other = 'OTHER',
}

export type LearningNeedType = {
    __typename?: 'LearningNeedType'
    id: Scalars['String']
    learningNeedDescription: Scalars['String']
    learningNeedMotivation: Scalars['String']
    desiredOutComesGoal: Scalars['String']
    desiredOutComesTopic: LearningNeedTopicEnum
    desiredOutComesTopicOther?: Maybe<Scalars['String']>
    desiredOutComesApplication: LearningNeedApplicationEnum
    desiredOutComesApplicationOther?: Maybe<Scalars['String']>
    desiredOutComesLevel: LearningNeedLevelEnum
    desiredOutComesLevelOther?: Maybe<Scalars['String']>
    offerDesiredOffer: Scalars['String']
    offerAdvisedOffer: Scalars['String']
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther?: Maybe<Scalars['String']>
    offerEngagements?: Maybe<Scalars['String']>
    participations: Array<ParticipationType>
}

export type Mutation = {
    __typename?: 'Mutation'
    login: RawReturnType
    requestPasswordReset: Scalars['Boolean']
    resetPassword: Scalars['Boolean']
    changePassword: Scalars['Boolean']
    createLanguageHouse: LanguageHouseType
    updateLanguageHouse: LanguageHouseType
    deleteLanguageHouse: Scalars['Boolean']
    createLanguageHouseEmployee: LanguageHouseEmployeeType
    deleteLanguageHouseEmployee: Scalars['Boolean']
    updateLanguageHouseEmployee: LanguageHouseEmployeeType
    createProvider: ProviderType
    updateProvider: ProviderType
    deleteProvider: Scalars['Boolean']
    createProviderEmployee: ProviderEmployeeType
    updateProviderEmployee: ProviderEmployeeType
    deleteProviderEmployee: Scalars['Boolean']
    registerStudent: Scalars['Boolean']
    deleteRegistration: Scalars['Boolean']
    acceptRegistration: StudentType
    createStudent: StudentType
    updateStudent: StudentType
    createLearningNeed: LearningNeedType
    updateLearningNeed: LearningNeedType
    deleteLearningNeed: Scalars['Boolean']
    createParticipation: ParticipationType
    createBiscEmployee: BiscEmployeeType
    updateBiscEmployee: BiscEmployeeType
    deleteBiscEmployee: Scalars['Boolean']
    downloadParticipantsReport: DownloadReportType
    downloadDesiredLearningOutcomesReport: DownloadReportType
    downloadVolunteersReport: DownloadReportType
    createProviderEmployeeDocument: ProviderEmployeeDocumentType
    downloadProviderEmployeeDocument: ProviderEmployeeDocumentDownloadType
    deleteProviderEmployeeDocument: Scalars['Boolean']
    createStudentDocument: StudentDocumentType
    downloadStudentDocument: StudentDocumentDownloadType
    deleteStudentDocument: Scalars['Boolean']
    createStudentDossierEvent: StudentDossierEventType
    updateStudentDossierEvent: StudentDossierEventType
    deleteStudentDossierEvent: Scalars['Boolean']
    deleteParticipation: Scalars['Boolean']
    updateParticipation: ParticipationType
    createTestResult: TestResultType
    updateTestResult: TestResultType
    deleteTestResult: Scalars['Boolean']
    createGroup: GroupType
    updateGroup: GroupType
    addMentorToParticipation: ProviderEmployeeType
    removeMentorFromParticipation: Scalars['Boolean']
    addParticipationToGroup: ParticipationType
    updateGroupParticipation: ParticipationType
    removeParticipationFromGroup: Scalars['Boolean']
}

export type MutationLoginArgs = {
    username: Scalars['String']
    password: Scalars['String']
}

export type MutationRequestPasswordResetArgs = {
    email: Scalars['String']
}

export type MutationResetPasswordArgs = {
    email: Scalars['String']
    token: Scalars['String']
    password: Scalars['String']
}

export type MutationChangePasswordArgs = {
    currentPassword: Scalars['String']
    newPassword: Scalars['String']
}

export type MutationCreateLanguageHouseArgs = {
    address?: Maybe<CreateLanguageHouseAddressInputType>
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationUpdateLanguageHouseArgs = {
    id: Scalars['String']
    address?: Maybe<UpdateLanguageHouseAddressInputType>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationDeleteLanguageHouseArgs = {
    id: Scalars['String']
}

export type MutationCreateLanguageHouseEmployeeArgs = {
    input: CreateLanguageHouseEmployeeInputType
}

export type MutationDeleteLanguageHouseEmployeeArgs = {
    userId: Scalars['String']
}

export type MutationUpdateLanguageHouseEmployeeArgs = {
    input: UpdateLanguageHouseEmployeeInputType
}

export type MutationCreateProviderArgs = {
    address?: Maybe<CreateProviderAddressInputType>
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationUpdateProviderArgs = {
    id: Scalars['String']
    address?: Maybe<UpdateProviderAddressInputType>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationDeleteProviderArgs = {
    id: Scalars['String']
}

export type MutationCreateProviderEmployeeArgs = {
    input: CreateProviderEmployeeInputType
}

export type MutationUpdateProviderEmployeeArgs = {
    input: UpdateProviderEmployeeInputType
}

export type MutationDeleteProviderEmployeeArgs = {
    userId: Scalars['String']
}

export type MutationRegisterStudentArgs = {
    input: RegisterStudentInputType
}

export type MutationDeleteRegistrationArgs = {
    studentId: Scalars['String']
}

export type MutationAcceptRegistrationArgs = {
    studentId: Scalars['String']
}

export type MutationCreateStudentArgs = {
    input: CreateStudentInputType
}

export type MutationUpdateStudentArgs = {
    input: UpdateStudentInputType
}

export type MutationCreateLearningNeedArgs = {
    input: CreateLearningNeedInputType
}

export type MutationUpdateLearningNeedArgs = {
    input: UpdateLearningNeedInputType
}

export type MutationDeleteLearningNeedArgs = {
    learningNeedId: Scalars['String']
}

export type MutationCreateParticipationArgs = {
    input: CreateParticipationInputType
}

export type MutationCreateBiscEmployeeArgs = {
    input: CreateBiscEmployeeInputType
}

export type MutationUpdateBiscEmployeeArgs = {
    input: UpdateBiscEmployeeInputType
}

export type MutationDeleteBiscEmployeeArgs = {
    biscEmployeeId: Scalars['String']
}

export type MutationDownloadParticipantsReportArgs = {
    input: DownloadParticipantsReportInputType
}

export type MutationDownloadDesiredLearningOutcomesReportArgs = {
    input: DownloadDesiredLearningOutcomesReportInputType
}

export type MutationDownloadVolunteersReportArgs = {
    input: DownloadVolunteersReportInputType
}

export type MutationCreateProviderEmployeeDocumentArgs = {
    input: CreateProviderEmployeeDocumentInputType
}

export type MutationDownloadProviderEmployeeDocumentArgs = {
    providerEmployeeDocumentId: Scalars['String']
}

export type MutationDeleteProviderEmployeeDocumentArgs = {
    providerEmployeeDocumentId: Scalars['String']
}

export type MutationCreateStudentDocumentArgs = {
    input: CreateStudentDocumentInputType
}

export type MutationDownloadStudentDocumentArgs = {
    studentDocumentId: Scalars['String']
}

export type MutationDeleteStudentDocumentArgs = {
    studentDocumentId: Scalars['String']
}

export type MutationCreateStudentDossierEventArgs = {
    input: CreateStudentDossierEventInputType
}

export type MutationUpdateStudentDossierEventArgs = {
    input: UpdateStudentDossierEventInputType
}

export type MutationDeleteStudentDossierEventArgs = {
    studentDossierEventId: Scalars['String']
}

export type MutationDeleteParticipationArgs = {
    participationId: Scalars['String']
}

export type MutationUpdateParticipationArgs = {
    input: UpdateParticipationInputType
}

export type MutationCreateTestResultArgs = {
    input: CreateTestResultInputType
}

export type MutationUpdateTestResultArgs = {
    input: UpdateTestResultInputType
}

export type MutationDeleteTestResultArgs = {
    testResultId: Scalars['String']
}

export type MutationCreateGroupArgs = {
    input: CreateGroupInputType
}

export type MutationUpdateGroupArgs = {
    input: UpdateGroupInputType
}

export type MutationAddMentorToParticipationArgs = {
    input: AddOrRemoveMentorToParticipationInputType
}

export type MutationRemoveMentorFromParticipationArgs = {
    input: AddOrRemoveMentorToParticipationInputType
}

export type MutationAddParticipationToGroupArgs = {
    input: AddOrRemoveParticipationToGroupInputType
}

export type MutationUpdateGroupParticipationArgs = {
    input: UpdateGroupParticipationInputType
}

export type MutationRemoveParticipationFromGroupArgs = {
    input: AddOrRemoveParticipationToGroupInputType
}

export enum ParticipantStatusEnum {
    Pending = 'pending',
    Accepted = 'accepted',
}

export enum ParticipationGroupFormationEnum {
    Individually = 'INDIVIDUALLY',
    InAGroup = 'IN_A_GROUP',
}

export enum ParticipationOfferCourseEnum {
    Language = 'LANGUAGE',
    Math = 'MATH',
    Digital = 'DIGITAL',
    Other = 'OTHER',
}

export enum ParticipationPresenceEndParticipationReasonEnum {
    Moved = 'MOVED',
    Job = 'JOB',
    Illness = 'ILLNESS',
    Death = 'DEATH',
    CompletedSuccessfully = 'COMPLETED_SUCCESSFULLY',
    FamilyCircumstances = 'FAMILY_CIRCUMSTANCES',
    DoesNotMeetExpectations = 'DOES_NOT_MEET_EXPECTATIONS',
    Other = 'OTHER',
}

export enum ParticipationStatusEnum {
    Active = 'ACTIVE',
    Completed = 'COMPLETED',
    Referred = 'REFERRED',
}

export type ParticipationType = {
    __typename?: 'ParticipationType'
    id: Scalars['String']
    status: ParticipationStatusEnum
    providerId?: Maybe<Scalars['String']>
    providerName?: Maybe<Scalars['String']>
    providerNote?: Maybe<Scalars['String']>
    offerName?: Maybe<Scalars['String']>
    offerCourse?: Maybe<ParticipationOfferCourseEnum>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<LearningNeedTopicEnum>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<LearningNeedApplicationEnum>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<LearningNeedLevelEnum>
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['Boolean']>
    detailsGroupFormation?: Maybe<ParticipationGroupFormationEnum>
    detailsTotalClassHours?: Maybe<Scalars['Float']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['DateTime']>
    detailsEndDate?: Maybe<Scalars['DateTime']>
    detailsEngagements?: Maybe<Scalars['String']>
}

export type Query = {
    __typename?: 'Query'
    currentUser: ContextUserType
    languageHouses: Array<LanguageHouseType>
    languageHouse: LanguageHouseType
    userRolesByLanguageHouseId: Array<LanguageHouseUserRoleType>
    languageHouseEmployees: Array<LanguageHouseEmployeeType>
    languageHouseEmployee: LanguageHouseEmployeeType
    providers: Array<ProviderType>
    provider: ProviderType
    providerEmployees: Array<ProviderEmployeeType>
    providerEmployee: ProviderEmployeeType
    userRolesByProviderId: Array<ProviderUserRoleType>
    registrations: Array<StudentType>
    registration: StudentType
    students: Array<StudentType>
    student: StudentType
    learningNeeds: Array<LearningNeedType>
    learningNeed: LearningNeedType
    biscEmployee: BiscEmployeeType
    biscEmployees: Array<BiscEmployeeType>
    providerEmployeeDocument: ProviderEmployeeDocumentType
    providerEmployeeDocuments: Array<ProviderEmployeeDocumentType>
    studentDocument: StudentDocumentType
    studentDocuments: Array<StudentDocumentType>
    studentDossierEvent: StudentDossierEventType
    studentDossierEvents: Array<StudentDossierEventType>
    participations: Array<ParticipationType>
    participation: ParticipationType
    testResults: Array<TestResultType>
    testResult: TestResultType
    providerEmployeeMentees: Array<StudentType>
    group: GroupType
    activeGroups: Array<GroupType>
    completedGroups: Array<GroupType>
    futureGroups: Array<GroupType>
    groupStudents: Array<StudentType>
    newReferredStudents: Array<StudentType>
    activeStudents: Array<StudentType>
    completedStudents: Array<StudentType>
}

export type QueryLanguageHouseArgs = {
    languageHouseId: Scalars['String']
}

export type QueryUserRolesByLanguageHouseIdArgs = {
    languageHouseId: Scalars['String']
}

export type QueryLanguageHouseEmployeesArgs = {
    languageHouseId: Scalars['String']
}

export type QueryLanguageHouseEmployeeArgs = {
    userId: Scalars['String']
}

export type QueryProviderArgs = {
    id: Scalars['String']
}

export type QueryProviderEmployeesArgs = {
    providerId: Scalars['String']
}

export type QueryProviderEmployeeArgs = {
    userId: Scalars['String']
}

export type QueryUserRolesByProviderIdArgs = {
    providerId: Scalars['String']
}

export type QueryRegistrationsArgs = {
    languageHouseId: Scalars['String']
}

export type QueryRegistrationArgs = {
    studentId: Scalars['String']
}

export type QueryStudentsArgs = {
    languageHouseId: Scalars['String']
}

export type QueryStudentArgs = {
    studentId: Scalars['String']
}

export type QueryLearningNeedsArgs = {
    studentId: Scalars['String']
}

export type QueryLearningNeedArgs = {
    learningNeedId: Scalars['String']
}

export type QueryBiscEmployeeArgs = {
    biscEmployeeId: Scalars['String']
}

export type QueryProviderEmployeeDocumentArgs = {
    providerEmployeeDocumentId: Scalars['String']
}

export type QueryProviderEmployeeDocumentsArgs = {
    providerEmployeeId: Scalars['String']
}

export type QueryStudentDocumentArgs = {
    studentDocumentId: Scalars['String']
}

export type QueryStudentDocumentsArgs = {
    studentId: Scalars['String']
}

export type QueryStudentDossierEventArgs = {
    studentDossierEventId: Scalars['String']
}

export type QueryStudentDossierEventsArgs = {
    studentId: Scalars['String']
}

export type QueryParticipationsArgs = {
    learningNeedId: Scalars['String']
}

export type QueryParticipationArgs = {
    participationId: Scalars['String']
}

export type QueryTestResultsArgs = {
    participationId: Scalars['String']
}

export type QueryTestResultArgs = {
    testResultId: Scalars['String']
}

export type QueryProviderEmployeeMenteesArgs = {
    providerEmployeeId: Scalars['String']
}

export type QueryGroupArgs = {
    groupId: Scalars['String']
}

export type QueryActiveGroupsArgs = {
    providerId: Scalars['String']
}

export type QueryCompletedGroupsArgs = {
    providerId: Scalars['String']
}

export type QueryFutureGroupsArgs = {
    providerId: Scalars['String']
}

export type QueryGroupStudentsArgs = {
    groupId: Scalars['String']
}

export type QueryNewReferredStudentsArgs = {
    providerId: Scalars['String']
}

export type QueryActiveStudentsArgs = {
    providerId: Scalars['String']
}

export type QueryCompletedStudentsArgs = {
    providerId: Scalars['String']
}

export type RawReturnType = {
    __typename?: 'RawReturnType'
    accessToken: Scalars['String']
}

export type RegisterStudentAddresInputType = {
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
}

export type RegisterStudentInputType = {
    languageHouseId: Scalars['String']
    student: RegisterStudentStudentInputType
    registrar: RegisterStudentRegistrarInputType
    memo?: Maybe<Scalars['String']>
}

export type RegisterStudentRegistrarInputType = {
    organisationName: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
}

export type RegisterStudentStudentInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
    address?: Maybe<RegisterStudentAddresInputType>
}

export type StudentAvailabilityDaysType = {
    __typename?: 'StudentAvailabilityDaysType'
    monday: StudentAvailabilityDayType
    tuesday: StudentAvailabilityDayType
    wednesday: StudentAvailabilityDayType
    thursday: StudentAvailabilityDayType
    friday: StudentAvailabilityDayType
    saturday: StudentAvailabilityDayType
    sunday: StudentAvailabilityDayType
}

export type StudentAvailabilityDayType = {
    __typename?: 'StudentAvailabilityDayType'
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type StudentAvailabilityType = {
    __typename?: 'StudentAvailabilityType'
    availability?: Maybe<StudentAvailabilityDaysType>
    availabilityNotes?: Maybe<Scalars['String']>
}

export type StudentBackgroundType = {
    __typename?: 'StudentBackgroundType'
    foundVia?: Maybe<StudentFoundViaEnum>
    foundViaOther?: Maybe<Scalars['String']>
    wentToLanguageHouseBefore?: Maybe<Scalars['Boolean']>
    wentToLanguageHouseBeforeReason?: Maybe<Scalars['String']>
    wentToLanguageHouseBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Array<StudentNetworkEnum>>
    participationLadder?: Maybe<Scalars['Int']>
}

export enum StudentCivicIntegrationRequirementEnum {
    No = 'NO',
    Yes = 'YES',
    CurrentlyWorkingOnIntegration = 'CURRENTLY_WORKING_ON_INTEGRATION',
}

export enum StudentCivicIntegrationRequirementReasonEnum {
    Finished = 'FINISHED',
    FromEuCountry = 'FROM_EU_COUNTRY',
    ExemptedOrZroute = 'EXEMPTED_OR_ZROUTE',
}

export type StudentCivicIntegrationType = {
    __typename?: 'StudentCivicIntegrationType'
    civicIntegrationRequirement?: Maybe<StudentCivicIntegrationRequirementEnum>
    civicIntegrationRequirementReason?: Maybe<StudentCivicIntegrationRequirementReasonEnum>
    civicIntegrationRequirementFinishDate?: Maybe<Scalars['String']>
}

export enum StudentContactPreferenceEnum {
    Phonecall = 'PHONECALL',
    Whatsapp = 'WHATSAPP',
    Email = 'EMAIL',
    Other = 'OTHER',
}

export type StudentContactType = {
    __typename?: 'StudentContactType'
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    contactPersonTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<StudentContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
}

export type StudentCourseType = {
    __typename?: 'StudentCourseType'
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<StudentFollowingCourseTeacherEnum>
    courseGroup?: Maybe<StudentFollowingCourseGroupEnum>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type StudentDocumentDownloadType = {
    __typename?: 'StudentDocumentDownloadType'
    base64data: Scalars['String']
}

export type StudentDocumentType = {
    __typename?: 'StudentDocumentType'
    id: Scalars['String']
    filename: Scalars['String']
    dateCreated: Scalars['String']
}

export enum StudentDossierEventEnum {
    FinalTalk = 'FINAL_TALK',
    Remark = 'REMARK',
    FollowUpTalk = 'FOLLOW_UP_TALK',
    InfoForStorytelling = 'INFO_FOR_STORYTELLING',
    Intake = 'INTAKE',
}

export type StudentDossierEventType = {
    __typename?: 'StudentDossierEventType'
    id: Scalars['String']
    event: StudentDossierEventEnum
    eventDate: Scalars['String']
    eventDescription: Scalars['String']
    createdByProviderEmployee: ProviderEmployeeType
}

export enum StudentDutchLastKnownLevelEnum {
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
    Unknown = 'UNKNOWN',
}

export enum StudentDutchNtLevelEnum {
    Nt1 = 'NT1',
    Nt2 = 'NT2',
}

export type StudentDutchNtType = {
    __typename?: 'StudentDutchNTType'
    dutchNTLevel?: Maybe<StudentDutchNtLevelEnum>
    inNetherlandsSinceYear?: Maybe<Scalars['Float']>
    languageInDailyLife?: Maybe<Scalars['String']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    lastKnownLevel?: Maybe<StudentDutchLastKnownLevelEnum>
}

export type StudentEducationType = {
    __typename?: 'StudentEducationType'
    lastFollowedEducation?: Maybe<StudentLastFollowedEducationEnum>
    didGraduate?: Maybe<Scalars['Boolean']>
    followingEducationRightNow?: Maybe<StudentFollowingEducationRightNowEnum>
    followingEducationRightNowYesStartDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesLevel?: Maybe<StudentFollowingEducationRightNowLevelEnum>
    followingEducationRightNowYesInstitute?: Maybe<Scalars['String']>
    followingEducationRightNowYesProvidesCertificate?: Maybe<Scalars['Boolean']>
    followingEducationRightNowNoEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowNoLevel?: Maybe<Scalars['String']>
    followingEducationRightNowNoGotCertificate?: Maybe<Scalars['Boolean']>
}

export enum StudentFamilyCompositionEnum {
    MarriedPartner = 'MARRIED_PARTNER',
    Single = 'SINGLE',
    Divorced = 'DIVORCED',
    Widow = 'WIDOW',
}

export enum StudentFollowingCourseGroupEnum {
    Individually = 'INDIVIDUALLY',
    Group = 'GROUP',
}

export enum StudentFollowingCourseTeacherEnum {
    Professional = 'PROFESSIONAL',
    Volunteer = 'VOLUNTEER',
    Both = 'BOTH',
}

export enum StudentFollowingEducationRightNowEnum {
    Yes = 'YES',
    No = 'NO',
    NoButDidEarlier = 'NO_BUT_DID_EARLIER',
}

export enum StudentFollowingEducationRightNowLevelEnum {
    LanguageCourse = 'LANGUAGE_COURSE',
    Bo = 'BO',
    Hbo = 'HBO',
    Wo = 'WO',
    Other = 'OTHER',
}

export enum StudentFoundViaEnum {
    VolunteerCenter = 'VOLUNTEER_CENTER',
    LibraryWebsite = 'LIBRARY_WEBSITE',
    SocialMedia = 'SOCIAL_MEDIA',
    Newspaper = 'NEWSPAPER',
    ViaVia = 'VIA_VIA',
    Other = 'OTHER',
}

export enum StudentGenderEnum {
    Male = 'MALE',
    Female = 'FEMALE',
    X = 'X',
}

export type StudentGeneralType = {
    __typename?: 'StudentGeneralType'
    countryOfOrigin?: Maybe<Scalars['String']>
    nativeLanguage?: Maybe<Scalars['String']>
    otherLanguages?: Maybe<Scalars['String']>
    familyComposition?: Maybe<Array<StudentFamilyCompositionEnum>>
    childrenCount?: Maybe<Scalars['Int']>
    childrenDatesOfBirth?: Maybe<Scalars['String']>
}

export enum StudentJobDaytimeActivitiesEnum {
    SearchingForJob = 'SEARCHING_FOR_JOB',
    ReIntegration = 'RE_INTEGRATION',
    School = 'SCHOOL',
    VolunteerJob = 'VOLUNTEER_JOB',
    Job = 'JOB',
    Other = 'OTHER',
}

export type StudentJobType = {
    __typename?: 'StudentJobType'
    trainedForJob?: Maybe<Scalars['String']>
    lastJob?: Maybe<Scalars['String']>
    dayTimeActivities?: Maybe<Array<StudentJobDaytimeActivitiesEnum>>
    dayTimeActivitiesOther?: Maybe<Scalars['String']>
}

export enum StudentLastFollowedEducationEnum {
    NoEducation = 'NO_EDUCATION',
    SomeYearsPo = 'SOME_YEARS_PO',
    Po = 'PO',
    Vo = 'VO',
    Mbo = 'MBO',
    Hbo = 'HBO',
    University = 'UNIVERSITY',
}

export enum StudentMotivationDesiredLearningMethodsEnum {
    InAGroup = 'IN_A_GROUP',
    OneOnOne = 'ONE_ON_ONE',
    HomeEnvironment = 'HOME_ENVIRONMENT',
    InLibraryOrOther = 'IN_LIBRARY_OR_OTHER',
    Online = 'ONLINE',
}

export enum StudentMotivationDesiredSkillsEnum {
    Kliktik = 'KLIKTIK',
    UsingWhatsapp = 'USING_WHATSAPP',
    UsingSkype = 'USING_SKYPE',
    DeviceFunctionalities = 'DEVICE_FUNCTIONALITIES',
    DigitalGovernment = 'DIGITAL_GOVERNMENT',
    ReserveBooksInLibrary = 'RESERVE_BOOKS_IN_LIBRARY',
    AdsOnMarktplaats = 'ADS_ON_MARKTPLAATS',
    ReadForChildren = 'READ_FOR_CHILDREN',
    UnderstandPrescriptions = 'UNDERSTAND_PRESCRIPTIONS',
    WriteApplicationLetter = 'WRITE_APPLICATION_LETTER',
    WritePostcardForFamily = 'WRITE_POSTCARD_FOR_FAMILY',
    DoAdministration = 'DO_ADMINISTRATION',
    CalculationsForRecipes = 'CALCULATIONS_FOR_RECIPES',
    Other = 'OTHER',
}

export type StudentMotivationType = {
    __typename?: 'StudentMotivationType'
    desiredSkills?: Maybe<Array<StudentMotivationDesiredSkillsEnum>>
    desiredSkillsOther?: Maybe<Scalars['String']>
    hasTriedThisBefore?: Maybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: Maybe<Scalars['String']>
    whyWantTheseSkills?: Maybe<Scalars['String']>
    whyWantThisNow?: Maybe<Scalars['String']>
    desiredLearningMethod?: Maybe<Array<StudentMotivationDesiredLearningMethodsEnum>>
    remarks?: Maybe<Scalars['String']>
}

export enum StudentNetworkEnum {
    HouseholdMembers = 'HOUSEHOLD_MEMBERS',
    Neighbors = 'NEIGHBORS',
    FamilyMembers = 'FAMILY_MEMBERS',
    AidWorkers = 'AID_WORKERS',
    FriendsAcquaintances = 'FRIENDS_ACQUAINTANCES',
    PeopleAtMosqueChurch = 'PEOPLE_AT_MOSQUE_CHURCH',
    AcquaintancesSpeakingOwnLanguage = 'ACQUAINTANCES_SPEAKING_OWN_LANGUAGE',
    AcquaintancesSpeakingDutch = 'ACQUAINTANCES_SPEAKING_DUTCH',
}

export type StudentPermissionType = {
    __typename?: 'StudentPermissionType'
    didSignPermissionForm: Scalars['Boolean']
    hasPermissionToShareDataWithProviders: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
}

export type StudentPersonType = {
    __typename?: 'StudentPersonType'
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    gender?: Maybe<StudentGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
}

export enum StudentReadingTestResultEnum {
    CanNotRead = 'CAN_NOT_READ',
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
}

export type StudentReferrerType = {
    __typename?: 'StudentReferrerType'
    referringOrganization?: Maybe<StudentReferringOrganizationEnum>
    referringOrganizationOther?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
}

export enum StudentReferringOrganizationEnum {
    Uwv = 'UWV',
    SocialService = 'SOCIAL_SERVICE',
    Library = 'LIBRARY',
    WelfareWork = 'WELFARE_WORK',
    NeighborhoodTeam = 'NEIGHBORHOOD_TEAM',
    VolunteerOrganization = 'VOLUNTEER_ORGANIZATION',
    LanguageProvider = 'LANGUAGE_PROVIDER',
    Other = 'OTHER',
}

export type StudentRegistrarType = {
    __typename?: 'StudentRegistrarType'
    id: Scalars['String']
    organisationName: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
}

export enum StudentSpeakingLevelEnum {
    Beginner = 'BEGINNER',
    Reasonable = 'REASONABLE',
    Advanced = 'ADVANCED',
}

export type StudentType = {
    __typename?: 'StudentType'
    id: Scalars['String']
    dateCreated: Scalars['String']
    status: ParticipantStatusEnum
    memo?: Maybe<Scalars['String']>
    registrar?: Maybe<StudentRegistrarType>
    civicIntegrationDetails?: Maybe<StudentCivicIntegrationType>
    personDetails: StudentPersonType
    contactDetails?: Maybe<StudentContactType>
    generalDetails?: Maybe<StudentGeneralType>
    referrerDetails?: Maybe<StudentReferrerType>
    backgroundDetails?: Maybe<StudentBackgroundType>
    dutchNTDetails?: Maybe<StudentDutchNtType>
    speakingLevel?: Maybe<StudentSpeakingLevelEnum>
    educationDetails?: Maybe<StudentEducationType>
    courseDetails?: Maybe<StudentCourseType>
    jobDetails?: Maybe<StudentJobType>
    motivationDetails?: Maybe<StudentMotivationType>
    availabilityDetails?: Maybe<StudentAvailabilityType>
    readingTestResult?: Maybe<StudentReadingTestResultEnum>
    writingTestResult?: Maybe<StudentWritingTestResultEnum>
    permissionDetails: StudentPermissionType
}

export enum StudentWritingTestResultEnum {
    CanNotWrite = 'CAN_NOT_WRITE',
    WriteNawDetails = 'WRITE_NAW_DETAILS',
    WriteSimpleTexts = 'WRITE_SIMPLE_TEXTS',
    WriteSimpleLetters = 'WRITE_SIMPLE_LETTERS',
}

export type LanguageHouseAddressType = {
    __typename?: 'LanguageHouseAddressType'
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type LanguageHouseEmployeeType = {
    __typename?: 'LanguageHouseEmployeeType'
    id: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<LanguageHouseUserRoleType>
}

export type LanguageHouseType = {
    __typename?: 'LanguageHouseType'
    id: Scalars['String']
    name: Scalars['String']
    address?: Maybe<LanguageHouseAddressType>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
}

export type LanguageHouseUserRoleType = {
    __typename?: 'LanguageHouseUserRoleType'
    id: Scalars['String']
    name: UserRoleEnum
}

export type TestResultType = {
    __typename?: 'TestResultType'
    id: Scalars['String']
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    examUsedExam: Scalars['String']
    examDate: Scalars['String']
    examMemo?: Maybe<Scalars['String']>
    examResult?: Maybe<Scalars['String']>
}

export type UpdateProviderAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type UpdateProviderEmployeeInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    availability?: Maybe<CreateProviderEmployeeAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    email: Scalars['String']
    userGroupIds: Array<Scalars['String']>
    gender?: Maybe<ProviderEmployeeGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
    address?: Maybe<ProviderEmployeeAddressInputType>
    contactTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<ProviderEmployeeContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
    targetGroupPreference?: Maybe<Array<ProviderEmployeeTargetGroupPreferenceEnum>>
    volunteringPreference?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<ProviderEmployeeCurrentEducationEnum>
    currentEducationYes?: Maybe<CreateProviderEmployeeCurrentEducationYesInputType>
    currentEdicationNoButDidFollow?: Maybe<CreateProviderEmployeeCurrentEducationNoButDidFollowInputType>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<ProviderEmployeeProfessionalismEnum>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<ProviderEmployeeProfessionalismEnum>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    isVOGChecked?: Maybe<Scalars['Boolean']>
    userId: Scalars['String']
}

export type UpdateBiscEmployeeInputType = {
    biscEmployeeId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type UpdateGroupInputType = {
    groupId: Scalars['String']
    name: Scalars['String']
    typeCourse: GroupTypeCourseEnum
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal: Scalars['Boolean']
    detailsTotalClassHours: Scalars['Int']
    detailsCertificateWillBeAwarded: Scalars['Boolean']
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    availability?: Maybe<CreateGroupAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    generalLocation: Scalars['String']
    generalParticipantsMin?: Maybe<Scalars['Int']>
    generalParticipantsMax?: Maybe<Scalars['Int']>
    generalEvaluation?: Maybe<Scalars['String']>
    providerEmployeeIds?: Maybe<Array<Scalars['String']>>
}

export type UpdateGroupParticipationInputType = {
    participationId: Scalars['String']
    presenceEngagements?: Maybe<Scalars['String']>
    presenceStartDate?: Maybe<Scalars['DateTime']>
    presenceEndDate?: Maybe<Scalars['DateTime']>
    presenceEndParticipationReason?: Maybe<ParticipationPresenceEndParticipationReasonEnum>
}

export type UpdateLearningNeedInputType = {
    learningNeedId: Scalars['String']
    learningNeedDescription: Scalars['String']
    learningNeedMotivation: Scalars['String']
    desiredOutComesGoal: Scalars['String']
    desiredOutComesTopic: LearningNeedTopicEnum
    desiredOutComesTopicOther?: Maybe<Scalars['String']>
    desiredOutComesApplication: LearningNeedApplicationEnum
    desiredOutComesApplicationOther?: Maybe<Scalars['String']>
    desiredOutComesLevel: LearningNeedLevelEnum
    desiredOutComesLevelOther?: Maybe<Scalars['String']>
    offerDesiredOffer: Scalars['String']
    offerAdvisedOffer: Scalars['String']
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther?: Maybe<Scalars['String']>
    offerEngagements?: Maybe<Scalars['String']>
}

export type UpdateParticipationInputType = {
    providerId?: Maybe<Scalars['String']>
    providerName?: Maybe<Scalars['String']>
    providerNote?: Maybe<Scalars['String']>
    offerName?: Maybe<Scalars['String']>
    offerCourse?: Maybe<ParticipationOfferCourseEnum>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<LearningNeedTopicEnum>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<LearningNeedApplicationEnum>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<LearningNeedLevelEnum>
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['Boolean']>
    detailsGroupFormation?: Maybe<ParticipationGroupFormationEnum>
    detailsTotalClassHours?: Maybe<Scalars['Float']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['DateTime']>
    detailsEndDate?: Maybe<Scalars['DateTime']>
    detailsEngagements?: Maybe<Scalars['String']>
    participationId: Scalars['String']
    presenceStartDate?: Maybe<Scalars['DateTime']>
    presenceEndDate?: Maybe<Scalars['DateTime']>
    presenceEndParticipationReason?: Maybe<ParticipationPresenceEndParticipationReasonEnum>
}

export type UpdateStudentDossierEventInputType = {
    studentDossierEventId: Scalars['String']
    event: StudentDossierEventEnum
    eventDate: Scalars['String']
    eventDescription: Scalars['String']
}

export type UpdateStudentInputType = {
    civicIntegrationDetails?: Maybe<CreateStudentCivicIntegrationInputType>
    personDetails: CreateStudentPersonInputType
    contactDetails?: Maybe<CreateStudentContactInputType>
    generalDetails?: Maybe<CreateStudentGeneralInputType>
    referrerDetails?: Maybe<CreateStudentReferrerInputType>
    backgroundDetails?: Maybe<CreateStudentBackgroundInputType>
    dutchNTDetails?: Maybe<CreateStudentDutchNtInputType>
    speakingLevel?: Maybe<StudentSpeakingLevelEnum>
    educationDetails?: Maybe<CreateStudentEducationInputType>
    courseDetails?: Maybe<CreateStudentCourseInputType>
    jobDetails?: Maybe<CreateStudentJobInputType>
    motivationDetails?: Maybe<CreateStudentMotivationInputType>
    availabilityDetails?: Maybe<CreateStudentAvailabilityInputType>
    readingTestResult?: Maybe<StudentReadingTestResultEnum>
    writingTestResult?: Maybe<StudentWritingTestResultEnum>
    permissionDetails: CreateStudentPermissionInputType
    studentId: Scalars['String']
}

export type UpdateLanguageHouseAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type UpdateLanguageHouseEmployeeInputType = {
    userId: Scalars['String']
    userGroupId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type UpdateTestResultInputType = {
    testResultId: Scalars['String']
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    examUsedExam: Scalars['String']
    examDate: Scalars['String']
    examMemo?: Maybe<Scalars['String']>
}

export enum UserEnvironmentEnum {
    Bisc = 'BISC',
    Taalhuis = 'TAALHUIS',
    Aanbieder = 'AANBIEDER',
}

export enum UserRoleEnum {
    AanbiederCoordinator = 'AANBIEDER_COORDINATOR',
    AanbiederMentor = 'AANBIEDER_MENTOR',
    AanbiederVolunteer = 'AANBIEDER_VOLUNTEER',
    TaalhuisCoordinator = 'TAALHUIS_COORDINATOR',
    TaalhuisEmployee = 'TAALHUIS_EMPLOYEE',
}

export type UserType = {
    __typename?: 'UserType'
    id: Scalars['String']
    username: Scalars['String']
}

export type AcceptRegistrationMutationVariables = Exact<{
    studentId: Scalars['String']
}>

export type AcceptRegistrationMutation = { __typename?: 'Mutation' } & {
    acceptRegistration: { __typename?: 'StudentType' } & Pick<StudentType, 'id' | 'dateCreated' | 'status'> & {
            personDetails: { __typename?: 'StudentPersonType' } & Pick<
                StudentPersonType,
                'givenName' | 'additionalName' | 'familyName' | 'gender' | 'dateOfBirth'
            >
        }
}

export type ChangePasswordMutationVariables = Exact<{
    currentPassword: Scalars['String']
    newPassword: Scalars['String']
}>

export type ChangePasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'changePassword'>

export type CreateBiscEmployeeMutationVariables = Exact<{
    input: CreateBiscEmployeeInputType
}>

export type CreateBiscEmployeeMutation = { __typename?: 'Mutation' } & {
    createBiscEmployee: { __typename?: 'BiscEmployeeType' } & Pick<
        BiscEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    >
}

export type CreateLanguageHouseMutationVariables = Exact<{
    address: CreateLanguageHouseAddressInputType
    name: Scalars['String']
    email: Scalars['String']
    phoneNumber: Scalars['String']
}>

export type CreateLanguageHouseMutation = { __typename?: 'Mutation' } & {
    createLanguageHouse: { __typename?: 'LanguageHouseType' } & Pick<
        LanguageHouseType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'LanguageHouseAddressType' } & Pick<
                    LanguageHouseAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type CreateLanguageHouseEmployeeMutationVariables = Exact<{
    input: CreateLanguageHouseEmployeeInputType
}>

export type CreateLanguageHouseEmployeeMutation = { __typename?: 'Mutation' } & {
    createLanguageHouseEmployee: { __typename?: 'LanguageHouseEmployeeType' } & Pick<
        LanguageHouseEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    > & {
            userRoles: Array<
                { __typename?: 'LanguageHouseUserRoleType' } & Pick<LanguageHouseUserRoleType, 'id' | 'name'>
            >
        }
}

export type CreateLearningNeedMutationVariables = Exact<{
    input: CreateLearningNeedInputType
}>

export type CreateLearningNeedMutation = { __typename?: 'Mutation' } & {
    createLearningNeed: { __typename?: 'LearningNeedType' } & Pick<
        LearningNeedType,
        | 'id'
        | 'learningNeedDescription'
        | 'learningNeedMotivation'
        | 'desiredOutComesGoal'
        | 'desiredOutComesTopic'
        | 'desiredOutComesTopicOther'
        | 'desiredOutComesApplication'
        | 'desiredOutComesApplicationOther'
        | 'desiredOutComesLevel'
        | 'offerDesiredOffer'
        | 'offerAdvisedOffer'
        | 'offerDifference'
        | 'offerDifferenceOther'
        | 'offerEngagements'
    > & {
            participations: Array<
                { __typename?: 'ParticipationType' } & Pick<
                    ParticipationType,
                    | 'id'
                    | 'status'
                    | 'providerId'
                    | 'providerName'
                    | 'providerNote'
                    | 'offerName'
                    | 'offerCourse'
                    | 'outComesGoal'
                    | 'outComesTopic'
                    | 'outComesTopicOther'
                    | 'outComesApplication'
                    | 'outComesApplicationOther'
                    | 'outComesLevel'
                    | 'outComesLevelOther'
                    | 'detailsIsFormal'
                    | 'detailsGroupFormation'
                    | 'detailsTotalClassHours'
                    | 'detailsCertificateWillBeAwarded'
                    | 'detailsStartDate'
                    | 'detailsEndDate'
                    | 'detailsEngagements'
                >
            >
        }
}

export type CreateParticipationMutationVariables = Exact<{
    input: CreateParticipationInputType
}>

export type CreateParticipationMutation = { __typename?: 'Mutation' } & {
    createParticipation: { __typename?: 'ParticipationType' } & Pick<
        ParticipationType,
        | 'id'
        | 'status'
        | 'providerId'
        | 'providerName'
        | 'providerNote'
        | 'offerName'
        | 'offerCourse'
        | 'outComesGoal'
        | 'outComesTopic'
        | 'outComesTopicOther'
        | 'outComesApplication'
        | 'outComesApplicationOther'
        | 'outComesLevel'
        | 'outComesLevelOther'
        | 'detailsIsFormal'
        | 'detailsGroupFormation'
        | 'detailsTotalClassHours'
        | 'detailsCertificateWillBeAwarded'
        | 'detailsStartDate'
        | 'detailsEndDate'
        | 'detailsEngagements'
    >
}

export type CreateProviderMutationVariables = Exact<{
    address: CreateProviderAddressInputType
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}>

export type CreateProviderMutation = { __typename?: 'Mutation' } & {
    createProvider: { __typename?: 'ProviderType' } & Pick<
        ProviderType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'ProviderAddressType' } & Pick<
                    ProviderAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type CreateProviderEmployeeMutationVariables = Exact<{
    input: CreateProviderEmployeeInputType
}>

export type CreateProviderEmployeeMutation = { __typename?: 'Mutation' } & {
    createProviderEmployee: { __typename?: 'ProviderEmployeeType' } & Pick<
        ProviderEmployeeType,
        | 'userId'
        | 'dateCreated'
        | 'dateModified'
        | 'givenName'
        | 'additionalName'
        | 'familyName'
        | 'telephone'
        | 'availabilityNotes'
        | 'email'
        | 'gender'
        | 'dateOfBirth'
        | 'contactTelephone'
        | 'contactPreference'
        | 'contactPreferenceOther'
        | 'targetGroupPreference'
        | 'volunteringPreference'
        | 'gotHereVia'
        | 'hasExperienceWithTargetGroup'
        | 'experienceWithTargetGroupYesReason'
        | 'currentEducation'
        | 'doesCurrentlyFollowCourse'
        | 'currentlyFollowingCourseName'
        | 'currentlyFollowingCourseInstitute'
        | 'currentlyFollowingCourseTeacherProfessionalism'
        | 'currentlyFollowingCourseCourseProfessionalism'
        | 'doesCurrentlyFollowingCourseProvideCertificate'
        | 'otherRelevantCertificates'
        | 'isVOGChecked'
    > & {
            userRoles: Array<{ __typename?: 'ProviderUserRoleType' } & Pick<ProviderUserRoleType, 'id' | 'name'>>
            availability?: Maybe<
                { __typename?: 'ProviderEmployeeAvailabilityDaysType' } & {
                    monday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    tuesday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    wednesday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    thursday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    friday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    saturday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    sunday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                }
            >
            address?: Maybe<
                { __typename?: 'ProviderEmployeeAddressType' } & Pick<
                    ProviderEmployeeAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
            currentEducationYes?: Maybe<
                { __typename?: 'ProviderEmployeeCurrentEducationYesType' } & Pick<
                    ProviderEmployeeCurrentEducationYesType,
                    'dateSince' | 'name' | 'doesProvideCertificate'
                >
            >
            currentEdicationNoButDidFollow?: Maybe<
                { __typename?: 'ProviderEmployeeCurrentEducationNoButDidFollowType' } & Pick<
                    ProviderEmployeeCurrentEducationNoButDidFollowType,
                    'dateUntil' | 'level' | 'gotCertificate'
                >
            >
        }
}

export type CreateProviderEmployeeDocumentMutationVariables = Exact<{
    input: CreateProviderEmployeeDocumentInputType
}>

export type CreateProviderEmployeeDocumentMutation = { __typename?: 'Mutation' } & {
    createProviderEmployeeDocument: { __typename?: 'ProviderEmployeeDocumentType' } & Pick<
        ProviderEmployeeDocumentType,
        'id' | 'filename' | 'dateCreated'
    >
}

export type CreateStudentMutationVariables = Exact<{
    input: CreateStudentInputType
}>

export type CreateStudentMutation = { __typename?: 'Mutation' } & {
    createStudent: { __typename?: 'StudentType' } & Pick<
        StudentType,
        'id' | 'dateCreated' | 'status' | 'memo' | 'speakingLevel' | 'readingTestResult' | 'writingTestResult'
    > & {
            registrar?: Maybe<
                { __typename?: 'StudentRegistrarType' } & Pick<
                    StudentRegistrarType,
                    'id' | 'organisationName' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone'
                >
            >
            civicIntegrationDetails?: Maybe<
                { __typename?: 'StudentCivicIntegrationType' } & Pick<
                    StudentCivicIntegrationType,
                    | 'civicIntegrationRequirement'
                    | 'civicIntegrationRequirementReason'
                    | 'civicIntegrationRequirementFinishDate'
                >
            >
            personDetails: { __typename?: 'StudentPersonType' } & Pick<
                StudentPersonType,
                'givenName' | 'additionalName' | 'familyName' | 'gender' | 'dateOfBirth'
            >
            contactDetails?: Maybe<
                { __typename?: 'StudentContactType' } & Pick<
                    StudentContactType,
                    | 'street'
                    | 'postalCode'
                    | 'locality'
                    | 'houseNumber'
                    | 'houseNumberSuffix'
                    | 'email'
                    | 'telephone'
                    | 'contactPersonTelephone'
                    | 'contactPreference'
                    | 'contactPreferenceOther'
                >
            >
            generalDetails?: Maybe<
                { __typename?: 'StudentGeneralType' } & Pick<
                    StudentGeneralType,
                    | 'countryOfOrigin'
                    | 'nativeLanguage'
                    | 'otherLanguages'
                    | 'familyComposition'
                    | 'childrenCount'
                    | 'childrenDatesOfBirth'
                >
            >
            referrerDetails?: Maybe<
                { __typename?: 'StudentReferrerType' } & Pick<
                    StudentReferrerType,
                    'referringOrganization' | 'referringOrganizationOther' | 'email'
                >
            >
            backgroundDetails?: Maybe<
                { __typename?: 'StudentBackgroundType' } & Pick<
                    StudentBackgroundType,
                    | 'foundVia'
                    | 'foundViaOther'
                    | 'wentToLanguageHouseBefore'
                    | 'wentToLanguageHouseBeforeReason'
                    | 'wentToLanguageHouseBeforeYear'
                    | 'network'
                    | 'participationLadder'
                >
            >
            dutchNTDetails?: Maybe<
                { __typename?: 'StudentDutchNTType' } & Pick<
                    StudentDutchNtType,
                    | 'dutchNTLevel'
                    | 'inNetherlandsSinceYear'
                    | 'languageInDailyLife'
                    | 'knowsLatinAlphabet'
                    | 'lastKnownLevel'
                >
            >
            educationDetails?: Maybe<
                { __typename?: 'StudentEducationType' } & Pick<
                    StudentEducationType,
                    | 'lastFollowedEducation'
                    | 'didGraduate'
                    | 'followingEducationRightNow'
                    | 'followingEducationRightNowYesStartDate'
                    | 'followingEducationRightNowYesEndDate'
                    | 'followingEducationRightNowYesLevel'
                    | 'followingEducationRightNowYesInstitute'
                    | 'followingEducationRightNowYesProvidesCertificate'
                    | 'followingEducationRightNowNoEndDate'
                    | 'followingEducationRightNowNoLevel'
                    | 'followingEducationRightNowNoGotCertificate'
                >
            >
            courseDetails?: Maybe<
                { __typename?: 'StudentCourseType' } & Pick<
                    StudentCourseType,
                    | 'isFollowingCourseRightNow'
                    | 'courseName'
                    | 'courseTeacher'
                    | 'courseGroup'
                    | 'amountOfHours'
                    | 'doesCourseProvideCertificate'
                >
            >
            jobDetails?: Maybe<
                { __typename?: 'StudentJobType' } & Pick<
                    StudentJobType,
                    'trainedForJob' | 'lastJob' | 'dayTimeActivities' | 'dayTimeActivitiesOther'
                >
            >
            motivationDetails?: Maybe<
                { __typename?: 'StudentMotivationType' } & Pick<
                    StudentMotivationType,
                    | 'desiredSkills'
                    | 'desiredSkillsOther'
                    | 'hasTriedThisBefore'
                    | 'hasTriedThisBeforeExplanation'
                    | 'whyWantTheseSkills'
                    | 'whyWantThisNow'
                    | 'desiredLearningMethod'
                    | 'remarks'
                >
            >
            availabilityDetails?: Maybe<
                { __typename?: 'StudentAvailabilityType' } & Pick<StudentAvailabilityType, 'availabilityNotes'> & {
                        availability?: Maybe<
                            { __typename?: 'StudentAvailabilityDaysType' } & {
                                monday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                tuesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                wednesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                thursday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                friday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                saturday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                sunday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                            }
                        >
                    }
            >
            permissionDetails: { __typename?: 'StudentPermissionType' } & Pick<
                StudentPermissionType,
                | 'didSignPermissionForm'
                | 'hasPermissionToShareDataWithProviders'
                | 'hasPermissionToShareDataWithLibraries'
                | 'hasPermissionToSendInformationAboutLibraries'
            >
        }
}

export type CreateStudentDocumentMutationVariables = Exact<{
    input: CreateStudentDocumentInputType
}>

export type CreateStudentDocumentMutation = { __typename?: 'Mutation' } & {
    createStudentDocument: { __typename?: 'StudentDocumentType' } & Pick<
        StudentDocumentType,
        'id' | 'filename' | 'dateCreated'
    >
}

export type DeleteBiscEmployeeMutationVariables = Exact<{
    biscEmployeeId: Scalars['String']
}>

export type DeleteBiscEmployeeMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteBiscEmployee'>

export type DeleteLanguageHouseMutationVariables = Exact<{
    id: Scalars['String']
}>

export type DeleteLanguageHouseMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteLanguageHouse'>

export type DeleteLanguageHouseEmployeeMutationVariables = Exact<{
    userId: Scalars['String']
}>

export type DeleteLanguageHouseEmployeeMutation = { __typename?: 'Mutation' } & Pick<
    Mutation,
    'deleteLanguageHouseEmployee'
>

export type DeleteProviderMutationVariables = Exact<{
    id: Scalars['String']
}>

export type DeleteProviderMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteProvider'>

export type DeleteProviderEmployeeMutationVariables = Exact<{
    userId: Scalars['String']
}>

export type DeleteProviderEmployeeMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteProviderEmployee'>

export type DeleteProviderEmployeeDocumentMutationVariables = Exact<{
    providerEmployeeDocumentId: Scalars['String']
}>

export type DeleteProviderEmployeeDocumentMutation = { __typename?: 'Mutation' } & Pick<
    Mutation,
    'deleteProviderEmployeeDocument'
>

export type DeleteRegistrationMutationVariables = Exact<{
    studentId: Scalars['String']
}>

export type DeleteRegistrationMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteRegistration'>

export type DeleteStudentDocumentMutationVariables = Exact<{
    studentDocumentId: Scalars['String']
}>

export type DeleteStudentDocumentMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteStudentDocument'>

export type DownloadProviderEmployeeDocumentMutationVariables = Exact<{
    providerEmployeeDocumentId: Scalars['String']
}>

export type DownloadProviderEmployeeDocumentMutation = { __typename?: 'Mutation' } & {
    downloadProviderEmployeeDocument: { __typename?: 'ProviderEmployeeDocumentDownloadType' } & Pick<
        ProviderEmployeeDocumentDownloadType,
        'base64data'
    >
}

export type DownloadStudentDocumentMutationVariables = Exact<{
    studentDocumentId: Scalars['String']
}>

export type DownloadStudentDocumentMutation = { __typename?: 'Mutation' } & {
    downloadStudentDocument: { __typename?: 'StudentDocumentDownloadType' } & Pick<
        StudentDocumentDownloadType,
        'base64data'
    >
}

export type LoginMutationVariables = Exact<{
    username: Scalars['String']
    password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
    login: { __typename?: 'RawReturnType' } & Pick<RawReturnType, 'accessToken'>
}

export type RequestPasswordResetMutationVariables = Exact<{
    email: Scalars['String']
}>

export type RequestPasswordResetMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'requestPasswordReset'>

export type ResetPasswordMutationVariables = Exact<{
    email: Scalars['String']
    token: Scalars['String']
    password: Scalars['String']
}>

export type ResetPasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'resetPassword'>

export type UpdateBiscEmployeeMutationVariables = Exact<{
    input: UpdateBiscEmployeeInputType
}>

export type UpdateBiscEmployeeMutation = { __typename?: 'Mutation' } & {
    updateBiscEmployee: { __typename?: 'BiscEmployeeType' } & Pick<
        BiscEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    >
}

export type UpdateLanguageHouseMutationVariables = Exact<{
    id: Scalars['String']
    address: UpdateLanguageHouseAddressInputType
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}>

export type UpdateLanguageHouseMutation = { __typename?: 'Mutation' } & {
    updateLanguageHouse: { __typename?: 'LanguageHouseType' } & Pick<
        LanguageHouseType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'LanguageHouseAddressType' } & Pick<
                    LanguageHouseAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type UpdateLanguageHouseEmployeeMutationVariables = Exact<{
    input: UpdateLanguageHouseEmployeeInputType
}>

export type UpdateLanguageHouseEmployeeMutation = { __typename?: 'Mutation' } & {
    updateLanguageHouseEmployee: { __typename?: 'LanguageHouseEmployeeType' } & Pick<
        LanguageHouseEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    > & {
            userRoles: Array<
                { __typename?: 'LanguageHouseUserRoleType' } & Pick<LanguageHouseUserRoleType, 'id' | 'name'>
            >
        }
}

export type UpdateProviderMutationVariables = Exact<{
    id: Scalars['String']
    address: UpdateProviderAddressInputType
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}>

export type UpdateProviderMutation = { __typename?: 'Mutation' } & {
    updateProvider: { __typename?: 'ProviderType' } & Pick<
        ProviderType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'ProviderAddressType' } & Pick<
                    ProviderAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type UpdateProviderEmployeeMutationVariables = Exact<{
    input: UpdateProviderEmployeeInputType
}>

export type UpdateProviderEmployeeMutation = { __typename?: 'Mutation' } & {
    updateProviderEmployee: { __typename?: 'ProviderEmployeeType' } & Pick<
        ProviderEmployeeType,
        | 'userId'
        | 'dateCreated'
        | 'dateModified'
        | 'givenName'
        | 'additionalName'
        | 'familyName'
        | 'telephone'
        | 'availabilityNotes'
        | 'email'
        | 'gender'
        | 'dateOfBirth'
        | 'contactTelephone'
        | 'contactPreference'
        | 'contactPreferenceOther'
        | 'targetGroupPreference'
        | 'volunteringPreference'
        | 'gotHereVia'
        | 'hasExperienceWithTargetGroup'
        | 'experienceWithTargetGroupYesReason'
        | 'currentEducation'
        | 'doesCurrentlyFollowCourse'
        | 'currentlyFollowingCourseName'
        | 'currentlyFollowingCourseInstitute'
        | 'currentlyFollowingCourseTeacherProfessionalism'
        | 'currentlyFollowingCourseCourseProfessionalism'
        | 'doesCurrentlyFollowingCourseProvideCertificate'
        | 'otherRelevantCertificates'
        | 'isVOGChecked'
    > & {
            userRoles: Array<{ __typename?: 'ProviderUserRoleType' } & Pick<ProviderUserRoleType, 'id' | 'name'>>
            availability?: Maybe<
                { __typename?: 'ProviderEmployeeAvailabilityDaysType' } & {
                    monday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    tuesday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    wednesday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    thursday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    friday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    saturday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    sunday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                }
            >
            address?: Maybe<
                { __typename?: 'ProviderEmployeeAddressType' } & Pick<
                    ProviderEmployeeAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
            currentEducationYes?: Maybe<
                { __typename?: 'ProviderEmployeeCurrentEducationYesType' } & Pick<
                    ProviderEmployeeCurrentEducationYesType,
                    'dateSince' | 'name' | 'doesProvideCertificate'
                >
            >
            currentEdicationNoButDidFollow?: Maybe<
                { __typename?: 'ProviderEmployeeCurrentEducationNoButDidFollowType' } & Pick<
                    ProviderEmployeeCurrentEducationNoButDidFollowType,
                    'dateUntil' | 'level' | 'gotCertificate'
                >
            >
        }
}

export type UpdateStudentMutationVariables = Exact<{
    input: UpdateStudentInputType
}>

export type UpdateStudentMutation = { __typename?: 'Mutation' } & {
    updateStudent: { __typename?: 'StudentType' } & Pick<
        StudentType,
        'id' | 'dateCreated' | 'status' | 'memo' | 'speakingLevel' | 'readingTestResult' | 'writingTestResult'
    > & {
            registrar?: Maybe<
                { __typename?: 'StudentRegistrarType' } & Pick<
                    StudentRegistrarType,
                    'id' | 'organisationName' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone'
                >
            >
            civicIntegrationDetails?: Maybe<
                { __typename?: 'StudentCivicIntegrationType' } & Pick<
                    StudentCivicIntegrationType,
                    | 'civicIntegrationRequirement'
                    | 'civicIntegrationRequirementReason'
                    | 'civicIntegrationRequirementFinishDate'
                >
            >
            personDetails: { __typename?: 'StudentPersonType' } & Pick<
                StudentPersonType,
                'givenName' | 'additionalName' | 'familyName' | 'gender' | 'dateOfBirth'
            >
            contactDetails?: Maybe<
                { __typename?: 'StudentContactType' } & Pick<
                    StudentContactType,
                    | 'street'
                    | 'postalCode'
                    | 'locality'
                    | 'houseNumber'
                    | 'houseNumberSuffix'
                    | 'email'
                    | 'telephone'
                    | 'contactPersonTelephone'
                    | 'contactPreference'
                    | 'contactPreferenceOther'
                >
            >
            generalDetails?: Maybe<
                { __typename?: 'StudentGeneralType' } & Pick<
                    StudentGeneralType,
                    | 'countryOfOrigin'
                    | 'nativeLanguage'
                    | 'otherLanguages'
                    | 'familyComposition'
                    | 'childrenCount'
                    | 'childrenDatesOfBirth'
                >
            >
            referrerDetails?: Maybe<
                { __typename?: 'StudentReferrerType' } & Pick<
                    StudentReferrerType,
                    'referringOrganization' | 'referringOrganizationOther' | 'email'
                >
            >
            backgroundDetails?: Maybe<
                { __typename?: 'StudentBackgroundType' } & Pick<
                    StudentBackgroundType,
                    | 'foundVia'
                    | 'foundViaOther'
                    | 'wentToLanguageHouseBefore'
                    | 'wentToLanguageHouseBeforeReason'
                    | 'wentToLanguageHouseBeforeYear'
                    | 'network'
                    | 'participationLadder'
                >
            >
            dutchNTDetails?: Maybe<
                { __typename?: 'StudentDutchNTType' } & Pick<
                    StudentDutchNtType,
                    | 'dutchNTLevel'
                    | 'inNetherlandsSinceYear'
                    | 'languageInDailyLife'
                    | 'knowsLatinAlphabet'
                    | 'lastKnownLevel'
                >
            >
            educationDetails?: Maybe<
                { __typename?: 'StudentEducationType' } & Pick<
                    StudentEducationType,
                    | 'lastFollowedEducation'
                    | 'didGraduate'
                    | 'followingEducationRightNow'
                    | 'followingEducationRightNowYesStartDate'
                    | 'followingEducationRightNowYesEndDate'
                    | 'followingEducationRightNowYesLevel'
                    | 'followingEducationRightNowYesInstitute'
                    | 'followingEducationRightNowYesProvidesCertificate'
                    | 'followingEducationRightNowNoEndDate'
                    | 'followingEducationRightNowNoLevel'
                    | 'followingEducationRightNowNoGotCertificate'
                >
            >
            courseDetails?: Maybe<
                { __typename?: 'StudentCourseType' } & Pick<
                    StudentCourseType,
                    | 'isFollowingCourseRightNow'
                    | 'courseName'
                    | 'courseTeacher'
                    | 'courseGroup'
                    | 'amountOfHours'
                    | 'doesCourseProvideCertificate'
                >
            >
            jobDetails?: Maybe<
                { __typename?: 'StudentJobType' } & Pick<
                    StudentJobType,
                    'trainedForJob' | 'lastJob' | 'dayTimeActivities' | 'dayTimeActivitiesOther'
                >
            >
            motivationDetails?: Maybe<
                { __typename?: 'StudentMotivationType' } & Pick<
                    StudentMotivationType,
                    | 'desiredSkills'
                    | 'desiredSkillsOther'
                    | 'hasTriedThisBefore'
                    | 'hasTriedThisBeforeExplanation'
                    | 'whyWantTheseSkills'
                    | 'whyWantThisNow'
                    | 'desiredLearningMethod'
                    | 'remarks'
                >
            >
            availabilityDetails?: Maybe<
                { __typename?: 'StudentAvailabilityType' } & Pick<StudentAvailabilityType, 'availabilityNotes'> & {
                        availability?: Maybe<
                            { __typename?: 'StudentAvailabilityDaysType' } & {
                                monday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                tuesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                wednesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                thursday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                friday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                saturday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                sunday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                            }
                        >
                    }
            >
            permissionDetails: { __typename?: 'StudentPermissionType' } & Pick<
                StudentPermissionType,
                | 'didSignPermissionForm'
                | 'hasPermissionToShareDataWithProviders'
                | 'hasPermissionToShareDataWithLibraries'
                | 'hasPermissionToSendInformationAboutLibraries'
            >
        }
}

export type BiscEmployeeQueryVariables = Exact<{
    biscEmployeeId: Scalars['String']
}>

export type BiscEmployeeQuery = { __typename?: 'Query' } & {
    biscEmployee: { __typename?: 'BiscEmployeeType' } & Pick<
        BiscEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    >
}

export type BiscEmployeesQueryVariables = Exact<{ [key: string]: never }>

export type BiscEmployeesQuery = { __typename?: 'Query' } & {
    biscEmployees: Array<
        { __typename?: 'BiscEmployeeType' } & Pick<
            BiscEmployeeType,
            | 'id'
            | 'givenName'
            | 'additionalName'
            | 'familyName'
            | 'email'
            | 'telephone'
            | 'dateCreated'
            | 'dateModified'
        >
    >
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = { __typename?: 'Query' } & {
    currentUser: { __typename?: 'ContextUserType' } & Pick<
        ContextUserType,
        | 'id'
        | 'username'
        | 'givenName'
        | 'additionalName'
        | 'familyName'
        | 'userEnvironment'
        | 'organizationId'
        | 'organizationName'
        | 'dateCreated'
        | 'dateModified'
    > & {
            userRoles: Array<
                { __typename?: 'LanguageHouseUserRoleType' } & Pick<LanguageHouseUserRoleType, 'id' | 'name'>
            >
        }
}

export type LanguageHouseQueryVariables = Exact<{
    languageHouseId: Scalars['String']
}>

export type LanguageHouseQuery = { __typename?: 'Query' } & {
    languageHouse: { __typename?: 'LanguageHouseType' } & Pick<
        LanguageHouseType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'LanguageHouseAddressType' } & Pick<
                    LanguageHouseAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type LanguageHouseEmployeeQueryVariables = Exact<{
    userId: Scalars['String']
}>

export type LanguageHouseEmployeeQuery = { __typename?: 'Query' } & {
    languageHouseEmployee: { __typename?: 'LanguageHouseEmployeeType' } & Pick<
        LanguageHouseEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    > & {
            userRoles: Array<
                { __typename?: 'LanguageHouseUserRoleType' } & Pick<LanguageHouseUserRoleType, 'id' | 'name'>
            >
        }
}

export type LanguageHouseEmployeesQueryVariables = Exact<{
    languageHouseId: Scalars['String']
}>

export type LanguageHouseEmployeesQuery = { __typename?: 'Query' } & {
    languageHouseEmployees: Array<
        { __typename?: 'LanguageHouseEmployeeType' } & Pick<
            LanguageHouseEmployeeType,
            | 'id'
            | 'givenName'
            | 'additionalName'
            | 'familyName'
            | 'email'
            | 'telephone'
            | 'dateCreated'
            | 'dateModified'
        > & {
                userRoles: Array<
                    { __typename?: 'LanguageHouseUserRoleType' } & Pick<LanguageHouseUserRoleType, 'id' | 'name'>
                >
            }
    >
}

export type LanguageHousesQueryVariables = Exact<{ [key: string]: never }>

export type LanguageHousesQuery = { __typename?: 'Query' } & {
    languageHouses: Array<
        { __typename?: 'LanguageHouseType' } & Pick<
            LanguageHouseType,
            'id' | 'name' | 'email' | 'telephone' | 'type'
        > & {
                address?: Maybe<
                    { __typename?: 'LanguageHouseAddressType' } & Pick<
                        LanguageHouseAddressType,
                        'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                    >
                >
            }
    >
}

export type LearningNeedsQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type LearningNeedsQuery = { __typename?: 'Query' } & {
    learningNeeds: Array<
        { __typename?: 'LearningNeedType' } & Pick<
            LearningNeedType,
            | 'id'
            | 'learningNeedDescription'
            | 'learningNeedMotivation'
            | 'desiredOutComesGoal'
            | 'desiredOutComesTopic'
            | 'desiredOutComesTopicOther'
            | 'desiredOutComesApplication'
            | 'desiredOutComesApplicationOther'
            | 'desiredOutComesLevel'
            | 'offerDesiredOffer'
            | 'offerAdvisedOffer'
            | 'offerDifference'
            | 'offerDifferenceOther'
            | 'offerEngagements'
        > & {
                participations: Array<
                    { __typename?: 'ParticipationType' } & Pick<
                        ParticipationType,
                        | 'id'
                        | 'status'
                        | 'providerId'
                        | 'providerName'
                        | 'providerNote'
                        | 'offerName'
                        | 'offerCourse'
                        | 'outComesTopic'
                        | 'outComesTopicOther'
                        | 'outComesApplication'
                        | 'outComesApplicationOther'
                        | 'outComesLevel'
                        | 'outComesLevelOther'
                        | 'detailsIsFormal'
                        | 'detailsGroupFormation'
                        | 'detailsTotalClassHours'
                        | 'detailsCertificateWillBeAwarded'
                        | 'detailsStartDate'
                        | 'detailsEndDate'
                        | 'detailsEngagements'
                    >
                >
            }
    >
}

export type ProviderQueryVariables = Exact<{
    id: Scalars['String']
}>

export type ProviderQuery = { __typename?: 'Query' } & {
    provider: { __typename?: 'ProviderType' } & Pick<ProviderType, 'id' | 'name' | 'email' | 'telephone' | 'type'> & {
            address?: Maybe<
                { __typename?: 'ProviderAddressType' } & Pick<
                    ProviderAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type ProviderEmployeeQueryVariables = Exact<{
    userId: Scalars['String']
}>

export type ProviderEmployeeQuery = { __typename?: 'Query' } & {
    providerEmployee: { __typename?: 'ProviderEmployeeType' } & Pick<
        ProviderEmployeeType,
        | 'userId'
        | 'dateCreated'
        | 'dateModified'
        | 'givenName'
        | 'additionalName'
        | 'familyName'
        | 'telephone'
        | 'availabilityNotes'
        | 'email'
        | 'gender'
        | 'dateOfBirth'
        | 'contactTelephone'
        | 'contactPreference'
        | 'contactPreferenceOther'
        | 'targetGroupPreference'
        | 'volunteringPreference'
        | 'gotHereVia'
        | 'hasExperienceWithTargetGroup'
        | 'experienceWithTargetGroupYesReason'
        | 'currentEducation'
        | 'doesCurrentlyFollowCourse'
        | 'currentlyFollowingCourseName'
        | 'currentlyFollowingCourseInstitute'
        | 'currentlyFollowingCourseTeacherProfessionalism'
        | 'currentlyFollowingCourseCourseProfessionalism'
        | 'doesCurrentlyFollowingCourseProvideCertificate'
        | 'otherRelevantCertificates'
        | 'isVOGChecked'
    > & {
            userRoles: Array<{ __typename?: 'ProviderUserRoleType' } & Pick<ProviderUserRoleType, 'id' | 'name'>>
            availability?: Maybe<
                { __typename?: 'ProviderEmployeeAvailabilityDaysType' } & {
                    monday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    tuesday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    wednesday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    thursday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    friday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    saturday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                    sunday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                        ProviderEmployeeAvailabilityDayType,
                        'morning' | 'afternoon' | 'evening'
                    >
                }
            >
            address?: Maybe<
                { __typename?: 'ProviderEmployeeAddressType' } & Pick<
                    ProviderEmployeeAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
            currentEducationYes?: Maybe<
                { __typename?: 'ProviderEmployeeCurrentEducationYesType' } & Pick<
                    ProviderEmployeeCurrentEducationYesType,
                    'dateSince' | 'name' | 'doesProvideCertificate'
                >
            >
            currentEdicationNoButDidFollow?: Maybe<
                { __typename?: 'ProviderEmployeeCurrentEducationNoButDidFollowType' } & Pick<
                    ProviderEmployeeCurrentEducationNoButDidFollowType,
                    'dateUntil' | 'level' | 'gotCertificate'
                >
            >
        }
}

export type ProviderEmployeeDocumentsQueryVariables = Exact<{
    providerEmployeeId: Scalars['String']
}>

export type ProviderEmployeeDocumentsQuery = { __typename?: 'Query' } & {
    providerEmployeeDocuments: Array<
        { __typename?: 'ProviderEmployeeDocumentType' } & Pick<
            ProviderEmployeeDocumentType,
            'id' | 'filename' | 'dateCreated'
        >
    >
}

export type ProviderEmployeeMenteesQueryVariables = Exact<{
    providerEmployeeId: Scalars['String']
}>

export type ProviderEmployeeMenteesQuery = { __typename?: 'Query' } & {
    providerEmployeeMentees: Array<
        { __typename?: 'StudentType' } & Pick<
            StudentType,
            'id' | 'dateCreated' | 'status' | 'memo' | 'speakingLevel' | 'readingTestResult' | 'writingTestResult'
        > & {
                registrar?: Maybe<
                    { __typename?: 'StudentRegistrarType' } & Pick<
                        StudentRegistrarType,
                        | 'id'
                        | 'organisationName'
                        | 'givenName'
                        | 'additionalName'
                        | 'familyName'
                        | 'email'
                        | 'telephone'
                    >
                >
                civicIntegrationDetails?: Maybe<
                    { __typename?: 'StudentCivicIntegrationType' } & Pick<
                        StudentCivicIntegrationType,
                        | 'civicIntegrationRequirement'
                        | 'civicIntegrationRequirementReason'
                        | 'civicIntegrationRequirementFinishDate'
                    >
                >
                personDetails: { __typename?: 'StudentPersonType' } & Pick<
                    StudentPersonType,
                    'givenName' | 'additionalName' | 'familyName' | 'gender' | 'dateOfBirth'
                >
                contactDetails?: Maybe<
                    { __typename?: 'StudentContactType' } & Pick<
                        StudentContactType,
                        | 'street'
                        | 'postalCode'
                        | 'locality'
                        | 'houseNumber'
                        | 'houseNumberSuffix'
                        | 'email'
                        | 'telephone'
                        | 'contactPersonTelephone'
                        | 'contactPreference'
                        | 'contactPreferenceOther'
                    >
                >
                generalDetails?: Maybe<
                    { __typename?: 'StudentGeneralType' } & Pick<
                        StudentGeneralType,
                        | 'countryOfOrigin'
                        | 'nativeLanguage'
                        | 'otherLanguages'
                        | 'familyComposition'
                        | 'childrenCount'
                        | 'childrenDatesOfBirth'
                    >
                >
                referrerDetails?: Maybe<
                    { __typename?: 'StudentReferrerType' } & Pick<
                        StudentReferrerType,
                        'referringOrganization' | 'referringOrganizationOther' | 'email'
                    >
                >
                backgroundDetails?: Maybe<
                    { __typename?: 'StudentBackgroundType' } & Pick<
                        StudentBackgroundType,
                        | 'foundVia'
                        | 'foundViaOther'
                        | 'wentToLanguageHouseBefore'
                        | 'wentToLanguageHouseBeforeReason'
                        | 'wentToLanguageHouseBeforeYear'
                        | 'network'
                        | 'participationLadder'
                    >
                >
                dutchNTDetails?: Maybe<
                    { __typename?: 'StudentDutchNTType' } & Pick<
                        StudentDutchNtType,
                        | 'dutchNTLevel'
                        | 'inNetherlandsSinceYear'
                        | 'languageInDailyLife'
                        | 'knowsLatinAlphabet'
                        | 'lastKnownLevel'
                    >
                >
                educationDetails?: Maybe<
                    { __typename?: 'StudentEducationType' } & Pick<
                        StudentEducationType,
                        | 'lastFollowedEducation'
                        | 'didGraduate'
                        | 'followingEducationRightNow'
                        | 'followingEducationRightNowYesStartDate'
                        | 'followingEducationRightNowYesEndDate'
                        | 'followingEducationRightNowYesLevel'
                        | 'followingEducationRightNowYesInstitute'
                        | 'followingEducationRightNowYesProvidesCertificate'
                        | 'followingEducationRightNowNoEndDate'
                        | 'followingEducationRightNowNoLevel'
                        | 'followingEducationRightNowNoGotCertificate'
                    >
                >
                courseDetails?: Maybe<
                    { __typename?: 'StudentCourseType' } & Pick<
                        StudentCourseType,
                        | 'isFollowingCourseRightNow'
                        | 'courseName'
                        | 'courseTeacher'
                        | 'courseGroup'
                        | 'amountOfHours'
                        | 'doesCourseProvideCertificate'
                    >
                >
                jobDetails?: Maybe<
                    { __typename?: 'StudentJobType' } & Pick<
                        StudentJobType,
                        'trainedForJob' | 'lastJob' | 'dayTimeActivities' | 'dayTimeActivitiesOther'
                    >
                >
                motivationDetails?: Maybe<
                    { __typename?: 'StudentMotivationType' } & Pick<
                        StudentMotivationType,
                        | 'desiredSkills'
                        | 'desiredSkillsOther'
                        | 'hasTriedThisBefore'
                        | 'hasTriedThisBeforeExplanation'
                        | 'whyWantTheseSkills'
                        | 'whyWantThisNow'
                        | 'desiredLearningMethod'
                        | 'remarks'
                    >
                >
                availabilityDetails?: Maybe<
                    { __typename?: 'StudentAvailabilityType' } & Pick<StudentAvailabilityType, 'availabilityNotes'> & {
                            availability?: Maybe<
                                { __typename?: 'StudentAvailabilityDaysType' } & {
                                    monday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    tuesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    wednesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    thursday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    friday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    saturday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    sunday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                }
                            >
                        }
                >
                permissionDetails: { __typename?: 'StudentPermissionType' } & Pick<
                    StudentPermissionType,
                    | 'didSignPermissionForm'
                    | 'hasPermissionToShareDataWithProviders'
                    | 'hasPermissionToShareDataWithLibraries'
                    | 'hasPermissionToSendInformationAboutLibraries'
                >
            }
    >
}

export type ProviderEmployeesQueryVariables = Exact<{
    providerId: Scalars['String']
}>

export type ProviderEmployeesQuery = { __typename?: 'Query' } & {
    providerEmployees: Array<
        { __typename?: 'ProviderEmployeeType' } & Pick<
            ProviderEmployeeType,
            | 'userId'
            | 'dateCreated'
            | 'dateModified'
            | 'givenName'
            | 'additionalName'
            | 'familyName'
            | 'telephone'
            | 'availabilityNotes'
            | 'email'
            | 'gender'
            | 'dateOfBirth'
            | 'contactTelephone'
            | 'contactPreference'
            | 'contactPreferenceOther'
            | 'targetGroupPreference'
            | 'volunteringPreference'
            | 'gotHereVia'
            | 'hasExperienceWithTargetGroup'
            | 'experienceWithTargetGroupYesReason'
            | 'currentEducation'
            | 'doesCurrentlyFollowCourse'
            | 'currentlyFollowingCourseName'
            | 'currentlyFollowingCourseInstitute'
            | 'currentlyFollowingCourseTeacherProfessionalism'
            | 'currentlyFollowingCourseCourseProfessionalism'
            | 'doesCurrentlyFollowingCourseProvideCertificate'
            | 'otherRelevantCertificates'
            | 'isVOGChecked'
        > & {
                userRoles: Array<{ __typename?: 'ProviderUserRoleType' } & Pick<ProviderUserRoleType, 'id' | 'name'>>
                availability?: Maybe<
                    { __typename?: 'ProviderEmployeeAvailabilityDaysType' } & {
                        monday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                            ProviderEmployeeAvailabilityDayType,
                            'morning' | 'afternoon' | 'evening'
                        >
                        tuesday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                            ProviderEmployeeAvailabilityDayType,
                            'morning' | 'afternoon' | 'evening'
                        >
                        wednesday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                            ProviderEmployeeAvailabilityDayType,
                            'morning' | 'afternoon' | 'evening'
                        >
                        thursday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                            ProviderEmployeeAvailabilityDayType,
                            'morning' | 'afternoon' | 'evening'
                        >
                        friday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                            ProviderEmployeeAvailabilityDayType,
                            'morning' | 'afternoon' | 'evening'
                        >
                        saturday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                            ProviderEmployeeAvailabilityDayType,
                            'morning' | 'afternoon' | 'evening'
                        >
                        sunday: { __typename?: 'ProviderEmployeeAvailabilityDayType' } & Pick<
                            ProviderEmployeeAvailabilityDayType,
                            'morning' | 'afternoon' | 'evening'
                        >
                    }
                >
                address?: Maybe<
                    { __typename?: 'ProviderEmployeeAddressType' } & Pick<
                        ProviderEmployeeAddressType,
                        'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                    >
                >
                currentEducationYes?: Maybe<
                    { __typename?: 'ProviderEmployeeCurrentEducationYesType' } & Pick<
                        ProviderEmployeeCurrentEducationYesType,
                        'dateSince' | 'name' | 'doesProvideCertificate'
                    >
                >
                currentEdicationNoButDidFollow?: Maybe<
                    { __typename?: 'ProviderEmployeeCurrentEducationNoButDidFollowType' } & Pick<
                        ProviderEmployeeCurrentEducationNoButDidFollowType,
                        'dateUntil' | 'level' | 'gotCertificate'
                    >
                >
            }
    >
}

export type ProvidersQueryVariables = Exact<{ [key: string]: never }>

export type ProvidersQuery = { __typename?: 'Query' } & {
    providers: Array<
        { __typename?: 'ProviderType' } & Pick<ProviderType, 'id' | 'name' | 'email' | 'telephone' | 'type'> & {
                address?: Maybe<
                    { __typename?: 'ProviderAddressType' } & Pick<
                        ProviderAddressType,
                        'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                    >
                >
            }
    >
}

export type RegistrationQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type RegistrationQuery = { __typename?: 'Query' } & {
    registration: { __typename?: 'StudentType' } & Pick<
        StudentType,
        'id' | 'dateCreated' | 'status' | 'memo' | 'speakingLevel' | 'readingTestResult' | 'writingTestResult'
    > & {
            registrar?: Maybe<
                { __typename?: 'StudentRegistrarType' } & Pick<
                    StudentRegistrarType,
                    'id' | 'organisationName' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone'
                >
            >
            civicIntegrationDetails?: Maybe<
                { __typename?: 'StudentCivicIntegrationType' } & Pick<
                    StudentCivicIntegrationType,
                    | 'civicIntegrationRequirement'
                    | 'civicIntegrationRequirementReason'
                    | 'civicIntegrationRequirementFinishDate'
                >
            >
            personDetails: { __typename?: 'StudentPersonType' } & Pick<
                StudentPersonType,
                'givenName' | 'additionalName' | 'familyName' | 'gender' | 'dateOfBirth'
            >
            contactDetails?: Maybe<
                { __typename?: 'StudentContactType' } & Pick<
                    StudentContactType,
                    | 'street'
                    | 'postalCode'
                    | 'locality'
                    | 'houseNumber'
                    | 'houseNumberSuffix'
                    | 'email'
                    | 'telephone'
                    | 'contactPersonTelephone'
                    | 'contactPreference'
                    | 'contactPreferenceOther'
                >
            >
            generalDetails?: Maybe<
                { __typename?: 'StudentGeneralType' } & Pick<
                    StudentGeneralType,
                    | 'countryOfOrigin'
                    | 'nativeLanguage'
                    | 'otherLanguages'
                    | 'familyComposition'
                    | 'childrenCount'
                    | 'childrenDatesOfBirth'
                >
            >
            referrerDetails?: Maybe<
                { __typename?: 'StudentReferrerType' } & Pick<
                    StudentReferrerType,
                    'referringOrganization' | 'referringOrganizationOther' | 'email'
                >
            >
            backgroundDetails?: Maybe<
                { __typename?: 'StudentBackgroundType' } & Pick<
                    StudentBackgroundType,
                    | 'foundVia'
                    | 'foundViaOther'
                    | 'wentToLanguageHouseBefore'
                    | 'wentToLanguageHouseBeforeReason'
                    | 'wentToLanguageHouseBeforeYear'
                    | 'network'
                    | 'participationLadder'
                >
            >
            dutchNTDetails?: Maybe<
                { __typename?: 'StudentDutchNTType' } & Pick<
                    StudentDutchNtType,
                    | 'dutchNTLevel'
                    | 'inNetherlandsSinceYear'
                    | 'languageInDailyLife'
                    | 'knowsLatinAlphabet'
                    | 'lastKnownLevel'
                >
            >
            educationDetails?: Maybe<
                { __typename?: 'StudentEducationType' } & Pick<
                    StudentEducationType,
                    | 'lastFollowedEducation'
                    | 'didGraduate'
                    | 'followingEducationRightNow'
                    | 'followingEducationRightNowYesStartDate'
                    | 'followingEducationRightNowYesEndDate'
                    | 'followingEducationRightNowYesLevel'
                    | 'followingEducationRightNowYesInstitute'
                    | 'followingEducationRightNowYesProvidesCertificate'
                    | 'followingEducationRightNowNoEndDate'
                    | 'followingEducationRightNowNoLevel'
                    | 'followingEducationRightNowNoGotCertificate'
                >
            >
            courseDetails?: Maybe<
                { __typename?: 'StudentCourseType' } & Pick<
                    StudentCourseType,
                    | 'isFollowingCourseRightNow'
                    | 'courseName'
                    | 'courseTeacher'
                    | 'courseGroup'
                    | 'amountOfHours'
                    | 'doesCourseProvideCertificate'
                >
            >
            jobDetails?: Maybe<
                { __typename?: 'StudentJobType' } & Pick<
                    StudentJobType,
                    'trainedForJob' | 'lastJob' | 'dayTimeActivities' | 'dayTimeActivitiesOther'
                >
            >
            motivationDetails?: Maybe<
                { __typename?: 'StudentMotivationType' } & Pick<
                    StudentMotivationType,
                    | 'desiredSkills'
                    | 'desiredSkillsOther'
                    | 'hasTriedThisBefore'
                    | 'hasTriedThisBeforeExplanation'
                    | 'whyWantTheseSkills'
                    | 'whyWantThisNow'
                    | 'desiredLearningMethod'
                    | 'remarks'
                >
            >
            availabilityDetails?: Maybe<
                { __typename?: 'StudentAvailabilityType' } & Pick<StudentAvailabilityType, 'availabilityNotes'> & {
                        availability?: Maybe<
                            { __typename?: 'StudentAvailabilityDaysType' } & {
                                monday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                tuesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                wednesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                thursday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                friday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                saturday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                sunday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                            }
                        >
                    }
            >
            permissionDetails: { __typename?: 'StudentPermissionType' } & Pick<
                StudentPermissionType,
                | 'didSignPermissionForm'
                | 'hasPermissionToShareDataWithProviders'
                | 'hasPermissionToShareDataWithLibraries'
                | 'hasPermissionToSendInformationAboutLibraries'
            >
        }
}

export type RegistrationsQueryVariables = Exact<{
    languageHouseId: Scalars['String']
}>

export type RegistrationsQuery = { __typename?: 'Query' } & {
    registrations: Array<
        { __typename?: 'StudentType' } & Pick<
            StudentType,
            'id' | 'dateCreated' | 'status' | 'memo' | 'speakingLevel' | 'readingTestResult' | 'writingTestResult'
        > & {
                registrar?: Maybe<
                    { __typename?: 'StudentRegistrarType' } & Pick<
                        StudentRegistrarType,
                        | 'id'
                        | 'organisationName'
                        | 'givenName'
                        | 'additionalName'
                        | 'familyName'
                        | 'email'
                        | 'telephone'
                    >
                >
                civicIntegrationDetails?: Maybe<
                    { __typename?: 'StudentCivicIntegrationType' } & Pick<
                        StudentCivicIntegrationType,
                        | 'civicIntegrationRequirement'
                        | 'civicIntegrationRequirementReason'
                        | 'civicIntegrationRequirementFinishDate'
                    >
                >
                personDetails: { __typename?: 'StudentPersonType' } & Pick<
                    StudentPersonType,
                    'givenName' | 'additionalName' | 'familyName' | 'gender' | 'dateOfBirth'
                >
                contactDetails?: Maybe<
                    { __typename?: 'StudentContactType' } & Pick<
                        StudentContactType,
                        | 'street'
                        | 'postalCode'
                        | 'locality'
                        | 'houseNumber'
                        | 'houseNumberSuffix'
                        | 'email'
                        | 'telephone'
                        | 'contactPersonTelephone'
                        | 'contactPreference'
                        | 'contactPreferenceOther'
                    >
                >
                generalDetails?: Maybe<
                    { __typename?: 'StudentGeneralType' } & Pick<
                        StudentGeneralType,
                        | 'countryOfOrigin'
                        | 'nativeLanguage'
                        | 'otherLanguages'
                        | 'familyComposition'
                        | 'childrenCount'
                        | 'childrenDatesOfBirth'
                    >
                >
                referrerDetails?: Maybe<
                    { __typename?: 'StudentReferrerType' } & Pick<
                        StudentReferrerType,
                        'referringOrganization' | 'referringOrganizationOther' | 'email'
                    >
                >
                backgroundDetails?: Maybe<
                    { __typename?: 'StudentBackgroundType' } & Pick<
                        StudentBackgroundType,
                        | 'foundVia'
                        | 'foundViaOther'
                        | 'wentToLanguageHouseBefore'
                        | 'wentToLanguageHouseBeforeReason'
                        | 'wentToLanguageHouseBeforeYear'
                        | 'network'
                        | 'participationLadder'
                    >
                >
                dutchNTDetails?: Maybe<
                    { __typename?: 'StudentDutchNTType' } & Pick<
                        StudentDutchNtType,
                        | 'dutchNTLevel'
                        | 'inNetherlandsSinceYear'
                        | 'languageInDailyLife'
                        | 'knowsLatinAlphabet'
                        | 'lastKnownLevel'
                    >
                >
                educationDetails?: Maybe<
                    { __typename?: 'StudentEducationType' } & Pick<
                        StudentEducationType,
                        | 'lastFollowedEducation'
                        | 'didGraduate'
                        | 'followingEducationRightNow'
                        | 'followingEducationRightNowYesStartDate'
                        | 'followingEducationRightNowYesEndDate'
                        | 'followingEducationRightNowYesLevel'
                        | 'followingEducationRightNowYesInstitute'
                        | 'followingEducationRightNowYesProvidesCertificate'
                        | 'followingEducationRightNowNoEndDate'
                        | 'followingEducationRightNowNoLevel'
                        | 'followingEducationRightNowNoGotCertificate'
                    >
                >
                courseDetails?: Maybe<
                    { __typename?: 'StudentCourseType' } & Pick<
                        StudentCourseType,
                        | 'isFollowingCourseRightNow'
                        | 'courseName'
                        | 'courseTeacher'
                        | 'courseGroup'
                        | 'amountOfHours'
                        | 'doesCourseProvideCertificate'
                    >
                >
                jobDetails?: Maybe<
                    { __typename?: 'StudentJobType' } & Pick<
                        StudentJobType,
                        'trainedForJob' | 'lastJob' | 'dayTimeActivities' | 'dayTimeActivitiesOther'
                    >
                >
                motivationDetails?: Maybe<
                    { __typename?: 'StudentMotivationType' } & Pick<
                        StudentMotivationType,
                        | 'desiredSkills'
                        | 'desiredSkillsOther'
                        | 'hasTriedThisBefore'
                        | 'hasTriedThisBeforeExplanation'
                        | 'whyWantTheseSkills'
                        | 'whyWantThisNow'
                        | 'desiredLearningMethod'
                        | 'remarks'
                    >
                >
                availabilityDetails?: Maybe<
                    { __typename?: 'StudentAvailabilityType' } & Pick<StudentAvailabilityType, 'availabilityNotes'> & {
                            availability?: Maybe<
                                { __typename?: 'StudentAvailabilityDaysType' } & {
                                    monday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    tuesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    wednesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    thursday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    friday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    saturday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    sunday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                }
                            >
                        }
                >
                permissionDetails: { __typename?: 'StudentPermissionType' } & Pick<
                    StudentPermissionType,
                    | 'didSignPermissionForm'
                    | 'hasPermissionToShareDataWithProviders'
                    | 'hasPermissionToShareDataWithLibraries'
                    | 'hasPermissionToSendInformationAboutLibraries'
                >
            }
    >
}

export type StudentQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type StudentQuery = { __typename?: 'Query' } & {
    student: { __typename?: 'StudentType' } & Pick<
        StudentType,
        'id' | 'dateCreated' | 'status' | 'memo' | 'speakingLevel' | 'readingTestResult' | 'writingTestResult'
    > & {
            registrar?: Maybe<
                { __typename?: 'StudentRegistrarType' } & Pick<
                    StudentRegistrarType,
                    'id' | 'organisationName' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone'
                >
            >
            civicIntegrationDetails?: Maybe<
                { __typename?: 'StudentCivicIntegrationType' } & Pick<
                    StudentCivicIntegrationType,
                    | 'civicIntegrationRequirement'
                    | 'civicIntegrationRequirementReason'
                    | 'civicIntegrationRequirementFinishDate'
                >
            >
            personDetails: { __typename?: 'StudentPersonType' } & Pick<
                StudentPersonType,
                'givenName' | 'additionalName' | 'familyName' | 'gender' | 'dateOfBirth'
            >
            contactDetails?: Maybe<
                { __typename?: 'StudentContactType' } & Pick<
                    StudentContactType,
                    | 'street'
                    | 'postalCode'
                    | 'locality'
                    | 'houseNumber'
                    | 'houseNumberSuffix'
                    | 'email'
                    | 'telephone'
                    | 'contactPersonTelephone'
                    | 'contactPreference'
                    | 'contactPreferenceOther'
                >
            >
            generalDetails?: Maybe<
                { __typename?: 'StudentGeneralType' } & Pick<
                    StudentGeneralType,
                    | 'countryOfOrigin'
                    | 'nativeLanguage'
                    | 'otherLanguages'
                    | 'familyComposition'
                    | 'childrenCount'
                    | 'childrenDatesOfBirth'
                >
            >
            referrerDetails?: Maybe<
                { __typename?: 'StudentReferrerType' } & Pick<
                    StudentReferrerType,
                    'referringOrganization' | 'referringOrganizationOther' | 'email'
                >
            >
            backgroundDetails?: Maybe<
                { __typename?: 'StudentBackgroundType' } & Pick<
                    StudentBackgroundType,
                    | 'foundVia'
                    | 'foundViaOther'
                    | 'wentToLanguageHouseBefore'
                    | 'wentToLanguageHouseBeforeReason'
                    | 'wentToLanguageHouseBeforeYear'
                    | 'network'
                    | 'participationLadder'
                >
            >
            dutchNTDetails?: Maybe<
                { __typename?: 'StudentDutchNTType' } & Pick<
                    StudentDutchNtType,
                    | 'dutchNTLevel'
                    | 'inNetherlandsSinceYear'
                    | 'languageInDailyLife'
                    | 'knowsLatinAlphabet'
                    | 'lastKnownLevel'
                >
            >
            educationDetails?: Maybe<
                { __typename?: 'StudentEducationType' } & Pick<
                    StudentEducationType,
                    | 'lastFollowedEducation'
                    | 'didGraduate'
                    | 'followingEducationRightNow'
                    | 'followingEducationRightNowYesStartDate'
                    | 'followingEducationRightNowYesEndDate'
                    | 'followingEducationRightNowYesLevel'
                    | 'followingEducationRightNowYesInstitute'
                    | 'followingEducationRightNowYesProvidesCertificate'
                    | 'followingEducationRightNowNoEndDate'
                    | 'followingEducationRightNowNoLevel'
                    | 'followingEducationRightNowNoGotCertificate'
                >
            >
            courseDetails?: Maybe<
                { __typename?: 'StudentCourseType' } & Pick<
                    StudentCourseType,
                    | 'isFollowingCourseRightNow'
                    | 'courseName'
                    | 'courseTeacher'
                    | 'courseGroup'
                    | 'amountOfHours'
                    | 'doesCourseProvideCertificate'
                >
            >
            jobDetails?: Maybe<
                { __typename?: 'StudentJobType' } & Pick<
                    StudentJobType,
                    'trainedForJob' | 'lastJob' | 'dayTimeActivities' | 'dayTimeActivitiesOther'
                >
            >
            motivationDetails?: Maybe<
                { __typename?: 'StudentMotivationType' } & Pick<
                    StudentMotivationType,
                    | 'desiredSkills'
                    | 'desiredSkillsOther'
                    | 'hasTriedThisBefore'
                    | 'hasTriedThisBeforeExplanation'
                    | 'whyWantTheseSkills'
                    | 'whyWantThisNow'
                    | 'desiredLearningMethod'
                    | 'remarks'
                >
            >
            availabilityDetails?: Maybe<
                { __typename?: 'StudentAvailabilityType' } & Pick<StudentAvailabilityType, 'availabilityNotes'> & {
                        availability?: Maybe<
                            { __typename?: 'StudentAvailabilityDaysType' } & {
                                monday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                tuesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                wednesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                thursday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                friday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                saturday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                                sunday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                    StudentAvailabilityDayType,
                                    'morning' | 'afternoon' | 'evening'
                                >
                            }
                        >
                    }
            >
            permissionDetails: { __typename?: 'StudentPermissionType' } & Pick<
                StudentPermissionType,
                | 'didSignPermissionForm'
                | 'hasPermissionToShareDataWithProviders'
                | 'hasPermissionToShareDataWithLibraries'
                | 'hasPermissionToSendInformationAboutLibraries'
            >
        }
}

export type StudentDocumentsQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type StudentDocumentsQuery = { __typename?: 'Query' } & {
    studentDocuments: Array<
        { __typename?: 'StudentDocumentType' } & Pick<StudentDocumentType, 'id' | 'filename' | 'dateCreated'>
    >
}

export type StudentsQueryVariables = Exact<{
    languageHouseId: Scalars['String']
}>

export type StudentsQuery = { __typename?: 'Query' } & {
    students: Array<
        { __typename?: 'StudentType' } & Pick<
            StudentType,
            'id' | 'dateCreated' | 'status' | 'memo' | 'speakingLevel' | 'readingTestResult' | 'writingTestResult'
        > & {
                registrar?: Maybe<
                    { __typename?: 'StudentRegistrarType' } & Pick<
                        StudentRegistrarType,
                        | 'id'
                        | 'organisationName'
                        | 'givenName'
                        | 'additionalName'
                        | 'familyName'
                        | 'email'
                        | 'telephone'
                    >
                >
                civicIntegrationDetails?: Maybe<
                    { __typename?: 'StudentCivicIntegrationType' } & Pick<
                        StudentCivicIntegrationType,
                        | 'civicIntegrationRequirement'
                        | 'civicIntegrationRequirementReason'
                        | 'civicIntegrationRequirementFinishDate'
                    >
                >
                personDetails: { __typename?: 'StudentPersonType' } & Pick<
                    StudentPersonType,
                    'givenName' | 'additionalName' | 'familyName' | 'gender' | 'dateOfBirth'
                >
                contactDetails?: Maybe<
                    { __typename?: 'StudentContactType' } & Pick<
                        StudentContactType,
                        | 'street'
                        | 'postalCode'
                        | 'locality'
                        | 'houseNumber'
                        | 'houseNumberSuffix'
                        | 'email'
                        | 'telephone'
                        | 'contactPersonTelephone'
                        | 'contactPreference'
                        | 'contactPreferenceOther'
                    >
                >
                generalDetails?: Maybe<
                    { __typename?: 'StudentGeneralType' } & Pick<
                        StudentGeneralType,
                        | 'countryOfOrigin'
                        | 'nativeLanguage'
                        | 'otherLanguages'
                        | 'familyComposition'
                        | 'childrenCount'
                        | 'childrenDatesOfBirth'
                    >
                >
                referrerDetails?: Maybe<
                    { __typename?: 'StudentReferrerType' } & Pick<
                        StudentReferrerType,
                        'referringOrganization' | 'referringOrganizationOther' | 'email'
                    >
                >
                backgroundDetails?: Maybe<
                    { __typename?: 'StudentBackgroundType' } & Pick<
                        StudentBackgroundType,
                        | 'foundVia'
                        | 'foundViaOther'
                        | 'wentToLanguageHouseBefore'
                        | 'wentToLanguageHouseBeforeReason'
                        | 'wentToLanguageHouseBeforeYear'
                        | 'network'
                        | 'participationLadder'
                    >
                >
                dutchNTDetails?: Maybe<
                    { __typename?: 'StudentDutchNTType' } & Pick<
                        StudentDutchNtType,
                        | 'dutchNTLevel'
                        | 'inNetherlandsSinceYear'
                        | 'languageInDailyLife'
                        | 'knowsLatinAlphabet'
                        | 'lastKnownLevel'
                    >
                >
                educationDetails?: Maybe<
                    { __typename?: 'StudentEducationType' } & Pick<
                        StudentEducationType,
                        | 'lastFollowedEducation'
                        | 'didGraduate'
                        | 'followingEducationRightNow'
                        | 'followingEducationRightNowYesStartDate'
                        | 'followingEducationRightNowYesEndDate'
                        | 'followingEducationRightNowYesLevel'
                        | 'followingEducationRightNowYesInstitute'
                        | 'followingEducationRightNowYesProvidesCertificate'
                        | 'followingEducationRightNowNoEndDate'
                        | 'followingEducationRightNowNoLevel'
                        | 'followingEducationRightNowNoGotCertificate'
                    >
                >
                courseDetails?: Maybe<
                    { __typename?: 'StudentCourseType' } & Pick<
                        StudentCourseType,
                        | 'isFollowingCourseRightNow'
                        | 'courseName'
                        | 'courseTeacher'
                        | 'courseGroup'
                        | 'amountOfHours'
                        | 'doesCourseProvideCertificate'
                    >
                >
                jobDetails?: Maybe<
                    { __typename?: 'StudentJobType' } & Pick<
                        StudentJobType,
                        'trainedForJob' | 'lastJob' | 'dayTimeActivities' | 'dayTimeActivitiesOther'
                    >
                >
                motivationDetails?: Maybe<
                    { __typename?: 'StudentMotivationType' } & Pick<
                        StudentMotivationType,
                        | 'desiredSkills'
                        | 'desiredSkillsOther'
                        | 'hasTriedThisBefore'
                        | 'hasTriedThisBeforeExplanation'
                        | 'whyWantTheseSkills'
                        | 'whyWantThisNow'
                        | 'desiredLearningMethod'
                        | 'remarks'
                    >
                >
                availabilityDetails?: Maybe<
                    { __typename?: 'StudentAvailabilityType' } & Pick<StudentAvailabilityType, 'availabilityNotes'> & {
                            availability?: Maybe<
                                { __typename?: 'StudentAvailabilityDaysType' } & {
                                    monday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    tuesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    wednesday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    thursday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    friday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    saturday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                    sunday: { __typename?: 'StudentAvailabilityDayType' } & Pick<
                                        StudentAvailabilityDayType,
                                        'morning' | 'afternoon' | 'evening'
                                    >
                                }
                            >
                        }
                >
                permissionDetails: { __typename?: 'StudentPermissionType' } & Pick<
                    StudentPermissionType,
                    | 'didSignPermissionForm'
                    | 'hasPermissionToShareDataWithProviders'
                    | 'hasPermissionToShareDataWithLibraries'
                    | 'hasPermissionToSendInformationAboutLibraries'
                >
            }
    >
}

export type UserRolesByLanguageHouseIdQueryVariables = Exact<{
    languageHouseId: Scalars['String']
}>

export type UserRolesByLanguageHouseIdQuery = { __typename?: 'Query' } & {
    userRolesByLanguageHouseId: Array<
        { __typename?: 'LanguageHouseUserRoleType' } & Pick<LanguageHouseUserRoleType, 'id' | 'name'>
    >
}

export type UserRolesByProviderIdQueryVariables = Exact<{
    providerId: Scalars['String']
}>

export type UserRolesByProviderIdQuery = { __typename?: 'Query' } & {
    userRolesByProviderId: Array<{ __typename?: 'ProviderUserRoleType' } & Pick<ProviderUserRoleType, 'id' | 'name'>>
}

export const AcceptRegistrationDocument = gql`
    mutation acceptRegistration($studentId: String!) {
        acceptRegistration(studentId: $studentId) {
            id
            dateCreated
            status
            personDetails {
                givenName
                additionalName
                familyName
                gender
                dateOfBirth
            }
        }
    }
`

/**
 * __useAcceptRegistrationMutation__
 *
 * To run a mutation, you first call `useAcceptRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptRegistrationMutation, { data, loading, error }] = useAcceptRegistrationMutation({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useAcceptRegistrationMutation(
    baseOptions?: Apollo.MutationHookOptions<AcceptRegistrationMutation, AcceptRegistrationMutationVariables>
) {
    return Apollo.useMutation<AcceptRegistrationMutation, AcceptRegistrationMutationVariables>(
        AcceptRegistrationDocument,
        baseOptions
    )
}
export type AcceptRegistrationMutationHookResult = ReturnType<typeof useAcceptRegistrationMutation>
export type AcceptRegistrationMutationResult = Apollo.MutationResult<AcceptRegistrationMutation>
export type AcceptRegistrationMutationOptions = Apollo.BaseMutationOptions<
    AcceptRegistrationMutation,
    AcceptRegistrationMutationVariables
>
export const ChangePasswordDocument = gql`
    mutation changePassword($currentPassword: String!, $newPassword: String!) {
        changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
    }
`

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>
) {
    return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
        ChangePasswordDocument,
        baseOptions
    )
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>
export const CreateBiscEmployeeDocument = gql`
    mutation createBiscEmployee($input: CreateBiscEmployeeInputType!) {
        createBiscEmployee(input: $input) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
        }
    }
`

/**
 * __useCreateBiscEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateBiscEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBiscEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBiscEmployeeMutation, { data, loading, error }] = useCreateBiscEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBiscEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateBiscEmployeeMutation, CreateBiscEmployeeMutationVariables>
) {
    return Apollo.useMutation<CreateBiscEmployeeMutation, CreateBiscEmployeeMutationVariables>(
        CreateBiscEmployeeDocument,
        baseOptions
    )
}
export type CreateBiscEmployeeMutationHookResult = ReturnType<typeof useCreateBiscEmployeeMutation>
export type CreateBiscEmployeeMutationResult = Apollo.MutationResult<CreateBiscEmployeeMutation>
export type CreateBiscEmployeeMutationOptions = Apollo.BaseMutationOptions<
    CreateBiscEmployeeMutation,
    CreateBiscEmployeeMutationVariables
>
export const CreateLanguageHouseDocument = gql`
    mutation createLanguageHouse(
        $address: CreateLanguageHouseAddressInputType!
        $name: String!
        $email: String!
        $phoneNumber: String!
    ) {
        createLanguageHouse(address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useCreateLanguageHouseMutation__
 *
 * To run a mutation, you first call `useCreateLanguageHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLanguageHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLanguageHouseMutation, { data, loading, error }] = useCreateLanguageHouseMutation({
 *   variables: {
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useCreateLanguageHouseMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateLanguageHouseMutation, CreateLanguageHouseMutationVariables>
) {
    return Apollo.useMutation<CreateLanguageHouseMutation, CreateLanguageHouseMutationVariables>(
        CreateLanguageHouseDocument,
        baseOptions
    )
}
export type CreateLanguageHouseMutationHookResult = ReturnType<typeof useCreateLanguageHouseMutation>
export type CreateLanguageHouseMutationResult = Apollo.MutationResult<CreateLanguageHouseMutation>
export type CreateLanguageHouseMutationOptions = Apollo.BaseMutationOptions<
    CreateLanguageHouseMutation,
    CreateLanguageHouseMutationVariables
>
export const CreateLanguageHouseEmployeeDocument = gql`
    mutation createLanguageHouseEmployee($input: CreateLanguageHouseEmployeeInputType!) {
        createLanguageHouseEmployee(input: $input) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useCreateLanguageHouseEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateLanguageHouseEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLanguageHouseEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLanguageHouseEmployeeMutation, { data, loading, error }] = useCreateLanguageHouseEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLanguageHouseEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateLanguageHouseEmployeeMutation,
        CreateLanguageHouseEmployeeMutationVariables
    >
) {
    return Apollo.useMutation<CreateLanguageHouseEmployeeMutation, CreateLanguageHouseEmployeeMutationVariables>(
        CreateLanguageHouseEmployeeDocument,
        baseOptions
    )
}
export type CreateLanguageHouseEmployeeMutationHookResult = ReturnType<typeof useCreateLanguageHouseEmployeeMutation>
export type CreateLanguageHouseEmployeeMutationResult = Apollo.MutationResult<CreateLanguageHouseEmployeeMutation>
export type CreateLanguageHouseEmployeeMutationOptions = Apollo.BaseMutationOptions<
    CreateLanguageHouseEmployeeMutation,
    CreateLanguageHouseEmployeeMutationVariables
>
export const CreateLearningNeedDocument = gql`
    mutation createLearningNeed($input: CreateLearningNeedInputType!) {
        createLearningNeed(input: $input) {
            id
            learningNeedDescription
            learningNeedMotivation
            desiredOutComesGoal
            desiredOutComesTopic
            desiredOutComesTopicOther
            desiredOutComesApplication
            desiredOutComesApplicationOther
            desiredOutComesLevel
            desiredOutComesLevel
            offerDesiredOffer
            offerAdvisedOffer
            offerDifference
            offerDifferenceOther
            offerEngagements
            participations {
                id
                status
                providerId
                providerName
                providerNote
                offerName
                offerCourse
                outComesGoal
                outComesTopic
                outComesTopicOther
                outComesApplication
                outComesApplicationOther
                outComesLevel
                outComesLevelOther
                detailsIsFormal
                detailsGroupFormation
                detailsTotalClassHours
                detailsCertificateWillBeAwarded
                detailsStartDate
                detailsEndDate
                detailsEngagements
            }
        }
    }
`

/**
 * __useCreateLearningNeedMutation__
 *
 * To run a mutation, you first call `useCreateLearningNeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLearningNeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLearningNeedMutation, { data, loading, error }] = useCreateLearningNeedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLearningNeedMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateLearningNeedMutation, CreateLearningNeedMutationVariables>
) {
    return Apollo.useMutation<CreateLearningNeedMutation, CreateLearningNeedMutationVariables>(
        CreateLearningNeedDocument,
        baseOptions
    )
}
export type CreateLearningNeedMutationHookResult = ReturnType<typeof useCreateLearningNeedMutation>
export type CreateLearningNeedMutationResult = Apollo.MutationResult<CreateLearningNeedMutation>
export type CreateLearningNeedMutationOptions = Apollo.BaseMutationOptions<
    CreateLearningNeedMutation,
    CreateLearningNeedMutationVariables
>
export const CreateParticipationDocument = gql`
    mutation createParticipation($input: CreateParticipationInputType!) {
        createParticipation(input: $input) {
            id
            status
            providerId
            providerName
            providerNote
            offerName
            offerCourse
            outComesGoal
            outComesTopic
            outComesTopicOther
            outComesApplication
            outComesApplicationOther
            outComesLevel
            outComesLevelOther
            detailsIsFormal
            detailsGroupFormation
            detailsTotalClassHours
            detailsCertificateWillBeAwarded
            detailsStartDate
            detailsEndDate
            detailsEngagements
        }
    }
`

/**
 * __useCreateParticipationMutation__
 *
 * To run a mutation, you first call `useCreateParticipationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateParticipationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createParticipationMutation, { data, loading, error }] = useCreateParticipationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateParticipationMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateParticipationMutation, CreateParticipationMutationVariables>
) {
    return Apollo.useMutation<CreateParticipationMutation, CreateParticipationMutationVariables>(
        CreateParticipationDocument,
        baseOptions
    )
}
export type CreateParticipationMutationHookResult = ReturnType<typeof useCreateParticipationMutation>
export type CreateParticipationMutationResult = Apollo.MutationResult<CreateParticipationMutation>
export type CreateParticipationMutationOptions = Apollo.BaseMutationOptions<
    CreateParticipationMutation,
    CreateParticipationMutationVariables
>
export const CreateProviderDocument = gql`
    mutation createProvider(
        $address: CreateProviderAddressInputType!
        $name: String!
        $email: String
        $phoneNumber: String
    ) {
        createProvider(address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useCreateProviderMutation__
 *
 * To run a mutation, you first call `useCreateProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProviderMutation, { data, loading, error }] = useCreateProviderMutation({
 *   variables: {
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useCreateProviderMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateProviderMutation, CreateProviderMutationVariables>
) {
    return Apollo.useMutation<CreateProviderMutation, CreateProviderMutationVariables>(
        CreateProviderDocument,
        baseOptions
    )
}
export type CreateProviderMutationHookResult = ReturnType<typeof useCreateProviderMutation>
export type CreateProviderMutationResult = Apollo.MutationResult<CreateProviderMutation>
export type CreateProviderMutationOptions = Apollo.BaseMutationOptions<
    CreateProviderMutation,
    CreateProviderMutationVariables
>
export const CreateProviderEmployeeDocument = gql`
    mutation createProviderEmployee($input: CreateProviderEmployeeInputType!) {
        createProviderEmployee(input: $input) {
            userId
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
            givenName
            additionalName
            familyName
            telephone
            availability {
                monday {
                    morning
                    afternoon
                    evening
                }
                tuesday {
                    morning
                    afternoon
                    evening
                }
                wednesday {
                    morning
                    afternoon
                    evening
                }
                thursday {
                    morning
                    afternoon
                    evening
                }
                friday {
                    morning
                    afternoon
                    evening
                }
                saturday {
                    morning
                    afternoon
                    evening
                }
                sunday {
                    morning
                    afternoon
                    evening
                }
            }
            availabilityNotes
            email
            gender
            dateOfBirth
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            contactTelephone
            contactPreference
            contactPreferenceOther
            targetGroupPreference
            volunteringPreference
            gotHereVia
            hasExperienceWithTargetGroup
            experienceWithTargetGroupYesReason
            currentEducation
            currentEducationYes {
                dateSince
                name
                doesProvideCertificate
            }
            currentEdicationNoButDidFollow {
                dateUntil
                level
                gotCertificate
            }
            doesCurrentlyFollowCourse
            currentlyFollowingCourseName
            currentlyFollowingCourseInstitute
            currentlyFollowingCourseTeacherProfessionalism
            currentlyFollowingCourseCourseProfessionalism
            doesCurrentlyFollowingCourseProvideCertificate
            otherRelevantCertificates
            isVOGChecked
        }
    }
`

/**
 * __useCreateProviderEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateProviderEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProviderEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProviderEmployeeMutation, { data, loading, error }] = useCreateProviderEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProviderEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateProviderEmployeeMutation, CreateProviderEmployeeMutationVariables>
) {
    return Apollo.useMutation<CreateProviderEmployeeMutation, CreateProviderEmployeeMutationVariables>(
        CreateProviderEmployeeDocument,
        baseOptions
    )
}
export type CreateProviderEmployeeMutationHookResult = ReturnType<typeof useCreateProviderEmployeeMutation>
export type CreateProviderEmployeeMutationResult = Apollo.MutationResult<CreateProviderEmployeeMutation>
export type CreateProviderEmployeeMutationOptions = Apollo.BaseMutationOptions<
    CreateProviderEmployeeMutation,
    CreateProviderEmployeeMutationVariables
>
export const CreateProviderEmployeeDocumentDocument = gql`
    mutation createProviderEmployeeDocument($input: CreateProviderEmployeeDocumentInputType!) {
        createProviderEmployeeDocument(input: $input) {
            id
            filename
            dateCreated
        }
    }
`

/**
 * __useCreateProviderEmployeeDocumentMutation__
 *
 * To run a mutation, you first call `useCreateProviderEmployeeDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProviderEmployeeDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProviderEmployeeDocumentMutation, { data, loading, error }] = useCreateProviderEmployeeDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProviderEmployeeDocumentMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateProviderEmployeeDocumentMutation,
        CreateProviderEmployeeDocumentMutationVariables
    >
) {
    return Apollo.useMutation<CreateProviderEmployeeDocumentMutation, CreateProviderEmployeeDocumentMutationVariables>(
        CreateProviderEmployeeDocumentDocument,
        baseOptions
    )
}
export type CreateProviderEmployeeDocumentMutationHookResult = ReturnType<
    typeof useCreateProviderEmployeeDocumentMutation
>
export type CreateProviderEmployeeDocumentMutationResult = Apollo.MutationResult<CreateProviderEmployeeDocumentMutation>
export type CreateProviderEmployeeDocumentMutationOptions = Apollo.BaseMutationOptions<
    CreateProviderEmployeeDocumentMutation,
    CreateProviderEmployeeDocumentMutationVariables
>
export const CreateStudentDocument = gql`
    mutation createStudent($input: CreateStudentInputType!) {
        createStudent(input: $input) {
            id
            dateCreated
            status
            memo
            registrar {
                id
                organisationName
                givenName
                additionalName
                familyName
                email
                telephone
            }
            civicIntegrationDetails {
                civicIntegrationRequirement
                civicIntegrationRequirementReason
                civicIntegrationRequirementFinishDate
            }
            personDetails {
                givenName
                additionalName
                familyName
                gender
                dateOfBirth
            }
            contactDetails {
                street
                postalCode
                locality
                houseNumber
                houseNumberSuffix
                email
                telephone
                contactPersonTelephone
                contactPreference
                contactPreferenceOther
            }
            generalDetails {
                countryOfOrigin
                nativeLanguage
                otherLanguages
                familyComposition
                childrenCount
                childrenDatesOfBirth
            }
            referrerDetails {
                referringOrganization
                referringOrganizationOther
                email
            }
            backgroundDetails {
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
            }
            dutchNTDetails {
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
            }
            speakingLevel
            educationDetails {
                lastFollowedEducation
                didGraduate
                followingEducationRightNow
                followingEducationRightNowYesStartDate
                followingEducationRightNowYesEndDate
                followingEducationRightNowYesLevel
                followingEducationRightNowYesInstitute
                followingEducationRightNowYesProvidesCertificate
                followingEducationRightNowNoEndDate
                followingEducationRightNowNoLevel
                followingEducationRightNowNoGotCertificate
            }
            courseDetails {
                isFollowingCourseRightNow
                courseName
                courseTeacher
                courseGroup
                amountOfHours
                doesCourseProvideCertificate
            }
            jobDetails {
                trainedForJob
                lastJob
                dayTimeActivities
                dayTimeActivitiesOther
            }
            motivationDetails {
                desiredSkills
                desiredSkillsOther
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseSkills
                whyWantThisNow
                desiredLearningMethod
                remarks
            }
            availabilityDetails {
                availability {
                    monday {
                        morning
                        afternoon
                        evening
                    }
                    tuesday {
                        morning
                        afternoon
                        evening
                    }
                    wednesday {
                        morning
                        afternoon
                        evening
                    }
                    thursday {
                        morning
                        afternoon
                        evening
                    }
                    friday {
                        morning
                        afternoon
                        evening
                    }
                    saturday {
                        morning
                        afternoon
                        evening
                    }
                    sunday {
                        morning
                        afternoon
                        evening
                    }
                }
                availabilityNotes
            }
            readingTestResult
            writingTestResult
            permissionDetails {
                didSignPermissionForm
                hasPermissionToShareDataWithProviders
                hasPermissionToShareDataWithLibraries
                hasPermissionToSendInformationAboutLibraries
            }
        }
    }
`

/**
 * __useCreateStudentMutation__
 *
 * To run a mutation, you first call `useCreateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentMutation, { data, loading, error }] = useCreateStudentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStudentMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateStudentMutation, CreateStudentMutationVariables>
) {
    return Apollo.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument, baseOptions)
}
export type CreateStudentMutationHookResult = ReturnType<typeof useCreateStudentMutation>
export type CreateStudentMutationResult = Apollo.MutationResult<CreateStudentMutation>
export type CreateStudentMutationOptions = Apollo.BaseMutationOptions<
    CreateStudentMutation,
    CreateStudentMutationVariables
>
export const CreateStudentDocumentDocument = gql`
    mutation createStudentDocument($input: CreateStudentDocumentInputType!) {
        createStudentDocument(input: $input) {
            id
            filename
            dateCreated
        }
    }
`

/**
 * __useCreateStudentDocumentMutation__
 *
 * To run a mutation, you first call `useCreateStudentDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentDocumentMutation, { data, loading, error }] = useCreateStudentDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStudentDocumentMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateStudentDocumentMutation, CreateStudentDocumentMutationVariables>
) {
    return Apollo.useMutation<CreateStudentDocumentMutation, CreateStudentDocumentMutationVariables>(
        CreateStudentDocumentDocument,
        baseOptions
    )
}
export type CreateStudentDocumentMutationHookResult = ReturnType<typeof useCreateStudentDocumentMutation>
export type CreateStudentDocumentMutationResult = Apollo.MutationResult<CreateStudentDocumentMutation>
export type CreateStudentDocumentMutationOptions = Apollo.BaseMutationOptions<
    CreateStudentDocumentMutation,
    CreateStudentDocumentMutationVariables
>
export const DeleteBiscEmployeeDocument = gql`
    mutation deleteBiscEmployee($biscEmployeeId: String!) {
        deleteBiscEmployee(biscEmployeeId: $biscEmployeeId)
    }
`

/**
 * __useDeleteBiscEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteBiscEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBiscEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBiscEmployeeMutation, { data, loading, error }] = useDeleteBiscEmployeeMutation({
 *   variables: {
 *      biscEmployeeId: // value for 'biscEmployeeId'
 *   },
 * });
 */
export function useDeleteBiscEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteBiscEmployeeMutation, DeleteBiscEmployeeMutationVariables>
) {
    return Apollo.useMutation<DeleteBiscEmployeeMutation, DeleteBiscEmployeeMutationVariables>(
        DeleteBiscEmployeeDocument,
        baseOptions
    )
}
export type DeleteBiscEmployeeMutationHookResult = ReturnType<typeof useDeleteBiscEmployeeMutation>
export type DeleteBiscEmployeeMutationResult = Apollo.MutationResult<DeleteBiscEmployeeMutation>
export type DeleteBiscEmployeeMutationOptions = Apollo.BaseMutationOptions<
    DeleteBiscEmployeeMutation,
    DeleteBiscEmployeeMutationVariables
>
export const DeleteLanguageHouseDocument = gql`
    mutation deleteLanguageHouse($id: String!) {
        deleteLanguageHouse(id: $id)
    }
`

/**
 * __useDeleteLanguageHouseMutation__
 *
 * To run a mutation, you first call `useDeleteLanguageHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLanguageHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLanguageHouseMutation, { data, loading, error }] = useDeleteLanguageHouseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLanguageHouseMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteLanguageHouseMutation, DeleteLanguageHouseMutationVariables>
) {
    return Apollo.useMutation<DeleteLanguageHouseMutation, DeleteLanguageHouseMutationVariables>(
        DeleteLanguageHouseDocument,
        baseOptions
    )
}
export type DeleteLanguageHouseMutationHookResult = ReturnType<typeof useDeleteLanguageHouseMutation>
export type DeleteLanguageHouseMutationResult = Apollo.MutationResult<DeleteLanguageHouseMutation>
export type DeleteLanguageHouseMutationOptions = Apollo.BaseMutationOptions<
    DeleteLanguageHouseMutation,
    DeleteLanguageHouseMutationVariables
>
export const DeleteLanguageHouseEmployeeDocument = gql`
    mutation deleteLanguageHouseEmployee($userId: String!) {
        deleteLanguageHouseEmployee(userId: $userId)
    }
`

/**
 * __useDeleteLanguageHouseEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteLanguageHouseEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLanguageHouseEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLanguageHouseEmployeeMutation, { data, loading, error }] = useDeleteLanguageHouseEmployeeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteLanguageHouseEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteLanguageHouseEmployeeMutation,
        DeleteLanguageHouseEmployeeMutationVariables
    >
) {
    return Apollo.useMutation<DeleteLanguageHouseEmployeeMutation, DeleteLanguageHouseEmployeeMutationVariables>(
        DeleteLanguageHouseEmployeeDocument,
        baseOptions
    )
}
export type DeleteLanguageHouseEmployeeMutationHookResult = ReturnType<typeof useDeleteLanguageHouseEmployeeMutation>
export type DeleteLanguageHouseEmployeeMutationResult = Apollo.MutationResult<DeleteLanguageHouseEmployeeMutation>
export type DeleteLanguageHouseEmployeeMutationOptions = Apollo.BaseMutationOptions<
    DeleteLanguageHouseEmployeeMutation,
    DeleteLanguageHouseEmployeeMutationVariables
>
export const DeleteProviderDocument = gql`
    mutation deleteProvider($id: String!) {
        deleteProvider(id: $id)
    }
`

/**
 * __useDeleteProviderMutation__
 *
 * To run a mutation, you first call `useDeleteProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProviderMutation, { data, loading, error }] = useDeleteProviderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProviderMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteProviderMutation, DeleteProviderMutationVariables>
) {
    return Apollo.useMutation<DeleteProviderMutation, DeleteProviderMutationVariables>(
        DeleteProviderDocument,
        baseOptions
    )
}
export type DeleteProviderMutationHookResult = ReturnType<typeof useDeleteProviderMutation>
export type DeleteProviderMutationResult = Apollo.MutationResult<DeleteProviderMutation>
export type DeleteProviderMutationOptions = Apollo.BaseMutationOptions<
    DeleteProviderMutation,
    DeleteProviderMutationVariables
>
export const DeleteProviderEmployeeDocument = gql`
    mutation deleteProviderEmployee($userId: String!) {
        deleteProviderEmployee(userId: $userId)
    }
`

/**
 * __useDeleteProviderEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteProviderEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProviderEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProviderEmployeeMutation, { data, loading, error }] = useDeleteProviderEmployeeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteProviderEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteProviderEmployeeMutation, DeleteProviderEmployeeMutationVariables>
) {
    return Apollo.useMutation<DeleteProviderEmployeeMutation, DeleteProviderEmployeeMutationVariables>(
        DeleteProviderEmployeeDocument,
        baseOptions
    )
}
export type DeleteProviderEmployeeMutationHookResult = ReturnType<typeof useDeleteProviderEmployeeMutation>
export type DeleteProviderEmployeeMutationResult = Apollo.MutationResult<DeleteProviderEmployeeMutation>
export type DeleteProviderEmployeeMutationOptions = Apollo.BaseMutationOptions<
    DeleteProviderEmployeeMutation,
    DeleteProviderEmployeeMutationVariables
>
export const DeleteProviderEmployeeDocumentDocument = gql`
    mutation deleteProviderEmployeeDocument($providerEmployeeDocumentId: String!) {
        deleteProviderEmployeeDocument(providerEmployeeDocumentId: $providerEmployeeDocumentId)
    }
`

/**
 * __useDeleteProviderEmployeeDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteProviderEmployeeDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProviderEmployeeDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProviderEmployeeDocumentMutation, { data, loading, error }] = useDeleteProviderEmployeeDocumentMutation({
 *   variables: {
 *      providerEmployeeDocumentId: // value for 'providerEmployeeDocumentId'
 *   },
 * });
 */
export function useDeleteProviderEmployeeDocumentMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteProviderEmployeeDocumentMutation,
        DeleteProviderEmployeeDocumentMutationVariables
    >
) {
    return Apollo.useMutation<DeleteProviderEmployeeDocumentMutation, DeleteProviderEmployeeDocumentMutationVariables>(
        DeleteProviderEmployeeDocumentDocument,
        baseOptions
    )
}
export type DeleteProviderEmployeeDocumentMutationHookResult = ReturnType<
    typeof useDeleteProviderEmployeeDocumentMutation
>
export type DeleteProviderEmployeeDocumentMutationResult = Apollo.MutationResult<DeleteProviderEmployeeDocumentMutation>
export type DeleteProviderEmployeeDocumentMutationOptions = Apollo.BaseMutationOptions<
    DeleteProviderEmployeeDocumentMutation,
    DeleteProviderEmployeeDocumentMutationVariables
>
export const DeleteRegistrationDocument = gql`
    mutation deleteRegistration($studentId: String!) {
        deleteRegistration(studentId: $studentId)
    }
`

/**
 * __useDeleteRegistrationMutation__
 *
 * To run a mutation, you first call `useDeleteRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRegistrationMutation, { data, loading, error }] = useDeleteRegistrationMutation({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useDeleteRegistrationMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteRegistrationMutation, DeleteRegistrationMutationVariables>
) {
    return Apollo.useMutation<DeleteRegistrationMutation, DeleteRegistrationMutationVariables>(
        DeleteRegistrationDocument,
        baseOptions
    )
}
export type DeleteRegistrationMutationHookResult = ReturnType<typeof useDeleteRegistrationMutation>
export type DeleteRegistrationMutationResult = Apollo.MutationResult<DeleteRegistrationMutation>
export type DeleteRegistrationMutationOptions = Apollo.BaseMutationOptions<
    DeleteRegistrationMutation,
    DeleteRegistrationMutationVariables
>
export const DeleteStudentDocumentDocument = gql`
    mutation deleteStudentDocument($studentDocumentId: String!) {
        deleteStudentDocument(studentDocumentId: $studentDocumentId)
    }
`

/**
 * __useDeleteStudentDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteStudentDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudentDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudentDocumentMutation, { data, loading, error }] = useDeleteStudentDocumentMutation({
 *   variables: {
 *      studentDocumentId: // value for 'studentDocumentId'
 *   },
 * });
 */
export function useDeleteStudentDocumentMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteStudentDocumentMutation, DeleteStudentDocumentMutationVariables>
) {
    return Apollo.useMutation<DeleteStudentDocumentMutation, DeleteStudentDocumentMutationVariables>(
        DeleteStudentDocumentDocument,
        baseOptions
    )
}
export type DeleteStudentDocumentMutationHookResult = ReturnType<typeof useDeleteStudentDocumentMutation>
export type DeleteStudentDocumentMutationResult = Apollo.MutationResult<DeleteStudentDocumentMutation>
export type DeleteStudentDocumentMutationOptions = Apollo.BaseMutationOptions<
    DeleteStudentDocumentMutation,
    DeleteStudentDocumentMutationVariables
>
export const DownloadProviderEmployeeDocumentDocument = gql`
    mutation downloadProviderEmployeeDocument($providerEmployeeDocumentId: String!) {
        downloadProviderEmployeeDocument(providerEmployeeDocumentId: $providerEmployeeDocumentId) {
            base64data
        }
    }
`

/**
 * __useDownloadProviderEmployeeDocumentMutation__
 *
 * To run a mutation, you first call `useDownloadProviderEmployeeDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadProviderEmployeeDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadProviderEmployeeDocumentMutation, { data, loading, error }] = useDownloadProviderEmployeeDocumentMutation({
 *   variables: {
 *      providerEmployeeDocumentId: // value for 'providerEmployeeDocumentId'
 *   },
 * });
 */
export function useDownloadProviderEmployeeDocumentMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DownloadProviderEmployeeDocumentMutation,
        DownloadProviderEmployeeDocumentMutationVariables
    >
) {
    return Apollo.useMutation<
        DownloadProviderEmployeeDocumentMutation,
        DownloadProviderEmployeeDocumentMutationVariables
    >(DownloadProviderEmployeeDocumentDocument, baseOptions)
}
export type DownloadProviderEmployeeDocumentMutationHookResult = ReturnType<
    typeof useDownloadProviderEmployeeDocumentMutation
>
export type DownloadProviderEmployeeDocumentMutationResult = Apollo.MutationResult<DownloadProviderEmployeeDocumentMutation>
export type DownloadProviderEmployeeDocumentMutationOptions = Apollo.BaseMutationOptions<
    DownloadProviderEmployeeDocumentMutation,
    DownloadProviderEmployeeDocumentMutationVariables
>
export const DownloadStudentDocumentDocument = gql`
    mutation downloadStudentDocument($studentDocumentId: String!) {
        downloadStudentDocument(studentDocumentId: $studentDocumentId) {
            base64data
        }
    }
`

/**
 * __useDownloadStudentDocumentMutation__
 *
 * To run a mutation, you first call `useDownloadStudentDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadStudentDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadStudentDocumentMutation, { data, loading, error }] = useDownloadStudentDocumentMutation({
 *   variables: {
 *      studentDocumentId: // value for 'studentDocumentId'
 *   },
 * });
 */
export function useDownloadStudentDocumentMutation(
    baseOptions?: Apollo.MutationHookOptions<DownloadStudentDocumentMutation, DownloadStudentDocumentMutationVariables>
) {
    return Apollo.useMutation<DownloadStudentDocumentMutation, DownloadStudentDocumentMutationVariables>(
        DownloadStudentDocumentDocument,
        baseOptions
    )
}
export type DownloadStudentDocumentMutationHookResult = ReturnType<typeof useDownloadStudentDocumentMutation>
export type DownloadStudentDocumentMutationResult = Apollo.MutationResult<DownloadStudentDocumentMutation>
export type DownloadStudentDocumentMutationOptions = Apollo.BaseMutationOptions<
    DownloadStudentDocumentMutation,
    DownloadStudentDocumentMutationVariables
>
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            accessToken
        }
    }
`

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const RequestPasswordResetDocument = gql`
    mutation requestPasswordReset($email: String!) {
        requestPasswordReset(email: $email)
    }
`

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetMutation, { data, loading, error }] = useRequestPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(
    baseOptions?: Apollo.MutationHookOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>
) {
    return Apollo.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(
        RequestPasswordResetDocument,
        baseOptions
    )
}
export type RequestPasswordResetMutationHookResult = ReturnType<typeof useRequestPasswordResetMutation>
export type RequestPasswordResetMutationResult = Apollo.MutationResult<RequestPasswordResetMutation>
export type RequestPasswordResetMutationOptions = Apollo.BaseMutationOptions<
    RequestPasswordResetMutation,
    RequestPasswordResetMutationVariables
>
export const ResetPasswordDocument = gql`
    mutation resetPassword($email: String!, $token: String!, $password: String!) {
        resetPassword(email: $email, token: $token, password: $password)
    }
`

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>
) {
    return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions)
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
>
export const UpdateBiscEmployeeDocument = gql`
    mutation updateBiscEmployee($input: UpdateBiscEmployeeInputType!) {
        updateBiscEmployee(input: $input) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
        }
    }
`

/**
 * __useUpdateBiscEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateBiscEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBiscEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBiscEmployeeMutation, { data, loading, error }] = useUpdateBiscEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBiscEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateBiscEmployeeMutation, UpdateBiscEmployeeMutationVariables>
) {
    return Apollo.useMutation<UpdateBiscEmployeeMutation, UpdateBiscEmployeeMutationVariables>(
        UpdateBiscEmployeeDocument,
        baseOptions
    )
}
export type UpdateBiscEmployeeMutationHookResult = ReturnType<typeof useUpdateBiscEmployeeMutation>
export type UpdateBiscEmployeeMutationResult = Apollo.MutationResult<UpdateBiscEmployeeMutation>
export type UpdateBiscEmployeeMutationOptions = Apollo.BaseMutationOptions<
    UpdateBiscEmployeeMutation,
    UpdateBiscEmployeeMutationVariables
>
export const UpdateLanguageHouseDocument = gql`
    mutation updateLanguageHouse(
        $id: String!
        $address: UpdateLanguageHouseAddressInputType!
        $name: String
        $email: String
        $phoneNumber: String
    ) {
        updateLanguageHouse(id: $id, address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useUpdateLanguageHouseMutation__
 *
 * To run a mutation, you first call `useUpdateLanguageHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLanguageHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLanguageHouseMutation, { data, loading, error }] = useUpdateLanguageHouseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUpdateLanguageHouseMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateLanguageHouseMutation, UpdateLanguageHouseMutationVariables>
) {
    return Apollo.useMutation<UpdateLanguageHouseMutation, UpdateLanguageHouseMutationVariables>(
        UpdateLanguageHouseDocument,
        baseOptions
    )
}
export type UpdateLanguageHouseMutationHookResult = ReturnType<typeof useUpdateLanguageHouseMutation>
export type UpdateLanguageHouseMutationResult = Apollo.MutationResult<UpdateLanguageHouseMutation>
export type UpdateLanguageHouseMutationOptions = Apollo.BaseMutationOptions<
    UpdateLanguageHouseMutation,
    UpdateLanguageHouseMutationVariables
>
export const UpdateLanguageHouseEmployeeDocument = gql`
    mutation updateLanguageHouseEmployee($input: UpdateLanguageHouseEmployeeInputType!) {
        updateLanguageHouseEmployee(input: $input) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useUpdateLanguageHouseEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateLanguageHouseEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLanguageHouseEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLanguageHouseEmployeeMutation, { data, loading, error }] = useUpdateLanguageHouseEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLanguageHouseEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UpdateLanguageHouseEmployeeMutation,
        UpdateLanguageHouseEmployeeMutationVariables
    >
) {
    return Apollo.useMutation<UpdateLanguageHouseEmployeeMutation, UpdateLanguageHouseEmployeeMutationVariables>(
        UpdateLanguageHouseEmployeeDocument,
        baseOptions
    )
}
export type UpdateLanguageHouseEmployeeMutationHookResult = ReturnType<typeof useUpdateLanguageHouseEmployeeMutation>
export type UpdateLanguageHouseEmployeeMutationResult = Apollo.MutationResult<UpdateLanguageHouseEmployeeMutation>
export type UpdateLanguageHouseEmployeeMutationOptions = Apollo.BaseMutationOptions<
    UpdateLanguageHouseEmployeeMutation,
    UpdateLanguageHouseEmployeeMutationVariables
>
export const UpdateProviderDocument = gql`
    mutation updateProvider(
        $id: String!
        $address: UpdateProviderAddressInputType!
        $name: String!
        $email: String
        $phoneNumber: String
    ) {
        updateProvider(id: $id, address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useUpdateProviderMutation__
 *
 * To run a mutation, you first call `useUpdateProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProviderMutation, { data, loading, error }] = useUpdateProviderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUpdateProviderMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateProviderMutation, UpdateProviderMutationVariables>
) {
    return Apollo.useMutation<UpdateProviderMutation, UpdateProviderMutationVariables>(
        UpdateProviderDocument,
        baseOptions
    )
}
export type UpdateProviderMutationHookResult = ReturnType<typeof useUpdateProviderMutation>
export type UpdateProviderMutationResult = Apollo.MutationResult<UpdateProviderMutation>
export type UpdateProviderMutationOptions = Apollo.BaseMutationOptions<
    UpdateProviderMutation,
    UpdateProviderMutationVariables
>
export const UpdateProviderEmployeeDocument = gql`
    mutation updateProviderEmployee($input: UpdateProviderEmployeeInputType!) {
        updateProviderEmployee(input: $input) {
            userId
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
            givenName
            additionalName
            familyName
            telephone
            availability {
                monday {
                    morning
                    afternoon
                    evening
                }
                tuesday {
                    morning
                    afternoon
                    evening
                }
                wednesday {
                    morning
                    afternoon
                    evening
                }
                thursday {
                    morning
                    afternoon
                    evening
                }
                friday {
                    morning
                    afternoon
                    evening
                }
                saturday {
                    morning
                    afternoon
                    evening
                }
                sunday {
                    morning
                    afternoon
                    evening
                }
            }
            availabilityNotes
            email
            gender
            dateOfBirth
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            contactTelephone
            contactPreference
            contactPreferenceOther
            targetGroupPreference
            volunteringPreference
            gotHereVia
            hasExperienceWithTargetGroup
            experienceWithTargetGroupYesReason
            currentEducation
            currentEducationYes {
                dateSince
                name
                doesProvideCertificate
            }
            currentEdicationNoButDidFollow {
                dateUntil
                level
                gotCertificate
            }
            doesCurrentlyFollowCourse
            currentlyFollowingCourseName
            currentlyFollowingCourseInstitute
            currentlyFollowingCourseTeacherProfessionalism
            currentlyFollowingCourseCourseProfessionalism
            doesCurrentlyFollowingCourseProvideCertificate
            otherRelevantCertificates
            isVOGChecked
        }
    }
`

/**
 * __useUpdateProviderEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateProviderEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProviderEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProviderEmployeeMutation, { data, loading, error }] = useUpdateProviderEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProviderEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateProviderEmployeeMutation, UpdateProviderEmployeeMutationVariables>
) {
    return Apollo.useMutation<UpdateProviderEmployeeMutation, UpdateProviderEmployeeMutationVariables>(
        UpdateProviderEmployeeDocument,
        baseOptions
    )
}
export type UpdateProviderEmployeeMutationHookResult = ReturnType<typeof useUpdateProviderEmployeeMutation>
export type UpdateProviderEmployeeMutationResult = Apollo.MutationResult<UpdateProviderEmployeeMutation>
export type UpdateProviderEmployeeMutationOptions = Apollo.BaseMutationOptions<
    UpdateProviderEmployeeMutation,
    UpdateProviderEmployeeMutationVariables
>
export const UpdateStudentDocument = gql`
    mutation updateStudent($input: UpdateStudentInputType!) {
        updateStudent(input: $input) {
            id
            dateCreated
            status
            memo
            registrar {
                id
                organisationName
                givenName
                additionalName
                familyName
                email
                telephone
            }
            civicIntegrationDetails {
                civicIntegrationRequirement
                civicIntegrationRequirementReason
                civicIntegrationRequirementFinishDate
            }
            personDetails {
                givenName
                additionalName
                familyName
                gender
                dateOfBirth
            }
            contactDetails {
                street
                postalCode
                locality
                houseNumber
                houseNumberSuffix
                email
                telephone
                contactPersonTelephone
                contactPreference
                contactPreferenceOther
            }
            generalDetails {
                countryOfOrigin
                nativeLanguage
                otherLanguages
                familyComposition
                childrenCount
                childrenDatesOfBirth
            }
            referrerDetails {
                referringOrganization
                referringOrganizationOther
                email
            }
            backgroundDetails {
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
            }
            dutchNTDetails {
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
            }
            speakingLevel
            educationDetails {
                lastFollowedEducation
                didGraduate
                followingEducationRightNow
                followingEducationRightNowYesStartDate
                followingEducationRightNowYesEndDate
                followingEducationRightNowYesLevel
                followingEducationRightNowYesInstitute
                followingEducationRightNowYesProvidesCertificate
                followingEducationRightNowNoEndDate
                followingEducationRightNowNoLevel
                followingEducationRightNowNoGotCertificate
            }
            courseDetails {
                isFollowingCourseRightNow
                courseName
                courseTeacher
                courseGroup
                amountOfHours
                doesCourseProvideCertificate
            }
            jobDetails {
                trainedForJob
                lastJob
                dayTimeActivities
                dayTimeActivitiesOther
            }
            motivationDetails {
                desiredSkills
                desiredSkillsOther
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseSkills
                whyWantThisNow
                desiredLearningMethod
                remarks
            }
            availabilityDetails {
                availability {
                    monday {
                        morning
                        afternoon
                        evening
                    }
                    tuesday {
                        morning
                        afternoon
                        evening
                    }
                    wednesday {
                        morning
                        afternoon
                        evening
                    }
                    thursday {
                        morning
                        afternoon
                        evening
                    }
                    friday {
                        morning
                        afternoon
                        evening
                    }
                    saturday {
                        morning
                        afternoon
                        evening
                    }
                    sunday {
                        morning
                        afternoon
                        evening
                    }
                }
                availabilityNotes
            }
            readingTestResult
            writingTestResult
            permissionDetails {
                didSignPermissionForm
                hasPermissionToShareDataWithProviders
                hasPermissionToShareDataWithLibraries
                hasPermissionToSendInformationAboutLibraries
            }
        }
    }
`

/**
 * __useUpdateStudentMutation__
 *
 * To run a mutation, you first call `useUpdateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentMutation, { data, loading, error }] = useUpdateStudentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStudentMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateStudentMutation, UpdateStudentMutationVariables>
) {
    return Apollo.useMutation<UpdateStudentMutation, UpdateStudentMutationVariables>(UpdateStudentDocument, baseOptions)
}
export type UpdateStudentMutationHookResult = ReturnType<typeof useUpdateStudentMutation>
export type UpdateStudentMutationResult = Apollo.MutationResult<UpdateStudentMutation>
export type UpdateStudentMutationOptions = Apollo.BaseMutationOptions<
    UpdateStudentMutation,
    UpdateStudentMutationVariables
>
export const BiscEmployeeDocument = gql`
    query biscEmployee($biscEmployeeId: String!) {
        biscEmployee(biscEmployeeId: $biscEmployeeId) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
        }
    }
`

/**
 * __useBiscEmployeeQuery__
 *
 * To run a query within a React component, call `useBiscEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useBiscEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBiscEmployeeQuery({
 *   variables: {
 *      biscEmployeeId: // value for 'biscEmployeeId'
 *   },
 * });
 */
export function useBiscEmployeeQuery(
    baseOptions: Apollo.QueryHookOptions<BiscEmployeeQuery, BiscEmployeeQueryVariables>
) {
    return Apollo.useQuery<BiscEmployeeQuery, BiscEmployeeQueryVariables>(BiscEmployeeDocument, baseOptions)
}
export function useBiscEmployeeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BiscEmployeeQuery, BiscEmployeeQueryVariables>
) {
    return Apollo.useLazyQuery<BiscEmployeeQuery, BiscEmployeeQueryVariables>(BiscEmployeeDocument, baseOptions)
}
export type BiscEmployeeQueryHookResult = ReturnType<typeof useBiscEmployeeQuery>
export type BiscEmployeeLazyQueryHookResult = ReturnType<typeof useBiscEmployeeLazyQuery>
export type BiscEmployeeQueryResult = Apollo.QueryResult<BiscEmployeeQuery, BiscEmployeeQueryVariables>
export const BiscEmployeesDocument = gql`
    query biscEmployees {
        biscEmployees {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
        }
    }
`

/**
 * __useBiscEmployeesQuery__
 *
 * To run a query within a React component, call `useBiscEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBiscEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBiscEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBiscEmployeesQuery(
    baseOptions?: Apollo.QueryHookOptions<BiscEmployeesQuery, BiscEmployeesQueryVariables>
) {
    return Apollo.useQuery<BiscEmployeesQuery, BiscEmployeesQueryVariables>(BiscEmployeesDocument, baseOptions)
}
export function useBiscEmployeesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BiscEmployeesQuery, BiscEmployeesQueryVariables>
) {
    return Apollo.useLazyQuery<BiscEmployeesQuery, BiscEmployeesQueryVariables>(BiscEmployeesDocument, baseOptions)
}
export type BiscEmployeesQueryHookResult = ReturnType<typeof useBiscEmployeesQuery>
export type BiscEmployeesLazyQueryHookResult = ReturnType<typeof useBiscEmployeesLazyQuery>
export type BiscEmployeesQueryResult = Apollo.QueryResult<BiscEmployeesQuery, BiscEmployeesQueryVariables>
export const CurrentUserDocument = gql`
    query currentUser {
        currentUser {
            id
            username
            givenName
            additionalName
            familyName
            userEnvironment
            organizationId
            organizationName
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
    baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
    return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions)
}
export function useCurrentUserLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
    return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions)
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>
export const LanguageHouseDocument = gql`
    query languageHouse($languageHouseId: String!) {
        languageHouse(languageHouseId: $languageHouseId) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useLanguageHouseQuery__
 *
 * To run a query within a React component, call `useLanguageHouseQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguageHouseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguageHouseQuery({
 *   variables: {
 *      languageHouseId: // value for 'languageHouseId'
 *   },
 * });
 */
export function useLanguageHouseQuery(
    baseOptions: Apollo.QueryHookOptions<LanguageHouseQuery, LanguageHouseQueryVariables>
) {
    return Apollo.useQuery<LanguageHouseQuery, LanguageHouseQueryVariables>(LanguageHouseDocument, baseOptions)
}
export function useLanguageHouseLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<LanguageHouseQuery, LanguageHouseQueryVariables>
) {
    return Apollo.useLazyQuery<LanguageHouseQuery, LanguageHouseQueryVariables>(LanguageHouseDocument, baseOptions)
}
export type LanguageHouseQueryHookResult = ReturnType<typeof useLanguageHouseQuery>
export type LanguageHouseLazyQueryHookResult = ReturnType<typeof useLanguageHouseLazyQuery>
export type LanguageHouseQueryResult = Apollo.QueryResult<LanguageHouseQuery, LanguageHouseQueryVariables>
export const LanguageHouseEmployeeDocument = gql`
    query languageHouseEmployee($userId: String!) {
        languageHouseEmployee(userId: $userId) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useLanguageHouseEmployeeQuery__
 *
 * To run a query within a React component, call `useLanguageHouseEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguageHouseEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguageHouseEmployeeQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLanguageHouseEmployeeQuery(
    baseOptions: Apollo.QueryHookOptions<LanguageHouseEmployeeQuery, LanguageHouseEmployeeQueryVariables>
) {
    return Apollo.useQuery<LanguageHouseEmployeeQuery, LanguageHouseEmployeeQueryVariables>(
        LanguageHouseEmployeeDocument,
        baseOptions
    )
}
export function useLanguageHouseEmployeeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<LanguageHouseEmployeeQuery, LanguageHouseEmployeeQueryVariables>
) {
    return Apollo.useLazyQuery<LanguageHouseEmployeeQuery, LanguageHouseEmployeeQueryVariables>(
        LanguageHouseEmployeeDocument,
        baseOptions
    )
}
export type LanguageHouseEmployeeQueryHookResult = ReturnType<typeof useLanguageHouseEmployeeQuery>
export type LanguageHouseEmployeeLazyQueryHookResult = ReturnType<typeof useLanguageHouseEmployeeLazyQuery>
export type LanguageHouseEmployeeQueryResult = Apollo.QueryResult<
    LanguageHouseEmployeeQuery,
    LanguageHouseEmployeeQueryVariables
>
export const LanguageHouseEmployeesDocument = gql`
    query languageHouseEmployees($languageHouseId: String!) {
        languageHouseEmployees(languageHouseId: $languageHouseId) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useLanguageHouseEmployeesQuery__
 *
 * To run a query within a React component, call `useLanguageHouseEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguageHouseEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguageHouseEmployeesQuery({
 *   variables: {
 *      languageHouseId: // value for 'languageHouseId'
 *   },
 * });
 */
export function useLanguageHouseEmployeesQuery(
    baseOptions: Apollo.QueryHookOptions<LanguageHouseEmployeesQuery, LanguageHouseEmployeesQueryVariables>
) {
    return Apollo.useQuery<LanguageHouseEmployeesQuery, LanguageHouseEmployeesQueryVariables>(
        LanguageHouseEmployeesDocument,
        baseOptions
    )
}
export function useLanguageHouseEmployeesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<LanguageHouseEmployeesQuery, LanguageHouseEmployeesQueryVariables>
) {
    return Apollo.useLazyQuery<LanguageHouseEmployeesQuery, LanguageHouseEmployeesQueryVariables>(
        LanguageHouseEmployeesDocument,
        baseOptions
    )
}
export type LanguageHouseEmployeesQueryHookResult = ReturnType<typeof useLanguageHouseEmployeesQuery>
export type LanguageHouseEmployeesLazyQueryHookResult = ReturnType<typeof useLanguageHouseEmployeesLazyQuery>
export type LanguageHouseEmployeesQueryResult = Apollo.QueryResult<
    LanguageHouseEmployeesQuery,
    LanguageHouseEmployeesQueryVariables
>
export const LanguageHousesDocument = gql`
    query languageHouses {
        languageHouses {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useLanguageHousesQuery__
 *
 * To run a query within a React component, call `useLanguageHousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguageHousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguageHousesQuery({
 *   variables: {
 *   },
 * });
 */
export function useLanguageHousesQuery(
    baseOptions?: Apollo.QueryHookOptions<LanguageHousesQuery, LanguageHousesQueryVariables>
) {
    return Apollo.useQuery<LanguageHousesQuery, LanguageHousesQueryVariables>(LanguageHousesDocument, baseOptions)
}
export function useLanguageHousesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<LanguageHousesQuery, LanguageHousesQueryVariables>
) {
    return Apollo.useLazyQuery<LanguageHousesQuery, LanguageHousesQueryVariables>(LanguageHousesDocument, baseOptions)
}
export type LanguageHousesQueryHookResult = ReturnType<typeof useLanguageHousesQuery>
export type LanguageHousesLazyQueryHookResult = ReturnType<typeof useLanguageHousesLazyQuery>
export type LanguageHousesQueryResult = Apollo.QueryResult<LanguageHousesQuery, LanguageHousesQueryVariables>
export const LearningNeedsDocument = gql`
    query learningNeeds($studentId: String!) {
        learningNeeds(studentId: $studentId) {
            id
            learningNeedDescription
            learningNeedMotivation
            desiredOutComesGoal
            desiredOutComesTopic
            desiredOutComesTopicOther
            desiredOutComesApplication
            desiredOutComesApplicationOther
            desiredOutComesLevel
            desiredOutComesLevel
            offerDesiredOffer
            offerAdvisedOffer
            offerDifference
            offerDifferenceOther
            offerEngagements
            participations {
                id
                status
                providerId
                providerName
                providerNote
                offerName
                offerCourse
                offerCourse
                outComesTopic
                outComesTopicOther
                outComesApplication
                outComesApplicationOther
                outComesLevel
                outComesLevelOther
                detailsIsFormal
                detailsGroupFormation
                detailsTotalClassHours
                detailsCertificateWillBeAwarded
                detailsStartDate
                detailsEndDate
                detailsEngagements
            }
        }
    }
`

/**
 * __useLearningNeedsQuery__
 *
 * To run a query within a React component, call `useLearningNeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLearningNeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLearningNeedsQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useLearningNeedsQuery(
    baseOptions: Apollo.QueryHookOptions<LearningNeedsQuery, LearningNeedsQueryVariables>
) {
    return Apollo.useQuery<LearningNeedsQuery, LearningNeedsQueryVariables>(LearningNeedsDocument, baseOptions)
}
export function useLearningNeedsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<LearningNeedsQuery, LearningNeedsQueryVariables>
) {
    return Apollo.useLazyQuery<LearningNeedsQuery, LearningNeedsQueryVariables>(LearningNeedsDocument, baseOptions)
}
export type LearningNeedsQueryHookResult = ReturnType<typeof useLearningNeedsQuery>
export type LearningNeedsLazyQueryHookResult = ReturnType<typeof useLearningNeedsLazyQuery>
export type LearningNeedsQueryResult = Apollo.QueryResult<LearningNeedsQuery, LearningNeedsQueryVariables>
export const ProviderDocument = gql`
    query provider($id: String!) {
        provider(id: $id) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useProviderQuery__
 *
 * To run a query within a React component, call `useProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProviderQuery(baseOptions: Apollo.QueryHookOptions<ProviderQuery, ProviderQueryVariables>) {
    return Apollo.useQuery<ProviderQuery, ProviderQueryVariables>(ProviderDocument, baseOptions)
}
export function useProviderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProviderQuery, ProviderQueryVariables>) {
    return Apollo.useLazyQuery<ProviderQuery, ProviderQueryVariables>(ProviderDocument, baseOptions)
}
export type ProviderQueryHookResult = ReturnType<typeof useProviderQuery>
export type ProviderLazyQueryHookResult = ReturnType<typeof useProviderLazyQuery>
export type ProviderQueryResult = Apollo.QueryResult<ProviderQuery, ProviderQueryVariables>
export const ProviderEmployeeDocument = gql`
    query providerEmployee($userId: String!) {
        providerEmployee(userId: $userId) {
            userId
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
            givenName
            additionalName
            familyName
            telephone
            availability {
                monday {
                    morning
                    afternoon
                    evening
                }
                tuesday {
                    morning
                    afternoon
                    evening
                }
                wednesday {
                    morning
                    afternoon
                    evening
                }
                thursday {
                    morning
                    afternoon
                    evening
                }
                friday {
                    morning
                    afternoon
                    evening
                }
                saturday {
                    morning
                    afternoon
                    evening
                }
                sunday {
                    morning
                    afternoon
                    evening
                }
            }
            availabilityNotes
            email
            gender
            dateOfBirth
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            contactTelephone
            contactPreference
            contactPreferenceOther
            targetGroupPreference
            volunteringPreference
            gotHereVia
            hasExperienceWithTargetGroup
            experienceWithTargetGroupYesReason
            currentEducation
            currentEducationYes {
                dateSince
                name
                doesProvideCertificate
            }
            currentEdicationNoButDidFollow {
                dateUntil
                level
                gotCertificate
            }
            doesCurrentlyFollowCourse
            currentlyFollowingCourseName
            currentlyFollowingCourseInstitute
            currentlyFollowingCourseTeacherProfessionalism
            currentlyFollowingCourseCourseProfessionalism
            doesCurrentlyFollowingCourseProvideCertificate
            otherRelevantCertificates
            isVOGChecked
        }
    }
`

/**
 * __useProviderEmployeeQuery__
 *
 * To run a query within a React component, call `useProviderEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderEmployeeQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProviderEmployeeQuery(
    baseOptions: Apollo.QueryHookOptions<ProviderEmployeeQuery, ProviderEmployeeQueryVariables>
) {
    return Apollo.useQuery<ProviderEmployeeQuery, ProviderEmployeeQueryVariables>(ProviderEmployeeDocument, baseOptions)
}
export function useProviderEmployeeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ProviderEmployeeQuery, ProviderEmployeeQueryVariables>
) {
    return Apollo.useLazyQuery<ProviderEmployeeQuery, ProviderEmployeeQueryVariables>(
        ProviderEmployeeDocument,
        baseOptions
    )
}
export type ProviderEmployeeQueryHookResult = ReturnType<typeof useProviderEmployeeQuery>
export type ProviderEmployeeLazyQueryHookResult = ReturnType<typeof useProviderEmployeeLazyQuery>
export type ProviderEmployeeQueryResult = Apollo.QueryResult<ProviderEmployeeQuery, ProviderEmployeeQueryVariables>
export const ProviderEmployeeDocumentsDocument = gql`
    query providerEmployeeDocuments($providerEmployeeId: String!) {
        providerEmployeeDocuments(providerEmployeeId: $providerEmployeeId) {
            id
            filename
            dateCreated
        }
    }
`

/**
 * __useProviderEmployeeDocumentsQuery__
 *
 * To run a query within a React component, call `useProviderEmployeeDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderEmployeeDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderEmployeeDocumentsQuery({
 *   variables: {
 *      providerEmployeeId: // value for 'providerEmployeeId'
 *   },
 * });
 */
export function useProviderEmployeeDocumentsQuery(
    baseOptions: Apollo.QueryHookOptions<ProviderEmployeeDocumentsQuery, ProviderEmployeeDocumentsQueryVariables>
) {
    return Apollo.useQuery<ProviderEmployeeDocumentsQuery, ProviderEmployeeDocumentsQueryVariables>(
        ProviderEmployeeDocumentsDocument,
        baseOptions
    )
}
export function useProviderEmployeeDocumentsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ProviderEmployeeDocumentsQuery, ProviderEmployeeDocumentsQueryVariables>
) {
    return Apollo.useLazyQuery<ProviderEmployeeDocumentsQuery, ProviderEmployeeDocumentsQueryVariables>(
        ProviderEmployeeDocumentsDocument,
        baseOptions
    )
}
export type ProviderEmployeeDocumentsQueryHookResult = ReturnType<typeof useProviderEmployeeDocumentsQuery>
export type ProviderEmployeeDocumentsLazyQueryHookResult = ReturnType<typeof useProviderEmployeeDocumentsLazyQuery>
export type ProviderEmployeeDocumentsQueryResult = Apollo.QueryResult<
    ProviderEmployeeDocumentsQuery,
    ProviderEmployeeDocumentsQueryVariables
>
export const ProviderEmployeeMenteesDocument = gql`
    query providerEmployeeMentees($providerEmployeeId: String!) {
        providerEmployeeMentees(providerEmployeeId: $providerEmployeeId) {
            id
            dateCreated
            status
            memo
            registrar {
                id
                organisationName
                givenName
                additionalName
                familyName
                email
                telephone
            }
            civicIntegrationDetails {
                civicIntegrationRequirement
                civicIntegrationRequirementReason
                civicIntegrationRequirementFinishDate
            }
            personDetails {
                givenName
                additionalName
                familyName
                gender
                dateOfBirth
            }
            contactDetails {
                street
                postalCode
                locality
                houseNumber
                houseNumberSuffix
                email
                telephone
                contactPersonTelephone
                contactPreference
                contactPreferenceOther
            }
            generalDetails {
                countryOfOrigin
                nativeLanguage
                otherLanguages
                familyComposition
                childrenCount
                childrenDatesOfBirth
            }
            referrerDetails {
                referringOrganization
                referringOrganizationOther
                email
            }
            backgroundDetails {
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
            }
            dutchNTDetails {
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
            }
            speakingLevel
            educationDetails {
                lastFollowedEducation
                didGraduate
                followingEducationRightNow
                followingEducationRightNowYesStartDate
                followingEducationRightNowYesEndDate
                followingEducationRightNowYesLevel
                followingEducationRightNowYesInstitute
                followingEducationRightNowYesProvidesCertificate
                followingEducationRightNowNoEndDate
                followingEducationRightNowNoLevel
                followingEducationRightNowNoGotCertificate
            }
            courseDetails {
                isFollowingCourseRightNow
                courseName
                courseTeacher
                courseGroup
                amountOfHours
                doesCourseProvideCertificate
            }
            jobDetails {
                trainedForJob
                lastJob
                dayTimeActivities
                dayTimeActivitiesOther
            }
            motivationDetails {
                desiredSkills
                desiredSkillsOther
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseSkills
                whyWantThisNow
                desiredLearningMethod
                remarks
            }
            availabilityDetails {
                availability {
                    monday {
                        morning
                        afternoon
                        evening
                    }
                    tuesday {
                        morning
                        afternoon
                        evening
                    }
                    wednesday {
                        morning
                        afternoon
                        evening
                    }
                    thursday {
                        morning
                        afternoon
                        evening
                    }
                    friday {
                        morning
                        afternoon
                        evening
                    }
                    saturday {
                        morning
                        afternoon
                        evening
                    }
                    sunday {
                        morning
                        afternoon
                        evening
                    }
                }
                availabilityNotes
            }
            readingTestResult
            writingTestResult
            permissionDetails {
                didSignPermissionForm
                hasPermissionToShareDataWithProviders
                hasPermissionToShareDataWithLibraries
                hasPermissionToSendInformationAboutLibraries
            }
        }
    }
`

/**
 * __useProviderEmployeeMenteesQuery__
 *
 * To run a query within a React component, call `useProviderEmployeeMenteesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderEmployeeMenteesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderEmployeeMenteesQuery({
 *   variables: {
 *      providerEmployeeId: // value for 'providerEmployeeId'
 *   },
 * });
 */
export function useProviderEmployeeMenteesQuery(
    baseOptions: Apollo.QueryHookOptions<ProviderEmployeeMenteesQuery, ProviderEmployeeMenteesQueryVariables>
) {
    return Apollo.useQuery<ProviderEmployeeMenteesQuery, ProviderEmployeeMenteesQueryVariables>(
        ProviderEmployeeMenteesDocument,
        baseOptions
    )
}
export function useProviderEmployeeMenteesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ProviderEmployeeMenteesQuery, ProviderEmployeeMenteesQueryVariables>
) {
    return Apollo.useLazyQuery<ProviderEmployeeMenteesQuery, ProviderEmployeeMenteesQueryVariables>(
        ProviderEmployeeMenteesDocument,
        baseOptions
    )
}
export type ProviderEmployeeMenteesQueryHookResult = ReturnType<typeof useProviderEmployeeMenteesQuery>
export type ProviderEmployeeMenteesLazyQueryHookResult = ReturnType<typeof useProviderEmployeeMenteesLazyQuery>
export type ProviderEmployeeMenteesQueryResult = Apollo.QueryResult<
    ProviderEmployeeMenteesQuery,
    ProviderEmployeeMenteesQueryVariables
>
export const ProviderEmployeesDocument = gql`
    query providerEmployees($providerId: String!) {
        providerEmployees(providerId: $providerId) {
            userId
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
            givenName
            additionalName
            familyName
            telephone
            availability {
                monday {
                    morning
                    afternoon
                    evening
                }
                tuesday {
                    morning
                    afternoon
                    evening
                }
                wednesday {
                    morning
                    afternoon
                    evening
                }
                thursday {
                    morning
                    afternoon
                    evening
                }
                friday {
                    morning
                    afternoon
                    evening
                }
                saturday {
                    morning
                    afternoon
                    evening
                }
                sunday {
                    morning
                    afternoon
                    evening
                }
            }
            availabilityNotes
            email
            gender
            dateOfBirth
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            contactTelephone
            contactPreference
            contactPreferenceOther
            targetGroupPreference
            volunteringPreference
            gotHereVia
            hasExperienceWithTargetGroup
            experienceWithTargetGroupYesReason
            currentEducation
            currentEducationYes {
                dateSince
                name
                doesProvideCertificate
            }
            currentEdicationNoButDidFollow {
                dateUntil
                level
                gotCertificate
            }
            doesCurrentlyFollowCourse
            currentlyFollowingCourseName
            currentlyFollowingCourseInstitute
            currentlyFollowingCourseTeacherProfessionalism
            currentlyFollowingCourseCourseProfessionalism
            doesCurrentlyFollowingCourseProvideCertificate
            otherRelevantCertificates
            isVOGChecked
        }
    }
`

/**
 * __useProviderEmployeesQuery__
 *
 * To run a query within a React component, call `useProviderEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderEmployeesQuery({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useProviderEmployeesQuery(
    baseOptions: Apollo.QueryHookOptions<ProviderEmployeesQuery, ProviderEmployeesQueryVariables>
) {
    return Apollo.useQuery<ProviderEmployeesQuery, ProviderEmployeesQueryVariables>(
        ProviderEmployeesDocument,
        baseOptions
    )
}
export function useProviderEmployeesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ProviderEmployeesQuery, ProviderEmployeesQueryVariables>
) {
    return Apollo.useLazyQuery<ProviderEmployeesQuery, ProviderEmployeesQueryVariables>(
        ProviderEmployeesDocument,
        baseOptions
    )
}
export type ProviderEmployeesQueryHookResult = ReturnType<typeof useProviderEmployeesQuery>
export type ProviderEmployeesLazyQueryHookResult = ReturnType<typeof useProviderEmployeesLazyQuery>
export type ProviderEmployeesQueryResult = Apollo.QueryResult<ProviderEmployeesQuery, ProviderEmployeesQueryVariables>
export const ProvidersDocument = gql`
    query providers {
        providers {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useProvidersQuery__
 *
 * To run a query within a React component, call `useProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProvidersQuery({
 *   variables: {
 *   },
 * });
 */
export function useProvidersQuery(baseOptions?: Apollo.QueryHookOptions<ProvidersQuery, ProvidersQueryVariables>) {
    return Apollo.useQuery<ProvidersQuery, ProvidersQueryVariables>(ProvidersDocument, baseOptions)
}
export function useProvidersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ProvidersQuery, ProvidersQueryVariables>
) {
    return Apollo.useLazyQuery<ProvidersQuery, ProvidersQueryVariables>(ProvidersDocument, baseOptions)
}
export type ProvidersQueryHookResult = ReturnType<typeof useProvidersQuery>
export type ProvidersLazyQueryHookResult = ReturnType<typeof useProvidersLazyQuery>
export type ProvidersQueryResult = Apollo.QueryResult<ProvidersQuery, ProvidersQueryVariables>
export const RegistrationDocument = gql`
    query registration($studentId: String!) {
        registration(studentId: $studentId) {
            id
            dateCreated
            status
            memo
            registrar {
                id
                organisationName
                givenName
                additionalName
                familyName
                email
                telephone
            }
            civicIntegrationDetails {
                civicIntegrationRequirement
                civicIntegrationRequirementReason
                civicIntegrationRequirementFinishDate
            }
            personDetails {
                givenName
                additionalName
                familyName
                gender
                dateOfBirth
            }
            contactDetails {
                street
                postalCode
                locality
                houseNumber
                houseNumberSuffix
                email
                telephone
                contactPersonTelephone
                contactPreference
                contactPreferenceOther
            }
            generalDetails {
                countryOfOrigin
                nativeLanguage
                otherLanguages
                familyComposition
                childrenCount
                childrenDatesOfBirth
            }
            referrerDetails {
                referringOrganization
                referringOrganizationOther
                email
            }
            backgroundDetails {
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
            }
            dutchNTDetails {
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
            }
            speakingLevel
            educationDetails {
                lastFollowedEducation
                didGraduate
                followingEducationRightNow
                followingEducationRightNowYesStartDate
                followingEducationRightNowYesEndDate
                followingEducationRightNowYesLevel
                followingEducationRightNowYesInstitute
                followingEducationRightNowYesProvidesCertificate
                followingEducationRightNowNoEndDate
                followingEducationRightNowNoLevel
                followingEducationRightNowNoGotCertificate
            }
            courseDetails {
                isFollowingCourseRightNow
                courseName
                courseTeacher
                courseGroup
                amountOfHours
                doesCourseProvideCertificate
            }
            jobDetails {
                trainedForJob
                lastJob
                dayTimeActivities
                dayTimeActivitiesOther
            }
            motivationDetails {
                desiredSkills
                desiredSkillsOther
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseSkills
                whyWantThisNow
                desiredLearningMethod
                remarks
            }
            availabilityDetails {
                availability {
                    monday {
                        morning
                        afternoon
                        evening
                    }
                    tuesday {
                        morning
                        afternoon
                        evening
                    }
                    wednesday {
                        morning
                        afternoon
                        evening
                    }
                    thursday {
                        morning
                        afternoon
                        evening
                    }
                    friday {
                        morning
                        afternoon
                        evening
                    }
                    saturday {
                        morning
                        afternoon
                        evening
                    }
                    sunday {
                        morning
                        afternoon
                        evening
                    }
                }
                availabilityNotes
            }
            readingTestResult
            writingTestResult
            permissionDetails {
                didSignPermissionForm
                hasPermissionToShareDataWithProviders
                hasPermissionToShareDataWithLibraries
                hasPermissionToSendInformationAboutLibraries
            }
        }
    }
`

/**
 * __useRegistrationQuery__
 *
 * To run a query within a React component, call `useRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegistrationQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useRegistrationQuery(
    baseOptions: Apollo.QueryHookOptions<RegistrationQuery, RegistrationQueryVariables>
) {
    return Apollo.useQuery<RegistrationQuery, RegistrationQueryVariables>(RegistrationDocument, baseOptions)
}
export function useRegistrationLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<RegistrationQuery, RegistrationQueryVariables>
) {
    return Apollo.useLazyQuery<RegistrationQuery, RegistrationQueryVariables>(RegistrationDocument, baseOptions)
}
export type RegistrationQueryHookResult = ReturnType<typeof useRegistrationQuery>
export type RegistrationLazyQueryHookResult = ReturnType<typeof useRegistrationLazyQuery>
export type RegistrationQueryResult = Apollo.QueryResult<RegistrationQuery, RegistrationQueryVariables>
export const RegistrationsDocument = gql`
    query registrations($languageHouseId: String!) {
        registrations(languageHouseId: $languageHouseId) {
            id
            dateCreated
            status
            memo
            registrar {
                id
                organisationName
                givenName
                additionalName
                familyName
                email
                telephone
            }
            civicIntegrationDetails {
                civicIntegrationRequirement
                civicIntegrationRequirementReason
                civicIntegrationRequirementFinishDate
            }
            personDetails {
                givenName
                additionalName
                familyName
                gender
                dateOfBirth
            }
            contactDetails {
                street
                postalCode
                locality
                houseNumber
                houseNumberSuffix
                email
                telephone
                contactPersonTelephone
                contactPreference
                contactPreferenceOther
            }
            generalDetails {
                countryOfOrigin
                nativeLanguage
                otherLanguages
                familyComposition
                childrenCount
                childrenDatesOfBirth
            }
            referrerDetails {
                referringOrganization
                referringOrganizationOther
                email
            }
            backgroundDetails {
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
            }
            dutchNTDetails {
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
            }
            speakingLevel
            educationDetails {
                lastFollowedEducation
                didGraduate
                followingEducationRightNow
                followingEducationRightNowYesStartDate
                followingEducationRightNowYesEndDate
                followingEducationRightNowYesLevel
                followingEducationRightNowYesInstitute
                followingEducationRightNowYesProvidesCertificate
                followingEducationRightNowNoEndDate
                followingEducationRightNowNoLevel
                followingEducationRightNowNoGotCertificate
            }
            courseDetails {
                isFollowingCourseRightNow
                courseName
                courseTeacher
                courseGroup
                amountOfHours
                doesCourseProvideCertificate
            }
            jobDetails {
                trainedForJob
                lastJob
                dayTimeActivities
                dayTimeActivitiesOther
            }
            motivationDetails {
                desiredSkills
                desiredSkillsOther
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseSkills
                whyWantThisNow
                desiredLearningMethod
                remarks
            }
            availabilityDetails {
                availability {
                    monday {
                        morning
                        afternoon
                        evening
                    }
                    tuesday {
                        morning
                        afternoon
                        evening
                    }
                    wednesday {
                        morning
                        afternoon
                        evening
                    }
                    thursday {
                        morning
                        afternoon
                        evening
                    }
                    friday {
                        morning
                        afternoon
                        evening
                    }
                    saturday {
                        morning
                        afternoon
                        evening
                    }
                    sunday {
                        morning
                        afternoon
                        evening
                    }
                }
                availabilityNotes
            }
            readingTestResult
            writingTestResult
            permissionDetails {
                didSignPermissionForm
                hasPermissionToShareDataWithProviders
                hasPermissionToShareDataWithLibraries
                hasPermissionToSendInformationAboutLibraries
            }
        }
    }
`

/**
 * __useRegistrationsQuery__
 *
 * To run a query within a React component, call `useRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegistrationsQuery({
 *   variables: {
 *      languageHouseId: // value for 'languageHouseId'
 *   },
 * });
 */
export function useRegistrationsQuery(
    baseOptions: Apollo.QueryHookOptions<RegistrationsQuery, RegistrationsQueryVariables>
) {
    return Apollo.useQuery<RegistrationsQuery, RegistrationsQueryVariables>(RegistrationsDocument, baseOptions)
}
export function useRegistrationsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<RegistrationsQuery, RegistrationsQueryVariables>
) {
    return Apollo.useLazyQuery<RegistrationsQuery, RegistrationsQueryVariables>(RegistrationsDocument, baseOptions)
}
export type RegistrationsQueryHookResult = ReturnType<typeof useRegistrationsQuery>
export type RegistrationsLazyQueryHookResult = ReturnType<typeof useRegistrationsLazyQuery>
export type RegistrationsQueryResult = Apollo.QueryResult<RegistrationsQuery, RegistrationsQueryVariables>
export const StudentDocument = gql`
    query student($studentId: String!) {
        student(studentId: $studentId) {
            id
            dateCreated
            status
            memo
            registrar {
                id
                organisationName
                givenName
                additionalName
                familyName
                email
                telephone
            }
            civicIntegrationDetails {
                civicIntegrationRequirement
                civicIntegrationRequirementReason
                civicIntegrationRequirementFinishDate
            }
            personDetails {
                givenName
                additionalName
                familyName
                gender
                dateOfBirth
            }
            contactDetails {
                street
                postalCode
                locality
                houseNumber
                houseNumberSuffix
                email
                telephone
                contactPersonTelephone
                contactPreference
                contactPreferenceOther
            }
            generalDetails {
                countryOfOrigin
                nativeLanguage
                otherLanguages
                familyComposition
                childrenCount
                childrenDatesOfBirth
            }
            referrerDetails {
                referringOrganization
                referringOrganizationOther
                email
            }
            backgroundDetails {
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
            }
            dutchNTDetails {
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
            }
            speakingLevel
            educationDetails {
                lastFollowedEducation
                didGraduate
                followingEducationRightNow
                followingEducationRightNowYesStartDate
                followingEducationRightNowYesEndDate
                followingEducationRightNowYesLevel
                followingEducationRightNowYesInstitute
                followingEducationRightNowYesProvidesCertificate
                followingEducationRightNowNoEndDate
                followingEducationRightNowNoLevel
                followingEducationRightNowNoGotCertificate
            }
            courseDetails {
                isFollowingCourseRightNow
                courseName
                courseTeacher
                courseGroup
                amountOfHours
                doesCourseProvideCertificate
            }
            jobDetails {
                trainedForJob
                lastJob
                dayTimeActivities
                dayTimeActivitiesOther
            }
            motivationDetails {
                desiredSkills
                desiredSkillsOther
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseSkills
                whyWantThisNow
                desiredLearningMethod
                remarks
            }
            availabilityDetails {
                availability {
                    monday {
                        morning
                        afternoon
                        evening
                    }
                    tuesday {
                        morning
                        afternoon
                        evening
                    }
                    wednesday {
                        morning
                        afternoon
                        evening
                    }
                    thursday {
                        morning
                        afternoon
                        evening
                    }
                    friday {
                        morning
                        afternoon
                        evening
                    }
                    saturday {
                        morning
                        afternoon
                        evening
                    }
                    sunday {
                        morning
                        afternoon
                        evening
                    }
                }
                availabilityNotes
            }
            readingTestResult
            writingTestResult
            permissionDetails {
                didSignPermissionForm
                hasPermissionToShareDataWithProviders
                hasPermissionToShareDataWithLibraries
                hasPermissionToSendInformationAboutLibraries
            }
        }
    }
`

/**
 * __useStudentQuery__
 *
 * To run a query within a React component, call `useStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentQuery(baseOptions: Apollo.QueryHookOptions<StudentQuery, StudentQueryVariables>) {
    return Apollo.useQuery<StudentQuery, StudentQueryVariables>(StudentDocument, baseOptions)
}
export function useStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentQuery, StudentQueryVariables>) {
    return Apollo.useLazyQuery<StudentQuery, StudentQueryVariables>(StudentDocument, baseOptions)
}
export type StudentQueryHookResult = ReturnType<typeof useStudentQuery>
export type StudentLazyQueryHookResult = ReturnType<typeof useStudentLazyQuery>
export type StudentQueryResult = Apollo.QueryResult<StudentQuery, StudentQueryVariables>
export const StudentDocumentsDocument = gql`
    query studentDocuments($studentId: String!) {
        studentDocuments(studentId: $studentId) {
            id
            filename
            dateCreated
        }
    }
`

/**
 * __useStudentDocumentsQuery__
 *
 * To run a query within a React component, call `useStudentDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentDocumentsQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentDocumentsQuery(
    baseOptions: Apollo.QueryHookOptions<StudentDocumentsQuery, StudentDocumentsQueryVariables>
) {
    return Apollo.useQuery<StudentDocumentsQuery, StudentDocumentsQueryVariables>(StudentDocumentsDocument, baseOptions)
}
export function useStudentDocumentsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<StudentDocumentsQuery, StudentDocumentsQueryVariables>
) {
    return Apollo.useLazyQuery<StudentDocumentsQuery, StudentDocumentsQueryVariables>(
        StudentDocumentsDocument,
        baseOptions
    )
}
export type StudentDocumentsQueryHookResult = ReturnType<typeof useStudentDocumentsQuery>
export type StudentDocumentsLazyQueryHookResult = ReturnType<typeof useStudentDocumentsLazyQuery>
export type StudentDocumentsQueryResult = Apollo.QueryResult<StudentDocumentsQuery, StudentDocumentsQueryVariables>
export const StudentsDocument = gql`
    query students($languageHouseId: String!) {
        students(languageHouseId: $languageHouseId) {
            id
            dateCreated
            status
            memo
            registrar {
                id
                organisationName
                givenName
                additionalName
                familyName
                email
                telephone
            }
            civicIntegrationDetails {
                civicIntegrationRequirement
                civicIntegrationRequirementReason
                civicIntegrationRequirementFinishDate
            }
            personDetails {
                givenName
                additionalName
                familyName
                gender
                dateOfBirth
            }
            contactDetails {
                street
                postalCode
                locality
                houseNumber
                houseNumberSuffix
                email
                telephone
                contactPersonTelephone
                contactPreference
                contactPreferenceOther
            }
            generalDetails {
                countryOfOrigin
                nativeLanguage
                otherLanguages
                familyComposition
                childrenCount
                childrenDatesOfBirth
            }
            referrerDetails {
                referringOrganization
                referringOrganizationOther
                email
            }
            backgroundDetails {
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
            }
            dutchNTDetails {
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
            }
            speakingLevel
            educationDetails {
                lastFollowedEducation
                didGraduate
                followingEducationRightNow
                followingEducationRightNowYesStartDate
                followingEducationRightNowYesEndDate
                followingEducationRightNowYesLevel
                followingEducationRightNowYesInstitute
                followingEducationRightNowYesProvidesCertificate
                followingEducationRightNowNoEndDate
                followingEducationRightNowNoLevel
                followingEducationRightNowNoGotCertificate
            }
            courseDetails {
                isFollowingCourseRightNow
                courseName
                courseTeacher
                courseGroup
                amountOfHours
                doesCourseProvideCertificate
            }
            jobDetails {
                trainedForJob
                lastJob
                dayTimeActivities
                dayTimeActivitiesOther
            }
            motivationDetails {
                desiredSkills
                desiredSkillsOther
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseSkills
                whyWantThisNow
                desiredLearningMethod
                remarks
            }
            availabilityDetails {
                availability {
                    monday {
                        morning
                        afternoon
                        evening
                    }
                    tuesday {
                        morning
                        afternoon
                        evening
                    }
                    wednesday {
                        morning
                        afternoon
                        evening
                    }
                    thursday {
                        morning
                        afternoon
                        evening
                    }
                    friday {
                        morning
                        afternoon
                        evening
                    }
                    saturday {
                        morning
                        afternoon
                        evening
                    }
                    sunday {
                        morning
                        afternoon
                        evening
                    }
                }
                availabilityNotes
            }
            readingTestResult
            writingTestResult
            permissionDetails {
                didSignPermissionForm
                hasPermissionToShareDataWithProviders
                hasPermissionToShareDataWithLibraries
                hasPermissionToSendInformationAboutLibraries
            }
        }
    }
`

/**
 * __useStudentsQuery__
 *
 * To run a query within a React component, call `useStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentsQuery({
 *   variables: {
 *      languageHouseId: // value for 'languageHouseId'
 *   },
 * });
 */
export function useStudentsQuery(baseOptions: Apollo.QueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
    return Apollo.useQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, baseOptions)
}
export function useStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
    return Apollo.useLazyQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, baseOptions)
}
export type StudentsQueryHookResult = ReturnType<typeof useStudentsQuery>
export type StudentsLazyQueryHookResult = ReturnType<typeof useStudentsLazyQuery>
export type StudentsQueryResult = Apollo.QueryResult<StudentsQuery, StudentsQueryVariables>
export const UserRolesByLanguageHouseIdDocument = gql`
    query userRolesByLanguageHouseId($languageHouseId: String!) {
        userRolesByLanguageHouseId(languageHouseId: $languageHouseId) {
            id
            name
        }
    }
`

/**
 * __useUserRolesByLanguageHouseIdQuery__
 *
 * To run a query within a React component, call `useUserRolesByLanguageHouseIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesByLanguageHouseIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesByLanguageHouseIdQuery({
 *   variables: {
 *      languageHouseId: // value for 'languageHouseId'
 *   },
 * });
 */
export function useUserRolesByLanguageHouseIdQuery(
    baseOptions: Apollo.QueryHookOptions<UserRolesByLanguageHouseIdQuery, UserRolesByLanguageHouseIdQueryVariables>
) {
    return Apollo.useQuery<UserRolesByLanguageHouseIdQuery, UserRolesByLanguageHouseIdQueryVariables>(
        UserRolesByLanguageHouseIdDocument,
        baseOptions
    )
}
export function useUserRolesByLanguageHouseIdLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UserRolesByLanguageHouseIdQuery, UserRolesByLanguageHouseIdQueryVariables>
) {
    return Apollo.useLazyQuery<UserRolesByLanguageHouseIdQuery, UserRolesByLanguageHouseIdQueryVariables>(
        UserRolesByLanguageHouseIdDocument,
        baseOptions
    )
}
export type UserRolesByLanguageHouseIdQueryHookResult = ReturnType<typeof useUserRolesByLanguageHouseIdQuery>
export type UserRolesByLanguageHouseIdLazyQueryHookResult = ReturnType<typeof useUserRolesByLanguageHouseIdLazyQuery>
export type UserRolesByLanguageHouseIdQueryResult = Apollo.QueryResult<
    UserRolesByLanguageHouseIdQuery,
    UserRolesByLanguageHouseIdQueryVariables
>
export const UserRolesByProviderIdDocument = gql`
    query userRolesByProviderId($providerId: String!) {
        userRolesByProviderId(providerId: $providerId) {
            id
            name
        }
    }
`

/**
 * __useUserRolesByProviderIdQuery__
 *
 * To run a query within a React component, call `useUserRolesByProviderIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesByProviderIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesByProviderIdQuery({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useUserRolesByProviderIdQuery(
    baseOptions: Apollo.QueryHookOptions<UserRolesByProviderIdQuery, UserRolesByProviderIdQueryVariables>
) {
    return Apollo.useQuery<UserRolesByProviderIdQuery, UserRolesByProviderIdQueryVariables>(
        UserRolesByProviderIdDocument,
        baseOptions
    )
}
export function useUserRolesByProviderIdLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UserRolesByProviderIdQuery, UserRolesByProviderIdQueryVariables>
) {
    return Apollo.useLazyQuery<UserRolesByProviderIdQuery, UserRolesByProviderIdQueryVariables>(
        UserRolesByProviderIdDocument,
        baseOptions
    )
}
export type UserRolesByProviderIdQueryHookResult = ReturnType<typeof useUserRolesByProviderIdQuery>
export type UserRolesByProviderIdLazyQueryHookResult = ReturnType<typeof useUserRolesByProviderIdLazyQuery>
export type UserRolesByProviderIdQueryResult = Apollo.QueryResult<
    UserRolesByProviderIdQuery,
    UserRolesByProviderIdQueryVariables
>
