import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useLearningNeedsQuery, useStudentForDetailHeaderQuery } from 'graphql/v2/generated/graphql'
import get from 'lodash/get'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ProviderParticipantDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    activeTabId: ProviderParticipantDetailTabsEnum
    organisation?: string
}

export enum ProviderParticipantDetailTabsEnum {
    intake = 'index',
    registration = 'registration',
    events = 'dossier.index',
    learningNeeds = 'learningNeeds.index',
    documents = 'documents',
}

export const ProviderParticipantDetailHeader: React.FunctionComponent<Props> = ({ activeTabId, organisation }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { providerParticipantId: studentId } = useParams<ProviderParticipantDetailRouteParams>()
    const { data, loading, error } = useStudentForDetailHeaderQuery({ variables: { studentId } })

    const { data: countData } = useLearningNeedsQuery({
        variables: { studentId, paginationArgs: { take: 1 } },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (error || !data?.student) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    const basePath = providerRoutes(organizationSlug).participants.detail(studentId).data
    const tabRoutes = Object.values(ProviderParticipantDetailTabsEnum).map(id => ({
        id,
        pathName: get(basePath, id),
    }))

    return (
        <div>
            <Headline
                title={NameFormatters.formattedFullname(data?.student.person)}
                spacingType={SpacingType.small}
                subtitle={organisation}
                TopComponent={
                    <Breadcrumbs breadcrumbItems={[breadcrumbItems.provider(organizationSlug).participants.overview]} />
                }
            />
            <TabSwitch activeTabId={activeTabId} onChange={handleTabSwitch}>
                <Tab label={i18n._(t`Intake`)} tabid={ProviderParticipantDetailTabsEnum.intake} />
                <Tab label={i18n._(t`Aanmelding`)} tabid={ProviderParticipantDetailTabsEnum.registration} />
                <Tab label={i18n._(t`Dossier`)} tabid={ProviderParticipantDetailTabsEnum.events} />
                <Tab
                    label={i18n._(t`Verwijzingen`)}
                    tabid={ProviderParticipantDetailTabsEnum.learningNeeds}
                    indicatorCount={countData?.learningNeeds.totalCount}
                    subtleIndicator={true}
                />
                <Tab label={i18n._(t`Documenten`)} tabid={ProviderParticipantDetailTabsEnum.documents} />
            </TabSwitch>
        </div>
    )

    function handleTabSwitch(tab: TabProps) {
        const tabRoute = tabRoutes.find(tabRoute => tabRoute.id === tab.tabid)
        if (!tabRoute) {
            return
        }

        history.push(tabRoute.pathName)
    }
}
