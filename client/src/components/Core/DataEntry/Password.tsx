import classNames from 'classnames'
import React, { useState } from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import Input, { BaseInputProps } from './Input'
import styles from './Password.module.scss'

interface Props extends Omit<BaseInputProps, 'type'> {}

const Password: React.FunctionComponent<Props> = props => {
    const { disabled } = props
    const [visible, setVisible] = useState<boolean>(false)
    const [inputType, setInputType] = useState<string>('password')

    return (
        <Input type={inputType} {...props}>
            <Icon
                className={classNames(styles.eye, {
                    [styles.disabledEye]: !!disabled,
                })}
                type={getType(visible)}
                onClick={() => handlePasswordVisibility(visible)}
            />
        </Input>
    )

    function getType(state: boolean): IconType {
        const iconType = state ? IconType.openEye : IconType.closedEye
        return iconType
    }

    function handlePasswordVisibility(state: boolean) {
        const type = state ? 'password' : 'text'
        if (!disabled) {
            setVisible(!visible)
            setInputType(type)
        }
    }
}

export default Password
