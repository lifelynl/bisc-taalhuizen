import React from 'react'
import styles from './Column.module.scss'
import classNames from 'classnames'

interface Props {
    spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    className?: string
}

const Column: React.FunctionComponent<Props> = ({ className, children, spacing }) => {
    return (
        <div
            className={classNames(styles.container, className, {
                [styles.spacing1]: spacing === 1,
                [styles.spacing2]: spacing === 2,
                [styles.spacing3]: spacing === 3,
                [styles.spacing4]: spacing === 4,
                [styles.spacing5]: spacing === 5,
                [styles.spacing6]: spacing === 6,
                [styles.spacing7]: spacing === 7,
                [styles.spacing8]: spacing === 8,
                [styles.spacing9]: spacing === 9,
                [styles.spacing10]: spacing === 10,
                [styles.spacing11]: spacing === 11,
                [styles.spacing12]: spacing === 12,
            })}
        >
            {children}
        </div>
    )
}

export default Column
