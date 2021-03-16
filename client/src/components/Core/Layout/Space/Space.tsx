import React from 'react'
import styles from './Space.module.scss'
import classNames from 'classnames'

interface Props {
    pushTop?: boolean
}

const Space: React.FunctionComponent<Props> = ({ children, pushTop }) => {
    return (
        <div
            className={classNames(styles.container, {
                [styles.pushTop]: pushTop,
            })}
        >
            {children}
        </div>
    )
}

export default Space
