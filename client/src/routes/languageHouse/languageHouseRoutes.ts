import { ORGANIZATION_SLUG_PARAM } from 'routes/routes'

export interface LanguageHouseParticipantsDetailRouteParams {
    languageHouseParticipantId: string
}

export interface LanguageHouseRegistrationDetailRouteParams {
    languageHouseParticipantId: string
}

export interface LanguageHouseParticipantsDetailLearningNeedsDetailRouteParams
    extends LanguageHouseParticipantsDetailRouteParams {
    learningNeedId: string
}

export interface LanguageHouseParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams
    extends LanguageHouseParticipantsDetailLearningNeedsDetailRouteParams {
    referralId: string
}

export interface LanguageHouseParticipationTestResultRouteParams
    extends LanguageHouseParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams {
    testResultId: string
}

export interface LanguageHouseManagementCoworkerDetailRouteParams {
    languageHouseEmployeeId: string
}

export interface TeamDetailRouteParams {
    teamId: string
}

export const LANGUAGEHOUSE_PATH_START = 'language-house'

export const languageHouseRoutes = (organizationSlug: string = ORGANIZATION_SLUG_PARAM) => ({
    index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}`,
    participants: {
        index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants`,
        registrations: {
            index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/registrations`,
            detail: (languageHouseParticipantId: string = ':languageHouseParticipantId') =>
                `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/registrations/${languageHouseParticipantId}`,
        },
        create: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/create`,
        detail: (languageHouseParticipantId: string = ':languageHouseParticipantId') => ({
            index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}`,
            data: {
                index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/intake`,
                registration: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/registration`,
                update: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/update`,
                dossier: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/dossier`,
                learningNeeds: {
                    index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs`,
                    create: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/create`,
                    createReferral: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/create-referral`,
                    detail: (learningNeedId: string = ':learningNeedId') => ({
                        index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/${learningNeedId}`,
                        update: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/${learningNeedId}/update`,
                        referrals: {
                            index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/${learningNeedId}/referrals`,
                            create: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/${learningNeedId}/referrals/create`,
                            detail: (referralId: string = ':referralId') => ({
                                index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}`,
                                update: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/update`,
                                testResult: {
                                    create: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/test-result/create`,
                                    update: (testResultId: string = ':testResultId') =>
                                        `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/test-result/${testResultId}/update`,
                                },
                            }),
                        },
                    }),
                },
                documents: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/documents`,
                downloadDetails: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/download-details`,
                mentor: {
                    index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/mentor`,
                    detail: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/mentor/detail`,
                    update: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/participants/${languageHouseParticipantId}/mentor/update`,
                },
            },
        }),
    },
    teams: {
        index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/teams`,
        overview: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/teams/overview`,
        visibility: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/teams/visibility`,
        editVisibility: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/teams/visibility/edit`,
        create: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/teams/create`,
        detail: (teamId: string = ':teamId') => ({
            index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/teams/${teamId}`,
            update: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/teams/${teamId}/update`,
        }),
    },
    reports: {
        index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/reports`,
        overview: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/reports/overview`,
    },
    management: {
        index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management`,
        languageHouseDetails: {
            index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management/language-house`,
            data: {
                index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management/language-house/data`,
                update: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management/language-house/update`,
            },
        },
        coworkers: {
            index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management/coworkers`,
            create: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management/coworkers/create`,
            detail: (languageHouseEmployeeId: string = ':languageHouseEmployeeId') => ({
                index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management/coworkers/${languageHouseEmployeeId}`,
                mentees: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management/coworkers/${languageHouseEmployeeId}/mentees`,
                data: {
                    index: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management/coworkers/${languageHouseEmployeeId}/data`,
                    update: `/${LANGUAGEHOUSE_PATH_START}/${organizationSlug}/management/coworkers/${languageHouseEmployeeId}/update`,
                },
            }),
        },
    },
})
