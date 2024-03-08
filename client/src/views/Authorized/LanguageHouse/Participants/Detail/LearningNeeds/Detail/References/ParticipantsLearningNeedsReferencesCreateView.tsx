import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { InfoBlock } from 'components/Core/Containers/InfoBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import Paragraph from 'components/Core/Typography/Paragraph'
import { createParticipationFieldsMapper } from 'components/Domain/Participation/mappers/participationFieldsMapper'
import {
    LearningNeedsReferenceFormModel,
    ParticipationFields,
} from 'components/Domain/LanguageHouse/Fields/ParticipationFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useCreateParticipationMutation, useLearningNeedQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailLearningNeedsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export const ParticipantsLearningNeedsReferencesCreateView: React.FC = () => {
    const params = useParams<LanguageHouseParticipantsDetailLearningNeedsDetailRouteParams>()
    const history = useHistory()
    const { i18n } = useLingui()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const learningNeedQuery = useLearningNeedQuery({
        variables: {
            learningNeedId: params.learningNeedId,
        },
    })

    const [createParticipationMutation, { loading, error }] = useCreateParticipationMutation({
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
                title={i18n._(t`Nieuwe verwijzing`)}
                subtitle={
                    (learningNeedQuery.data?.learningNeed.student.person &&
                        NameFormatters.formattedFullname(learningNeedQuery.data?.learningNeed.student.person)) ||
                    ''
                }
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.languageHouse(sessionContext.organizationSlug).participants.overview,
                            breadcrumbItems
                                .languageHouse(sessionContext.organizationSlug)
                                .participants.detail.learningNeeds.overview(params.languageHouseParticipantId),
                            breadcrumbItems
                                .languageHouse(sessionContext.organizationSlug)
                                .participants.detail.learningNeeds.detail.index(
                                    params.languageHouseParticipantId,
                                    learningNeedQuery.data?.learningNeed.description || i18n._(t`Leervraag`),
                                    params.learningNeedId
                                ),
                        ]}
                    />
                }
            />
            <Column spacing={8}>
                <InfoBlock type="info">
                    <Row>
                        <Paragraph bold={true}>{i18n._(t`Geadviseerd aanbod`)}</Paragraph>
                        {learningNeedQuery.loading ? (
                            <Spinner small={true} />
                        ) : (
                            <Paragraph>{learningNeedQuery.data?.learningNeed.advisedOffer}</Paragraph>
                        )}
                    </Row>
                </InfoBlock>
                <MutationErrorProvider mutationError={error?.message}>
                    <ParticipationFields />
                </MutationErrorProvider>
            </Column>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button disabled={loading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Verwijzen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const { learningNeedId, languageHouseParticipantId } = params
        const formData = Forms.getFormDataFromFormEvent<LearningNeedsReferenceFormModel>(e)
        const input = createParticipationFieldsMapper(formData, learningNeedId)

        try {
            await createParticipationMutation({
                variables: {
                    input,
                },
            })

            NotificationsManager.success(
                i18n._(t`Deelnemer is aangemaakt`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(
                languageHouseRoutes(organizationSlug)
                    .participants.detail(languageHouseParticipantId)
                    .data.learningNeeds.detail(learningNeedId).index
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
