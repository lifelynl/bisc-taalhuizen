import React from 'react'
import { routes } from 'routes/routes'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'

interface Props {
    currentTab: AanbiederParticipantsTab
    referredCount: number
}

export enum AanbiederParticipantsTab {
    active = 'active',
    completed = 'completed',
    referred = 'referred',
}

export const AanbiederParticipantsTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab, referredCount } = props

    return (
        <Row justifyContent="flex-start">
            <TabSwitch defaultActiveTabId={getRoute(currentTab)} onChange={props => history.push(props.tabid)}>
                <Tab label={i18n._(t`Actief`)} tabid={getRoute(AanbiederParticipantsTab.active)} />
                <Tab label={i18n._(t`Afgerond`)} tabid={getRoute(AanbiederParticipantsTab.completed)} />
                <Tab
                    label={i18n._(t`Verwijzingen`)}
                    indicatorCount={referredCount || undefined}
                    tabid={getRoute(AanbiederParticipantsTab.referred)}
                />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: AanbiederParticipantsTab) {
        return routes.authorized.supplier.participants[tab]
    }
}
