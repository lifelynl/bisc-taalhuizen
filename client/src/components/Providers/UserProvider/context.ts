import React from 'react'
import { SessionContextValue } from './types'

const defaultContextValues = {
    loading: true,
    error: undefined,
    user: null,
    changeEnvironment: () => undefined,
}

export const UserContext = React.createContext<SessionContextValue>(defaultContextValues)
