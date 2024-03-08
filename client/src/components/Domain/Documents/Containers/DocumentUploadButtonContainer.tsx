import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { useState } from 'react'
import { DocumentUploadModal } from '../Modals/DocumentUploadModal'

interface Props {
    personId: string | undefined
}

export const DocumentUploadButtonContainer = ({ personId }: Props) => {
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            <Button type={ButtonType.primary} icon={IconType.add} onClick={() => setIsVisible(true)}>
                {i18n._(t`Document uploaden`)}
            </Button>
            <Modal isOpen={isVisible && personId !== undefined} onRequestClose={() => setIsVisible(false)}>
                <DocumentUploadModal requestClose={() => setIsVisible(false)} personId={personId} />
            </Modal>
        </>
    )
}
