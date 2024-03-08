import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { useDeleteParticipationMutation } from 'graphql/v2/generated/graphql'
import React, { useState } from 'react'
import { DeleteLearningNeedReferenceModal } from '../Modals/DeleteLearningNeedReferenceModal'

interface Props {
    onSuccessfullDelete: () => void
    participationId: string
    learningNeedName: string
}

export const DeleteLearningNeedReferenceButtonContainer = (props: Props) => {
    const { participationId } = props
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)

    const [deleteParticipationMutation, { loading }] = useDeleteParticipationMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeeds' })
            cache.evict({ fieldName: 'learningNeed' })
            cache.evict({ fieldName: 'participation' })
            cache.evict({ fieldName: 'participations' })
        },
    })

    return (
        <>
            <Button type={ButtonType.secondary} icon={IconType.delete} onClick={() => setIsVisible(true)}>
                {i18n._(t`Verwijzing verwijderen`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <DeleteLearningNeedReferenceModal
                    onDelete={handleDelete}
                    onClose={() => setIsVisible(false)}
                    loading={loading}
                />
            </Modal>
        </>
    )

    async function handleDelete() {
        const { onSuccessfullDelete } = props

        try {
            await deleteParticipationMutation({
                variables: {
                    input: {
                        id: participationId,
                    },
                },
            })

            NotificationsManager.success(
                i18n._(t`Verwijzing is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            setIsVisible(false)
            onSuccessfullDelete()

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
