import times from 'lodash/times'

export const taalhuizenMock = times(3, num => ({
    id: 1234523525,
    name: `Taalhuis x`,
    adres: `test`,
    postalCode: `1234AB`,
    city: `Utrecht`,
    email: `medewerker${num}@aanbieder.nl`,
    phoneNumber: '030 - 526 72 80',
    createdAt: `01-01-21`,
    editedAt: `01-01-21`,
}))

export const taalhuisCreateResponse = {
    id: 1234523525,
    name: `Taalhuis x`,
    adres: `test`,
    postalCode: `1234AB`,
    city: `Utrecht`,
    email: `medewerker@aanbieder.nl`,
    phoneNumber: '030 - 526 72 80',
    createdAt: `01-01-21`,
    editedAt: `01-01-21`,
}
