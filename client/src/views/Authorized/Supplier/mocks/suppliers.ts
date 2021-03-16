import times from 'lodash/times'

export const suppliersMock: SupplierMock[] = times(100, num => ({
    id: 1234523525,
    naam: `Aanbieder ${num}`,
    adres: `Adres ${num}`,
    plaats: `Plaats ${num}`,
}))
export interface SupplierMock {
    id: number
    naam: string
    adres: string
    plaats: string
}

export const supplierCreateResponse = {
    name: 'Aanbieder X',
    street: 'Zonstraat 5',
    postalCode: '3810 GG',
    city: 'Utrecht',
    phone: '030 - 526 72 80',
    email: 'info@aanbieder.nl',
}
