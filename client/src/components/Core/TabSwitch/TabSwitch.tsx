import React, { useState } from 'react'
import classNames from 'classnames'
import { TabProps } from './types'
import styles from './TabSwitch.module.scss'
import { TabSwitchContext } from './context'

interface Props {
    className?: string
    defaultActiveTabId?: string
    onChange?: (key: TabProps) => void
}

const TabSwitch: React.FunctionComponent<Props> = props => {
    const { className, children, onChange, defaultActiveTabId } = props
    const containerClassNames = classNames(styles.container, className)
    const [activeKey, setActiveKey] = useState(defaultActiveTabId || '')

    const handleOnChange = (tabProps: TabProps) => {
        setActiveKey(tabProps.tabid)
        if (onChange) {
            onChange(tabProps)
        }
    }

    return (
        <TabSwitchContext.Provider
            value={{
                onChange: handleOnChange,
                activeKey,
            }}
        >
            <div className={containerClassNames}>{children}</div>
        </TabSwitchContext.Provider>
    )
}

export default TabSwitch
