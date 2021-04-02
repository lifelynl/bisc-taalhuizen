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
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

interface Props {
    employeeId: string
}

export const AanbiederManagementEmployeeParticipantsView: React.FunctionComponent<Props> = props => {
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
            <Headline
                spacingType={SpacingType.small}
                title={data?.fullName || ''}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.aanbieder.management.overview,
                            breadcrumbItems.aanbieder.management.employees.overview,
                        ]}
                    />
                }
            />
            <Column spacing={10}>
                <AanbiederManagementEmployeeTabs
                    currentTab={AanbiederManagementEmployeeTab.participants}
                    employeeId={employeeId}
                />
                {renderList()}
            </Column>
        </>
    )

    function renderList() {
        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        const headers = [i18n._(t`ACHTERNAAM`), i18n._(t`ROEPNAAM`)]

        return <Table flex={0.25} headers={headers} rows={getRows()} />
    }

    function getRows() {
        if (!data) {
            return []
        }

        return data.participants.map(({ id, lastName, firstName }) => [
            <TableLink
                to={{
                    pathname: supplierRoutes.participants.detail.overview,
                    search: '',
                    hash: '',
                    state: { participantId: id },
                }}
                text={lastName}
            />,
            <Paragraph>{firstName}</Paragraph>,
        ])
    }
}
