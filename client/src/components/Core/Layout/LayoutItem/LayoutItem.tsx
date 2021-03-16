import React from 'react'
import classNames from 'classnames'

import styles from './LayoutItem.module.scss'
interface Props {
    className?: string
}

const LayoutItem: React.FunctionComponent<Props> = ({ children, className }) => {
    return <div className={classNames(styles.layoutItem, className)}>{children}</div>
}

export default LayoutItem
