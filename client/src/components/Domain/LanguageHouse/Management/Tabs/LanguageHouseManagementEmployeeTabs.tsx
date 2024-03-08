import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch, { handleTabSwitch } from 'components/Core/TabSwitch/TabSwitch'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import get from 'lodash/get'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseManagementCoworkerDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'

enum LanguageHouseManagementEmployeeTabsEnum {
    view = 'data.index',
    update = 'data.update',
    mentees = 'mentees',
}

export const LanguageHouseManagementEmployeeTabs = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { languageHouseEmployeeId } = useParams<LanguageHouseManagementCoworkerDetailRouteParams>()
    const enumValues = Object.values(LanguageHouseManagementEmployeeTabsEnum)
    const basePath = languageHouseRoutes(organizationSlug).management.coworkers.detail(languageHouseEmployeeId)
    const tabRoutes = enumValues.map(value => ({
        id: value,
        pathName: get(basePath, value),
    }))

    return (
        <TabSwitch activeTabId={getActiveTabId()} onChange={tab => handleTabSwitch(tab, history, tabRoutes)}>
            <Tab label={i18n._('Gegevens')} tabid={LanguageHouseManagementEmployeeTabsEnum.view} />
            <Tab label={i18n._('Deelnemers in begeleiding')} tabid={LanguageHouseManagementEmployeeTabsEnum.mentees} />
        </TabSwitch>
    )

    function getActiveTabId() {
        const currentTabValue = enumValues.find(val => history.location.pathname === get(basePath, val))
        if (!currentTabValue) {
            return ''
        }

        // because there is no dedicated update tab, return view as active
        if (currentTabValue === LanguageHouseManagementEmployeeTabsEnum.update) {
            return LanguageHouseManagementEmployeeTabsEnum.view
        }

        return currentTabValue
    }
}
