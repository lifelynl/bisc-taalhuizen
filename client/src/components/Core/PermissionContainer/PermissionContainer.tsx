import classNames from 'classnames'
import React, { useState } from 'react'
import Checkbox, { CheckboxColor } from '../DataEntry/Checkbox'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import Paragraph from '../Typography/Paragraph'
import styles from './permissionContainer.module.scss'

export enum FontWeight {
    bold = 'bold',
    normal = 'normal',
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    text?: string
    fontWeight: FontWeight
    className?: string
    checkboxColor?: CheckboxColor
    readOnly?: boolean
    defaultChecked?: boolean
}

export const PermissionContainer: React.FC<Props> = props => {
    const { name, text, fontWeight, checkboxColor, className, readOnly, defaultChecked = false } = props
    const [isChecked, setIsChecked] = useState(defaultChecked)
    const containerClassNames = classNames(styles.container, className, {
        [styles.grey]: !isChecked,
        [styles.green]: isChecked,
    })

    if (readOnly) {
        if (isChecked) {
            return (
                <div className={containerClassNames}>
                    <div className={classNames(styles.iconContainer, styles.checked)}>
                        <Icon className={styles.icon} type={IconType.checkmark} />
                    </div>
                    <Paragraph className={styles[`fontweight-${fontWeight}`]}>{text}</Paragraph>
                </div>
            )
        }

        return (
            <div className={containerClassNames}>
                <div className={styles.iconContainer}>
                    <Icon className={styles.icon} type={IconType.close} />
                </div>

                <Paragraph className={styles[`fontweight-${fontWeight}`]}>{text}</Paragraph>
            </div>
        )
    }

    return (
        <div className={containerClassNames}>
            <div className={styles.checkboxContainer}>
                <Checkbox
                    color={checkboxColor}
                    defaultChecked={isChecked}
                    name={name}
                    onChange={() => setIsChecked(!isChecked)}
                />
            </div>
            <Paragraph className={styles[`fontweight-${fontWeight}`]}>{text}</Paragraph>
        </div>
    )
}
