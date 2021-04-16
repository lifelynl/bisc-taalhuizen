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
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: Date
}

export type TaalhuisUserRoleType = {
    __typename?: 'TaalhuisUserRoleType'
    id: Scalars['String']
    name: UserRoleEnum
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

export type RawReturnType = {
    __typename?: 'RawReturnType'
    accessToken: Scalars['String']
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
    userRoles: Array<TaalhuisUserRoleType>
}

export enum UserEnvironmentEnum {
    Bisc = 'BISC',
    Taalhuis = 'TAALHUIS',
    Aanbieder = 'AANBIEDER',
}

export type AanbiederUserRoleType = {
    __typename?: 'AanbiederUserRoleType'
    id: Scalars['String']
    name: UserRoleEnum
}

export type AanbiederEmployeeAvailabilityDayType = {
    __typename?: 'AanbiederEmployeeAvailabilityDayType'
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type AanbiederEmployeeAvailabilityDaysType = {
    __typename?: 'AanbiederEmployeeAvailabilityDaysType'
    monday: AanbiederEmployeeAvailabilityDayType
    tuesday: AanbiederEmployeeAvailabilityDayType
    wednesday: AanbiederEmployeeAvailabilityDayType
    thursday: AanbiederEmployeeAvailabilityDayType
    friday: AanbiederEmployeeAvailabilityDayType
    saturday: AanbiederEmployeeAvailabilityDayType
    sunday: AanbiederEmployeeAvailabilityDayType
}

export type AanbiederEmployeeAddressType = {
    __typename?: 'AanbiederEmployeeAddressType'
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type AanbiederEmployeeCurrentEducationYesType = {
    __typename?: 'AanbiederEmployeeCurrentEducationYesType'
    dateSince?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    doesProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type AanbiederEmployeeCurrentEducationNoButDidFollowType = {
    __typename?: 'AanbiederEmployeeCurrentEducationNoButDidFollowType'
    dateUntil?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    gotCertificate?: Maybe<Scalars['Boolean']>
}

export type AanbiederEmployeeType = {
    __typename?: 'AanbiederEmployeeType'
    userId: Scalars['String']
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<AanbiederUserRoleType>
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    availability?: Maybe<AanbiederEmployeeAvailabilityDaysType>
    availabilityNotes?: Maybe<Scalars['String']>
    email: Scalars['String']
    gender?: Maybe<AanbiederEmployeeGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
    address?: Maybe<AanbiederEmployeeAddressType>
    contactTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<AanbiederEmployeeContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
    targetGroupPreference?: Maybe<Array<AanbiederEmployeeTargetGroupPreferenceEnum>>
    volunteringPreference?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<AanbiederEmployeeCurrentEducationEnum>
    currentEducationYes?: Maybe<AanbiederEmployeeCurrentEducationYesType>
    currentEdicationNoButDidFollow?: Maybe<AanbiederEmployeeCurrentEducationNoButDidFollowType>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    isVOGChecked?: Maybe<Scalars['Boolean']>
}

export enum AanbiederEmployeeGenderEnum {
    Male = 'MALE',
    Female = 'FEMALE',
    X = 'X',
}

export enum AanbiederEmployeeContactPreferenceEnum {
    Phonecall = 'PHONECALL',
    Whatsapp = 'WHATSAPP',
    Email = 'EMAIL',
    Other = 'OTHER',
}

export enum AanbiederEmployeeTargetGroupPreferenceEnum {
    Nt1 = 'NT1',
    Nt2 = 'NT2',
}

export enum AanbiederEmployeeCurrentEducationEnum {
    Yes = 'YES',
    No = 'NO',
    NoButDidFollow = 'NO_BUT_DID_FOLLOW',
}

export enum AanbiederEmployeeProfessionalismEnum {
    Professional = 'PROFESSIONAL',
    Volunteer = 'VOLUNTEER',
    Both = 'BOTH',
}

export type AanbiederAddressType = {
    __typename?: 'AanbiederAddressType'
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type AanbiederType = {
    __typename?: 'AanbiederType'
    id: Scalars['String']
    name: Scalars['String']
    address?: Maybe<AanbiederAddressType>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
}

export type ParticipationType = {
    __typename?: 'ParticipationType'
    id: Scalars['String']
    status: ParticipationStatusEnum
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederName?: Maybe<Scalars['String']>
    aanbiederNote?: Maybe<Scalars['String']>
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

export enum ParticipationStatusEnum {
    Active = 'ACTIVE',
    Completed = 'COMPLETED',
    Referred = 'REFERRED',
}

export enum ParticipationOfferCourseEnum {
    Language = 'LANGUAGE',
    Math = 'MATH',
    Digital = 'DIGITAL',
    Other = 'OTHER',
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

export enum ParticipationGroupFormationEnum {
    Individually = 'INDIVIDUALLY',
    InAGroup = 'IN_A_GROUP',
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

export type StudentCivicIntegrationType = {
    __typename?: 'StudentCivicIntegrationType'
    civicIntegrationRequirement?: Maybe<StudentCivicIntegrationRequirementEnum>
    civicIntegrationRequirementReason?: Maybe<StudentCivicIntegrationRequirementReasonEnum>
    civicIntegrationRequirementFinishDate?: Maybe<Scalars['String']>
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

export type StudentPersonType = {
    __typename?: 'StudentPersonType'
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    gender?: Maybe<StudentGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
}

export enum StudentGenderEnum {
    Male = 'MALE',
    Female = 'FEMALE',
    X = 'X',
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

export enum StudentContactPreferenceEnum {
    Phonecall = 'PHONECALL',
    Whatsapp = 'WHATSAPP',
    Email = 'EMAIL',
    Other = 'OTHER',
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

export enum StudentFamilyCompositionEnum {
    MarriedPartner = 'MARRIED_PARTNER',
    Single = 'SINGLE',
    Divorced = 'DIVORCED',
    Widow = 'WIDOW',
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

export type StudentBackgroundType = {
    __typename?: 'StudentBackgroundType'
    foundVia?: Maybe<StudentFoundViaEnum>
    foundViaOther?: Maybe<Scalars['String']>
    wentToTaalhuisBefore?: Maybe<Scalars['Boolean']>
    wentToTaalhuisBeforeReason?: Maybe<Scalars['String']>
    wentToTaalhuisBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Array<StudentNetworkEnum>>
    participationLadder?: Maybe<Scalars['Int']>
}

export enum StudentFoundViaEnum {
    VolunteerCenter = 'VOLUNTEER_CENTER',
    LibraryWebsite = 'LIBRARY_WEBSITE',
    SocialMedia = 'SOCIAL_MEDIA',
    Newspaper = 'NEWSPAPER',
    ViaVia = 'VIA_VIA',
    Other = 'OTHER',
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

export type StudentDutchNtType = {
    __typename?: 'StudentDutchNTType'
    dutchNTLevel?: Maybe<StudentDutchNtLevelEnum>
    inNetherlandsSinceYear?: Maybe<Scalars['Float']>
    languageInDailyLife?: Maybe<Scalars['String']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    lastKnownLevel?: Maybe<StudentDutchLastKnownLevelEnum>
}

export enum StudentDutchNtLevelEnum {
    Nt1 = 'NT1',
    Nt2 = 'NT2',
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

export enum StudentLastFollowedEducationEnum {
    NoEducation = 'NO_EDUCATION',
    SomeYearsPo = 'SOME_YEARS_PO',
    Po = 'PO',
    Vo = 'VO',
    Mbo = 'MBO',
    Hbo = 'HBO',
    University = 'UNIVERSITY',
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

export type StudentCourseType = {
    __typename?: 'StudentCourseType'
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<StudentFollowingCourseTeacherEnum>
    courseGroup?: Maybe<StudentFollowingCourseGroupEnum>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
}

export enum StudentFollowingCourseTeacherEnum {
    Professional = 'PROFESSIONAL',
    Volunteer = 'VOLUNTEER',
    Both = 'BOTH',
}

export enum StudentFollowingCourseGroupEnum {
    Individually = 'INDIVIDUALLY',
    Group = 'GROUP',
}

export type StudentJobType = {
    __typename?: 'StudentJobType'
    trainedForJob?: Maybe<Scalars['String']>
    lastJob?: Maybe<Scalars['String']>
    dayTimeActivities?: Maybe<Array<StudentJobDaytimeActivitiesEnum>>
    dayTimeActivitiesOther?: Maybe<Scalars['String']>
}

export enum StudentJobDaytimeActivitiesEnum {
    SearchingForJob = 'SEARCHING_FOR_JOB',
    ReIntegration = 'RE_INTEGRATION',
    School = 'SCHOOL',
    VolunteerJob = 'VOLUNTEER_JOB',
    Job = 'JOB',
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

export enum StudentMotivationDesiredLearningMethodsEnum {
    InAGroup = 'IN_A_GROUP',
    OneOnOne = 'ONE_ON_ONE',
    HomeEnvironment = 'HOME_ENVIRONMENT',
    InLibraryOrOther = 'IN_LIBRARY_OR_OTHER',
    Online = 'ONLINE',
}

export type StudentAvailabilityDayType = {
    __typename?: 'StudentAvailabilityDayType'
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
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

export type StudentAvailabilityType = {
    __typename?: 'StudentAvailabilityType'
    availability?: Maybe<StudentAvailabilityDaysType>
    availabilityNotes?: Maybe<Scalars['String']>
}

export type StudentPermissionType = {
    __typename?: 'StudentPermissionType'
    didSignPermissionForm: Scalars['Boolean']
    hasPermissionToShareDataWithAanbieders: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
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

export enum ParticipantStatusEnum {
    Pending = 'pending',
    Accepted = 'accepted',
}

export enum StudentSpeakingLevelEnum {
    Beginner = 'BEGINNER',
    Reasonable = 'REASONABLE',
    Advanced = 'ADVANCED',
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

export enum StudentWritingTestResultEnum {
    CanNotWrite = 'CAN_NOT_WRITE',
    WriteNawDetails = 'WRITE_NAW_DETAILS',
    WriteSimpleTexts = 'WRITE_SIMPLE_TEXTS',
    WriteSimpleLetters = 'WRITE_SIMPLE_LETTERS',
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

export type DownloadReportType = {
    __typename?: 'DownloadReportType'
    filename: Scalars['String']
    base64data: Scalars['String']
}

export type AanbiederEmployeeDocumentType = {
    __typename?: 'AanbiederEmployeeDocumentType'
    id: Scalars['String']
    filename: Scalars['String']
    dateCreated: Scalars['String']
}

export type AanbiederEmployeeDocumentDownloadType = {
    __typename?: 'AanbiederEmployeeDocumentDownloadType'
    base64data: Scalars['String']
}

export type StudentDocumentType = {
    __typename?: 'StudentDocumentType'
    id: Scalars['String']
    filename: Scalars['String']
    dateCreated: Scalars['String']
}

export type StudentDocumentDownloadType = {
    __typename?: 'StudentDocumentDownloadType'
    base64data: Scalars['String']
}

export type StudentDossierEventType = {
    __typename?: 'StudentDossierEventType'
    id: Scalars['String']
    event: StudentDossierEventEnum
    eventDate: Scalars['String']
    eventDescription: Scalars['String']
    createdByAanbiederEmployee: AanbiederEmployeeType
}

export enum StudentDossierEventEnum {
    FinalTalk = 'FINAL_TALK',
    Remark = 'REMARK',
    FollowUpTalk = 'FOLLOW_UP_TALK',
    InfoForStorytelling = 'INFO_FOR_STORYTELLING',
    Intake = 'INTAKE',
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

export type GroupAvailabilityDayType = {
    __typename?: 'GroupAvailabilityDayType'
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
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

export type GroupType = {
    __typename?: 'GroupType'
    id: Scalars['String']
    name: Scalars['String']
    aanbiederName: Scalars['String']
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
    aanbiederEmployees?: Maybe<Array<AanbiederEmployeeType>>
}

export enum GroupTypeCourseEnum {
    Language = 'LANGUAGE',
    Math = 'MATH',
    Digital = 'DIGITAL',
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

export enum LearningNeedOfferDifferenceEnum {
    No = 'NO',
    YesDistance = 'YES_DISTANCE',
    YesWaitinglist = 'YES_WAITINGLIST',
    YesOther = 'YES_OTHER',
}

export type TaalhuisEmployeeType = {
    __typename?: 'TaalhuisEmployeeType'
    id: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<TaalhuisUserRoleType>
}

export type TaalhuisAddressType = {
    __typename?: 'TaalhuisAddressType'
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type TaalhuisType = {
    __typename?: 'TaalhuisType'
    id: Scalars['String']
    name: Scalars['String']
    address?: Maybe<TaalhuisAddressType>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
}

export type Query = {
    __typename?: 'Query'
    currentUser: ContextUserType
    taalhuizen: Array<TaalhuisType>
    taalhuis: TaalhuisType
    userRolesByTaalhuisId: Array<TaalhuisUserRoleType>
    taalhuisEmployees: Array<TaalhuisEmployeeType>
    taalhuisEmployee: TaalhuisEmployeeType
    aanbieders: Array<AanbiederType>
    aanbieder: AanbiederType
    aanbiederEmployees: Array<AanbiederEmployeeType>
    aanbiederEmployee: AanbiederEmployeeType
    userRolesByAanbiederId: Array<AanbiederUserRoleType>
    registrations: Array<StudentType>
    registration: StudentType
    students: Array<StudentType>
    student: StudentType
    learningNeeds: Array<LearningNeedType>
    learningNeed: LearningNeedType
    biscEmployee: BiscEmployeeType
    biscEmployees: Array<BiscEmployeeType>
    aanbiederEmployeeDocument: AanbiederEmployeeDocumentType
    aanbiederEmployeeDocuments: Array<AanbiederEmployeeDocumentType>
    studentDocument: StudentDocumentType
    studentDocuments: Array<StudentDocumentType>
    studentDossierEvent: StudentDossierEventType
    studentDossierEvents: Array<StudentDossierEventType>
    participations: Array<ParticipationType>
    participation: ParticipationType
    testResults: Array<TestResultType>
    testResult: TestResultType
    aanbiederEmployeeMentees: Array<StudentType>
    group: GroupType
    activeGroups: Array<GroupType>
    completedGroups: Array<GroupType>
    futureGroups: Array<GroupType>
    groupStudents: Array<StudentType>
    newReferredStudents: Array<StudentType>
    activeStudents: Array<StudentType>
    completedStudents: Array<StudentType>
}

export type QueryTaalhuisArgs = {
    taalhuisId: Scalars['String']
}

export type QueryUserRolesByTaalhuisIdArgs = {
    taalhuisId: Scalars['String']
}

export type QueryTaalhuisEmployeesArgs = {
    taalhuisId: Scalars['String']
}

export type QueryTaalhuisEmployeeArgs = {
    userId: Scalars['String']
}

export type QueryAanbiederArgs = {
    id: Scalars['String']
}

export type QueryAanbiederEmployeesArgs = {
    aanbiederId: Scalars['String']
}

export type QueryAanbiederEmployeeArgs = {
    userId: Scalars['String']
}

export type QueryUserRolesByAanbiederIdArgs = {
    aanbiederId: Scalars['String']
}

export type QueryRegistrationsArgs = {
    taalhuisId: Scalars['String']
}

export type QueryRegistrationArgs = {
    studentId: Scalars['String']
}

export type QueryStudentsArgs = {
    taalhuisId: Scalars['String']
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

export type QueryAanbiederEmployeeDocumentArgs = {
    aanbiederEmployeeDocumentId: Scalars['String']
}

export type QueryAanbiederEmployeeDocumentsArgs = {
    aanbiederEmployeeId: Scalars['String']
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

export type QueryAanbiederEmployeeMenteesArgs = {
    anbiederEmployeeId: Scalars['String']
}

export type QueryGroupArgs = {
    groupId: Scalars['String']
}

export type QueryActiveGroupsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryCompletedGroupsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryFutureGroupsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryGroupStudentsArgs = {
    groupId: Scalars['String']
}

export type QueryNewReferredStudentsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryActiveStudentsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryCompletedStudentsArgs = {
    aanbiederId: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    login: RawReturnType
    requestPasswordReset: Scalars['Boolean']
    resetPassword: Scalars['Boolean']
    changePassword: Scalars['Boolean']
    createTaalhuis: TaalhuisType
    updateTaalhuis: TaalhuisType
    deleteTaalhuis: Scalars['Boolean']
    createTaalhuisEmployee: TaalhuisEmployeeType
    deleteTaalhuisEmployee: Scalars['Boolean']
    updateTaalhuisEmployee: TaalhuisEmployeeType
    createAanbieder: AanbiederType
    updateAanbieder: AanbiederType
    deleteAanbieder: Scalars['Boolean']
    createAanbiederEmployee: AanbiederEmployeeType
    updateAanbiederEmployee: AanbiederEmployeeType
    deleteAanbiederEmployee: Scalars['Boolean']
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
    createAanbiederEmployeeDocument: AanbiederEmployeeDocumentType
    downloadAanbiederEmployeeDocument: AanbiederEmployeeDocumentDownloadType
    deleteAanbiederEmployeeDocument: Scalars['Boolean']
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
    addMentorToParticipation: AanbiederEmployeeType
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

export type MutationCreateTaalhuisArgs = {
    address?: Maybe<CreateTaalhuisAddressInputType>
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationUpdateTaalhuisArgs = {
    id: Scalars['String']
    address?: Maybe<UpdateTaalhuisAddressInputType>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationDeleteTaalhuisArgs = {
    id: Scalars['String']
}

export type MutationCreateTaalhuisEmployeeArgs = {
    input: CreateTaalhuisEmployeeInputType
}

export type MutationDeleteTaalhuisEmployeeArgs = {
    userId: Scalars['String']
}

export type MutationUpdateTaalhuisEmployeeArgs = {
    input: UpdateTaalhuisEmployeeInputType
}

export type MutationCreateAanbiederArgs = {
    address?: Maybe<CreateAanbiederAddressInputType>
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationUpdateAanbiederArgs = {
    id: Scalars['String']
    address?: Maybe<UpdateAanbiederAddressInputType>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationDeleteAanbiederArgs = {
    id: Scalars['String']
}

export type MutationCreateAanbiederEmployeeArgs = {
    input: CreateAanbiederEmployeeInputType
}

export type MutationUpdateAanbiederEmployeeArgs = {
    input: UpdateAanbiederEmployeeInputType
}

export type MutationDeleteAanbiederEmployeeArgs = {
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

export type MutationCreateAanbiederEmployeeDocumentArgs = {
    input: CreateAanbiederEmployeeDocumentInputType
}

export type MutationDownloadAanbiederEmployeeDocumentArgs = {
    aanbiederEmployeeDocumentId: Scalars['String']
}

export type MutationDeleteAanbiederEmployeeDocumentArgs = {
    aanbiederEmployeeDocumentId: Scalars['String']
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

export type CreateTaalhuisAddressInputType = {
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type UpdateTaalhuisAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type CreateTaalhuisEmployeeInputType = {
    taalhuisId: Scalars['String']
    userGroupId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type UpdateTaalhuisEmployeeInputType = {
    userId: Scalars['String']
    userGroupId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type CreateAanbiederAddressInputType = {
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type UpdateAanbiederAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type CreateAanbiederEmployeeInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    availability?: Maybe<CreateAanbiederEmployeeAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    email: Scalars['String']
    userGroupIds: Array<Scalars['String']>
    gender?: Maybe<AanbiederEmployeeGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
    address?: Maybe<AanbiederEmployeeAddressInputType>
    contactTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<AanbiederEmployeeContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
    targetGroupPreference?: Maybe<Array<AanbiederEmployeeTargetGroupPreferenceEnum>>
    volunteringPreference?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<AanbiederEmployeeCurrentEducationEnum>
    currentEducationYes?: Maybe<CreateAanbiederEmployeeCurrentEducationYesInputType>
    currentEdicationNoButDidFollow?: Maybe<CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    isVOGChecked?: Maybe<Scalars['Boolean']>
    aanbiederId: Scalars['String']
}

export type CreateAanbiederEmployeeAvailabilityInputType = {
    monday: CreateAanbiederEmployeeAvailabilityDayInputType
    tuesday: CreateAanbiederEmployeeAvailabilityDayInputType
    wednesday: CreateAanbiederEmployeeAvailabilityDayInputType
    thursday: CreateAanbiederEmployeeAvailabilityDayInputType
    friday: CreateAanbiederEmployeeAvailabilityDayInputType
    saturday: CreateAanbiederEmployeeAvailabilityDayInputType
    sunday: CreateAanbiederEmployeeAvailabilityDayInputType
}

export type CreateAanbiederEmployeeAvailabilityDayInputType = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type AanbiederEmployeeAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type CreateAanbiederEmployeeCurrentEducationYesInputType = {
    dateSince?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    doesProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType = {
    dateUntil?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    gotCertificate?: Maybe<Scalars['Boolean']>
}

export type UpdateAanbiederEmployeeInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    availability?: Maybe<CreateAanbiederEmployeeAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    email: Scalars['String']
    userGroupIds: Array<Scalars['String']>
    gender?: Maybe<AanbiederEmployeeGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
    address?: Maybe<AanbiederEmployeeAddressInputType>
    contactTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<AanbiederEmployeeContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
    targetGroupPreference?: Maybe<Array<AanbiederEmployeeTargetGroupPreferenceEnum>>
    volunteringPreference?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<AanbiederEmployeeCurrentEducationEnum>
    currentEducationYes?: Maybe<CreateAanbiederEmployeeCurrentEducationYesInputType>
    currentEdicationNoButDidFollow?: Maybe<CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    isVOGChecked?: Maybe<Scalars['Boolean']>
    userId: Scalars['String']
}

export type RegisterStudentInputType = {
    taalhuisId: Scalars['String']
    student: RegisterStudentStudentInputType
    registrar: RegisterStudentRegistrarInputType
    memo?: Maybe<Scalars['String']>
}

export type RegisterStudentStudentInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
    address?: Maybe<RegisterStudentAddresInputType>
}

export type RegisterStudentAddresInputType = {
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
}

export type RegisterStudentRegistrarInputType = {
    organisationName: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
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
    taalhuisId: Scalars['String']
}

export type CreateStudentCivicIntegrationInputType = {
    civicIntegrationRequirement?: Maybe<StudentCivicIntegrationRequirementEnum>
    civicIntegrationRequirementReason?: Maybe<StudentCivicIntegrationRequirementReasonEnum>
    civicIntegrationRequirementFinishDate?: Maybe<Scalars['String']>
}

export type CreateStudentPersonInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    gender?: Maybe<StudentGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
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

export type CreateStudentGeneralInputType = {
    countryOfOrigin?: Maybe<Scalars['String']>
    nativeLanguage?: Maybe<Scalars['String']>
    otherLanguages?: Maybe<Scalars['String']>
    familyComposition?: Maybe<Array<StudentFamilyCompositionEnum>>
    childrenCount?: Maybe<Scalars['Int']>
    childrenDatesOfBirth?: Maybe<Scalars['String']>
}

export type CreateStudentReferrerInputType = {
    referringOrganization?: Maybe<StudentReferringOrganizationEnum>
    referringOrganizationOther?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
}

export type CreateStudentBackgroundInputType = {
    foundVia?: Maybe<StudentFoundViaEnum>
    foundViaOther?: Maybe<Scalars['String']>
    wentToTaalhuisBefore?: Maybe<Scalars['Boolean']>
    wentToTaalhuisBeforeReason?: Maybe<Scalars['String']>
    wentToTaalhuisBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Array<StudentNetworkEnum>>
    participationLadder?: Maybe<Scalars['Int']>
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

export type CreateStudentCourseInputType = {
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<StudentFollowingCourseTeacherEnum>
    courseGroup?: Maybe<StudentFollowingCourseGroupEnum>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
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

export type CreateStudentAvailabilityInputType = {
    availability?: Maybe<CreateStudentAvailabilityDaysInputType>
    availabilityNotes?: Maybe<Scalars['String']>
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

export type CreateStudentAvailabilityDayInputType = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type CreateStudentPermissionInputType = {
    didSignPermissionForm: Scalars['Boolean']
    hasPermissionToShareDataWithAanbieders: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
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

export type CreateParticipationInputType = {
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederName?: Maybe<Scalars['String']>
    aanbiederNote?: Maybe<Scalars['String']>
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

export type CreateBiscEmployeeInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type UpdateBiscEmployeeInputType = {
    biscEmployeeId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type DownloadParticipantsReportInputType = {
    taalhuisId: Scalars['String']
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
}

export type DownloadDesiredLearningOutcomesReportInputType = {
    taalhuisId: Scalars['String']
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
}

export type DownloadVolunteersReportInputType = {
    aanbiederId: Scalars['String']
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
}

export type CreateAanbiederEmployeeDocumentInputType = {
    aanbiederEmployeeId: Scalars['String']
    filename: Scalars['String']
    base64data: Scalars['String']
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

export type UpdateStudentDossierEventInputType = {
    studentDossierEventId: Scalars['String']
    event: StudentDossierEventEnum
    eventDate: Scalars['String']
    eventDescription: Scalars['String']
}

export type UpdateParticipationInputType = {
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederName?: Maybe<Scalars['String']>
    aanbiederNote?: Maybe<Scalars['String']>
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

export type CreateGroupInputType = {
    aanbiederId: Scalars['String']
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
    aanbiederEmployeeIds?: Maybe<Array<Scalars['String']>>
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

export type CreateGroupAvailabilityDayInputType = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
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
    aanbiederEmployeeIds?: Maybe<Array<Scalars['String']>>
}

export type AddOrRemoveMentorToParticipationInputType = {
    participationId: Scalars['String']
    aanbiederEmployeeId: Scalars['String']
}

export type AddOrRemoveParticipationToGroupInputType = {
    participationId: Scalars['String']
    groupId: Scalars['String']
}

export type UpdateGroupParticipationInputType = {
    participationId: Scalars['String']
    presenceEngagements?: Maybe<Scalars['String']>
    presenceStartDate?: Maybe<Scalars['DateTime']>
    presenceEndDate?: Maybe<Scalars['DateTime']>
    presenceEndParticipationReason?: Maybe<ParticipationPresenceEndParticipationReasonEnum>
}

export type ChangePasswordMutationVariables = Exact<{
    currentPassword: Scalars['String']
    newPassword: Scalars['String']
}>

export type ChangePasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'changePassword'>

export type CreateAanbiederMutationVariables = Exact<{
    address: CreateAanbiederAddressInputType
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}>

export type CreateAanbiederMutation = { __typename?: 'Mutation' } & {
    createAanbieder: { __typename?: 'AanbiederType' } & Pick<
        AanbiederType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'AanbiederAddressType' } & Pick<
                    AanbiederAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
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
                    | 'aanbiederId'
                    | 'aanbiederName'
                    | 'aanbiederNote'
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
}

export type CreateTaalhuisMutationVariables = Exact<{
    address: CreateTaalhuisAddressInputType
    name: Scalars['String']
    email: Scalars['String']
    phoneNumber: Scalars['String']
}>

export type CreateTaalhuisMutation = { __typename?: 'Mutation' } & {
    createTaalhuis: { __typename?: 'TaalhuisType' } & Pick<
        TaalhuisType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'TaalhuisAddressType' } & Pick<
                    TaalhuisAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type CreateTaalhuisEmployeeMutationVariables = Exact<{
    input: CreateTaalhuisEmployeeInputType
}>

export type CreateTaalhuisEmployeeMutation = { __typename?: 'Mutation' } & {
    createTaalhuisEmployee: { __typename?: 'TaalhuisEmployeeType' } & Pick<
        TaalhuisEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
}

export type DeleteAanbiederMutationVariables = Exact<{
    id: Scalars['String']
}>

export type DeleteAanbiederMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteAanbieder'>

export type DeleteAanbiederEmployeeMutationVariables = Exact<{
    userId: Scalars['String']
}>

export type DeleteAanbiederEmployeeMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteAanbiederEmployee'>

export type DeleteTaalhuisMutationVariables = Exact<{
    id: Scalars['String']
}>

export type DeleteTaalhuisMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteTaalhuis'>

export type DeleteTaalhuisEmployeeMutationVariables = Exact<{
    userId: Scalars['String']
}>

export type DeleteTaalhuisEmployeeMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteTaalhuisEmployee'>

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

export type UpdateAanbiederMutationVariables = Exact<{
    id: Scalars['String']
    address: UpdateAanbiederAddressInputType
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}>

export type UpdateAanbiederMutation = { __typename?: 'Mutation' } & {
    updateAanbieder: { __typename?: 'AanbiederType' } & Pick<
        AanbiederType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'AanbiederAddressType' } & Pick<
                    AanbiederAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type UpdateTaalhuisMutationVariables = Exact<{
    id: Scalars['String']
    address: UpdateTaalhuisAddressInputType
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}>

export type UpdateTaalhuisMutation = { __typename?: 'Mutation' } & {
    updateTaalhuis: { __typename?: 'TaalhuisType' } & Pick<
        TaalhuisType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'TaalhuisAddressType' } & Pick<
                    TaalhuisAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type UpdateTaalhuisEmployeeMutationVariables = Exact<{
    input: UpdateTaalhuisEmployeeInputType
}>

export type UpdateTaalhuisEmployeeMutation = { __typename?: 'Mutation' } & {
    updateTaalhuisEmployee: { __typename?: 'TaalhuisEmployeeType' } & Pick<
        TaalhuisEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
}

export type AanbiederQueryVariables = Exact<{
    id: Scalars['String']
}>

export type AanbiederQuery = { __typename?: 'Query' } & {
    aanbieder: { __typename?: 'AanbiederType' } & Pick<
        AanbiederType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'AanbiederAddressType' } & Pick<
                    AanbiederAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type AanbiedersQueryVariables = Exact<{ [key: string]: never }>

export type AanbiedersQuery = { __typename?: 'Query' } & {
    aanbieders: Array<
        { __typename?: 'AanbiederType' } & Pick<AanbiederType, 'id' | 'name' | 'email' | 'telephone' | 'type'> & {
                address?: Maybe<
                    { __typename?: 'AanbiederAddressType' } & Pick<
                        AanbiederAddressType,
                        'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                    >
                >
            }
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
    > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
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
                        | 'aanbiederId'
                        | 'aanbiederName'
                        | 'aanbiederNote'
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

export type TaalhuisQueryVariables = Exact<{
    taalhuisId: Scalars['String']
}>

export type TaalhuisQuery = { __typename?: 'Query' } & {
    taalhuis: { __typename?: 'TaalhuisType' } & Pick<TaalhuisType, 'id' | 'name' | 'email' | 'telephone' | 'type'> & {
            address?: Maybe<
                { __typename?: 'TaalhuisAddressType' } & Pick<
                    TaalhuisAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type TaalhuisEmployeeQueryVariables = Exact<{
    userId: Scalars['String']
}>

export type TaalhuisEmployeeQuery = { __typename?: 'Query' } & {
    taalhuisEmployee: { __typename?: 'TaalhuisEmployeeType' } & Pick<
        TaalhuisEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
}

export type TaalhuisEmployeesQueryVariables = Exact<{
    taalhuisId: Scalars['String']
}>

export type TaalhuisEmployeesQuery = { __typename?: 'Query' } & {
    taalhuisEmployees: Array<
        { __typename?: 'TaalhuisEmployeeType' } & Pick<
            TaalhuisEmployeeType,
            | 'id'
            | 'givenName'
            | 'additionalName'
            | 'familyName'
            | 'email'
            | 'telephone'
            | 'dateCreated'
            | 'dateModified'
        > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
    >
}

export type TaalhuizenQueryVariables = Exact<{ [key: string]: never }>

export type TaalhuizenQuery = { __typename?: 'Query' } & {
    taalhuizen: Array<
        { __typename?: 'TaalhuisType' } & Pick<TaalhuisType, 'id' | 'name' | 'email' | 'telephone' | 'type'> & {
                address?: Maybe<
                    { __typename?: 'TaalhuisAddressType' } & Pick<
                        TaalhuisAddressType,
                        'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                    >
                >
            }
    >
}

export type UserRolesByAanbiederIdQueryVariables = Exact<{
    aanbiederId: Scalars['String']
}>

export type UserRolesByAanbiederIdQuery = { __typename?: 'Query' } & {
    userRolesByAanbiederId: Array<{ __typename?: 'AanbiederUserRoleType' } & Pick<AanbiederUserRoleType, 'id' | 'name'>>
}

export type UserRolesByTaalhuisIdQueryVariables = Exact<{
    taalhuisId: Scalars['String']
}>

export type UserRolesByTaalhuisIdQuery = { __typename?: 'Query' } & {
    userRolesByTaalhuisId: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>>
}

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
export const CreateAanbiederDocument = gql`
    mutation createAanbieder(
        $address: CreateAanbiederAddressInputType!
        $name: String!
        $email: String
        $phoneNumber: String
    ) {
        createAanbieder(address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
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
 * __useCreateAanbiederMutation__
 *
 * To run a mutation, you first call `useCreateAanbiederMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAanbiederMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAanbiederMutation, { data, loading, error }] = useCreateAanbiederMutation({
 *   variables: {
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useCreateAanbiederMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateAanbiederMutation, CreateAanbiederMutationVariables>
) {
    return Apollo.useMutation<CreateAanbiederMutation, CreateAanbiederMutationVariables>(
        CreateAanbiederDocument,
        baseOptions
    )
}
export type CreateAanbiederMutationHookResult = ReturnType<typeof useCreateAanbiederMutation>
export type CreateAanbiederMutationResult = Apollo.MutationResult<CreateAanbiederMutation>
export type CreateAanbiederMutationOptions = Apollo.BaseMutationOptions<
    CreateAanbiederMutation,
    CreateAanbiederMutationVariables
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
                aanbiederId
                aanbiederName
                aanbiederNote
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
export const CreateTaalhuisDocument = gql`
    mutation createTaalhuis(
        $address: CreateTaalhuisAddressInputType!
        $name: String!
        $email: String!
        $phoneNumber: String!
    ) {
        createTaalhuis(address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
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
 * __useCreateTaalhuisMutation__
 *
 * To run a mutation, you first call `useCreateTaalhuisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaalhuisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaalhuisMutation, { data, loading, error }] = useCreateTaalhuisMutation({
 *   variables: {
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useCreateTaalhuisMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateTaalhuisMutation, CreateTaalhuisMutationVariables>
) {
    return Apollo.useMutation<CreateTaalhuisMutation, CreateTaalhuisMutationVariables>(
        CreateTaalhuisDocument,
        baseOptions
    )
}
export type CreateTaalhuisMutationHookResult = ReturnType<typeof useCreateTaalhuisMutation>
export type CreateTaalhuisMutationResult = Apollo.MutationResult<CreateTaalhuisMutation>
export type CreateTaalhuisMutationOptions = Apollo.BaseMutationOptions<
    CreateTaalhuisMutation,
    CreateTaalhuisMutationVariables
>
export const CreateTaalhuisEmployeeDocument = gql`
    mutation createTaalhuisEmployee($input: CreateTaalhuisEmployeeInputType!) {
        createTaalhuisEmployee(input: $input) {
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
 * __useCreateTaalhuisEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateTaalhuisEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaalhuisEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaalhuisEmployeeMutation, { data, loading, error }] = useCreateTaalhuisEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaalhuisEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateTaalhuisEmployeeMutation, CreateTaalhuisEmployeeMutationVariables>
) {
    return Apollo.useMutation<CreateTaalhuisEmployeeMutation, CreateTaalhuisEmployeeMutationVariables>(
        CreateTaalhuisEmployeeDocument,
        baseOptions
    )
}
export type CreateTaalhuisEmployeeMutationHookResult = ReturnType<typeof useCreateTaalhuisEmployeeMutation>
export type CreateTaalhuisEmployeeMutationResult = Apollo.MutationResult<CreateTaalhuisEmployeeMutation>
export type CreateTaalhuisEmployeeMutationOptions = Apollo.BaseMutationOptions<
    CreateTaalhuisEmployeeMutation,
    CreateTaalhuisEmployeeMutationVariables
>
export const DeleteAanbiederDocument = gql`
    mutation deleteAanbieder($id: String!) {
        deleteAanbieder(id: $id)
    }
`

/**
 * __useDeleteAanbiederMutation__
 *
 * To run a mutation, you first call `useDeleteAanbiederMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAanbiederMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAanbiederMutation, { data, loading, error }] = useDeleteAanbiederMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAanbiederMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteAanbiederMutation, DeleteAanbiederMutationVariables>
) {
    return Apollo.useMutation<DeleteAanbiederMutation, DeleteAanbiederMutationVariables>(
        DeleteAanbiederDocument,
        baseOptions
    )
}
export type DeleteAanbiederMutationHookResult = ReturnType<typeof useDeleteAanbiederMutation>
export type DeleteAanbiederMutationResult = Apollo.MutationResult<DeleteAanbiederMutation>
export type DeleteAanbiederMutationOptions = Apollo.BaseMutationOptions<
    DeleteAanbiederMutation,
    DeleteAanbiederMutationVariables
>
export const DeleteAanbiederEmployeeDocument = gql`
    mutation deleteAanbiederEmployee($userId: String!) {
        deleteAanbiederEmployee(userId: $userId)
    }
`

/**
 * __useDeleteAanbiederEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteAanbiederEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAanbiederEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAanbiederEmployeeMutation, { data, loading, error }] = useDeleteAanbiederEmployeeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteAanbiederEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteAanbiederEmployeeMutation, DeleteAanbiederEmployeeMutationVariables>
) {
    return Apollo.useMutation<DeleteAanbiederEmployeeMutation, DeleteAanbiederEmployeeMutationVariables>(
        DeleteAanbiederEmployeeDocument,
        baseOptions
    )
}
export type DeleteAanbiederEmployeeMutationHookResult = ReturnType<typeof useDeleteAanbiederEmployeeMutation>
export type DeleteAanbiederEmployeeMutationResult = Apollo.MutationResult<DeleteAanbiederEmployeeMutation>
export type DeleteAanbiederEmployeeMutationOptions = Apollo.BaseMutationOptions<
    DeleteAanbiederEmployeeMutation,
    DeleteAanbiederEmployeeMutationVariables
>
export const DeleteTaalhuisDocument = gql`
    mutation deleteTaalhuis($id: String!) {
        deleteTaalhuis(id: $id)
    }
`

/**
 * __useDeleteTaalhuisMutation__
 *
 * To run a mutation, you first call `useDeleteTaalhuisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaalhuisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaalhuisMutation, { data, loading, error }] = useDeleteTaalhuisMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaalhuisMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteTaalhuisMutation, DeleteTaalhuisMutationVariables>
) {
    return Apollo.useMutation<DeleteTaalhuisMutation, DeleteTaalhuisMutationVariables>(
        DeleteTaalhuisDocument,
        baseOptions
    )
}
export type DeleteTaalhuisMutationHookResult = ReturnType<typeof useDeleteTaalhuisMutation>
export type DeleteTaalhuisMutationResult = Apollo.MutationResult<DeleteTaalhuisMutation>
export type DeleteTaalhuisMutationOptions = Apollo.BaseMutationOptions<
    DeleteTaalhuisMutation,
    DeleteTaalhuisMutationVariables
>
export const DeleteTaalhuisEmployeeDocument = gql`
    mutation deleteTaalhuisEmployee($userId: String!) {
        deleteTaalhuisEmployee(userId: $userId)
    }
`

/**
 * __useDeleteTaalhuisEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteTaalhuisEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaalhuisEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaalhuisEmployeeMutation, { data, loading, error }] = useDeleteTaalhuisEmployeeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteTaalhuisEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteTaalhuisEmployeeMutation, DeleteTaalhuisEmployeeMutationVariables>
) {
    return Apollo.useMutation<DeleteTaalhuisEmployeeMutation, DeleteTaalhuisEmployeeMutationVariables>(
        DeleteTaalhuisEmployeeDocument,
        baseOptions
    )
}
export type DeleteTaalhuisEmployeeMutationHookResult = ReturnType<typeof useDeleteTaalhuisEmployeeMutation>
export type DeleteTaalhuisEmployeeMutationResult = Apollo.MutationResult<DeleteTaalhuisEmployeeMutation>
export type DeleteTaalhuisEmployeeMutationOptions = Apollo.BaseMutationOptions<
    DeleteTaalhuisEmployeeMutation,
    DeleteTaalhuisEmployeeMutationVariables
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
export const UpdateAanbiederDocument = gql`
    mutation updateAanbieder(
        $id: String!
        $address: UpdateAanbiederAddressInputType!
        $name: String!
        $email: String
        $phoneNumber: String
    ) {
        updateAanbieder(id: $id, address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
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
 * __useUpdateAanbiederMutation__
 *
 * To run a mutation, you first call `useUpdateAanbiederMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAanbiederMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAanbiederMutation, { data, loading, error }] = useUpdateAanbiederMutation({
 *   variables: {
 *      id: // value for 'id'
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUpdateAanbiederMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateAanbiederMutation, UpdateAanbiederMutationVariables>
) {
    return Apollo.useMutation<UpdateAanbiederMutation, UpdateAanbiederMutationVariables>(
        UpdateAanbiederDocument,
        baseOptions
    )
}
export type UpdateAanbiederMutationHookResult = ReturnType<typeof useUpdateAanbiederMutation>
export type UpdateAanbiederMutationResult = Apollo.MutationResult<UpdateAanbiederMutation>
export type UpdateAanbiederMutationOptions = Apollo.BaseMutationOptions<
    UpdateAanbiederMutation,
    UpdateAanbiederMutationVariables
>
export const UpdateTaalhuisDocument = gql`
    mutation updateTaalhuis(
        $id: String!
        $address: UpdateTaalhuisAddressInputType!
        $name: String
        $email: String
        $phoneNumber: String
    ) {
        updateTaalhuis(id: $id, address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
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
 * __useUpdateTaalhuisMutation__
 *
 * To run a mutation, you first call `useUpdateTaalhuisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaalhuisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaalhuisMutation, { data, loading, error }] = useUpdateTaalhuisMutation({
 *   variables: {
 *      id: // value for 'id'
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUpdateTaalhuisMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateTaalhuisMutation, UpdateTaalhuisMutationVariables>
) {
    return Apollo.useMutation<UpdateTaalhuisMutation, UpdateTaalhuisMutationVariables>(
        UpdateTaalhuisDocument,
        baseOptions
    )
}
export type UpdateTaalhuisMutationHookResult = ReturnType<typeof useUpdateTaalhuisMutation>
export type UpdateTaalhuisMutationResult = Apollo.MutationResult<UpdateTaalhuisMutation>
export type UpdateTaalhuisMutationOptions = Apollo.BaseMutationOptions<
    UpdateTaalhuisMutation,
    UpdateTaalhuisMutationVariables
>
export const UpdateTaalhuisEmployeeDocument = gql`
    mutation updateTaalhuisEmployee($input: UpdateTaalhuisEmployeeInputType!) {
        updateTaalhuisEmployee(input: $input) {
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
 * __useUpdateTaalhuisEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateTaalhuisEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaalhuisEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaalhuisEmployeeMutation, { data, loading, error }] = useUpdateTaalhuisEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaalhuisEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateTaalhuisEmployeeMutation, UpdateTaalhuisEmployeeMutationVariables>
) {
    return Apollo.useMutation<UpdateTaalhuisEmployeeMutation, UpdateTaalhuisEmployeeMutationVariables>(
        UpdateTaalhuisEmployeeDocument,
        baseOptions
    )
}
export type UpdateTaalhuisEmployeeMutationHookResult = ReturnType<typeof useUpdateTaalhuisEmployeeMutation>
export type UpdateTaalhuisEmployeeMutationResult = Apollo.MutationResult<UpdateTaalhuisEmployeeMutation>
export type UpdateTaalhuisEmployeeMutationOptions = Apollo.BaseMutationOptions<
    UpdateTaalhuisEmployeeMutation,
    UpdateTaalhuisEmployeeMutationVariables
>
export const AanbiederDocument = gql`
    query aanbieder($id: String!) {
        aanbieder(id: $id) {
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
 * __useAanbiederQuery__
 *
 * To run a query within a React component, call `useAanbiederQuery` and pass it any options that fit your needs.
 * When your component renders, `useAanbiederQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAanbiederQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAanbiederQuery(baseOptions: Apollo.QueryHookOptions<AanbiederQuery, AanbiederQueryVariables>) {
    return Apollo.useQuery<AanbiederQuery, AanbiederQueryVariables>(AanbiederDocument, baseOptions)
}
export function useAanbiederLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<AanbiederQuery, AanbiederQueryVariables>
) {
    return Apollo.useLazyQuery<AanbiederQuery, AanbiederQueryVariables>(AanbiederDocument, baseOptions)
}
export type AanbiederQueryHookResult = ReturnType<typeof useAanbiederQuery>
export type AanbiederLazyQueryHookResult = ReturnType<typeof useAanbiederLazyQuery>
export type AanbiederQueryResult = Apollo.QueryResult<AanbiederQuery, AanbiederQueryVariables>
export const AanbiedersDocument = gql`
    query aanbieders {
        aanbieders {
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
 * __useAanbiedersQuery__
 *
 * To run a query within a React component, call `useAanbiedersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAanbiedersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAanbiedersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAanbiedersQuery(baseOptions?: Apollo.QueryHookOptions<AanbiedersQuery, AanbiedersQueryVariables>) {
    return Apollo.useQuery<AanbiedersQuery, AanbiedersQueryVariables>(AanbiedersDocument, baseOptions)
}
export function useAanbiedersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<AanbiedersQuery, AanbiedersQueryVariables>
) {
    return Apollo.useLazyQuery<AanbiedersQuery, AanbiedersQueryVariables>(AanbiedersDocument, baseOptions)
}
export type AanbiedersQueryHookResult = ReturnType<typeof useAanbiedersQuery>
export type AanbiedersLazyQueryHookResult = ReturnType<typeof useAanbiedersLazyQuery>
export type AanbiedersQueryResult = Apollo.QueryResult<AanbiedersQuery, AanbiedersQueryVariables>
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
                aanbiederId
                aanbiederName
                aanbiederNote
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
export const TaalhuisDocument = gql`
    query taalhuis($taalhuisId: String!) {
        taalhuis(taalhuisId: $taalhuisId) {
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
 * __useTaalhuisQuery__
 *
 * To run a query within a React component, call `useTaalhuisQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaalhuisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaalhuisQuery({
 *   variables: {
 *      taalhuisId: // value for 'taalhuisId'
 *   },
 * });
 */
export function useTaalhuisQuery(baseOptions: Apollo.QueryHookOptions<TaalhuisQuery, TaalhuisQueryVariables>) {
    return Apollo.useQuery<TaalhuisQuery, TaalhuisQueryVariables>(TaalhuisDocument, baseOptions)
}
export function useTaalhuisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TaalhuisQuery, TaalhuisQueryVariables>) {
    return Apollo.useLazyQuery<TaalhuisQuery, TaalhuisQueryVariables>(TaalhuisDocument, baseOptions)
}
export type TaalhuisQueryHookResult = ReturnType<typeof useTaalhuisQuery>
export type TaalhuisLazyQueryHookResult = ReturnType<typeof useTaalhuisLazyQuery>
export type TaalhuisQueryResult = Apollo.QueryResult<TaalhuisQuery, TaalhuisQueryVariables>
export const TaalhuisEmployeeDocument = gql`
    query taalhuisEmployee($userId: String!) {
        taalhuisEmployee(userId: $userId) {
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
 * __useTaalhuisEmployeeQuery__
 *
 * To run a query within a React component, call `useTaalhuisEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaalhuisEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaalhuisEmployeeQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useTaalhuisEmployeeQuery(
    baseOptions: Apollo.QueryHookOptions<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>
) {
    return Apollo.useQuery<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>(TaalhuisEmployeeDocument, baseOptions)
}
export function useTaalhuisEmployeeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>
) {
    return Apollo.useLazyQuery<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>(
        TaalhuisEmployeeDocument,
        baseOptions
    )
}
export type TaalhuisEmployeeQueryHookResult = ReturnType<typeof useTaalhuisEmployeeQuery>
export type TaalhuisEmployeeLazyQueryHookResult = ReturnType<typeof useTaalhuisEmployeeLazyQuery>
export type TaalhuisEmployeeQueryResult = Apollo.QueryResult<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>
export const TaalhuisEmployeesDocument = gql`
    query taalhuisEmployees($taalhuisId: String!) {
        taalhuisEmployees(taalhuisId: $taalhuisId) {
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
 * __useTaalhuisEmployeesQuery__
 *
 * To run a query within a React component, call `useTaalhuisEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaalhuisEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaalhuisEmployeesQuery({
 *   variables: {
 *      taalhuisId: // value for 'taalhuisId'
 *   },
 * });
 */
export function useTaalhuisEmployeesQuery(
    baseOptions: Apollo.QueryHookOptions<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>
) {
    return Apollo.useQuery<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>(
        TaalhuisEmployeesDocument,
        baseOptions
    )
}
export function useTaalhuisEmployeesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>
) {
    return Apollo.useLazyQuery<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>(
        TaalhuisEmployeesDocument,
        baseOptions
    )
}
export type TaalhuisEmployeesQueryHookResult = ReturnType<typeof useTaalhuisEmployeesQuery>
export type TaalhuisEmployeesLazyQueryHookResult = ReturnType<typeof useTaalhuisEmployeesLazyQuery>
export type TaalhuisEmployeesQueryResult = Apollo.QueryResult<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>
export const TaalhuizenDocument = gql`
    query taalhuizen {
        taalhuizen {
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
 * __useTaalhuizenQuery__
 *
 * To run a query within a React component, call `useTaalhuizenQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaalhuizenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaalhuizenQuery({
 *   variables: {
 *   },
 * });
 */
export function useTaalhuizenQuery(baseOptions?: Apollo.QueryHookOptions<TaalhuizenQuery, TaalhuizenQueryVariables>) {
    return Apollo.useQuery<TaalhuizenQuery, TaalhuizenQueryVariables>(TaalhuizenDocument, baseOptions)
}
export function useTaalhuizenLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TaalhuizenQuery, TaalhuizenQueryVariables>
) {
    return Apollo.useLazyQuery<TaalhuizenQuery, TaalhuizenQueryVariables>(TaalhuizenDocument, baseOptions)
}
export type TaalhuizenQueryHookResult = ReturnType<typeof useTaalhuizenQuery>
export type TaalhuizenLazyQueryHookResult = ReturnType<typeof useTaalhuizenLazyQuery>
export type TaalhuizenQueryResult = Apollo.QueryResult<TaalhuizenQuery, TaalhuizenQueryVariables>
export const UserRolesByAanbiederIdDocument = gql`
    query userRolesByAanbiederId($aanbiederId: String!) {
        userRolesByAanbiederId(aanbiederId: $aanbiederId) {
            id
            name
        }
    }
`

/**
 * __useUserRolesByAanbiederIdQuery__
 *
 * To run a query within a React component, call `useUserRolesByAanbiederIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesByAanbiederIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesByAanbiederIdQuery({
 *   variables: {
 *      aanbiederId: // value for 'aanbiederId'
 *   },
 * });
 */
export function useUserRolesByAanbiederIdQuery(
    baseOptions: Apollo.QueryHookOptions<UserRolesByAanbiederIdQuery, UserRolesByAanbiederIdQueryVariables>
) {
    return Apollo.useQuery<UserRolesByAanbiederIdQuery, UserRolesByAanbiederIdQueryVariables>(
        UserRolesByAanbiederIdDocument,
        baseOptions
    )
}
export function useUserRolesByAanbiederIdLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UserRolesByAanbiederIdQuery, UserRolesByAanbiederIdQueryVariables>
) {
    return Apollo.useLazyQuery<UserRolesByAanbiederIdQuery, UserRolesByAanbiederIdQueryVariables>(
        UserRolesByAanbiederIdDocument,
        baseOptions
    )
}
export type UserRolesByAanbiederIdQueryHookResult = ReturnType<typeof useUserRolesByAanbiederIdQuery>
export type UserRolesByAanbiederIdLazyQueryHookResult = ReturnType<typeof useUserRolesByAanbiederIdLazyQuery>
export type UserRolesByAanbiederIdQueryResult = Apollo.QueryResult<
    UserRolesByAanbiederIdQuery,
    UserRolesByAanbiederIdQueryVariables
>
export const UserRolesByTaalhuisIdDocument = gql`
    query userRolesByTaalhuisId($taalhuisId: String!) {
        userRolesByTaalhuisId(taalhuisId: $taalhuisId) {
            id
            name
        }
    }
`

/**
 * __useUserRolesByTaalhuisIdQuery__
 *
 * To run a query within a React component, call `useUserRolesByTaalhuisIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesByTaalhuisIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesByTaalhuisIdQuery({
 *   variables: {
 *      taalhuisId: // value for 'taalhuisId'
 *   },
 * });
 */
export function useUserRolesByTaalhuisIdQuery(
    baseOptions: Apollo.QueryHookOptions<UserRolesByTaalhuisIdQuery, UserRolesByTaalhuisIdQueryVariables>
) {
    return Apollo.useQuery<UserRolesByTaalhuisIdQuery, UserRolesByTaalhuisIdQueryVariables>(
        UserRolesByTaalhuisIdDocument,
        baseOptions
    )
}
export function useUserRolesByTaalhuisIdLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UserRolesByTaalhuisIdQuery, UserRolesByTaalhuisIdQueryVariables>
) {
    return Apollo.useLazyQuery<UserRolesByTaalhuisIdQuery, UserRolesByTaalhuisIdQueryVariables>(
        UserRolesByTaalhuisIdDocument,
        baseOptions
    )
}
export type UserRolesByTaalhuisIdQueryHookResult = ReturnType<typeof useUserRolesByTaalhuisIdQuery>
export type UserRolesByTaalhuisIdLazyQueryHookResult = ReturnType<typeof useUserRolesByTaalhuisIdLazyQuery>
export type UserRolesByTaalhuisIdQueryResult = Apollo.QueryResult<
    UserRolesByTaalhuisIdQuery,
    UserRolesByTaalhuisIdQueryVariables
>
