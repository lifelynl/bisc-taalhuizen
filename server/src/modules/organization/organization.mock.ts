import { Organization } from './organization.entity'

export function mockOrganization() {
    const org = new Organization()

    org.name = 'some-org'
    org.email = 'email@test.com'
    org.telephone = '+31 20 846 1905'

    return org
}
