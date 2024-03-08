import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { createLearningNeedFieldsMapper } from 'components/Domain/Participation/mappers/learningNeedFieldsMapper'
import {
    ParticipantLearningNeedFieldsFormModel,
    LearningNeedFields,
} from 'components/Domain/LanguageHouse/Fields/LearningNeedFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    useCreateLearningNeedMutation,
    useStudentForDesiredLearningNeedOutcomeQuery,
    useStudentForDetailHeaderQuery,
} from 'graphql/v2/generated/graphql'
import { useRefScrollTo } from 'hooks/UseRefScrollTo'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export const ParticipantsLearningNeedsCreateView: React.FC = () => {
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const refToTop = useRefScrollTo()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data: studentData } = useStudentForDetailHeaderQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })

    const { data: studentDisiredLearningOutcome } = useStudentForDesiredLearningNeedOutcomeQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })

    const [createLearningNeedMutation, { loading, error }] = useCreateLearningNeedMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeeds' })
        },
    })

    return (
        <div ref={refToTop}>
            <Form onSubmit={handleCreate}>
                <Headline
                    title={i18n._(t`Nieuwe leervraag`)}
                    subtitle={
                        studentData?.student.person && NameFormatters.formattedFullname(studentData?.student.person)
                    }
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.languageHouse(organizationSlug).participants.overview,
                                breadcrumbItems
                                    .languageHouse(organizationSlug)
                                    .participants.detail.learningNeeds.overview(languageHouseParticipantId),
                            ]}
                        />
                    }
                />
                <MutationErrorProvider mutationError={error?.message}>
                    <LearningNeedFields
                        desiredLearningNeedOutcomes={
                            studentDisiredLearningOutcome?.student.registration.desiredLearningNeedOutcome
                        }
                    />
                </MutationErrorProvider>
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={loading}>
                                {i18n._(t`Toevoegen`)}
                            </Button>
                        </Row>
                    }
                />
            </Form>
        </div>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipantLearningNeedFieldsFormModel>(e)
        const input = createLearningNeedFieldsMapper(languageHouseParticipantId, formData)

        try {
            const response = await createLearningNeedMutation({
                variables: {
                    input,
                },
            })

            NotificationsManager.success(
                i18n._(t`Leervraag is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de leervraag`)
            )

            history.push(
                languageHouseRoutes(organizationSlug)
                    .participants.detail(languageHouseParticipantId)
                    .data.learningNeeds.detail(response.data!.createLearningNeed.id).index
            )
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                // eslint-disable-next-line no-console
                console.error(error)
            }
        }
    }
}
