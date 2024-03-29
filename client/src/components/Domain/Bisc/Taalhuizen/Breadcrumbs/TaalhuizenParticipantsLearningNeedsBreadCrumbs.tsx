import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import React from 'react'
import { routes } from 'routes/routes'
import { ParticipantDetailLocationStateProps } from 'views/Authorized/Participants/taalhuis/Participants/Detail/ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const TaalhuizenParticipantsLearningNeedsBreadCrumbs: React.FC<Props> = ({ routeState }) => {
    const { i18n } = useLingui()

    return (
        <Breadcrumbs
            breadcrumbItems={[
                {
                    label: i18n._(t`Deelnemers`),
                    to: {
                        pathname: routes.authorized.participants.taalhuis.participants.overview,
                        hash: '',
                        search: '',
                        state: routeState,
                    },
                },
                {
                    label: i18n._(t`Leervragen`),
                    to: {
                        pathname: routes.authorized.participants.taalhuis.participants.detail.goals.overview,
                        hash: '',
                        search: '',
                        state: routeState,
                    },
                },
                {
                    label: i18n._(t`Met computers leren werken`),
                    to: {
                        pathname: routes.authorized.participants.taalhuis.participants.detail.goals.detail.read,
                        hash: '',
                        search: '',
                        state: routeState,
                    },
                },
            ]}
        />
    )
}
