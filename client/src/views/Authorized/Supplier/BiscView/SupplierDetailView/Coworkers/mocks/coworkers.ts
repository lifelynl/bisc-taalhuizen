import times from 'lodash/times'

export const coworkersMock: CoworkerMock[] = times(100, num => ({
    id: 1234523525,
    lastname: `achternaam ${num}`,
    callsign: `Roepnaam ${num}`,
    roles: ['Coordinator', 'Begeleider'],
    gender: 'Vrouw',
    dateOfBirth: '01-01-2001',
    countryOfOrigin: 'Mozambique',
    contactInfo: {
        adres: 'Postweg 5',
        postalCode: '1234 AB',
        city: 'Utrecht',
        phoneNumber: '06 12 34 56 78',
        contact: 'Anders, namelijk: contactpersoon bellen',
    },
    guidance: {
        target: 'NT1, NT2',
        preference: 'Taalcafé',
        foundVia: 'Via mijn buurvrouw',
        experience: 'Ja, namelijk: in asielzoekerscentrum gewerkt',
    },
    education: {
        study: 'Ja, sinds 01-01-2019',
        institution: 'LOI',
        offersCertificate: 'ja',
    },
    course: 'Nee',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
}))
export interface CoworkerMock {
    id: number
    lastname: string
    callsign: string
    gender: string
    dateOfBirth: string
    countryOfOrigin: string
    contactInfo: {
        adres: string
        postalCode: string
        city: string
        phoneNumber: string
        contact: string
    }
    guidance: {
        target: string
        preference: string
        foundVia: string
        experience: string
    }
    education: {
        study: string
        institution: string
        offersCertificate: string
    }
    course: string
    roles: string[]
    createdAt: string
    updatedAt: string
}

export interface CoworkerDetailDocumentsMock {
    id: number | string
    name: string
    uploadedAt: string
}

export const coworkersCreateMock = {
    id: 1234523525,
    lastname: 'Tester',
    insertion: 'den',
    callSign: 'Henk',
    phonenumber: '0648585398',
    available: 'evening-Ma',
    note: 'My Note',
    email: 'test@mail.com',
    role: '',
    gender: 'Vrouw',
    dateOfBirth: '01-01-2001',
    countryOfOrigin: 'Mozambique',
    street: 'Postweg',
    streetNo: '5',
    postalCode: '1234 AB',
    city: 'Utrecht',
    phoneNumberContactPerson: '06 12 34 56 78',
    contact: 'Anders, namelijk: contactpersoon bellen',
    target: 'NT1, NT2',
    preference: 'Taalcafé',
    foundVia: 'Via mijn buurvrouw',
    experience: 'Ja, namelijk: in asielzoekerscentrum gewerkt',
    study: 'Ja, sinds 01-01-2019',
    institution: 'LOI',
    offersCertificate: 'ja',
    course: 'Nee',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
}

export type CoworkerDetailResponseMock = any

export type CoworkerDetailVariablesMock = any

export const coworkerDetailMock: CoworkerDetailResponseMock = {
    lastName: 'Tester',
    insertion: 'den',
    nickName: 'Henk',
    phonenumber: '0648585398',
    available: 'evening-Ma',
    note: 'My Note',
    email: 'test@mail.com',
    roles: [],
    gender: 'Vrouw',
    dateOfBirth: '01-01-2001',
    countryOfOrigin: 'Mozambique',
    street: 'Postweg',
    streetNr: '5',
    postalCode: '1234 AB',
    city: 'Utrecht',
    phoneNumberContactPerson: '06 12 34 56 78',
    contactPreference: 'Anders, namelijk: contactpersoon bellen',
    target: 'NT1, NT2',
    preference: 'Taalcafé',
    foundVia: 'Via mijn buurvrouw',
    experience: 'Ja, namelijk: in asielzoekerscentrum gewerkt',
    study: 'Ja, sinds 01-01-2019',
    institution: 'LOI',
    offersCertificate: 'ja',
    course: 'Nee',
}

export const coworkerDetailUpdateResponseMock: CoworkerDetailResponseMock = {
    lastName: 'Tester',
    insertion: 'den',
    nickName: 'Henk',
    phonenumber: '0648585398',
    available: 'evening-Ma',
    note: 'My Note',
    email: 'test@mail.com',
    roles: [],
    gender: 'Vrouw',
    dateOfBirth: '01-01-2001',
    countryOfOrigin: 'Mozambique',
    street: 'Postweg',
    streetNr: '5',
    postalCode: '1234 AB',
    city: 'Utrecht',
    phoneNumberContactPerson: '06 12 34 56 78',
    contactPreference: 'Anders, namelijk: contactpersoon bellen',
    target: 'NT1, NT2',
    preference: 'Taalcafé',
    foundVia: 'Via mijn buurvrouw',
    experience: 'Ja, namelijk: in asielzoekerscentrum gewerkt',
    study: 'Ja, sinds 01-01-2019',
    institution: 'LOI',
    offersCertificate: 'ja',
    course: 'Nee',
}

export const coworkerDetailDocumentsMock: CoworkerDetailDocumentsMock[] = times(10, num => ({
    id: `0000${num}`,
    name: `Document ${num}`,
    uploadedAt: new Date().toDateString(),
}))

export const coworkerDetailDocumentsResponseMock: CoworkerDetailDocumentsMock = {
    id: `1231231`,
    name: `Document 23`,
    uploadedAt: new Date().toDateString(),
}
