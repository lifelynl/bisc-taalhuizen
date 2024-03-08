import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { DeleteModal } from 'components/Core/Modal/DeleteModal'
import { useDeleteTestResultMutation } from 'graphql/v2/generated/graphql'
import React from 'react'

interface Props {
    onRequestClose: () => void
    onSuccess?: () => void
    testResultId: string
}

export const ParticipantsLearningNeedsTestDeleteModal: React.FC<Props> = (props: Props) => {
    const { onRequestClose: onClose, testResultId } = props
    const { i18n } = useLingui()

    const [deleteTestResultMutation, { loading }] = useDeleteTestResultMutation({
        update(cache) {
            cache.evict({ fieldName: 'participation' })
            cache.evict({ fieldName: 'participations' })
        },
    })

    return (
        <DeleteModal
            onClose={onClose}
            handleDelete={onSubmit}
            title={i18n._(t`Resultaat verwijderen`)}
            text={i18n._(t`Weet je zeker dat je het resultaat wilt verwijderen?`)}
            loading={loading}
        />
    )

    async function onSubmit() {
        try {
            await deleteTestResultMutation({
                variables: {
                    input: {
                        id: testResultId,
                    },
                },
            })

            NotificationsManager.success(
                i18n._(t`Resultaat is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            if (props.onSuccess) {
                props.onSuccess()
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
