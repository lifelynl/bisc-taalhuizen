import React from 'react'
import classNames from 'classnames'

import styles from './ContentTag.module.scss'
import capitalize from 'lodash/capitalize'

interface Props {
    color?: TagColor // defaults to grey
    className?: string
}

export enum TagColor {
    grey = 'grey',
    red = 'red',
    yellow = 'yellow',
    blue = 'blue',
    purple = 'purple',
}

const ContentTag: React.FunctionComponent<Props> = props => {
    const { color = TagColor.grey, className, children } = props

    const labelClassName = classNames(styles.container, className, {
        [styles[`is${capitalize(color)}`]]: color,
    })

    return <span className={labelClassName}>{children}</span>
}

export default ContentTag
