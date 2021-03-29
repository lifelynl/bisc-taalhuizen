interface AddressType {
    street?: string | null
    houseNumber?: string | null
    houseNumberSuffix?: string | null
    postalCode?: string
    locality?: string
}

class Adress {
    public formattedAddress = (value?: AddressType | null) => {
        const street = [value?.street, value?.houseNumber, value?.houseNumberSuffix]
            .filter(streetItem => streetItem)
            .join(' ')
        const postalCode = value?.postalCode
        const textArr = [street, postalCode].filter(streetItem => streetItem)

        if (textArr.length) {
            return textArr.join(', ')
        }
        return ''
    }
}

export const AdressFormatters = new Adress()
