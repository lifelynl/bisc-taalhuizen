import React from 'react'
import classNames from 'classnames'
import { Location } from 'history'
import { Link } from 'react-router-dom'

import styles from './Breadcrumbs.module.scss'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'

interface BreadcrumbItem {
    label: string
    to?: string | Location
}

interface Props {
    className?: string
    breadcrumbItems: BreadcrumbItem[]
}

export const Breadcrumbs: React.FunctionComponent<Props> = props => {
    const { className, breadcrumbItems } = props
    const containerClassNames = classNames(styles.container, className)

    return <div className={containerClassNames}>{breadcrumbItems.map(renderBreadcrumb)}</div>

    function renderBreadcrumb(item: BreadcrumbItem, index: number) {
        const { label, to } = item

        if (!to) {
            return (
                <div key={`breadcrumb-${index}`} className={styles.breadcrumb}>
                    <span className={styles.label}>{label}</span>
                    <Icon className={styles.icon} type={IconType.breadcrumb} />
                </div>
            )
        }

        return (
            <Link key={`breadcrumb-${index}`} to={to} className={styles.breadcrumb}>
                <span className={styles.label}>{label}</span>
                <Icon className={styles.icon} type={IconType.breadcrumb} />
            </Link>
        )
    }
}
