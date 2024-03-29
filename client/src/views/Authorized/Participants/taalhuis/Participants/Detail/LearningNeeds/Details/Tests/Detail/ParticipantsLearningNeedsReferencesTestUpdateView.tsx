import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import CourseCard from 'components/Core/CourseCard/CourseCard'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import { TaalhuizenParticipantsLearningNeedsBreadCrumbs } from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenParticipantsLearningNeedsBreadCrumbs'
import { ParticipantsLearningNeedReferenceTestFields } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { useMockMutation } from 'hooks/UseMockMutation'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Forms } from 'utils/forms'
import { ParticipantDetailLocationStateProps } from '../../../../ParticipantsDetailView'
import { ParticipantsLearningNeedsTestDeleteModal } from '../../../../../../../../../../components/Domain/LearningNeeds/Modals/ParticipantsLearningNeedsTestDeleteModal'
import { useTestResultQuery } from 'generated/graphql'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

interface FormModel extends LearningOutcomeOfferFieldsetModel {}

export const ParticipantsLearningNeedsReferencesTestUpdateView: React.FC<Props> = ({ routeState }) => {
    const history = useHistory()
    const { i18n } = useLingui()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { data, loading, error } = useTestResultQuery({
        variables: {
            testResultId: routeState.testResultId,
        },
    })
    const [updateLearningNeedReference, { loading: updateLoading }] = useMockMutation({}, false)

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={i18n._(t`Toetsresultaat`)}
                subtitle={routeState.participantName}
                spacingType={SpacingType.small}
                TopComponent={<TaalhuizenParticipantsLearningNeedsBreadCrumbs routeState={routeState} />}
            />
            {renderSection()}
            <Actionbar
                LeftComponent={
                    <Button type={ButtonType.secondary} icon={IconType.delete} onClick={() => setModalIsVisible(true)}>
                        {i18n._(t`Toetsresultaat verwijderen`)}
                    </Button>
                }
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={updateLoading}>
                            {i18n._(t`Verwijzen`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <ParticipantsLearningNeedsTestDeleteModal onClose={() => setModalIsVisible(false)} />
            </Modal>
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
                <Column spacing={6}>
                    <CourseCard course={i18n._(t`Digivaardigheids cursus`)} chapter={i18n._(t`NL educatie`)} />
                    <ParticipantsLearningNeedReferenceTestFields defaultValues={data.testResult} />
                </Column>
            )
        }
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateLearningNeedReference(formData)

        if (response?.data) {
            NotificationsManager.success(
                i18n._(t`Deelnemer is bijgewerkt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            return
        }
    }
}
