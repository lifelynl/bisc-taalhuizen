import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Validator } from '../../../utils/validators/types'
import styles from './TextArea.module.scss'

export interface BaseInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    onChangeValue?: (value: string) => void
    validators?: Validator<string | null>[]
    grow?: boolean
}

const TextArea: React.FunctionComponent<BaseInputProps> = props => {
    const { grow, className, onChange, onBlur, validators, onChangeValue, children } = props
    const textarea = useRef<HTMLTextAreaElement>(null)
    const grower = useRef<HTMLDivElement>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const textArea = textarea.current
        const setHeight = () => {
            if(!grower.current || !textArea) {
                return
            }
            grower.current.dataset.replicatedValue = textArea.value
        }
        textarea.current?.addEventListener("input", setHeight)
        return () => {
            textArea?.removeEventListener("input", setHeight)
        }
    }, [])

    return (
        <div
            className={classNames(styles.container, className, {
                [styles.hasErrorMessage]: !!error,
                [styles.grow]: grow,
            })}
        >
            <div className={styles['grow-wrap']} ref={grower}>
                <textarea
                    ref={textarea}
                    {...props}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    className={styles.inputField}
                    children={undefined}
                />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}
            {children}
        </div>
    )

    function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.currentTarget.value
        onChange?.(event)
        onChangeValue?.(value)
    }

    function handleOnBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
        const value = event.currentTarget.value
        onBlur?.(event)

        validators?.every(validator => {
            const result = validator(value)
            if (result) {
                setError(result)
                textarea.current?.setCustomValidity(result)
                return false
            }
            setError(result)
            textarea.current?.setCustomValidity('')
            return true
        })
    }
}

export default TextArea
