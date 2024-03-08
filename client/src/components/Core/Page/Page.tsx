import classNames from 'classnames'
import React from 'react'
import styles from './Page.module.scss'

interface Props {
    className?: string
}

export const Page: React.FunctionComponent<Props> = props => {
    const { children, className } = props
    const containerClassNames = classNames(styles.container, className)

    return <div className={containerClassNames}>{children}</div>
}
