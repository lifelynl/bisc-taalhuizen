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
import { useCreateLearningNeedMutation, useStudentForDetailHeaderQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ProviderParticipantDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export const ParticipantLearningNeedsCreateView: React.FC = () => {
    const { providerParticipantId: studentId } = useParams<ProviderParticipantDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const baseLearningNeedsPath = providerRoutes(organizationSlug).participants.detail(studentId).data.learningNeeds

    const { data } = useStudentForDetailHeaderQuery({ variables: { studentId } })
    const [createLearningNeedMutation, { loading, error }] = useCreateLearningNeedMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeed' })
            cache.evict({ fieldName: 'learningNeeds' })
            cache.evict({ fieldName: 'participation' })
            cache.evict({ fieldName: 'participations' })
        },
    })

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe leervraag`)}
                subtitle={data?.student.person && NameFormatters.formattedFullname(data?.student.person)}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.provider(organizationSlug).participants.overview,
                            breadcrumbItems
                                .provider(organizationSlug)
                                .participants.detail.learningNeeds.overview(studentId),
                        ]}
                    />
                }
            />
            <MutationErrorProvider mutationError={error?.message}>
                <LearningNeedFields />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            disabled={loading}
                            onClick={() => history.push(baseLearningNeedsPath.index)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipantLearningNeedFieldsFormModel>(e)
        const input = createLearningNeedFieldsMapper(studentId, formData)

        try {
            const response = await createLearningNeedMutation({ variables: { input } })

            NotificationsManager.success(
                i18n._(t`Leervraag is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de leervraag`)
            )

            history.push(baseLearningNeedsPath.detail(response.data?.createLearningNeed.id).index)
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                // eslint-disable-next-line no-console
                console.error(error)
            }
        }
    }
}
