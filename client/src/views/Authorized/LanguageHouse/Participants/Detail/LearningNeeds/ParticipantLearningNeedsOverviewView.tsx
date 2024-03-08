import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { LanguageHouseParticipantDetailTabsEnum } from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantDetailTabs'
import { ParticipantLearningNeedsList } from 'components/Domain/LearningNeeds/LearningNeedParticipationList/ParticipantsLearningNeedsList'
import { LearningNeedType, useLearningNeedsQuery } from 'graphql/v2/generated/graphql'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantDetailHeader } from '../ParticipantDetailHeader'
import { useContext } from 'react'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ParticipantsLearningNeedsOverviewView: React.FC = () => {
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const history = useHistory()
    const { i18n } = useLingui()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data, loading, error, fetchMore } = useLearningNeedsQuery({
        variables: {
            studentId: languageHouseParticipantId,
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
        },
        fetchPolicy: 'network-only',
    })

    return (
        <Column spacing={12}>
            <ParticipantDetailHeader activeTabId={LanguageHouseParticipantDetailTabsEnum.LearningNeeds} />
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
            <>
                <Column spacing={4}>
                    <Row justifyContent="flex-end">
                        <Button
                            type={ButtonType.secondary}
                            icon={IconType.add}
                            onClick={() =>
                                history.push(
                                    languageHouseRoutes(organizationSlug).participants.detail(
                                        languageHouseParticipantId
                                    ).data.learningNeeds.create
                                )
                            }
                        >
                            {i18n._(t`Voeg leervraag toe`)}
                        </Button>
                        <Button
                            icon={IconType.add}
                            onClick={() =>
                                history.push(
                                    languageHouseRoutes(organizationSlug).participants.detail(
                                        languageHouseParticipantId
                                    ).data.learningNeeds.createReferral
                                )
                            }
                        >
                            {i18n._(t`Voeg verwijzing toe`)}
                        </Button>
                    </Row>
                </Column>
                <InfiniteScroll
                    hasMore={data?.learningNeeds?.hasMore ?? false}
                    loadMore={paginationArgs =>
                        fetchMore({
                            variables: {
                                paginationArgs,
                            },
                        })
                    }
                >
                    <ParticipantLearningNeedsList
                        learningNeeds={data.learningNeeds.nodes as LearningNeedType[]}
                        onItemClick={learningNeed =>
                            history.push(
                                languageHouseRoutes(organizationSlug)
                                    .participants.detail(languageHouseParticipantId)
                                    .data.learningNeeds.detail(learningNeed.id).index
                            )
                        }
                    />
                </InfiniteScroll>
            </>
        )
    }
}
