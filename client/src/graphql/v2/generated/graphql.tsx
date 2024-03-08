import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    DateTime: Date
}

export enum AchievedResultResponse {
    NewLearningNeedAdded = 'newLearningNeedAdded',
    Other = 'other',
    Satisfactory = 'satisfactory',
}

export type AddressType = {
    __typename?: 'AddressType'
    country?: Maybe<Scalars['String']>
    createdAt: Scalars['String']
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    id: Scalars['ID']
    locality?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    street?: Maybe<Scalars['String']>
    updatedAt: Scalars['String']
}

export enum Availability {
    FridayAfternoon = 'fridayAfternoon',
    FridayEvening = 'fridayEvening',
    FridayMorning = 'fridayMorning',
    MondayAfternoon = 'mondayAfternoon',
    MondayEvening = 'mondayEvening',
    MondayMorning = 'mondayMorning',
    SaturdayAfternoon = 'saturdayAfternoon',
    SaturdayEvening = 'saturdayEvening',
    SaturdayMorning = 'saturdayMorning',
    SundayAfternoon = 'sundayAfternoon',
    SundayEvening = 'sundayEvening',
    SundayMorning = 'sundayMorning',
    ThursdayAfternoon = 'thursdayAfternoon',
    ThursdayEvening = 'thursdayEvening',
    ThursdayMorning = 'thursdayMorning',
    TuesdayAfternoon = 'tuesdayAfternoon',
    TuesdayEvening = 'tuesdayEvening',
    TuesdayMorning = 'tuesdayMorning',
    WednesdayAfternoon = 'wednesdayAfternoon',
    WednesdayEvening = 'wednesdayEvening',
    WednesdayMorning = 'wednesdayMorning',
}

export enum CivicIntegrationReason {
    ExemptedOrZRoute = 'exemptedOrZRoute',
    Finished = 'finished',
    FromEuCountry = 'fromEuCountry',
}

export enum CivicIntegrationRequirement {
    InProgress = 'inProgress',
    No = 'no',
    Yes = 'yes',
}

export type CivicIntegrationType = {
    __typename?: 'CivicIntegrationType'
    createdAt: Scalars['String']
    finishDate?: Maybe<Scalars['String']>
    id: Scalars['ID']
    reason?: Maybe<CivicIntegrationReason>
    requirement?: Maybe<CivicIntegrationRequirement>
    updatedAt: Scalars['String']
}

export enum ContactPreference {
    Email = 'email',
    Other = 'other',
    Phonecall = 'phonecall',
    Whatsapp = 'whatsapp',
}

export enum CourseTeacherTypeEnum {
    Both = 'both',
    Professional = 'professional',
    Volunteer = 'volunteer',
}

export type CreateAddressInputType = {
    country?: InputMaybe<Scalars['String']>
    houseNumber?: InputMaybe<Scalars['String']>
    houseNumberSuffix?: InputMaybe<Scalars['String']>
    locality?: InputMaybe<Scalars['String']>
    name?: InputMaybe<Scalars['String']>
    postalCode?: InputMaybe<Scalars['String']>
    street?: InputMaybe<Scalars['String']>
}

export type CreateCivicIntegrationInputType = {
    finishDate?: InputMaybe<Scalars['String']>
    reason?: InputMaybe<CivicIntegrationReason>
    requirement?: InputMaybe<CivicIntegrationRequirement>
}

export type CreateEducationGroupInputType = {
    availability?: InputMaybe<Array<Availability>>
    availabilityNotes?: InputMaybe<Scalars['String']>
    degree?: InputMaybe<Scalars['Boolean']>
    desiredLearningNeedOutcome: CreateLearningNeedOutcomeInputType
    employees?: InputMaybe<Array<Scalars['ID']>>
    end?: InputMaybe<Scalars['DateTime']>
    evaluation?: InputMaybe<Scalars['String']>
    formality?: InputMaybe<GroupFormality>
    lessonHours?: InputMaybe<Scalars['Float']>
    location: Scalars['String']
    maximumParticipants?: InputMaybe<Scalars['Float']>
    minimumParticipants?: InputMaybe<Scalars['Float']>
    name: Scalars['String']
    organizationId: Scalars['ID']
    participation?: InputMaybe<CreateParticipationInputType>
    start?: InputMaybe<Scalars['DateTime']>
    type: GroupOfferType
}

export type CreateEducationInputType = {
    courseTeacherType?: InputMaybe<CourseTeacherTypeEnum>
    currentlyFollowingStatus?: InputMaybe<EducationCurrentlyFollowingStatusEnum>
    degree?: InputMaybe<Scalars['Boolean']>
    degreeGranted?: InputMaybe<Scalars['Boolean']>
    endDate?: InputMaybe<Scalars['String']>
    group?: InputMaybe<EducationGroupTypeEnum>
    hours?: InputMaybe<Scalars['Int']>
    institution?: InputMaybe<Scalars['String']>
    level?: InputMaybe<EducationLevelEnum>
    levelOther?: InputMaybe<Scalars['String']>
    name: Scalars['String']
    other?: InputMaybe<Scalars['String']>
    startDate?: InputMaybe<Scalars['String']>
    type: EducationTypeEnum
    yearsFollowed?: InputMaybe<Scalars['Int']>
}

export type CreateEmployeeInputType = {
    employeeRole?: InputMaybe<EmployeeRole>
    organization: Scalars['String']
    person: CreatePersonInputType
    /** only for language house employees */
    teams?: InputMaybe<Array<Scalars['String']>>
}

export type CreateLearningNeedInputType = {
    advisedOffer?: InputMaybe<Scalars['String']>
    agreements?: InputMaybe<Scalars['String']>
    description: Scalars['String']
    desiredLearningNeedOutcome?: InputMaybe<CreateLearningNeedOutcomeInputType>
    desiredOffer?: InputMaybe<Scalars['String']>
    motivation: Scalars['String']
    offerDifference?: InputMaybe<OfferDifference>
    offerDifferenceOther?: InputMaybe<Scalars['String']>
    student: Scalars['String']
}

export type CreateLearningNeedOutcomeInputType = {
    application?: InputMaybe<LearningResultApplication>
    applicationOther?: InputMaybe<Scalars['String']>
    id?: InputMaybe<Scalars['ID']>
    level?: InputMaybe<LearningResultLevel>
    levelOther?: InputMaybe<Scalars['String']>
    subject?: InputMaybe<LearningResultSubject>
    subjectOther?: InputMaybe<Scalars['String']>
}

export type CreateOrEditLearningNeedOutcomeInputType = {
    application?: InputMaybe<LearningResultApplication>
    applicationOther?: InputMaybe<Scalars['String']>
    id?: InputMaybe<Scalars['ID']>
    level?: InputMaybe<LearningResultLevel>
    levelOther?: InputMaybe<Scalars['String']>
    subject?: InputMaybe<LearningResultSubject>
    subjectOther?: InputMaybe<Scalars['String']>
}

export type CreateOrganizationInputType = {
    address?: InputMaybe<CreateAddressInputType>
    email?: InputMaybe<Scalars['String']>
    /** Used only to limit provider editing rights at the moment */
    hasLimitedEditRights?: InputMaybe<Scalars['Boolean']>
    name: Scalars['String']
    postalCodes?: InputMaybe<Array<Scalars['Int']>>
    telephone?: InputMaybe<Scalars['String']>
    type: OrganizationTypeEnum
}

export type CreateParticipationInputType = {
    agreement?: InputMaybe<Scalars['String']>
    degree?: InputMaybe<Scalars['Boolean']>
    educationGroup?: InputMaybe<Scalars['ID']>
    end?: InputMaybe<Scalars['DateTime']>
    formality?: InputMaybe<ParticipationFormality>
    groupFormation?: InputMaybe<ParticipationGroupType>
    learningNeedId?: InputMaybe<Scalars['ID']>
    mentor?: InputMaybe<Scalars['ID']>
    newLearningNeed?: InputMaybe<CreateLearningNeedInputType>
    offerLearningNeedOutcome?: InputMaybe<LearningNeedOutcomeInputType>
    offerName?: InputMaybe<Scalars['String']>
    offerType?: InputMaybe<ParticipationOfferType>
    provider?: InputMaybe<Scalars['ID']>
    providerExplanation?: InputMaybe<Scalars['String']>
    providerOption: ParticipationProviderOption
    providerOther?: InputMaybe<Scalars['String']>
    start?: InputMaybe<Scalars['DateTime']>
    startParticipation?: InputMaybe<Scalars['DateTime']>
}

export type CreatePersonInputType = {
    additionalName?: InputMaybe<Scalars['String']>
    address?: InputMaybe<CreateAddressInputType>
    availability?: InputMaybe<Array<Availability>>
    availabilityNotes?: InputMaybe<Scalars['String']>
    birthday?: InputMaybe<Scalars['String']>
    birthplace?: InputMaybe<Scalars['String']>
    children?: InputMaybe<Scalars['Int']>
    contactPreference?: InputMaybe<ContactPreference>
    contactPreferenceOther?: InputMaybe<Scalars['String']>
    didSignPermissionForm?: InputMaybe<Scalars['Boolean']>
    educations?: InputMaybe<Array<CreateEducationInputType>>
    email?: InputMaybe<Scalars['String']>
    emergencyTelephone?: InputMaybe<Scalars['String']>
    familyName?: InputMaybe<Scalars['String']>
    gender?: InputMaybe<Gender>
    givenName?: InputMaybe<Scalars['String']>
    hasPermissionToSendInformationAboutLibraries?: InputMaybe<Scalars['Boolean']>
    hasPermissionToShareDataWithLibraries?: InputMaybe<Scalars['Boolean']>
    hasPermissionToShareDataWithProviders?: InputMaybe<Scalars['Boolean']>
    maritalStatus?: InputMaybe<MaritalStatus>
    primaryLanguage?: InputMaybe<Scalars['String']>
    providerLanguageHouseVolunteeringReference?: InputMaybe<Scalars['String']>
    providerTargetGroupExperience?: InputMaybe<Scalars['String']>
    providerTargetGroupIsExperienced?: InputMaybe<Scalars['Boolean']>
    providerTargetGroupPreference?: InputMaybe<Array<ProviderTargetGroupPreference>>
    providerVolunteeringPreference?: InputMaybe<Scalars['String']>
    secondaryEmail?: InputMaybe<Scalars['String']>
    spokenLanguages?: InputMaybe<Scalars['String']>
    telephone?: InputMaybe<Scalars['String']>
}

export type CreateRegistrationInputType = {
    dayTimeActivities?: InputMaybe<Array<IntakeDayTimeActivities>>
    dayTimeActivitiesOther?: InputMaybe<Scalars['String']>
    desiredLearningMethod?: InputMaybe<Array<DesiredLearningMethod>>
    desiredLearningNeedOutcome?: InputMaybe<CreateLearningNeedOutcomeInputType>
    desiredSkillsOther?: InputMaybe<Scalars['String']>
    dutchNTLevel?: InputMaybe<DutchNtType>
    foundVia?: InputMaybe<IntakeFoundVia>
    foundViaOther?: InputMaybe<Scalars['String']>
    hasTriedThisBefore?: InputMaybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: InputMaybe<Scalars['String']>
    inNetherlandsSinceYear?: InputMaybe<Scalars['Int']>
    knowsLatinAlphabet?: InputMaybe<Scalars['Boolean']>
    languageInDailyLife?: InputMaybe<Scalars['String']>
    lastJob?: InputMaybe<Scalars['String']>
    lastKnownLevel?: InputMaybe<DutchNt2Level>
    network?: InputMaybe<Array<IntakeNetwork>>
    participationLadder?: InputMaybe<IntakeParticipationLadder>
    readingTestResult?: InputMaybe<ReadingTestResult>
    referringOrganization?: InputMaybe<ReferringOrganizationEnum>
    referringOrganizationOther?: InputMaybe<Scalars['String']>
    referringPerson?: InputMaybe<CreatePersonInputType>
    referringTeam?: InputMaybe<Scalars['String']>
    remarks?: InputMaybe<Scalars['String']>
    speakingLevel?: InputMaybe<SpeakingLevel>
    trainedForJob?: InputMaybe<Scalars['String']>
    wentToLanguageHouseBefore?: InputMaybe<Scalars['Boolean']>
    wentToLanguageHouseBeforeReason?: InputMaybe<Scalars['String']>
    wentToLanguageHouseBeforeYear?: InputMaybe<Scalars['Int']>
    whyWantTheseskills?: InputMaybe<Scalars['String']>
    whyWantThisNow?: InputMaybe<Scalars['String']>
    writingTestResult?: InputMaybe<WritingTestResult>
}

export type CreateStudentContactMomentInputType = {
    date: Scalars['DateTime']
    explanation: Scalars['String']
    student: Scalars['ID']
    type: StudentContactMomentContactType
}

export type CreateStudentInput = {
    civicIntegration: CreateCivicIntegrationInputType
    forSelf?: InputMaybe<Scalars['Boolean']>
    organization: Scalars['String']
    person: CreatePersonInputType
    registration: CreateRegistrationInputType
    team?: InputMaybe<Scalars['String']>
}

export type CreateTeamInputType = {
    memberIds?: InputMaybe<Array<Scalars['ID']>>
    name: Scalars['String']
    organizationId: Scalars['ID']
    postalCodeAreaIds?: InputMaybe<Array<Scalars['ID']>>
}

export type CreateTestResultInputType = {
    achievedResultResponse?: InputMaybe<AchievedResultResponse>
    achievedResultResponseOther?: InputMaybe<Scalars['String']>
    didAchieveResultResponse?: InputMaybe<DidAchieveResultResponse>
    endParticipation?: InputMaybe<Scalars['DateTime']>
    examDate?: InputMaybe<Scalars['DateTime']>
    learningNeedOutcome: CreateLearningNeedOutcomeInputType
    memo?: InputMaybe<Scalars['String']>
    outFlowParticipation?: InputMaybe<ParticipationOutFlow>
    outFlowReasonOther?: InputMaybe<Scalars['String']>
    participationId: Scalars['ID']
    reasonEndParticipation?: InputMaybe<ParticipationEndReason>
    unsuccessfulResultReasonResponse?: InputMaybe<UnsuccessfulResultReasonResponse>
    usedExam?: InputMaybe<Scalars['String']>
}

export type CreateUploadedDocumentInputType = {
    file: UploadedFileInputType
    person: Scalars['String']
}

export type DeleteEducationGroupInputType = {
    educationGroupId: Scalars['ID']
}

export type DeleteParticipationInputType = {
    id: Scalars['String']
}

export type DeleteStudentContactMomentInputType = {
    id: Scalars['String']
}

export type DeleteStudentInputType = {
    id: Scalars['ID']
}

export type DeleteTeamInputType = {
    id: Scalars['ID']
}

export type DeleteTestResultInputType = {
    id: Scalars['ID']
}

export type DeleteUploadedDocumentInputType = {
    document: Scalars['String']
}

export enum DesiredLearningMethod {
    HomeEnvironment = 'homeEnvironment',
    InAGroup = 'inAGroup',
    InLibraryOrOther = 'inLibraryOrOther',
    OneOnOne = 'oneOnOne',
    Online = 'online',
}

export enum DidAchieveResultResponse {
    No = 'no',
    Partly = 'partly',
    Yes = 'yes',
}

export enum DutchNt2Level {
    A0 = 'a0',
    A1 = 'a1',
    A2 = 'a2',
    B1 = 'b1',
    B2 = 'b2',
    C1 = 'c1',
    C2 = 'c2',
    Unknown = 'unknown',
}

export enum DutchNtType {
    Nt1 = 'nt1',
    Nt2 = 'nt2',
}

export type EditAddressInputType = {
    country?: InputMaybe<Scalars['String']>
    houseNumber?: InputMaybe<Scalars['String']>
    houseNumberSuffix?: InputMaybe<Scalars['String']>
    locality?: InputMaybe<Scalars['String']>
    name?: InputMaybe<Scalars['String']>
    postalCode?: InputMaybe<Scalars['String']>
    street?: InputMaybe<Scalars['String']>
}

export type EditEducationGroupInputType = {
    availability?: InputMaybe<Array<Availability>>
    availabilityNotes?: InputMaybe<Scalars['String']>
    degree?: InputMaybe<Scalars['Boolean']>
    desiredLearningNeedOutcome?: InputMaybe<CreateOrEditLearningNeedOutcomeInputType>
    educationGroupId: Scalars['ID']
    employees?: InputMaybe<Array<Scalars['ID']>>
    end?: InputMaybe<Scalars['DateTime']>
    evaluation?: InputMaybe<Scalars['String']>
    formality?: InputMaybe<GroupFormality>
    lessonHours?: InputMaybe<Scalars['Float']>
    location?: InputMaybe<Scalars['String']>
    maximumParticipants?: InputMaybe<Scalars['Float']>
    minimumParticipants?: InputMaybe<Scalars['Float']>
    name?: InputMaybe<Scalars['String']>
    participation?: InputMaybe<EditParticipationInputType>
    start?: InputMaybe<Scalars['DateTime']>
    type?: InputMaybe<GroupOfferType>
}

export type EditEmployeeInputType = {
    employeeRole?: InputMaybe<EmployeeRole>
    id: Scalars['ID']
    mentees?: InputMaybe<Array<Scalars['ID']>>
    person?: InputMaybe<EditPersonInputType>
}

export type EditLearningNeedInputType = {
    advisedOffer?: InputMaybe<Scalars['String']>
    agreements?: InputMaybe<Scalars['String']>
    description: Scalars['String']
    desiredLearningNeedOutcome?: InputMaybe<CreateOrEditLearningNeedOutcomeInputType>
    desiredOffer?: InputMaybe<Scalars['String']>
    id: Scalars['String']
    motivation: Scalars['String']
    offerDifference?: InputMaybe<OfferDifference>
    offerDifferenceOther?: InputMaybe<Scalars['String']>
}

export type EditNestedCivicIntegrationInputType = {
    finishDate?: InputMaybe<Scalars['String']>
    reason?: InputMaybe<Scalars['String']>
    requirement?: InputMaybe<Scalars['String']>
}

export type EditNestedEducationInputType = {
    courseTeacherType?: InputMaybe<CourseTeacherTypeEnum>
    currentlyFollowingStatus?: InputMaybe<EducationCurrentlyFollowingStatusEnum>
    degree?: InputMaybe<Scalars['Boolean']>
    degreeGranted?: InputMaybe<Scalars['Boolean']>
    endDate?: InputMaybe<Scalars['String']>
    group?: InputMaybe<EducationGroupTypeEnum>
    hours?: InputMaybe<Scalars['Int']>
    id?: InputMaybe<Scalars['String']>
    institution?: InputMaybe<Scalars['String']>
    level?: InputMaybe<EducationLevelEnum>
    levelOther?: InputMaybe<Scalars['String']>
    name?: InputMaybe<EducationNameEnum>
    other?: InputMaybe<Scalars['String']>
    startDate?: InputMaybe<Scalars['String']>
    type?: InputMaybe<EducationTypeEnum>
    yearsFollowed?: InputMaybe<Scalars['Int']>
}

export type EditNestedPersonInputType = {
    additionalName?: InputMaybe<Scalars['String']>
    address?: InputMaybe<CreateAddressInputType>
    availability?: InputMaybe<Array<Availability>>
    availabilityNotes?: InputMaybe<Scalars['String']>
    birthday?: InputMaybe<Scalars['String']>
    birthplace?: InputMaybe<Scalars['String']>
    children?: InputMaybe<Scalars['Int']>
    contactPreference?: InputMaybe<ContactPreference>
    contactPreferenceOther?: InputMaybe<Scalars['String']>
    didSignPermissionForm?: InputMaybe<Scalars['Boolean']>
    educations?: InputMaybe<Array<EditNestedEducationInputType>>
    email?: InputMaybe<Scalars['String']>
    emergencyTelephone?: InputMaybe<Scalars['String']>
    familyName?: InputMaybe<Scalars['String']>
    gender?: InputMaybe<Gender>
    givenName?: InputMaybe<Scalars['String']>
    hasPermissionToSendInformationAboutLibraries?: InputMaybe<Scalars['Boolean']>
    hasPermissionToShareDataWithLibraries?: InputMaybe<Scalars['Boolean']>
    hasPermissionToShareDataWithProviders?: InputMaybe<Scalars['Boolean']>
    maritalStatus?: InputMaybe<MaritalStatus>
    primaryLanguage?: InputMaybe<Scalars['String']>
    providerLanguageHouseVolunteeringReference?: InputMaybe<Scalars['String']>
    providerTargetGroupExperience?: InputMaybe<Scalars['String']>
    providerTargetGroupIsExperienced?: InputMaybe<Scalars['Boolean']>
    providerTargetGroupPreference?: InputMaybe<Array<ProviderTargetGroupPreference>>
    providerVolunteeringPreference?: InputMaybe<Scalars['String']>
    secondaryEmail?: InputMaybe<Scalars['String']>
    spokenLanguages?: InputMaybe<Scalars['String']>
    telephone?: InputMaybe<Scalars['String']>
}

export type EditOrganizationInputType = {
    address?: InputMaybe<EditAddressInputType>
    disabledIntakeFields?: InputMaybe<Array<OrganizationIntakeFields>>
    email?: InputMaybe<Scalars['String']>
    /** Used only to limit provider editing rights at the moment */
    hasLimitedEditRights?: InputMaybe<Scalars['Boolean']>
    id: Scalars['String']
    name?: InputMaybe<Scalars['String']>
    postalCodes?: InputMaybe<Array<Scalars['Int']>>
    providers?: InputMaybe<Array<Scalars['ID']>>
    telephone?: InputMaybe<Scalars['String']>
}

export type EditParticipationInputType = {
    agreement?: InputMaybe<Scalars['String']>
    degree?: InputMaybe<Scalars['Boolean']>
    educationGroup?: InputMaybe<Scalars['ID']>
    end?: InputMaybe<Scalars['DateTime']>
    formality?: InputMaybe<ParticipationFormality>
    groupFormation?: InputMaybe<ParticipationGroupType>
    id: Scalars['ID']
    mentor?: InputMaybe<Scalars['ID']>
    offerLearningNeedOutcome?: InputMaybe<LearningNeedOutcomeInputType>
    offerName?: InputMaybe<Scalars['String']>
    offerType?: InputMaybe<ParticipationOfferType>
    provider?: InputMaybe<Scalars['ID']>
    providerExplanation?: InputMaybe<Scalars['String']>
    providerOption?: InputMaybe<ParticipationProviderOption>
    providerOther?: InputMaybe<Scalars['String']>
    start?: InputMaybe<Scalars['DateTime']>
    startParticipation?: InputMaybe<Scalars['DateTime']>
}

export type EditPersonInputType = {
    additionalName?: InputMaybe<Scalars['String']>
    address?: InputMaybe<CreateAddressInputType>
    availability?: InputMaybe<Array<Availability>>
    availabilityNotes?: InputMaybe<Scalars['String']>
    birthday?: InputMaybe<Scalars['String']>
    birthplace?: InputMaybe<Scalars['String']>
    children?: InputMaybe<Scalars['Int']>
    contactPreference?: InputMaybe<ContactPreference>
    contactPreferenceOther?: InputMaybe<Scalars['String']>
    didSignPermissionForm?: InputMaybe<Scalars['Boolean']>
    educations?: InputMaybe<Array<EditNestedEducationInputType>>
    email?: InputMaybe<Scalars['String']>
    emergencyTelephone?: InputMaybe<Scalars['String']>
    familyName?: InputMaybe<Scalars['String']>
    gender?: InputMaybe<Gender>
    givenName?: InputMaybe<Scalars['String']>
    hasPermissionToSendInformationAboutLibraries?: InputMaybe<Scalars['Boolean']>
    hasPermissionToShareDataWithLibraries?: InputMaybe<Scalars['Boolean']>
    hasPermissionToShareDataWithProviders?: InputMaybe<Scalars['Boolean']>
    id: Scalars['String']
    maritalStatus?: InputMaybe<MaritalStatus>
    primaryLanguage?: InputMaybe<Scalars['String']>
    providerLanguageHouseVolunteeringReference?: InputMaybe<Scalars['String']>
    providerTargetGroupExperience?: InputMaybe<Scalars['String']>
    providerTargetGroupIsExperienced?: InputMaybe<Scalars['Boolean']>
    providerTargetGroupPreference?: InputMaybe<Array<ProviderTargetGroupPreference>>
    providerVolunteeringPreference?: InputMaybe<Scalars['String']>
    secondaryEmail?: InputMaybe<Scalars['String']>
    spokenLanguages?: InputMaybe<Scalars['String']>
    telephone?: InputMaybe<Scalars['String']>
}

export type EditRegistrationInputType = {
    dayTimeActivities?: InputMaybe<Array<IntakeDayTimeActivities>>
    dayTimeActivitiesOther?: InputMaybe<Scalars['String']>
    desiredLearningMethod?: InputMaybe<Array<DesiredLearningMethod>>
    desiredLearningNeedOutcome?: InputMaybe<CreateOrEditLearningNeedOutcomeInputType>
    desiredSkillsOther?: InputMaybe<Scalars['String']>
    dutchNTLevel?: InputMaybe<DutchNtType>
    foundVia?: InputMaybe<IntakeFoundVia>
    foundViaOther?: InputMaybe<Scalars['String']>
    hasTriedThisBefore?: InputMaybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: InputMaybe<Scalars['String']>
    inNetherlandsSinceYear?: InputMaybe<Scalars['Int']>
    knowsLatinAlphabet?: InputMaybe<Scalars['Boolean']>
    languageInDailyLife?: InputMaybe<Scalars['String']>
    lastJob?: InputMaybe<Scalars['String']>
    lastKnownLevel?: InputMaybe<DutchNt2Level>
    network?: InputMaybe<Array<IntakeNetwork>>
    participationLadder?: InputMaybe<IntakeParticipationLadder>
    readingTestResult?: InputMaybe<ReadingTestResult>
    referringOrganization?: InputMaybe<ReferringOrganizationEnum>
    referringOrganizationOther?: InputMaybe<Scalars['String']>
    referringPerson?: InputMaybe<CreatePersonInputType>
    referringTeam?: InputMaybe<Scalars['String']>
    remarks?: InputMaybe<Scalars['String']>
    speakingLevel?: InputMaybe<SpeakingLevel>
    trainedForJob?: InputMaybe<Scalars['String']>
    wentToLanguageHouseBefore?: InputMaybe<Scalars['Boolean']>
    wentToLanguageHouseBeforeReason?: InputMaybe<Scalars['String']>
    wentToLanguageHouseBeforeYear?: InputMaybe<Scalars['Int']>
    whyWantTheseskills?: InputMaybe<Scalars['String']>
    whyWantThisNow?: InputMaybe<Scalars['String']>
    writingTestResult?: InputMaybe<WritingTestResult>
}

export type EditStudentContactMomentInputType = {
    date: Scalars['DateTime']
    explanation: Scalars['String']
    id: Scalars['String']
    type: StudentContactMomentContactType
}

export type EditStudentInput = {
    civicIntegration?: InputMaybe<EditNestedCivicIntegrationInputType>
    id: Scalars['String']
    intakeDate?: InputMaybe<Scalars['DateTime']>
    mentor?: InputMaybe<Scalars['ID']>
    person?: InputMaybe<EditNestedPersonInputType>
    registration?: InputMaybe<EditRegistrationInputType>
    team?: InputMaybe<Scalars['String']>
}

export type EditTeamInputType = {
    hiddenFromPublic?: InputMaybe<Scalars['Boolean']>
    memberIds?: InputMaybe<Array<Scalars['ID']>>
    name?: InputMaybe<Scalars['String']>
    postalCodeAreaIds?: InputMaybe<Array<Scalars['ID']>>
    teamId: Scalars['ID']
}

export type EditTeamsInputType = {
    teams: Array<EditTeamInputType>
}

