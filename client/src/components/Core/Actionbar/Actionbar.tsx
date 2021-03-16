import React from 'react'
import classNames from 'classnames'

import styles from './Actionbar.module.scss'

interface Props {
    className?: string
    LeftComponent?: JSX.Element
    RightComponent: JSX.Element
}

const Actionbar: React.FunctionComponent<Props> = props => {
    const { className, LeftComponent, RightComponent } = props
    const containerClassName = classNames(styles.container, className)

    return (
        <div className={containerClassName}>
            {LeftComponent && LeftComponent}
            {RightComponent && <div className={styles.rightContainer}>{RightComponent}</div>}
        </div>
    )
}

export default Actionbar
