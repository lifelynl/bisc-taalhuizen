import React from 'react'
import styles from './Link.module.scss'
import classNames from 'classnames'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
    className?: string
    to?: string
    href?: string
    target?: string
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    isInline?: boolean
    tabIndex?: number
}

const Link: React.FunctionComponent<Props> = props => {
    const { to, href, children, target, className, onClick, isInline, tabIndex } = props
    const linkClassNames = classNames(styles.link, className, {
        [styles.isInline]: isInline,
    })
    if (!to) {
        return (
            <a
                className={linkClassNames}
                href={href}
                target={target}
                rel="noreferrer"
                onClick={onClick}
                tabIndex={tabIndex}
            >
                {children}
            </a>
        )
    }
    return (
        <RouterLink className={linkClassNames} to={to} target={target}>
            {children}
        </RouterLink>
    )
}

export default Link
