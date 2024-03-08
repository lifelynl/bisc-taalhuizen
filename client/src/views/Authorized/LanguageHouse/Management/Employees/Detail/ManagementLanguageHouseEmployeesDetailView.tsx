import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { LanguageHouseManagementEmployeeTabs } from 'components/Domain/LanguageHouse/Management/Tabs/LanguageHouseManagementEmployeeTabs'
import { useEmployeeQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import {
    LanguageHouseManagementCoworkerDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ManagementLanguageHouseEmployeeMenteesView } from './ManagementLanguageHouseEmployeeMenteesView'
import { ManagementLanguageHouseEmployeesDetailDataView } from './ManagementLanguageHouseEmployeesDetailDataView'
import { ManagementLanguageHouseEmployeesDetailUpdateView } from './ManagementLanguageHouseEmployeesDetailUpdateView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

export const ManagementLanguageHouseEmployeesDetailView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { languageHouseEmployeeId } = useParams<LanguageHouseManagementCoworkerDetailRouteParams>()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data, loading, error } = useEmployeeQuery({
        variables: {
            id: languageHouseEmployeeId,
        },
    })

    if (!data && loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }
    if (error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    const employeeFullName = data?.employee.person ? NameFormatters.formattedFullname(data?.employee.person) : ''

    return (
        <Column spacing={12}>
            <div>
                <Headline
                    title={employeeFullName}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.languageHouse(organizationSlug).management.overview,
                                breadcrumbItems.languageHouse(organizationSlug).management.employees,
                            ]}
                        />
                    }
                />
                <LanguageHouseManagementEmployeeTabs />
            </div>
            <Switch>
                <Route
                    path={languageHouseRoutes().management.coworkers.detail().data.index}
                    exact={true}
                    component={ManagementLanguageHouseEmployeesDetailDataView}
                />
                <Route
                    path={languageHouseRoutes().management.coworkers.detail().data.update}
                    exact={true}
                    component={ManagementLanguageHouseEmployeesDetailUpdateView}
                />
                <Route
                    path={languageHouseRoutes().management.coworkers.detail().mentees}
                    exact={true}
                    component={ManagementLanguageHouseEmployeeMenteesView}
                />
                <Redirect
                    path={languageHouseRoutes().management.coworkers.detail().index}
                    to={languageHouseRoutes(sessionContext.organizationSlug).management.coworkers.detail().data.index}
                />
            </Switch>
        </Column>
    )
}
