import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { ParticipationReferenceCard } from 'components/Domain/Participation/Reference/ParticipationReferenceCard'
import { LearningNeedFields } from 'components/Domain/LanguageHouse/Fields/LearningNeedFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { LearningNeedQuery, useLearningNeedQuery, useParticipationsQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom'
import { ProviderParticipantDetailLearningNeedsDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props extends RouteComponentProps<ProviderParticipantDetailLearningNeedsDetailRouteParams> {}

export const ParticipantLearningNeedDetailView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { learningNeedId, providerParticipantId } =
        useParams<ProviderParticipantDetailLearningNeedsDetailRouteParams>()

    const learningNeedQuery = useLearningNeedQuery({ variables: { learningNeedId } })
    const participationsVariables = { learningNeedId, paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE } }
    const participationsQuery = useParticipationsQuery({
        variables: participationsVariables,
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug, user } = sessionContext
    const hasLimitedEditRights = user?.currentEmployee?.organization.hasLimitedEditRights

    return (
        <PageQuery {...learningNeedQuery}>
            {({ learningNeed }) => (
                <Column spacing={4}>
                    <Headline
                        title={learningNeed.description}
                        subtitle={NameFormatters.formattedFullname(learningNeed.student.person)}
                        underTitle={learningNeedQuery.data?.learningNeed.createdByOrganization.name}
                        spacingType={SpacingType.small}
                        TopComponent={
                            <Breadcrumbs
                                breadcrumbItems={[
                                    breadcrumbItems.provider(organizationSlug).participants.overview,
                                    breadcrumbItems
                                        .provider(organizationSlug)
                                        .participants.detail.learningNeeds.overview(providerParticipantId),
                                ]}
                            />
                        }
                    />
                    <LearningNeedFields readOnly={true} learningNeed={learningNeed} />
                    <HorizontalRule />
                    <Column spacing={8}>
                        <SectionTitle title={i18n._(t`Activiteiten`)} heading={'H3'} />
                        {renderParticipations(learningNeed)}
                    </Column>
                    <Space pushTop={true} />
                    {!hasLimitedEditRights && (
                        <Actionbar
                            hide={
                                sessionContext.user?.currentEmployee?.organization.id !==
                                learningNeedQuery.data?.learningNeed.student.organization.id
                            }
                            RightComponent={
                                <Button
                                    type={ButtonType.primary}
                                    onClick={() => {
                                        history.push(
                                            providerRoutes(organizationSlug)
                                                .participants.detail(providerParticipantId)
                                                .data.learningNeeds.detail(learningNeedId).update
                                        )
                                    }}
                                >
                                    {i18n._(t`Leervraag bewerken`)}
                                </Button>
                            }
                        />
                    )}
                </Column>
            )}
        </PageQuery>
    )

    function renderParticipations(learningNeed: LearningNeedQuery['learningNeed']) {
        if (participationsQuery.loading) {
            return (
                <Center grow={true}>
                    <Spinner type={SpinnerAnimation.pageSpinner} />
                </Center>
            )
        }

        if (participationsQuery.error || !participationsQuery.data?.participations.nodes) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <InfiniteScroll
                hasMore={participationsQuery.data.participations.hasMore ?? false}
                loadMore={paginationArgs =>
                    participationsQuery.fetchMore({ variables: { ...participationsVariables, paginationArgs } })
                }
            >
                <Column spacing={10}>
                    {participationsQuery.data.participations.nodes.map(p => (
                        <ParticipationReferenceCard
                            key={p.id}
                            participation={p}
                            learningNeed={learningNeed}
                            languageHouseName={learningNeed.student.organization.name}
                        />
                    ))}
                </Column>
            </InfiniteScroll>
        )
    }
}
