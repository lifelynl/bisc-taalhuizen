import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { GroupsList } from 'components/Domain/Groups/Lists/GroupsList'
import { ParticipationSummary } from 'components/Domain/Participation/ParticipationSummary'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    EducationGroupStatus,
    ParticipationQuery,
    useEditParticipationMutation,
    useEducationGroupsQuery,
    useParticipationQuery,
} from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams,
    providerRoutes,
} from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

export const ParticipantLearningNeedReferralGroupAssignmentSelectView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const organizationId = useContext(SessionContext).user?.currentEmployee?.organization.id!
    const { organizationSlug } = useContext(SessionContext)

    const { learningNeedId, providerParticipantId, referralId } =
        useParams<ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams>()

    const groupsQueryVariables = {
        organizationId,
        oneOfStatuses: [EducationGroupStatus.Future, EducationGroupStatus.Active],
        paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
    }

    const participationQuery = useParticipationQuery({
        variables: { participationId: referralId, withLearningNeed: true },
    })
    const groupsQuery = useEducationGroupsQuery({ variables: groupsQueryVariables })
    const [editParticipation, editParticipationMutation] = useEditParticipationMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeed' })
            cache.evict({ fieldName: 'learningNeeds' })
            cache.evict({ fieldName: 'participation' })
            cache.evict({ fieldName: 'participations' })
            cache.evict({ fieldName: 'providerStudents' })
        },
    })

    return (
        <PageQuery {...participationQuery}>
            {({ participation }) => (
                <Column spacing={4}>
                    {renderHeader(participation)}
                    <ParticipationSummary
                        languageHouse={participation.learningNeed?.student.organization.name || ''}
                        participation={participation}
                    />
                    <Space pushTop={true} />
                    <InfiniteScroll
                        hasMore={groupsQuery.data?.educationGroups.hasMore ?? false}
                        loadMore={paginationArgs =>
                            groupsQuery.fetchMore({ variables: { ...groupsQueryVariables, paginationArgs } })
                        }
                    >
                        {renderGroups()}
                    </InfiniteScroll>
                </Column>
            )}
        </PageQuery>
    )

    function renderHeader(participation: ParticipationQuery['participation']) {
        return (
            <Headline
                title={i18n._('Toevoegen aan deelnamegroep')}
                subtitle={NameFormatters.formattedFullname(participation.learningNeed?.student.person ?? {})}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.provider(organizationSlug).participants.overview,
                            breadcrumbItems
                                .provider(organizationSlug)
                                .participants.detail.learningNeeds.overview(providerParticipantId),
                            breadcrumbItems
                                .provider(organizationSlug)
                                .participants.detail.learningNeeds.detail(
                                    providerParticipantId,
                                    learningNeedId,
                                    participation.learningNeed?.description || ''
                                ),
                        ]}
                    />
                }
            />
        )
    }

    function renderGroups() {
        if (!groupsQuery.data && groupsQuery.loading) {
            return (
                <Center grow={true}>
                    <Spinner type={SpinnerAnimation.pageSpinner} />
                </Center>
            )
        }
        if (groupsQuery.error) {
            return (
                <ErrorBlock
                    title={i18n._(`Er ging iets fout`)}
                    message={i18n._(`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <MutationErrorProvider mutationError={editParticipationMutation.error?.message}>
                <GroupsList
                    data={groupsQuery.data?.educationGroups.nodes || []}
                    onView={groupId => !editParticipationMutation.loading && redirectToGroupPreview(groupId)}
                    onAddToGroup={groupId => !editParticipationMutation.loading && handleAddToGroup(groupId)}
                />
            </MutationErrorProvider>
        )
    }

    async function handleAddToGroup(educationGroup: string) {
        try {
            await editParticipation({ variables: { input: { id: referralId, educationGroup } } })

            NotificationsManager.success(
                i18n._(`Deelname is toegevoegd`),
                i18n._(`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(
                providerRoutes(organizationSlug)
                    .participants.detail(providerParticipantId)
                    .data.learningNeeds.detail(learningNeedId).index
            )

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }

    function redirectToGroupPreview(groupId: string) {
        history.push(
            providerRoutes(organizationSlug)
                .participants.detail(providerParticipantId)
                .data.learningNeeds.detail(learningNeedId)
                .referrals.detail(referralId)
                .groupAssignment.preview(groupId)
        )
    }
}
