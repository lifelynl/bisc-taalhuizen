import styles from './TableLink.module.scss'
import { Link as RouterLink } from 'react-router-dom'
import classNames from 'classnames'
import { Location } from 'history'

interface Props<T> {
    className?: string
    to?: string | Location<T>
    onClick?: () => void
    target?: string
    href?: string
    text: string
}

export const TableLink = <T extends unknown>({ className, onClick, to, text, target, href }: Props<T>) => {
    const tableLinkClassNames = classNames(styles.link, className)

    if (!to) {
        return (
            <a href={href} className={tableLinkClassNames} onClick={onClick} target={target}>
                <span>{text}</span>
            </a>
        )
    }

    return (
        <RouterLink href={href} className={tableLinkClassNames} to={to} onClick={onClick} target={target}>
            <span>{text}</span>
        </RouterLink>
    )
}
