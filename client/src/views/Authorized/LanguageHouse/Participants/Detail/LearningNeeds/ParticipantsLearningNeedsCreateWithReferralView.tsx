import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { createParticipationWithReferralFieldsMapper } from 'components/Domain/Participation/mappers/participationFieldsMapper'
import {
    LearningNeedSelectOrCreateFields,
    ParticipantLearningNeedFieldsFormModel,
} from 'components/Domain/LanguageHouse/Fields/LearningNeedSelectOrCreateFields'
import {
    LearningNeedsReferenceFormModel,
    ParticipationFields,
} from 'components/Domain/LanguageHouse/Fields/ParticipationFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useCreateParticipationMutation, useStudentForDetailHeaderQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export interface CreateLearningNeedWithReferralFormModel
    extends LearningNeedsReferenceFormModel,
        ParticipantLearningNeedFieldsFormModel {}

export const ParticipantsLearningNeedsCreateWithReferralView: React.FC = () => {
    const params = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const history = useHistory()
    const { i18n } = useLingui()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const studentQuery = useStudentForDetailHeaderQuery({
        variables: {
            studentId: params.languageHouseParticipantId,
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
                    (studentQuery.data?.student.person &&
                        NameFormatters.formattedFullname(studentQuery.data?.student.person)) ||
                    ''
                }
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.languageHouse(organizationSlug).participants.overview,
                            breadcrumbItems
                                .languageHouse(organizationSlug)
                                .participants.detail.learningNeeds.overview(params.languageHouseParticipantId),
                        ]}
                    />
                }
            />
            <Column spacing={8}>
                <MutationErrorProvider mutationError={error?.message}>
                    <LearningNeedSelectOrCreateFields studentId={params.languageHouseParticipantId} />
                    <HorizontalRule />
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

        const formData = Forms.getFormDataFromFormEvent<CreateLearningNeedWithReferralFormModel>(e)
        const input = createParticipationWithReferralFieldsMapper(formData, params.languageHouseParticipantId)

        try {
            const response = await createParticipationMutation({
                variables: {
                    input,
                },
            })

            NotificationsManager.success(
                i18n._(t`Deelnemer is aangemaakt`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(
                languageHouseRoutes(sessionContext.organizationSlug)
                    .participants.detail(params.languageHouseParticipantId)
                    .data.learningNeeds.detail(response.data?.createParticipation.learningNeed.id).index
            )

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
