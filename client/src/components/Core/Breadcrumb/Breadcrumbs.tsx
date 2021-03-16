import React from 'react'
import classNames from 'classnames'

import styles from './Breadcrumbs.module.scss'

interface Props {
    className?: string
}

const Breadcrumbs: React.FunctionComponent<Props> = props => {
    const { className, children } = props
    const containerClassNames = classNames(styles.container, className)

    return <div className={containerClassNames}>{children}</div>
}

export default Breadcrumbs
