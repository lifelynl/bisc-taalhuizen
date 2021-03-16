import classNames from 'classnames'
import { ClassValue } from 'classnames/types'
import React from 'react'
import Button, { ButtonType } from '../Button/Button'
import HorizontalRule from '../HorizontalRule/HorizontalRule'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import Row from '../Layout/Row/Row'
import styles from './ModalView.module.scss'

interface Props {
    className?: ClassValue
    onClose: () => void
    ContentComponent: JSX.Element
    BottomComponent?: JSX.Element
}

const DeleteModal: React.FunctionComponent<Props> = props => {
    const { BottomComponent, ContentComponent, className, onClose } = props
    const containerClassNames = classNames(styles.container, className)

    const handleOnClose = () => {
        onClose()
    }

    return (
        <div className={containerClassNames}>
            <div className={styles.contentContainer}>{ContentComponent}</div>
            <HorizontalRule spacingDisabled={true} />
            {BottomComponent && (
                <div className={styles.footerContainer}>
                    <Row>{BottomComponent}</Row>
                </div>
            )}
            <div className={styles.close}>
                <Button onClick={handleOnClose} type={ButtonType.secondary}>
                    <Icon type={IconType.close} />
                </Button>
            </div>
        </div>
    )
}

export default DeleteModal
