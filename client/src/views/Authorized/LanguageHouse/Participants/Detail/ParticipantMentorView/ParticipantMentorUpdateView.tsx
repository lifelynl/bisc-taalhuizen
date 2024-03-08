import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import { ConfirmModal } from 'components/Core/Modal/ConfirmModal'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    LanguageHouseParticipantMentorFields,
    LanguageHouseParticipantMentorFormFields,
} from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantMentorFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useEditStudentMutation, useStudentForMentorQuery } from 'graphql/v2/generated/graphql'
import { useContext, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export const ParticipantMentorUpdateView: React.FunctionComponent = () => {
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const formRef = useRef<HTMLFormElement>()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const [modalOpen, setModalOpen] = useState(false)
    // const [confirmed, setConfirmed] = useState(false)

    const studentForMentorQuery = useStudentForMentorQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })

    const [editStudentMutation, { loading, error }] = useEditStudentMutation({
        update(cache) {
            cache.evict({ fieldName: 'studentForMentor' })
            cache.evict({ fieldName: 'students' })
            cache.evict({ fieldName: 'student' })
        },
    })

    if (studentForMentorQuery.loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (studentForMentorQuery.error || !studentForMentorQuery.data?.student) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <MutationErrorProvider mutationError={error?.message}>
            <Form onRef={formRef} onSubmit={onSubmit}>
                <LanguageHouseParticipantMentorFields student={studentForMentorQuery.data.student} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button type={ButtonType.secondary} disabled={loading} onClick={() => history.goBack()}>
                                {i18n._(`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={loading}>
                                {i18n._(`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
                {renderConfirmModal()}
            </Form>
        </MutationErrorProvider>
    )

    function renderConfirmModal() {
        return (
            <ConfirmModal
                modalOpen={modalOpen}
                title={i18n._('Begeleider wijzigen')}
                message={
                    <Paragraph>
                        {i18n._('Weet je zeker dat je de')} <strong>{i18n._('begeleider')}</strong> {i18n._('van')}{' '}
                        <strong>
                            {studentForMentorQuery.data?.student.person &&
                                NameFormatters.formattedFullname(studentForMentorQuery.data?.student.person)}
                        </strong>{' '}
                        {i18n._('wilt wijzigen?')}
                    </Paragraph>
                }
                confirmButtonLabel={i18n._('Begeleider wijzigen')}
                onClose={() => setModalOpen(false)}
                onConfirm={() => {
                    setModalOpen(false)
                    // await setConfirmed(true)
                    formRef.current?.requestSubmit()
                }}
            />
        )
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<LanguageHouseParticipantMentorFormFields>(e)
        try {
            if (!studentForMentorQuery.data?.student) {
                throw new Error('Could not find student')
            }

            // const input = {
            //     team: formData.team,
            //     mentor: formData.mentor,
            //     person: student.person.id,
            // }

            // const hasMentor = student.mentor
            // const mentorChanged = formData.team !== student.team?.id || formData.mentor !== student.mentor?.id

            // if (hasMentor && mentorChanged && !confirmed) {
            //     setModalOpen(true)
            //     return
            // }

            await editStudentMutation({
                variables: {
                    editStudentInput: {
                        id: studentForMentorQuery.data?.student.id,
                        team: formData.team,
                        mentor: formData.mentor,
                    },
                },
            })

            NotificationsManager.success(
                i18n._(`Begeleider is bijgewerkt`),
                i18n._(`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(
                languageHouseRoutes(organizationSlug).participants.detail(languageHouseParticipantId).data.mentor.detail
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
