import { ORGANIZATION_SLUG_PARAM } from 'routes/routes'

export interface ProviderParticipantDetailRouteParams {
    providerParticipantId: string
}

export interface ProviderParticipantDetailLearningNeedsDetailRouteParams extends ProviderParticipantDetailRouteParams {
    learningNeedId: string
}

export interface ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams
    extends ProviderParticipantDetailLearningNeedsDetailRouteParams {
    referralId: string
}

export interface ProviderParticipantDetailLearningNeedsDetailReferralsDetailTestResultRouteParams
    extends ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams {
    testResultId: string
}

export interface ProviderParticipantDetailLearningNeedsDetailReferralsDetailGroupPreviewRouteParams
    extends ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams {
    groupId: string
}

export interface ProviderParticipantDetailLearningNeedsDetailReferralsDetailMentorPreviewRouteParams
    extends ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams {
    mentorId: string
}

export interface ProviderManagementCoworkerDetailRouteParams {
    providerEmployeeId: string
}

export interface ProviderGroupDetailRouteParams {
    groupId: string
}

export const PROVIDER_PATH_START = 'provider'

export const providerRoutes = (organizationSlug: string = ORGANIZATION_SLUG_PARAM) => ({
    index: `/${PROVIDER_PATH_START}/${organizationSlug}`,
    participants: {
        index: `/${PROVIDER_PATH_START}/${organizationSlug}/participants`,
        overviews: {
            ongoing: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/active`,
            finished: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/inactive`,
            referredOrNew: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/new`,
        },
        create: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/create`,
        detail: (providerParticipantId: string = ':providerParticipantId') => ({
            index: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}`,
            data: {
                index: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/intake`,
                registration: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/registration`,
                update: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/update`,
                dossier: {
                    index: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/dossier`,
                    detail: (dossierId: string = ':dossierId') => ({
                        index: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/dossier/${dossierId}`,
                    }),
                },
                learningNeeds: {
                    index: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs`,
                    create: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/create`,
                    detail: (learningNeedId: string = ':learningNeedId') => ({
                        index: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}`,
                        update: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/update`,
                        referrals: {
                            index: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals`,
                            detail: (referralId: string = ':referralId') => ({
                                index: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}`,
                                update: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/update`,
                                testResult: {
                                    create: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/test-result/create`,
                                    update: (testResultId: string = ':testResultId') =>
                                        `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/test-result/${testResultId}/update`,
                                },
                                groupAssignment: {
                                    select: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/group/list`,
                                    preview: (groupId: string = ':groupId') =>
                                        `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/group/${groupId}/preview`,
                                    update: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/group/update`,
                                },
                                mentorAssignment: {
                                    select: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/mentor/list`,
                                    preview: (mentorId: string = ':mentorId') =>
                                        `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/mentor/${mentorId}/preview`,
                                    update: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/mentor/update`,
                                },
                            }),
                        },
                    }),
                },
                documents: `/${PROVIDER_PATH_START}/${organizationSlug}/participants/${providerParticipantId}/documents`,
            },
        }),
    },
    groups: {
        index: `/${PROVIDER_PATH_START}/${organizationSlug}/groups`,
        overviews: {
            active: `/${PROVIDER_PATH_START}/${organizationSlug}/groups/active`,
            future: `/${PROVIDER_PATH_START}/${organizationSlug}/groups/future`,
            past: `/${PROVIDER_PATH_START}/${organizationSlug}/groups/pas`,
        },
        create: `/${PROVIDER_PATH_START}/${organizationSlug}/groups/create`,
        detail: (groupId: string = ':groupId') => ({
            index: `/${PROVIDER_PATH_START}/${organizationSlug}/groups/${groupId}`,
            data: {
                index: `/${PROVIDER_PATH_START}/${organizationSlug}/groups/${groupId}/data`,
                participants: `/${PROVIDER_PATH_START}/${organizationSlug}/groups/${groupId}/participants`,
                update: `/${PROVIDER_PATH_START}/${organizationSlug}/groups/${groupId}/update`,
            },
        }),
    },
    management: {
        index: `/${PROVIDER_PATH_START}/${organizationSlug}/management`,
        providerDetails: {
            index: `/${PROVIDER_PATH_START}/${organizationSlug}/management/provider`,
            update: `/${PROVIDER_PATH_START}/${organizationSlug}/management/provider/update`,
        },
        coworkers: {
            index: `/${PROVIDER_PATH_START}/${organizationSlug}/management/coworkers`,
            create: `/${PROVIDER_PATH_START}/${organizationSlug}/management/coworkers/create`,
            detail: (providerEmployeeId: string = ':providerEmployeeId') => ({
                index: `/${PROVIDER_PATH_START}/${organizationSlug}/management/coworkers/${providerEmployeeId}`,
                data: {
                    index: `/${PROVIDER_PATH_START}/${organizationSlug}/management/coworkers/${providerEmployeeId}/data`,
                    update: `/${PROVIDER_PATH_START}/${organizationSlug}/management/coworkers/${providerEmployeeId}/update`,
                    participants: `/${PROVIDER_PATH_START}/${organizationSlug}/management/coworkers/${providerEmployeeId}/participants`,
                    documents: `/${PROVIDER_PATH_START}/${organizationSlug}/management/coworkers/${providerEmployeeId}/documents`,
                },
            }),
        },
    },
    reports: {
        index: `/${PROVIDER_PATH_START}/${organizationSlug}/reports`,
    },
})
