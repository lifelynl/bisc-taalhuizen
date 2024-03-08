import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { DeleteModal } from 'components/Core/Modal/DeleteModal'
import { DocumentsQuery, useDeleteDocumentMutation } from 'graphql/v2/generated/graphql'

interface Props {
    onClose: () => void
    document: DocumentsQuery['documents']['nodes'][0]
}

export const DocumentDeleteModal = (props: Props) => {
    const { i18n } = useLingui()
    const { onClose, document } = props

    const [deleteDocumentMutation, { loading }] = useDeleteDocumentMutation({
        update(cache) {
            cache.evict({ fieldName: 'documents' })
        },
    })

    return (
        <DeleteModal
            onClose={onClose}
            handleDelete={handleDelete}
            title={i18n._(t`Document verwijderen`)}
            text={i18n._(t`Weet je zeker dat je het volgende document ${document.file.name} wilt verwijderen?`)}
            loading={loading}
        />
    )

    async function handleDelete() {
        try {
            await deleteDocumentMutation({
                variables: {
                    input: {
                        document: props.document.id,
                    },
                },
            })

            NotificationsManager.success(
                i18n._(t`Document is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )
            onClose()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
