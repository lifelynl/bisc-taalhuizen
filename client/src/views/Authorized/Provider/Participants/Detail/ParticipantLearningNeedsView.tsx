import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import {
    ProviderParticipantDetailHeader,
    ProviderParticipantDetailTabsEnum,
} from 'components/Domain/Provider/ProviderParticipants/ProviderParticipantHeader'
import { ParticipantLearningNeedsList } from 'components/Domain/LearningNeeds/LearningNeedParticipationList/ParticipantsLearningNeedsList'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { LearningNeedType, useLearningNeedsQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom'
import { ProviderParticipantDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'

interface Props extends RouteComponentProps<ProviderParticipantDetailRouteParams> {}

export const ParticipantLearningNeedsView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { providerParticipantId: studentId } = useParams<ProviderParticipantDetailRouteParams>()
    const { data, loading, error, fetchMore } = useLearningNeedsQuery({
        variables: { studentId, paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE } },
        fetchPolicy: 'network-only',
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug, user } = sessionContext
    const hasLimitedEditRights = user?.currentEmployee?.organization.hasLimitedEditRights

    return (
        <Column spacing={6}>
            <ProviderParticipantDetailHeader activeTabId={ProviderParticipantDetailTabsEnum.learningNeeds} />
            <Row justifyContent="flex-end">
                {!hasLimitedEditRights && (
                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push(
                                providerRoutes(organizationSlug).participants.detail(studentId).data.learningNeeds
                                    .create
                            )
                        }
                    >
                        {i18n._(t`Voeg leervraag toe`)}
                    </Button>
                )}
            </Row>
            {renderPage()}
        </Column>
    )

    function renderPage() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={SpinnerAnimation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data?.learningNeeds || !data?.learningNeeds.nodes) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <InfiniteScroll
                hasMore={data?.learningNeeds?.hasMore ?? false}
                loadMore={paginationArgs => fetchMore({ variables: { paginationArgs } })}
            >
                <ParticipantLearningNeedsList
                    learningNeeds={data.learningNeeds.nodes as LearningNeedType[]}
                    onItemClick={l => onLearningNeedClick(l.id)}
                />
            </InfiniteScroll>
        )
    }

    function onLearningNeedClick(learningNeedId: string) {
        history.push(
            providerRoutes(organizationSlug).participants.detail(studentId).data.learningNeeds.detail(learningNeedId)
                .index
        )
    }
}
