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
import { ParticipationSummary } from 'components/Domain/Participation/ParticipationSummary'
import { ProviderEmployeeFieldset } from 'components/Domain/Shared/Fieldsets/ProviderEmployeeFieldset'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    EmployeeQuery,
    ParticipationQuery,
    useEditParticipationMutation,
    useEmployeeQuery,
    useParticipationQuery,
} from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom'
import {
    ProviderParticipantDetailLearningNeedsDetailReferralsDetailMentorPreviewRouteParams,
    providerRoutes,
} from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props
    extends RouteComponentProps<ProviderParticipantDetailLearningNeedsDetailReferralsDetailMentorPreviewRouteParams> {}

export const ReferralMentorAssignmentPreviewView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const session = useContext(SessionContext)
    const { learningNeedId, referralId, mentorId, providerParticipantId } =
        useParams<ProviderParticipantDetailLearningNeedsDetailReferralsDetailMentorPreviewRouteParams>()

    const employeeQuery = useEmployeeQuery({ variables: { id: mentorId, withEducations: true } })
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
                <PageQuery {...employeeQuery}>
                    {({ employee }) => (
                        <MutationErrorProvider mutationError={editParticipationMutation.error?.message}>
                            <Column spacing={4}>
                                {renderHeader(participation, employee)}
                                <Column spacing={10}>
                                    <ParticipationSummary
                                        languageHouse={participation.learningNeed?.student.organization.name || ''}
                                        participation={participation}
                                    />
                                    <ProviderEmployeeFieldset
                                        prefillData={employee}
                                        readOnly={true}
                                        // TODO
                                        // studentInformationForAvailabilityComparison={{
                                        //     role: i18n._(t`Deelnemer`),
                                        //     title: NameFormatters.formattedFullname(
                                        //         participation.learningNeed?.student.person ?? {}
                                        //     ),
                                        //     availability: participation.learningNeed?.student.person.availability ?? [],
                                        //     availabilityNotes:
                                        //         participation.learningNeed?.student.person.availabilityNotes ?? '',
                                        // }}
                                    />
                                </Column>
                                <Space pushTop={true} />
                                <Form onSubmit={getAddMentorHandler(employee.id)}>
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
                                                            .referrals.detail(referralId).mentorAssignment.select
                                                    )
                                                }
                                            >
                                                {i18n._(t`Selecteer een andere begeleider`)}
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
                                                    {i18n._(t`Koppelen aan begeleider`)}
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

    function renderHeader(participation: ParticipationQuery['participation'], employee: EmployeeQuery['employee']) {
        return (
            <Headline
                title={NameFormatters.formattedFullname(employee.person)}
                subtitle={NameFormatters.formattedFullname(participation.learningNeed?.student.person ?? {})}
                titleSuffix={i18n._('Begeleider')}
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

    function getAddMentorHandler(employeeId: string) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            try {
                await editParticipation({ variables: { input: { id: referralId, mentor: employeeId } } })

                NotificationsManager.success(
                    i18n._(`Begeleider is gekoppeld`),
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
