import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useLearningNeedsQuery } from 'graphql/v2/generated/graphql'
import get from 'lodash/get'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'

export enum LanguageHouseParticipantDetailTabsEnum {
    Intake = 'index',
    Registration = 'registration',
    ContactMoments = 'dossier',
    LearningNeeds = 'learningNeeds.index',
    Documents = 'documents',
    Mentor = 'mentor.index',
    DownloadDetails = 'downloadDetails',
}

interface Props {
    activeTabId: LanguageHouseParticipantDetailTabsEnum
}

export const LanguageHouseParticipantDetailTabs: React.FunctionComponent<Props> = props => {
    const { activeTabId } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const basePath = languageHouseRoutes(organizationSlug).participants.detail(languageHouseParticipantId).data
    const tabRoutes = Object.values(LanguageHouseParticipantDetailTabsEnum).map(value => ({
        id: value,
        pathName: get(basePath, value),
    }))

    const { data: countData } = useLearningNeedsQuery({
        variables: { studentId: languageHouseParticipantId, paginationArgs: { take: 1 } },
    })

    return (
        <TabSwitch activeTabId={activeTabId} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Intake`)} tabid={LanguageHouseParticipantDetailTabsEnum.Intake} />
            <Tab label={i18n._(t`Aanmelding`)} tabid={LanguageHouseParticipantDetailTabsEnum.Registration} />
            <Tab label={i18n._(t`Dossier`)} tabid={LanguageHouseParticipantDetailTabsEnum.ContactMoments} />
            <Tab
                label={i18n._(t`Verwijzingen`)}
                tabid={LanguageHouseParticipantDetailTabsEnum.LearningNeeds}
                indicatorCount={countData?.learningNeeds.totalCount}
                subtleIndicator={true}
            />
            <Tab label={i18n._(t`Documenten`)} tabid={LanguageHouseParticipantDetailTabsEnum.Documents} />
            <Tab label={i18n._(t`Begeleider`)} tabid={LanguageHouseParticipantDetailTabsEnum.Mentor} />
            {/* <Tab label={i18n._(t`Gegevens delen`)} tabid={TaalhuisParticipantDetailTabsEnum.DownloadDetails} /> */}
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
