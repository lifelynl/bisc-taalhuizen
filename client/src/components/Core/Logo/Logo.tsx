import React from 'react'
import classNames from 'classnames'

import styles from './Logo.module.scss'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'

interface Props {
    className?: string
    text?: string
}

const Logo: React.FunctionComponent<Props> = props => {
    const { className, text } = props
    const containerClassName = classNames(styles.container, className)

    return (
        <div className={containerClassName}>
            <div className={styles['logo-container']}>
                <Icon type={IconType.logoShape} className={styles.logo} />
            </div>
            {text && (
                <div className={styles['text-container']}>
                    <p className={styles['text']}>{text}</p>
                </div>
            )}
        </div>
    )
}

export default Logo
