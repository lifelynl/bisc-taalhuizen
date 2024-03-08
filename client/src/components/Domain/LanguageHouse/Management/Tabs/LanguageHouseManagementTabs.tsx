import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'

export enum LanguageHouseManagementTab {
    LanguageHouseEmployees,
    LanguageHouseDetails,
}

interface Props {
    activeTabId: LanguageHouseManagementTab
}

export const LanguageHouseManagementTabs: React.FunctionComponent<Props> = props => {
    const { activeTabId } = props
    const { i18n } = useLingui()
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const tabRoutes = [
        {
            id: LanguageHouseManagementTab.LanguageHouseDetails,
            pathName: languageHouseRoutes(organizationSlug).management.languageHouseDetails.index,
        },
        {
            id: LanguageHouseManagementTab.LanguageHouseEmployees,
            pathName: languageHouseRoutes(organizationSlug).management.coworkers.index,
        },
    ]

    return (
        <TabSwitch activeTabId={activeTabId} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Beheer`)} tabid={LanguageHouseManagementTab.LanguageHouseDetails} />
            <Tab label={i18n._(t`Medewerkers`)} tabid={LanguageHouseManagementTab.LanguageHouseEmployees} />
        </TabSwitch>
    )

    function handleTabSwitch(tab: TabProps) {
        const tabRoute = tabRoutes.find(tabRoute => tabRoute.id === tab.tabid)
        if (!tabRoute) {
            return
        }

        history.push(tabRoute.pathName)
    }
}
