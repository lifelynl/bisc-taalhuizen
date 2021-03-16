import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'

class PostalCode {
    public isPostalCode = (value: string | null) => {
        const postalCodeRegex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
        const test = postalCodeRegex.test(String(value).toLowerCase())
        if (!test) {
            return i18n._(t`Dit is geen postcode`)
        }
        return null
    }
}

export const PostalCodeValidator = new PostalCode()
