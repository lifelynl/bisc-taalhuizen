import classNames from 'classnames'
import React from 'react'
import PageTitle, { PageTitleSize } from '../Core/Text/PageTitle'
import styles from './Headline.module.scss'

interface Props {
    className?: string
    title: string
    TopComponent?: JSX.Element
    spacingType?: SpacingType
}

export enum SpacingType {
    default = 'default',
    small = 'small',
}

const Headline: React.FunctionComponent<Props> = props => {
    const { className, TopComponent, title, spacingType = SpacingType.default } = props
    const containerClassNames = classNames(styles.container, className, {
        [styles[`is-spacing-${spacingType}`]]: !!spacingType,
    })

    return (
        <div className={containerClassNames}>
            {TopComponent && <div className={styles.topComponent}>{TopComponent}</div>}
            <PageTitle className={styles.title} title={title} size={PageTitleSize.default} />
        </div>
    )
}

export default Headline
