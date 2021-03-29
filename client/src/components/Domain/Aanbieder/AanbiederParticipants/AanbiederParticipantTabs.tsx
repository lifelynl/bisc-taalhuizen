import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Row from 'components/Core/Layout/Row/Row'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import React from 'react'
import { useHistory } from 'react-router'
import { routes } from 'routes/routes'

interface Props {
    currentTab: AanbiederParticipantTab
}

export enum AanbiederParticipantTab {
    overview = 'overview',
    registration = 'registration',
    folder = 'folder',
    goals = 'goals',
    documents = 'documents',
}

export const AanbiederParticipantTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()

    const { currentTab } = props

    return (
        <Row justifyContent="flex-start">
            <TabSwitch defaultActiveTabId={getRoute(currentTab)} onChange={props => history.push(props.tabid)}>
                <Tab label={i18n._(t`Intake`)} tabid={getRoute(AanbiederParticipantTab.overview)} />
                <Tab label={i18n._(t`Aanmelding`)} tabid={getRoute(AanbiederParticipantTab.registration)} />
                <Tab label={i18n._(t`Dossier`)} tabid={getRoute(AanbiederParticipantTab.folder)} />
                <Tab label={i18n._(t`Leervragen`)} tabid={getRoute(AanbiederParticipantTab.goals)} />
                <Tab label={i18n._(t`Documenten`)} tabid={getRoute(AanbiederParticipantTab.documents)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: AanbiederParticipantTab) {
        if (tab === AanbiederParticipantTab.goals) {
            return routes.authorized.supplier.participants.detail.goals.overview
        }

        return routes.authorized.supplier.participants.detail[tab]
    }
}