export type EditTestResultInputType = {
    achievedResultResponse?: InputMaybe<AchievedResultResponse>
    achievedResultResponseOther?: InputMaybe<Scalars['String']>
    didAchieveResultResponse?: InputMaybe<DidAchieveResultResponse>
    endParticipation?: InputMaybe<Scalars['DateTime']>
    examDate?: InputMaybe<Scalars['DateTime']>
    id: Scalars['ID']
    learningNeedOutcome?: InputMaybe<CreateOrEditLearningNeedOutcomeInputType>
    memo?: InputMaybe<Scalars['String']>
    outFlowParticipation?: InputMaybe<ParticipationOutFlow>
    outFlowReasonOther?: InputMaybe<Scalars['String']>
    reasonEndParticipation?: InputMaybe<ParticipationEndReason>
    unsuccessfulResultReasonResponse?: InputMaybe<UnsuccessfulResultReasonResponse>
    usedExam?: InputMaybe<Scalars['String']>
}

export enum EducationCurrentlyFollowingStatusEnum {
    No = 'no',
    NoUntilDate = 'noUntilDate',
    Yes = 'yes',
}

export enum EducationGroupStatus {
    Active = 'active',
    Future = 'future',
    Past = 'past',
}

export type EducationGroupType = {
    __typename?: 'EducationGroupType'
    availability?: Maybe<Array<Availability>>
    availabilityNotes?: Maybe<Scalars['String']>
    createdAt: Scalars['String']
    degree?: Maybe<Scalars['Boolean']>
    desiredLearningNeedOutcome: LearningNeedOutcomeType
    employees?: Maybe<Array<EmployeeType>>
    end?: Maybe<Scalars['String']>
    evaluation?: Maybe<Scalars['String']>
    formality?: Maybe<GroupFormality>
    id: Scalars['ID']
    lessonHours?: Maybe<Scalars['Int']>
    location: Scalars['String']
    maximumParticipants?: Maybe<Scalars['Float']>
    minimumParticipants?: Maybe<Scalars['Float']>
    name: Scalars['String']
    organization: OrganizationType
    participantCount?: Maybe<Scalars['Float']>
    start?: Maybe<Scalars['String']>
    status?: Maybe<EducationGroupStatus>
    type: GroupOfferType
    updatedAt: Scalars['String']
}

export enum EducationGroupTypeEnum {
    Group = 'group',
    Individual = 'individual',
}

export enum EducationLevelEnum {
    BiologicSchool = 'biologicSchool',
    DomesticSchool = 'domesticSchool',
    Havo = 'havo',
    Hbo = 'hbo',
    Lts = 'lts',
    Mavo = 'mavo',
    Mbo = 'mbo',
    Other = 'other',
    Primary = 'primary',
    SpecialEd = 'specialEd',
    Vmbo = 'vmbo',
    Vwo = 'vwo',
    Wo = 'wo',
}

export enum EducationNameEnum {
    Course = 'course',
    CurrentEducation = 'currentEducation',
    LastFollowedEducation = 'lastFollowedEducation',
}

export type EducationType = {
    __typename?: 'EducationType'
    courseTeacherType?: Maybe<CourseTeacherTypeEnum>
    createdAt: Scalars['String']
    currentlyFollowingStatus?: Maybe<EducationCurrentlyFollowingStatusEnum>
    degree?: Maybe<Scalars['Boolean']>
    degreeGranted?: Maybe<Scalars['Boolean']>
    endDate?: Maybe<Scalars['String']>
    group?: Maybe<EducationGroupTypeEnum>
    hours?: Maybe<Scalars['Int']>
    id: Scalars['ID']
    institution?: Maybe<Scalars['String']>
    level?: Maybe<EducationLevelEnum>
    levelOther?: Maybe<Scalars['String']>
    name: EducationNameEnum
    other?: Maybe<Scalars['String']>
    startDate?: Maybe<Scalars['String']>
    type: Scalars['String']
    updatedAt: Scalars['String']
    yearsFollowed?: Maybe<Scalars['Int']>
}

export enum EducationTypeEnum {
    Course = 'course',
    Education = 'education',
}

export enum EmployeeRole {
    Coordinator = 'coordinator',
    CoordinatorMentor = 'coordinatorMentor',
    Employee = 'employee',
    Mentor = 'mentor',
    Volunteer = 'volunteer',
}

export type EmployeeType = {
    __typename?: 'EmployeeType'
    createdAt: Scalars['String']
    educations?: Maybe<Array<EducationType>>
    id: Scalars['ID']
    mentees?: Maybe<Array<StudentType>>
    organization: OrganizationType
    person: PersonType
    role?: Maybe<EmployeeRole>
    teams?: Maybe<Array<TeamType>>
    updatedAt: Scalars['String']
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    X = 'x',
}

export enum GroupFormality {
    Formal = 'formal',
    NonFormal = 'nonFormal',
}

export enum GroupOfferType {
    Digital = 'digital',
    Language = 'language',
    Math = 'math',
    Other = 'other',
}

export type HashInput = {
    hash: Scalars['String']
}

export type HashResponse = {
    __typename?: 'HashResponse'
    hash: Scalars['String']
}

export enum IntakeDayTimeActivities {
    Job = 'job',
    Other = 'other',
    ReIntegration = 'reIntegration',
    School = 'school',
    SearchingForJob = 'searchingForJob',
    VolunteerJob = 'volunteerJob',
}

export enum IntakeFoundVia {
    LibraryWebsite = 'libraryWebsite',
    Newspaper = 'newspaper',
    Other = 'other',
    SocialMedia = 'socialMedia',
    ViaVia = 'viaVia',
    VolunteerCenter = 'volunteerCenter',
}

export enum IntakeNetwork {
    AcquaintancesSpeakingDutch = 'acquaintancesSpeakingDutch',
    AcquaintancesSpeakingOwnLanguage = 'acquaintancesSpeakingOwnLanguage',
    AidWorkers = 'aidWorkers',
    Colleagues = 'colleagues',
    FamilyMembers = 'familyMembers',
    FriendsAcquaintances = 'friendsAcquaintances',
    HouseholdMembers = 'householdMembers',
    Neighbors = 'neighbors',
    PeopleAtMosqueChurch = 'peopleAtMosqueChurch',
}

export enum IntakeParticipationLadder {
    Isolated = 'isolated',
    OrganizedActivityParticipation = 'organizedActivityParticipation',
    Paid = 'paid',
    PaidWithSupport = 'paidWithSupport',
    SocialContactsOutside = 'socialContactsOutside',
    VolunteerWork = 'volunteerWork',
}

export type LearningNeedOutcomeInputType = {
    application?: InputMaybe<LearningResultApplication>
    applicationOther?: InputMaybe<Scalars['String']>
    id?: InputMaybe<Scalars['ID']>
    level?: InputMaybe<LearningResultLevel>
    levelOther?: InputMaybe<Scalars['String']>
    subject?: InputMaybe<LearningResultSubject>
    subjectOther?: InputMaybe<Scalars['String']>
}

export type LearningNeedOutcomeType = {
    __typename?: 'LearningNeedOutcomeType'
    application?: Maybe<LearningResultApplication>
    applicationOther?: Maybe<Scalars['String']>
    createdAt: Scalars['String']
    id: Scalars['ID']
    level?: Maybe<LearningResultLevel>
    levelOther?: Maybe<Scalars['String']>
    subject?: Maybe<LearningResultSubject>
    subjectOther?: Maybe<Scalars['String']>
    updatedAt: Scalars['String']
}

export type LearningNeedType = {
    __typename?: 'LearningNeedType'
    advisedOffer?: Maybe<Scalars['String']>
    agreements?: Maybe<Scalars['String']>
    createdAt: Scalars['String']
    createdByOrganization: OrganizationType
    description: Scalars['String']
    desiredLearningNeedOutcome?: Maybe<LearningNeedOutcomeType>
    desiredOffer?: Maybe<Scalars['String']>
    id: Scalars['ID']
    motivation: Scalars['String']
    offerDifference?: Maybe<OfferDifference>
    offerDifferenceOther?: Maybe<Scalars['String']>
    participations?: Maybe<Array<ParticipationType>>
    student: StudentType
    updatedAt: Scalars['String']
}

export type LearningNeedsSortInputType = {
    learningNeedDescription?: InputMaybe<SortInput>
    organizationName?: InputMaybe<SortInput>
    providerExplanation?: InputMaybe<SortInput>
    providerName?: InputMaybe<SortInput>
}

export enum LearningResultApplication {
    FamilyAndUpbringing = 'familyAndUpbringing',
    HealthAndWellbeing = 'healthAndWellbeing',
    LaborMarketAndWork = 'laborMarketAndWork',
    LivingAndNeighborhood = 'livingAndNeighborhood',
    Other = 'other',
    SelfSustainability = 'selfSustainability',
}

export enum LearningResultLevel {
    Influx = 'influx',
    Nlqf1 = 'nlqf1',
    Nlqf2 = 'nlqf2',
    Nlqf3 = 'nlqf3',
    Nlqf4 = 'nlqf4',
    Other = 'other',
}

export enum LearningResultSubject {
    Attitude = 'attitude',
    Behaviour = 'behaviour',
    DigitalSkills = 'digitalSkills',
    DutchRead = 'dutchRead',
    DutchSpeaking = 'dutchSpeaking',
    DutchWrite = 'dutchWrite',
    Knowledge = 'knowledge',
    Math = 'math',
    Other = 'other',
    Skills = 'skills',
}

export type LoginInput = {
    password: Scalars['String']
    username: Scalars['String']
}

export type LoginResponse = {
    __typename?: 'LoginResponse'
    accessToken: Scalars['String']
    employees: Array<EmployeeType>
    id: Scalars['String']
    locale: Scalars['String']
    person?: Maybe<PersonType>
    refreshToken: Scalars['String']
    username: Scalars['String']
}

export enum MaritalStatus {
    Divorced = 'divorced',
    MarriedPartner = 'marriedPartner',
    Single = 'single',
    Widow = 'widow',
}

export type Mutation = {
    __typename?: 'Mutation'
    acceptRegistration: StudentType
    changePassword: Scalars['Boolean']
    createDocument: UploadedDocumentType
    createEducationGroup: EducationGroupType
    createEmployee: EmployeeType
    createLearningNeed: LearningNeedType
    createOrganization: OrganizationType
    createParticipation: ParticipationType
    createStudent: StudentType
    createStudentContactMoment: StudentContactMomentType
    createTeam: TeamType
    createTestResult: TestResultType
    deleteDocument: Scalars['Boolean']
    deleteEducationGroup: Scalars['Boolean']
    deleteEmployee: Scalars['Boolean']
    deleteLearningNeed: Scalars['Boolean']
    deleteOrganization: Scalars['Boolean']
    deleteParticipation: Scalars['Boolean']
    deleteStudent: Scalars['Boolean']
    deleteStudentContactMoment: Scalars['Boolean']
    deleteTeam: Scalars['Boolean']
    deleteTestResult: Scalars['Boolean']
    editEducationGroup: EducationGroupType
    editEmployee: EmployeeType
    editLearningNeed: LearningNeedType
    editOrganization: OrganizationType
    editParticipation: ParticipationType
    editStudent: StudentType
    editStudentContactMoment: StudentContactMomentType
    editTeam: TeamType
    editTeams: Array<TeamType>
    editTestResult: TestResultType
    forgotPassword: Scalars['Boolean']
    login: LoginResponse
    refreshToken: RefreshTokenResponse
    registerStudent: Scalars['Boolean']
    rejectRegistration: Scalars['Boolean']
    resetPassword: ResetPasswordResponse
}

export type MutationAcceptRegistrationArgs = {
    studentId: Scalars['String']
}

export type MutationChangePasswordArgs = {
    newPassword: Scalars['String']
    oldPassword: Scalars['String']
}

export type MutationCreateDocumentArgs = {
    input: CreateUploadedDocumentInputType
}

export type MutationCreateEducationGroupArgs = {
    input: CreateEducationGroupInputType
}

export type MutationCreateEmployeeArgs = {
    createEmployeeInput: CreateEmployeeInputType
}

export type MutationCreateLearningNeedArgs = {
    input: CreateLearningNeedInputType
}

export type MutationCreateOrganizationArgs = {
    input: CreateOrganizationInputType
}

export type MutationCreateParticipationArgs = {
    input: CreateParticipationInputType
}

export type MutationCreateStudentArgs = {
    createStudentInput: CreateStudentInput
}

export type MutationCreateStudentContactMomentArgs = {
    input: CreateStudentContactMomentInputType
}

export type MutationCreateTeamArgs = {
    input: CreateTeamInputType
}

export type MutationCreateTestResultArgs = {
    input: CreateTestResultInputType
}

export type MutationDeleteDocumentArgs = {
    input: DeleteUploadedDocumentInputType
}

export type MutationDeleteEducationGroupArgs = {
    input: DeleteEducationGroupInputType
}

export type MutationDeleteEmployeeArgs = {
    id: Scalars['String']
}

export type MutationDeleteLearningNeedArgs = {
    id: Scalars['String']
}

export type MutationDeleteOrganizationArgs = {
    id: Scalars['String']
}

export type MutationDeleteParticipationArgs = {
    input: DeleteParticipationInputType
}

export type MutationDeleteStudentArgs = {
    input: DeleteStudentInputType
}

export type MutationDeleteStudentContactMomentArgs = {
    input: DeleteStudentContactMomentInputType
}

export type MutationDeleteTeamArgs = {
    input: DeleteTeamInputType
}

export type MutationDeleteTestResultArgs = {
    input: DeleteTestResultInputType
}

export type MutationEditEducationGroupArgs = {
    input: EditEducationGroupInputType
}

export type MutationEditEmployeeArgs = {
    editEmployeeInput: EditEmployeeInputType
}

export type MutationEditLearningNeedArgs = {
    input: EditLearningNeedInputType
}

export type MutationEditOrganizationArgs = {
    input: EditOrganizationInputType
}

export type MutationEditParticipationArgs = {
    input: EditParticipationInputType
}

export type MutationEditStudentArgs = {
    editStudentInput: EditStudentInput
}

export type MutationEditStudentContactMomentArgs = {
    input: EditStudentContactMomentInputType
}

export type MutationEditTeamArgs = {
    input: EditTeamInputType
}

export type MutationEditTeamsArgs = {
    input: EditTeamsInputType
}

export type MutationEditTestResultArgs = {
    input: EditTestResultInputType
}

export type MutationForgotPasswordArgs = {
    email: Scalars['String']
}

export type MutationLoginArgs = {
    credentials: LoginInput
}

export type MutationRefreshTokenArgs = {
    refreshToken: Scalars['String']
}

export type MutationRegisterStudentArgs = {
    registerStudentInput: RegisterStudentInput
}

export type MutationRejectRegistrationArgs = {
    studentId: Scalars['String']
}

export type MutationResetPasswordArgs = {
    resetPasswordInput: ResetPasswordInput
}

export enum OfferDifference {
    No = 'no',
    YesNotOfferedInTravelRange = 'yesNotOfferedInTravelRange',
    YesOther = 'yesOther',
    YesQueue = 'yesQueue',
}

export type OrganizationEmployeesSortInputType = {
    createdAt?: InputMaybe<SortInput>
    familyName?: InputMaybe<SortInput>
    givenName?: InputMaybe<SortInput>
    updatedAt?: InputMaybe<SortInput>
}

export type OrganizationFiltersInputType = {
    providersFor?: InputMaybe<Scalars['ID']>
}

export enum OrganizationIntakeFields {
    Availability = 'availability',
    Background = 'background',
    ContactData = 'contactData',
    Course = 'course',
    DutchNt = 'dutchNT',
    Education = 'education',
    Employment = 'employment',
    General = 'general',
    IntegrationMandatory = 'integrationMandatory',
    Level = 'level',
    Motivation = 'motivation',
    ReadingTest = 'readingTest',
    Referer = 'referer',
    WritingTest = 'writingTest',
}

export type OrganizationType = {
    __typename?: 'OrganizationType'
    address?: Maybe<AddressType>
    createdAt: Scalars['String']
    description?: Maybe<Scalars['String']>
    disabledIntakeFields?: Maybe<Array<OrganizationIntakeFields>>
    email?: Maybe<Scalars['String']>
    employees?: Maybe<Array<EmployeeType>>
    hasLimitedEditRights?: Maybe<Scalars['Boolean']>
    id: Scalars['ID']
    isLanguageHouseProvider?: Maybe<Scalars['Boolean']>
    name: Scalars['String']
    postalCodes?: Maybe<Array<PostalCodeAreaType>>
    slug: Scalars['String']
    students?: Maybe<Array<StudentType>>
    telephone?: Maybe<Scalars['String']>
    type: OrganizationTypeEnum
    updatedAt: Scalars['String']
}

export type OrganizationTypeIsLanguageHouseProviderArgs = {
    languageHouseId: Scalars['String']
}

export enum OrganizationTypeEnum {
    Bisc = 'bisc',
    LanguageHouse = 'languageHouse',
    Provider = 'provider',
}

export type OrganizationsSortInputType = {
    locality?: InputMaybe<SortInput>
    name?: InputMaybe<SortInput>
    street?: InputMaybe<SortInput>
}

