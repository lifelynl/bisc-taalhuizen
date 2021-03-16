import React from 'react'
import classNames from 'classnames'

import styles from './PageTitle.module.scss'

interface Props {
    className?: string
    title: string
    size?: PageTitleSize
}

export enum PageTitleSize {
    default = 'default',
    large = 'large',
}

const PageTitle: React.FunctionComponent<Props> = props => {
    const { className, title, size = PageTitleSize.default } = props
    const titleClassName = classNames(styles.title, className, {
        [styles['is-default']]: size === PageTitleSize.default,
        [styles['is-large']]: size === PageTitleSize.large,
    })
    return <h1 className={titleClassName}>{title}</h1>
}

export default PageTitle
