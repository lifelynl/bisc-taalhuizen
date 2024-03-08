import React from 'react'
import classNames from 'classnames'
import styles from './PageTitle.module.scss'
import { SuffixVariant } from 'components/Chrome/Headline'

interface Props {
    className?: string
    title: string
    titleSuffix?: string
    suffixVariant?: SuffixVariant
    size?: PageTitleSize
    lighter?: boolean
}

export enum PageTitleSize {
    default = 'default',
    large = 'large',
}

const PageTitle: React.FunctionComponent<Props> = props => {
    const { className, title, size = PageTitleSize.default, suffixVariant, titleSuffix, lighter } = props
    const titleClassName = classNames(styles.title, className, {
        [styles['is-default']]: size === PageTitleSize.default,
        [styles['is-large']]: size === PageTitleSize.large,
        [styles.lighter]: lighter,
    })

    return (
        <h1 className={titleClassName}>
            {title}
            {titleSuffix && (
                <span className={SuffixVariant.light === suffixVariant ? styles.lightSuffix : styles.suffix}>
                    &nbsp;{titleSuffix}
                </span>
            )}
        </h1>
    )
}

export default PageTitle
