import React from 'react'
import { TabSwitchContext as ITabswitchContext } from './types'

export const TabSwitchContext = React.createContext<ITabswitchContext>({
    onChange: () => undefined,
    activeKey: undefined,
})
