import React, { useContext } from 'react'
import { routes } from 'routes/routes'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'
import { EducationGroupStatus } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    currentTab: EducationGroupStatus
}

export const ProviderGroupsTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab } = props

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    return (
        <Row justifyContent="flex-start">
            <TabSwitch activeTabId={getRoute(currentTab)} onChange={props => history.push(props.tabid as string)}>
                <Tab label={i18n._(t`Lopend`)} tabid={getRoute(EducationGroupStatus.Active)} />
                <Tab label={i18n._(t`Toekomstig`)} tabid={getRoute(EducationGroupStatus.Future)} />
                <Tab label={i18n._(t`Afgerond`)} tabid={getRoute(EducationGroupStatus.Past)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: EducationGroupStatus) {
        return routes.authorized.provider(organizationSlug).groups.overviews[tab]
    }
}
