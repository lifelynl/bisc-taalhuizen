import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
// import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
// import Tab from 'components/Core/TabSwitch/Tab'
// import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
// import { TabProps } from 'components/Core/TabSwitch/types'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { BiscProvidersDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { EmployeeQuery, useEmployeeQuery } from 'graphql/v2/generated/graphql'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ProviderEmployeeFieldset } from 'components/Domain/Shared/Fieldsets/ProviderEmployeeFieldset'
import { SessionContext } from 'components/Providers/SessionProvider/context'

// enum Tabs {
//     data = 'data',
//     documenten = 'documenten',
// }

interface Props extends RouteComponentProps<BiscProvidersDetailCoworkersDetailRouteParams> {}

const CoworkerDetailDataView: React.FunctionComponent<Props> = props => {
    const { providerId, providerEmployeeId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useEmployeeQuery({ variables: { id: providerEmployeeId, withEducations: true } })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    // const handleTabSwitch = (tab: TabProps) => {
    //     if (tab.tabid === Tabs.documenten) {
    //         history.push(
    //             routes.authorized.bisc(organizationName).providers.detail(providerId).coworkers.detail(providerEmployeeId).data.documents
    //         )
    //     }
    // }

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPage}
        </PageQuery>
    )

    function renderPage({ employee }: EmployeeQuery) {
        return (
            <>
                <Headline
                    title={`${NameFormatters.formattedFullname(employee.person)}`}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.bisc(organizationName).providers.overview,
                                breadcrumbItems
                                    .bisc(organizationName)
                                    .providers.detail.index(`${data?.employee.organization.name}`, providerId),
                                breadcrumbItems.bisc(organizationName).providers.detail.coworkers.overview(providerId),
                            ]}
                        />
                    }
                    spacingType={SpacingType.small}
                />
                {/*
                <Column spacing={10}>
                    <Row justifyContent="space-between">
                        <TabSwitch activeTabId={Tabs.data} onChange={handleTabSwitch}>
                            <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                            <Tab label={i18n._(t`Documenten`)} tabid={Tabs.documenten} />
                        </TabSwitch>
                    </Row>
                </Column> */}
                <ProviderEmployeeFieldset readOnly={true} prefillData={employee} />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() => {
                                    history.push(
                                        routes.authorized
                                            .bisc(organizationName)
                                            .providers.detail(providerId)
                                            .coworkers.detail(providerEmployeeId).data.update
                                    )
                                }}
                            >
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}

export default CoworkerDetailDataView