export type PaginatedEducationGroupType = {
    __typename?: 'PaginatedEducationGroupType'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<EducationGroupType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedEmployeeResponse = {
    __typename?: 'PaginatedEmployeeResponse'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<EmployeeType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedInputType = {
    skip?: InputMaybe<Scalars['Int']>
    take?: InputMaybe<Scalars['Int']>
}

export type PaginatedLearningNeedResponse = {
    __typename?: 'PaginatedLearningNeedResponse'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<LearningNeedType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedOrganisationResponse = {
    __typename?: 'PaginatedOrganisationResponse'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<OrganizationType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedParticipationResponse = {
    __typename?: 'PaginatedParticipationResponse'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<ParticipationType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedPostalCodeAreaResponse = {
    __typename?: 'PaginatedPostalCodeAreaResponse'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<PostalCodeAreaType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedStudentContactMomentResponse = {
    __typename?: 'PaginatedStudentContactMomentResponse'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<StudentContactMomentType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedStudentResponse = {
    __typename?: 'PaginatedStudentResponse'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<StudentType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedTeamResponse = {
    __typename?: 'PaginatedTeamResponse'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<TeamType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedTestResultResponse = {
    __typename?: 'PaginatedTestResultResponse'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<TestResultType>
    totalCount?: Maybe<Scalars['Int']>
}

export type PaginatedUploadedDocumentType = {
    __typename?: 'PaginatedUploadedDocumentType'
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<UploadedDocumentType>
    totalCount?: Maybe<Scalars['Int']>
}

export enum ParticipationEndReason {
    CompletedSuccessfully = 'completedSuccessfully',
    Deceased = 'deceased',
    DoesNotMeetExpectations = 'doesNotMeetExpectations',
    Family = 'family',
    Health = 'health',
    Moved = 'moved',
    Other = 'other',
    Work = 'work',
}

export enum ParticipationFormality {
    Formal = 'formal',
    NonFormal = 'nonFormal',
}

export enum ParticipationGroupType {
    Group = 'group',
    Individually = 'individually',
}

export enum ParticipationOfferType {
    Digital = 'digital',
    Language = 'language',
    Math = 'math',
    Other = 'other',
}

export enum ParticipationOutFlow {
    FormalFollowUp = 'formalFollowUp',
    NonFormalFollowUp = 'nonFormalFollowUp',
    Other = 'other',
    Study = 'study',
    Unknown = 'unknown',
    VolunteerWork = 'volunteerWork',
    Work = 'work',
}

export enum ParticipationProviderOption {
    Other = 'other',
    Provider = 'provider',
}

export type ParticipationProviderOrganizationType = {
    __typename?: 'ParticipationProviderOrganizationType'
    id: Scalars['ID']
    name: Scalars['String']
}

export enum ParticipationStatus {
    AutoCreated = 'autoCreated',
    Finished = 'finished',
    Ongoing = 'ongoing',
    Referred = 'referred',
}

export type ParticipationType = {
    __typename?: 'ParticipationType'
    agreement?: Maybe<Scalars['String']>
    createdAt: Scalars['String']
    degree?: Maybe<Scalars['Boolean']>
    educationGroup?: Maybe<EducationGroupType>
    end?: Maybe<Scalars['String']>
    endParticipation?: Maybe<Scalars['String']>
    formality?: Maybe<ParticipationFormality>
    groupFormation?: Maybe<ParticipationGroupType>
    id: Scalars['ID']
    learningNeed: LearningNeedType
    mentor?: Maybe<EmployeeType>
    offerLearningNeedOutcome?: Maybe<LearningNeedOutcomeType>
    offerName?: Maybe<Scalars['String']>
    offerType?: Maybe<ParticipationOfferType>
    outFlowParticipation?: Maybe<ParticipationOutFlow>
    outFlowReasonOther?: Maybe<Scalars['String']>
    provider?: Maybe<OrganizationType>
    providerExplanation?: Maybe<Scalars['String']>
    providerOption?: Maybe<ParticipationProviderOption>
    providerOther?: Maybe<Scalars['String']>
    reasonEndParticipation?: Maybe<ParticipationEndReason>
    start?: Maybe<Scalars['String']>
    startParticipation?: Maybe<Scalars['String']>
    status: ParticipationStatus
    testResult?: Maybe<TestResultType>
    updatedAt: Scalars['String']
}

export type PersonType = {
    __typename?: 'PersonType'
    additionalName?: Maybe<Scalars['String']>
    address?: Maybe<AddressType>
    availability?: Maybe<Array<Availability>>
    availabilityNotes?: Maybe<Scalars['String']>
    birthday?: Maybe<Scalars['String']>
    birthplace?: Maybe<Scalars['String']>
    children?: Maybe<Scalars['Int']>
    contactPreference?: Maybe<ContactPreference>
    contactPreferenceOther?: Maybe<Scalars['String']>
    createdAt: Scalars['String']
    didSignPermissionForm: Scalars['Boolean']
    educations: Array<EducationType>
    email?: Maybe<Scalars['String']>
    emergencyTelephone?: Maybe<Scalars['String']>
    employees?: Maybe<Array<EmployeeType>>
    familyName?: Maybe<Scalars['String']>
    gender?: Maybe<Gender>
    givenName?: Maybe<Scalars['String']>
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToShareDataWithProviders: Scalars['Boolean']
    id: Scalars['ID']
    maritalStatus?: Maybe<MaritalStatus>
    primaryLanguage?: Maybe<Scalars['String']>
    providerLanguageHouseVolunteeringReference?: Maybe<Scalars['String']>
    providerTargetGroupExperience?: Maybe<Scalars['String']>
    providerTargetGroupIsExperienced?: Maybe<Scalars['Boolean']>
    providerTargetGroupPreference?: Maybe<Array<ProviderTargetGroupPreference>>
    providerVolunteeringPreference?: Maybe<Scalars['String']>
    secondaryEmail?: Maybe<Scalars['String']>
    spokenLanguages?: Maybe<Scalars['String']>
    student?: Maybe<StudentType>
    telephone?: Maybe<Scalars['String']>
    updatedAt: Scalars['String']
    user?: Maybe<UserType>
}

export type PostalCodeAreaType = {
    __typename?: 'PostalCodeAreaType'
    code: Scalars['Int']
    createdAt: Scalars['String']
    id: Scalars['String']
    updatedAt: Scalars['String']
}

export enum ProviderTargetGroupPreference {
    Nt1 = 'NT1',
    Nt2 = 'NT2',
}

export type PublicOrganizationType = {
    __typename?: 'PublicOrganizationType'
    id: Scalars['ID']
    name: Scalars['String']
    teams: Array<PublicTeamType>
}

export type PublicTeamType = {
    __typename?: 'PublicTeamType'
    id: Scalars['ID']
    name: Scalars['String']
}

export type Query = {
    __typename?: 'Query'
    availablePostalCodes: PaginatedPostalCodeAreaResponse
    currentUser?: Maybe<UserType>
    document: UploadedDocumentType
    documents: PaginatedUploadedDocumentType
    doesEmailExist: Scalars['Boolean']
    doesPersonEmailExist: Scalars['Boolean']
    educationGroup: EducationGroupType
    educationGroups: PaginatedEducationGroupType
    employee: EmployeeType
    hashSomething: HashResponse
    learningNeed: LearningNeedType
    learningNeeds: PaginatedLearningNeedResponse
    organization: OrganizationType
    organizationEmployees: PaginatedEmployeeResponse
    organizations: PaginatedOrganisationResponse
    participation: ParticipationType
    participationProviderOrganizations: Array<ParticipationProviderOrganizationType>
    participations: PaginatedParticipationResponse
    postalCodeAreasForOrganization: PaginatedPostalCodeAreaResponse
    providerStudents: PaginatedStudentResponse
    publicOrganizations: Array<PublicOrganizationType>
    publicTeamsForOrganization: Array<PublicTeamType>
    student: StudentType
    studentContactMoment: StudentContactMomentType
    studentContactMoments: PaginatedStudentContactMomentResponse
    studentParticipations: PaginatedParticipationResponse
    students: PaginatedStudentResponse
    team: TeamType
    teams: PaginatedTeamResponse
    testResult: TestResultType
    testResults: PaginatedTestResultResponse
}

export type QueryAvailablePostalCodesArgs = {
    paginationArgs: PaginatedInputType
    search?: InputMaybe<Scalars['String']>
}

export type QueryDocumentArgs = {
    document: Scalars['String']
}

export type QueryDocumentsArgs = {
    paginationArgs: PaginatedInputType
    person: Scalars['String']
    sort?: InputMaybe<UploadedDocumentSortInputType>
}

export type QueryDoesEmailExistArgs = {
    email: Scalars['String']
}

export type QueryDoesPersonEmailExistArgs = {
    email: Scalars['String']
}

export type QueryEducationGroupArgs = {
    educationGroupId: Scalars['ID']
}

export type QueryEducationGroupsArgs = {
    oneOfStatuses?: InputMaybe<Array<EducationGroupStatus>>
    organizationId: Scalars['ID']
    paginationArgs: PaginatedInputType
    status?: InputMaybe<EducationGroupStatus>
}

export type QueryEmployeeArgs = {
    id: Scalars['String']
}

export type QueryHashSomethingArgs = {
    input: HashInput
}

export type QueryLearningNeedArgs = {
    id: Scalars['String']
}

export type QueryLearningNeedsArgs = {
    paginationArgs: PaginatedInputType
    sort?: InputMaybe<LearningNeedsSortInputType>
    studentId: Scalars['String']
}

export type QueryOrganizationArgs = {
    id: Scalars['String']
}

export type QueryOrganizationEmployeesArgs = {
    oneOfRoles?: InputMaybe<Array<EmployeeRole>>
    organizationId: Scalars['ID']
    paginationArgs: PaginatedInputType
    role?: InputMaybe<EmployeeRole>
    sort?: InputMaybe<OrganizationEmployeesSortInputType>
    teamId?: InputMaybe<Scalars['ID']>
}

export type QueryOrganizationsArgs = {
    filters?: InputMaybe<OrganizationFiltersInputType>
    paginationArgs: PaginatedInputType
    sort?: InputMaybe<OrganizationsSortInputType>
    type: Scalars['String']
}

export type QueryParticipationArgs = {
    participationId: Scalars['String']
}

export type QueryParticipationsArgs = {
    learningNeedId: Scalars['String']
    paginationArgs: PaginatedInputType
}

export type QueryPostalCodeAreasForOrganizationArgs = {
    hasNoTeam?: InputMaybe<Scalars['Boolean']>
    organizationId: Scalars['String']
    paginationArgs: PaginatedInputType
}

export type QueryProviderStudentsArgs = {
    educationGroupId?: InputMaybe<Scalars['String']>
    mentorId?: InputMaybe<Scalars['String']>
    newOrReferred?: InputMaybe<Scalars['Boolean']>
    paginationArgs: PaginatedInputType
    participationStatus?: InputMaybe<ParticipationStatus>
    searchName?: InputMaybe<Scalars['String']>
    sort?: InputMaybe<StudentsSortInputType>
}

export type QueryPublicTeamsForOrganizationArgs = {
    organizationId: Scalars['ID']
}

export type QueryStudentArgs = {
    studentId: Scalars['String']
}

export type QueryStudentContactMomentArgs = {
    studentContactMomentId: Scalars['String']
}

export type QueryStudentContactMomentsArgs = {
    paginationArgs: PaginatedInputType
    sort?: InputMaybe<StudentContactMomentsSortInputType>
    studentId: Scalars['String']
}

export type QueryStudentParticipationsArgs = {
    paginationArgs: PaginatedInputType
    sort?: InputMaybe<StudentParticipationSortInputType>
    studentId: Scalars['String']
}

export type QueryStudentsArgs = {
    educationGroupId?: InputMaybe<Scalars['String']>
    mentorEmployeeId?: InputMaybe<Scalars['String']>
    organizationId: Scalars['String']
    paginationArgs: PaginatedInputType
    participationStatus?: InputMaybe<ParticipationStatus>
    searchName?: InputMaybe<Scalars['String']>
    sort?: InputMaybe<StudentsSortInputType>
    status?: InputMaybe<Scalars['String']>
    team?: InputMaybe<Scalars['String']>
}

export type QueryTeamArgs = {
    teamId: Scalars['ID']
}

export type QueryTeamsArgs = {
    filterForEmployeeId?: InputMaybe<Scalars['ID']>
    organizationId: Scalars['ID']
    paginationArgs: PaginatedInputType
    sort?: InputMaybe<TeamsSortInputType>
}

export type QueryTestResultArgs = {
    testResultId: Scalars['String']
}

export type QueryTestResultsArgs = {
    paginationArgs: PaginatedInputType
    participationId: Scalars['String']
}

export enum ReadingTestResult {
    A0 = 'a0',
    A1 = 'a1',
    A2 = 'a2',
    B1 = 'b1',
    B2 = 'b2',
    C1 = 'c1',
    C2 = 'c2',
    CanNotRead = 'canNotRead',
}

export enum ReferringOrganizationEnum {
    LanguageProvider = 'languageProvider',
    Library = 'library',
    NeighborhoodTeam = 'neighborhoodTeam',
    Other = 'other',
    SocialService = 'socialService',
    Uwv = 'uwv',
    VolunteerOrganization = 'volunteerOrganization',
    WelfareWork = 'welfareWork',
}

export type RefreshTokenResponse = {
    __typename?: 'RefreshTokenResponse'
    accessToken: Scalars['String']
    refreshToken: Scalars['String']
}

export type RegisterStudentInput = {
    forSelf?: InputMaybe<Scalars['Boolean']>
    organization: Scalars['String']
    person: CreatePersonInputType
    registration: CreateRegistrationInputType
    team?: InputMaybe<Scalars['String']>
}

export enum RegistrationStatus {
    Accepted = 'accepted',
    Pending = 'pending',
    Rejected = 'rejected',
}

export type RegistrationType = {
    __typename?: 'RegistrationType'
    createdAt: Scalars['String']
    dayTimeActivities?: Maybe<Array<IntakeDayTimeActivities>>
    dayTimeActivitiesOther?: Maybe<Scalars['String']>
    desiredLearningMethod?: Maybe<Array<DesiredLearningMethod>>
    desiredLearningNeedOutcome?: Maybe<LearningNeedOutcomeType>
    desiredSkillsOther?: Maybe<Scalars['String']>
    dutchNTLevel?: Maybe<DutchNtType>
    foundVia?: Maybe<IntakeFoundVia>
    foundViaOther?: Maybe<Scalars['String']>
    hasTriedThisBefore?: Maybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: Maybe<Scalars['String']>
    id: Scalars['ID']
    inNetherlandsSinceYear?: Maybe<Scalars['Int']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    languageInDailyLife?: Maybe<Scalars['String']>
    lastJob?: Maybe<Scalars['String']>
    lastKnownLevel?: Maybe<DutchNt2Level>
    network?: Maybe<Array<IntakeNetwork>>
    participationLadder?: Maybe<IntakeParticipationLadder>
    readingTestResult?: Maybe<ReadingTestResult>
    referringOrganization?: Maybe<ReferringOrganizationEnum>
    referringOrganizationOther?: Maybe<Scalars['String']>
    referringPerson?: Maybe<PersonType>
    referringTeam?: Maybe<Scalars['String']>
    registeredPublicly: Scalars['Boolean']
    remarks?: Maybe<Scalars['String']>
    selfRegistered?: Maybe<Scalars['Boolean']>
    speakingLevel?: Maybe<SpeakingLevel>
    status: RegistrationStatus
    trainedForJob?: Maybe<Scalars['String']>
    updatedAt: Scalars['String']
    wentToLanguageHouseBefore?: Maybe<Scalars['Boolean']>
    wentToLanguageHouseBeforeReason?: Maybe<Scalars['String']>
    wentToLanguageHouseBeforeYear?: Maybe<Scalars['Int']>
    whyWantTheseskills?: Maybe<Scalars['String']>
    whyWantThisNow?: Maybe<Scalars['String']>
    writingTestResult?: Maybe<WritingTestResult>
}

export type ResetPasswordInput = {
    password: Scalars['String']
    token: Scalars['String']
    username: Scalars['String']
}

export type ResetPasswordResponse = {
    __typename?: 'ResetPasswordResponse'
    username: Scalars['String']
}

export enum SortInput {
    Asc = 'ASC',
    Desc = 'DESC',
}

export enum SpeakingLevel {
    Advanced = 'advanced',
    Beginner = 'beginner',
    Reasonable = 'reasonable',
}

export enum StudentContactMomentContactType {
    FinalTalk = 'finalTalk',
    FollowUp = 'followUp',
    Intake = 'intake',
    Remark = 'remark',
    StoryTelling = 'storyTelling',
}

export type StudentContactMomentType = {
    __typename?: 'StudentContactMomentType'
    /** Can the current user edit this student contact moment? */
    canEdit: Scalars['Boolean']
    createdAt: Scalars['String']
    createdByEmployee?: Maybe<EmployeeType>
    date: Scalars['String']
    explanation: Scalars['String']
    id: Scalars['ID']
    student: StudentType
    type: StudentContactMomentContactType
    updatedAt: Scalars['String']
}

export type StudentContactMomentsSortInputType = {
    date?: InputMaybe<SortInput>
    type?: InputMaybe<SortInput>
}

export type StudentParticipationSortInputType = {
    learningNeedDescription?: InputMaybe<SortInput>
}

export type StudentType = {
    __typename?: 'StudentType'
    /** Can the current user create contact moments for this student? */
    canCreateContactMoment: Scalars['Boolean']
    civicIntegration?: Maybe<CivicIntegrationType>
    createdAt: Scalars['String']
    id: Scalars['ID']
    intakeDate: Scalars['String']
    learningNeeds?: Maybe<Array<LearningNeedType>>
    mentor?: Maybe<EmployeeType>
    organization: OrganizationType
    person: PersonType
    registration: RegistrationType
    team?: Maybe<TeamType>
    updatedAt: Scalars['String']
}

export type StudentsSortInputType = {
    familyName?: InputMaybe<SortInput>
    givenName?: InputMaybe<SortInput>
    intakeDate?: InputMaybe<SortInput>
    mentor?: InputMaybe<SortInput>
    referringOrganizationOther?: InputMaybe<SortInput>
    teamName?: InputMaybe<SortInput>
}

export type TeamType = {
    __typename?: 'TeamType'
    createdAt: Scalars['String']
    hiddenFromPublic?: Maybe<Scalars['Boolean']>
    id: Scalars['ID']
    members: Array<EmployeeType>
    name: Scalars['String']
    parentOrganization: OrganizationType
    postalCodeAreas: Array<PostalCodeAreaType>
    students?: Maybe<Array<StudentType>>
    updatedAt: Scalars['String']
}

export type TeamsSortInputType = {
    employeeCount?: InputMaybe<SortInput>
    name?: InputMaybe<SortInput>
}

export type TestResultType = {
    __typename?: 'TestResultType'
    achievedResultResponse?: Maybe<AchievedResultResponse>
    achievedResultResponseOther?: Maybe<Scalars['String']>
    createdAt: Scalars['String']
    didAchieveResultResponse?: Maybe<DidAchieveResultResponse>
    examDate?: Maybe<Scalars['String']>
    id: Scalars['ID']
    learningNeedOutcome: LearningNeedOutcomeType
    memo?: Maybe<Scalars['String']>
    participation: ParticipationType
    unsuccessfulResultReasonResponse?: Maybe<UnsuccessfulResultReasonResponse>
    updatedAt: Scalars['String']
    usedExam?: Maybe<Scalars['String']>
}

export enum UnsuccessfulResultReasonResponse {
    NotNeeded = 'notNeeded',
    Quit = 'quit',
    TooDifficult = 'tooDifficult',
}

export type UploadedDocumentSortInputType = {
    createdAt?: InputMaybe<SortInput>
    fileName?: InputMaybe<SortInput>
}

export type UploadedDocumentType = {
    __typename?: 'UploadedDocumentType'
    createdAt: Scalars['String']
    createdByUser: UserType
    file: UploadedFileType
    id: Scalars['ID']
    person: PersonType
    updatedAt: Scalars['String']
}

export type UploadedFileInputType = {
    base64: Scalars['String']
    filename: Scalars['String']
}

export type UploadedFileType = {
    __typename?: 'UploadedFileType'
    base64: Scalars['String']
    extension: Scalars['String']
    mimeType: Scalars['String']
    name: Scalars['String']
    size: Scalars['String']
}

export type UserType = {
    __typename?: 'UserType'
    createdAt: Scalars['String']
    /** the current employee for the logged in user */
    currentEmployee?: Maybe<EmployeeType>
    id: Scalars['String']
    locale: Scalars['String']
    person?: Maybe<PersonType>
    updatedAt: Scalars['String']
    username: Scalars['String']
}

export enum WritingTestResult {
    CanNotWrite = 'canNotWrite',
    WriteNawDetails = 'writeNawDetails',
    WriteSimpleLetters = 'writeSimpleLetters',
    WriteSimpleTexts = 'writeSimpleTexts',
}

export type ProviderMentorFormFieldsFragmentFragment = {
    __typename?: 'EmployeeType'
    id: string
    role?: EmployeeRole | null
    createdAt: string
    updatedAt: string
    person: {
        __typename?: 'PersonType'
        id: string
        familyName?: string | null
        givenName?: string | null
        additionalName?: string | null
        email?: string | null
        telephone?: string | null
        gender?: Gender | null
        birthday?: string | null
        birthplace?: string | null
        emergencyTelephone?: string | null
        contactPreference?: ContactPreference | null
        contactPreferenceOther?: string | null
        providerTargetGroupPreference?: Array<ProviderTargetGroupPreference> | null
        providerVolunteeringPreference?: string | null
        providerLanguageHouseVolunteeringReference?: string | null
        providerTargetGroupIsExperienced?: boolean | null
        providerTargetGroupExperience?: string | null
        availabilityNotes?: string | null
        availability?: Array<Availability> | null
        address?: {
            __typename?: 'AddressType'
            id: string
            street?: string | null
            houseNumber?: string | null
            houseNumberSuffix?: string | null
            postalCode?: string | null
            locality?: string | null
            country?: string | null
        } | null
        educations: Array<{
            __typename?: 'EducationType'
            id: string
            createdAt: string
            updatedAt: string
            name: EducationNameEnum
            type: string
            level?: EducationLevelEnum | null
            levelOther?: string | null
            degree?: boolean | null
            degreeGranted?: boolean | null
            currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum | null
            startDate?: string | null
            endDate?: string | null
            yearsFollowed?: number | null
            institution?: string | null
            group?: EducationGroupTypeEnum | null
            courseTeacherType?: CourseTeacherTypeEnum | null
            hours?: number | null
            other?: string | null
        }>
    }
}

export type ProviderGroupFormFieldsFragmentFragment = {
    __typename?: 'EducationGroupType'
    id: string
    name: string
    type: GroupOfferType
    availability?: Array<Availability> | null
    availabilityNotes?: string | null
    location: string
    minimumParticipants?: number | null
    maximumParticipants?: number | null
    evaluation?: string | null
    lessonHours?: number | null
    degree?: boolean | null
    formality?: GroupFormality | null
    start?: string | null
    end?: string | null
    desiredLearningNeedOutcome: {
        __typename?: 'LearningNeedOutcomeType'
        id: string
        subject?: LearningResultSubject | null
        subjectOther?: string | null
        application?: LearningResultApplication | null
        applicationOther?: string | null
        level?: LearningResultLevel | null
        levelOther?: string | null
    }
    employees?: Array<{
        __typename?: 'EmployeeType'
        id: string
        person: {
            __typename?: 'PersonType'
            givenName?: string | null
            additionalName?: string | null
            familyName?: string | null
        }
    }> | null
}

export type AcceptRegistrationMutationVariables = Exact<{
    studentId: Scalars['String']
}>

export type AcceptRegistrationMutation = {
    __typename?: 'Mutation'
    acceptRegistration: {
        __typename?: 'StudentType'
        id: string
        person: { __typename?: 'PersonType'; id: string; email?: string | null }
        registration: { __typename?: 'RegistrationType'; id: string; status: RegistrationStatus }
    }
}

export type ChangePasswordMutationVariables = Exact<{
    oldPassword: Scalars['String']
    newPassword: Scalars['String']
}>

export type ChangePasswordMutation = { __typename?: 'Mutation'; changePassword: boolean }

export type CreateDocumentMutationVariables = Exact<{
    input: CreateUploadedDocumentInputType
}>

export type CreateDocumentMutation = {
    __typename?: 'Mutation'
    createDocument: {
        __typename?: 'UploadedDocumentType'
        id: string
        createdAt: string
        updatedAt: string
        file: {
            __typename?: 'UploadedFileType'
            name: string
            extension: string
            mimeType: string
            size: string
            base64: string
        }
    }
}

export type CreateEducationGroupMutationVariables = Exact<{
    input: CreateEducationGroupInputType
}>

export type CreateEducationGroupMutation = {
    __typename?: 'Mutation'
    createEducationGroup: {
        __typename?: 'EducationGroupType'
        id: string
        createdAt: string
        updatedAt: string
        name: string
        type: GroupOfferType
        formality?: GroupFormality | null
        lessonHours?: number | null
        degree?: boolean | null
        start?: string | null
        end?: string | null
        availability?: Array<Availability> | null
        availabilityNotes?: string | null
        location: string
        minimumParticipants?: number | null
        maximumParticipants?: number | null
        evaluation?: string | null
        status?: EducationGroupStatus | null
        desiredLearningNeedOutcome: {
            __typename?: 'LearningNeedOutcomeType'
            id: string
            createdAt: string
            updatedAt: string
            subject?: LearningResultSubject | null
            subjectOther?: string | null
            application?: LearningResultApplication | null
            applicationOther?: string | null
            level?: LearningResultLevel | null
            levelOther?: string | null
        }
        organization: { __typename?: 'OrganizationType'; id: string; name: string }
        employees?: Array<{
            __typename?: 'EmployeeType'
            id: string
            person: {
                __typename?: 'PersonType'
                availability?: Array<Availability> | null
                availabilityNotes?: string | null
            }
        }> | null
    }
}

export type CreateEmployeeMutationVariables = Exact<{
    createEmployeeInput: CreateEmployeeInputType
}>

export type CreateEmployeeMutation = {
    __typename?: 'Mutation'
    createEmployee: {
        __typename?: 'EmployeeType'
        id: string
        role?: EmployeeRole | null
        createdAt: string
        updatedAt: string
        organization: { __typename?: 'OrganizationType'; id: string; name: string }
        person: {
            __typename?: 'PersonType'
            id: string
            familyName?: string | null
            additionalName?: string | null
            givenName?: string | null
            email?: string | null
            telephone?: string | null
            availabilityNotes?: string | null
            availability?: Array<Availability> | null
            providerTargetGroupPreference?: Array<ProviderTargetGroupPreference> | null
            providerVolunteeringPreference?: string | null
            providerLanguageHouseVolunteeringReference?: string | null
            providerTargetGroupIsExperienced?: boolean | null
            providerTargetGroupExperience?: string | null
        }
    }
}

export type CreateLearningNeedMutationVariables = Exact<{
    input: CreateLearningNeedInputType
}>

export type CreateLearningNeedMutation = {
    __typename?: 'Mutation'
    createLearningNeed: { __typename?: 'LearningNeedType'; id: string }
}

export type CreateOrganizationMutationVariables = Exact<{
    input: CreateOrganizationInputType
}>

export type CreateOrganizationMutation = {
    __typename?: 'Mutation'
    createOrganization: {
        __typename?: 'OrganizationType'
        id: string
        name: string
        description?: string | null
        type: OrganizationTypeEnum
        employees?: Array<{ __typename?: 'EmployeeType'; id: string }> | null
        address?: { __typename?: 'AddressType'; id: string } | null
    }
}

export type CreateParticipationMutationVariables = Exact<{
    input: CreateParticipationInputType
}>

export type CreateParticipationMutation = {
    __typename?: 'Mutation'
    createParticipation: {
        __typename?: 'ParticipationType'
        id: string
        learningNeed: { __typename?: 'LearningNeedType'; id: string }
    }
}

export type CreateStudentMutationVariables = Exact<{
    createStudentInput: CreateStudentInput
}>

export type CreateStudentMutation = {
    __typename?: 'Mutation'
    createStudent: {
        __typename?: 'StudentType'
        id: string
        civicIntegration?: {
            __typename?: 'CivicIntegrationType'
            id: string
            createdAt: string
            updatedAt: string
            reason?: CivicIntegrationReason | null
            requirement?: CivicIntegrationRequirement | null
            finishDate?: string | null
        } | null
        person: {
            __typename?: 'PersonType'
            id: string
            createdAt: string
            updatedAt: string
            givenName?: string | null
            email?: string | null
            secondaryEmail?: string | null
            additionalName?: string | null
            familyName?: string | null
            gender?: Gender | null
            birthplace?: string | null
            birthday?: string | null
            telephone?: string | null
            contactPreference?: ContactPreference | null
            contactPreferenceOther?: string | null
            emergencyTelephone?: string | null
            maritalStatus?: MaritalStatus | null
            spokenLanguages?: string | null
            primaryLanguage?: string | null
            children?: number | null
            availability?: Array<Availability> | null
            availabilityNotes?: string | null
            didSignPermissionForm: boolean
            hasPermissionToSendInformationAboutLibraries: boolean
            hasPermissionToShareDataWithLibraries: boolean
            hasPermissionToShareDataWithProviders: boolean
            address?: {
                __typename?: 'AddressType'
                id: string
                createdAt: string
                updatedAt: string
                name?: string | null
                street?: string | null
                houseNumber?: string | null
                houseNumberSuffix?: string | null
                postalCode?: string | null
                locality?: string | null
                country?: string | null
            } | null
            educations: Array<{
                __typename?: 'EducationType'
                id: string
                createdAt: string
                updatedAt: string
                name: EducationNameEnum
                type: string
                level?: EducationLevelEnum | null
                levelOther?: string | null
                degree?: boolean | null
                degreeGranted?: boolean | null
                currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum | null
                startDate?: string | null
                yearsFollowed?: number | null
                institution?: string | null
                group?: EducationGroupTypeEnum | null
                courseTeacherType?: CourseTeacherTypeEnum | null
                hours?: number | null
            }>
        }
        organization: {
            __typename?: 'OrganizationType'
            id: string
            createdAt: string
            updatedAt: string
            name: string
            description?: string | null
            type: OrganizationTypeEnum
            email?: string | null
            telephone?: string | null
        }
        registration: {
            __typename?: 'RegistrationType'
            id: string
            createdAt: string
            updatedAt: string
            remarks?: string | null
            status: RegistrationStatus
            registeredPublicly: boolean
            referringOrganization?: ReferringOrganizationEnum | null
            referringOrganizationOther?: string | null
            foundVia?: IntakeFoundVia | null
            foundViaOther?: string | null
            wentToLanguageHouseBefore?: boolean | null
            wentToLanguageHouseBeforeReason?: string | null
            wentToLanguageHouseBeforeYear?: number | null
            network?: Array<IntakeNetwork> | null
            participationLadder?: IntakeParticipationLadder | null
            dutchNTLevel?: DutchNtType | null
            inNetherlandsSinceYear?: number | null
            languageInDailyLife?: string | null
            knowsLatinAlphabet?: boolean | null
            lastKnownLevel?: DutchNt2Level | null
            speakingLevel?: SpeakingLevel | null
            trainedForJob?: string | null
            lastJob?: string | null
            hasTriedThisBefore?: boolean | null
            hasTriedThisBeforeExplanation?: string | null
            whyWantTheseskills?: string | null
            whyWantThisNow?: string | null
            desiredLearningMethod?: Array<DesiredLearningMethod> | null
            dayTimeActivities?: Array<IntakeDayTimeActivities> | null
            dayTimeActivitiesOther?: string | null
            readingTestResult?: ReadingTestResult | null
            writingTestResult?: WritingTestResult | null
            desiredLearningNeedOutcome?: {
                __typename?: 'LearningNeedOutcomeType'
                id: string
                subject?: LearningResultSubject | null
                subjectOther?: string | null
                application?: LearningResultApplication | null
                applicationOther?: string | null
                level?: LearningResultLevel | null
                levelOther?: string | null
            } | null
            referringPerson?: {
                __typename?: 'PersonType'
                id: string
                createdAt: string
                updatedAt: string
                givenName?: string | null
                email?: string | null
                additionalName?: string | null
                familyName?: string | null
                gender?: Gender | null
                birthplace?: string | null
                birthday?: string | null
                telephone?: string | null
                contactPreference?: ContactPreference | null
                contactPreferenceOther?: string | null
                maritalStatus?: MaritalStatus | null
                spokenLanguages?: string | null
                primaryLanguage?: string | null
                children?: number | null
                availability?: Array<Availability> | null
                availabilityNotes?: string | null
                didSignPermissionForm: boolean
                hasPermissionToSendInformationAboutLibraries: boolean
                hasPermissionToShareDataWithLibraries: boolean
                hasPermissionToShareDataWithProviders: boolean
                address?: {
                    __typename?: 'AddressType'
                    id: string
                    createdAt: string
                    updatedAt: string
                    name?: string | null
                    street?: string | null
                    houseNumber?: string | null
                    houseNumberSuffix?: string | null
                    postalCode?: string | null
                    locality?: string | null
                    country?: string | null
                } | null
            } | null
        }
    }
}

export type CreateStudentContactMomentMutationVariables = Exact<{
    input: CreateStudentContactMomentInputType
}>

export type CreateStudentContactMomentMutation = {
    __typename?: 'Mutation'
    createStudentContactMoment: {
        __typename?: 'StudentContactMomentType'
        id: string
        createdAt: string
        updatedAt: string
        type: StudentContactMomentContactType
        date: string
        explanation: string
        createdByEmployee?: {
            __typename?: 'EmployeeType'
            id: string
            person: {
                __typename?: 'PersonType'
                id: string
                givenName?: string | null
                additionalName?: string | null
                familyName?: string | null
            }
        } | null
    }
}

export type CreateTeamMutationVariables = Exact<{
    input: CreateTeamInputType
}>

export type CreateTeamMutation = {
    __typename?: 'Mutation'
    createTeam: {
        __typename?: 'TeamType'
        id: string
        createdAt: string
        updatedAt: string
        name: string
        members: Array<{
            __typename?: 'EmployeeType'
            id: string
            createdAt: string
            updatedAt: string
            role?: EmployeeRole | null
        }>
        parentOrganization: {
            __typename?: 'OrganizationType'
            createdAt: string
            updatedAt: string
            name: string
            description?: string | null
            type: OrganizationTypeEnum
            email?: string | null
            telephone?: string | null
        }
        postalCodeAreas: Array<{
            __typename?: 'PostalCodeAreaType'
            id: string
            createdAt: string
            updatedAt: string
            code: number
        }>
    }
}

export type CreateTestResultMutationVariables = Exact<{
    input: CreateTestResultInputType
}>

export type CreateTestResultMutation = {
    __typename?: 'Mutation'
    createTestResult: { __typename?: 'TestResultType'; id: string }
}

export type DeleteDocumentMutationVariables = Exact<{
    input: DeleteUploadedDocumentInputType
}>

export type DeleteDocumentMutation = { __typename?: 'Mutation'; deleteDocument: boolean }

export type DeleteEmployeeMutationVariables = Exact<{
    employeeId: Scalars['String']
}>

export type DeleteEmployeeMutation = { __typename?: 'Mutation'; deleteEmployee: boolean }

export type DeleteLearningNeedMutationVariables = Exact<{
    learningNeedId: Scalars['String']
}>

export type DeleteLearningNeedMutation = { __typename?: 'Mutation'; deleteLearningNeed: boolean }

export type DeleteParticipationMutationVariables = Exact<{
    input: DeleteParticipationInputType
}>

export type DeleteParticipationMutation = { __typename?: 'Mutation'; deleteParticipation: boolean }

export type DeleteStudentMutationVariables = Exact<{
    input: DeleteStudentInputType
}>

export type DeleteStudentMutation = { __typename?: 'Mutation'; deleteStudent: boolean }

export type DeleteStudentContactMomentMutationVariables = Exact<{
    input: DeleteStudentContactMomentInputType
}>

export type DeleteStudentContactMomentMutation = { __typename?: 'Mutation'; deleteStudentContactMoment: boolean }

export type DeleteTeamMutationVariables = Exact<{
    input: DeleteTeamInputType
}>

export type DeleteTeamMutation = { __typename?: 'Mutation'; deleteTeam: boolean }

export type DeleteTestResultMutationVariables = Exact<{
    input: DeleteTestResultInputType
}>

export type DeleteTestResultMutation = { __typename?: 'Mutation'; deleteTestResult: boolean }

export type EditEmployeeMutationVariables = Exact<{
    editEmployeeInput: EditEmployeeInputType
    withEducations?: Scalars['Boolean']
}>

export type EditEmployeeMutation = {
    __typename?: 'Mutation'
    editEmployee: {
        __typename?: 'EmployeeType'
        id: string
        role?: EmployeeRole | null
        createdAt: string
        updatedAt: string
        organization: { __typename?: 'OrganizationType'; id: string; name: string }
        person: {
            __typename?: 'PersonType'
            id: string
            familyName?: string | null
            additionalName?: string | null
            givenName?: string | null
            email?: string | null
            telephone?: string | null
            availabilityNotes?: string | null
            availability?: Array<Availability> | null
            educations?: Array<{
                __typename?: 'EducationType'
                id: string
                createdAt: string
                updatedAt: string
                name: EducationNameEnum
                type: string
                level?: EducationLevelEnum | null
                levelOther?: string | null
                degree?: boolean | null
                degreeGranted?: boolean | null
                currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum | null
                startDate?: string | null
                endDate?: string | null
                yearsFollowed?: number | null
                institution?: string | null
                group?: EducationGroupTypeEnum | null
                courseTeacherType?: CourseTeacherTypeEnum | null
                hours?: number | null
                other?: string | null
            }>
            employees?: Array<{ __typename?: 'EmployeeType'; id: string }> | null
        }
    }
}

export type EditLearningNeedMutationVariables = Exact<{
    input: EditLearningNeedInputType
}>

export type EditLearningNeedMutation = {
    __typename?: 'Mutation'
    editLearningNeed: { __typename?: 'LearningNeedType'; id: string }
}

export type EditOrganizationMutationVariables = Exact<{
    input: EditOrganizationInputType
}>

export type EditOrganizationMutation = {
    __typename?: 'Mutation'
    editOrganization: {
        __typename?: 'OrganizationType'
        id: string
        name: string
        description?: string | null
        type: OrganizationTypeEnum
        employees?: Array<{ __typename?: 'EmployeeType'; id: string }> | null
        address?: { __typename?: 'AddressType'; id: string } | null
        postalCodes?: Array<{ __typename?: 'PostalCodeAreaType'; id: string; code: number }> | null
    }
}

export type EditParticipationMutationVariables = Exact<{
    input: EditParticipationInputType
}>

export type EditParticipationMutation = {
    __typename?: 'Mutation'
    editParticipation: { __typename?: 'ParticipationType'; id: string }
}

export type EditStudentMutationVariables = Exact<{
    editStudentInput: EditStudentInput
}>

export type EditStudentMutation = {
    __typename?: 'Mutation'
    editStudent: {
        __typename?: 'StudentType'
        id: string
        createdAt: string
        intakeDate: string
        civicIntegration?: {
            __typename?: 'CivicIntegrationType'
            id: string
            createdAt: string
            updatedAt: string
            reason?: CivicIntegrationReason | null
            requirement?: CivicIntegrationRequirement | null
            finishDate?: string | null
        } | null
        person: {
            __typename?: 'PersonType'
            id: string
            createdAt: string
            updatedAt: string
            givenName?: string | null
            email?: string | null
            secondaryEmail?: string | null
            additionalName?: string | null
            familyName?: string | null
            gender?: Gender | null
            birthplace?: string | null
            birthday?: string | null
            telephone?: string | null
            contactPreference?: ContactPreference | null
            contactPreferenceOther?: string | null
            emergencyTelephone?: string | null
            maritalStatus?: MaritalStatus | null
            spokenLanguages?: string | null
            primaryLanguage?: string | null
            children?: number | null
            availability?: Array<Availability> | null
            availabilityNotes?: string | null
            didSignPermissionForm: boolean
            hasPermissionToSendInformationAboutLibraries: boolean
            hasPermissionToShareDataWithLibraries: boolean
            hasPermissionToShareDataWithProviders: boolean
            educations: Array<{
                __typename?: 'EducationType'
                id: string
                createdAt: string
                updatedAt: string
                name: EducationNameEnum
                type: string
                level?: EducationLevelEnum | null
                levelOther?: string | null
                degree?: boolean | null
                degreeGranted?: boolean | null
                currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum | null
                startDate?: string | null
                yearsFollowed?: number | null
                institution?: string | null
                group?: EducationGroupTypeEnum | null
                courseTeacherType?: CourseTeacherTypeEnum | null
                hours?: number | null
            }>
            address?: {
                __typename?: 'AddressType'
                id: string
                createdAt: string
                updatedAt: string
                name?: string | null
                street?: string | null
                houseNumber?: string | null
                houseNumberSuffix?: string | null
                postalCode?: string | null
                locality?: string | null
                country?: string | null
            } | null
        }
        organization: {
            __typename?: 'OrganizationType'
            id: string
            createdAt: string
            updatedAt: string
            name: string
            description?: string | null
            type: OrganizationTypeEnum
            email?: string | null
            telephone?: string | null
        }
        registration: {
            __typename?: 'RegistrationType'
            id: string
            createdAt: string
            updatedAt: string
            remarks?: string | null
            status: RegistrationStatus
            registeredPublicly: boolean
            referringOrganization?: ReferringOrganizationEnum | null
            referringOrganizationOther?: string | null
            foundVia?: IntakeFoundVia | null
            foundViaOther?: string | null
            wentToLanguageHouseBefore?: boolean | null
            wentToLanguageHouseBeforeReason?: string | null
            wentToLanguageHouseBeforeYear?: number | null
            network?: Array<IntakeNetwork> | null
            participationLadder?: IntakeParticipationLadder | null
            dutchNTLevel?: DutchNtType | null
            inNetherlandsSinceYear?: number | null
            languageInDailyLife?: string | null
            knowsLatinAlphabet?: boolean | null
            lastKnownLevel?: DutchNt2Level | null
            speakingLevel?: SpeakingLevel | null
            trainedForJob?: string | null
            lastJob?: string | null
            hasTriedThisBefore?: boolean | null
            hasTriedThisBeforeExplanation?: string | null
            whyWantTheseskills?: string | null
            whyWantThisNow?: string | null
            desiredLearningMethod?: Array<DesiredLearningMethod> | null
            dayTimeActivities?: Array<IntakeDayTimeActivities> | null
            dayTimeActivitiesOther?: string | null
            readingTestResult?: ReadingTestResult | null
            writingTestResult?: WritingTestResult | null
            desiredLearningNeedOutcome?: {
                __typename?: 'LearningNeedOutcomeType'
                id: string
                subject?: LearningResultSubject | null
                subjectOther?: string | null
                application?: LearningResultApplication | null
                applicationOther?: string | null
                level?: LearningResultLevel | null
                levelOther?: string | null
            } | null
            referringPerson?: {
                __typename?: 'PersonType'
                id: string
                createdAt: string
                updatedAt: string
                givenName?: string | null
                email?: string | null
                additionalName?: string | null
                familyName?: string | null
                gender?: Gender | null
                birthplace?: string | null
                birthday?: string | null
                telephone?: string | null
                contactPreference?: ContactPreference | null
                contactPreferenceOther?: string | null
                maritalStatus?: MaritalStatus | null
                spokenLanguages?: string | null
                primaryLanguage?: string | null
                children?: number | null
                availability?: Array<Availability> | null
                availabilityNotes?: string | null
                didSignPermissionForm: boolean
                hasPermissionToSendInformationAboutLibraries: boolean
                hasPermissionToShareDataWithLibraries: boolean
                hasPermissionToShareDataWithProviders: boolean
                address?: {
                    __typename?: 'AddressType'
                    id: string
                    createdAt: string
                    updatedAt: string
                    name?: string | null
                    street?: string | null
                    houseNumber?: string | null
                    houseNumberSuffix?: string | null
                    postalCode?: string | null
                    locality?: string | null
                    country?: string | null
                } | null
            } | null
        }
    }
}

export type EditStudentContactMomentMutationVariables = Exact<{
    input: EditStudentContactMomentInputType
}>

export type EditStudentContactMomentMutation = {
    __typename?: 'Mutation'
    editStudentContactMoment: {
        __typename?: 'StudentContactMomentType'
        id: string
        createdAt: string
        updatedAt: string
        type: StudentContactMomentContactType
        date: string
        explanation: string
        createdByEmployee?: {
            __typename?: 'EmployeeType'
            id: string
            person: {
                __typename?: 'PersonType'
                id: string
                givenName?: string | null
                additionalName?: string | null
                familyName?: string | null
            }
        } | null
    }
}

export type EditTeamMutationVariables = Exact<{
    input: EditTeamInputType
}>

export type EditTeamMutation = {
    __typename?: 'Mutation'
    editTeam: {
        __typename?: 'TeamType'
        id: string
        createdAt: string
        updatedAt: string
        name: string
        members: Array<{
            __typename?: 'EmployeeType'
            id: string
            createdAt: string
            updatedAt: string
            role?: EmployeeRole | null
        }>
        parentOrganization: {
            __typename?: 'OrganizationType'
            createdAt: string
            updatedAt: string
            name: string
            description?: string | null
            type: OrganizationTypeEnum
            email?: string | null
            telephone?: string | null
        }
        postalCodeAreas: Array<{
            __typename?: 'PostalCodeAreaType'
            id: string
            createdAt: string
            updatedAt: string
            code: number
        }>
    }
}

export type EditTeamsMutationVariables = Exact<{
    input: EditTeamsInputType
}>

export type EditTeamsMutation = {
    __typename?: 'Mutation'
    editTeams: Array<{
        __typename?: 'TeamType'
        id: string
        createdAt: string
        updatedAt: string
        name: string
        hiddenFromPublic?: boolean | null
        members: Array<{
            __typename?: 'EmployeeType'
            id: string
            createdAt: string
            updatedAt: string
            role?: EmployeeRole | null
        }>
        parentOrganization: {
            __typename?: 'OrganizationType'
            createdAt: string
            updatedAt: string
            name: string
            description?: string | null
            type: OrganizationTypeEnum
            email?: string | null
            telephone?: string | null
        }
        postalCodeAreas: Array<{
            __typename?: 'PostalCodeAreaType'
            id: string
            createdAt: string
            updatedAt: string
            code: number
        }>
    }>
}

export type EditTestResultMutationVariables = Exact<{
    input: EditTestResultInputType
}>

export type EditTestResultMutation = {
    __typename?: 'Mutation'
    editTestResult: { __typename?: 'TestResultType'; id: string }
}

export type ForgotPasswordMutationVariables = Exact<{
    email: Scalars['String']
}>

export type ForgotPasswordMutation = { __typename?: 'Mutation'; forgotPassword: boolean }

export type LoginMutationVariables = Exact<{
    credentials: LoginInput
}>

export type LoginMutation = {
    __typename?: 'Mutation'
    login: {
        __typename?: 'LoginResponse'
        id: string
        username: string
        locale: string
        accessToken: string
        refreshToken: string
        employees: Array<{
            __typename?: 'EmployeeType'
            id: string
            organization: {
                __typename?: 'OrganizationType'
                id: string
                slug: string
                type: OrganizationTypeEnum
                name: string
            }
        }>
        person?: {
            __typename?: 'PersonType'
            id: string
            givenName?: string | null
            additionalName?: string | null
            familyName?: string | null
        } | null
    }
}

export type RefreshTokenMutationVariables = Exact<{
    refreshToken: Scalars['String']
}>

export type RefreshTokenMutation = {
    __typename?: 'Mutation'
    refreshToken: { __typename?: 'RefreshTokenResponse'; accessToken: string; refreshToken: string }
}

export type RegisterStudentMutationVariables = Exact<{
    input: RegisterStudentInput
}>

export type RegisterStudentMutation = { __typename?: 'Mutation'; registerStudent: boolean }

export type RejectRegistrationMutationVariables = Exact<{
    studentId: Scalars['String']
}>

export type RejectRegistrationMutation = { __typename?: 'Mutation'; rejectRegistration: boolean }

export type DeleteOrganizationMutationVariables = Exact<{
    orgId: Scalars['String']
}>

export type DeleteOrganizationMutation = { __typename?: 'Mutation'; deleteOrganization: boolean }

export type ResetPasswordMutationVariables = Exact<{
    input: ResetPasswordInput
}>

export type ResetPasswordMutation = {
    __typename?: 'Mutation'
    resetPassword: { __typename?: 'ResetPasswordResponse'; username: string }
}

export type CanCreateStudentContactMomentQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type CanCreateStudentContactMomentQuery = {
    __typename?: 'Query'
    student: { __typename?: 'StudentType'; id: string; canCreateContactMoment: boolean }
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
    __typename?: 'Query'
    currentUser?: {
        __typename?: 'UserType'
        id: string
        username: string
        locale: string
        currentEmployee?: {
            __typename?: 'EmployeeType'
            id: string
            role?: EmployeeRole | null
            organization: {
                __typename?: 'OrganizationType'
                id: string
                name: string
                slug: string
                description?: string | null
                type: OrganizationTypeEnum
                disabledIntakeFields?: Array<OrganizationIntakeFields> | null
                hasLimitedEditRights?: boolean | null
                employees?: Array<{ __typename?: 'EmployeeType'; id: string }> | null
            }
        } | null
        person?: {
            __typename?: 'PersonType'
            id: string
            email?: string | null
            givenName?: string | null
            additionalName?: string | null
            familyName?: string | null
            gender?: Gender | null
            birthplace?: string | null
            birthday?: string | null
            telephone?: string | null
            contactPreference?: ContactPreference | null
            contactPreferenceOther?: string | null
            maritalStatus?: MaritalStatus | null
            spokenLanguages?: string | null
            primaryLanguage?: string | null
            children?: number | null
            availability?: Array<Availability> | null
            availabilityNotes?: string | null
            employees?: Array<{
                __typename?: 'EmployeeType'
                id: string
                organization: {
                    __typename?: 'OrganizationType'
                    id: string
                    name: string
                    slug: string
                    type: OrganizationTypeEnum
                }
            }> | null
            address?: {
                __typename?: 'AddressType'
                id: string
                name?: string | null
                street?: string | null
                houseNumber?: string | null
                houseNumberSuffix?: string | null
                postalCode?: string | null
                locality?: string | null
                country?: string | null
            } | null
        } | null
    } | null
}

export type DocumentQueryVariables = Exact<{
    document: Scalars['String']
}>

export type DocumentQuery = {
    __typename?: 'Query'
    document: {
        __typename?: 'UploadedDocumentType'
        id: string
        createdAt: string
        updatedAt: string
        file: {
            __typename?: 'UploadedFileType'
            name: string
            extension: string
            mimeType: string
            size: string
            base64: string
        }
    }
}

export type DocumentsQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    person: Scalars['String']
}>

export type DocumentsQuery = {
    __typename?: 'Query'
    documents: {
        __typename?: 'PaginatedUploadedDocumentType'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'UploadedDocumentType'
            id: string
            createdAt: string
            updatedAt: string
            file: { __typename?: 'UploadedFileType'; name: string }
        }>
    }
}

export type DoesEmailExistQueryVariables = Exact<{
    email: Scalars['String']
}>

export type DoesEmailExistQuery = { __typename?: 'Query'; doesEmailExist: boolean }

export type DoesPersonEmailExistQueryVariables = Exact<{
    email: Scalars['String']
}>

export type DoesPersonEmailExistQuery = { __typename?: 'Query'; doesPersonEmailExist: boolean }

export type EducationGroupsQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    organizationId: Scalars['ID']
    status?: InputMaybe<EducationGroupStatus>
    oneOfStatuses?: InputMaybe<Array<EducationGroupStatus> | EducationGroupStatus>
}>

export type EducationGroupsQuery = {
    __typename?: 'Query'
    educationGroups: {
        __typename?: 'PaginatedEducationGroupType'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'EducationGroupType'
            id: string
            createdAt: string
            updatedAt: string
            name: string
            type: GroupOfferType
            formality?: GroupFormality | null
            lessonHours?: number | null
            degree?: boolean | null
            start?: string | null
            end?: string | null
            availability?: Array<Availability> | null
            availabilityNotes?: string | null
            location: string
            minimumParticipants?: number | null
            maximumParticipants?: number | null
            participantCount?: number | null
            evaluation?: string | null
            status?: EducationGroupStatus | null
            desiredLearningNeedOutcome: {
                __typename?: 'LearningNeedOutcomeType'
                id: string
                createdAt: string
                updatedAt: string
                subject?: LearningResultSubject | null
                subjectOther?: string | null
                application?: LearningResultApplication | null
                applicationOther?: string | null
                level?: LearningResultLevel | null
                levelOther?: string | null
            }
            organization: { __typename?: 'OrganizationType'; id: string; name: string }
            employees?: Array<{
                __typename?: 'EmployeeType'
                id: string
                person: {
                    __typename?: 'PersonType'
                    availability?: Array<Availability> | null
                    availabilityNotes?: string | null
                }
            }> | null
        }>
    }
}

export type EmployeeQueryVariables = Exact<{
    id: Scalars['String']
    withEducations?: Scalars['Boolean']
}>

export type EmployeeQuery = {
    __typename?: 'Query'
    employee: {
        __typename?: 'EmployeeType'
        id: string
        role?: EmployeeRole | null
        createdAt: string
        updatedAt: string
        organization: {
            __typename?: 'OrganizationType'
            id: string
            name: string
            description?: string | null
            type: OrganizationTypeEnum
        }
        person: {
            __typename?: 'PersonType'
            id: string
            familyName?: string | null
            givenName?: string | null
            additionalName?: string | null
            email?: string | null
            telephone?: string | null
            gender?: Gender | null
            birthday?: string | null
            birthplace?: string | null
            emergencyTelephone?: string | null
            contactPreference?: ContactPreference | null
            contactPreferenceOther?: string | null
            providerTargetGroupPreference?: Array<ProviderTargetGroupPreference> | null
            providerVolunteeringPreference?: string | null
            providerLanguageHouseVolunteeringReference?: string | null
            providerTargetGroupIsExperienced?: boolean | null
            providerTargetGroupExperience?: string | null
            availabilityNotes?: string | null
            availability?: Array<Availability> | null
            address?: {
                __typename?: 'AddressType'
                id: string
                street?: string | null
                houseNumber?: string | null
                houseNumberSuffix?: string | null
                postalCode?: string | null
                locality?: string | null
                country?: string | null
            } | null
            educations?: Array<{
                __typename?: 'EducationType'
                id: string
                createdAt: string
                updatedAt: string
                name: EducationNameEnum
                type: string
                level?: EducationLevelEnum | null
                levelOther?: string | null
                degree?: boolean | null
                degreeGranted?: boolean | null
                currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum | null
                startDate?: string | null
                endDate?: string | null
                yearsFollowed?: number | null
                institution?: string | null
                group?: EducationGroupTypeEnum | null
                courseTeacherType?: CourseTeacherTypeEnum | null
                hours?: number | null
                other?: string | null
            }>
        }
        teams?: Array<{
            __typename?: 'TeamType'
            id: string
            name: string
            createdAt: string
            updatedAt: string
        }> | null
    }
}

export type LearningNeedQueryVariables = Exact<{
    learningNeedId: Scalars['String']
}>

export type LearningNeedQuery = {
    __typename?: 'Query'
    learningNeed: {
        __typename?: 'LearningNeedType'
        id: string
        description: string
        motivation: string
        advisedOffer?: string | null
        desiredOffer?: string | null
        offerDifference?: OfferDifference | null
        offerDifferenceOther?: string | null
        agreements?: string | null
        createdByOrganization: { __typename?: 'OrganizationType'; id: string; name: string }
        desiredLearningNeedOutcome?: {
            __typename?: 'LearningNeedOutcomeType'
            id: string
            createdAt: string
            updatedAt: string
            subject?: LearningResultSubject | null
            subjectOther?: string | null
            application?: LearningResultApplication | null
            applicationOther?: string | null
            level?: LearningResultLevel | null
            levelOther?: string | null
        } | null
        participations?: Array<{
            __typename?: 'ParticipationType'
            id: string
            agreement?: string | null
            groupFormation?: ParticipationGroupType | null
            offerName?: string | null
            providerOption?: ParticipationProviderOption | null
            providerOther?: string | null
            providerExplanation?: string | null
            status: ParticipationStatus
            provider?: { __typename?: 'OrganizationType'; id: string; name: string } | null
        }> | null
        student: {
            __typename?: 'StudentType'
            id: string
            person: {
                __typename?: 'PersonType'
                id: string
                givenName?: string | null
                additionalName?: string | null
                familyName?: string | null
            }
            organization: { __typename?: 'OrganizationType'; id: string; name: string }
        }
    }
}

export type LearningNeedsQueryVariables = Exact<{
    studentId: Scalars['String']
    paginationArgs: PaginatedInputType
}>

export type LearningNeedsQuery = {
    __typename?: 'Query'
    learningNeeds: {
        __typename?: 'PaginatedLearningNeedResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'LearningNeedType'
            id: string
            description: string
            participations?: Array<{
                __typename?: 'ParticipationType'
                id: string
                createdAt: string
                updatedAt: string
                agreement?: string | null
                degree?: boolean | null
                end?: string | null
                endParticipation?: string | null
                formality?: ParticipationFormality | null
                groupFormation?: ParticipationGroupType | null
                offerName?: string | null
                offerType?: ParticipationOfferType | null
                providerOption?: ParticipationProviderOption | null
                providerOther?: string | null
                providerExplanation?: string | null
                reasonEndParticipation?: ParticipationEndReason | null
                start?: string | null
                startParticipation?: string | null
                status: ParticipationStatus
                provider?: { __typename?: 'OrganizationType'; id: string; name: string } | null
            }> | null
            student: {
                __typename?: 'StudentType'
                id: string
                organization: { __typename?: 'OrganizationType'; id: string; name: string }
            }
        }>
    }
}

export type OrganizationQueryVariables = Exact<{
    input: Scalars['String']
}>

export type OrganizationQuery = {
    __typename?: 'Query'
    organization: {
        __typename?: 'OrganizationType'
        id: string
        name: string
        type: OrganizationTypeEnum
        description?: string | null
        email?: string | null
        telephone?: string | null
        disabledIntakeFields?: Array<OrganizationIntakeFields> | null
        hasLimitedEditRights?: boolean | null
        employees?: Array<{
            __typename?: 'EmployeeType'
            id: string
            person: { __typename?: 'PersonType'; id: string; email?: string | null }
        }> | null
        postalCodes?: Array<{ __typename?: 'PostalCodeAreaType'; code: number; id: string }> | null
        address?: {
            __typename?: 'AddressType'
            id: string
            name?: string | null
            street?: string | null
            houseNumber?: string | null
            houseNumberSuffix?: string | null
            postalCode?: string | null
            locality?: string | null
        } | null
    }
}

export type OrganizationEmployeesQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    organizationId: Scalars['ID']
    oneOfRoles?: InputMaybe<Array<EmployeeRole> | EmployeeRole>
    sort?: InputMaybe<OrganizationEmployeesSortInputType>
}>

export type OrganizationEmployeesQuery = {
    __typename?: 'Query'
    organizationEmployees: {
        __typename?: 'PaginatedEmployeeResponse'
        hasMore?: boolean | null
        totalCount?: number | null
        nodes: Array<{
            __typename?: 'EmployeeType'
            id: string
            role?: EmployeeRole | null
            createdAt: string
            updatedAt: string
            organization: {
                __typename?: 'OrganizationType'
                id: string
                name: string
                description?: string | null
                type: OrganizationTypeEnum
            }
            person: {
                __typename?: 'PersonType'
                id: string
                familyName?: string | null
                additionalName?: string | null
                givenName?: string | null
            }
            teams?: Array<{
                __typename?: 'TeamType'
                id: string
                name: string
                createdAt: string
                updatedAt: string
            }> | null
        }>
    }
}

export type OrganizationEmployeesForDropdownQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    organizationId: Scalars['ID']
    teamId: Scalars['ID']
}>

export type OrganizationEmployeesForDropdownQuery = {
    __typename?: 'Query'
    organizationEmployees: {
        __typename?: 'PaginatedEmployeeResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'EmployeeType'
            id: string
            person: {
                __typename?: 'PersonType'
                id: string
                familyName?: string | null
                additionalName?: string | null
                givenName?: string | null
            }
        }>
    }
}

export type OrganizationEmployeesForTeamQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    organizationId: Scalars['ID']
    teamId?: InputMaybe<Scalars['ID']>
}>

