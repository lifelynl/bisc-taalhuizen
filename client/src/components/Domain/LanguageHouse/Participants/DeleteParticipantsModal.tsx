import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { DeleteModal } from 'components/Core/Modal/DeleteModal'
import { useDeleteStudentMutation } from 'graphql/v2/generated/graphql'

interface Props {
    studentId: string
    studentName: string
    onClose: () => void
    onDelete?: () => void
    onDeleteSuccess: () => void
}

export const DeleteParticipantModal: React.FC<Props> = props => {
    const { i18n } = useLingui()

    const { onClose, onDeleteSuccess, studentName, studentId } = props

    const [deleteStudentMutation, { loading }] = useDeleteStudentMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeed' })
            cache.evict({ fieldName: 'learningNeeds' })
            cache.evict({ fieldName: 'students' })
        },
    })

    return (
        <DeleteModal
            onClose={onClose}
            handleDelete={handleDelete}
            title={i18n._(t`Deelnemer verwijderen`)}
            text={i18n._(
                t`Weet je zeker dat je deelnemer ${studentName} wilt verwijderen? 
                Alle leervragen, verwijzingen, dossier onderdelen en documenten van 
                deze deelnemer zullen ook verwijderd worden.`
            )}
            loading={loading}
        />
    )

    async function handleDelete() {
        try {
            await deleteStudentMutation({ variables: { input: { id: studentId } } })

            NotificationsManager.success(
                i18n._(t`Deelname is verwijderd`),
                i18n._(t`Je wordt doorgestuurd naar het overzicht`)
            )

            onDeleteSuccess()
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                // eslint-disable-next-line no-console
                console.error(error)
            }
        }
    }
}
