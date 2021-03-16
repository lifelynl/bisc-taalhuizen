import React from 'react'
import { default as ReactModal } from 'react-modal'
import styles from './Modal.module.scss'
import './Modal.scss'

interface Props extends ReactModal.Props {}
const Modal: React.FunctionComponent<Props> = props => {
    const { children } = props

    return (
        <ReactModal overlayClassName={styles.overlay} className={styles.modal} closeTimeoutMS={160} {...props}>
            {children}
        </ReactModal>
    )
}

export default Modal
