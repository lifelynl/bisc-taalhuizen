import { useLingui } from '@lingui/react'

import Row from 'components/Core/Layout/Row/Row'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'

interface Props {
    currentTab: TeamsOverviewTabsEnum
}

export enum TeamsOverviewTabsEnum {
    teams = 'overview',
    visibility = 'visibility',
}

export const TeamsOverviewTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { organizationSlug } = useContext(SessionContext)
    const { i18n } = useLingui()
    const { currentTab } = props

    return (
        <Row justifyContent="flex-start">
            <TabSwitch activeTabId={getRoute(currentTab)} onChange={p => history.push(p.tabid as string)}>
                <Tab label={i18n._(`Teams`)} tabid={getRoute(TeamsOverviewTabsEnum.teams)} />
                <Tab label={i18n._(`Zichtbaarheid`)} tabid={getRoute(TeamsOverviewTabsEnum.visibility)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: TeamsOverviewTabsEnum) {
        return languageHouseRoutes(organizationSlug).teams[tab]
    }
}
