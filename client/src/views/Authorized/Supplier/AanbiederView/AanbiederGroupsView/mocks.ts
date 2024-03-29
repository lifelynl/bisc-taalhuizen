import times from 'lodash/times'
import {
    GroupType,
    GroupTypeCourseEnum,
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedTopicEnum,
    UserRoleEnum,
} from 'generated/graphql'

export const groupsMockData: GroupType[] = [
    {
        id: 'id',
        name: 'name',
        providerName: 'providerName',
        typeCourse: GroupTypeCourseEnum.Language,
        outComesGoal: 'outComesGoal',
        outComesTopic: LearningNeedTopicEnum.DigitalCommunication,
        outComesTopicOther: 'outComesTopicOther',
        outComesApplication: LearningNeedApplicationEnum.HealthAndWellbeing,
        outComesApplicationOther: 'outComesApplicationOther',
        outComesLevel: LearningNeedLevelEnum.Nlqf2,
        outComesLevelOther: 'outComesLevelOther',
        detailsIsFormal: true,
        detailsTotalClassHours: 0,
        detailsCertificateWillBeAwarded: true,
        detailsStartDate: new Date().toString(),
        detailsEndDate: new Date().toString(),
        availability: {
            __typename: 'GroupAvailabilityDaysType',
            monday: {
                __typename: 'GroupAvailabilityDayType',
                morning: false,
                afternoon: true,
                evening: true,
            },
            tuesday: {
                __typename: 'GroupAvailabilityDayType',
                morning: true,
                afternoon: true,
                evening: false,
            },
            wednesday: {
                __typename: 'GroupAvailabilityDayType',
                morning: false,
                afternoon: true,
                evening: true,
            },
            thursday: {
                __typename: 'GroupAvailabilityDayType',
                morning: true,
                afternoon: false,
                evening: true,
            },
            friday: {
                __typename: 'GroupAvailabilityDayType',
                morning: true,
                afternoon: false,
                evening: true,
            },
            saturday: {
                __typename: 'GroupAvailabilityDayType',
                morning: true,
                afternoon: false,
                evening: true,
            },
            sunday: {
                __typename: 'GroupAvailabilityDayType',
                morning: true,
                afternoon: true,
                evening: false,
            },
        },
        availabilityNotes: 'test',
        generalLocation: 'test',
        generalParticipantsMin: 0,
        generalParticipantsMax: 0,
        generalEvaluation: 'test',
        providerEmployees: times(2, () => ({
            __typename: 'ProviderEmployeeType',
            userId: `${Math.random()}`,
            id: `${Math.random()}`,
            givenName: 'givenName',
            additionalName: 'den',
            familyName: 'failnae',
            email: 'email',
            telephone: 'telephone',
            dateCreated: new Date().toString(),
            dateModified: new Date().toString(),
            userRoles: [
                {
                    __typename: 'ProviderUserRoleType',
                    id: '',
                    name: UserRoleEnum.AanbiederCoordinator,
                },
            ],
        })),
    },
]
