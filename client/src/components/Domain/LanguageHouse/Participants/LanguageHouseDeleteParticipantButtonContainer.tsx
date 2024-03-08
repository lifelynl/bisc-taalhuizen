import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { useState } from 'react'
import { DeleteParticipantModal } from './DeleteParticipantsModal'

interface Props {
    studentId: string
    studentName: string
    onSuccessDelete: () => void
}

export const LanguageHouseDeleteParticipantButtonContainer: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)
    const { onSuccessDelete, studentId, studentName } = props

    return (
        <>
            <Button type={ButtonType.quaternary} icon={IconType.delete} onClick={() => setIsVisible(true)}>
                {i18n._(t`Deelnemer verwijderen`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <DeleteParticipantModal
                    studentId={studentId}
                    studentName={studentName}
                    onDeleteSuccess={handleOnSuccess}
                    onClose={() => setIsVisible(false)}
                />
            </Modal>
        </>
    )

    function handleOnSuccess() {
        setIsVisible(false)
        onSuccessDelete()
    }
}
