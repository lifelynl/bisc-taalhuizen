import { Test } from '@nestjs/testing'
import { EmployeeRepository } from 'src/modules/employee/employee.repository'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { AddressPolicy } from './address.policy'
import { PolicyAction } from './policy'
import { UserWithCurrentEmployee } from 'src/modules/auth/auth.interface'

describe(AddressPolicy.name, () => {
    const findOne = jest.fn()
    let addressPolicy: AddressPolicy

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [{ provide: EmployeeRepository, useValue: { findOne } }, AddressPolicy],
        }).compile()

        addressPolicy = module.get<AddressPolicy>(AddressPolicy)
    })

    it('should not throw if admin', async () => {
        const user = { accessGroup: OrganizationTypeEnum.bisc } as UserWithCurrentEmployee

        for (const val of Object.values(PolicyAction)) {
            await expect(addressPolicy.throwIfNotSatisfiedBy(user, val, '')).resolves.not.toBeDefined()
        }
    })

    it('should throw if trying to read other addresses', async () => {
        findOne.mockResolvedValueOnce(null)
        const user = { accessGroup: OrganizationTypeEnum.languageHouse } as UserWithCurrentEmployee

        for (const val of Object.values(PolicyAction)) {
            await expect(addressPolicy.throwIfNotSatisfiedBy(user, val, '')).rejects.toThrow()
        }
    })

    // TODO: remove skip after implementing all actions
    it.skip('should not throw if trying to access own address', async () => {
        const resolvedVal = { organization: 'org-1' }
        findOne.mockResolvedValue(resolvedVal)
        const user = { accessGroup: OrganizationTypeEnum.languageHouse } as UserWithCurrentEmployee

        for (const val of Object.values(PolicyAction)) {
            await expect(addressPolicy.throwIfNotSatisfiedBy(user, val, '')).resolves.not.toBeDefined()
        }
    })
})
