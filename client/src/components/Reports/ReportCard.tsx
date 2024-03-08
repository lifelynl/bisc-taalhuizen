import classNames from 'classnames'
import React from 'react'
import styles from './ReportCard.module.scss'

interface Props {
    className?: string
    title: string
    description: string
    ActionButton?: JSX.Element
    backgroundType?: ReportCardBackgroundType
}

export enum ReportCardBackgroundType {
    blue = 'blue',
    red = 'red',
    orange = 'orange',
}

const ReportCard: React.FunctionComponent<Props> = props => {
    const { className, ActionButton, title, description, backgroundType = ReportCardBackgroundType.blue } = props
    const containerClassNames = classNames(
        styles.container,
        {
            [styles[backgroundType]]: true,
        },
        className
    )

    return (
        <div className={containerClassNames}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <div className={styles.actionContainer}>{ActionButton}</div>
        </div>
    )
}

export default ReportCard
