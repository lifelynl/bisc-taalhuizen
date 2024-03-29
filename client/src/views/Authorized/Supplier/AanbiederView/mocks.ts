// TODO: remove this file once the api is connected

import {
    CreateLearningNeedInputType,
    StudentContactPreferenceEnum,
    StudentGenderEnum,
    UserRoleEnum,
} from 'generated/graphql'
import times from 'lodash/times'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedTopicEnum,
} from 'generated/graphql'

export interface AanbiederParticipant {
    id: string
    familyName: string
    firstName: string
    givenName: string
    isReferred: boolean
    referredBy?: string
    referredAt?: Date
}

export interface AanbiederParticipantDetail extends AanbiederParticipant {
    fullName: string
    gender: StudentGenderEnum
    birthdate: Date
    address: AddressMetadata
    customer: Customer
    isCivicIntegrationRequired: boolean
    civicIntegrationReason: string
    countryOfOrigin: string
    nativeLanguage: string
    otherLanguages: string[]
    maritalStatus: string
    children?: number
    childrenBirthdates?: Date[]
    referrer: Referrer
    background: BackgroundMetadata
    proficiency: 'NT1' | 'NT2'
    level: string
    education: EducationMetadata
    isCurrentlyEnrolledInACourse: boolean
    profession: ProfessionMetadata
    motivations: MotivationsMetadata
    readingTestResult: string
    writingTestResult: string
    isConsentSigned: boolean
    permissions: PermissionsMetadata
    goals: AanbiederParticipantGoal[]
}

interface AddressMetadata {
    street: string
    building: number
    apartment: string
    postcode: string
    city: string
    phone: string
    contactPreference: StudentContactPreferenceEnum
}

interface Customer {
    id: string
    fullName: string
    assignedAt: Date
}

interface Referrer {
    id: string
    group: string
    name: string
    email: string
}

interface BackgroundMetadata {
    foundVia: string
    foundViaBefore: string
    networks: string[]
    participationLadder: string
}

interface EducationMetadata {
    lastTraining: 'NT1' | 'NT2'
    graduated: boolean
    isCurrentlyEnrolled: boolean
}

interface ProfessionMetadata {
    training: string
    lastCompany: string
    activities: string[]
}

interface MotivationsMetadata {
    learningGoals: Record<string, string[]>
    isFirstTime: boolean
    isFirstTimeReason: string
    learningReason: string
    timingReason: string
    processPreference: string[]
    customerComments: string
}

interface PermissionsMetadata {
    sharingLearningPathway: boolean
    sharingBasicData: boolean
    permissionInformationFromLibrary: boolean
}

export interface AanbiederParticipantGoal {
    id: string
    name: string
    participant: Pick<AanbiederParticipantDetail, 'fullName'>
    learningNeedData: CreateLearningNeedInputType
    references: Reference[]
}

export interface DesiredOutcomeMetadata {
    goal: string
    topic: string
    application: string[]
    level: string
}

interface Reference {
    id: string
}

export const aanbiederParticipantsMock: AanbiederParticipant[] = times(16, i => ({
    id: `${i}`,
    familyName: 'somefamilyName',
    firstName: 'somefirstname',
    givenName: 'somenickname',
    isReferred: !!(i & 1),
    referredBy: !!(i & 1) ? 'somereferrer' : undefined,
    referredAt: !!(i & 1) ? new Date() : undefined,
}))

