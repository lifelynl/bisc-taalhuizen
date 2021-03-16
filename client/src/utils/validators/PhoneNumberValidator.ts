import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'

class PhoneNumber {
    public isPhoneNumber = (value: string | null) => {
        const phoneNumberRegex = /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/
        const test = phoneNumberRegex.test(String(value))
        if (!test) {
            return i18n._(t`Dit is geen telefoon nummer`)
        }
        return null
    }
}

export const PhoneNumberValidators = new PhoneNumber()
