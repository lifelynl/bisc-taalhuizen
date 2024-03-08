import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { InfoBlock } from 'components/Core/Containers/InfoBlock'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import Paragraph from 'components/Core/Typography/Paragraph'
import { DeleteLearningNeedReferenceButtonContainer } from 'components/Domain/LearningNeeds/Containers/DeleteLearningNeedReferenceButtonContainer'
import { editParticipationFieldsMapper } from 'components/Domain/Participation/mappers/participationFieldsMapper'
import {
    LearningNeedsReferenceFormModel,
    ParticipationFields,
} from 'components/Domain/LanguageHouse/Fields/ParticipationFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    ParticipationQuery,
    useEditParticipationMutation,
    useLearningNeedQuery,
    useParticipationQuery,
} from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export const ParticipantsLearningNeedsReferencesUpdateView: React.FC = () => {
    const params = useParams<LanguageHouseParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams>()
    const history = useHistory()
    const { i18n } = useLingui()

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

    const [editParticipationMutation, { loading, error }] = useEditParticipationMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeed' })
            cache.evict({ fieldName: 'learningNeeds' })
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

    if (
        learningNeedQuery.error ||
        !learningNeedQuery.data?.learningNeed ||
        participationQuery.error ||
        !participationQuery.data?.participation
    ) {
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
        <Form onSubmit={handleUpdate(participationQuery.data?.participation)}>
            <Headline
                title={i18n._(t`Activiteit aanpassen`)}
                subtitle={participantName}
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
            {renderSection(participationQuery.data?.participation)}
            <Actionbar
                LeftComponent={
                    <DeleteLearningNeedReferenceButtonContainer
                        participationId={params.referralId}
                        learningNeedName={participantName}
                        onSuccessfullDelete={() =>
                            history.push(
                                languageHouseRoutes(organizationSlug)
                                    .participants.detail(params.languageHouseParticipantId)
                                    .data.learningNeeds.detail(params.learningNeedId).index
                            )
                        }
                    />
                }
                RightComponent={
                    <Row>
                        <Button disabled={loading} type={ButtonType.secondary} onClick={() => history.goBack()}>
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

    function renderSection(participation: ParticipationQuery['participation']) {
        return (
            <Column spacing={4}>
                <InfoBlock type="info">
                    <Row>
                        <Paragraph bold={true}>{i18n._(t`Geadviseerd aanbod`)}</Paragraph>
                        <Paragraph>{learningNeedQuery.data?.learningNeed.advisedOffer}</Paragraph>
                    </Row>
                </InfoBlock>
                <MutationErrorProvider mutationError={error?.message}>
                    <ParticipationFields showPresenceFields={true} participation={participation} />
                </MutationErrorProvider>
            </Column>
        )
    }

    function handleUpdate(participation: ParticipationQuery['participation']) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<LearningNeedsReferenceFormModel>(e)
            const input = editParticipationFieldsMapper(participation, formData)

            try {
                await editParticipationMutation({
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
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }
}
