import classNames from 'classnames'
import React from 'react'
import Label from '../Label/Label'
import { MutationErrorContext, MutationFieldError } from '../MutationErrorProvider/MutationErrorProvider'
import Paragraph from '../Typography/Paragraph'
import styles from './Field.module.scss'

export interface FieldProps {
    label?: string
    description?: string
    className?: string
    RightComponent?: JSX.Element
    loading?: boolean
    required?: boolean
    horizontal?: boolean
    displayBlock?: boolean
    evenContainers?: boolean
    grow?: boolean
    errorPath?: string
    readOnly?: boolean
    hasSmallerLabel?: boolean
}

const Field: React.FunctionComponent<FieldProps> = props => {
    const {
        label,
        loading,
        RightComponent,
        required,
        children,
        className,
        description,
        horizontal,
        displayBlock,
        evenContainers,
        grow,
        errorPath,
        hasSmallerLabel,
        readOnly = false,
    } = props

    if (errorPath) {
        // when error path is provided, potentially consume fields errors for inline error purpose
        return (
            <MutationErrorContext.Consumer>
                {({ findAndConsumeFieldErrors }) => {
                    const errors = findAndConsumeFieldErrors(errorPath)
                    return renderField(errors)
                }}
            </MutationErrorContext.Consumer>
        )
    }

    // no error path is provided, so no need to wrap with consumer
    return renderField()

    function renderField(errors: MutationFieldError[] = []) {
        const containerClassNames = classNames(styles.container, className, {
            [styles['is-horizontal']]: horizontal,
            [styles.evenContainers]: evenContainers,
            [styles.grow]: grow,
            [styles['is-readonly']]: readOnly,
            [styles.hasSmallerLabel]: hasSmallerLabel,
        })

        return (
            <div className={containerClassNames}>
                {loading && <label className={styles.loading}>loading</label>}
                {label && (
                    <div className={styles.labelContainer}>
                        <div className={styles.labelLeft}>
                            <Label text={label} required={!readOnly && required} />
                            {description && <Paragraph className={styles.description}>{description}</Paragraph>}
                        </div>
                        {!!RightComponent && <div className={styles.labelRight}>{RightComponent}</div>}
                    </div>
                )}
                <div
                    className={classNames(styles.childrenContainer, {
                        [styles.displayBlock]: displayBlock,
                    })}
                >
                    {children}
                    {errors.length > 0 &&
                        errors.map((error, index) => (
                            <p key={index} className={styles.errorMessage}>
                                {error.message}
                            </p>
                        ))}
                </div>
            </div>
        )
    }
}

export default Field
