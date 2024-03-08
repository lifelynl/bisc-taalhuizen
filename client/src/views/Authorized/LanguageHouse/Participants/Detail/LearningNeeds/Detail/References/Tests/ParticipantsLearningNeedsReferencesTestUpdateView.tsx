import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { CourseCard } from 'components/Core/CourseCard/CourseCard'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import {
    ParticipantsLearningNeedReferenceTestFields,
    ParticipantsLearningNeedReferenceTestFieldsModel,
} from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Forms } from 'utils/forms'
import { editTestResultFieldsMapper } from 'components/Domain/Participation/mappers/testResultFieldsMapper'
import {
    LanguageHouseParticipationTestResultRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ParticipantsLearningNeedsTestDeleteModal } from 'components/Domain/LearningNeeds/Modals/ParticipantsLearningNeedsTestDeleteModal'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { useEditTestResultMutation, useLearningNeedQuery, useParticipationQuery } from 'graphql/v2/generated/graphql'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ParticipantsLearningNeedsReferencesTestUpdateView: React.FC = () => {
    const params = useParams<LanguageHouseParticipationTestResultRouteParams>()
    const history = useHistory()
    const { i18n } = useLingui()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const learningNeedQuery = useLearningNeedQuery({
        variables: {
            learningNeedId: params.learningNeedId,
        },
    })

    const participationQuery = useParticipationQuery({
        variables: {
            participationId: params.referralId,
        },
    })

    const [editTestResultMutation, { loading, error }] = useEditTestResultMutation({
        update(cache) {
            cache.evict({ fieldName: 'participation' })
            cache.evict({ fieldName: 'participations' })
        },
    })

    if (learningNeedQuery.loading || participationQuery.loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    const participation = participationQuery.data?.participation

    if (
        !participation ||
        participationQuery.error ||
        !learningNeedQuery.data?.learningNeed ||
        learningNeedQuery.error
    ) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Form onSubmit={onSubmit}>
            <Headline
                title={i18n._(t`Resultaat`)}
                subtitle={
                    learningNeedQuery.data?.learningNeed.student.person
                        ? NameFormatters.formattedFullname(learningNeedQuery.data?.learningNeed.student.person)
                        : undefined
                }
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.languageHouse(organizationSlug).participants.overview,
                            breadcrumbItems
                                .languageHouse(organizationSlug)
                                .participants.detail.learningNeeds.overview(params.languageHouseParticipantId),
                            breadcrumbItems
                                .languageHouse(organizationSlug)
                                .participants.detail.learningNeeds.detail.index(
                                    params.languageHouseParticipantId,
                                    learningNeedQuery.data?.learningNeed.description || i18n._(t`Leervraag`),
                                    params.learningNeedId
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
                    <ParticipantsLearningNeedReferenceTestFields participation={participation} />
                </MutationErrorProvider>
            </Column>
            <Actionbar
                LeftComponent={
                    <Button type={ButtonType.secondary} icon={IconType.delete} onClick={() => setModalIsVisible(true)}>
                        {i18n._(t`Resultaat verwijderen`)}
                    </Button>
                }
                RightComponent={
                    <Row>
                        <Button disabled={loading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <ParticipantsLearningNeedsTestDeleteModal
                    onRequestClose={() => setModalIsVisible(false)}
                    onSuccess={() => {
                        history.push(
                            languageHouseRoutes(organizationSlug)
                                .participants.detail(params.languageHouseParticipantId)
                                .data.learningNeeds.detail(params.learningNeedId).index
                        )
                    }}
                    testResultId={params.testResultId}
                />
            </Modal>
        </Form>
    )

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<ParticipantsLearningNeedReferenceTestFieldsModel>(e)

        try {
            if (!participation?.testResult) {
                throw new Error('Could not find default testResult')
            }

            const input = editTestResultFieldsMapper(participation?.testResult!, formData)
            await editTestResultMutation({
                variables: {
                    input,
                },
            })

            NotificationsManager.success(
                i18n._(t`Deelnemer is bijgewerkt`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(
                languageHouseRoutes(organizationSlug)
                    .participants.detail(params.languageHouseParticipantId)
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
