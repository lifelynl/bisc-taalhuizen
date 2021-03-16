import React from 'react'
import classNames from 'classnames'

import styles from './Icon.module.scss'
import { IconType } from './IconType'
import icons from './icons.json'

interface Props {
    type: IconType
    className?: string
    onClick?: () => void
}

const Icon: React.FunctionComponent<Props> = props => {
    const { type, className, onClick } = props

    return (
        <i
            className={classNames(styles.icon, className)}
            dangerouslySetInnerHTML={{ __html: icons[type] }}
            onClick={() => onClick && onClick()}
        />
    )
}

export default Icon
