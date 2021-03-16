import React from 'react'
import classNames from 'classnames'

import styles from './LabelTag.module.scss'
import Paragraph from '../../Typography/Paragraph'
import capitalize from 'lodash/capitalize'
import { LabelColor } from './types'
export interface Props {
    label: string
    color?: LabelColor // defaults to blue
    className?: string
}

const LabelTag: React.FunctionComponent<Props> = props => {
    const { color = LabelColor.blue, className, label } = props

    const labelClassName = classNames(styles.container, className, {
        [styles[`is${capitalize(color)}`]]: color,
    })

    return (
        <span className={labelClassName}>
            <Paragraph small={true} bold={true} className={classNames(styles.text)}>
                {label}
            </Paragraph>
        </span>
    )
}

export default LabelTag
