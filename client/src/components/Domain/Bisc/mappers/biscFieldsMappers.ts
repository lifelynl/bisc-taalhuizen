import { BiscCoworkersInformationFieldsetModel } from 'components/fieldsets/bisc/BiscCoworkersInformationFieldset'
import { EmployeeQuery } from 'graphql/v2/generated/graphql'

export function getMappedBiscCoworkerFormFields(
    formData: BiscCoworkersInformationFieldsetModel,
    biscOrganizationId: string,
    defaultBiscCoworker?: any | EmployeeQuery['employee']
): any {
    const person: any = {
        id: defaultBiscCoworker?.person.id,
        givenName: formData['person.givenName'] ?? undefined,
        additionalName: formData['person.additionalName'] ?? undefined,
        familyName: formData['person.familyName'] ?? undefined,
        telephone: formData['person.telephone'] ?? undefined,
        email: formData['person.email'] ?? undefined,
    }

    return {
        person,
        organization: biscOrganizationId,
    }
}
