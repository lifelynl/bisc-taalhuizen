import React from 'react'
import classNames from 'classnames'

import styles from './Row.module.scss'

interface Props {
    className?: string
    wrap?: boolean
    justifyContent?: 'flex-end' | 'flex-start' | 'center' | 'space-between'
    spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

const Row: React.FunctionComponent<Props> = props => {
    const { children, className, wrap, justifyContent, spacing = 4 } = props

    const containerClassName = classNames(styles.container, className, {
        [styles.wrap]: wrap,
        [styles[justifyContent || '']]: !!justifyContent,
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
    })

    return <div className={containerClassName}>{children}</div>
}

export default Row
