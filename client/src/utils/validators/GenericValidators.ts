import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'

class Generic {
    public required = (value: string | null) => {
        if (!value) {
            return i18n._(t`Dit veld is verplicht`)
        }
        return null
    }

    public noSpecialCharacters = (value: string | null) => {
        const noSpecialCharacters = /'^[a-zA-Z0-9]{4,10}$'/
        if (!value) {
            return null
        }
        if (!noSpecialCharacters.test(value)) {
            return i18n._(t`Speciale karakters zijn niet toegestaan`)
        }
        return null
    }

    public noCapitals = (value: string | null) => {
        const noSpecialCharacters = /(?!^.*[A-Z]{2,}.*$)^[A-Za-z]*$/
        if (!value) {
            return null
        }
        if (!noSpecialCharacters.test(value)) {
            return i18n._(t`Hoofdletters zijn niet toegestaan`)
        }
        return null
    }
}

export const GenericValidators = new Generic()