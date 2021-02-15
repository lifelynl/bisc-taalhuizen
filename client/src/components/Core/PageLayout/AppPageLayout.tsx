import React from 'react'
import classNames from 'classnames'
import styles from './AppPageLayout.module.scss'

interface Props {
    className?: string
    NavigationComponent: JSX.Element
    ContentComponent: JSX.Element
}

const ContentGreetingPageLayout: React.FunctionComponent<Props> = props => {
    const { ContentComponent, NavigationComponent, className } = props
    const containerClassName = classNames(styles.container, className)

    return (
        <div className={containerClassName}>
            <div className={styles.navigationContainer}>{NavigationComponent}</div>
            <div className={styles.contentContainer}>{ContentComponent}</div>
        </div>
    )
}

export default ContentGreetingPageLayout
