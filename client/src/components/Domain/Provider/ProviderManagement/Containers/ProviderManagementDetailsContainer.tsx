import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { EmployeeRole, useOrganizationQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { ProviderManagementDetailFieldset } from '../ProviderManagementDetailFieldset'
import { ProviderManagementTabs, ProviderManagementTabsValues } from '../Tabs/ProviderManagementTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    organizationId: string
}

export const ProviderManagementDetailsContainer: React.FunctionComponent<Props> = ({ organizationId }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useOrganizationQuery({ variables: { input: organizationId } })
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(`Beheer`)} />
            <Column spacing={10}>
                <ProviderManagementTabs currentTab={ProviderManagementTabsValues.ProviderDetails} />
                <PageQuery data={data} loading={loading} error={error}>
                    {data => <ProviderManagementDetailFieldset prefillData={data.organization} readOnly={true} />}
                </PageQuery>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                hide={sessionContext.user?.currentEmployee?.role === EmployeeRole.Mentor}
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        onClick={() => history.push(providerRoutes(organizationSlug).management.providerDetails.update)}
                    >
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )
}