export type OrganizationEmployeesForTeamQuery = {
    __typename?: 'Query'
    organizationEmployees: {
        __typename?: 'PaginatedEmployeeResponse'
        hasMore?: boolean | null
        totalCount?: number | null
        nodes: Array<{
            __typename?: 'EmployeeType'
            id: string
            createdAt: string
            updatedAt: string
            role?: EmployeeRole | null
            person: {
                __typename?: 'PersonType'
                id: string
                familyName?: string | null
                additionalName?: string | null
                givenName?: string | null
            }
        }>
    }
}

export type OrganizationsQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    type: Scalars['String']
}>

export type OrganizationsQuery = {
    __typename?: 'Query'
    organizations: {
        __typename?: 'PaginatedOrganisationResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'OrganizationType'
            id: string
            name: string
            type: OrganizationTypeEnum
            description?: string | null
            email?: string | null
            telephone?: string | null
            postalCodes?: Array<{ __typename?: 'PostalCodeAreaType'; id: string; code: number }> | null
            employees?: Array<{ __typename?: 'EmployeeType'; id: string }> | null
            address?: {
                __typename?: 'AddressType'
                id: string
                street?: string | null
                houseNumber?: string | null
                houseNumberSuffix?: string | null
                postalCode?: string | null
                locality?: string | null
            } | null
        }>
    }
}

export type ParticipationQueryVariables = Exact<{
    participationId: Scalars['String']
    withLearningNeed?: Scalars['Boolean']
}>

export type ParticipationQuery = {
    __typename?: 'Query'
    participation: {
        __typename?: 'ParticipationType'
        id: string
        createdAt: string
        updatedAt: string
        agreement?: string | null
        degree?: boolean | null
        end?: string | null
        endParticipation?: string | null
        formality?: ParticipationFormality | null
        groupFormation?: ParticipationGroupType | null
        offerName?: string | null
        offerType?: ParticipationOfferType | null
        providerOption?: ParticipationProviderOption | null
        providerOther?: string | null
        providerExplanation?: string | null
        reasonEndParticipation?: ParticipationEndReason | null
        outFlowParticipation?: ParticipationOutFlow | null
        outFlowReasonOther?: string | null
        start?: string | null
        startParticipation?: string | null
        status: ParticipationStatus
        educationGroup?: {
            __typename?: 'EducationGroupType'
            id: string
            name: string
            type: GroupOfferType
            availability?: Array<Availability> | null
            availabilityNotes?: string | null
            location: string
            minimumParticipants?: number | null
            maximumParticipants?: number | null
            evaluation?: string | null
            lessonHours?: number | null
            degree?: boolean | null
            formality?: GroupFormality | null
            start?: string | null
            end?: string | null
            desiredLearningNeedOutcome: {
                __typename?: 'LearningNeedOutcomeType'
                id: string
                subject?: LearningResultSubject | null
                subjectOther?: string | null
                application?: LearningResultApplication | null
                applicationOther?: string | null
                level?: LearningResultLevel | null
                levelOther?: string | null
            }
            employees?: Array<{
                __typename?: 'EmployeeType'
                id: string
                person: {
                    __typename?: 'PersonType'
                    givenName?: string | null
                    additionalName?: string | null
                    familyName?: string | null
                }
            }> | null
        } | null
        mentor?: {
            __typename?: 'EmployeeType'
            id: string
            role?: EmployeeRole | null
            createdAt: string
            updatedAt: string
            person: {
                __typename?: 'PersonType'
                id: string
                familyName?: string | null
                givenName?: string | null
                additionalName?: string | null
                email?: string | null
                telephone?: string | null
                gender?: Gender | null
                birthday?: string | null
                birthplace?: string | null
                emergencyTelephone?: string | null
                contactPreference?: ContactPreference | null
                contactPreferenceOther?: string | null
                providerTargetGroupPreference?: Array<ProviderTargetGroupPreference> | null
                providerVolunteeringPreference?: string | null
                providerLanguageHouseVolunteeringReference?: string | null
                providerTargetGroupIsExperienced?: boolean | null
                providerTargetGroupExperience?: string | null
                availabilityNotes?: string | null
                availability?: Array<Availability> | null
                address?: {
                    __typename?: 'AddressType'
                    id: string
                    street?: string | null
                    houseNumber?: string | null
                    houseNumberSuffix?: string | null
                    postalCode?: string | null
                    locality?: string | null
                    country?: string | null
                } | null
                educations: Array<{
                    __typename?: 'EducationType'
                    id: string
                    createdAt: string
                    updatedAt: string
                    name: EducationNameEnum
                    type: string
                    level?: EducationLevelEnum | null
                    levelOther?: string | null
                    degree?: boolean | null
                    degreeGranted?: boolean | null
                    currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum | null
                    startDate?: string | null
                    endDate?: string | null
                    yearsFollowed?: number | null
                    institution?: string | null
                    group?: EducationGroupTypeEnum | null
                    courseTeacherType?: CourseTeacherTypeEnum | null
                    hours?: number | null
                    other?: string | null
                }>
            }
        } | null
        provider?: { __typename?: 'OrganizationType'; id: string; name: string } | null
        testResult?: {
            __typename?: 'TestResultType'
            id: string
            usedExam?: string | null
            examDate?: string | null
            memo?: string | null
            learningNeedOutcome: {
                __typename?: 'LearningNeedOutcomeType'
                id: string
                createdAt: string
                updatedAt: string
                subject?: LearningResultSubject | null
                subjectOther?: string | null
                application?: LearningResultApplication | null
                applicationOther?: string | null
                level?: LearningResultLevel | null
                levelOther?: string | null
            }
        } | null
        learningNeed?: {
            __typename?: 'LearningNeedType'
            id: string
            description: string
            student: {
                __typename?: 'StudentType'
                id: string
                person: {
                    __typename?: 'PersonType'
                    id: string
                    givenName?: string | null
                    additionalName?: string | null
                    familyName?: string | null
                    availability?: Array<Availability> | null
                    availabilityNotes?: string | null
                }
                organization: { __typename?: 'OrganizationType'; id: string; name: string }
            }
        }
    }
}

