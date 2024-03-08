import classNames from 'classnames'
import React from 'react'
import styles from './Label.module.scss'

interface LabelProps {
    text: string
    className?: string
    required?: boolean
}

const Label: React.FunctionComponent<LabelProps> = ({ text, className, required }) => {
    return (
        <label
            className={classNames(styles.label, {
                [styles.isRequired]: required,
            })}
        >
            {text}
        </label>
    )
}

export default Label
