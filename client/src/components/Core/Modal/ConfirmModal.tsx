import React from 'react'
import Column from 'components/Core/Layout/Column/Column'
import Modal from 'components/Core/Modal/Modal'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import Row from '../Layout/Row/Row'
import Button, { ButtonType } from '../Button/Button'
import { useLingui } from '@lingui/react'
import isString from 'lodash/isString'

interface Props {
    modalOpen: boolean
    title: string
    message: string | JSX.Element
    confirmButtonLabel: string
    danger?: boolean
    loading?: boolean
    onClose: () => void
    onConfirm: () => void
}

export const ConfirmModal: React.FunctionComponent<Props> = props => {
    const { modalOpen, onClose } = props
    const { i18n } = useLingui()

    return (
        <Modal isOpen={modalOpen} onRequestClose={onClose}>
            <ModalView onClose={onClose} ContentComponent={renderContent()} BottomComponent={renderActions()} />
        </Modal>
    )

    function renderContent() {
        const { title, message } = props

        return (
            <Column spacing={6}>
                <SectionTitle title={title} heading="H4" />
                {isString(message) ? <Paragraph>{message}</Paragraph> : message}
            </Column>
        )
    }

    function renderActions() {
        const { danger, confirmButtonLabel, loading, onConfirm } = props

        return (
            <Row justifyContent="flex-end">
                <Button type={ButtonType.secondary} onClick={onClose} disabled={loading}>
                    {i18n._('Annuleren')}
                </Button>
                <Button danger={danger} onClick={onConfirm} loading={loading}>
                    {confirmButtonLabel}
                </Button>
            </Row>
        )
    }
}
