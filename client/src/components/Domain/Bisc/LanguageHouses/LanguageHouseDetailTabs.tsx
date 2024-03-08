import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import get from 'lodash/get'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { biscRoutes, BiscLanguageHousesDetailRouteParams } from 'routes/bisc/biscRoutes'

export enum LanguageHouseDetailTabsEnum {
    Data = 'data.index',
    Employees = 'coworkers.index',
    IntakeSettings = 'intakeSettings.index',
    Providers = 'providers.view',
}

interface Props {
    activeTabId: LanguageHouseDetailTabsEnum
}

export const LanguageHouseDetailTabs: React.FunctionComponent<Props> = props => {
    const { activeTabId } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { languageHouseId } = useParams<BiscLanguageHousesDetailRouteParams>()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    const basePath = biscRoutes(organizationName).languageHouses.detail(languageHouseId)
    const tabRoutes = Object.values(LanguageHouseDetailTabsEnum).map(value => ({
        id: value,
        pathName: get(basePath, value),
    }))

    return (
        <TabSwitch activeTabId={activeTabId} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Gegevens`)} tabid={LanguageHouseDetailTabsEnum.Data} />
            <Tab label={i18n._(t`Medewerkers`)} tabid={LanguageHouseDetailTabsEnum.Employees} />
            <Tab label={i18n._(t`Intakeformulier`)} tabid={LanguageHouseDetailTabsEnum.IntakeSettings} />
            <Tab label={i18n._(t`Aanbieders`)} tabid={LanguageHouseDetailTabsEnum.Providers} />
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
