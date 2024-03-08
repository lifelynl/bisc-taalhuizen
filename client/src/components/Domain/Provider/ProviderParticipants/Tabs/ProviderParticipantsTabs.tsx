import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { providerRoutes } from 'routes/provider/providerRoutes'

interface Props {
    currentTab: ProviderParticipantsTabsEnum
    referredOrNewCount?: number | null
}

export enum ProviderParticipantsTabsEnum {
    Finished = 'finished',
    Ongoing = 'ongoing',
    ReferredOrNew = 'referredOrNew',
}

export const ProviderParticipantsTabs: React.FunctionComponent<Props> = props => {
    const { permissions, organizationSlug } = useContext(SessionContext)
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab, referredOrNewCount } = props
    const canAccessReferredParticipants = permissions?.canAccessReferredParticipants()

    const overviewPath = providerRoutes(organizationSlug).participants.overviews

    return (
        <Row justifyContent="flex-start">
            <TabSwitch activeTabId={overviewPath[currentTab]} onChange={props => history.push(props.tabid as string)}>
                <Tab label={i18n._(t`Actief`)} tabid={overviewPath.ongoing} />
                <Tab label={i18n._(t`Afgerond`)} tabid={overviewPath.finished} />
                {canAccessReferredParticipants && (
                    <Tab
                        label={i18n._(t`Nieuw`)}
                        indicatorCount={referredOrNewCount}
                        tabid={overviewPath.referredOrNew}
                    />
                )}
            </TabSwitch>
        </Row>
    )
}
