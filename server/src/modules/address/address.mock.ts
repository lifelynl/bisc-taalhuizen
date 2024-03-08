import { Address } from './address.entity'

export function mockAddress() {
    const address = new Address()

    address.name = 'Address one'
    address.country = 'NL'
    address.street = 'Prinsengracht'
    address.houseNumber = '197'
    address.houseNumberSuffix = 'd'
    address.postalCode = '1015DT'
    address.locality = 'Amsterdam'

    return address
}
