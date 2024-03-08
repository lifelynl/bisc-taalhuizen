import classNames from 'classnames'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Checkbox.module.scss'

export enum CheckboxColor {
    orange = 'orange',
    green = 'green',
}
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    className?: string
    inputClassName?: string
    color?: CheckboxColor
    label?: string
    inline?: boolean
}

const Checkbox: React.FunctionComponent<Props> = props => {
    const {
        className,
        color = CheckboxColor.orange,
        inputClassName,
        defaultChecked,
        onChange,
        inline,
        ...restProps
    } = props
    const containerClassNames = classNames(styles.container, className, {
        [styles.orange]: color === CheckboxColor.orange,
        [styles.green]: color === CheckboxColor.green,
        [styles.inline]: inline,
    })
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(!!defaultChecked)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultChecked])

    return (
        <label className={containerClassNames}>
            <input
                {...restProps}
                checked={checked}
                onChange={handleOnChange}
                className={classNames(styles.inputField, inputClassName)}
                type="checkbox"
            />
            <Icon className={styles.checkmark} type={IconType.checkmark} />
            {props.label && <span className={styles.label}>{props.label}</span>}
        </label>
    )

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setChecked(e.currentTarget.checked)
        onChange?.(e)
    }
}

export default Checkbox
