import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Validator } from '../../../utils/validators/types'
import { MutationErrorContext } from '../MutationErrorProvider/MutationErrorProvider'
import styles from './TextArea.module.scss'
interface BaseInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    onChangeValue?: (value: string) => void
    validators?: Validator<string | null>[]
    grow?: boolean
    growHeight?: boolean
    errorPath?: string
}

const TextArea: React.FunctionComponent<BaseInputProps> = props => {
    const { grow, growHeight, className, onChange, onBlur, validators, onChangeValue, children, ...rest } = props
    const textarea = useRef<HTMLTextAreaElement>(null)
    const grower = useRef<HTMLDivElement>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const textArea = textarea.current
        const setHeight = () => {
            if (!grower.current || !textArea) {
                return
            }
            grower.current.dataset.replicatedValue = textArea.value
        }
        textarea.current?.addEventListener('input', setHeight)
        return () => {
            textArea?.removeEventListener('input', setHeight)
        }
    }, [])

    return (
        <MutationErrorContext.Consumer>
            {({ findAndConsumeFieldErrors }) => {
                const _errorPath = rest.errorPath || rest.name
                const mutationErrors = _errorPath ? findAndConsumeFieldErrors(_errorPath) : []
                const errorMessages = mutationErrors.map(e => e.message)

                if (error) {
                    errorMessages.push(error)
                }

                return (
                    <div
                        className={classNames(styles.container, className, {
                            [styles.hasErrorMessage]: !!error,
                            [styles.grow]: grow,
                            [styles.growHeight]: growHeight,
                        })}
                    >
                        {grow ? (
                            <div className={styles['grow-wrap']} ref={grower}>
                                {renderTextarea()}
                            </div>
                        ) : (
                            renderTextarea()
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

    function renderTextarea() {
        return (
            <textarea
                ref={textarea}
                {...rest}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                className={styles.inputField}
                children={undefined}
            />
        )
    }

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
