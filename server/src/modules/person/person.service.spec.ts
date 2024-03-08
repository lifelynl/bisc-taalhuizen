import { Test } from '@nestjs/testing'
import { AddressRepository } from '../address/address.repository'
import { AddressService } from '../address/address.service'
import { EducationRepository } from '../education/education.repository'
import { EducationService } from '../education/education.service'
import { EmployeeRepository } from '../employee/employee.repository'
import { AddressPolicy } from '../utils/policy/address.policy'
import { getMockCreatePersonInput } from './person.mock'
import { PersonRepository } from './person.repository'
import { PersonService } from './person.service'

describe(PersonService.name, () => {
    let personService: PersonService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PersonService,
                PersonRepository,
                EducationRepository,
                EducationService,
                AddressService,
                AddressPolicy,
                AddressRepository,
                EmployeeRepository,
            ],
        }).compile()

        personService = module.get(PersonService)
    })

    const mockInput = getMockCreatePersonInput()
    const checkIfEmailExistsSpy = jest.spyOn(PersonRepository.prototype, 'checkIfEmailExists')

    describe('getNewPersonToSaveFromInput', () => {
        it('should create address if received', async () => {
            checkIfEmailExistsSpy.mockResolvedValue(false)

            await expect(personService.getNewPersonToSaveFromInput(mockInput)).resolves.toMatchObject(mockInput)
        })
    })

    describe('throwIfEmailExists', () => {
        it('should throw if received email exists', async () => {
            checkIfEmailExistsSpy.mockResolvedValue(true)

            await expect(personService.throwIfEmailExists('someemail@email.com')).rejects.toThrow()
        })
    })
})
