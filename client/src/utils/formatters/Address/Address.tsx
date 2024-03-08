import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { Maybe } from 'graphql/v2/generated/graphql'

interface AddressType {
    street?: Maybe<string>
    houseNumber?: Maybe<string>
    houseNumberSuffix?: Maybe<string>
    postalCode?: Maybe<string>
    locality?: Maybe<string>
}

class Adress {
    public formattedAddress = (value?: AddressType | null) => {
        if (!value) {
            return ''
        }

        let streetParts: Array<Maybe<string> | undefined> = []

        if (value.street) {
            // Only show full street if street is set
            streetParts = [value.street, value.houseNumber, value.houseNumberSuffix]
        } else {
            if (value.houseNumber) {
                // If housenumber is set, but street is not set
                streetParts = [i18n._(t`Straat onbekend`), value.houseNumber, value.houseNumberSuffix]
            }
        }

        const streetLine = streetParts.filter(part => !!part).join(' ')

        const postalCode = value.postalCode
        const textArr = [streetLine, postalCode].filter(streetItem => streetItem)

        if (textArr.length) {
            return textArr.join(', ')
        }
        return ''
    }
}

export const AdressFormatters = new Adress()
