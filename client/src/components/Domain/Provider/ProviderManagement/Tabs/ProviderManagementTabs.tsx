import React, { useContext } from 'react'
import { routes } from 'routes/routes'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    currentTab: ProviderManagementTabsValues
}

export enum ProviderManagementTabsValues {
    Coworkers = 'coworkers',
    ProviderDetails = 'providerDetails',
}

export const ProviderManagementTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab } = props

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    return (
        <Row justifyContent="flex-start">
            <TabSwitch activeTabId={getRoute(currentTab)} onChange={props => history.push(props.tabid as string)}>
                <Tab label={i18n._(t`Gegevens`)} tabid={getRoute(ProviderManagementTabsValues.ProviderDetails)} />
                <Tab label={i18n._(t`Medewerkers`)} tabid={getRoute(ProviderManagementTabsValues.Coworkers)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: ProviderManagementTabsValues) {
        const config = {
            [ProviderManagementTabsValues.Coworkers]:
                routes.authorized.provider(organizationSlug).management.coworkers.index,
            [ProviderManagementTabsValues.ProviderDetails]:
                routes.authorized.provider(organizationSlug).management.providerDetails.index,
        }

        return config[tab]
    }
}