export type ParticipationProviderOrganizationsQueryVariables = Exact<{ [key: string]: never }>

export type ParticipationProviderOrganizationsQuery = {
    __typename?: 'Query'
    participationProviderOrganizations: Array<{
        __typename?: 'ParticipationProviderOrganizationType'
        id: string
        name: string
    }>
}

export type ParticipationsQueryVariables = Exact<{
    learningNeedId: Scalars['String']
    paginationArgs: PaginatedInputType
}>

export type ParticipationsQuery = {
    __typename?: 'Query'
    participations: {
        __typename?: 'PaginatedParticipationResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'ParticipationType'
            id: string
            createdAt: string
            updatedAt: string
            agreement?: string | null
            degree?: boolean | null
            end?: string | null
            endParticipation?: string | null
            formality?: ParticipationFormality | null
            groupFormation?: ParticipationGroupType | null
            offerName?: string | null
            offerType?: ParticipationOfferType | null
            providerOption?: ParticipationProviderOption | null
            providerOther?: string | null
            providerExplanation?: string | null
            reasonEndParticipation?: ParticipationEndReason | null
            outFlowParticipation?: ParticipationOutFlow | null
            outFlowReasonOther?: string | null
            start?: string | null
            startParticipation?: string | null
            status: ParticipationStatus
            educationGroup?: {
                __typename?: 'EducationGroupType'
                id: string
                name: string
                type: GroupOfferType
                availability?: Array<Availability> | null
                availabilityNotes?: string | null
                location: string
                minimumParticipants?: number | null
                maximumParticipants?: number | null
                evaluation?: string | null
                lessonHours?: number | null
                degree?: boolean | null
                formality?: GroupFormality | null
                start?: string | null
                end?: string | null
                desiredLearningNeedOutcome: {
                    __typename?: 'LearningNeedOutcomeType'
                    id: string
                    subject?: LearningResultSubject | null
                    subjectOther?: string | null
                    application?: LearningResultApplication | null
                    applicationOther?: string | null
                    level?: LearningResultLevel | null
                    levelOther?: string | null
                }
                employees?: Array<{
                    __typename?: 'EmployeeType'
                    id: string
                    person: {
                        __typename?: 'PersonType'
                        givenName?: string | null
                        additionalName?: string | null
                        familyName?: string | null
                    }
                }> | null
            } | null
            mentor?: {
                __typename?: 'EmployeeType'
                id: string
                role?: EmployeeRole | null
                createdAt: string
                updatedAt: string
                person: {
                    __typename?: 'PersonType'
                    id: string
                    familyName?: string | null
                    givenName?: string | null
                    additionalName?: string | null
                    email?: string | null
                    telephone?: string | null
                    gender?: Gender | null
                    birthday?: string | null
                    birthplace?: string | null
                    emergencyTelephone?: string | null
                    contactPreference?: ContactPreference | null
                    contactPreferenceOther?: string | null
                    providerTargetGroupPreference?: Array<ProviderTargetGroupPreference> | null
                    providerVolunteeringPreference?: string | null
                    providerLanguageHouseVolunteeringReference?: string | null
                    providerTargetGroupIsExperienced?: boolean | null
                    providerTargetGroupExperience?: string | null
                    availabilityNotes?: string | null
                    availability?: Array<Availability> | null
                    address?: {
                        __typename?: 'AddressType'
                        id: string
                        street?: string | null
                        houseNumber?: string | null
                        houseNumberSuffix?: string | null
                        postalCode?: string | null
                        locality?: string | null
                        country?: string | null
                    } | null
                    educations: Array<{
                        __typename?: 'EducationType'
                        id: string
                        createdAt: string
                        updatedAt: string
                        name: EducationNameEnum
                        type: string
                        level?: EducationLevelEnum | null
                        levelOther?: string | null
                        degree?: boolean | null
                        degreeGranted?: boolean | null
                        currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum | null
                        startDate?: string | null
                        endDate?: string | null
                        yearsFollowed?: number | null
                        institution?: string | null
                        group?: EducationGroupTypeEnum | null
                        courseTeacherType?: CourseTeacherTypeEnum | null
                        hours?: number | null
                        other?: string | null
                    }>
                }
            } | null
            provider?: { __typename?: 'OrganizationType'; id: string; name: string } | null
            testResult?: {
                __typename?: 'TestResultType'
                id: string
                usedExam?: string | null
                examDate?: string | null
                memo?: string | null
                learningNeedOutcome: {
                    __typename?: 'LearningNeedOutcomeType'
                    id: string
                    createdAt: string
                    updatedAt: string
                    subject?: LearningResultSubject | null
                    subjectOther?: string | null
                    application?: LearningResultApplication | null
                    applicationOther?: string | null
                    level?: LearningResultLevel | null
                    levelOther?: string | null
                }
            } | null
        }>
    }
}

export type AvailablePostalCodesQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    search?: InputMaybe<Scalars['String']>
}>

export type AvailablePostalCodesQuery = {
    __typename?: 'Query'
    availablePostalCodes: {
        __typename?: 'PaginatedPostalCodeAreaResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{ __typename?: 'PostalCodeAreaType'; id: string; code: number }>
    }
}

export type ProviderStudentsQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    participationStatus?: InputMaybe<ParticipationStatus>
    newOrReferred?: InputMaybe<Scalars['Boolean']>
    educationGroupId?: InputMaybe<Scalars['String']>
    mentorId?: InputMaybe<Scalars['String']>
    sort?: InputMaybe<StudentsSortInputType>
    searchName?: InputMaybe<Scalars['String']>
}>

export type ProviderStudentsQuery = {
    __typename?: 'Query'
    providerStudents: {
        __typename?: 'PaginatedStudentResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'StudentType'
            id: string
            person: {
                __typename?: 'PersonType'
                id: string
                givenName?: string | null
                additionalName?: string | null
                familyName?: string | null
            }
            registration: {
                __typename?: 'RegistrationType'
                id: string
                createdAt: string
                desiredLearningNeedOutcome?: {
                    __typename?: 'LearningNeedOutcomeType'
                    subject?: LearningResultSubject | null
                    subjectOther?: string | null
                } | null
            }
            organization: { __typename?: 'OrganizationType'; id: string; name: string }
        }>
    }
}

export type PublicOrganizationsQueryVariables = Exact<{ [key: string]: never }>

export type PublicOrganizationsQuery = {
    __typename?: 'Query'
    publicOrganizations: Array<{ __typename?: 'PublicOrganizationType'; id: string; name: string }>
}

export type PublicTeamsForOrganizationQueryVariables = Exact<{
    organizationId: Scalars['ID']
}>

export type PublicTeamsForOrganizationQuery = {
    __typename?: 'Query'
    publicTeamsForOrganization: Array<{ __typename?: 'PublicTeamType'; id: string; name: string }>
}

export type StudentContactMomentsQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    studentId: Scalars['String']
}>

export type StudentContactMomentsQuery = {
    __typename?: 'Query'
    studentContactMoments: {
        __typename?: 'PaginatedStudentContactMomentResponse'
        hasMore?: boolean | null
        totalCount?: number | null
        nodes: Array<{
            __typename?: 'StudentContactMomentType'
            id: string
            createdAt: string
            updatedAt: string
            type: StudentContactMomentContactType
            date: string
            explanation: string
            canEdit: boolean
            createdByEmployee?: {
                __typename?: 'EmployeeType'
                id: string
                person: {
                    __typename?: 'PersonType'
                    id: string
                    givenName?: string | null
                    additionalName?: string | null
                    familyName?: string | null
                }
            } | null
        }>
    }
}

export type StudentForDesiredLearningNeedOutcomeQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type StudentForDesiredLearningNeedOutcomeQuery = {
    __typename?: 'Query'
    student: {
        __typename?: 'StudentType'
        id: string
        registration: {
            __typename?: 'RegistrationType'
            desiredLearningNeedOutcome?: {
                __typename?: 'LearningNeedOutcomeType'
                subject?: LearningResultSubject | null
                subjectOther?: string | null
                application?: LearningResultApplication | null
                applicationOther?: string | null
                level?: LearningResultLevel | null
                levelOther?: string | null
            } | null
        }
    }
}

export type StudentForDetailHeaderQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type StudentForDetailHeaderQuery = {
    __typename?: 'Query'
    student: {
        __typename?: 'StudentType'
        id: string
        person: {
            __typename?: 'PersonType'
            id: string
            givenName?: string | null
            additionalName?: string | null
            familyName?: string | null
        }
    }
}

export type StudentForIntakeQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type StudentForIntakeQuery = {
    __typename?: 'Query'
    student: {
        __typename?: 'StudentType'
        id: string
        createdAt: string
        intakeDate: string
        organization: {
            __typename?: 'OrganizationType'
            id: string
            disabledIntakeFields?: Array<OrganizationIntakeFields> | null
            name: string
        }
        civicIntegration?: {
            __typename?: 'CivicIntegrationType'
            id: string
            createdAt: string
            updatedAt: string
            reason?: CivicIntegrationReason | null
            requirement?: CivicIntegrationRequirement | null
            finishDate?: string | null
        } | null
        person: {
            __typename?: 'PersonType'
            id: string
            createdAt: string
            updatedAt: string
            givenName?: string | null
            email?: string | null
            secondaryEmail?: string | null
            additionalName?: string | null
            familyName?: string | null
            gender?: Gender | null
            birthplace?: string | null
            birthday?: string | null
            telephone?: string | null
            contactPreference?: ContactPreference | null
            contactPreferenceOther?: string | null
            maritalStatus?: MaritalStatus | null
            spokenLanguages?: string | null
            primaryLanguage?: string | null
            children?: number | null
            availability?: Array<Availability> | null
            availabilityNotes?: string | null
            didSignPermissionForm: boolean
            hasPermissionToSendInformationAboutLibraries: boolean
            hasPermissionToShareDataWithLibraries: boolean
            hasPermissionToShareDataWithProviders: boolean
            educations: Array<{
                __typename?: 'EducationType'
                id: string
                createdAt: string
                updatedAt: string
                name: EducationNameEnum
                type: string
                level?: EducationLevelEnum | null
                levelOther?: string | null
                degree?: boolean | null
                degreeGranted?: boolean | null
                currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum | null
                startDate?: string | null
                yearsFollowed?: number | null
                institution?: string | null
                group?: EducationGroupTypeEnum | null
                courseTeacherType?: CourseTeacherTypeEnum | null
                hours?: number | null
            }>
            address?: {
                __typename?: 'AddressType'
                id: string
                createdAt: string
                updatedAt: string
                name?: string | null
                street?: string | null
                houseNumber?: string | null
                houseNumberSuffix?: string | null
                postalCode?: string | null
                locality?: string | null
                country?: string | null
            } | null
        }
        registration: {
            __typename?: 'RegistrationType'
            id: string
            createdAt: string
            updatedAt: string
            remarks?: string | null
            status: RegistrationStatus
            registeredPublicly: boolean
            referringOrganization?: ReferringOrganizationEnum | null
            referringOrganizationOther?: string | null
            foundVia?: IntakeFoundVia | null
            foundViaOther?: string | null
            wentToLanguageHouseBefore?: boolean | null
            wentToLanguageHouseBeforeReason?: string | null
            wentToLanguageHouseBeforeYear?: number | null
            network?: Array<IntakeNetwork> | null
            participationLadder?: IntakeParticipationLadder | null
            dutchNTLevel?: DutchNtType | null
            inNetherlandsSinceYear?: number | null
            languageInDailyLife?: string | null
            knowsLatinAlphabet?: boolean | null
            lastKnownLevel?: DutchNt2Level | null
            speakingLevel?: SpeakingLevel | null
            trainedForJob?: string | null
            lastJob?: string | null
            hasTriedThisBefore?: boolean | null
            hasTriedThisBeforeExplanation?: string | null
            whyWantTheseskills?: string | null
            whyWantThisNow?: string | null
            desiredLearningMethod?: Array<DesiredLearningMethod> | null
            dayTimeActivities?: Array<IntakeDayTimeActivities> | null
            dayTimeActivitiesOther?: string | null
            readingTestResult?: ReadingTestResult | null
            writingTestResult?: WritingTestResult | null
            selfRegistered?: boolean | null
            desiredLearningNeedOutcome?: {
                __typename?: 'LearningNeedOutcomeType'
                id: string
                subject?: LearningResultSubject | null
                subjectOther?: string | null
                application?: LearningResultApplication | null
                applicationOther?: string | null
                level?: LearningResultLevel | null
                levelOther?: string | null
            } | null
            referringPerson?: {
                __typename?: 'PersonType'
                id: string
                createdAt: string
                updatedAt: string
                givenName?: string | null
                email?: string | null
                additionalName?: string | null
                familyName?: string | null
                gender?: Gender | null
                birthplace?: string | null
                birthday?: string | null
                telephone?: string | null
                contactPreference?: ContactPreference | null
                contactPreferenceOther?: string | null
                maritalStatus?: MaritalStatus | null
                spokenLanguages?: string | null
                primaryLanguage?: string | null
                children?: number | null
                availability?: Array<Availability> | null
                availabilityNotes?: string | null
                didSignPermissionForm: boolean
                hasPermissionToSendInformationAboutLibraries: boolean
                hasPermissionToShareDataWithLibraries: boolean
                hasPermissionToShareDataWithProviders: boolean
                address?: {
                    __typename?: 'AddressType'
                    id: string
                    createdAt: string
                    updatedAt: string
                    name?: string | null
                    street?: string | null
                    houseNumber?: string | null
                    houseNumberSuffix?: string | null
                    postalCode?: string | null
                    locality?: string | null
                    country?: string | null
                } | null
            } | null
        }
    }
}

export type StudentForMentorQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type StudentForMentorQuery = {
    __typename?: 'Query'
    student: {
        __typename?: 'StudentType'
        id: string
        person: {
            __typename?: 'PersonType'
            id: string
            givenName?: string | null
            additionalName?: string | null
            familyName?: string | null
        }
        organization: { __typename?: 'OrganizationType'; id: string; name: string }
        team?: { __typename?: 'TeamType'; id: string; name: string } | null
        mentor?: {
            __typename?: 'EmployeeType'
            id: string
            person: {
                __typename?: 'PersonType'
                id: string
                givenName?: string | null
                additionalName?: string | null
                familyName?: string | null
            }
        } | null
    }
}

export type StudentForRegistrationQueryVariables = Exact<{
    studentId: Scalars['String']
}>

export type StudentForRegistrationQuery = {
    __typename?: 'Query'
    student: {
        __typename?: 'StudentType'
        id: string
        person: {
            __typename?: 'PersonType'
            id: string
            createdAt: string
            givenName?: string | null
            additionalName?: string | null
            familyName?: string | null
            email?: string | null
            secondaryEmail?: string | null
            telephone?: string | null
            address?: {
                __typename?: 'AddressType'
                id: string
                name?: string | null
                street?: string | null
                houseNumber?: string | null
                houseNumberSuffix?: string | null
                postalCode?: string | null
                locality?: string | null
                country?: string | null
            } | null
        }
        registration: {
            __typename?: 'RegistrationType'
            id: string
            registeredPublicly: boolean
            referringOrganization?: ReferringOrganizationEnum | null
            referringOrganizationOther?: string | null
            referringTeam?: string | null
            remarks?: string | null
            selfRegistered?: boolean | null
            referringPerson?: {
                __typename?: 'PersonType'
                id: string
                givenName?: string | null
                additionalName?: string | null
                familyName?: string | null
                email?: string | null
                telephone?: string | null
            } | null
        }
    }
}

export type StudentsQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    organizationId: Scalars['String']
    status?: InputMaybe<Scalars['String']>
    participationStatus?: InputMaybe<ParticipationStatus>
    mentorEmployeeId?: InputMaybe<Scalars['String']>
    educationGroupId?: InputMaybe<Scalars['String']>
    sort?: InputMaybe<StudentsSortInputType>
    searchName?: InputMaybe<Scalars['String']>
    team?: InputMaybe<Scalars['String']>
}>

export type StudentsQuery = {
    __typename?: 'Query'
    students: {
        __typename?: 'PaginatedStudentResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'StudentType'
            id: string
            createdAt: string
            intakeDate: string
            team?: { __typename?: 'TeamType'; id: string; name: string } | null
            mentor?: {
                __typename?: 'EmployeeType'
                id: string
                person: {
                    __typename?: 'PersonType'
                    id: string
                    givenName?: string | null
                    additionalName?: string | null
                    familyName?: string | null
                }
            } | null
            person: {
                __typename?: 'PersonType'
                id: string
                createdAt: string
                updatedAt: string
                givenName?: string | null
                additionalName?: string | null
                familyName?: string | null
            }
            registration: {
                __typename?: 'RegistrationType'
                id: string
                referringOrganizationOther?: string | null
                referringTeam?: string | null
                createdAt: string
                referringPerson?: {
                    __typename?: 'PersonType'
                    id: string
                    givenName?: string | null
                    additionalName?: string | null
                    familyName?: string | null
                } | null
            }
            learningNeeds?: Array<{
                __typename?: 'LearningNeedType'
                id: string
                participations?: Array<{ __typename?: 'ParticipationType'; id: string; createdAt: string }> | null
            }> | null
        }>
    }
}

export type TeamQueryVariables = Exact<{
    teamId: Scalars['ID']
}>

export type TeamQuery = {
    __typename?: 'Query'
    team: {
        __typename?: 'TeamType'
        id: string
        createdAt: string
        updatedAt: string
        name: string
        postalCodeAreas: Array<{ __typename?: 'PostalCodeAreaType'; id: string; code: number }>
    }
}

export type TeamsQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    organizationId: Scalars['ID']
    sort?: InputMaybe<TeamsSortInputType>
}>

export type TeamsQuery = {
    __typename?: 'Query'
    teams: {
        __typename?: 'PaginatedTeamResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'TeamType'
            id: string
            createdAt: string
            updatedAt: string
            name: string
            hiddenFromPublic?: boolean | null
            members: Array<{ __typename?: 'EmployeeType'; id: string }>
            parentOrganization: {
                __typename?: 'OrganizationType'
                createdAt: string
                updatedAt: string
                name: string
                description?: string | null
                type: OrganizationTypeEnum
                email?: string | null
                telephone?: string | null
            }
            postalCodeAreas: Array<{
                __typename?: 'PostalCodeAreaType'
                id: string
                createdAt: string
                updatedAt: string
                code: number
            }>
        }>
    }
}

export type TeamsForDropdownQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    organizationId: Scalars['ID']
    filterForEmployeeId?: InputMaybe<Scalars['ID']>
}>

export type TeamsForDropdownQuery = {
    __typename?: 'Query'
    teams: {
        __typename?: 'PaginatedTeamResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{ __typename?: 'TeamType'; id: string; name: string }>
    }
}

export type ProvidersForLanguageHouseQueryVariables = Exact<{
    paginationArgs: PaginatedInputType
    languageHouseId: Scalars['String']
}>

export type ProvidersForLanguageHouseQuery = {
    __typename?: 'Query'
    organizations: {
        __typename?: 'PaginatedOrganisationResponse'
        totalCount?: number | null
        hasMore?: boolean | null
        nodes: Array<{
            __typename?: 'OrganizationType'
            id: string
            name: string
            isLanguageHouseProvider?: boolean | null
            students?: Array<{ __typename?: 'StudentType'; id: string }> | null
        }>
    }
}

export type EditProviderEducationGroupMutationVariables = Exact<{
    input: EditEducationGroupInputType
}>

export type EditProviderEducationGroupMutation = {
    __typename?: 'Mutation'
    editEducationGroup: {
        __typename?: 'EducationGroupType'
        id: string
        name: string
        type: GroupOfferType
        availability?: Array<Availability> | null
        availabilityNotes?: string | null
        location: string
        minimumParticipants?: number | null
        maximumParticipants?: number | null
        evaluation?: string | null
        lessonHours?: number | null
        degree?: boolean | null
        formality?: GroupFormality | null
        start?: string | null
        end?: string | null
        desiredLearningNeedOutcome: {
            __typename?: 'LearningNeedOutcomeType'
            id: string
            subject?: LearningResultSubject | null
            subjectOther?: string | null
            application?: LearningResultApplication | null
            applicationOther?: string | null
            level?: LearningResultLevel | null
            levelOther?: string | null
        }
        employees?: Array<{
            __typename?: 'EmployeeType'
            id: string
            person: {
                __typename?: 'PersonType'
                givenName?: string | null
                additionalName?: string | null
                familyName?: string | null
            }
        }> | null
    }
}

export type ProviderEducationGroupQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type ProviderEducationGroupQuery = {
    __typename?: 'Query'
    educationGroup: {
        __typename?: 'EducationGroupType'
        id: string
        name: string
        type: GroupOfferType
        availability?: Array<Availability> | null
        availabilityNotes?: string | null
        location: string
        minimumParticipants?: number | null
        maximumParticipants?: number | null
        evaluation?: string | null
        lessonHours?: number | null
        degree?: boolean | null
        formality?: GroupFormality | null
        start?: string | null
        end?: string | null
        desiredLearningNeedOutcome: {
            __typename?: 'LearningNeedOutcomeType'
            id: string
            subject?: LearningResultSubject | null
            subjectOther?: string | null
            application?: LearningResultApplication | null
            applicationOther?: string | null
            level?: LearningResultLevel | null
            levelOther?: string | null
        }
        employees?: Array<{
            __typename?: 'EmployeeType'
            id: string
            person: {
                __typename?: 'PersonType'
                givenName?: string | null
                additionalName?: string | null
                familyName?: string | null
            }
        }> | null
    }
}

export const ProviderMentorFormFieldsFragmentFragmentDoc = gql`
    fragment ProviderMentorFormFieldsFragment on EmployeeType {
        id
        role
        createdAt
        updatedAt
        person {
            id
            familyName
            givenName
            additionalName
            email
            telephone
            gender
            birthday
            birthplace
            emergencyTelephone
            contactPreference
            contactPreferenceOther
            providerTargetGroupPreference
            providerVolunteeringPreference
            providerLanguageHouseVolunteeringReference
            providerTargetGroupIsExperienced
            providerTargetGroupExperience
            address {
                id
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
                country
            }
            educations {
                id
                createdAt
                updatedAt
                name
                type
                level
                levelOther
                degree
                degreeGranted
                currentlyFollowingStatus
                startDate
                endDate
                yearsFollowed
                institution
                group
                courseTeacherType
                hours
                other
            }
            availabilityNotes
            availability
        }
    }
`
export const ProviderGroupFormFieldsFragmentFragmentDoc = gql`
    fragment ProviderGroupFormFieldsFragment on EducationGroupType {
        id
        name
        type
        availability
        availabilityNotes
        location
        minimumParticipants
        maximumParticipants
        evaluation
        lessonHours
        degree
        formality
        start
        end
        desiredLearningNeedOutcome {
            id
            subject
            subjectOther
            application
            applicationOther
            level
            levelOther
        }
        employees {
            id
            person {
                givenName
                additionalName
                familyName
            }
        }
    }
`
export const AcceptRegistrationDocument = gql`
    mutation acceptRegistration($studentId: String!) {
        acceptRegistration(studentId: $studentId) {
            id
            person {
                id
                email
            }
            registration {
                id
                status
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<AcceptRegistrationMutation, AcceptRegistrationMutationVariables>(
        AcceptRegistrationDocument,
        options
    )
}
export type AcceptRegistrationMutationHookResult = ReturnType<typeof useAcceptRegistrationMutation>
export type AcceptRegistrationMutationResult = Apollo.MutationResult<AcceptRegistrationMutation>
export type AcceptRegistrationMutationOptions = Apollo.BaseMutationOptions<
    AcceptRegistrationMutation,
    AcceptRegistrationMutationVariables
>
export const ChangePasswordDocument = gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
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
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options)
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>
export const CreateDocumentDocument = gql`
    mutation createDocument($input: CreateUploadedDocumentInputType!) {
        createDocument(input: $input) {
            id
            createdAt
            updatedAt
            file {
                name
                extension
                mimeType
                size
                base64
            }
        }
    }
`

/**
 * __useCreateDocumentMutation__
 *
 * To run a mutation, you first call `useCreateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentMutation, { data, loading, error }] = useCreateDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDocumentMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateDocumentMutation, CreateDocumentMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(CreateDocumentDocument, options)
}
export type CreateDocumentMutationHookResult = ReturnType<typeof useCreateDocumentMutation>
export type CreateDocumentMutationResult = Apollo.MutationResult<CreateDocumentMutation>
export type CreateDocumentMutationOptions = Apollo.BaseMutationOptions<
    CreateDocumentMutation,
    CreateDocumentMutationVariables
>
export const CreateEducationGroupDocument = gql`
    mutation createEducationGroup($input: CreateEducationGroupInputType!) {
        createEducationGroup(input: $input) {
            id
            createdAt
            updatedAt
            name
            type
            formality
            lessonHours
            degree
            start
            end
            availability
            availabilityNotes
            location
            minimumParticipants
            maximumParticipants
            evaluation
            status
            desiredLearningNeedOutcome {
                id
                createdAt
                updatedAt
                subject
                subjectOther
                application
                applicationOther
                level
                levelOther
            }
            organization {
                id
                name
            }
            employees {
                id
                person {
                    availability
                    availabilityNotes
                }
            }
        }
    }
`

/**
 * __useCreateEducationGroupMutation__
 *
 * To run a mutation, you first call `useCreateEducationGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEducationGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEducationGroupMutation, { data, loading, error }] = useCreateEducationGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEducationGroupMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateEducationGroupMutation, CreateEducationGroupMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateEducationGroupMutation, CreateEducationGroupMutationVariables>(
        CreateEducationGroupDocument,
        options
    )
}
export type CreateEducationGroupMutationHookResult = ReturnType<typeof useCreateEducationGroupMutation>
export type CreateEducationGroupMutationResult = Apollo.MutationResult<CreateEducationGroupMutation>
export type CreateEducationGroupMutationOptions = Apollo.BaseMutationOptions<
    CreateEducationGroupMutation,
    CreateEducationGroupMutationVariables
>
export const CreateEmployeeDocument = gql`
    mutation createEmployee($createEmployeeInput: CreateEmployeeInputType!) {
        createEmployee(createEmployeeInput: $createEmployeeInput) {
            id
            organization {
                id
                name
            }
            person {
                id
                familyName
                additionalName
                givenName
                email
                telephone
                availabilityNotes
                availability
                providerTargetGroupPreference
                providerVolunteeringPreference
                providerLanguageHouseVolunteeringReference
                providerTargetGroupIsExperienced
                providerTargetGroupExperience
            }
            role
            createdAt
            updatedAt
        }
    }
`

/**
 * __useCreateEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeMutation, { data, loading, error }] = useCreateEmployeeMutation({
 *   variables: {
 *      createEmployeeInput: // value for 'createEmployeeInput'
 *   },
 * });
 */
export function useCreateEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(CreateEmployeeDocument, options)
}
export type CreateEmployeeMutationHookResult = ReturnType<typeof useCreateEmployeeMutation>
export type CreateEmployeeMutationResult = Apollo.MutationResult<CreateEmployeeMutation>
export type CreateEmployeeMutationOptions = Apollo.BaseMutationOptions<
    CreateEmployeeMutation,
    CreateEmployeeMutationVariables
