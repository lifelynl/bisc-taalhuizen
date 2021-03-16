import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { Validator } from '../../../utils/validators/types'
import styles from './Input.module.scss'

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChangeValue?: (value: string) => void
    validators?: Validator<string | null>[]
    grow?: boolean
}

const Input: React.FunctionComponent<BaseInputProps> = props => {
    const { grow, className, onChange, onBlur, validators, onChangeValue, children } = props
    const input = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)

    return (
        <div
            className={classNames(styles.container, className, {
                [styles.hasErrorMessage]: !!error,
                [styles.grow]: grow,
            })}
        >
            <input
                ref={input}
                {...props}
                className={styles.inputField}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                children={undefined}
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
            {children}
        </div>
    )

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        onChange?.(event)
        onChangeValue?.(value)
    }

    function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        onBlur?.(event)

        validators?.every(validator => {
            const result = validator(value)
            if (result) {
                setError(result)
                input.current?.setCustomValidity(result)
                return false
            }
            setError(result)
            input.current?.setCustomValidity('')
            return true
        })
    }
}

export default Input
