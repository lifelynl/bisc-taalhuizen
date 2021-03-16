import React from 'react'
import styles from './TableLink.module.scss'
import { Link as RouterLink } from 'react-router-dom'
import classNames from 'classnames'

interface Props {
    className?: string
    to: string
    target?: string
    text: string
}

export const TableLink: React.FunctionComponent<Props> = ({ className, to, text, target }) => {
    const tabnleLinkClassNames = classNames(styles.link, className)
    return (
        <RouterLink className={tabnleLinkClassNames} to={to} target={target}>
            <span>{text}</span>
        </RouterLink>
    )
}
