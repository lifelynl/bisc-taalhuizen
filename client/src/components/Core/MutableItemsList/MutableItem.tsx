import classNames from 'classnames'
import React from 'react'
import Button, { ButtonType } from '../Button/Button'
import { IconType } from '../Icon/IconType'
import styles from './MutableItem.module.scss'
interface Props {
    className?: string
    onDelete?: () => void
}

export const MutableItem: React.FunctionComponent<Props> = props => {
    const { className, children, onDelete } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <span className={styles.text}>{children}</span>
            <Button
                className={styles.deleteButton}
                icon={IconType.close}
                onClick={onDelete}
                type={ButtonType.secondary}
            />
        </div>
    )
}