>
export const CreateLearningNeedDocument = gql`
    mutation createLearningNeed($input: CreateLearningNeedInputType!) {
        createLearningNeed(input: $input) {
            id
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateLearningNeedMutation, CreateLearningNeedMutationVariables>(
        CreateLearningNeedDocument,
        options
    )
}
export type CreateLearningNeedMutationHookResult = ReturnType<typeof useCreateLearningNeedMutation>
export type CreateLearningNeedMutationResult = Apollo.MutationResult<CreateLearningNeedMutation>
export type CreateLearningNeedMutationOptions = Apollo.BaseMutationOptions<
    CreateLearningNeedMutation,
    CreateLearningNeedMutationVariables
>
export const CreateOrganizationDocument = gql`
    mutation createOrganization($input: CreateOrganizationInputType!) {
        createOrganization(input: $input) {
            id
            name
            description
            type
            employees {
                id
            }
            address {
                id
            }
        }
    }
`

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrganizationMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(
        CreateOrganizationDocument,
        options
    )
}
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<
    CreateOrganizationMutation,
    CreateOrganizationMutationVariables
>
export const CreateParticipationDocument = gql`
    mutation createParticipation($input: CreateParticipationInputType!) {
        createParticipation(input: $input) {
            id
            learningNeed {
                id
            }
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateParticipationMutation, CreateParticipationMutationVariables>(
        CreateParticipationDocument,
        options
    )
}
export type CreateParticipationMutationHookResult = ReturnType<typeof useCreateParticipationMutation>
export type CreateParticipationMutationResult = Apollo.MutationResult<CreateParticipationMutation>
export type CreateParticipationMutationOptions = Apollo.BaseMutationOptions<
    CreateParticipationMutation,
    CreateParticipationMutationVariables
>
export const CreateStudentDocument = gql`
    mutation createStudent($createStudentInput: CreateStudentInput!) {
        createStudent(createStudentInput: $createStudentInput) {
            id
            civicIntegration {
                id
                createdAt
                updatedAt
                reason
                requirement
                finishDate
            }
            person {
                id
                createdAt
                updatedAt
                givenName
                email
                secondaryEmail
                additionalName
                familyName
                gender
                birthplace
                birthday
                telephone
                contactPreference
                contactPreferenceOther
                emergencyTelephone
                maritalStatus
                spokenLanguages
                primaryLanguage
                children
                availability
                availabilityNotes
                didSignPermissionForm
                hasPermissionToSendInformationAboutLibraries
                hasPermissionToShareDataWithLibraries
                hasPermissionToShareDataWithProviders
                address {
                    id
                    createdAt
                    updatedAt
                    name
                    street
                    houseNumber
                    houseNumberSuffix
                    postalCode
                    locality
                    country
                }
                educations {
                    id
                    createdAt
                    updatedAt
                    name
                    type
                    level
                    levelOther
                    degree
                    degreeGranted
                    currentlyFollowingStatus
                    startDate
                    yearsFollowed
                    institution
                    group
                    courseTeacherType
                    hours
                }
            }
            organization {
                id
                createdAt
                updatedAt
                name
                description
                type
                email
                telephone
            }
            registration {
                id
                createdAt
                updatedAt
                remarks
                status
                registeredPublicly
                referringOrganization
                referringOrganizationOther
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
                speakingLevel
                trainedForJob
                lastJob
                desiredLearningNeedOutcome {
                    id
                    subject
                    subjectOther
                    application
                    applicationOther
                    level
                    levelOther
                }
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseskills
                whyWantThisNow
                desiredLearningMethod
                dayTimeActivities
                dayTimeActivitiesOther
                readingTestResult
                writingTestResult
                referringPerson {
                    id
                    createdAt
                    updatedAt
                    givenName
                    email
                    additionalName
                    familyName
                    gender
                    birthplace
                    birthday
                    telephone
                    contactPreference
                    contactPreferenceOther
                    maritalStatus
                    spokenLanguages
                    primaryLanguage
                    children
                    availability
                    availabilityNotes
                    didSignPermissionForm
                    hasPermissionToSendInformationAboutLibraries
                    hasPermissionToShareDataWithLibraries
                    hasPermissionToShareDataWithProviders
                    address {
                        id
                        createdAt
                        updatedAt
                        name
                        street
                        houseNumber
                        houseNumberSuffix
                        postalCode
                        locality
                        country
                    }
                }
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
 *      createStudentInput: // value for 'createStudentInput'
 *   },
 * });
 */
export function useCreateStudentMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateStudentMutation, CreateStudentMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument, options)
}
export type CreateStudentMutationHookResult = ReturnType<typeof useCreateStudentMutation>
export type CreateStudentMutationResult = Apollo.MutationResult<CreateStudentMutation>
export type CreateStudentMutationOptions = Apollo.BaseMutationOptions<
    CreateStudentMutation,
    CreateStudentMutationVariables
>
export const CreateStudentContactMomentDocument = gql`
    mutation createStudentContactMoment($input: CreateStudentContactMomentInputType!) {
        createStudentContactMoment(input: $input) {
            id
            createdAt
            createdByEmployee {
                id
                person {
                    id
                    givenName
                    additionalName
                    familyName
                }
            }
            updatedAt
            type
            date
            explanation
        }
    }
`

/**
 * __useCreateStudentContactMomentMutation__
 *
 * To run a mutation, you first call `useCreateStudentContactMomentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentContactMomentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentContactMomentMutation, { data, loading, error }] = useCreateStudentContactMomentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStudentContactMomentMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateStudentContactMomentMutation,
        CreateStudentContactMomentMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateStudentContactMomentMutation, CreateStudentContactMomentMutationVariables>(
        CreateStudentContactMomentDocument,
        options
    )
}
export type CreateStudentContactMomentMutationHookResult = ReturnType<typeof useCreateStudentContactMomentMutation>
export type CreateStudentContactMomentMutationResult = Apollo.MutationResult<CreateStudentContactMomentMutation>
export type CreateStudentContactMomentMutationOptions = Apollo.BaseMutationOptions<
    CreateStudentContactMomentMutation,
    CreateStudentContactMomentMutationVariables
>
export const CreateTeamDocument = gql`
    mutation createTeam($input: CreateTeamInputType!) {
        createTeam(input: $input) {
            id
            createdAt
            updatedAt
            name
            members {
                id
                createdAt
                updatedAt
                role
            }
            parentOrganization {
                createdAt
                updatedAt
                name
                description
                type
                email
                telephone
            }
            postalCodeAreas {
                id
                createdAt
                updatedAt
                code
            }
        }
    }
`

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options)
}
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>
export const CreateTestResultDocument = gql`
    mutation createTestResult($input: CreateTestResultInputType!) {
        createTestResult(input: $input) {
            id
        }
    }
`

/**
 * __useCreateTestResultMutation__
 *
 * To run a mutation, you first call `useCreateTestResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestResultMutation, { data, loading, error }] = useCreateTestResultMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTestResultMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateTestResultMutation, CreateTestResultMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreateTestResultMutation, CreateTestResultMutationVariables>(
        CreateTestResultDocument,
        options
    )
}
export type CreateTestResultMutationHookResult = ReturnType<typeof useCreateTestResultMutation>
export type CreateTestResultMutationResult = Apollo.MutationResult<CreateTestResultMutation>
export type CreateTestResultMutationOptions = Apollo.BaseMutationOptions<
    CreateTestResultMutation,
    CreateTestResultMutationVariables
>
export const DeleteDocumentDocument = gql`
    mutation deleteDocument($input: DeleteUploadedDocumentInputType!) {
        deleteDocument(input: $input)
    }
`

/**
 * __useDeleteDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDocumentMutation, { data, loading, error }] = useDeleteDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDocumentMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteDocumentMutation, DeleteDocumentMutationVariables>(DeleteDocumentDocument, options)
}
export type DeleteDocumentMutationHookResult = ReturnType<typeof useDeleteDocumentMutation>
export type DeleteDocumentMutationResult = Apollo.MutationResult<DeleteDocumentMutation>
export type DeleteDocumentMutationOptions = Apollo.BaseMutationOptions<
    DeleteDocumentMutation,
    DeleteDocumentMutationVariables
>
export const DeleteEmployeeDocument = gql`
    mutation deleteEmployee($employeeId: String!) {
        deleteEmployee(id: $employeeId)
    }
`

/**
 * __useDeleteEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmployeeMutation, { data, loading, error }] = useDeleteEmployeeMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useDeleteEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>(DeleteEmployeeDocument, options)
}
export type DeleteEmployeeMutationHookResult = ReturnType<typeof useDeleteEmployeeMutation>
export type DeleteEmployeeMutationResult = Apollo.MutationResult<DeleteEmployeeMutation>
export type DeleteEmployeeMutationOptions = Apollo.BaseMutationOptions<
    DeleteEmployeeMutation,
    DeleteEmployeeMutationVariables
>
export const DeleteLearningNeedDocument = gql`
    mutation deleteLearningNeed($learningNeedId: String!) {
        deleteLearningNeed(id: $learningNeedId)
    }
`

/**
 * __useDeleteLearningNeedMutation__
 *
 * To run a mutation, you first call `useDeleteLearningNeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLearningNeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLearningNeedMutation, { data, loading, error }] = useDeleteLearningNeedMutation({
 *   variables: {
 *      learningNeedId: // value for 'learningNeedId'
 *   },
 * });
 */
export function useDeleteLearningNeedMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteLearningNeedMutation, DeleteLearningNeedMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteLearningNeedMutation, DeleteLearningNeedMutationVariables>(
        DeleteLearningNeedDocument,
        options
    )
}
export type DeleteLearningNeedMutationHookResult = ReturnType<typeof useDeleteLearningNeedMutation>
export type DeleteLearningNeedMutationResult = Apollo.MutationResult<DeleteLearningNeedMutation>
export type DeleteLearningNeedMutationOptions = Apollo.BaseMutationOptions<
    DeleteLearningNeedMutation,
    DeleteLearningNeedMutationVariables
>
export const DeleteParticipationDocument = gql`
    mutation deleteParticipation($input: DeleteParticipationInputType!) {
        deleteParticipation(input: $input)
    }
`

/**
 * __useDeleteParticipationMutation__
 *
 * To run a mutation, you first call `useDeleteParticipationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteParticipationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteParticipationMutation, { data, loading, error }] = useDeleteParticipationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteParticipationMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteParticipationMutation, DeleteParticipationMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteParticipationMutation, DeleteParticipationMutationVariables>(
        DeleteParticipationDocument,
        options
    )
}
export type DeleteParticipationMutationHookResult = ReturnType<typeof useDeleteParticipationMutation>
export type DeleteParticipationMutationResult = Apollo.MutationResult<DeleteParticipationMutation>
export type DeleteParticipationMutationOptions = Apollo.BaseMutationOptions<
    DeleteParticipationMutation,
    DeleteParticipationMutationVariables
>
export const DeleteStudentDocument = gql`
    mutation deleteStudent($input: DeleteStudentInputType!) {
        deleteStudent(input: $input)
    }
`

/**
 * __useDeleteStudentMutation__
 *
 * To run a mutation, you first call `useDeleteStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudentMutation, { data, loading, error }] = useDeleteStudentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteStudentMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteStudentMutation, DeleteStudentMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteStudentMutation, DeleteStudentMutationVariables>(DeleteStudentDocument, options)
}
export type DeleteStudentMutationHookResult = ReturnType<typeof useDeleteStudentMutation>
export type DeleteStudentMutationResult = Apollo.MutationResult<DeleteStudentMutation>
export type DeleteStudentMutationOptions = Apollo.BaseMutationOptions<
    DeleteStudentMutation,
    DeleteStudentMutationVariables
>
export const DeleteStudentContactMomentDocument = gql`
    mutation deleteStudentContactMoment($input: DeleteStudentContactMomentInputType!) {
        deleteStudentContactMoment(input: $input)
    }
`

/**
 * __useDeleteStudentContactMomentMutation__
 *
 * To run a mutation, you first call `useDeleteStudentContactMomentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudentContactMomentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudentContactMomentMutation, { data, loading, error }] = useDeleteStudentContactMomentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteStudentContactMomentMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteStudentContactMomentMutation,
        DeleteStudentContactMomentMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteStudentContactMomentMutation, DeleteStudentContactMomentMutationVariables>(
        DeleteStudentContactMomentDocument,
        options
    )
}
export type DeleteStudentContactMomentMutationHookResult = ReturnType<typeof useDeleteStudentContactMomentMutation>
export type DeleteStudentContactMomentMutationResult = Apollo.MutationResult<DeleteStudentContactMomentMutation>
export type DeleteStudentContactMomentMutationOptions = Apollo.BaseMutationOptions<
    DeleteStudentContactMomentMutation,
    DeleteStudentContactMomentMutationVariables
>
export const DeleteTeamDocument = gql`
    mutation deleteTeam($input: DeleteTeamInputType!) {
        deleteTeam(input: $input)
    }
`

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTeamMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options)
}
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>
export const DeleteTestResultDocument = gql`
    mutation deleteTestResult($input: DeleteTestResultInputType!) {
        deleteTestResult(input: $input)
    }
`

/**
 * __useDeleteTestResultMutation__
 *
 * To run a mutation, you first call `useDeleteTestResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTestResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTestResultMutation, { data, loading, error }] = useDeleteTestResultMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTestResultMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteTestResultMutation, DeleteTestResultMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteTestResultMutation, DeleteTestResultMutationVariables>(
        DeleteTestResultDocument,
        options
    )
}
export type DeleteTestResultMutationHookResult = ReturnType<typeof useDeleteTestResultMutation>
export type DeleteTestResultMutationResult = Apollo.MutationResult<DeleteTestResultMutation>
export type DeleteTestResultMutationOptions = Apollo.BaseMutationOptions<
    DeleteTestResultMutation,
    DeleteTestResultMutationVariables
>
export const EditEmployeeDocument = gql`
    mutation editEmployee($editEmployeeInput: EditEmployeeInputType!, $withEducations: Boolean! = false) {
        editEmployee(editEmployeeInput: $editEmployeeInput) {
            id
            organization {
                id
                name
            }
            person {
                id
                familyName
                additionalName
                givenName
                email
                telephone
                availabilityNotes
                availability
                educations @include(if: $withEducations) {
                    id
                    createdAt
                    updatedAt
                    name
                    type
                    level
                    levelOther
                    degree
                    degreeGranted
                    currentlyFollowingStatus
                    startDate
                    endDate
                    yearsFollowed
                    institution
                    group
                    courseTeacherType
                    hours
                    other
                }
                employees {
                    id
                }
            }
            role
            createdAt
            updatedAt
        }
    }
`

/**
 * __useEditEmployeeMutation__
 *
 * To run a mutation, you first call `useEditEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEmployeeMutation, { data, loading, error }] = useEditEmployeeMutation({
 *   variables: {
 *      editEmployeeInput: // value for 'editEmployeeInput'
 *      withEducations: // value for 'withEducations'
 *   },
 * });
 */
export function useEditEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<EditEmployeeMutation, EditEmployeeMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditEmployeeMutation, EditEmployeeMutationVariables>(EditEmployeeDocument, options)
}
export type EditEmployeeMutationHookResult = ReturnType<typeof useEditEmployeeMutation>
export type EditEmployeeMutationResult = Apollo.MutationResult<EditEmployeeMutation>
export type EditEmployeeMutationOptions = Apollo.BaseMutationOptions<
    EditEmployeeMutation,
    EditEmployeeMutationVariables
>
export const EditLearningNeedDocument = gql`
    mutation editLearningNeed($input: EditLearningNeedInputType!) {
        editLearningNeed(input: $input) {
            id
        }
    }
`

/**
 * __useEditLearningNeedMutation__
 *
 * To run a mutation, you first call `useEditLearningNeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditLearningNeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editLearningNeedMutation, { data, loading, error }] = useEditLearningNeedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditLearningNeedMutation(
    baseOptions?: Apollo.MutationHookOptions<EditLearningNeedMutation, EditLearningNeedMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditLearningNeedMutation, EditLearningNeedMutationVariables>(
        EditLearningNeedDocument,
        options
    )
}
export type EditLearningNeedMutationHookResult = ReturnType<typeof useEditLearningNeedMutation>
export type EditLearningNeedMutationResult = Apollo.MutationResult<EditLearningNeedMutation>
export type EditLearningNeedMutationOptions = Apollo.BaseMutationOptions<
    EditLearningNeedMutation,
    EditLearningNeedMutationVariables
>
export const EditOrganizationDocument = gql`
    mutation editOrganization($input: EditOrganizationInputType!) {
        editOrganization(input: $input) {
            id
            name
            description
            type
            employees {
                id
            }
            address {
                id
            }
            postalCodes {
                id
                code
            }
        }
    }
`

/**
 * __useEditOrganizationMutation__
 *
 * To run a mutation, you first call `useEditOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrganizationMutation, { data, loading, error }] = useEditOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrganizationMutation(
    baseOptions?: Apollo.MutationHookOptions<EditOrganizationMutation, EditOrganizationMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditOrganizationMutation, EditOrganizationMutationVariables>(
        EditOrganizationDocument,
        options
    )
}
export type EditOrganizationMutationHookResult = ReturnType<typeof useEditOrganizationMutation>
export type EditOrganizationMutationResult = Apollo.MutationResult<EditOrganizationMutation>
export type EditOrganizationMutationOptions = Apollo.BaseMutationOptions<
    EditOrganizationMutation,
    EditOrganizationMutationVariables
>
export const EditParticipationDocument = gql`
    mutation editParticipation($input: EditParticipationInputType!) {
        editParticipation(input: $input) {
            id
        }
    }
`

/**
 * __useEditParticipationMutation__
 *
 * To run a mutation, you first call `useEditParticipationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditParticipationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editParticipationMutation, { data, loading, error }] = useEditParticipationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditParticipationMutation(
    baseOptions?: Apollo.MutationHookOptions<EditParticipationMutation, EditParticipationMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditParticipationMutation, EditParticipationMutationVariables>(
        EditParticipationDocument,
        options
    )
}
export type EditParticipationMutationHookResult = ReturnType<typeof useEditParticipationMutation>
export type EditParticipationMutationResult = Apollo.MutationResult<EditParticipationMutation>
export type EditParticipationMutationOptions = Apollo.BaseMutationOptions<
    EditParticipationMutation,
    EditParticipationMutationVariables
>
export const EditStudentDocument = gql`
    mutation editStudent($editStudentInput: EditStudentInput!) {
        editStudent(editStudentInput: $editStudentInput) {
            id
            createdAt
            intakeDate
            civicIntegration {
                id
                createdAt
                updatedAt
                reason
                requirement
                finishDate
            }
            person {
                id
                createdAt
                updatedAt
                givenName
                email
                secondaryEmail
                additionalName
                familyName
                gender
                birthplace
                birthday
                telephone
                contactPreference
                contactPreferenceOther
                emergencyTelephone
                maritalStatus
                spokenLanguages
                primaryLanguage
                children
                availability
                availabilityNotes
                didSignPermissionForm
                hasPermissionToSendInformationAboutLibraries
                hasPermissionToShareDataWithLibraries
                hasPermissionToShareDataWithProviders
                educations {
                    id
                    createdAt
                    updatedAt
                    name
                    type
                    level
                    levelOther
                    degree
                    degreeGranted
                    currentlyFollowingStatus
                    startDate
                    yearsFollowed
                    institution
                    group
                    courseTeacherType
                    hours
                }
                address {
                    id
                    createdAt
                    updatedAt
                    name
                    street
                    houseNumber
                    houseNumberSuffix
                    postalCode
                    locality
                    country
                }
            }
            organization {
                id
                createdAt
                updatedAt
                name
                description
                type
                email
                telephone
            }
            registration {
                id
                createdAt
                updatedAt
                remarks
                status
                registeredPublicly
                referringOrganization
                referringOrganizationOther
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
                speakingLevel
                trainedForJob
                lastJob
                desiredLearningNeedOutcome {
                    id
                    subject
                    subjectOther
                    application
                    applicationOther
                    level
                    levelOther
                }
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseskills
                whyWantThisNow
                desiredLearningMethod
                dayTimeActivities
                dayTimeActivitiesOther
                readingTestResult
                writingTestResult
                referringPerson {
                    id
                    createdAt
                    updatedAt
                    givenName
                    email
                    additionalName
                    familyName
                    gender
                    birthplace
                    birthday
                    telephone
                    contactPreference
                    contactPreferenceOther
                    maritalStatus
                    spokenLanguages
                    primaryLanguage
                    children
                    availability
                    availabilityNotes
                    didSignPermissionForm
                    hasPermissionToSendInformationAboutLibraries
                    hasPermissionToShareDataWithLibraries
                    hasPermissionToShareDataWithProviders
                    address {
                        id
                        createdAt
                        updatedAt
                        name
                        street
                        houseNumber
                        houseNumberSuffix
                        postalCode
                        locality
                        country
                    }
                }
            }
        }
    }
`

/**
 * __useEditStudentMutation__
 *
 * To run a mutation, you first call `useEditStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editStudentMutation, { data, loading, error }] = useEditStudentMutation({
 *   variables: {
 *      editStudentInput: // value for 'editStudentInput'
 *   },
 * });
 */
export function useEditStudentMutation(
    baseOptions?: Apollo.MutationHookOptions<EditStudentMutation, EditStudentMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditStudentMutation, EditStudentMutationVariables>(EditStudentDocument, options)
}
export type EditStudentMutationHookResult = ReturnType<typeof useEditStudentMutation>
export type EditStudentMutationResult = Apollo.MutationResult<EditStudentMutation>
export type EditStudentMutationOptions = Apollo.BaseMutationOptions<EditStudentMutation, EditStudentMutationVariables>
export const EditStudentContactMomentDocument = gql`
    mutation editStudentContactMoment($input: EditStudentContactMomentInputType!) {
        editStudentContactMoment(input: $input) {
            id
            createdAt
            createdByEmployee {
                id
                person {
                    id
                    givenName
                    additionalName
                    familyName
                }
            }
            updatedAt
            type
            date
            explanation
        }
    }
`

/**
 * __useEditStudentContactMomentMutation__
 *
 * To run a mutation, you first call `useEditStudentContactMomentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditStudentContactMomentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editStudentContactMomentMutation, { data, loading, error }] = useEditStudentContactMomentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditStudentContactMomentMutation(
    baseOptions?: Apollo.MutationHookOptions<
        EditStudentContactMomentMutation,
        EditStudentContactMomentMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditStudentContactMomentMutation, EditStudentContactMomentMutationVariables>(
        EditStudentContactMomentDocument,
        options
    )
}
export type EditStudentContactMomentMutationHookResult = ReturnType<typeof useEditStudentContactMomentMutation>
export type EditStudentContactMomentMutationResult = Apollo.MutationResult<EditStudentContactMomentMutation>
export type EditStudentContactMomentMutationOptions = Apollo.BaseMutationOptions<
    EditStudentContactMomentMutation,
    EditStudentContactMomentMutationVariables
>
export const EditTeamDocument = gql`
    mutation editTeam($input: EditTeamInputType!) {
        editTeam(input: $input) {
            id
            createdAt
            updatedAt
            name
            members {
                id
                createdAt
                updatedAt
                role
            }
            parentOrganization {
                createdAt
                updatedAt
                name
                description
                type
                email
                telephone
            }
            postalCodeAreas {
                id
                createdAt
                updatedAt
                code
            }
        }
    }
`

/**
 * __useEditTeamMutation__
 *
 * To run a mutation, you first call `useEditTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTeamMutation, { data, loading, error }] = useEditTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditTeamMutation(
    baseOptions?: Apollo.MutationHookOptions<EditTeamMutation, EditTeamMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditTeamMutation, EditTeamMutationVariables>(EditTeamDocument, options)
}
export type EditTeamMutationHookResult = ReturnType<typeof useEditTeamMutation>
export type EditTeamMutationResult = Apollo.MutationResult<EditTeamMutation>
export type EditTeamMutationOptions = Apollo.BaseMutationOptions<EditTeamMutation, EditTeamMutationVariables>
export const EditTeamsDocument = gql`
    mutation editTeams($input: EditTeamsInputType!) {
        editTeams(input: $input) {
            id
            createdAt
            updatedAt
            name
            hiddenFromPublic
            members {
                id
                createdAt
                updatedAt
                role
            }
            parentOrganization {
                createdAt
                updatedAt
                name
                description
                type
                email
                telephone
            }
            postalCodeAreas {
                id
                createdAt
                updatedAt
                code
            }
        }
    }
`

/**
 * __useEditTeamsMutation__
 *
 * To run a mutation, you first call `useEditTeamsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTeamsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTeamsMutation, { data, loading, error }] = useEditTeamsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditTeamsMutation(
    baseOptions?: Apollo.MutationHookOptions<EditTeamsMutation, EditTeamsMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditTeamsMutation, EditTeamsMutationVariables>(EditTeamsDocument, options)
}
export type EditTeamsMutationHookResult = ReturnType<typeof useEditTeamsMutation>
export type EditTeamsMutationResult = Apollo.MutationResult<EditTeamsMutation>
export type EditTeamsMutationOptions = Apollo.BaseMutationOptions<EditTeamsMutation, EditTeamsMutationVariables>
export const EditTestResultDocument = gql`
    mutation editTestResult($input: EditTestResultInputType!) {
        editTestResult(input: $input) {
            id
        }
    }
`

/**
 * __useEditTestResultMutation__
 *
 * To run a mutation, you first call `useEditTestResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTestResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTestResultMutation, { data, loading, error }] = useEditTestResultMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditTestResultMutation(
    baseOptions?: Apollo.MutationHookOptions<EditTestResultMutation, EditTestResultMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditTestResultMutation, EditTestResultMutationVariables>(EditTestResultDocument, options)
}
export type EditTestResultMutationHookResult = ReturnType<typeof useEditTestResultMutation>
export type EditTestResultMutationResult = Apollo.MutationResult<EditTestResultMutation>
export type EditTestResultMutationOptions = Apollo.BaseMutationOptions<
    EditTestResultMutation,
    EditTestResultMutationVariables
>
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options)
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>
export const LoginDocument = gql`
    mutation login($credentials: LoginInput!) {
        login(credentials: $credentials) {
            id
            username
            locale
            accessToken
            refreshToken
            employees {
                id
                organization {
                    id
                    slug
                    type
                    name
                }
            }
            person {
                id
                givenName
                additionalName
                familyName
            }
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
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const RefreshTokenDocument = gql`
    mutation refreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            accessToken
            refreshToken
        }
    }
`

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(
    baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options)
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
>
export const RegisterStudentDocument = gql`
    mutation registerStudent($input: RegisterStudentInput!) {
        registerStudent(registerStudentInput: $input)
    }
`

/**
 * __useRegisterStudentMutation__
 *
 * To run a mutation, you first call `useRegisterStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerStudentMutation, { data, loading, error }] = useRegisterStudentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterStudentMutation(
    baseOptions?: Apollo.MutationHookOptions<RegisterStudentMutation, RegisterStudentMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<RegisterStudentMutation, RegisterStudentMutationVariables>(
        RegisterStudentDocument,
        options
    )
}
export type RegisterStudentMutationHookResult = ReturnType<typeof useRegisterStudentMutation>
export type RegisterStudentMutationResult = Apollo.MutationResult<RegisterStudentMutation>
export type RegisterStudentMutationOptions = Apollo.BaseMutationOptions<
    RegisterStudentMutation,
    RegisterStudentMutationVariables
>
export const RejectRegistrationDocument = gql`
    mutation rejectRegistration($studentId: String!) {
        rejectRegistration(studentId: $studentId)
    }
`

/**
 * __useRejectRegistrationMutation__
 *
 * To run a mutation, you first call `useRejectRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectRegistrationMutation, { data, loading, error }] = useRejectRegistrationMutation({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useRejectRegistrationMutation(
    baseOptions?: Apollo.MutationHookOptions<RejectRegistrationMutation, RejectRegistrationMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<RejectRegistrationMutation, RejectRegistrationMutationVariables>(
        RejectRegistrationDocument,
        options
    )
}
export type RejectRegistrationMutationHookResult = ReturnType<typeof useRejectRegistrationMutation>
export type RejectRegistrationMutationResult = Apollo.MutationResult<RejectRegistrationMutation>
export type RejectRegistrationMutationOptions = Apollo.BaseMutationOptions<
    RejectRegistrationMutation,
    RejectRegistrationMutationVariables
>
export const DeleteOrganizationDocument = gql`
    mutation deleteOrganization($orgId: String!) {
        deleteOrganization(id: $orgId)
    }
`

/**
 * __useDeleteOrganizationMutation__
 *
 * To run a mutation, you first call `useDeleteOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrganizationMutation, { data, loading, error }] = useDeleteOrganizationMutation({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useDeleteOrganizationMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(
        DeleteOrganizationDocument,
        options
    )
}
export type DeleteOrganizationMutationHookResult = ReturnType<typeof useDeleteOrganizationMutation>
export type DeleteOrganizationMutationResult = Apollo.MutationResult<DeleteOrganizationMutation>
export type DeleteOrganizationMutationOptions = Apollo.BaseMutationOptions<
    DeleteOrganizationMutation,
    DeleteOrganizationMutationVariables
>
export const ResetPasswordDocument = gql`
    mutation resetPassword($input: ResetPasswordInput!) {
        resetPassword(resetPasswordInput: $input) {
            username
        }
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options)
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
>
export const CanCreateStudentContactMomentDocument = gql`
    query canCreateStudentContactMoment($studentId: String!) {
        student(studentId: $studentId) {
            id
            canCreateContactMoment
        }
    }
`

/**
 * __useCanCreateStudentContactMomentQuery__
 *
 * To run a query within a React component, call `useCanCreateStudentContactMomentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanCreateStudentContactMomentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanCreateStudentContactMomentQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useCanCreateStudentContactMomentQuery(
    baseOptions: Apollo.QueryHookOptions<
        CanCreateStudentContactMomentQuery,
        CanCreateStudentContactMomentQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<CanCreateStudentContactMomentQuery, CanCreateStudentContactMomentQueryVariables>(
        CanCreateStudentContactMomentDocument,
        options
    )
}
export function useCanCreateStudentContactMomentLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        CanCreateStudentContactMomentQuery,
        CanCreateStudentContactMomentQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<CanCreateStudentContactMomentQuery, CanCreateStudentContactMomentQueryVariables>(
        CanCreateStudentContactMomentDocument,
        options
    )
}
export type CanCreateStudentContactMomentQueryHookResult = ReturnType<typeof useCanCreateStudentContactMomentQuery>
export type CanCreateStudentContactMomentLazyQueryHookResult = ReturnType<
    typeof useCanCreateStudentContactMomentLazyQuery
>
export type CanCreateStudentContactMomentQueryResult = Apollo.QueryResult<
    CanCreateStudentContactMomentQuery,
    CanCreateStudentContactMomentQueryVariables
>
export const CurrentUserDocument = gql`
    query currentUser {
        currentUser {
            id
            username
            locale
            currentEmployee {
                id
                role
                organization {
                    id
                    name
                    slug
                    description
                    type
                    employees {
                        id
                    }
                    disabledIntakeFields
                    hasLimitedEditRights
                }
            }
            person {
                id
                email
                employees {
                    id
                    organization {
                        id
                        name
                        slug
                        type
                    }
                }
                address {
                    id
                    name
                    street
                    houseNumber
                    houseNumberSuffix
                    postalCode
                    locality
                    country
                }
                givenName
                additionalName
                familyName
                gender
                birthplace
                birthday
                telephone
                contactPreference
                contactPreferenceOther
                maritalStatus
                spokenLanguages
                primaryLanguage
                children
                availability
                availabilityNotes
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options)
}
export function useCurrentUserLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options)
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>
export const DocumentDocument = gql`
    query document($document: String!) {
        document(document: $document) {
            id
            createdAt
            updatedAt
            file {
                name
                extension
                mimeType
                size
                base64
            }
        }
    }
`

/**
 * __useDocumentQuery__
 *
 * To run a query within a React component, call `useDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentQuery({
 *   variables: {
 *      document: // value for 'document'
 *   },
 * });
 */
