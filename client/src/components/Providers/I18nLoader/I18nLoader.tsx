import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { FunctionComponent } from 'react'
const { messages } = require('locales/nl/messages')
// import { I18nLoaderContext } from './context'
// import { Language } from './types'

interface Props {}

/**
 * The commented out code in this file is left in for future reference,
 * in case we want to (re)implement dynamic language switching.
 */

// async function dynamicActivate(locale: string) {
//     const { messages } = await import(`./../../../locales/${locale}/messages`)

//     i18n.load(locale, messages)
//     i18n.activate(locale)
// }

i18n.load('nl', messages)
i18n.activate('nl')

export const I18nLoader: FunctionComponent<Props> = props => {
    const { children } = props
    // const [language, setLanguage] = useState(Language.nl)

    // useEffect(() => {
    //     dynamicActivate(Language.nl)
    // }, [])

    // const handleLanguageSwitch = (language: Language) => {
    //     setLanguage(language)
    //     dynamicActivate(language)
    // }

    return (
        <I18nProvider i18n={i18n}>
            {/* <I18nLoaderContext.Provider
                value={{
                    language,
                    toggleLanguage: handleLanguageSwitch,
                }}
            > */}
            {children}
            {/* </I18nLoaderContext.Provider> */}
        </I18nProvider>
    )
}
