import React from 'react'
import { t } from '@lingui/macro'

import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { useLingui } from '@lingui/react'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { aanbiederManagementProfile, AanbiederManagementProfile } from '../mocks'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import {
    AanbiederManagementTab,
    AanbiederManagementTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementTabs'

export const AanbiederManagementOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()

    // TODO: replace with the api call/query (using participantId prop)
    const { data, loading, error } = useMockQuery<AanbiederManagementProfile>(aanbiederManagementProfile)

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Beheer`)} />
            <Column spacing={10}>
                <AanbiederManagementTabs currentTab={AanbiederManagementTab.overview} />
                {renderList()}
            </Column>
        </>
    )

    // TODO
    function renderList() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        // TODO
        return null
    }
}
