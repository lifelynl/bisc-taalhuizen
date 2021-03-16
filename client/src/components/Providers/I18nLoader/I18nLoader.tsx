import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { I18nLoaderContext } from './context'
import { Language } from './types'

interface Props {}

async function dynamicActivate(locale: string) {
    const { messages } = await import(`./../../../locales/${locale}/messages`)
    const pluralsOrdinal = new Intl.PluralRules(locale, { type: 'ordinal' })
    const pluralsCardinal = new Intl.PluralRules(locale, { type: 'cardinal' })

    i18n.load(locale, messages)
    i18n.loadLocaleData(locale, {
        plurals(count: number, ordinal: boolean) {
            return (ordinal ? pluralsOrdinal : pluralsCardinal).select(count)
        },
    })
    i18n.activate(locale)
}

export const I18nLoader: FunctionComponent<Props> = props => {
    const { children } = props
    const [language, setLanguage] = useState(Language.en)

    useEffect(() => {
        dynamicActivate(Language.en)
    }, [])

    const handleLanguageSwitch = (language: Language) => {
        setLanguage(language)
        dynamicActivate(language)
    }

    return (
        <I18nProvider i18n={i18n}>
            <I18nLoaderContext.Provider
                value={{
                    language,
                    toggleLanguage: handleLanguageSwitch,
                }}
            >
                {children}
            </I18nLoaderContext.Provider>
        </I18nProvider>
    )
}
