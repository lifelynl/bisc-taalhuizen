import React from 'react'
import classNames from 'classnames'
import { TabProps } from './types'
import styles from './TabSwitch.module.scss'
import { TabSwitchContext } from './context'
import { History } from 'history'

interface Props {
    className?: string
    activeTabId?: string | number
    onChange?: (key: TabProps) => void
}

const TabSwitch: React.FunctionComponent<Props> = props => {
    const { className, children, onChange, activeTabId } = props
    const containerClassNames = classNames(styles.container, className)
    // const [activeKey, setActiveKey] = useState(activeTabId || '')

    const handleOnChange = (tabProps: TabProps) => {
        // setActiveKey(tabProps.tabid)
        if (onChange) {
            onChange(tabProps)
        }
    }

    return (
        <TabSwitchContext.Provider
            value={{
                onChange: handleOnChange,
                activeKey: activeTabId,
            }}
        >
            <div className={containerClassNames}>{children}</div>
        </TabSwitchContext.Provider>
    )
}

interface TabRoute<T extends string> {
    id: T
    pathName: string
}

export function handleTabSwitch<T extends string>(tab: TabProps, history: History, tabRoutes: TabRoute<T>[]) {
    const tabRoute = tabRoutes.find(tabRoute => tabRoute.id === tab.tabid)
    if (!tabRoute) {
        return
    }

    history.push(tabRoute.pathName)
}

export default TabSwitch
