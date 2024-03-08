import { i18n } from '@lingui/core'

import { ErrorCode, ErrorTranslationType } from './types'

export const genericErrorTranslations: ErrorTranslationType[] = [
    {
        errorCode: ErrorCode.AuthenticationFailed,
        title: i18n._(`Het authoiriseren van de gebruiker is misluk`),
        message: i18n._(`Probeer opnieuw in te loggen`),
    },
    {
        errorCode: ErrorCode.AuthorizationFailed,
        title: i18n._(`De gebruiker heeft onvoldoende rechten`),
        message: i18n._(`Neem contact op met uw beheerder`),
    },
    {
        errorCode: ErrorCode.PasswordConfirmationFailed,
        title: i18n._(`De wachtwoorden komen niet overeen`),
        message: i18n._(`controleer of je de wachtwoorden goed hebt ingevuld`),
    },
]
