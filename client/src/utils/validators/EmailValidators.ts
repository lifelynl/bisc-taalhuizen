import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'

class Email {
    public isEmailAddress = (value: string | null) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const test = emailRegex.test(String(value).toLowerCase())
        if (!test) {
            return i18n._(t`Dit is geen emailadres`)
        }
        return null
    }
}

export const EmailValidators = new Email()
