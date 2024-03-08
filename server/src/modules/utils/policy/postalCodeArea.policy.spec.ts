import { Test } from '@nestjs/testing'
import { EmployeeRepository } from 'src/modules/employee/employee.repository'
import { PolicyAction } from './policy'
import { PostalCodeAreaPolicy } from './postalCodeArea.policy'
import { UserWithCurrentEmployee } from 'src/modules/auth/auth.interface'

describe(PostalCodeAreaPolicy.name, () => {
    const findOne = jest.fn()
    let postalCodeAreaPolicy: PostalCodeAreaPolicy

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [{ provide: EmployeeRepository, useValue: { findOne } }, PostalCodeAreaPolicy],
        }).compile()

        postalCodeAreaPolicy = module.get<PostalCodeAreaPolicy>(PostalCodeAreaPolicy)
    })

    it('should not throw if trying to read', async () => {
        const user = {} as UserWithCurrentEmployee

        await expect(postalCodeAreaPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {})).resolves.not.toBeDefined()
    })

    it('should throw if trying to create/update/delete', async () => {
        findOne.mockResolvedValueOnce(null)
        const user = {} as UserWithCurrentEmployee

        await expect(postalCodeAreaPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create)).rejects.toThrow()
        await expect(postalCodeAreaPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update)).rejects.toThrow()
        await expect(postalCodeAreaPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete)).rejects.toThrow()
    })
})
