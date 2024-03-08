import classNames from 'classnames'
import React from 'react'
import styles from './Form.module.scss'

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    className?: string
    onRef?: React.MutableRefObject<any>
}

const Form: React.FunctionComponent<Props> = props => {
    const { children, className, onRef, ...rest } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <form className={containerClassNames} {...rest} ref={onRef}>
            {children}
        </form>
    )
}

export default Form
