import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import PageTitle, { PageTitleSize } from '../Text/PageTitle'
import styles from './ContentGreetingPageLayout.module.scss'

interface Props {
    className?: string
    ContentComponent: JSX.Element
    TopComponent?: JSX.Element
    greeting?: string
}

const ContentGreetingPageLayout: React.FunctionComponent<Props> = props => {
    const { greeting, ContentComponent, className, TopComponent } = props
    const containerClassName = classNames(styles.container, className)

    return (
        <div className={containerClassName}>
            <div className={styles.contentContainer}>
                {TopComponent && <div className={styles.topComponent}>{TopComponent}</div>}
                {ContentComponent}
            </div>
            <div className={styles.greetingContainer}>
                {greeting && <PageTitle title={greeting} size={PageTitleSize.large} className={styles.greeting} />}
                <Icon type={IconType.providers} className={styles.providers} />
                <Icon type={IconType.profile} className={styles.profile} />
                <Icon type={IconType.attendee} className={styles.attendee} />
                <Icon type={IconType.shape} className={styles.shape} />
            </div>
        </div>
    )
}

export default ContentGreetingPageLayout
