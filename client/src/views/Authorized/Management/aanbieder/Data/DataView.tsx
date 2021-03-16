import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { TabPaths, Tabs } from '../constants'

interface Props {}

export const DataView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    return (
        <>
            <Headline title={i18n._(t`Beheer`)} spacingType={SpacingType.small} />

            <TabSwitch defaultActiveTabId={Tabs.data} onChange={props => history.push(TabPaths[props.tabid as Tabs])}>
                <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.coworkers} />
            </TabSwitch>
        </>
    )
}
