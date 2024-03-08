import { i18n } from '@lingui/core'

import { ORGANIZATION_SLUG_PARAM, routes } from 'routes/routes'
import { providerRoutes } from 'routes/provider/providerRoutes'

export const breadcrumbItems = {
    bisc: (organizationSlug: string = ORGANIZATION_SLUG_PARAM) => ({
        languageHouse: {
            overview: {
                label: i18n._(`Taalhuizen`),
                to: routes.authorized.bisc(organizationSlug).languageHouses.index,
            },
            detail: {
                index: (languageHouseName: string, languageHouseId: string) => ({
                    label: languageHouseName,
                    to: routes.authorized.bisc(organizationSlug).languageHouses.detail(languageHouseId).index,
                }),
            },
            employees: {
                index: (languageHouseId: string) => ({
                    label: i18n._(`Medewerkers`),
                    to: routes.authorized.bisc(organizationSlug).languageHouses.detail(languageHouseId).coworkers.index,
                }),
            },
        },
        providers: {
            overview: {
                label: i18n._(`Aanbieders`),
                to: routes.authorized.bisc(organizationSlug).providers.index,
            },
            detail: {
                index: (providerName: string, providerId: string) => ({
                    label: providerName,
                    to: routes.authorized.bisc(organizationSlug).providers.detail(providerId).data.index,
                }),
                coworkers: {
                    overview: (providerId: string) => ({
                        label: i18n._(`Medewerkers`),
                        to: routes.authorized.bisc(organizationSlug).providers.detail(providerId).coworkers.index,
                    }),
                },
            },
        },
        management: {
            overview: {
                label: i18n._(`Beheer`),
                to: routes.authorized.bisc(organizationSlug).management.index,
            },
            employees: {
                label: i18n._(`Medewerkers`),
                to: routes.authorized.bisc(organizationSlug).management.coworkers.index,
            },
        },
    }),
    languageHouse: (organizationSlug: string = ORGANIZATION_SLUG_PARAM) => ({
        participants: {
            overview: {
                label: i18n._(`Deelnemers`),
                to: routes.authorized.languageHouse(organizationSlug).participants.index,
            },
            detail: {
                learningNeeds: {
                    overview: (languageHouseParticipantId: string) => ({
                        label: i18n._(`Verwijzingen`),
                        to: routes.authorized
                            .languageHouse(organizationSlug)
                            .participants.detail(languageHouseParticipantId).data.learningNeeds.index,
                    }),
                    detail: {
                        index: (languageHouseParticipantId: string, label: string, learningNeedId: string) => ({
                            label,
                            to: routes.authorized
                                .languageHouse(organizationSlug)
                                .participants.detail(languageHouseParticipantId)
                                .data.learningNeeds.detail(learningNeedId).index,
                        }),
                    },
                },
            },
            registrations: {
                overview: {
                    label: i18n._(`Aanmeldingen`),
                    to: routes.authorized.languageHouse(organizationSlug).participants.registrations.index,
                },
            },
        },
        teams: {
            overview: {
                label: i18n._(`Teams`),
                to: routes.authorized.languageHouse(organizationSlug).teams.index,
            },
        },
        management: {
            overview: {
                label: i18n._(`Beheer`),
                to: routes.authorized.languageHouse(organizationSlug).management.index,
            },
            employees: {
                label: i18n._(`Medewerkers`),
                to: routes.authorized.languageHouse(organizationSlug).management.coworkers.index,
            },
        },
    }),
    provider: (organizationSlug: string = ORGANIZATION_SLUG_PARAM) => ({
        groups: {
            overview: {
                label: i18n._(`Groepen`),
                to: providerRoutes(organizationSlug).groups.index,
            },
        },
        management: {
            overview: {
                label: i18n._(`Beheer`),
                to: routes.authorized.provider(organizationSlug).management.index,
            },
            coworkers: {
                label: i18n._(`Medewerkers`),
                to: routes.authorized.provider(organizationSlug).management.coworkers.index,
            },
        },
        participants: {
            overview: {
                label: i18n._(`Deelnemers`),
                to: routes.authorized.provider(organizationSlug).participants.index,
            },
            detail: {
                learningNeeds: {
                    overview: (participantId: string) => ({
                        label: i18n._(`Leervragen`),
                        to: routes.authorized.provider(organizationSlug).participants.detail(participantId).data
                            .learningNeeds.index,
                    }),
                    detail: (participantId: string, learningNeedId: string, learningNeedLabel: string) => ({
                        label: learningNeedLabel,
                        to: routes.authorized
                            .provider(organizationSlug)
                            .participants.detail(participantId)
                            .data.learningNeeds.detail(learningNeedId).index,
                    }),
                },
            },
        },
    }),
}
