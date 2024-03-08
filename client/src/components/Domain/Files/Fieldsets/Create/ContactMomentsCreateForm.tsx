import React from 'react'
import { t } from '@lingui/macro'
import Button, { ButtonType } from 'components/Core/Button/Button'
import styles from '../SharedContactMomentDetailFieldset.module.scss'
import Row from 'components/Core/Layout/Row/Row'
import classNames from 'classnames'
import Form from 'components/Core/Form/Form'
import { ContactMomentsDetailContainer } from '../../ContactMomentsDetailContainer/ContactMomentsDetailContainer'
import { Forms } from 'utils/forms'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { StudentContactMomentFormData, ContactMomentFormFields } from '../ContactMomentFormFields'
import { useCreateStudentContactMomentMutation } from 'graphql/v2/generated/graphql'
import { createStudentContactMomentFieldsMapper } from '../../mappers/contactMomentFormDataMapper'
import { useLingui } from '@lingui/react'

interface Props {
    onClickCancel: () => void
    handleSuccess: (newContactMomentId?: string) => void
    studentId: string
}

export const ContactMomentsCreateForm: React.FC<Props> = ({ onClickCancel, handleSuccess, studentId }) => {
    const { i18n } = useLingui()
    const [createStudentContactMomentMutation, { loading, error }] = useCreateStudentContactMomentMutation({
        update(cache) {
            cache.evict({ fieldName: 'studentContactMoments' })
        },
    })

    return (
        <MutationErrorProvider mutationError={error?.message}>
            <Form onSubmit={handleCreate}>{renderFormFields()}</Form>
        </MutationErrorProvider>
    )

    function renderFormFields() {
        return (
            <ContactMomentsDetailContainer type={'default'}>
                <ContactMomentFormFields />
                <div className={classNames(styles.buttons, styles.createButtons)}>
                    <Row justifyContent="flex-end">
                        <Button
                            disabled={loading}
                            className={styles.button}
                            type={ButtonType.secondary}
                            onClick={onClickCancel}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} className={styles.button}>
                            {i18n._(t`Gebeurtenis toevoegen`)}
                        </Button>
                    </Row>
                </div>
            </ContactMomentsDetailContainer>
        )
    }

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<StudentContactMomentFormData>(e)
        const input = createStudentContactMomentFieldsMapper(formData, studentId)

        try {
            const result = await createStudentContactMomentMutation({
                variables: {
                    input,
                },
            })

            handleSuccess(result.data?.createStudentContactMoment.id)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
