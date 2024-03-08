import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
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
import {
    LanguageHouseParticipantsDetailLearningNeedsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { useEditLearningNeedMutation, useLearningNeedQuery } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useContext } from 'react'

export const ParticipantsLearningNeedUpdateView: React.FC = () => {
    const { languageHouseParticipantId, learningNeedId } =
        useParams<LanguageHouseParticipantsDetailLearningNeedsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const {
        data,
        loading: getLearningNeedLoading,
        error: getLeaningNeedError,
    } = useLearningNeedQuery({
        variables: {
            learningNeedId: learningNeedId,
        },
    })

    const [editLearningNeedMutation, { loading, error }] = useEditLearningNeedMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeed' })
            cache.evict({ fieldName: 'learningNeeds' })
        },
    })

    if (getLearningNeedLoading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (getLeaningNeedError || !data?.learningNeed) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Form onSubmit={handleEdit}>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Leervraag aanpassen`)}
                    subtitle={NameFormatters.formattedFullname(data.learningNeed.student.person)}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.languageHouse(sessionContext.organizationSlug).participants.overview,
                                breadcrumbItems
                                    .languageHouse(sessionContext.organizationSlug)
                                    .participants.detail.learningNeeds.overview(languageHouseParticipantId),
                                breadcrumbItems
                                    .languageHouse(sessionContext.organizationSlug)
                                    .participants.detail.learningNeeds.detail.index(
                                        languageHouseParticipantId,
                                        data.learningNeed.description,
                                        data.learningNeed.id
                                    ),
                            ]}
                        />
                    }
                />
            </Column>
            <MutationErrorProvider mutationError={error?.message}>
                <LearningNeedFields learningNeed={data.learningNeed} />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                LeftComponent={
                    <DeleteLearningNeedButtonContainer
                        disabled={loading}
                        learningNeed={data.learningNeed}
                        onSuccessDelete={() => {
                            history.push(
                                languageHouseRoutes(organizationSlug).participants.detail(languageHouseParticipantId)
                                    .data.learningNeeds.index
                            )
                        }}
                    />
                }
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} disabled={loading} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

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

            history.push(
                languageHouseRoutes(organizationSlug)
                    .participants.detail(languageHouseParticipantId)
                    .data.learningNeeds.detail(data!.learningNeed.id).index
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
