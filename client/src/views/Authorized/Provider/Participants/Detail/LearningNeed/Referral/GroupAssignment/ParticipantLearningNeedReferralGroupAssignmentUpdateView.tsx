import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { ProviderGroupFormFields } from 'components/Domain/Provider/ProviderGroups/ProviderGroupFormFields'
import {
    ParticipationEditFields,
    ParticipationEditFormFieldsModel,
} from 'components/Domain/Provider/Participation/ParticipationEditFields'
import { DeleteParticipationButtonContainer } from 'components/Domain/Participation/containers/DeleteParticipationButtonContainer'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useEditParticipationMutation, useParticipationQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom'
import {
    ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams,
    providerRoutes,
} from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

interface Props extends RouteComponentProps<ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams> {}

export const ParticipantLearningNeedReferralGroupAssignmentUpdateView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { learningNeedId, referralId, providerParticipantId } =
        useParams<ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams>()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

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

    return (
        <PageQuery {...participationQuery}>
            {({ participation }) => (
                <Form onSubmit={handleEdit}>
                    <Headline
                        title={i18n._('Deelname aanpassen')}
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
                    <Column spacing={10}>
                        <MutationErrorProvider mutationError={editParticipationMutation.error?.message}>
                            <ParticipationEditFields
                                prefillData={participation}
                                referringOrganizationName={participation.learningNeed?.student.organization.name || ''}
                                referredToOrganizationName={participation.provider?.name || ''}
                            />
                        </MutationErrorProvider>
                        {participation.educationGroup && (
                            <>
                                <HorizontalRule />
                                <SectionTitle title={i18n._(`Deelnamegroep`)} heading={'H3'} />
                                <ProviderGroupFormFields
                                    prefillData={participation.educationGroup}
                                    readOnly={true}
                                    studentInformationForAvailabilityComparison={{
                                        role: i18n._(`Deelnemer`),
                                        title: NameFormatters.formattedFullname(
                                            participation.learningNeed?.student.person ?? {}
                                        ),
                                        availability: participation.learningNeed?.student.person.availability ?? [],
                                        availabilityNotes:
                                            participation.learningNeed?.student.person.availabilityNotes ?? '',
                                    }}
                                />
                            </>
                        )}
                    </Column>
                    <Actionbar
                        LeftComponent={
                            <DeleteParticipationButtonContainer
                                onSuccessDelete={() => {
                                    history.push(
                                        providerRoutes(organizationSlug)
                                            .participants.detail(providerParticipantId)
                                            .data.learningNeeds.detail(learningNeedId).index
                                    )
                                }}
                            />
                        }
                        RightComponent={
                            <Row>
                                <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                                    {i18n._('Annuleren')}
                                </Button>
                                <Button
                                    type={ButtonType.primary}
                                    submit={true}
                                    loading={editParticipationMutation.loading}
                                >
                                    {i18n._('Opslaan')}
                                </Button>
                            </Row>
                        }
                    />
                </Form>
            )}
        </PageQuery>
    )

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipationEditFormFieldsModel>(e)

        try {
            await editParticipation({
                variables: {
                    input: {
                        id: referralId,
                        agreement: formData['agreement'] ?? null,
                        startParticipation: formData['startParticipation']
                            ? new Date(formData['startParticipation'])
                            : null,
                    },
                },
            })

            NotificationsManager.success(
                i18n._(`Deelname is bijgewerkt`),
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
}
