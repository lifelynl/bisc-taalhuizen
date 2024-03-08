import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { useState } from 'react'
import { DeleteParticipationModal } from '../Modals/DeleteParticipationModal'

interface Props {
    onSuccessDelete: () => void
}

export const DeleteParticipationButtonContainer: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)
    const { onSuccessDelete } = props

    return (
        <>
            <Button type={ButtonType.secondary} danger={true} icon={IconType.delete} onClick={() => setIsVisible(true)}>
                {i18n._(t`Deelname verwijderen`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <DeleteParticipationModal onDeleteSuccess={handleOnSuccess} onClose={() => setIsVisible(false)} />
            </Modal>
        </>
    )

    function handleOnSuccess() {
        setIsVisible(false)
        onSuccessDelete()
    }
}
