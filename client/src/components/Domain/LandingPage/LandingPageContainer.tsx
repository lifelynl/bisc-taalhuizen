import React from 'react'
import styles from './LandingPageContainer.module.scss'
import classNames from 'classnames'

interface Props {
    className?: string
}

export const LandingPageContainer: React.FunctionComponent<Props> = ({ className, children }) => {
    return <div className={classNames(styles.container, className)}>{children}</div>
}
