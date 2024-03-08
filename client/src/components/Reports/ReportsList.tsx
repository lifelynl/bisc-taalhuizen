import classNames from 'classnames'
import React from 'react'
import styles from './ReportsList.module.scss'

interface Props {
    className?: string
}
const ReportCard: React.FunctionComponent<Props> = props => {
    const { className, children } = props
    const containerClassNames = classNames(styles.container, className)

    return <div className={containerClassNames}>{children}</div>
}

export default ReportCard
