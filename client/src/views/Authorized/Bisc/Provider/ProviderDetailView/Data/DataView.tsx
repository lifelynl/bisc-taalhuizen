import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { BiscProviderFieldset } from 'components/Domain/Bisc/Provider/BiscProviderFieldset'
import { BiscProviderTab, BiscProviderTabs } from 'components/Domain/Bisc/Provider/BiscProviderTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { OrganizationQuery, useOrganizationQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscProvidersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'

interface Props extends RouteComponentProps<BiscProvidersDetailRouteParams> {}

const DataView: React.FunctionComponent<Props> = props => {
    const { providerId } = props.match.params
    const history = useHistory()
    const { i18n } = useLingui()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    if (!providerId) {
        return null
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useOrganizationQuery({
        variables: {
            input: providerId,
        },
    })

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPage}
        </PageQuery>
    )

    function renderPage(provider: OrganizationQuery) {
        return (
            <>
                <Headline
                    title={provider.organization.name}
                    TopComponent={
                        <Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc(organizationName).providers.overview]} />
                    }
                    spacingType={SpacingType.small}
                />
                <Column spacing={10}>
                    <BiscProviderTabs currentTab={BiscProviderTab.data} providerId={providerId} />
                    {renderViews(provider.organization)}
                </Column>
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() =>
                                    history.push(
                                        routes.authorized.bisc(organizationName).providers.detail(providerId).data
                                            .update
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

    function renderViews(provider: OrganizationQuery['organization']) {
        return <BiscProviderFieldset readOnly={true} prefillData={provider} />
    }
}

export default DataView
