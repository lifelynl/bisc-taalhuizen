import classNames from 'classnames'
import React from 'react'
import styles from './Form.module.scss'

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    className?: string
}

const Form: React.FunctionComponent<Props> = props => {
    const { children, className } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <form className={containerClassNames} {...props}>
            {children}
        </form>
    )
}

export default Form
