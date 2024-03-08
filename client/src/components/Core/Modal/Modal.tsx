import classNames from 'classnames'
import React from 'react'
import { default as ReactModal } from 'react-modal'
import styles from './Modal.module.scss'
import './Modal.scss'

interface Props extends ReactModal.Props {
    big?: boolean
}

const Modal: React.FunctionComponent<Props> = props => {
    const { children, big } = props
    const modalClassNames = classNames(styles.modal, { [styles['is-big']]: big })

    return (
        <ReactModal overlayClassName={styles.overlay} className={modalClassNames} closeTimeoutMS={160} {...props}>
            {children}
        </ReactModal>
    )
}

export default Modal
