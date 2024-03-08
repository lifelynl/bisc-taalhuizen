import React, { useContext } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import {
    ParticipantsLearningNeedReferenceTestFields,
    ParticipantsLearningNeedReferenceTestFieldsModel,
} from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { useHistory, useParams } from 'react-router-dom'
import { Forms } from 'utils/forms'
import Column from 'components/Core/Layout/Column/Column'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { createTestResultFieldsMapper } from 'components/Domain/Participation/mappers/testResultFieldsMapper'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { useCreateTestResultMutation, useLearningNeedQuery } from 'graphql/v2/generated/graphql'
import { CourseCard } from 'components/Core/CourseCard/CourseCard'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import {
    ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams,
    providerRoutes,
} from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ParticipationResultCreateView: React.FC = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams>()

    const learningNeedQuery = useLearningNeedQuery({
        variables: {
            learningNeedId: params.learningNeedId,
        },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const [createTestResultMutation, { loading, error }] = useCreateTestResultMutation({
        update(cache) {
            cache.evict({ fieldName: 'participation' })
            cache.evict({ fieldName: 'participations' })
        },
    })

    if (learningNeedQuery.loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    const participations = learningNeedQuery.data?.learningNeed.participations || []
    const participation = participations.find(p => p.id === params.referralId)

    if (!participation || learningNeedQuery.error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    const participantName = learningNeedQuery.data
        ? NameFormatters.formattedFullname(learningNeedQuery.data.learningNeed.student.person)
        : ''

    return (
        <Form onSubmit={onSubmit}>
            <Headline
                title={i18n._(t`Activiteit afronden`)}
                subtitle={participantName}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.provider(organizationSlug).participants.overview,
                            breadcrumbItems
                                .provider(organizationSlug)
                                .participants.detail.learningNeeds.overview(params.providerParticipantId),
                            breadcrumbItems
                                .provider(organizationSlug)
                                .participants.detail.learningNeeds.detail(
                                    params.providerParticipantId,
                                    params.learningNeedId,
                                    learningNeedQuery.data?.learningNeed.description || i18n._(t`Leervraag`)
                                ),
                        ]}
                    />
                }
            />
            <Column spacing={10}>
                <CourseCard
                    course={participation.offerName!}
                    chapter={participation.provider?.name || participation.providerOther || ''}
                />
                <MutationErrorProvider mutationError={error?.message}>
                    <ParticipantsLearningNeedReferenceTestFields />
                </MutationErrorProvider>
            </Column>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button disabled={loading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Activiteit afronden`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<ParticipantsLearningNeedReferenceTestFieldsModel>(e)
        const input = createTestResultFieldsMapper(formData, params.referralId)

        try {
            await createTestResultMutation({
                variables: {
                    input,
                },
            })

            NotificationsManager.success(
                i18n._(t`Resultaat is toegevoegd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(
                providerRoutes(organizationSlug)
                    .participants.detail(params.providerParticipantId)
                    .data.learningNeeds.detail(params.learningNeedId).index
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
