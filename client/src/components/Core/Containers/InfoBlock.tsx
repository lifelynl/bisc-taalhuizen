import classnames from 'classnames'
import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './InfoBlock.module.scss'

interface Props {
    type: 'info' | 'warning'
    grow?: boolean
}

export const InfoBlock: React.FC<Props> = ({ children, type, grow }) => {
    const containerClassNames = classnames(styles.container, {
        [styles.Info]: type === 'info',
        [styles.Warning]: type === 'warning',
        [styles.grow]: grow,
    })
    return (
        <div className={containerClassNames}>
            <div className={styles.iconContainer}>
                <Icon className={styles.icon} type={IconType[type]} />
            </div>
            {children}
        </div>
    )
}
