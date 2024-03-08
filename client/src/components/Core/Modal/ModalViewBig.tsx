import classNames, { Value as ClassValue } from 'classnames'
import React from 'react'
import Button, { ButtonType } from '../Button/Button'
import HorizontalRule from '../HorizontalRule/HorizontalRule'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './ModalViewBig.module.scss'

interface Props {
    className?: ClassValue
    title?: string
    onClose: () => void
    ContentComponent: JSX.Element
    BottomComponent?: JSX.Element
}

export const ModalViewBig: React.FunctionComponent<Props> = props => {
    const { BottomComponent, ContentComponent, className, onClose, title } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <div className={styles.inner}>
                {title && <h1 className={styles.title}>{title}</h1>}
                <div className={styles.contentContainer}>{ContentComponent}</div>
                <HorizontalRule spacingDisabled={true} />
                {BottomComponent && <div className={styles.footerContainer}>{BottomComponent}</div>}
                <div className={styles.close}>
                    <Button onClick={onClose} type={ButtonType.secondary}>
                        <Icon type={IconType.close} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
