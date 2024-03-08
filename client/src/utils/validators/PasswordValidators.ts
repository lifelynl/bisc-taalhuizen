import { i18n } from '@lingui/core'

import zxcvbn from 'zxcvbn'
interface StringsMatch {
    newPassword?: string
    repeatPassword?: string
}
class Password {
    public stringsMatch = ({ newPassword, repeatPassword }: StringsMatch) => {
        if (newPassword !== repeatPassword) {
            return i18n._(`Het herhaalde wachtwoord komt niet overeen met het nieuwe wachtwoord`)
        }
        return null
    }

    public passwordStrength = (value: string | null) => {
        if (!value) {
            return null
        }
        const response = zxcvbn(value)

        if (response.score <= 3) {
            return i18n._(`Het wachtwoord is niet sterk genoeg`)
        }
        return null
    }
}

export const PasswordValidators = new Password()
