import classNames from 'classnames'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React from 'react'
import PageTitle, { PageTitleSize } from '../Core/Text/PageTitle'
import styles from './Headline.module.scss'

interface Props {
    className?: string
    title: string
    subtitle?: string
    underTitle?: string
    titleSuffix?: string
    suffixVariant?: SuffixVariant
    TopComponent?: JSX.Element
    spacingType?: SpacingType
}

export enum SpacingType {
    default = 'default',
    small = 'small',
}

export enum SuffixVariant {
    default = 'default',
    light = 'light',
}

const Headline: React.FunctionComponent<Props> = props => {
    const {
        className,
        TopComponent,
        title,
        subtitle,
        spacingType = SpacingType.default,
        titleSuffix,
        suffixVariant,
        underTitle,
    } = props
    const containerClassNames = classNames(styles.container, className, {
        [styles[`is-spacing-${spacingType}`]]: !!spacingType,
        [styles[`is-under-title`]]: !!underTitle,
    })

    return (
        <div className={containerClassNames}>
            {TopComponent && <div className={styles.topComponent}>{TopComponent}</div>}
            {subtitle && <SectionTitle title={subtitle} heading={'H6'} />}
            <PageTitle
                className={underTitle ? styles.withUndertitle : styles.title}
                title={title}
                size={PageTitleSize.default}
                titleSuffix={titleSuffix}
                suffixVariant={suffixVariant}
            />
            {underTitle && <SectionTitle title={underTitle} heading={'H6'} />}
        </div>
    )
}

export default Headline