export function useDocumentQuery(baseOptions: Apollo.QueryHookOptions<DocumentQuery, DocumentQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options)
}
export function useDocumentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentQuery, DocumentQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options)
}
export type DocumentQueryHookResult = ReturnType<typeof useDocumentQuery>
export type DocumentLazyQueryHookResult = ReturnType<typeof useDocumentLazyQuery>
export type DocumentQueryResult = Apollo.QueryResult<DocumentQuery, DocumentQueryVariables>
export const DocumentsDocument = gql`
    query documents($paginationArgs: PaginatedInputType!, $person: String!) {
        documents(paginationArgs: $paginationArgs, person: $person) {
            totalCount
            hasMore
            nodes {
                id
                createdAt
                updatedAt
                file {
                    name
                }
            }
        }
    }
`

/**
 * __useDocumentsQuery__
 *
 * To run a query within a React component, call `useDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentsQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      person: // value for 'person'
 *   },
 * });
 */
export function useDocumentsQuery(baseOptions: Apollo.QueryHookOptions<DocumentsQuery, DocumentsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, options)
}
export function useDocumentsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<DocumentsQuery, DocumentsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, options)
}
export type DocumentsQueryHookResult = ReturnType<typeof useDocumentsQuery>
export type DocumentsLazyQueryHookResult = ReturnType<typeof useDocumentsLazyQuery>
export type DocumentsQueryResult = Apollo.QueryResult<DocumentsQuery, DocumentsQueryVariables>
export const DoesEmailExistDocument = gql`
    query doesEmailExist($email: String!) {
        doesEmailExist(email: $email)
    }
`

/**
 * __useDoesEmailExistQuery__
 *
 * To run a query within a React component, call `useDoesEmailExistQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoesEmailExistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoesEmailExistQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDoesEmailExistQuery(
    baseOptions: Apollo.QueryHookOptions<DoesEmailExistQuery, DoesEmailExistQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<DoesEmailExistQuery, DoesEmailExistQueryVariables>(DoesEmailExistDocument, options)
}
export function useDoesEmailExistLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<DoesEmailExistQuery, DoesEmailExistQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<DoesEmailExistQuery, DoesEmailExistQueryVariables>(DoesEmailExistDocument, options)
}
export type DoesEmailExistQueryHookResult = ReturnType<typeof useDoesEmailExistQuery>
export type DoesEmailExistLazyQueryHookResult = ReturnType<typeof useDoesEmailExistLazyQuery>
export type DoesEmailExistQueryResult = Apollo.QueryResult<DoesEmailExistQuery, DoesEmailExistQueryVariables>
export const DoesPersonEmailExistDocument = gql`
    query doesPersonEmailExist($email: String!) {
        doesPersonEmailExist(email: $email)
    }
`

/**
 * __useDoesPersonEmailExistQuery__
 *
 * To run a query within a React component, call `useDoesPersonEmailExistQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoesPersonEmailExistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoesPersonEmailExistQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDoesPersonEmailExistQuery(
    baseOptions: Apollo.QueryHookOptions<DoesPersonEmailExistQuery, DoesPersonEmailExistQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<DoesPersonEmailExistQuery, DoesPersonEmailExistQueryVariables>(
        DoesPersonEmailExistDocument,
        options
    )
}
export function useDoesPersonEmailExistLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<DoesPersonEmailExistQuery, DoesPersonEmailExistQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<DoesPersonEmailExistQuery, DoesPersonEmailExistQueryVariables>(
        DoesPersonEmailExistDocument,
        options
    )
}
export type DoesPersonEmailExistQueryHookResult = ReturnType<typeof useDoesPersonEmailExistQuery>
export type DoesPersonEmailExistLazyQueryHookResult = ReturnType<typeof useDoesPersonEmailExistLazyQuery>
export type DoesPersonEmailExistQueryResult = Apollo.QueryResult<
    DoesPersonEmailExistQuery,
    DoesPersonEmailExistQueryVariables
>
export const EducationGroupsDocument = gql`
    query educationGroups(
        $paginationArgs: PaginatedInputType!
        $organizationId: ID!
        $status: EducationGroupStatus
        $oneOfStatuses: [EducationGroupStatus!]
    ) {
        educationGroups(
            paginationArgs: $paginationArgs
            organizationId: $organizationId
            status: $status
            oneOfStatuses: $oneOfStatuses
        ) {
            totalCount
            hasMore
            nodes {
                id
                createdAt
                updatedAt
                name
                type
                formality
                lessonHours
                degree
                start
                end
                availability
                availabilityNotes
                location
                minimumParticipants
                maximumParticipants
                participantCount
                evaluation
                status
                desiredLearningNeedOutcome {
                    id
                    createdAt
                    updatedAt
                    subject
                    subjectOther
                    application
                    applicationOther
                    level
                    levelOther
                }
                organization {
                    id
                    name
                }
                employees {
                    id
                    person {
                        availability
                        availabilityNotes
                    }
                }
            }
        }
    }
`

/**
 * __useEducationGroupsQuery__
 *
 * To run a query within a React component, call `useEducationGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEducationGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEducationGroupsQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      organizationId: // value for 'organizationId'
 *      status: // value for 'status'
 *      oneOfStatuses: // value for 'oneOfStatuses'
 *   },
 * });
 */
export function useEducationGroupsQuery(
    baseOptions: Apollo.QueryHookOptions<EducationGroupsQuery, EducationGroupsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<EducationGroupsQuery, EducationGroupsQueryVariables>(EducationGroupsDocument, options)
}
export function useEducationGroupsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<EducationGroupsQuery, EducationGroupsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<EducationGroupsQuery, EducationGroupsQueryVariables>(EducationGroupsDocument, options)
}
export type EducationGroupsQueryHookResult = ReturnType<typeof useEducationGroupsQuery>
export type EducationGroupsLazyQueryHookResult = ReturnType<typeof useEducationGroupsLazyQuery>
export type EducationGroupsQueryResult = Apollo.QueryResult<EducationGroupsQuery, EducationGroupsQueryVariables>
export const EmployeeDocument = gql`
    query employee($id: String!, $withEducations: Boolean! = false) {
        employee(id: $id) {
            id
            role
            createdAt
            updatedAt
            organization {
                id
                name
                description
                type
            }
            person {
                id
                familyName
                givenName
                additionalName
                email
                telephone
                gender
                birthday
                birthplace
                emergencyTelephone
                contactPreference
                contactPreferenceOther
                providerTargetGroupPreference
                providerVolunteeringPreference
                providerLanguageHouseVolunteeringReference
                providerTargetGroupIsExperienced
                providerTargetGroupExperience
                address {
                    id
                    street
                    houseNumber
                    houseNumberSuffix
                    postalCode
                    locality
                    country
                }
                educations @include(if: $withEducations) {
                    id
                    createdAt
                    updatedAt
                    name
                    type
                    level
                    levelOther
                    degree
                    degreeGranted
                    currentlyFollowingStatus
                    startDate
                    endDate
                    yearsFollowed
                    institution
                    group
                    courseTeacherType
                    hours
                    other
                }
                availabilityNotes
                availability
            }
            teams {
                id
                name
                createdAt
                updatedAt
            }
        }
    }
`

/**
 * __useEmployeeQuery__
 *
 * To run a query within a React component, call `useEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeeQuery({
 *   variables: {
 *      id: // value for 'id'
 *      withEducations: // value for 'withEducations'
 *   },
 * });
 */
export function useEmployeeQuery(baseOptions: Apollo.QueryHookOptions<EmployeeQuery, EmployeeQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<EmployeeQuery, EmployeeQueryVariables>(EmployeeDocument, options)
}
export function useEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmployeeQuery, EmployeeQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<EmployeeQuery, EmployeeQueryVariables>(EmployeeDocument, options)
}
export type EmployeeQueryHookResult = ReturnType<typeof useEmployeeQuery>
export type EmployeeLazyQueryHookResult = ReturnType<typeof useEmployeeLazyQuery>
export type EmployeeQueryResult = Apollo.QueryResult<EmployeeQuery, EmployeeQueryVariables>
export const LearningNeedDocument = gql`
    query learningNeed($learningNeedId: String!) {
        learningNeed(id: $learningNeedId) {
            id
            description
            motivation
            createdByOrganization {
                id
                name
            }
            desiredLearningNeedOutcome {
                id
                createdAt
                updatedAt
                subject
                subjectOther
                application
                applicationOther
                level
                levelOther
            }
            advisedOffer
            desiredOffer
            offerDifference
            offerDifferenceOther
            agreements
            participations {
                id
                agreement
                groupFormation
                offerName
                provider {
                    id
                    name
                }
                providerOption
                providerOther
                providerExplanation
                status
            }
            student {
                id
                person {
                    id
                    givenName
                    additionalName
                    familyName
                }
                organization {
                    id
                    name
                }
            }
        }
    }
`

/**
 * __useLearningNeedQuery__
 *
 * To run a query within a React component, call `useLearningNeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useLearningNeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLearningNeedQuery({
 *   variables: {
 *      learningNeedId: // value for 'learningNeedId'
 *   },
 * });
 */
export function useLearningNeedQuery(
    baseOptions: Apollo.QueryHookOptions<LearningNeedQuery, LearningNeedQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<LearningNeedQuery, LearningNeedQueryVariables>(LearningNeedDocument, options)
}
export function useLearningNeedLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<LearningNeedQuery, LearningNeedQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<LearningNeedQuery, LearningNeedQueryVariables>(LearningNeedDocument, options)
}
export type LearningNeedQueryHookResult = ReturnType<typeof useLearningNeedQuery>
export type LearningNeedLazyQueryHookResult = ReturnType<typeof useLearningNeedLazyQuery>
export type LearningNeedQueryResult = Apollo.QueryResult<LearningNeedQuery, LearningNeedQueryVariables>
export const LearningNeedsDocument = gql`
    query learningNeeds($studentId: String!, $paginationArgs: PaginatedInputType!) {
        learningNeeds(studentId: $studentId, paginationArgs: $paginationArgs) {
            totalCount
            hasMore
            nodes {
                id
                description
                participations {
                    id
                    createdAt
                    updatedAt
                    agreement
                    degree
                    end
                    endParticipation
                    formality
                    groupFormation
                    offerName
                    offerType
                    provider {
                        id
                        name
                    }
                    providerOption
                    providerOther
                    providerExplanation
                    reasonEndParticipation
                    start
                    startParticipation
                    status
                }
                student {
                    id
                    organization {
                        id
                        name
                    }
                }
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
 *      paginationArgs: // value for 'paginationArgs'
 *   },
 * });
 */
export function useLearningNeedsQuery(
    baseOptions: Apollo.QueryHookOptions<LearningNeedsQuery, LearningNeedsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<LearningNeedsQuery, LearningNeedsQueryVariables>(LearningNeedsDocument, options)
}
export function useLearningNeedsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<LearningNeedsQuery, LearningNeedsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<LearningNeedsQuery, LearningNeedsQueryVariables>(LearningNeedsDocument, options)
}
export type LearningNeedsQueryHookResult = ReturnType<typeof useLearningNeedsQuery>
export type LearningNeedsLazyQueryHookResult = ReturnType<typeof useLearningNeedsLazyQuery>
export type LearningNeedsQueryResult = Apollo.QueryResult<LearningNeedsQuery, LearningNeedsQueryVariables>
export const OrganizationDocument = gql`
    query organization($input: String!) {
        organization(id: $input) {
            id
            name
            type
            description
            type
            employees {
                id
                person {
                    id
                    email
                }
            }
            postalCodes {
                code
                id
            }
            address {
                id
                name
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            disabledIntakeFields
            hasLimitedEditRights
        }
    }
`

/**
 * __useOrganizationQuery__
 *
 * To run a query within a React component, call `useOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrganizationQuery(
    baseOptions: Apollo.QueryHookOptions<OrganizationQuery, OrganizationQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options)
}
export function useOrganizationLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options)
}
export type OrganizationQueryHookResult = ReturnType<typeof useOrganizationQuery>
export type OrganizationLazyQueryHookResult = ReturnType<typeof useOrganizationLazyQuery>
export type OrganizationQueryResult = Apollo.QueryResult<OrganizationQuery, OrganizationQueryVariables>
export const OrganizationEmployeesDocument = gql`
    query organizationEmployees(
        $paginationArgs: PaginatedInputType!
        $organizationId: ID!
        $oneOfRoles: [EmployeeRole!]
        $sort: OrganizationEmployeesSortInputType
    ) {
        organizationEmployees(
            paginationArgs: $paginationArgs
            organizationId: $organizationId
            oneOfRoles: $oneOfRoles
            sort: $sort
        ) {
            hasMore
            totalCount
            nodes {
                id
                role
                createdAt
                updatedAt
                organization {
                    id
                    name
                    description
                    type
                }
                person {
                    id
                    familyName
                    additionalName
                    givenName
                }
                teams {
                    id
                    name
                    createdAt
                    updatedAt
                }
            }
        }
    }
`

/**
 * __useOrganizationEmployeesQuery__
 *
 * To run a query within a React component, call `useOrganizationEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationEmployeesQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      organizationId: // value for 'organizationId'
 *      oneOfRoles: // value for 'oneOfRoles'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useOrganizationEmployeesQuery(
    baseOptions: Apollo.QueryHookOptions<OrganizationEmployeesQuery, OrganizationEmployeesQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<OrganizationEmployeesQuery, OrganizationEmployeesQueryVariables>(
        OrganizationEmployeesDocument,
        options
    )
}
export function useOrganizationEmployeesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<OrganizationEmployeesQuery, OrganizationEmployeesQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<OrganizationEmployeesQuery, OrganizationEmployeesQueryVariables>(
        OrganizationEmployeesDocument,
        options
    )
}
export type OrganizationEmployeesQueryHookResult = ReturnType<typeof useOrganizationEmployeesQuery>
export type OrganizationEmployeesLazyQueryHookResult = ReturnType<typeof useOrganizationEmployeesLazyQuery>
export type OrganizationEmployeesQueryResult = Apollo.QueryResult<
    OrganizationEmployeesQuery,
    OrganizationEmployeesQueryVariables
>
export const OrganizationEmployeesForDropdownDocument = gql`
    query organizationEmployeesForDropdown($paginationArgs: PaginatedInputType!, $organizationId: ID!, $teamId: ID!) {
        organizationEmployees(paginationArgs: $paginationArgs, organizationId: $organizationId, teamId: $teamId) {
            totalCount
            hasMore
            nodes {
                id
                person {
                    id
                    familyName
                    additionalName
                    givenName
                }
            }
        }
    }
`

/**
 * __useOrganizationEmployeesForDropdownQuery__
 *
 * To run a query within a React component, call `useOrganizationEmployeesForDropdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationEmployeesForDropdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationEmployeesForDropdownQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      organizationId: // value for 'organizationId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useOrganizationEmployeesForDropdownQuery(
    baseOptions: Apollo.QueryHookOptions<
        OrganizationEmployeesForDropdownQuery,
        OrganizationEmployeesForDropdownQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<OrganizationEmployeesForDropdownQuery, OrganizationEmployeesForDropdownQueryVariables>(
        OrganizationEmployeesForDropdownDocument,
        options
    )
}
export function useOrganizationEmployeesForDropdownLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        OrganizationEmployeesForDropdownQuery,
        OrganizationEmployeesForDropdownQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<OrganizationEmployeesForDropdownQuery, OrganizationEmployeesForDropdownQueryVariables>(
        OrganizationEmployeesForDropdownDocument,
        options
    )
}
export type OrganizationEmployeesForDropdownQueryHookResult = ReturnType<
    typeof useOrganizationEmployeesForDropdownQuery
>
export type OrganizationEmployeesForDropdownLazyQueryHookResult = ReturnType<
    typeof useOrganizationEmployeesForDropdownLazyQuery
>
export type OrganizationEmployeesForDropdownQueryResult = Apollo.QueryResult<
    OrganizationEmployeesForDropdownQuery,
    OrganizationEmployeesForDropdownQueryVariables
>
export const OrganizationEmployeesForTeamDocument = gql`
    query organizationEmployeesForTeam($paginationArgs: PaginatedInputType!, $organizationId: ID!, $teamId: ID) {
        organizationEmployees(paginationArgs: $paginationArgs, organizationId: $organizationId, teamId: $teamId) {
            hasMore
            totalCount
            nodes {
                id
                createdAt
                updatedAt
                role
                person {
                    id
                    familyName
                    additionalName
                    givenName
                }
            }
        }
    }
`

/**
 * __useOrganizationEmployeesForTeamQuery__
 *
 * To run a query within a React component, call `useOrganizationEmployeesForTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationEmployeesForTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationEmployeesForTeamQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      organizationId: // value for 'organizationId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useOrganizationEmployeesForTeamQuery(
    baseOptions: Apollo.QueryHookOptions<OrganizationEmployeesForTeamQuery, OrganizationEmployeesForTeamQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<OrganizationEmployeesForTeamQuery, OrganizationEmployeesForTeamQueryVariables>(
        OrganizationEmployeesForTeamDocument,
        options
    )
}
export function useOrganizationEmployeesForTeamLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        OrganizationEmployeesForTeamQuery,
        OrganizationEmployeesForTeamQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<OrganizationEmployeesForTeamQuery, OrganizationEmployeesForTeamQueryVariables>(
        OrganizationEmployeesForTeamDocument,
        options
    )
}
export type OrganizationEmployeesForTeamQueryHookResult = ReturnType<typeof useOrganizationEmployeesForTeamQuery>
export type OrganizationEmployeesForTeamLazyQueryHookResult = ReturnType<
    typeof useOrganizationEmployeesForTeamLazyQuery
>
export type OrganizationEmployeesForTeamQueryResult = Apollo.QueryResult<
    OrganizationEmployeesForTeamQuery,
    OrganizationEmployeesForTeamQueryVariables
>
export const OrganizationsDocument = gql`
    query organizations($paginationArgs: PaginatedInputType!, $type: String!) {
        organizations(paginationArgs: $paginationArgs, type: $type) {
            totalCount
            hasMore
            nodes {
                id
                name
                type
                description
                type
                postalCodes {
                    id
                    code
                }
                employees {
                    id
                }
                address {
                    id
                    street
                    houseNumber
                    houseNumberSuffix
                    postalCode
                    locality
                }
                email
                telephone
            }
        }
    }
`

/**
 * __useOrganizationsQuery__
 *
 * To run a query within a React component, call `useOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationsQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useOrganizationsQuery(
    baseOptions: Apollo.QueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options)
}
export function useOrganizationsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options)
}
export type OrganizationsQueryHookResult = ReturnType<typeof useOrganizationsQuery>
export type OrganizationsLazyQueryHookResult = ReturnType<typeof useOrganizationsLazyQuery>
export type OrganizationsQueryResult = Apollo.QueryResult<OrganizationsQuery, OrganizationsQueryVariables>
export const ParticipationDocument = gql`
    query participation($participationId: String!, $withLearningNeed: Boolean! = false) {
        participation(participationId: $participationId) {
            id
            createdAt
            updatedAt
            agreement
            degree
            educationGroup {
                ...ProviderGroupFormFieldsFragment
            }
            end
            endParticipation
            formality
            groupFormation
            mentor {
                ...ProviderMentorFormFieldsFragment
            }
            offerName
            offerType
            provider {
                id
                name
            }
            providerOption
            providerOther
            providerExplanation
            reasonEndParticipation
            outFlowParticipation
            outFlowReasonOther
            start
            startParticipation
            status
            testResult {
                id
                usedExam
                examDate
                memo
                learningNeedOutcome {
                    id
                    createdAt
                    updatedAt
                    subject
                    subjectOther
                    application
                    applicationOther
                    level
                    levelOther
                }
            }
            learningNeed @include(if: $withLearningNeed) {
                id
                description
                student {
                    id
                    person {
                        id
                        givenName
                        additionalName
                        familyName
                        availability
                        availabilityNotes
                    }
                    organization {
                        id
                        name
                    }
                }
            }
        }
    }
    ${ProviderGroupFormFieldsFragmentFragmentDoc}
    ${ProviderMentorFormFieldsFragmentFragmentDoc}
`

/**
 * __useParticipationQuery__
 *
 * To run a query within a React component, call `useParticipationQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipationQuery({
 *   variables: {
 *      participationId: // value for 'participationId'
 *      withLearningNeed: // value for 'withLearningNeed'
 *   },
 * });
 */
export function useParticipationQuery(
    baseOptions: Apollo.QueryHookOptions<ParticipationQuery, ParticipationQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<ParticipationQuery, ParticipationQueryVariables>(ParticipationDocument, options)
}
export function useParticipationLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ParticipationQuery, ParticipationQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<ParticipationQuery, ParticipationQueryVariables>(ParticipationDocument, options)
}
export type ParticipationQueryHookResult = ReturnType<typeof useParticipationQuery>
export type ParticipationLazyQueryHookResult = ReturnType<typeof useParticipationLazyQuery>
export type ParticipationQueryResult = Apollo.QueryResult<ParticipationQuery, ParticipationQueryVariables>
export const ParticipationProviderOrganizationsDocument = gql`
    query participationProviderOrganizations {
        participationProviderOrganizations {
            id
            name
        }
    }
`

/**
 * __useParticipationProviderOrganizationsQuery__
 *
 * To run a query within a React component, call `useParticipationProviderOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipationProviderOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipationProviderOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useParticipationProviderOrganizationsQuery(
    baseOptions?: Apollo.QueryHookOptions<
        ParticipationProviderOrganizationsQuery,
        ParticipationProviderOrganizationsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<ParticipationProviderOrganizationsQuery, ParticipationProviderOrganizationsQueryVariables>(
        ParticipationProviderOrganizationsDocument,
        options
    )
}
export function useParticipationProviderOrganizationsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        ParticipationProviderOrganizationsQuery,
        ParticipationProviderOrganizationsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<
        ParticipationProviderOrganizationsQuery,
        ParticipationProviderOrganizationsQueryVariables
    >(ParticipationProviderOrganizationsDocument, options)
}
export type ParticipationProviderOrganizationsQueryHookResult = ReturnType<
    typeof useParticipationProviderOrganizationsQuery
>
export type ParticipationProviderOrganizationsLazyQueryHookResult = ReturnType<
    typeof useParticipationProviderOrganizationsLazyQuery
>
export type ParticipationProviderOrganizationsQueryResult = Apollo.QueryResult<
    ParticipationProviderOrganizationsQuery,
    ParticipationProviderOrganizationsQueryVariables
>
export const ParticipationsDocument = gql`
    query participations($learningNeedId: String!, $paginationArgs: PaginatedInputType!) {
        participations(learningNeedId: $learningNeedId, paginationArgs: $paginationArgs) {
            totalCount
            hasMore
            nodes {
                id
                createdAt
                updatedAt
                agreement
                degree
                educationGroup {
                    ...ProviderGroupFormFieldsFragment
                }
                end
                endParticipation
                formality
                groupFormation
                mentor {
                    ...ProviderMentorFormFieldsFragment
                }
                offerName
                offerType
                provider {
                    id
                    name
                }
                providerOption
                providerOther
                providerExplanation
                reasonEndParticipation
                outFlowParticipation
                outFlowReasonOther
                start
                startParticipation
                status
                testResult {
                    id
                    usedExam
                    examDate
                    memo
                    learningNeedOutcome {
                        id
                        createdAt
                        updatedAt
                        subject
                        subjectOther
                        application
                        applicationOther
                        level
                        levelOther
                    }
                }
            }
        }
    }
    ${ProviderGroupFormFieldsFragmentFragmentDoc}
    ${ProviderMentorFormFieldsFragmentFragmentDoc}
`

/**
 * __useParticipationsQuery__
 *
 * To run a query within a React component, call `useParticipationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipationsQuery({
 *   variables: {
 *      learningNeedId: // value for 'learningNeedId'
 *      paginationArgs: // value for 'paginationArgs'
 *   },
 * });
 */
