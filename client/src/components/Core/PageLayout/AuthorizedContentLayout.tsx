import React from 'react'
import classNames from 'classnames'

import styles from './AuthorizedContentLayout.module.scss'

interface Props {
    className?: string
    NavigationComponent: JSX.Element
}

const AuthorizedContentLayout: React.FunctionComponent<Props> = ({ NavigationComponent, className, children }) => {
    const containerClassName = classNames(styles.container, className)

    return (
        <div className={containerClassName}>
            <div className={styles.navigationContainer}>{NavigationComponent}</div>
            <div className={styles.contentContainer}>{children}</div>
        </div>
    )
}

export default AuthorizedContentLayout
