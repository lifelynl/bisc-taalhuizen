import React from 'react'
import { t } from '@lingui/macro'

import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { useLingui } from '@lingui/react'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { aanbiederEmployeeProfile, AanbiederEmployeeProfile } from '../../mocks'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import {
    AanbiederManagementEmployeeTab,
    AanbiederManagementEmployeeTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementEmployeeTabs'

interface Props {
    employeeId: number
}

export const AanbiederManagementEmployeeDetailOverviewView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { employeeId } = props

    // TODO: replace with the api call/query (using participantId prop)
    const { data, loading, error } = useMockQuery<AanbiederEmployeeProfile>(aanbiederEmployeeProfile)

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            {/* TODO: add breadcrumbs */}
            <Headline spacingType={SpacingType.small} title={i18n._(t`Beheer`)} />
            <Column spacing={10}>
                <AanbiederManagementEmployeeTabs currentTab={AanbiederManagementEmployeeTab.overview} />
                {renderData()}
            </Column>
        </>
    )

    // TODO
    function renderData() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        // TODO
        return <div>{employeeId}</div>
    }
}