export function useParticipationsQuery(
    baseOptions: Apollo.QueryHookOptions<ParticipationsQuery, ParticipationsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<ParticipationsQuery, ParticipationsQueryVariables>(ParticipationsDocument, options)
}
export function useParticipationsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ParticipationsQuery, ParticipationsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<ParticipationsQuery, ParticipationsQueryVariables>(ParticipationsDocument, options)
}
export type ParticipationsQueryHookResult = ReturnType<typeof useParticipationsQuery>
export type ParticipationsLazyQueryHookResult = ReturnType<typeof useParticipationsLazyQuery>
export type ParticipationsQueryResult = Apollo.QueryResult<ParticipationsQuery, ParticipationsQueryVariables>
export const AvailablePostalCodesDocument = gql`
    query availablePostalCodes($paginationArgs: PaginatedInputType!, $search: String) {
        availablePostalCodes(paginationArgs: $paginationArgs, search: $search) {
            totalCount
            hasMore
            nodes {
                id
                code
            }
        }
    }
`

/**
 * __useAvailablePostalCodesQuery__
 *
 * To run a query within a React component, call `useAvailablePostalCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailablePostalCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailablePostalCodesQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useAvailablePostalCodesQuery(
    baseOptions: Apollo.QueryHookOptions<AvailablePostalCodesQuery, AvailablePostalCodesQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<AvailablePostalCodesQuery, AvailablePostalCodesQueryVariables>(
        AvailablePostalCodesDocument,
        options
    )
}
export function useAvailablePostalCodesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<AvailablePostalCodesQuery, AvailablePostalCodesQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<AvailablePostalCodesQuery, AvailablePostalCodesQueryVariables>(
        AvailablePostalCodesDocument,
        options
    )
}
export type AvailablePostalCodesQueryHookResult = ReturnType<typeof useAvailablePostalCodesQuery>
export type AvailablePostalCodesLazyQueryHookResult = ReturnType<typeof useAvailablePostalCodesLazyQuery>
export type AvailablePostalCodesQueryResult = Apollo.QueryResult<
    AvailablePostalCodesQuery,
    AvailablePostalCodesQueryVariables
>
export const ProviderStudentsDocument = gql`
    query providerStudents(
        $paginationArgs: PaginatedInputType!
        $participationStatus: ParticipationStatus
        $newOrReferred: Boolean
        $educationGroupId: String
        $mentorId: String
        $sort: StudentsSortInputType
        $searchName: String
    ) {
        providerStudents(
            paginationArgs: $paginationArgs
            participationStatus: $participationStatus
            newOrReferred: $newOrReferred
            educationGroupId: $educationGroupId
            mentorId: $mentorId
            sort: $sort
            searchName: $searchName
        ) {
            totalCount
            hasMore
            nodes {
                id
                person {
                    id
                    givenName
                    additionalName
                    familyName
                }
                registration {
                    id
                    createdAt
                    desiredLearningNeedOutcome {
                        subject
                        subjectOther
                    }
                }
                organization {
                    id
                    name
                }
            }
        }
    }
`

/**
 * __useProviderStudentsQuery__
 *
 * To run a query within a React component, call `useProviderStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderStudentsQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      participationStatus: // value for 'participationStatus'
 *      newOrReferred: // value for 'newOrReferred'
 *      educationGroupId: // value for 'educationGroupId'
 *      mentorId: // value for 'mentorId'
 *      sort: // value for 'sort'
 *      searchName: // value for 'searchName'
 *   },
 * });
 */
export function useProviderStudentsQuery(
    baseOptions: Apollo.QueryHookOptions<ProviderStudentsQuery, ProviderStudentsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<ProviderStudentsQuery, ProviderStudentsQueryVariables>(ProviderStudentsDocument, options)
}
export function useProviderStudentsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ProviderStudentsQuery, ProviderStudentsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<ProviderStudentsQuery, ProviderStudentsQueryVariables>(ProviderStudentsDocument, options)
}
export type ProviderStudentsQueryHookResult = ReturnType<typeof useProviderStudentsQuery>
export type ProviderStudentsLazyQueryHookResult = ReturnType<typeof useProviderStudentsLazyQuery>
export type ProviderStudentsQueryResult = Apollo.QueryResult<ProviderStudentsQuery, ProviderStudentsQueryVariables>
export const PublicOrganizationsDocument = gql`
    query publicOrganizations {
        publicOrganizations {
            id
            name
        }
    }
`

/**
 * __usePublicOrganizationsQuery__
 *
 * To run a query within a React component, call `usePublicOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicOrganizationsQuery(
    baseOptions?: Apollo.QueryHookOptions<PublicOrganizationsQuery, PublicOrganizationsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<PublicOrganizationsQuery, PublicOrganizationsQueryVariables>(
        PublicOrganizationsDocument,
        options
    )
}
export function usePublicOrganizationsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<PublicOrganizationsQuery, PublicOrganizationsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<PublicOrganizationsQuery, PublicOrganizationsQueryVariables>(
        PublicOrganizationsDocument,
        options
    )
}
export type PublicOrganizationsQueryHookResult = ReturnType<typeof usePublicOrganizationsQuery>
export type PublicOrganizationsLazyQueryHookResult = ReturnType<typeof usePublicOrganizationsLazyQuery>
export type PublicOrganizationsQueryResult = Apollo.QueryResult<
    PublicOrganizationsQuery,
    PublicOrganizationsQueryVariables
>
export const PublicTeamsForOrganizationDocument = gql`
    query publicTeamsForOrganization($organizationId: ID!) {
        publicTeamsForOrganization(organizationId: $organizationId) {
            id
            name
        }
    }
`

/**
 * __usePublicTeamsForOrganizationQuery__
 *
 * To run a query within a React component, call `usePublicTeamsForOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicTeamsForOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicTeamsForOrganizationQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function usePublicTeamsForOrganizationQuery(
    baseOptions: Apollo.QueryHookOptions<PublicTeamsForOrganizationQuery, PublicTeamsForOrganizationQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<PublicTeamsForOrganizationQuery, PublicTeamsForOrganizationQueryVariables>(
        PublicTeamsForOrganizationDocument,
        options
    )
}
export function usePublicTeamsForOrganizationLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<PublicTeamsForOrganizationQuery, PublicTeamsForOrganizationQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<PublicTeamsForOrganizationQuery, PublicTeamsForOrganizationQueryVariables>(
        PublicTeamsForOrganizationDocument,
        options
    )
}
export type PublicTeamsForOrganizationQueryHookResult = ReturnType<typeof usePublicTeamsForOrganizationQuery>
export type PublicTeamsForOrganizationLazyQueryHookResult = ReturnType<typeof usePublicTeamsForOrganizationLazyQuery>
export type PublicTeamsForOrganizationQueryResult = Apollo.QueryResult<
    PublicTeamsForOrganizationQuery,
    PublicTeamsForOrganizationQueryVariables
>
export const StudentContactMomentsDocument = gql`
    query studentContactMoments($paginationArgs: PaginatedInputType!, $studentId: String!) {
        studentContactMoments(paginationArgs: $paginationArgs, studentId: $studentId) {
            hasMore
            totalCount
            nodes {
                id
                createdAt
                createdByEmployee {
                    id
                    person {
                        id
                        givenName
                        additionalName
                        familyName
                    }
                }
                updatedAt
                type
                date
                explanation
                canEdit
            }
        }
    }
`

/**
 * __useStudentContactMomentsQuery__
 *
 * To run a query within a React component, call `useStudentContactMomentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentContactMomentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentContactMomentsQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentContactMomentsQuery(
    baseOptions: Apollo.QueryHookOptions<StudentContactMomentsQuery, StudentContactMomentsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<StudentContactMomentsQuery, StudentContactMomentsQueryVariables>(
        StudentContactMomentsDocument,
        options
    )
}
export function useStudentContactMomentsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<StudentContactMomentsQuery, StudentContactMomentsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<StudentContactMomentsQuery, StudentContactMomentsQueryVariables>(
        StudentContactMomentsDocument,
        options
    )
}
export type StudentContactMomentsQueryHookResult = ReturnType<typeof useStudentContactMomentsQuery>
export type StudentContactMomentsLazyQueryHookResult = ReturnType<typeof useStudentContactMomentsLazyQuery>
export type StudentContactMomentsQueryResult = Apollo.QueryResult<
    StudentContactMomentsQuery,
    StudentContactMomentsQueryVariables
>
export const StudentForDesiredLearningNeedOutcomeDocument = gql`
    query studentForDesiredLearningNeedOutcome($studentId: String!) {
        student(studentId: $studentId) {
            id
            registration {
                desiredLearningNeedOutcome {
                    subject
                    subjectOther
                    application
                    applicationOther
                    level
                    levelOther
                }
            }
        }
    }
`

/**
 * __useStudentForDesiredLearningNeedOutcomeQuery__
 *
 * To run a query within a React component, call `useStudentForDesiredLearningNeedOutcomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentForDesiredLearningNeedOutcomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentForDesiredLearningNeedOutcomeQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentForDesiredLearningNeedOutcomeQuery(
    baseOptions: Apollo.QueryHookOptions<
        StudentForDesiredLearningNeedOutcomeQuery,
        StudentForDesiredLearningNeedOutcomeQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<
        StudentForDesiredLearningNeedOutcomeQuery,
        StudentForDesiredLearningNeedOutcomeQueryVariables
    >(StudentForDesiredLearningNeedOutcomeDocument, options)
}
export function useStudentForDesiredLearningNeedOutcomeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        StudentForDesiredLearningNeedOutcomeQuery,
        StudentForDesiredLearningNeedOutcomeQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<
        StudentForDesiredLearningNeedOutcomeQuery,
        StudentForDesiredLearningNeedOutcomeQueryVariables
    >(StudentForDesiredLearningNeedOutcomeDocument, options)
}
export type StudentForDesiredLearningNeedOutcomeQueryHookResult = ReturnType<
    typeof useStudentForDesiredLearningNeedOutcomeQuery
>
export type StudentForDesiredLearningNeedOutcomeLazyQueryHookResult = ReturnType<
    typeof useStudentForDesiredLearningNeedOutcomeLazyQuery
>
export type StudentForDesiredLearningNeedOutcomeQueryResult = Apollo.QueryResult<
    StudentForDesiredLearningNeedOutcomeQuery,
    StudentForDesiredLearningNeedOutcomeQueryVariables
>
export const StudentForDetailHeaderDocument = gql`
    query studentForDetailHeader($studentId: String!) {
        student(studentId: $studentId) {
            id
            person {
                id
                givenName
                additionalName
                familyName
            }
        }
    }
`

/**
 * __useStudentForDetailHeaderQuery__
 *
 * To run a query within a React component, call `useStudentForDetailHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentForDetailHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentForDetailHeaderQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentForDetailHeaderQuery(
    baseOptions: Apollo.QueryHookOptions<StudentForDetailHeaderQuery, StudentForDetailHeaderQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<StudentForDetailHeaderQuery, StudentForDetailHeaderQueryVariables>(
        StudentForDetailHeaderDocument,
        options
    )
}
export function useStudentForDetailHeaderLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<StudentForDetailHeaderQuery, StudentForDetailHeaderQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<StudentForDetailHeaderQuery, StudentForDetailHeaderQueryVariables>(
        StudentForDetailHeaderDocument,
        options
    )
}
export type StudentForDetailHeaderQueryHookResult = ReturnType<typeof useStudentForDetailHeaderQuery>
export type StudentForDetailHeaderLazyQueryHookResult = ReturnType<typeof useStudentForDetailHeaderLazyQuery>
export type StudentForDetailHeaderQueryResult = Apollo.QueryResult<
    StudentForDetailHeaderQuery,
    StudentForDetailHeaderQueryVariables
>
export const StudentForIntakeDocument = gql`
    query studentForIntake($studentId: String!) {
        student(studentId: $studentId) {
            id
            createdAt
            intakeDate
            organization {
                id
                disabledIntakeFields
                name
            }
            civicIntegration {
                id
                createdAt
                updatedAt
                reason
                requirement
                finishDate
            }
            person {
                id
                createdAt
                updatedAt
                givenName
                email
                secondaryEmail
                additionalName
                familyName
                gender
                birthplace
                birthday
                telephone
                contactPreference
                contactPreferenceOther
                maritalStatus
                spokenLanguages
                primaryLanguage
                children
                availability
                availabilityNotes
                didSignPermissionForm
                hasPermissionToSendInformationAboutLibraries
                hasPermissionToShareDataWithLibraries
                hasPermissionToShareDataWithProviders
                educations {
                    id
                    createdAt
                    updatedAt
                    name
                    type
                    level
                    levelOther
                    degree
                    degreeGranted
                    currentlyFollowingStatus
                    startDate
                    yearsFollowed
                    institution
                    group
                    courseTeacherType
                    hours
                }
                address {
                    id
                    createdAt
                    updatedAt
                    name
                    street
                    houseNumber
                    houseNumberSuffix
                    postalCode
                    locality
                    country
                }
            }
            registration {
                id
                createdAt
                updatedAt
                remarks
                status
                registeredPublicly
                referringOrganization
                referringOrganizationOther
                foundVia
                foundViaOther
                wentToLanguageHouseBefore
                wentToLanguageHouseBeforeReason
                wentToLanguageHouseBeforeYear
                network
                participationLadder
                dutchNTLevel
                inNetherlandsSinceYear
                languageInDailyLife
                knowsLatinAlphabet
                lastKnownLevel
                speakingLevel
                trainedForJob
                lastJob
                desiredLearningNeedOutcome {
                    id
                    subject
                    subjectOther
                    application
                    applicationOther
                    level
                    levelOther
                }
                hasTriedThisBefore
                hasTriedThisBeforeExplanation
                whyWantTheseskills
                whyWantThisNow
                desiredLearningMethod
                dayTimeActivities
                dayTimeActivitiesOther
                readingTestResult
                writingTestResult
                referringPerson {
                    id
                    createdAt
                    updatedAt
                    givenName
                    email
                    additionalName
                    familyName
                    gender
                    birthplace
                    birthday
                    telephone
                    contactPreference
                    contactPreferenceOther
                    maritalStatus
                    spokenLanguages
                    primaryLanguage
                    children
                    availability
                    availabilityNotes
                    didSignPermissionForm
                    hasPermissionToSendInformationAboutLibraries
                    hasPermissionToShareDataWithLibraries
                    hasPermissionToShareDataWithProviders
                    address {
                        id
                        createdAt
                        updatedAt
                        name
                        street
                        houseNumber
                        houseNumberSuffix
                        postalCode
                        locality
                        country
                    }
                }
                selfRegistered
            }
        }
    }
`

/**
 * __useStudentForIntakeQuery__
 *
 * To run a query within a React component, call `useStudentForIntakeQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentForIntakeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentForIntakeQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentForIntakeQuery(
    baseOptions: Apollo.QueryHookOptions<StudentForIntakeQuery, StudentForIntakeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<StudentForIntakeQuery, StudentForIntakeQueryVariables>(StudentForIntakeDocument, options)
}
export function useStudentForIntakeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<StudentForIntakeQuery, StudentForIntakeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<StudentForIntakeQuery, StudentForIntakeQueryVariables>(StudentForIntakeDocument, options)
}
export type StudentForIntakeQueryHookResult = ReturnType<typeof useStudentForIntakeQuery>
export type StudentForIntakeLazyQueryHookResult = ReturnType<typeof useStudentForIntakeLazyQuery>
export type StudentForIntakeQueryResult = Apollo.QueryResult<StudentForIntakeQuery, StudentForIntakeQueryVariables>
export const StudentForMentorDocument = gql`
    query studentForMentor($studentId: String!) {
        student(studentId: $studentId) {
            id
            person {
                id
                givenName
                additionalName
                familyName
            }
            organization {
                id
                name
            }
            team {
                id
                name
            }
            mentor {
                id
                person {
                    id
                    givenName
                    additionalName
                    familyName
                }
            }
        }
    }
`

/**
 * __useStudentForMentorQuery__
 *
 * To run a query within a React component, call `useStudentForMentorQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentForMentorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentForMentorQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentForMentorQuery(
    baseOptions: Apollo.QueryHookOptions<StudentForMentorQuery, StudentForMentorQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<StudentForMentorQuery, StudentForMentorQueryVariables>(StudentForMentorDocument, options)
}
export function useStudentForMentorLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<StudentForMentorQuery, StudentForMentorQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<StudentForMentorQuery, StudentForMentorQueryVariables>(StudentForMentorDocument, options)
}
export type StudentForMentorQueryHookResult = ReturnType<typeof useStudentForMentorQuery>
export type StudentForMentorLazyQueryHookResult = ReturnType<typeof useStudentForMentorLazyQuery>
export type StudentForMentorQueryResult = Apollo.QueryResult<StudentForMentorQuery, StudentForMentorQueryVariables>
export const StudentForRegistrationDocument = gql`
    query studentForRegistration($studentId: String!) {
        student(studentId: $studentId) {
            id
            person {
                id
                createdAt
                givenName
                additionalName
                familyName
                email
                secondaryEmail
                telephone
                address {
                    id
                    name
                    street
                    houseNumber
                    houseNumberSuffix
                    postalCode
                    locality
                    country
                }
            }
            registration {
                id
                registeredPublicly
                referringOrganization
                referringOrganizationOther
                referringPerson {
                    id
                    givenName
                    additionalName
                    familyName
                    email
                    telephone
                }
                referringTeam
                remarks
                selfRegistered
            }
        }
    }
`

/**
 * __useStudentForRegistrationQuery__
 *
 * To run a query within a React component, call `useStudentForRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentForRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentForRegistrationQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentForRegistrationQuery(
    baseOptions: Apollo.QueryHookOptions<StudentForRegistrationQuery, StudentForRegistrationQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<StudentForRegistrationQuery, StudentForRegistrationQueryVariables>(
        StudentForRegistrationDocument,
        options
    )
}
export function useStudentForRegistrationLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<StudentForRegistrationQuery, StudentForRegistrationQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<StudentForRegistrationQuery, StudentForRegistrationQueryVariables>(
        StudentForRegistrationDocument,
        options
    )
}
export type StudentForRegistrationQueryHookResult = ReturnType<typeof useStudentForRegistrationQuery>
export type StudentForRegistrationLazyQueryHookResult = ReturnType<typeof useStudentForRegistrationLazyQuery>
export type StudentForRegistrationQueryResult = Apollo.QueryResult<
    StudentForRegistrationQuery,
    StudentForRegistrationQueryVariables
>
export const StudentsDocument = gql`
    query students(
        $paginationArgs: PaginatedInputType!
        $organizationId: String!
        $status: String
        $participationStatus: ParticipationStatus
        $mentorEmployeeId: String
        $educationGroupId: String
        $sort: StudentsSortInputType
        $searchName: String
        $team: String
    ) {
        students(
            paginationArgs: $paginationArgs
            organizationId: $organizationId
            status: $status
            participationStatus: $participationStatus
            mentorEmployeeId: $mentorEmployeeId
            educationGroupId: $educationGroupId
            sort: $sort
            searchName: $searchName
            team: $team
        ) {
            totalCount
            hasMore
            nodes {
                id
                createdAt
                intakeDate
                team {
                    id
                    name
                }
                mentor {
                    id
                    person {
                        id
                        givenName
                        additionalName
                        familyName
                    }
                }
                person {
                    id
                    createdAt
                    updatedAt
                    givenName
                    additionalName
                    familyName
                }
                registration {
                    id
                    referringOrganizationOther
                    referringTeam
                    createdAt
                    referringPerson {
                        id
                        givenName
                        additionalName
                        familyName
                    }
                }
                learningNeeds {
                    id
                    participations {
                        id
                        createdAt
                    }
                }
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
 *      paginationArgs: // value for 'paginationArgs'
 *      organizationId: // value for 'organizationId'
 *      status: // value for 'status'
 *      participationStatus: // value for 'participationStatus'
 *      mentorEmployeeId: // value for 'mentorEmployeeId'
 *      educationGroupId: // value for 'educationGroupId'
 *      sort: // value for 'sort'
 *      searchName: // value for 'searchName'
 *      team: // value for 'team'
 *   },
 * });
 */
export function useStudentsQuery(baseOptions: Apollo.QueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options)
}
export function useStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options)
}
export type StudentsQueryHookResult = ReturnType<typeof useStudentsQuery>
export type StudentsLazyQueryHookResult = ReturnType<typeof useStudentsLazyQuery>
export type StudentsQueryResult = Apollo.QueryResult<StudentsQuery, StudentsQueryVariables>
export const TeamDocument = gql`
    query team($teamId: ID!) {
        team(teamId: $teamId) {
            id
            createdAt
            updatedAt
            name
            postalCodeAreas {
                id
                code
            }
        }
    }
`

/**
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamQuery(baseOptions: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options)
}
export function useTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options)
}
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>
export type TeamQueryResult = Apollo.QueryResult<TeamQuery, TeamQueryVariables>
export const TeamsDocument = gql`
    query teams($paginationArgs: PaginatedInputType!, $organizationId: ID!, $sort: TeamsSortInputType) {
        teams(paginationArgs: $paginationArgs, organizationId: $organizationId, sort: $sort) {
            totalCount
            hasMore
            nodes {
                id
                createdAt
                updatedAt
                name
                hiddenFromPublic
                members {
                    id
                }
                parentOrganization {
                    createdAt
                    updatedAt
                    name
                    description
                    type
                    email
                    telephone
                }
                postalCodeAreas {
                    id
                    createdAt
                    updatedAt
                    code
                }
            }
        }
    }
`

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      organizationId: // value for 'organizationId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useTeamsQuery(baseOptions: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options)
}
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options)
}
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>
export const TeamsForDropdownDocument = gql`
    query teamsForDropdown($paginationArgs: PaginatedInputType!, $organizationId: ID!, $filterForEmployeeId: ID) {
        teams(
            paginationArgs: $paginationArgs
            organizationId: $organizationId
            filterForEmployeeId: $filterForEmployeeId
        ) {
            totalCount
            hasMore
            nodes {
                id
                name
            }
        }
    }
`

/**
 * __useTeamsForDropdownQuery__
 *
 * To run a query within a React component, call `useTeamsForDropdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsForDropdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsForDropdownQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      organizationId: // value for 'organizationId'
 *      filterForEmployeeId: // value for 'filterForEmployeeId'
 *   },
 * });
 */
export function useTeamsForDropdownQuery(
    baseOptions: Apollo.QueryHookOptions<TeamsForDropdownQuery, TeamsForDropdownQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<TeamsForDropdownQuery, TeamsForDropdownQueryVariables>(TeamsForDropdownDocument, options)
}
export function useTeamsForDropdownLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TeamsForDropdownQuery, TeamsForDropdownQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<TeamsForDropdownQuery, TeamsForDropdownQueryVariables>(TeamsForDropdownDocument, options)
}
export type TeamsForDropdownQueryHookResult = ReturnType<typeof useTeamsForDropdownQuery>
export type TeamsForDropdownLazyQueryHookResult = ReturnType<typeof useTeamsForDropdownLazyQuery>
export type TeamsForDropdownQueryResult = Apollo.QueryResult<TeamsForDropdownQuery, TeamsForDropdownQueryVariables>
export const ProvidersForLanguageHouseDocument = gql`
    query providersForLanguageHouse($paginationArgs: PaginatedInputType!, $languageHouseId: String!) {
        organizations(paginationArgs: $paginationArgs, type: "provider") {
            totalCount
            hasMore
            nodes {
                id
                name
                isLanguageHouseProvider(languageHouseId: $languageHouseId)
                students {
                    id
                }
            }
        }
    }
`

/**
 * __useProvidersForLanguageHouseQuery__
 *
 * To run a query within a React component, call `useProvidersForLanguageHouseQuery` and pass it any options that fit your needs.
 * When your component renders, `useProvidersForLanguageHouseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProvidersForLanguageHouseQuery({
 *   variables: {
 *      paginationArgs: // value for 'paginationArgs'
 *      languageHouseId: // value for 'languageHouseId'
 *   },
 * });
 */
export function useProvidersForLanguageHouseQuery(
    baseOptions: Apollo.QueryHookOptions<ProvidersForLanguageHouseQuery, ProvidersForLanguageHouseQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<ProvidersForLanguageHouseQuery, ProvidersForLanguageHouseQueryVariables>(
        ProvidersForLanguageHouseDocument,
        options
    )
}
export function useProvidersForLanguageHouseLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ProvidersForLanguageHouseQuery, ProvidersForLanguageHouseQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<ProvidersForLanguageHouseQuery, ProvidersForLanguageHouseQueryVariables>(
        ProvidersForLanguageHouseDocument,
        options
    )
}
export type ProvidersForLanguageHouseQueryHookResult = ReturnType<typeof useProvidersForLanguageHouseQuery>
export type ProvidersForLanguageHouseLazyQueryHookResult = ReturnType<typeof useProvidersForLanguageHouseLazyQuery>
export type ProvidersForLanguageHouseQueryResult = Apollo.QueryResult<
    ProvidersForLanguageHouseQuery,
    ProvidersForLanguageHouseQueryVariables
>
export const EditProviderEducationGroupDocument = gql`
    mutation editProviderEducationGroup($input: EditEducationGroupInputType!) {
        editEducationGroup(input: $input) {
            ...ProviderGroupFormFieldsFragment
        }
    }
    ${ProviderGroupFormFieldsFragmentFragmentDoc}
`

/**
 * __useEditProviderEducationGroupMutation__
 *
 * To run a mutation, you first call `useEditProviderEducationGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProviderEducationGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProviderEducationGroupMutation, { data, loading, error }] = useEditProviderEducationGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditProviderEducationGroupMutation(
    baseOptions?: Apollo.MutationHookOptions<
        EditProviderEducationGroupMutation,
        EditProviderEducationGroupMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<EditProviderEducationGroupMutation, EditProviderEducationGroupMutationVariables>(
        EditProviderEducationGroupDocument,
        options
    )
}
export type EditProviderEducationGroupMutationHookResult = ReturnType<typeof useEditProviderEducationGroupMutation>
export type EditProviderEducationGroupMutationResult = Apollo.MutationResult<EditProviderEducationGroupMutation>
export type EditProviderEducationGroupMutationOptions = Apollo.BaseMutationOptions<
    EditProviderEducationGroupMutation,
    EditProviderEducationGroupMutationVariables
>
export const ProviderEducationGroupDocument = gql`
    query providerEducationGroup($id: ID!) {
        educationGroup(educationGroupId: $id) {
            ...ProviderGroupFormFieldsFragment
        }
    }
    ${ProviderGroupFormFieldsFragmentFragmentDoc}
`

/**
 * __useProviderEducationGroupQuery__
 *
 * To run a query within a React component, call `useProviderEducationGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderEducationGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderEducationGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProviderEducationGroupQuery(
    baseOptions: Apollo.QueryHookOptions<ProviderEducationGroupQuery, ProviderEducationGroupQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<ProviderEducationGroupQuery, ProviderEducationGroupQueryVariables>(
        ProviderEducationGroupDocument,
        options
    )
}
export function useProviderEducationGroupLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ProviderEducationGroupQuery, ProviderEducationGroupQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<ProviderEducationGroupQuery, ProviderEducationGroupQueryVariables>(
        ProviderEducationGroupDocument,
        options
    )
}
export type ProviderEducationGroupQueryHookResult = ReturnType<typeof useProviderEducationGroupQuery>
export type ProviderEducationGroupLazyQueryHookResult = ReturnType<typeof useProviderEducationGroupLazyQuery>
export type ProviderEducationGroupQueryResult = Apollo.QueryResult<
    ProviderEducationGroupQuery,
    ProviderEducationGroupQueryVariables
>
