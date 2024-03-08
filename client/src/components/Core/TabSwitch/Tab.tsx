import React, { useContext } from 'react'
import classNames from 'classnames'
import styles from './Tab.module.scss'
import { TabSwitchContext } from './context'
import { TabProps } from './types'

interface Props extends TabProps {
    className?: string
    disabled?: boolean
    subtleIndicator?: boolean
}

const Tab: React.FunctionComponent<Props> = props => {
    const context = useContext(TabSwitchContext)
    const { className, label, tabid, indicatorCount, disabled, subtleIndicator } = props
    const containerClassNames = classNames(styles.container, className, {
        [styles['is-active']]: context.activeKey === tabid,
    })

    const handleOnClick = () => {
        if (disabled) {
            return
        }
        context.onChange({
            indicatorCount: indicatorCount,
            label: label,
            tabid: tabid,
        })
    }

    return (
        <button className={containerClassNames} onClick={handleOnClick} disabled={disabled}>
            <span className={styles.label}>{label}</span>
            {typeof indicatorCount === 'number' && indicatorCount > 0 && (
                <span className={subtleIndicator ? styles.subtleIndicator : styles.indicator}>{indicatorCount}</span>
            )}
        </button>
    )
}

export default Tab
