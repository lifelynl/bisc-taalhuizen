import React from 'react'
import { I18nLoaderContextType } from './types'

const defaultContextValues = {
    toggleLanguage: undefined,
}

export const I18nLoaderContext = React.createContext<I18nLoaderContextType>(defaultContextValues)
