import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { ProviderGroupFormFields } from 'components/Domain/Provider/ProviderGroups/ProviderGroupFormFields'
import { ParticipationSummary } from 'components/Domain/Participation/ParticipationSummary'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    ParticipationQuery,
    useProviderEducationGroupQuery,
    useParticipationQuery,
    ProviderEducationGroupQuery,
    useEditParticipationMutation,
} from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom'
import {
    ProviderParticipantDetailLearningNeedsDetailReferralsDetailGroupPreviewRouteParams,
    providerRoutes,
} from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props
    extends RouteComponentProps<ProviderParticipantDetailLearningNeedsDetailReferralsDetailGroupPreviewRouteParams> {}

export const ReferralGroupAssignmentPreviewView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const session = useContext(SessionContext)
    const { learningNeedId, referralId, groupId, providerParticipantId } =
        useParams<ProviderParticipantDetailLearningNeedsDetailReferralsDetailGroupPreviewRouteParams>()

    const educationGroupQuery = useProviderEducationGroupQuery({ variables: { id: groupId } })
    const participationQuery = useParticipationQuery({
        variables: { participationId: referralId, withLearningNeed: true },
    })

    const [editParticipation, editParticipationMutation] = useEditParticipationMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeed' })
            cache.evict({ fieldName: 'learningNeeds' })
            cache.evict({ fieldName: 'participation' })
            cache.evict({ fieldName: 'participations' })
            cache.evict({ fieldName: 'providerStudents' })
        },
    })

    const organizationId = session.user?.currentEmployee?.organization.id
    if (!organizationId) {
        return null
    }

    return (
        <PageQuery {...participationQuery}>
            {({ participation }) => (
                <PageQuery {...educationGroupQuery}>
                    {({ educationGroup }) => (
                        <MutationErrorProvider mutationError={editParticipationMutation.error?.message}>
                            <Column spacing={4}>
                                {renderHeader(participation, educationGroup)}
                                <Column spacing={10}>
                                    <ParticipationSummary
                                        languageHouse={participation.learningNeed?.student.organization.name || ''}
                                        participation={participation}
                                    />
                                    <ProviderGroupFormFields
                                        organizationId={organizationId}
                                        prefillData={educationGroup}
                                        readOnly={true}
                                        studentInformationForAvailabilityComparison={{
                                            role: i18n._(t`Deelnemer`),
                                            title: NameFormatters.formattedFullname(
                                                participation.learningNeed?.student.person ?? {}
                                            ),
                                            availability: participation.learningNeed?.student.person.availability ?? [],
                                            availabilityNotes:
                                                participation.learningNeed?.student.person.availabilityNotes ?? '',
                                        }}
                                    />
                                </Column>
                                <Space pushTop={true} />
                                <Form onSubmit={getAddToGroupHandler(educationGroup.id)}>
                                    <Actionbar
                                        LeftComponent={
                                            <Button
                                                icon={IconType.arrowLeft}
                                                type={ButtonType.secondary}
                                                onClick={() =>
                                                    history.push(
                                                        providerRoutes(session.organizationSlug)
                                                            .participants.detail(providerParticipantId)
                                                            .data.learningNeeds.detail(learningNeedId)
                                                            .referrals.detail(referralId).groupAssignment.select
                                                    )
                                                }
                                            >
                                                {i18n._(t`Selecteer een andere groep`)}
                                            </Button>
                                        }
                                        RightComponent={
                                            <Row>
                                                <Button
                                                    type={ButtonType.primary}
                                                    icon={IconType.addPerson}
                                                    submit={true}
                                                    loading={editParticipationMutation.loading}
                                                >
                                                    {i18n._(t`Toevoegen aan deelnamegroep`)}
                                                </Button>
                                            </Row>
                                        }
                                    />
                                </Form>
                            </Column>
                        </MutationErrorProvider>
                    )}
                </PageQuery>
            )}
        </PageQuery>
    )

    function renderHeader(
        participation: ParticipationQuery['participation'],
        educationGroup: ProviderEducationGroupQuery['educationGroup']
    ) {
        return (
            <Headline
                title={educationGroup.name}
                subtitle={NameFormatters.formattedFullname(participation.learningNeed?.student.person ?? {})}
                titleSuffix={i18n._('Deelnamegroep')}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.provider(session.organizationSlug).participants.overview,
                            breadcrumbItems
                                .provider(session.organizationSlug)
                                .participants.detail.learningNeeds.overview(providerParticipantId),
                            breadcrumbItems
                                .provider(session.organizationSlug)
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

    function getAddToGroupHandler(educationGroupId: string) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            try {
                await editParticipation({ variables: { input: { id: referralId, educationGroup: educationGroupId } } })

                NotificationsManager.success(
                    i18n._(`Deelname is toegevoegd`),
                    i18n._(`Je wordt teruggestuurd naar het overzicht`)
                )

                history.push(
                    providerRoutes(session.organizationSlug)
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
    }
}
