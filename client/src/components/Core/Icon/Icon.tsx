import React from 'react'
import classNames from 'classnames'

import styles from './Icon.module.scss'
import { IconType } from './IconType'
import icons from './icons.json'

export enum IconStyle {
    Enabled = 'Enabled',
    Disabled = 'Disabled',
}

interface Props {
    type: IconType
    className?: string
    onClick?: () => void
    iconStyle?: IconStyle
}

const Icon: React.FunctionComponent<Props> = props => {
    return (
        <i
            className={classNames(styles.icon, props.className, getIconStyleClassName())}
            dangerouslySetInnerHTML={{ __html: icons[props.type] }}
            onClick={() => props.onClick && props.onClick()}
        />
    )

    function getIconStyleClassName() {
        if (props.iconStyle) {
            return styles[`iconStyle${props.iconStyle}`]
        }

        return undefined
    }
}

export default Icon
