import { getMockCreatePersonInput } from '../person/person.mock'
import { ReferringOrganizationEnum } from './registration.entity'
import { CreateRegistrationInputType } from './registration.type'

export function getMockCreateRegistrationInput(): CreateRegistrationInputType {
    return {
        referringOrganization: ReferringOrganizationEnum.other,
        referringOrganizationOther: 'some org',
        referringTeam: 'some team within the org',
        referringPerson: { ...getMockCreatePersonInput(), email: 'someother@email.com' },
        remarks: 'some remarks',
    }
}
