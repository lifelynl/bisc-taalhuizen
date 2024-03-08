import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import React, { useState } from 'react'
import styles from '../../SharedContactMomentDetailFieldset.module.scss'
import Form from 'components/Core/Form/Form'
import { ContactMomentsDetailContainer } from '../../../ContactMomentsDetailContainer/ContactMomentsDetailContainer'
import { Forms } from 'utils/forms'
import Modal from 'components/Core/Modal/Modal'
import { ContactMomentsDeleteModal } from './ContactMomentsDeleteModal'
import { StudentContactMomentFormData, ContactMomentFormFields } from '../../ContactMomentFormFields'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { StudentContactMomentType, useEditStudentContactMomentMutation } from 'graphql/v2/generated/graphql'
import { editStudentContactMomentFieldsMapper } from 'components/Domain/Files/mappers/contactMomentFormDataMapper'

interface Props {
    defaultValues: StudentContactMomentType
    onClickCancel: () => void
    handleSuccess: (editedContactMomentId: string) => void
    onDelete: () => void
}

export const ContactMomentsDetailUpdateForm: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { defaultValues, onClickCancel, handleSuccess, onDelete } = props
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const [editStudentContactMomentMutation, { loading, error }] = useEditStudentContactMomentMutation({
        update(cache) {
            cache.evict({ fieldName: 'studentContactMoments' })
        },
    })

    return (
        <MutationErrorProvider mutationError={error?.message}>
            <Form onSubmit={handleEdit}>{renderFormFields()}</Form>
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <ContactMomentsDeleteModal
                    data={defaultValues}
                    onClose={() => setModalIsVisible(false)}
                    onSuccess={onDelete}
                />
            </Modal>
        </MutationErrorProvider>
    )

    function renderFormFields() {
        return (
            <ContactMomentsDetailContainer type={defaultValues.type}>
                <ContactMomentFormFields defaultValues={defaultValues} />
                <div className={styles.buttons}>
                    <div className={styles.leftButtonsContainer}>
                        <Button
                            className={styles.button}
                            icon={IconType.delete}
                            type={ButtonType.secondary}
                            onClick={() => setModalIsVisible(true)}
                        >
                            {i18n._(t`Verwijderen`)}
                        </Button>
                    </div>
                    <div className={styles.rightButtonsContainer}>
                        <Button className={styles.button} type={ButtonType.secondary} onClick={onClickCancel}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} className={styles.button}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </div>
                </div>
            </ContactMomentsDetailContainer>
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<StudentContactMomentFormData>(e)
        const input = editStudentContactMomentFieldsMapper(formData, defaultValues.id)

        try {
            await editStudentContactMomentMutation({
                variables: {
                    input,
                },
            })

            handleSuccess(defaultValues.id)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
