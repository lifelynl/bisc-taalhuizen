import React from 'react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import {
    AanbiederParticipantTab,
    AanbiederParticipantTabs,
} from 'components/Domain/Aanbieder/AanbiederParticipants/AanbiederParticipantTabs'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { AanbiederParticipantDetail, aanbiederParticipantDetail } from '../../mocks'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { AanbiederParticipantRegistrationFields } from 'components/Domain/Aanbieder/AanbiederParticipants/AanbiederParticipantRegistrationFields'

interface Props {
    participantId: number
}

export const AanbiederParticipantRegistrationView: React.FunctionComponent<Props> = ({ participantId }) => {
    const { i18n } = useLingui()

    // TODO: replace with the api call/query (using participantId prop)
    const { data, loading, error } = useMockQuery<AanbiederParticipantDetail>(aanbiederParticipantDetail)

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            {/* TODO: add breadcrumb */}
            <Headline spacingType={SpacingType.small} title={data?.fullName || ''} />
            <Column spacing={10}>
                <AanbiederParticipantTabs currentTab={AanbiederParticipantTab.registration} />
                {renderList()}
            </Column>
        </>
    )

    // TODO
    function renderList() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <AanbiederParticipantRegistrationFields participant={data} />
    }
}
