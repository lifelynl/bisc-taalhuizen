import React from 'react'
import classNames from 'classnames'
import styles from './MainNavigationItem.module.scss'
import Icon from '../../Icon/Icon'
import { IconType } from '../../Icon/IconType'
import { Link } from 'react-router-dom'
import { OrganizationTypeEnum } from 'graphql/v2/generated/graphql'

interface Props {
    className?: string
    label: string
    icon: IconType
    to?: string
    onClick?: () => void
    active?: boolean
    organizationType: OrganizationTypeEnum | string
}

const MainNavigationItem: React.FunctionComponent<Props> = props => {
    const { className, label, to, organizationType: type, icon, active, onClick } = props
    const container = classNames(styles.container, className, {
        [styles['is-bisc']]: type === OrganizationTypeEnum.Bisc,
        [styles['is-languageHouse']]: type === OrganizationTypeEnum.LanguageHouse,
        [styles['is-provider']]: type === OrganizationTypeEnum.Provider,
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