export const aanbiederParticipantDetail: AanbiederParticipantDetail = {
    id: `${2}`,
    familyName: 'somefamilyName',
    firstName: 'somefirstname',
    givenName: 'somenickname',
    fullName: 'somefirstname somefamilyName',
    gender: StudentGenderEnum.Male,
    birthdate: new Date(),
    isReferred: false,
    isCivicIntegrationRequired: false,
    civicIntegrationReason: 'Afgerond',
    address: {
        street: 'somestreetname',
        building: 1,
        apartment: 'A',
        postcode: '1234 AB',
        city: 'somecity',
        phone: '123456789',
        contactPreference: StudentContactPreferenceEnum.Phonecall,
    },
    customer: {
        id: '1',
        fullName: 'somecustomer fullname',
        assignedAt: new Date(),
    },
    countryOfOrigin: 'somecountry',
    nativeLanguage: 'somelanguage',
    otherLanguages: ['somelanguage'],
    maritalStatus: 'divorced',
    children: 2,
    childrenBirthdates: [new Date(), new Date()],
    referrer: {
        id: '1',
        group: 'somegroup',
        name: 'somename',
        email: 'someemail@email.com',
    },
    background: {
        foundVia: 'somesinglebackgroundanswer',
        foundViaBefore: 'Nee',
        networks: ['somesinglebackgroundanswer', 'somesinglebackgroundanswer'],
        participationLadder: 'someparticipationladder',
    },
    proficiency: 'NT1',
    level: 'somelevel',
    education: {
        lastTraining: 'NT1',
        graduated: false,
        isCurrentlyEnrolled: false,
    },
    isCurrentlyEnrolledInACourse: false,
    profession: {
        training: 'sometraining',
        lastCompany: 'somecompany',
        activities: ['someactivity', 'someactivity'],
    },
    motivations: {
        learningGoals: {
            somelearninggoal: ['somelearninggoal'],
            someotherlearninggoal: ['somelearninggoal', 'somelearninggoal'],
        },
        isFirstTime: false,
        isFirstTimeReason: 'somereason',
        learningReason: 'somereason',
        timingReason: 'timingreason',
        processPreference: ['someprocess', 'someprocess'],
        customerComments: 'nocomments',
    },
    readingTestResult: 'A2',
    writingTestResult: 'someresult',
    isConsentSigned: true,
    permissions: {
        sharingLearningPathway: false,
        sharingBasicData: true,
        permissionInformationFromLibrary: false,
    },
    goals: [
        {
            id: '1',
            name: 'Somename',
            participant: {
                fullName: 'Someparticipant Name',
            },
            learningNeedData: {
                studentId: '',
                learningNeedDescription: '',
                learningNeedMotivation: '',
                desiredOutComesGoal: '',
                desiredOutComesTopic: LearningNeedTopicEnum.DutchReading,
                desiredOutComesTopicOther: '',
                desiredOutComesApplication: LearningNeedApplicationEnum.HealthAndWellbeing,
                desiredOutComesApplicationOther: '',
                desiredOutComesLevel: LearningNeedLevelEnum.Nlqf2,
                desiredOutComesLevelOther: '',
                offerDesiredOffer: '',
                offerAdvisedOffer: '',
                offerDifference: LearningNeedOfferDifferenceEnum.YesDistance,
                offerDifferenceOther: '',
                offerEngagements: '',
            },
            references: [],
        },
    ],
}

export interface AanbiederManagementProfile {
    id: string
    name: string
    address: Pick<AddressMetadata, 'street' | 'building' | 'apartment' | 'postcode' | 'city'>
    phone: string
    email: string
}

export const aanbiederManagementProfile: AanbiederManagementProfile = {
    id: '1',
    name: 'someaanbieder name',
    address: {
        street: 'somestreet',
        building: 2,
        apartment: 'a',
        postcode: '1234 ab',
        city: 'somecity',
    },
    phone: '123412341',
    email: 'qwer@qwer.com',
}

export interface AanbiederEmployeeProfile {
    id: string
    givenName: string
    familyName: string
    fullName: string
    phone: string
    email: string
    roles: UserRoleEnum[]
    createdAt: Date
    updatedAt: Date
    participants: AanbiederParticipant[]
}

export const providerEmployeeProfilesMock: AanbiederEmployeeProfile[] = [
    {
        id: '1',
        givenName: 'somenick',
        familyName: 'somefamilyName',
        fullName: 'Some Fullname',
        phone: '123412341',
        email: 'qwer@qwer.com',
        roles: [UserRoleEnum.AanbiederCoordinator],
        createdAt: new Date(),
        updatedAt: new Date(),
        participants: [],
    },
    {
        id: '2',
        givenName: 'somenick',
        familyName: 'somefamilyName',
        fullName: 'Some Fullname',
        phone: '123412341',
        email: 'qwer@qwer.com',
        roles: [UserRoleEnum.AanbiederCoordinator, UserRoleEnum.AanbiederMentor],
        createdAt: new Date(),
        updatedAt: new Date(),
        participants: [],
    },
    {
        id: '3',
        givenName: 'somenick',
        familyName: 'somefamilyName',
        fullName: 'Some Fullname',
        phone: '123412341',
        email: 'qwer@qwer.com',
        roles: [UserRoleEnum.AanbiederVolunteer],
        createdAt: new Date(),
        updatedAt: new Date(),
        participants: [],
    },
]

export const providerEmployeeProfile: AanbiederEmployeeProfile = {
    id: '3',
    givenName: 'somenick',
    familyName: 'somefamilyName',
    fullName: 'Some Fullname',
    phone: '123412341',
    email: 'qwer@qwer.com',
    roles: [UserRoleEnum.AanbiederVolunteer],
    createdAt: new Date(),
    updatedAt: new Date(),
    participants: [
        {
            id: '1',
            familyName: 'somefamilyName',
            firstName: 'somefirstname',
            givenName: 'somenickname',
            isReferred: false,
        },
        {
            id: '2',
            familyName: 'somefamilyName',
            firstName: 'somefirstname',
            givenName: 'somenickname',
            isReferred: false,
        },
    ],
}

export interface AanbiederEmployeeDocument {
    id: string
}

export const providerEmployeeDocumentsMock: AanbiederEmployeeDocument[] = [{ id: '1' }]
