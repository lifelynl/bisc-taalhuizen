import React from 'react'
import classNames from 'classnames'
import styles from './MainNavigationItem.module.scss'
import { MainNavigationType } from './types'
import Icon from '../../Icon/Icon'
import { IconType } from '../../Icon/IconType'
import { Link } from 'react-router-dom'

interface Props {
    className?: string
    label: string
    icon: IconType
    to?: string
    onClick?: () => void
    active?: boolean
    type: MainNavigationType | string
}

const MainNavigationItem: React.FunctionComponent<Props> = props => {
    const { className, label, to, type, icon, active, onClick } = props
    const container = classNames(styles.container, className, {
        [styles['is-bisc']]: type === MainNavigationType.bisc,
        [styles['is-aanbieder']]: type === MainNavigationType.taalhuis,
        [styles['is-taalhuis']]: type === MainNavigationType.aanbieder,
        [styles['is-active']]: active,
    })

    if (!to) {
        return (
            <button className={container} onClick={onClick}>
                <Icon type={icon} className={styles.icon} />
                <p className={styles.label}>{label}</p>
            </button>
        )
    }

    return (
        <Link to={to} className={container} onClick={onClick}>
            <Icon type={icon} className={styles.icon} />
            <p className={styles.label}>{label}</p>
        </Link>
    )
}

export default MainNavigationItem
