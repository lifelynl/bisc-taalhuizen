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
    currentTab: BiscProviderTab
    providerId: string
}

export enum BiscProviderTab {
    data = 'data',
    employees = 'employees',
}

export const BiscProviderTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab, providerId } = props

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <Row justifyContent="flex-start">
            <TabSwitch activeTabId={getRoute(currentTab)} onChange={props => history.push(props.tabid as string)}>
                <Tab label={i18n._(t`Gegevens`)} tabid={getRoute(BiscProviderTab.data)} />
                <Tab label={i18n._(t`Medewerkers`)} tabid={getRoute(BiscProviderTab.employees)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: BiscProviderTab) {
        if (tab === BiscProviderTab.data) {
            return routes.authorized.bisc(organizationName).providers.detail(providerId).data.index
        }

        return routes.authorized.bisc(organizationName).providers.detail(providerId).coworkers.index
    }
}
