import React from 'react'
import styles from './Link.module.scss'
import classNames from 'classnames'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
    className?: string
    to?: string
    href?: string
    text: string
    target?: string
}

const Link: React.FunctionComponent<Props> = props => {
    const { to, href, text, target, className } = props
    const linkClassNames = classNames(styles.link, className)
    if (!to) {
        return (
            <a className={linkClassNames} href={href} target={target} rel="noreferrer">
                {text}
            </a>
        )
    }
    return (
        <RouterLink className={linkClassNames} to={to} target={target}>
            <span>{text}</span>
        </RouterLink>
    )
}

export default Link
