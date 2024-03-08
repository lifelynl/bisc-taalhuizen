import styles from './IconToggle.module.scss'
import React, { useState } from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import classNames from 'classnames'

interface Props {
    icon: IconType
    className?: string
    defaultToggled?: boolean
    onToggle?: (toggled: boolean) => void
}

export const IconToggle: React.FunctionComponent<Props> = props => {
    const { icon, className, onToggle, defaultToggled } = props
    const [toggled, setToggled] = useState(!!defaultToggled)

    return (
        <Icon
            onClick={() => {
                onToggle?.(!toggled)
                setToggled(!toggled)
            }}
            type={icon}
            className={classNames(styles.iconToggle, className, {
                [styles.toggled]: toggled,
            })}
        />
    )
}
