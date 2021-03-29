import React from 'react'
import { routes } from 'routes/routes'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'

interface Props {
    currentTab: AanbiederManagementTab
}

export enum AanbiederManagementTab {
    overview = 'overview',
    employees = 'employees',
}

export const AanbiederManagementTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab } = props

    return (
        <Row justifyContent="flex-start">
            <TabSwitch defaultActiveTabId={getRoute(currentTab)} onChange={props => history.push(props.tabid)}>
                <Tab label={i18n._(t`Gegevens`)} tabid={getRoute(AanbiederManagementTab.overview)} />
                <Tab label={i18n._(t`Medewerkers`)} tabid={getRoute(AanbiederManagementTab.employees)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: AanbiederManagementTab) {
        if (tab === AanbiederManagementTab.employees) {
            return routes.authorized.supplier.management.employees.index
        }

        return routes.authorized.supplier.management[tab]
    }
}
