import React from 'react'
import styles from './Paragraph.module.scss'
import classNames from 'classnames'

interface Props {
    className?: string
    centered?: boolean
    bold?: boolean
    italic?: boolean
    error?: boolean
    subtle?: boolean
    small?: boolean
    smaller?: boolean
    truncateEllipsis?: boolean
}

const Paragraph: React.FunctionComponent<Props> = props => {
    const { className, children, centered, error, italic, bold, subtle, small, smaller, truncateEllipsis } = props

    return (
        <p
            className={classNames(styles.paragraph, className, {
                [styles.centered]: centered === true,
                [styles.bold]: bold === true,
                [styles.italic]: italic === true,
                [styles.leftAligned]: centered === false,
                [styles.isError]: error === true,
                [styles.subtle]: subtle === true,
                [styles.small]: small === true,
                [styles.smaller]: smaller === true,
                [styles.truncateEllipsis]: truncateEllipsis === true,
            })}
        >
            {children}
        </p>
    )
}

export default Paragraph
