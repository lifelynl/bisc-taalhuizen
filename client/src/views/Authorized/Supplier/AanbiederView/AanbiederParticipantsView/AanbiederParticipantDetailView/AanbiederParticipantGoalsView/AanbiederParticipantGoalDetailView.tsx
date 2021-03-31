import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { AanbiederParticipantGoalDetailFields } from 'components/Domain/Aanbieder/AanbiederParticipants/AanbiederParticipantGoalDetailFields'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { aanbiederParticipantDetail, AanbiederParticipantGoal } from '../../../mocks'

interface Props {
    participantId: number
    participantGoalId: number
}

export const AanbiederParticipantGoalDetailView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    // TODO: replace with actual query
    const { data, loading, error } = useMockQuery<AanbiederParticipantGoal>(aanbiederParticipantDetail.goals[0])

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
            <Paragraph bold={true}>{data?.participant.fullName || ''}</Paragraph>
            <Headline spacingType={SpacingType.small} title={data?.name || ''} />
            <Column spacing={10}>{renderList()}</Column>
        </>
    )

    function renderList() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <AanbiederParticipantGoalDetailFields participantGoal={data} />
    }
}
