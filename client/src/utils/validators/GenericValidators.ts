import { i18n } from '@lingui/core'

import { DefaultSelectOption } from 'components/Core/DataEntry/Select'
import isObject from 'lodash/isObject'

class Generic {
    public required = (value: string | null) => {
        if (!value) {
            return i18n._(`Dit veld is verplich`)
        }
        return null
    }

    public noSpecialCharacters = (value: string | null) => {
        const noSpecialCharacters = /'^[a-zA-Z0-9]{4,10}$'/
        if (!value) {
            return null
        }
        if (!noSpecialCharacters.test(value)) {
            return i18n._(`Speciale karakters zijn niet toegestaan`)
        }
        return null
    }

    public selectedOptionFromOptions(value: string | null, options: (string | DefaultSelectOption)[]) {
        const correspondingOption = options.find(option => {
            if (isObject(option)) {
                return option.value === value
            }
            return option === value
        })

        if (correspondingOption) {
            return i18n._(`De waarde staat niet gelijk aan een waarde uit de lijs`)
        }

        return null
    }
}

export const GenericValidators = new Generic()
