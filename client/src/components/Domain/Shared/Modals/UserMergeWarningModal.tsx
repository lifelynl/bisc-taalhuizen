import { useLingui } from '@lingui/react'
import { ConfirmModal } from 'components/Core/Modal/ConfirmModal'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    onConfirm: () => void
    onClose: () => void
    loading: boolean
    newEmail: string
    open: boolean
}

export const UserMergeWarningModal: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { loading, onConfirm, onClose, newEmail, open } = props

    const message1 = i18n._(
        `Als je dit verzoek accepteert, gebruik je vanaf nu de inloggegevens behorend bij het account met e-mailadres `
    )
    const message2 = i18n._(
        `. Let op, accepteer dit verzoek alleen wanneer dit de bedoeling is en je hierdoor geen toegang tot je account verliest.`
    )

    return (
        <ConfirmModal
            modalOpen={open}
            title={i18n._('Verzoek tot samenvoegen')}
            message={
                <Paragraph>
                    {message1}
                    <strong>{newEmail}</strong>
                    {message2}
                </Paragraph>
            }
            onClose={onClose}
            onConfirm={onConfirm}
            loading={loading}
            confirmButtonLabel={i18n._('Samenvoegen')}
        />
    )
}
