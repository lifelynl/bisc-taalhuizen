import React from 'react'
import classNames from 'classnames'

import styles from './Actionbar.module.scss'

interface Props {
    className?: string
    LeftComponent?: JSX.Element
    RightComponent: JSX.Element
    hide?: boolean
}

const Actionbar: React.FunctionComponent<Props> = props => {
    const { className, LeftComponent, RightComponent, hide } = props
    const containerClassName = classNames(styles.container, className)

    if (hide) {
        return null
    }

    return (
        <div className={styles.wrapper}>
            <div className={containerClassName}>
                {LeftComponent && LeftComponent}
                {RightComponent && <div className={styles.rightContainer}>{RightComponent}</div>}
            </div>
        </div>
    )
}

export default Actionbar
