import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Row from 'components/Core/Layout/Row/Row'
import { EmployeeRole, useEmployeeQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { routes } from 'routes/routes'

import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { ProviderEmployeeFieldset } from 'components/Domain/Shared/Fieldsets/ProviderEmployeeFieldset'
import { NameFormatters } from 'utils/formatters/name/Name'
import {
    ProviderManagementCoworkerTabs,
    ProviderManagementCoworkerTabsValues,
} from 'components/Domain/Provider/ProviderManagement/Tabs/ProviderManagementCoworkerTabs'
import Column from 'components/Core/Layout/Column/Column'
import { ProviderManagementCoworkerDetailRouteParams } from 'routes/provider/providerRoutes'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ProviderManagementCoworkerDetailView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<ProviderManagementCoworkerDetailRouteParams>()
    const providerEmployeeId = params.providerEmployeeId
    const { data, loading, error } = useEmployeeQuery({
        variables: {
            id: providerEmployeeId,
            withEducations: true,
        },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    return (
        <>
            <Headline
                title={(data?.employee.person && NameFormatters.formattedFullname(data?.employee.person)) || ''}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.provider(organizationSlug).management.overview,
                            breadcrumbItems.provider(organizationSlug).management.coworkers,
                        ]}
                    />
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <ProviderManagementCoworkerTabs currentTab={ProviderManagementCoworkerTabsValues.CoworkerDetails} />
                </Row>

                <PageQuery data={data} loading={loading} error={error}>
                    {data => <ProviderEmployeeFieldset readOnly={true} prefillData={data.employee} />}
                </PageQuery>
            </Column>

            <Actionbar
                hide={sessionContext.user?.currentEmployee?.role === EmployeeRole.Mentor}
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.primary}
                            submit={true}
                            loading={loading}
                            onClick={() =>
                                history.push(
                                    routes.authorized
                                        .provider(organizationSlug)
                                        .management.coworkers.detail(providerEmployeeId).data.update
                                )
                            }
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </>
    )
}
