import { LanguageHouseCoworkersInformationFieldsetModel } from 'components/fieldsets/languageHouse/LanguageHouseCoworkersInformationFieldset'
import { EmployeeQuery, Maybe } from 'graphql/v2/generated/graphql'

export interface LanguageHouseInformationFieldsetData {
    name?: Maybe<string>
    'address.street'?: Maybe<string>
    'address.houseNumber'?: Maybe<string>
    'address.houseNumberSuffix'?: Maybe<string>
    'address.postalCode'?: Maybe<string>
    'address.locality'?: Maybe<string>
    'address.country'?: Maybe<string>
    telephone?: Maybe<string>
    email?: Maybe<string>
    postalCodes?: Maybe<string[]>
}

export function getMappedLanguageHouseFormFields(formData: LanguageHouseInformationFieldsetData) {
    const address = {
        street: formData['address.street'] ?? '',
        houseNumber: formData['address.houseNumber'] ?? '',
        houseNumberSuffix: formData['address.houseNumberSuffix'] ?? '',
        postalCode: formData['address.postalCode'] ?? '',
        locality: formData['address.locality'] ?? '',
        country: 'NL',
        name: formData['name'] ?? '',
    }

    return {
        name: formData['name'] ?? '',
        address,
        telephone: formData['telephone'] ?? '',
        email: formData['email'] ?? '',
        postalCodes: formData.postalCodes?.map(c => parseInt(c)) ?? [],
    }
}

export function getMappedLanguageHouseCoworkerFormFields(
    formData: LanguageHouseCoworkersInformationFieldsetModel,
    languageHouseId: string,
    defaultLanguageHouseCoworker?: any | EmployeeQuery['employee']
): any {
    const person = {
        id: defaultLanguageHouseCoworker?.person.id,
        givenName: formData['person.givenName'] ?? '',
        additionalName: formData['person.additionalName'] ?? '',
        familyName: formData['person.familyName'] ?? '',
        telephone: formData['person.telephone'] ?? '',
        email: formData['person.email'] ?? '',
    }

    return {
        person,
        organization: languageHouseId,
        role: formData.role ?? undefined,
        teams: formData.team ? [formData.team] : undefined,
    }
}
