import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { TaalhuisParticipantLearningNeedFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import { DesiredOutcomesFieldsetModel } from 'components/fieldsets/participants/fieldsets/DesiredOutcomesFieldset'
import { LearningQuestionsFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import { OfferInfortmationInformationModel } from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { useMockMutation } from 'hooks/UseMockMutation'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { learningNeedsMockResponse } from '../mocks/learningNeeds'
import { ParticipantsLearningNeedsDetailLocationStateProps } from './ParticipantsLearningNeedsDetailView'
interface Props {
    routeState: ParticipantsLearningNeedsDetailLocationStateProps
}
interface FormModel
    extends OfferInfortmationInformationModel,
        DesiredOutcomesFieldsetModel,
        LearningQuestionsFieldsetModel {}

export const ParticipantsLearningNeedUpdateView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useMockQuery(learningNeedsMockResponse)
    const [editLearningNeed, { loading: updateLoading }] = useMockMutation({}, false)

    return (
        <Form onSubmit={handleEdit}>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Leervraag aanpassen`)}
                    subtitle={'Met computers leren werken'}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs>
                            <Breadcrumb
                                text={i18n._(t`Deelnemers`)}
                                to={routes.authorized.participants.taalhuis.participants.overview}
                            />
                            <Breadcrumb
                                text={i18n._(t`Leervragen`)}
                                to={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
                            />
                            <Breadcrumb
                                text={i18n._(t`Met computers leren werken`)}
                                to={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
                            />
                        </Breadcrumbs>
                    }
                />
            </Column>
            {renderSection()}
        </Form>
    )

    function renderSection() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (data) {
            return (
                <>
                    <TaalhuisParticipantLearningNeedFields learningNeed={data} />
                    <Space pushTop={true} />
                    <Actionbar
                        LeftComponent={
                            <Button icon={IconType.delete} type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Verwijderen`)}
                            </Button>
                        }
                        RightComponent={
                            <Row>
                                <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                                    {i18n._(t`Annuleren`)}
                                </Button>

                                <Button type={ButtonType.primary} submit={true} loading={updateLoading}>
                                    {i18n._(t`Opslaan`)}
                                </Button>
                            </Row>
                        }
                    />
                </>
            )
        }
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            await editLearningNeed(formData)

            history.push(routes.authorized.participants.taalhuis.participants.detail.goals.detail.read)

            NotificationsManager.success(
                i18n._(t`Deelnemer is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
        } catch (e) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}
