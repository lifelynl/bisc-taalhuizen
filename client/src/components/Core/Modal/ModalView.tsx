import classNames, { Value as ClassValue } from 'classnames'
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
    title?: string
    ContentComponent: JSX.Element
    BottomComponent?: JSX.Element
}

const ModalView: React.FunctionComponent<Props> = props => {
    const { BottomComponent, ContentComponent, className, onClose, title } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            {title && <h1 className={styles.title}>{title}</h1>}
            <div className={styles.contentContainer}>{ContentComponent}</div>
            <HorizontalRule spacingDisabled={true} />
            {BottomComponent && (
                <div className={styles.footerContainer}>
                    <Row>{BottomComponent}</Row>
                </div>
            )}
            <div className={styles.close}>
                <Button onClick={onClose} type={ButtonType.secondary}>
                    <Icon type={IconType.close} />
                </Button>
            </div>
        </div>
    )
}

export default ModalView
