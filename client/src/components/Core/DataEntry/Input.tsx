import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { Validator } from '../../../utils/validators/types'
import { MutationErrorContext } from '../MutationErrorProvider/MutationErrorProvider'
import styles from './Input.module.scss'

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChangeValue?: (value: string) => void
    validators?: Validator<string | null>[]
    grow?: boolean
    errorPath?: string
}

const Input: React.FunctionComponent<BaseInputProps> = props => {
    const { grow, className, validators, onChange, onChangeValue, onBlur, children, errorPath, ...restProps } = props
    const input = useRef<HTMLInputElement>(null)
    const [localError, setLocalError] = useState<string | null>(null)
    // NOTE: Removes props that are not available in a native input

    return (
        <MutationErrorContext.Consumer>
            {({ findAndConsumeFieldErrors }) => {
                const _errorPath = errorPath || restProps.name
                const mutationErrors = _errorPath ? findAndConsumeFieldErrors(_errorPath) : []
                const errorMessages = mutationErrors.map(e => e.message)

                if (localError) {
                    errorMessages.push(localError)
                }

                return (
                    <div
                        className={classNames(styles.container, className, {
                            [styles.hasErrorMessage]: errorMessages.length > 0,
                            [styles.grow]: grow,
                        })}
                    >
                        {restProps.readOnly ? (
                            <p>{restProps.defaultValue}</p>
                        ) : (
                            <input
                                ref={input}
                                {...restProps}
                                className={styles.inputField}
                                onChange={handleOnChange}
                                onBlur={handleOnBlur}
                                children={undefined}
                            />
                        )}
                        {errorMessages.length > 0 &&
                            errorMessages.map((errorMessage, index) => (
                                <p key={index} className={styles.errorMessage}>
                                    {errorMessage}
                                </p>
                            ))}
                        {children}
                    </div>
                )
            }}
        </MutationErrorContext.Consumer>
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
                setLocalError(result)
                input.current?.setCustomValidity(result)
                return false
            }
            setLocalError(result)
            input.current?.setCustomValidity('')
            return true
        })
    }
}

export default Input
