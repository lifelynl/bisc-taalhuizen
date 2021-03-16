export interface TabSwitchContext {
    onChange: (props: TabProps) => void
    activeKey: string
}

export interface TabProps {
    indicatorCount?: number
    label: string
    tabid: string
}
