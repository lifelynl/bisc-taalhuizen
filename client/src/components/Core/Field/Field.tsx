import classNames from 'classnames'
import React from 'react'
import styles from './Field.module.scss'

export interface FieldProps {
    label?: string
    className?: string
    RightComponent?: JSX.Element
    loading?: boolean
    required?: boolean
    horizontal?: boolean
    displayBlock?: boolean
    evenContainers?: boolean
}

const Field: React.FunctionComponent<FieldProps> = ({
    label,
    loading,
    RightComponent,
    required,
    children,
    className,
    horizontal,
    displayBlock,
    evenContainers,
}) => {
    const containerClassNames = classNames(styles.container, className, {
        [styles['is-horizontal']]: horizontal,
        [styles.evenContainers]: evenContainers,
    })

    return (
        <div className={containerClassNames}>
            {loading && <label className={styles.loading}>loading</label>}
            <div className={styles.labelContainer}>
                {label && (
                    <label
                        className={classNames(styles.label, {
                            [styles.isRequired]: required,
                        })}
                    >
                        {label}
                    </label>
                )}
                {RightComponent}
            </div>
            <div
                className={classNames(styles.childrenContainer, {
                    [styles.displayBlock]: displayBlock,
                })}
            >
                {children}
            </div>
        </div>
    )
}

export default Field
