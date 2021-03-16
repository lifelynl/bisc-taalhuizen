import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'

class Adress {
    public isValidHousenumber = (value: string | null) => {
        const housenumberRegex = /^[1-9]\d{0,3}(?:[a-zA-Z]{1,2}\d{0,3})?$/
        const test = housenumberRegex.test(String(value).toLowerCase())
        if (!test) {
            return i18n._(t`Dit is geen huisnummer`)
        }
        return null
    }

    public isValidZipcode = (value: string | null) => {
        const zipcodeRegex = /^\d{4}\s?\w{2}$/g
        const test = zipcodeRegex.test(String(value).toLowerCase())
        if (!test) {
            return i18n._(t`Dit is geen geldige postcode`)
        }
        return null
    }
}

export const AdressValidators = new Adress()
