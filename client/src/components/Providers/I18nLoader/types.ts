export interface I18nLoaderContextType {
    language?: Language
    toggleLanguage?: (language: Language) => void
}

export enum Language {
    en = 'en',
    nl = 'nl',
}
