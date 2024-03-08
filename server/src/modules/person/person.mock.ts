import { Availability, ContactPreference, Gender, MaritalStatus, Person } from '../person/person.entity'
import { CreatePersonInputType } from './person.type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMockPerson() {
    const person = new Person()

    person.id = 'some-id'
    person.additionalName = 'String'
    person.availability = [Availability.mondayAfternoon]
    person.availabilityNotes = 'String'
    person.birthday = new Date('2000-07-14')
    person.birthplace = 'String'
    person.children = 3
    person.contactPreference = ContactPreference.other
    person.contactPreferenceOther = 'some other pref'
    person.email = 'asdf@asdjf.af'
    person.familyName = 'String!'
    person.gender = Gender.male
    person.givenName = 'String!'
    person.maritalStatus = MaritalStatus.single
    person.primaryLanguage = 'String'
    person.spokenLanguages = 'String'
    person.telephone = 'String'
    person.didSignPermissionForm = true
    person.hasPermissionToSendInformationAboutLibraries = true
    person.hasPermissionToShareDataWithProviders = true

    return person
}

export function getMockCreatePersonInput(): CreatePersonInputType {
    return {
        additionalName: 'String',
        address: {
            name: 'address1',
            street: 'Prinsengracht',
            houseNumber: '197',
            houseNumberSuffix: 'D',
            country: 'nl',
            locality: 'NL',
            postalCode: 'as1234',
        },
        availability: [Availability.mondayAfternoon],
        availabilityNotes: 'String',
        birthday: new Date('2000-07-14'),
        birthplace: 'String',
        children: 3,
        contactPreference: ContactPreference.other,
        contactPreferenceOther: 'some other pref',
        email: 'asdf@asdjf.af',
        familyName: 'String!',
        gender: Gender.male,
        givenName: 'String!',
        maritalStatus: MaritalStatus.single,
        primaryLanguage: 'String',
        spokenLanguages: 'String',
        telephone: 'String',
        didSignPermissionForm: true,
        hasPermissionToSendInformationAboutLibraries: true,
        hasPermissionToShareDataWithProviders: true,
    }
}
