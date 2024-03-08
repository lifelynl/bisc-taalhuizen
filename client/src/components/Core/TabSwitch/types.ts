import { Maybe } from 'graphql/v2/generated/graphql'

export interface TabSwitchContext {
    onChange: (props: TabProps) => void
    activeKey?: string | number
}

export interface TabProps {
    indicatorCount?: Maybe<number>
    label: string
    tabid: string | number
}
