import React from 'react'
import styles from './ErrorBlock.module.scss'
import classNames from 'classnames'
import Paragraph from '../../Typography/Paragraph'

interface Props {
    className?: string
    title: string
    message: string
}

const ErrorBlock: React.FunctionComponent<Props> = props => {
    const { title, message, className } = props
    return (
        <div className={classNames(styles.container, className)}>
            <h4 className={styles.title}>{title}</h4>
            <Paragraph className={styles.message}>{message}</Paragraph>
        </div>
    )
}

export default ErrorBlock
