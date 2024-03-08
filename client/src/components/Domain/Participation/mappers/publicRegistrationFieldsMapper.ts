import { PublicRegistrationFieldsFormModel } from 'components/Domain/PublicRegistration/Fields/PublicRegistrationFields'
import { ReferringOrganizationEnum, RegisterStudentInput } from 'graphql/v2/generated/graphql'

export function publicRegistrationFieldsMapper(formData: PublicRegistrationFieldsFormModel): RegisterStudentInput {
    return {
        organization: formData['languageHouse'] ?? '',
        team: formData.team ?? null,
        person: {
            familyName: formData['person.familyName'] ?? '',
            givenName: formData['person.givenName'] ?? '',
            additionalName: formData['person.additionalName'] || undefined,
            address: {
                street: formData['person.address.street'] ?? '',
                houseNumber: formData['person.address.houseNumber'] ?? '',
                houseNumberSuffix: formData['person.address.houseNumberSuffix'] ?? '',
                postalCode: formData['person.address.postalCode'] ?? '',
                locality: formData['person.address.locality'] ?? '',
                country: 'NL',
            },
            email: formData['person.email'] ?? '',
            telephone: formData['person.telephone'] ?? '',
        },
        registration: {
            referringOrganization: ReferringOrganizationEnum.Other,
            referringOrganizationOther: formData['registration.referringOrganizationOther'] ?? '',
            referringTeam: formData['registration.refferingTeam'] ?? '',
            remarks: formData['registration.remarks'] ?? '',
            referringPerson: {
                familyName: formData['registration.referringPerson.givenName'] ?? '',
                telephone: formData['registration.referringPerson.telephone'] ?? '',
                email: formData['registration.referringPerson.email'] ?? null,
            },
        },
    }
}
