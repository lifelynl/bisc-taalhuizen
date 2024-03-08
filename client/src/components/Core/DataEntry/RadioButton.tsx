import classNames from 'classnames'
import React from 'react'
import styles from './RadioButton.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: React.ReactNode
}

const RadioButton: React.FunctionComponent<Props> = props => {
    const containerClassNames = classNames(styles.container, props.className)

    return (
        <label className={containerClassNames}>
            <input {...props} type="radio" className={styles.inputField} />
            <div className={styles.radio} />
            {props.label && <span className={styles.label}>{props.label}</span>}
        </label>
    )
}

export default RadioButton
