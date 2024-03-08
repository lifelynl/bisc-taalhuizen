import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { DeleteModal } from 'components/Core/Modal/DeleteModal'
import { StudentContactMomentType, useDeleteStudentContactMomentMutation } from 'graphql/v2/generated/graphql'

interface Props {
    onClose: () => void
    data: StudentContactMomentType
    onSuccess: () => void
}

export const ContactMomentsDeleteModal: React.FC<Props> = ({ data, onClose, onSuccess }) => {
    const { i18n } = useLingui()
    const [deleteStudentContactMomentMutation, { loading }] = useDeleteStudentContactMomentMutation({
        update(cache) {
            cache.evict({ fieldName: 'studentContactMoments' })
        },
    })

    return (
        <DeleteModal
            onClose={onClose}
            handleDelete={handleDelete}
            title={i18n._(t`Gebeurtenis verwijderen`)}
            text={i18n._(t`
        Weet je zeker dat je de gebeurtenis wilt verwijderen?`)}
            loading={loading}
        />
    )

    async function handleDelete() {
        try {
            await deleteStudentContactMomentMutation({
                variables: {
                    input: {
                        id: data.id,
                    },
                },
            })

            onClose()
            onSuccess()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
