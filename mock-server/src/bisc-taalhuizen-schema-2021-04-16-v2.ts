import gql from 'graphql-tag'

export const typeDefs = gql`
# Exposes a URL that specifies the behaviour of this scalar.
directive @specifiedBy(
    # The URL that specifies the behaviour of this scalar.
    url: String!
) on SCALAR
type ProviderAddressType {
    street: String!
    houseNumber: String!
    houseNumberSuffix: String
    postalCode: String!
    locality: String!
}

input ProviderEmployeeAddressInputType {
    street: String
    houseNumber: String
    houseNumberSuffix: String
    postalCode: String
    locality: String
}

type ProviderEmployeeAddressType {
    street: String
    houseNumber: String
    houseNumberSuffix: String
    postalCode: String
    locality: String
}

type ProviderEmployeeAvailabilityDaysType {
    monday: ProviderEmployeeAvailabilityDayType!
    tuesday: ProviderEmployeeAvailabilityDayType!
    wednesday: ProviderEmployeeAvailabilityDayType!
    thursday: ProviderEmployeeAvailabilityDayType!
    friday: ProviderEmployeeAvailabilityDayType!
    saturday: ProviderEmployeeAvailabilityDayType!
    sunday: ProviderEmployeeAvailabilityDayType!
}

type ProviderEmployeeAvailabilityDayType {
    morning: Boolean!
    afternoon: Boolean!
    evening: Boolean!
}

enum ProviderEmployeeContactPreferenceEnum {
    PHONECALL
    WHATSAPP
    EMAIL
    OTHER
}

enum ProviderEmployeeCurrentEducationEnum {
    YES
    NO
    NO_BUT_DID_FOLLOW
}

type ProviderEmployeeCurrentEducationNoButDidFollowType {
    dateUntil: String
    level: String
    gotCertificate: Boolean
}

type ProviderEmployeeCurrentEducationYesType {
    dateSince: String
    name: String
    doesProvideCertificate: Boolean
}

type ProviderEmployeeDocumentDownloadType {
    base64data: String!
}

type ProviderEmployeeDocumentType {
    id: String!
    filename: String!
    dateCreated: String!
}

enum ProviderEmployeeGenderEnum {
    MALE
    FEMALE
    X
}

enum ProviderEmployeeProfessionalismEnum {
    PROFESSIONAL
    VOLUNTEER
    BOTH
}

enum ProviderEmployeeTargetGroupPreferenceEnum {
    NT1
    NT2
}

type ProviderEmployeeType {
    userId: String!
    dateCreated: String!
    dateModified: String!
    userRoles: [ProviderUserRoleType!]!
    givenName: String!
    additionalName: String
    familyName: String!
    telephone: String
    availability: ProviderEmployeeAvailabilityDaysType
    availabilityNotes: String
    email: String!
    gender: ProviderEmployeeGenderEnum
    dateOfBirth: String
    address: ProviderEmployeeAddressType
    contactTelephone: String
    contactPreference: ProviderEmployeeContactPreferenceEnum
    contactPreferenceOther: String
    targetGroupPreference: [ProviderEmployeeTargetGroupPreferenceEnum!]
    volunteringPreference: String
    gotHereVia: String
    hasExperienceWithTargetGroup: Boolean
    experienceWithTargetGroupYesReason: Boolean
    currentEducation: ProviderEmployeeCurrentEducationEnum
    currentEducationYes: ProviderEmployeeCurrentEducationYesType
    currentEdicationNoButDidFollow: ProviderEmployeeCurrentEducationNoButDidFollowType
    doesCurrentlyFollowCourse: Boolean
    currentlyFollowingCourseName: String
    currentlyFollowingCourseInstitute: String
    currentlyFollowingCourseTeacherProfessionalism: ProviderEmployeeProfessionalismEnum
    currentlyFollowingCourseCourseProfessionalism: ProviderEmployeeProfessionalismEnum
    doesCurrentlyFollowingCourseProvideCertificate: Boolean
    otherRelevantCertificates: String
    isVOGChecked: Boolean
}

type ProviderType {
    id: String!
    name: String!
    address: ProviderAddressType
    email: String
    telephone: String
    type: String
}

type ProviderUserRoleType {
    id: String!
    name: UserRoleEnum!
}

input AddOrRemoveMentorToParticipationInputType {
    participationId: String!
    providerEmployeeId: String!
}

input AddOrRemoveParticipationToGroupInputType {
    participationId: String!
    groupId: String!
}

type BiscEmployeeType {
    id: String!
    givenName: String!
    additionalName: String
    familyName: String!
    email: String!
    telephone: String
    dateCreated: String!
    dateModified: String!
}

type ContextUserType {
    id: String!
    username: String!
    givenName: String!
    additionalName: String
    familyName: String!
    userEnvironment: UserEnvironmentEnum!
    organizationId: String
    organizationName: String
    dateCreated: String!
    dateModified: String!
    userRoles: [LanguageHouseUserRoleType!]!
}

input CreateProviderAddressInputType {
    street: String!
    houseNumber: String!
    houseNumberSuffix: String
    postalCode: String!
    locality: String!
}

input CreateProviderEmployeeAvailabilityDayInputType {
    morning: Boolean!
    afternoon: Boolean!
    evening: Boolean!
}

input CreateProviderEmployeeAvailabilityInputType {
    monday: CreateProviderEmployeeAvailabilityDayInputType!
    tuesday: CreateProviderEmployeeAvailabilityDayInputType!
    wednesday: CreateProviderEmployeeAvailabilityDayInputType!
    thursday: CreateProviderEmployeeAvailabilityDayInputType!
    friday: CreateProviderEmployeeAvailabilityDayInputType!
    saturday: CreateProviderEmployeeAvailabilityDayInputType!
    sunday: CreateProviderEmployeeAvailabilityDayInputType!
}

input CreateProviderEmployeeCurrentEducationNoButDidFollowInputType {
    dateUntil: String
    level: String
    gotCertificate: Boolean
}

input CreateProviderEmployeeCurrentEducationYesInputType {
    dateSince: String
    name: String
    doesProvideCertificate: Boolean
}

input CreateProviderEmployeeDocumentInputType {
    providerEmployeeId: String!
    filename: String!
    base64data: String!
}

input CreateProviderEmployeeInputType {
    givenName: String!
    additionalName: String
    familyName: String!
    telephone: String
    availability: CreateProviderEmployeeAvailabilityInputType
    availabilityNotes: String
    email: String!
    userGroupIds: [String!]!
    gender: ProviderEmployeeGenderEnum
    dateOfBirth: String
    address: ProviderEmployeeAddressInputType
    contactTelephone: String
    contactPreference: ProviderEmployeeContactPreferenceEnum
    contactPreferenceOther: String
    targetGroupPreference: [ProviderEmployeeTargetGroupPreferenceEnum!]
    volunteringPreference: String
    gotHereVia: String
    hasExperienceWithTargetGroup: Boolean
    experienceWithTargetGroupYesReason: Boolean
    currentEducation: ProviderEmployeeCurrentEducationEnum
    currentEducationYes: CreateProviderEmployeeCurrentEducationYesInputType
    currentEdicationNoButDidFollow: CreateProviderEmployeeCurrentEducationNoButDidFollowInputType
    doesCurrentlyFollowCourse: Boolean
    currentlyFollowingCourseName: String
    currentlyFollowingCourseInstitute: String
    currentlyFollowingCourseTeacherProfessionalism: ProviderEmployeeProfessionalismEnum
    currentlyFollowingCourseCourseProfessionalism: ProviderEmployeeProfessionalismEnum
    doesCurrentlyFollowingCourseProvideCertificate: Boolean
    otherRelevantCertificates: String
    isVOGChecked: Boolean
    providerId: String!
}

input CreateBiscEmployeeInputType {
    givenName: String!
    additionalName: String
    familyName: String!
    email: String!
    telephone: String
}

input CreateGroupAvailabilityDayInputType {
    morning: Boolean!
    afternoon: Boolean!
    evening: Boolean!
}

input CreateGroupAvailabilityInputType {
    monday: CreateGroupAvailabilityDayInputType!
    tuesday: CreateGroupAvailabilityDayInputType!
    wednesday: CreateGroupAvailabilityDayInputType!
    thursday: CreateGroupAvailabilityDayInputType!
    friday: CreateGroupAvailabilityDayInputType!
    saturday: CreateGroupAvailabilityDayInputType!
    sunday: CreateGroupAvailabilityDayInputType!
}

input CreateGroupInputType {
    providerId: String!
    name: String!
    typeCourse: GroupTypeCourseEnum!
    outComesGoal: String!
    outComesTopic: LearningNeedTopicEnum!
    outComesTopicOther: String
    outComesApplication: LearningNeedApplicationEnum!
    outComesApplicationOther: String
    outComesLevel: LearningNeedLevelEnum!
    outComesLevelOther: String
    detailsIsFormal: Boolean!
    detailsTotalClassHours: Int!
    detailsCertificateWillBeAwarded: Boolean!
    detailsStartDate: String
    detailsEndDate: String
    availability: CreateGroupAvailabilityInputType
    availabilityNotes: String
    generalLocation: String!
    generalParticipantsMin: Int
    generalParticipantsMax: Int
    generalEvaluation: String
    providerEmployeeIds: [String!]
}

input CreateLearningNeedInputType {
    studentId: String!
    learningNeedDescription: String!
    learningNeedMotivation: String!
    desiredOutComesGoal: String!
    desiredOutComesTopic: LearningNeedTopicEnum!
    desiredOutComesTopicOther: String
    desiredOutComesApplication: LearningNeedApplicationEnum!
    desiredOutComesApplicationOther: String
    desiredOutComesLevel: LearningNeedLevelEnum!
    desiredOutComesLevelOther: String
    offerDesiredOffer: String!
    offerAdvisedOffer: String!
    offerDifference: LearningNeedOfferDifferenceEnum!
    offerDifferenceOther: String
    offerEngagements: String
}

input CreateParticipationInputType {
    providerId: String
    providerName: String
    providerNote: String
    offerName: String
    offerCourse: ParticipationOfferCourseEnum
    outComesGoal: String
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther: String
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther: String
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther: String
    detailsIsFormal: Boolean
    detailsGroupFormation: ParticipationGroupFormationEnum
    detailsTotalClassHours: Float
    detailsCertificateWillBeAwarded: Boolean
    detailsStartDate: DateTime
    detailsEndDate: DateTime
    detailsEngagements: String
    learningNeedId: String!
}

input CreateStudentAvailabilityDayInputType {
    morning: Boolean!
    afternoon: Boolean!
    evening: Boolean!
}

input CreateStudentAvailabilityDaysInputType {
    monday: CreateStudentAvailabilityDayInputType!
    tuesday: CreateStudentAvailabilityDayInputType!
    wednesday: CreateStudentAvailabilityDayInputType!
    thursday: CreateStudentAvailabilityDayInputType!
    friday: CreateStudentAvailabilityDayInputType!
    saturday: CreateStudentAvailabilityDayInputType!
    sunday: CreateStudentAvailabilityDayInputType!
}

input CreateStudentAvailabilityInputType {
    availability: CreateStudentAvailabilityDaysInputType
    availabilityNotes: String
}

input CreateStudentBackgroundInputType {
    foundVia: StudentFoundViaEnum
    foundViaOther: String
    wentToLanguageHouseBefore: Boolean
    wentToLanguageHouseBeforeReason: String
    wentToLanguageHouseBeforeYear: Float
    network: [StudentNetworkEnum!]
    participationLadder: Int
}

input CreateStudentCivicIntegrationInputType {
    civicIntegrationRequirement: StudentCivicIntegrationRequirementEnum
    civicIntegrationRequirementReason: StudentCivicIntegrationRequirementReasonEnum
    civicIntegrationRequirementFinishDate: String
}

input CreateStudentContactInputType {
    street: String
    postalCode: String
    locality: String
    houseNumber: String
    houseNumberSuffix: String
    email: String
    telephone: String
    contactPersonTelephone: String
    contactPreference: StudentContactPreferenceEnum
    contactPreferenceOther: String
}

input CreateStudentCourseInputType {
    isFollowingCourseRightNow: Boolean
    courseName: String
    courseTeacher: StudentFollowingCourseTeacherEnum
    courseGroup: StudentFollowingCourseGroupEnum
    amountOfHours: Int
    doesCourseProvideCertificate: Boolean
}

input CreateStudentDocumentInputType {
    studentId: String!
    filename: String!
    base64data: String!
}

input CreateStudentDossierEventInputType {
    studentId: String!
    event: StudentDossierEventEnum!
    eventDate: String!
    eventDescription: String!
}

input CreateStudentDutchNTInputType {
    dutchNTLevel: StudentDutchNTLevelEnum
    inNetherlandsSinceYear: Float
    languageInDailyLife: String
    knowsLatinAlphabet: Boolean
    lastKnownLevel: StudentDutchLastKnownLevelEnum
}

input CreateStudentEducationInputType {
    lastFollowedEducation: StudentLastFollowedEducationEnum
    didGraduate: Boolean
    followingEducationRightNow: StudentFollowingEducationRightNowEnum
    followingEducationRightNowYesStartDate: String
    followingEducationRightNowYesEndDate: String
    followingEducationRightNowYesLevel: StudentFollowingEducationRightNowLevelEnum
    followingEducationRightNowYesInstitute: String
    followingEducationRightNowYesProvidesCertificate: Boolean
    followingEducationRightNowNoEndDate: String
    followingEducationRightNowNoLevel: String
    followingEducationRightNowNoGotCertificate: Boolean
}

input CreateStudentGeneralInputType {
    countryOfOrigin: String
    nativeLanguage: String
    otherLanguages: String
    familyComposition: [StudentFamilyCompositionEnum!]
    childrenCount: Int
    childrenDatesOfBirth: String
}

input CreateStudentInputType {
    civicIntegrationDetails: CreateStudentCivicIntegrationInputType
    personDetails: CreateStudentPersonInputType!
    contactDetails: CreateStudentContactInputType
    generalDetails: CreateStudentGeneralInputType
    referrerDetails: CreateStudentReferrerInputType
    backgroundDetails: CreateStudentBackgroundInputType
    dutchNTDetails: CreateStudentDutchNTInputType
    speakingLevel: StudentSpeakingLevelEnum
    educationDetails: CreateStudentEducationInputType
    courseDetails: CreateStudentCourseInputType
    jobDetails: CreateStudentJobInputType
    motivationDetails: CreateStudentMotivationInputType
    availabilityDetails: CreateStudentAvailabilityInputType
    readingTestResult: StudentReadingTestResultEnum
    writingTestResult: StudentWritingTestResultEnum
    permissionDetails: CreateStudentPermissionInputType!
    languageHouseId: String!
}

input CreateStudentJobInputType {
    trainedForJob: String
    lastJob: String
    dayTimeActivities: [StudentJobDaytimeActivitiesEnum!]
    dayTimeActivitiesOther: String
}

input CreateStudentMotivationInputType {
    desiredSkills: [StudentMotivationDesiredSkillsEnum!]
    desiredSkillsOther: String
    hasTriedThisBefore: Boolean
    hasTriedThisBeforeExplanation: String
    whyWantTheseSkills: String
    whyWantThisNow: String
    desiredLearningMethod: [StudentMotivationDesiredLearningMethodsEnum!]
    remarks: String
}

input CreateStudentPermissionInputType {
    didSignPermissionForm: Boolean!
    hasPermissionToShareDataWithProviders: Boolean!
    hasPermissionToShareDataWithLibraries: Boolean!
    hasPermissionToSendInformationAboutLibraries: Boolean!
}

input CreateStudentPersonInputType {
    givenName: String!
    additionalName: String
    familyName: String!
    gender: StudentGenderEnum
    dateOfBirth: String
}

input CreateStudentReferrerInputType {
    referringOrganization: StudentReferringOrganizationEnum
    referringOrganizationOther: String
    email: String
}

input CreateLanguageHouseAddressInputType {
    street: String!
    houseNumber: String!
    houseNumberSuffix: String
    postalCode: String!
    locality: String!
}

input CreateLanguageHouseEmployeeInputType {
    languageHouseId: String!
    userGroupId: String!
    givenName: String!
    additionalName: String
    familyName: String!
    email: String!
    telephone: String
}

input CreateTestResultInputType {
    participationId: String!
    outComesGoal: String!
    outComesTopic: LearningNeedTopicEnum!
    outComesTopicOther: String
    outComesApplication: LearningNeedApplicationEnum!
    outComesApplicationOther: String
    outComesLevel: LearningNeedLevelEnum!
    outComesLevelOther: String
    examUsedExam: String!
    examDate: String!
    examMemo: String
}

# A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
scalar DateTime

input DownloadDesiredLearningOutcomesReportInputType {
    languageHouseId: String!
    dateFrom: String
    dateUntil: String
}

input DownloadParticipantsReportInputType {
    languageHouseId: String!
    dateFrom: String
    dateUntil: String
}

type DownloadReportType {
    filename: String!
    base64data: String!
}

input DownloadVolunteersReportInputType {
    providerId: String!
    dateFrom: String
    dateUntil: String
}

type GroupAvailabilityDaysType {
    monday: GroupAvailabilityDayType!
    tuesday: GroupAvailabilityDayType!
    wednesday: GroupAvailabilityDayType!
    thursday: GroupAvailabilityDayType!
    friday: GroupAvailabilityDayType!
    saturday: GroupAvailabilityDayType!
    sunday: GroupAvailabilityDayType!
}

type GroupAvailabilityDayType {
    morning: Boolean!
    afternoon: Boolean!
    evening: Boolean!
}

type GroupType {
    id: String!
    name: String!
    providerName: String!
    typeCourse: GroupTypeCourseEnum!
    outComesGoal: String!
    outComesTopic: LearningNeedTopicEnum!
    outComesTopicOther: String
    outComesApplication: LearningNeedApplicationEnum!
    outComesApplicationOther: String
    outComesLevel: LearningNeedLevelEnum!
    outComesLevelOther: String
    detailsIsFormal: Boolean!
    detailsTotalClassHours: Int!
    detailsCertificateWillBeAwarded: Boolean!
    detailsStartDate: String
    detailsEndDate: String
    availability: GroupAvailabilityDaysType
    availabilityNotes: String
    generalLocation: String!
    generalParticipantsMin: Int
    generalParticipantsMax: Int
    generalEvaluation: String
    providerEmployees: [ProviderEmployeeType!]
}

enum GroupTypeCourseEnum {
    LANGUAGE
    MATH
    DIGITAL
    OTHER
}

enum LearningNeedApplicationEnum {
    FAMILY_AND_PARENTING
    LABOR_MARKET_AND_WORK
    HEALTH_AND_WELLBEING
    ADMINISTRATION_AND_FINANCE
    HOUSING_AND_NEIGHBORHOOD
    SELFRELIANCE
    OTHER
}

enum LearningNeedLevelEnum {
    INFLOW
    NLQF1
    NLQF2
    NLQF3
    NLQF4
    OTHER
}

enum LearningNeedOfferDifferenceEnum {
    NO
    YES_DISTANCE
    YES_WAITINGLIST
    YES_OTHER
}

enum LearningNeedTopicEnum {
    DUTCH_READING
    DUTCH_WRITING
    MATH_NUMBERS
    MATH_PROPORTION
    MATH_GEOMETRY
    MATH_LINKS
    DIGITAL_USING_ICT_SYSTEMS
    DIGITAL_SEARCHING_INFORMATION
    DIGITAL_PROCESSING_INFORMATION
    DIGITAL_COMMUNICATION
    KNOWLEDGE
    SKILLS
    ATTITUDE
    BEHAVIOUR
    OTHER
}

type LearningNeedType {
    id: String!
    learningNeedDescription: String!
    learningNeedMotivation: String!
    desiredOutComesGoal: String!
    desiredOutComesTopic: LearningNeedTopicEnum!
    desiredOutComesTopicOther: String
    desiredOutComesApplication: LearningNeedApplicationEnum!
    desiredOutComesApplicationOther: String
    desiredOutComesLevel: LearningNeedLevelEnum!
    desiredOutComesLevelOther: String
    offerDesiredOffer: String!
    offerAdvisedOffer: String!
    offerDifference: LearningNeedOfferDifferenceEnum!
    offerDifferenceOther: String
    offerEngagements: String
    participations: [ParticipationType!]!
}

type Mutation {
    login(username: String!, password: String!): RawReturnType!
    requestPasswordReset(email: String!): Boolean!
    resetPassword(email: String!, token: String!, password: String!): Boolean!
    changePassword(currentPassword: String!, newPassword: String!): Boolean!
    createLanguageHouse(
        address: CreateLanguageHouseAddressInputType
        name: String!
        email: String
        phoneNumber: String
    ): LanguageHouseType!
    updateLanguageHouse(
        id: String!
        address: UpdateLanguageHouseAddressInputType
        name: String
        email: String
        phoneNumber: String
    ): LanguageHouseType!
    deleteLanguageHouse(id: String!): Boolean!
    createLanguageHouseEmployee(input: CreateLanguageHouseEmployeeInputType!): LanguageHouseEmployeeType!
    deleteLanguageHouseEmployee(userId: String!): Boolean!
    updateLanguageHouseEmployee(input: UpdateLanguageHouseEmployeeInputType!): LanguageHouseEmployeeType!
    createProvider(
        address: CreateProviderAddressInputType
        name: String!
        email: String
        phoneNumber: String
    ): ProviderType!
    updateProvider(
        id: String!
        address: UpdateProviderAddressInputType
        name: String
        email: String
        phoneNumber: String
    ): ProviderType!
    deleteProvider(id: String!): Boolean!
    createProviderEmployee(input: CreateProviderEmployeeInputType!): ProviderEmployeeType!
    updateProviderEmployee(input: UpdateProviderEmployeeInputType!): ProviderEmployeeType!
    deleteProviderEmployee(userId: String!): Boolean!
    registerStudent(input: RegisterStudentInputType!): Boolean!
    deleteRegistration(studentId: String!): Boolean!
    acceptRegistration(studentId: String!): StudentType!
    createStudent(input: CreateStudentInputType!): StudentType!
    updateStudent(input: UpdateStudentInputType!): StudentType!
    createLearningNeed(input: CreateLearningNeedInputType!): LearningNeedType!
    updateLearningNeed(input: UpdateLearningNeedInputType!): LearningNeedType!
    deleteLearningNeed(learningNeedId: String!): Boolean!
    createParticipation(input: CreateParticipationInputType!): ParticipationType!
    createBiscEmployee(input: CreateBiscEmployeeInputType!): BiscEmployeeType!
    updateBiscEmployee(input: UpdateBiscEmployeeInputType!): BiscEmployeeType!
    deleteBiscEmployee(biscEmployeeId: String!): Boolean!
    downloadParticipantsReport(input: DownloadParticipantsReportInputType!): DownloadReportType!
    downloadDesiredLearningOutcomesReport(input: DownloadDesiredLearningOutcomesReportInputType!): DownloadReportType!
    downloadVolunteersReport(input: DownloadVolunteersReportInputType!): DownloadReportType!
    createProviderEmployeeDocument(input: CreateProviderEmployeeDocumentInputType!): ProviderEmployeeDocumentType!
    downloadProviderEmployeeDocument(providerEmployeeDocumentId: String!): ProviderEmployeeDocumentDownloadType!
    deleteProviderEmployeeDocument(providerEmployeeDocumentId: String!): Boolean!
    createStudentDocument(input: CreateStudentDocumentInputType!): StudentDocumentType!
    downloadStudentDocument(studentDocumentId: String!): StudentDocumentDownloadType!
    deleteStudentDocument(studentDocumentId: String!): Boolean!
    createStudentDossierEvent(input: CreateStudentDossierEventInputType!): StudentDossierEventType!
    updateStudentDossierEvent(input: UpdateStudentDossierEventInputType!): StudentDossierEventType!
    deleteStudentDossierEvent(studentDossierEventId: String!): Boolean!
    deleteParticipation(participationId: String!): Boolean!
    updateParticipation(input: UpdateParticipationInputType!): ParticipationType!
    createTestResult(input: CreateTestResultInputType!): TestResultType!
    updateTestResult(input: UpdateTestResultInputType!): TestResultType!
    deleteTestResult(testResultId: String!): Boolean!
    createGroup(input: CreateGroupInputType!): GroupType!
    updateGroup(input: UpdateGroupInputType!): GroupType!
    addMentorToParticipation(input: AddOrRemoveMentorToParticipationInputType!): ProviderEmployeeType!
    removeMentorFromParticipation(input: AddOrRemoveMentorToParticipationInputType!): Boolean!
    addParticipationToGroup(input: AddOrRemoveParticipationToGroupInputType!): ParticipationType!
    updateGroupParticipation(input: UpdateGroupParticipationInputType!): ParticipationType!
    removeParticipationFromGroup(input: AddOrRemoveParticipationToGroupInputType!): Boolean!
}

enum ParticipantStatusEnum {
    pending
    accepted
}

enum ParticipationGroupFormationEnum {
    INDIVIDUALLY
    IN_A_GROUP
}

enum ParticipationOfferCourseEnum {
    LANGUAGE
    MATH
    DIGITAL
    OTHER
}

enum ParticipationPresenceEndParticipationReasonEnum {
    MOVED
    JOB
    ILLNESS
    DEATH
    COMPLETED_SUCCESSFULLY
    FAMILY_CIRCUMSTANCES
    DOES_NOT_MEET_EXPECTATIONS
    OTHER
}

enum ParticipationStatusEnum {
    ACTIVE
    COMPLETED
    REFERRED
}

type ParticipationType {
    id: String!
    status: ParticipationStatusEnum!
    providerId: String
    providerName: String
    providerNote: String
    offerName: String
    offerCourse: ParticipationOfferCourseEnum
    outComesGoal: String
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther: String
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther: String
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther: String
    detailsIsFormal: Boolean
    detailsGroupFormation: ParticipationGroupFormationEnum
    detailsTotalClassHours: Float
    detailsCertificateWillBeAwarded: Boolean
    detailsStartDate: DateTime
    detailsEndDate: DateTime
    detailsEngagements: String
}

type Query {
    currentUser: ContextUserType!
    languageHouses: [LanguageHouseType!]!
    languageHouse(languageHouseId: String!): LanguageHouseType!
    userRolesByLanguageHouseId(languageHouseId: String!): [LanguageHouseUserRoleType!]!
    languageHouseEmployees(languageHouseId: String!): [LanguageHouseEmployeeType!]!
    languageHouseEmployee(userId: String!): LanguageHouseEmployeeType!
    providers: [ProviderType!]!
    provider(id: String!): ProviderType!
    providerEmployees(providerId: String!): [ProviderEmployeeType!]!
    providerEmployee(userId: String!): ProviderEmployeeType!
    userRolesByProviderId(providerId: String!): [ProviderUserRoleType!]!
    registrations(languageHouseId: String!): [StudentType!]!
    registration(studentId: String!): StudentType!
    students(languageHouseId: String!): [StudentType!]!
    student(studentId: String!): StudentType!
    learningNeeds(studentId: String!): [LearningNeedType!]!
    learningNeed(learningNeedId: String!): LearningNeedType!
    biscEmployee(biscEmployeeId: String!): BiscEmployeeType!
    biscEmployees: [BiscEmployeeType!]!
    providerEmployeeDocument(providerEmployeeDocumentId: String!): ProviderEmployeeDocumentType!
    providerEmployeeDocuments(providerEmployeeId: String!): [ProviderEmployeeDocumentType!]!
    studentDocument(studentDocumentId: String!): StudentDocumentType!
    studentDocuments(studentId: String!): [StudentDocumentType!]!
    studentDossierEvent(studentDossierEventId: String!): StudentDossierEventType!
    studentDossierEvents(studentId: String!): [StudentDossierEventType!]!
    participations(learningNeedId: String!): [ParticipationType!]!
    participation(participationId: String!): ParticipationType!
    testResults(participationId: String!): [TestResultType!]!
    testResult(testResultId: String!): TestResultType!
    providerEmployeeMentees(providerEmployeeId: String!): [StudentType!]!
    group(groupId: String!): GroupType!
    activeGroups(providerId: String!): [GroupType!]!
    completedGroups(providerId: String!): [GroupType!]!
    futureGroups(providerId: String!): [GroupType!]!
    groupStudents(groupId: String!): [StudentType!]!
    newReferredStudents(providerId: String!): [StudentType!]!
    activeStudents(providerId: String!): [StudentType!]!
    completedStudents(providerId: String!): [StudentType!]!
}

type RawReturnType {
    accessToken: String!
}

input RegisterStudentAddresInputType {
    street: String
    postalCode: String
    locality: String
    houseNumber: String
    houseNumberSuffix: String
}

input RegisterStudentInputType {
    languageHouseId: String!
    student: RegisterStudentStudentInputType!
    registrar: RegisterStudentRegistrarInputType!
    memo: String
}

input RegisterStudentRegistrarInputType {
    organisationName: String!
    givenName: String!
    additionalName: String
    familyName: String!
    email: String!
    telephone: String!
}

input RegisterStudentStudentInputType {
    givenName: String!
    additionalName: String
    familyName: String!
    email: String!
    telephone: String!
    address: RegisterStudentAddresInputType
}

type StudentAvailabilityDaysType {
    monday: StudentAvailabilityDayType!
    tuesday: StudentAvailabilityDayType!
    wednesday: StudentAvailabilityDayType!
    thursday: StudentAvailabilityDayType!
    friday: StudentAvailabilityDayType!
    saturday: StudentAvailabilityDayType!
    sunday: StudentAvailabilityDayType!
}

type StudentAvailabilityDayType {
    morning: Boolean!
    afternoon: Boolean!
    evening: Boolean!
}

type StudentAvailabilityType {
    availability: StudentAvailabilityDaysType
    availabilityNotes: String
}

type StudentBackgroundType {
    foundVia: StudentFoundViaEnum
    foundViaOther: String
    wentToLanguageHouseBefore: Boolean
    wentToLanguageHouseBeforeReason: String
    wentToLanguageHouseBeforeYear: Float
    network: [StudentNetworkEnum!]
    participationLadder: Int
}

enum StudentCivicIntegrationRequirementEnum {
    NO
    YES
    CURRENTLY_WORKING_ON_INTEGRATION
}

enum StudentCivicIntegrationRequirementReasonEnum {
    FINISHED
    FROM_EU_COUNTRY
    EXEMPTED_OR_ZROUTE
}

type StudentCivicIntegrationType {
    civicIntegrationRequirement: StudentCivicIntegrationRequirementEnum
    civicIntegrationRequirementReason: StudentCivicIntegrationRequirementReasonEnum
    civicIntegrationRequirementFinishDate: String
}

enum StudentContactPreferenceEnum {
    PHONECALL
    WHATSAPP
    EMAIL
    OTHER
}

type StudentContactType {
    street: String
    postalCode: String
    locality: String
    houseNumber: String
    houseNumberSuffix: String
    email: String
    telephone: String
    contactPersonTelephone: String
    contactPreference: StudentContactPreferenceEnum
    contactPreferenceOther: String
}

type StudentCourseType {
    isFollowingCourseRightNow: Boolean
    courseName: String
    courseTeacher: StudentFollowingCourseTeacherEnum
    courseGroup: StudentFollowingCourseGroupEnum
    amountOfHours: Int
    doesCourseProvideCertificate: Boolean
}

type StudentDocumentDownloadType {
    base64data: String!
}

type StudentDocumentType {
    id: String!
    filename: String!
    dateCreated: String!
}

enum StudentDossierEventEnum {
    FINAL_TALK
    REMARK
    FOLLOW_UP_TALK
    INFO_FOR_STORYTELLING
    INTAKE
}

type StudentDossierEventType {
    id: String!
    event: StudentDossierEventEnum!
    eventDate: String!
    eventDescription: String!
    createdByProviderEmployee: ProviderEmployeeType!
}

enum StudentDutchLastKnownLevelEnum {
    A0
    A1
    A2
    B1
    B2
    C1
    C2
    UNKNOWN
}

enum StudentDutchNTLevelEnum {
    NT1
    NT2
}

type StudentDutchNTType {
    dutchNTLevel: StudentDutchNTLevelEnum
    inNetherlandsSinceYear: Float
    languageInDailyLife: String
    knowsLatinAlphabet: Boolean
    lastKnownLevel: StudentDutchLastKnownLevelEnum
}

type StudentEducationType {
    lastFollowedEducation: StudentLastFollowedEducationEnum
    didGraduate: Boolean
    followingEducationRightNow: StudentFollowingEducationRightNowEnum
    followingEducationRightNowYesStartDate: String
    followingEducationRightNowYesEndDate: String
    followingEducationRightNowYesLevel: StudentFollowingEducationRightNowLevelEnum
    followingEducationRightNowYesInstitute: String
    followingEducationRightNowYesProvidesCertificate: Boolean
    followingEducationRightNowNoEndDate: String
    followingEducationRightNowNoLevel: String
    followingEducationRightNowNoGotCertificate: Boolean
}

enum StudentFamilyCompositionEnum {
    MARRIED_PARTNER
    SINGLE
    DIVORCED
    WIDOW
}

enum StudentFollowingCourseGroupEnum {
    INDIVIDUALLY
    GROUP
}

enum StudentFollowingCourseTeacherEnum {
    PROFESSIONAL
    VOLUNTEER
    BOTH
}

enum StudentFollowingEducationRightNowEnum {
    YES
    NO
    NO_BUT_DID_EARLIER
}

enum StudentFollowingEducationRightNowLevelEnum {
    LANGUAGE_COURSE
    BO
    HBO
    WO
    OTHER
}

enum StudentFoundViaEnum {
    VOLUNTEER_CENTER
    LIBRARY_WEBSITE
    SOCIAL_MEDIA
    NEWSPAPER
    VIA_VIA
    OTHER
}

enum StudentGenderEnum {
    MALE
    FEMALE
    X
}

type StudentGeneralType {
    countryOfOrigin: String
    nativeLanguage: String
    otherLanguages: String
    familyComposition: [StudentFamilyCompositionEnum!]
    childrenCount: Int
    childrenDatesOfBirth: String
}

enum StudentJobDaytimeActivitiesEnum {
    SEARCHING_FOR_JOB
    RE_INTEGRATION
    SCHOOL
    VOLUNTEER_JOB
    JOB
    OTHER
}

type StudentJobType {
    trainedForJob: String
    lastJob: String
    dayTimeActivities: [StudentJobDaytimeActivitiesEnum!]
    dayTimeActivitiesOther: String
}

enum StudentLastFollowedEducationEnum {
    NO_EDUCATION
    SOME_YEARS_PO
    PO
    VO
    MBO
    HBO
    UNIVERSITY
}

enum StudentMotivationDesiredLearningMethodsEnum {
    IN_A_GROUP
    ONE_ON_ONE
    HOME_ENVIRONMENT
    IN_LIBRARY_OR_OTHER
    ONLINE
}

enum StudentMotivationDesiredSkillsEnum {
    KLIKTIK
    USING_WHATSAPP
    USING_SKYPE
    DEVICE_FUNCTIONALITIES
    DIGITAL_GOVERNMENT
    RESERVE_BOOKS_IN_LIBRARY
    ADS_ON_MARKTPLAATS
    READ_FOR_CHILDREN
    UNDERSTAND_PRESCRIPTIONS
    WRITE_APPLICATION_LETTER
    WRITE_POSTCARD_FOR_FAMILY
    DO_ADMINISTRATION
    CALCULATIONS_FOR_RECIPES
    OTHER
}

type StudentMotivationType {
    desiredSkills: [StudentMotivationDesiredSkillsEnum!]
    desiredSkillsOther: String
    hasTriedThisBefore: Boolean
    hasTriedThisBeforeExplanation: String
    whyWantTheseSkills: String
    whyWantThisNow: String
    desiredLearningMethod: [StudentMotivationDesiredLearningMethodsEnum!]
    remarks: String
}

enum StudentNetworkEnum {
    HOUSEHOLD_MEMBERS
    NEIGHBORS
    FAMILY_MEMBERS
    AID_WORKERS
    FRIENDS_ACQUAINTANCES
    PEOPLE_AT_MOSQUE_CHURCH
    ACQUAINTANCES_SPEAKING_OWN_LANGUAGE
    ACQUAINTANCES_SPEAKING_DUTCH
}

type StudentPermissionType {
    didSignPermissionForm: Boolean!
    hasPermissionToShareDataWithProviders: Boolean!
    hasPermissionToShareDataWithLibraries: Boolean!
    hasPermissionToSendInformationAboutLibraries: Boolean!
}

type StudentPersonType {
    givenName: String!
    additionalName: String
    familyName: String!
    gender: StudentGenderEnum
    dateOfBirth: String
}

enum StudentReadingTestResultEnum {
    CAN_NOT_READ
    A0
    A1
    A2
    B1
    B2
    C1
    C2
}

type StudentReferrerType {
    referringOrganization: StudentReferringOrganizationEnum
    referringOrganizationOther: String
    email: String
}

enum StudentReferringOrganizationEnum {
    UWV
    SOCIAL_SERVICE
    LIBRARY
    WELFARE_WORK
    NEIGHBORHOOD_TEAM
    VOLUNTEER_ORGANIZATION
    LANGUAGE_PROVIDER
    OTHER
}

type StudentRegistrarType {
    id: String!
    organisationName: String!
    givenName: String!
    additionalName: String
    familyName: String!
    email: String!
    telephone: String!
}

enum StudentSpeakingLevelEnum {
    BEGINNER
    REASONABLE
    ADVANCED
}

type StudentType {
    id: String!
    dateCreated: String!
    status: ParticipantStatusEnum!
    memo: String
    registrar: StudentRegistrarType
    civicIntegrationDetails: StudentCivicIntegrationType
    personDetails: StudentPersonType!
    contactDetails: StudentContactType
    generalDetails: StudentGeneralType
    referrerDetails: StudentReferrerType
    backgroundDetails: StudentBackgroundType
    dutchNTDetails: StudentDutchNTType
    speakingLevel: StudentSpeakingLevelEnum
    educationDetails: StudentEducationType
    courseDetails: StudentCourseType
    jobDetails: StudentJobType
    motivationDetails: StudentMotivationType
    availabilityDetails: StudentAvailabilityType
    readingTestResult: StudentReadingTestResultEnum
    writingTestResult: StudentWritingTestResultEnum
    permissionDetails: StudentPermissionType!
}

enum StudentWritingTestResultEnum {
    CAN_NOT_WRITE
    WRITE_NAW_DETAILS
    WRITE_SIMPLE_TEXTS
    WRITE_SIMPLE_LETTERS
}

type LanguageHouseAddressType {
    street: String!
    houseNumber: String!
    houseNumberSuffix: String
    postalCode: String!
    locality: String!
}

type LanguageHouseEmployeeType {
    id: String!
    givenName: String!
    additionalName: String
    familyName: String!
    email: String!
    telephone: String
    dateCreated: String!
    dateModified: String!
    userRoles: [LanguageHouseUserRoleType!]!
}

type LanguageHouseType {
    id: String!
    name: String!
    address: LanguageHouseAddressType
    email: String
    telephone: String
    type: String
}

type LanguageHouseUserRoleType {
    id: String!
    name: UserRoleEnum!
}

type TestResultType {
    id: String!
    outComesGoal: String
    outComesTopic: LearningNeedTopicEnum!
    outComesTopicOther: String
    outComesApplication: LearningNeedApplicationEnum!
    outComesApplicationOther: String
    outComesLevel: LearningNeedLevelEnum!
    outComesLevelOther: String
    examUsedExam: String!
    examDate: String!
    examMemo: String
    examResult: String
}

input UpdateProviderAddressInputType {
    street: String
    houseNumber: String
    houseNumberSuffix: String
    postalCode: String
    locality: String
}

input UpdateProviderEmployeeInputType {
    givenName: String!
    additionalName: String
    familyName: String!
    telephone: String
    availability: CreateProviderEmployeeAvailabilityInputType
    availabilityNotes: String
    email: String!
    userGroupIds: [String!]!
    gender: ProviderEmployeeGenderEnum
    dateOfBirth: String
    address: ProviderEmployeeAddressInputType
    contactTelephone: String
    contactPreference: ProviderEmployeeContactPreferenceEnum
    contactPreferenceOther: String
    targetGroupPreference: [ProviderEmployeeTargetGroupPreferenceEnum!]
    volunteringPreference: String
    gotHereVia: String
    hasExperienceWithTargetGroup: Boolean
    experienceWithTargetGroupYesReason: Boolean
    currentEducation: ProviderEmployeeCurrentEducationEnum
    currentEducationYes: CreateProviderEmployeeCurrentEducationYesInputType
    currentEdicationNoButDidFollow: CreateProviderEmployeeCurrentEducationNoButDidFollowInputType
    doesCurrentlyFollowCourse: Boolean
    currentlyFollowingCourseName: String
    currentlyFollowingCourseInstitute: String
    currentlyFollowingCourseTeacherProfessionalism: ProviderEmployeeProfessionalismEnum
    currentlyFollowingCourseCourseProfessionalism: ProviderEmployeeProfessionalismEnum
    doesCurrentlyFollowingCourseProvideCertificate: Boolean
    otherRelevantCertificates: String
    isVOGChecked: Boolean
    userId: String!
}

input UpdateBiscEmployeeInputType {
    biscEmployeeId: String!
    givenName: String!
    additionalName: String
    familyName: String!
    email: String!
    telephone: String
}

input UpdateGroupInputType {
    groupId: String!
    name: String!
    typeCourse: GroupTypeCourseEnum!
    outComesGoal: String!
    outComesTopic: LearningNeedTopicEnum!
    outComesTopicOther: String
    outComesApplication: LearningNeedApplicationEnum!
    outComesApplicationOther: String
    outComesLevel: LearningNeedLevelEnum!
    outComesLevelOther: String
    detailsIsFormal: Boolean!
    detailsTotalClassHours: Int!
    detailsCertificateWillBeAwarded: Boolean!
    detailsStartDate: String
    detailsEndDate: String
    availability: CreateGroupAvailabilityInputType
    availabilityNotes: String
    generalLocation: String!
    generalParticipantsMin: Int
    generalParticipantsMax: Int
    generalEvaluation: String
    providerEmployeeIds: [String!]
}

input UpdateGroupParticipationInputType {
    participationId: String!
    presenceEngagements: String
    presenceStartDate: DateTime
    presenceEndDate: DateTime
    presenceEndParticipationReason: ParticipationPresenceEndParticipationReasonEnum
}

input UpdateLearningNeedInputType {
    learningNeedId: String!
    learningNeedDescription: String!
    learningNeedMotivation: String!
    desiredOutComesGoal: String!
    desiredOutComesTopic: LearningNeedTopicEnum!
    desiredOutComesTopicOther: String
    desiredOutComesApplication: LearningNeedApplicationEnum!
    desiredOutComesApplicationOther: String
    desiredOutComesLevel: LearningNeedLevelEnum!
    desiredOutComesLevelOther: String
    offerDesiredOffer: String!
    offerAdvisedOffer: String!
    offerDifference: LearningNeedOfferDifferenceEnum!
    offerDifferenceOther: String
    offerEngagements: String
}

input UpdateParticipationInputType {
    providerId: String
    providerName: String
    providerNote: String
    offerName: String
    offerCourse: ParticipationOfferCourseEnum
    outComesGoal: String
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther: String
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther: String
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther: String
    detailsIsFormal: Boolean
    detailsGroupFormation: ParticipationGroupFormationEnum
    detailsTotalClassHours: Float
    detailsCertificateWillBeAwarded: Boolean
    detailsStartDate: DateTime
    detailsEndDate: DateTime
    detailsEngagements: String
    participationId: String!
    presenceStartDate: DateTime
    presenceEndDate: DateTime
    presenceEndParticipationReason: ParticipationPresenceEndParticipationReasonEnum
}

input UpdateStudentDossierEventInputType {
    studentDossierEventId: String!
    event: StudentDossierEventEnum!
    eventDate: String!
    eventDescription: String!
}

input UpdateStudentInputType {
    civicIntegrationDetails: CreateStudentCivicIntegrationInputType
    personDetails: CreateStudentPersonInputType!
    contactDetails: CreateStudentContactInputType
    generalDetails: CreateStudentGeneralInputType
    referrerDetails: CreateStudentReferrerInputType
    backgroundDetails: CreateStudentBackgroundInputType
    dutchNTDetails: CreateStudentDutchNTInputType
    speakingLevel: StudentSpeakingLevelEnum
    educationDetails: CreateStudentEducationInputType
    courseDetails: CreateStudentCourseInputType
    jobDetails: CreateStudentJobInputType
    motivationDetails: CreateStudentMotivationInputType
    availabilityDetails: CreateStudentAvailabilityInputType
    readingTestResult: StudentReadingTestResultEnum
    writingTestResult: StudentWritingTestResultEnum
    permissionDetails: CreateStudentPermissionInputType!
    studentId: String!
}

input UpdateLanguageHouseAddressInputType {
    street: String
    houseNumber: String
    houseNumberSuffix: String
    postalCode: String
    locality: String
}

input UpdateLanguageHouseEmployeeInputType {
    userId: String!
    userGroupId: String!
    givenName: String!
    additionalName: String
    familyName: String!
    email: String!
    telephone: String
}

input UpdateTestResultInputType {
    testResultId: String!
    outComesGoal: String!
    outComesTopic: LearningNeedTopicEnum!
    outComesTopicOther: String
    outComesApplication: LearningNeedApplicationEnum!
    outComesApplicationOther: String
    outComesLevel: LearningNeedLevelEnum!
    outComesLevelOther: String
    examUsedExam: String!
    examDate: String!
    examMemo: String
}

enum UserEnvironmentEnum {
    BISC
    TAALHUIS
    AANBIEDER
}

enum UserRoleEnum {
    AANBIEDER_COORDINATOR
    AANBIEDER_MENTOR
    AANBIEDER_VOLUNTEER
    TAALHUIS_COORDINATOR
    TAALHUIS_EMPLOYEE
}

type UserType {
    id: String!
    username: String!
}
`
