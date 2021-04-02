import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { routes } from 'routes/routes'
import { TaalhuizenDetailLocationStateProps } from 'views/Authorized/Bisc/Taalhuizen/TaalhuizenDetail/TaalhuizenDetailView'
import { AanbiederParticipantLocationStateProps } from 'views/Authorized/Supplier/AanbiederView/AanbiederParticipantsView/AanbiederParticipantDetailView/AanbiederParticipantDetailView'

export const breadcrumbItems = {
    bisc: {
        taalhuis: {
            overview: {
                label: i18n._(t`Taalhuizen`),
                to: routes.authorized.bisc.taalhuizen.overview,
            },
            detail: {
                index: (taalhuisName: string, locationState: TaalhuizenDetailLocationStateProps) => ({
                    label: taalhuisName,
                    to: {
                        pathname: routes.authorized.bisc.taalhuizen.detail.index,
                        hash: '',
                        search: '',
                        state: locationState,
                    },
                }),
            },
            employees: {
                index: (locationState: TaalhuizenDetailLocationStateProps) => ({
                    label: i18n._(t`Medewerkers`),
                    to: {
                        pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.index,
                        hash: '',
                        search: '',
                        state: locationState,
                    },
                }),
            },
            management: {
                index: {
                    label: i18n._(t`Beheer`),
                    to: routes.authorized.management.taalhuis.index,
                },
            },
        },
        aanbieder: {
            overview: {
                label: i18n._(t`Aanbieders`),
                to: routes.authorized.supplier.bisc.overview,
            },
            employees: {
                index: {
                    label: i18n._(t`Medewerkers`),
                    to: routes.authorized.supplier.bisc.read.coworkers.index,
                },
            },
        },
        management: {
            overview: {
                label: i18n._(t`Beheer`),
                to: routes.authorized.management.bisc.overview,
            },
        },
    },
    taalhuis: {
        participants: {
            overview: {
                label: i18n._(t`Deelnemers`),
                to: routes.authorized.participants.taalhuis.participants.overview,
            },
            detail: {
                goals: {
                    overview: {
                        label: i18n._(t`Leervragen`),
                        to: routes.authorized.participants.taalhuis.participants.detail.goals.overview,
                    },
                    detail: {
                        read: {
                            label: i18n._(t`Met computers leren werken`),
                            to: routes.authorized.participants.taalhuis.participants.detail.goals.detail.read,
                        },
                    },
                },
            },
            registrations: {
                overview: {
                    label: i18n._(t`Aanmeldingen`),
                    to: routes.authorized.participants.taalhuis.registrations.overview,
                },
            },
        },
    },
    aanbieder: {
        participants: {
            index: {
                label: i18n._(t`Deelnemers`),
                to: routes.authorized.supplier.participants.index,
            },
            detail: {
                goals: (locationState: AanbiederParticipantLocationStateProps) => ({
                    label: i18n._(t`Leervragen`),
                    to: {
                        pathname: routes.authorized.supplier.participants.detail.goals.index,
                        hash: '',
                        search: '',
                        state: locationState,
                    },
                }),
            },
        },
        management: {
            overview: {
                label: i18n._(t`Beheer`),
                to: routes.authorized.supplier.management.overview,
            },
            employees: {
                overview: {
                    label: i18n._(t`Medewerkers`),
                    to: routes.authorized.supplier.management.employees.overview,
                },
            },
        },
    },
    dev: {
        kitchensink: {
            label: 'kitchensink',
            to: routes.authorized.kitchensink,
        },
    },
}
