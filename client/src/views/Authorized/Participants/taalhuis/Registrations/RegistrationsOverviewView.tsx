import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { tabPaths, Tabs, tabTranslations } from '../constants'

interface Props {}

export const RegistrationsOverviewView: React.FunctionComponent<Props> = () => {
    const history = useHistory()

    return (
        <>
            <Headline title={'Aanmeldingen'} spacingType={SpacingType.small} />

            <TabSwitch
                defaultActiveTabId={Tabs.registrations}
                onChange={props => history.push(tabPaths[props.tabid as Tabs])}
            >
                <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.participants} />
                <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.registrations} />
            </TabSwitch>
        </>
    )
}
