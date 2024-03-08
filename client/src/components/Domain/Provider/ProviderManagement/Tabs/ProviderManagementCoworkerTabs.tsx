import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'
import { ProviderManagementCoworkerDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    currentTab: ProviderManagementCoworkerTabsValues
}

export enum ProviderManagementCoworkerTabsValues {
    Participants = 'participants',
    CoworkerDetails = 'coworkerDetails',
    // Documenten = 'documenten',
}

export const ProviderManagementCoworkerTabs: React.FunctionComponent<Props> = ({ currentTab }) => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { providerEmployeeId } = useParams<ProviderManagementCoworkerDetailRouteParams>()
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const detailPath = providerRoutes(organizationSlug).management.coworkers.detail(providerEmployeeId)
    const config = {
        [ProviderManagementCoworkerTabsValues.Participants]: detailPath.data.participants,
        [ProviderManagementCoworkerTabsValues.CoworkerDetails]: detailPath.data.index,
        // [ProviderManagementCoworkerTabsValues.Documenten]: detailPath.data.documents,
    }

    return (
        <Row justifyContent="flex-start">
            <TabSwitch activeTabId={config[currentTab]} onChange={props => history.push(props.tabid as string)}>
                <Tab label={i18n._(t`Gegevens`)} tabid={config[ProviderManagementCoworkerTabsValues.CoworkerDetails]} />
                <Tab label={i18n._(t`Deelnemers`)} tabid={config[ProviderManagementCoworkerTabsValues.Participants]} />
                {/* <Tab label={i18n._(t`Documenten`)} tabid={config[ProviderManagementCoworkerTabsValues.Documenten]} /> */}
            </TabSwitch>
        </Row>
    )
}
