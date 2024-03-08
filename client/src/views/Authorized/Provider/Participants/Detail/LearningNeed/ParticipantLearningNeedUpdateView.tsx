import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { DeleteLearningNeedButtonContainer } from 'components/Domain/LearningNeeds/Containers/DeleteLearningNeedButtonContainer'
import { editLearningNeedFieldsMapper } from 'components/Domain/Participation/mappers/learningNeedFieldsMapper'
import {
    ParticipantLearningNeedFieldsFormModel,
    LearningNeedFields,
} from 'components/Domain/LanguageHouse/Fields/LearningNeedFields'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { LearningNeedQuery, useEditLearningNeedMutation, useLearningNeedQuery } from 'graphql/v2/generated/graphql'
import { ProviderParticipantDetailLearningNeedsDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useContext } from 'react'

export const ParticipantLearningNeedUpdateView: React.FC = () => {
    const { learningNeedId, providerParticipantId } =
        useParams<ProviderParticipantDetailLearningNeedsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const baseLearningNeedsPath =
        providerRoutes(organizationSlug).participants.detail(providerParticipantId).data.learningNeeds

    const { data, loading, error } = useLearningNeedQuery({ variables: { learningNeedId } })
    const [editLearningNeedMutation, { loading: editLoading, error: editError }] = useEditLearningNeedMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeed' })
            cache.evict({ fieldName: 'learningNeeds' })
        },
    })

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPage}
        </PageQuery>
    )

    function renderPage({ learningNeed }: LearningNeedQuery) {
        return (
            <Form onSubmit={handleEdit}>
                <Column spacing={4}>
                    <Headline
                        title={i18n._(t`Leervraag aanpassen`)}
                        subtitle={NameFormatters.formattedFullname(learningNeed.student.person)}
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
                                            learningNeed.description
                                        ),
                                ]}
                            />
                        }
                    />
                </Column>
                <MutationErrorProvider mutationError={editError?.message}>
                    <LearningNeedFields learningNeed={learningNeed} />
                </MutationErrorProvider>
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <DeleteLearningNeedButtonContainer
                            disabled={editLoading}
                            learningNeed={learningNeed}
                            onSuccessDelete={() => history.push(baseLearningNeedsPath.index)}
                        />
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                disabled={editLoading}
                                onClick={() => history.push(baseLearningNeedsPath.index)}
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={editLoading}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </Form>
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipantLearningNeedFieldsFormModel>(e)
        const input = editLearningNeedFieldsMapper(formData, data!.learningNeed)

        try {
            await editLearningNeedMutation({
                variables: {
                    input,
                },
            })

            NotificationsManager.success(i18n._(t`Leervraag is bijgewerkt`))

            history.push(baseLearningNeedsPath.detail(learningNeedId).index)
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                // eslint-disable-next-line no-console
                console.error(error)
            }
        }
    }
}
