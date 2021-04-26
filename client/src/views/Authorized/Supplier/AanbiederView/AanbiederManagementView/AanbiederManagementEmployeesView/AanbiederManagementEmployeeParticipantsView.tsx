import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    AanbiederManagementEmployeeTab,
    AanbiederManagementEmployeeTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementEmployeeTabs'
import { useProviderEmployeeMenteesQuery, useProviderEmployeeQuery } from 'generated/graphql'
import React from 'react'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { AanbiederManagementEmployeesLocationStateProps } from './AanbiederManagementEmployeesView'

interface Props {
    routeState: AanbiederManagementEmployeesLocationStateProps
}

export const AanbiederManagementEmployeeParticipantsView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { routeState } = props
    const { data: employeeData, loading: employeeLoading, error: employeeError } = useProviderEmployeeQuery({
        variables: { userId: routeState.employeeId },
    })
    const { data, loading, error } = useProviderEmployeeMenteesQuery({
        variables: { providerEmployeeId: routeState.employeeId },
    })

    if (loading || employeeLoading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            {/* TODO: add breadcrumbs */}
            <Headline
                spacingType={SpacingType.small}
                title={NameFormatters.formattedFullname(employeeData?.providerEmployee)}
            />
            <Column spacing={10}>
                <AanbiederManagementEmployeeTabs
                    routeState={routeState}
                    currentTab={AanbiederManagementEmployeeTab.participants}
                />
                {renderList()}
            </Column>
        </>
    )

    function renderList() {
        if (error || employeeError) {
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

        return data.providerEmployeeMentees.map(mentee => [
            <TableLink
                to={{
                    pathname: supplierRoutes.participants.detail.index,
                    search: '',
                    hash: '',
                    state: { participantId: mentee.id },
                }}
                text={NameFormatters.formattedLastName(mentee.personDetails)}
            />,
            <Paragraph>{mentee.personDetails.givenName}</Paragraph>,
        ])
    }
}
