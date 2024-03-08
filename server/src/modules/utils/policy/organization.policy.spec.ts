import { Test } from '@nestjs/testing'
import { EmployeeRepository } from 'src/modules/employee/employee.repository'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { OrganizationRepository } from 'src/modules/organization/organization.repository'
import { OrganizationPolicy } from './organization.policy'
import { PolicyAction } from './policy'
import { UserWithCurrentEmployee } from 'src/modules/auth/auth.interface'

describe(OrganizationPolicy.name, () => {
    const findOne = jest.fn()
    const findOneOrFail = jest.fn()
    let organizationPolicy: OrganizationPolicy

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                { provide: EmployeeRepository, useValue: { findOne } },
                OrganizationPolicy,
                { provide: OrganizationRepository, useValue: { findOneOrFail } },
            ],
        }).compile()

        organizationPolicy = module.get<OrganizationPolicy>(OrganizationPolicy)
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should not throw if admin', async () => {
        const user = { accessGroup: OrganizationTypeEnum.bisc } as UserWithCurrentEmployee
        findOneOrFail.mockResolvedValue({ type: OrganizationTypeEnum.languageHouse })

        for (const val of Object.values(PolicyAction)) {
            await expect(
                organizationPolicy.throwIfNotSatisfiedBy(user, val, {
                    organizationId: 'some-id',
                    organizationType: OrganizationTypeEnum.languageHouse,
                })
            ).resolves.not.toBeDefined()
        }
    })

    it('should throw if trying to read other organizations', async () => {
        findOne.mockResolvedValueOnce(null)
        const user = { accessGroup: OrganizationTypeEnum.languageHouse } as UserWithCurrentEmployee

        for (const val of Object.values(PolicyAction)) {
            await expect(organizationPolicy.throwIfNotSatisfiedBy(user, val, { organizationId: '' })).rejects.toThrow()
        }
    })

    it('should not throw if trying to access own organization', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jest.spyOn(OrganizationPolicy.prototype as any, 'findUserEmployeeWithinOrganization').mockResolvedValue(true)
        const resolvedOrganization = { type: OrganizationTypeEnum.languageHouse }
        findOneOrFail.mockResolvedValue(resolvedOrganization)

        const user = { accessGroup: OrganizationTypeEnum.bisc } as UserWithCurrentEmployee

        for (const val of [PolicyAction.read, PolicyAction.update]) {
            await expect(
                organizationPolicy.throwIfNotSatisfiedBy(user, val, { organizationId: 'id' })
            ).resolves.not.toBeDefined()
        }
    })
})
