import classNames from 'classnames'
import React from 'react'
import styles from './RadioButton.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
}

const RadioButton: React.FunctionComponent<Props> = props => {
    const containerClassNames = classNames(styles.container, props.className)

    return (
        <div className={containerClassNames}>
            <input {...props} type="radio" className={styles.inputField} />
            <div className={styles.radio} />
        </div>
    )
}

export default RadioButton
