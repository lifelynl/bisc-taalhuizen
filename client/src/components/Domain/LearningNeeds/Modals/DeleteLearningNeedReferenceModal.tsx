import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DeleteModal } from 'components/Core/Modal/DeleteModal'

interface Props {
    onClose: () => void
    onDelete: () => void
    loading: boolean
}

export const DeleteLearningNeedReferenceModal = (props: Props) => {
    const { i18n } = useLingui()
    const { onClose, loading, onDelete } = props

    return (
        <DeleteModal
            onClose={onClose}
            handleDelete={onDelete}
            title={i18n._(t`Verwijzing verwijderen`)}
            text={i18n._(t`
                Weet je zeker dat je de verwijzing wilt verwijderen?`)}
            loading={loading}
        />
    )
}
