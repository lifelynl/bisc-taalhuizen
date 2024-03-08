import { Test } from '@nestjs/testing'
import { AddressRepository } from '../address/address.repository'
import { AddressService } from '../address/address.service'
import { EducationRepository } from '../education/education.repository'
import { EducationService } from '../education/education.service'
import { EmployeeRepository } from '../employee/employee.repository'
import { PersonRepository } from '../person/person.repository'
import { PersonService } from '../person/person.service'
import { AddressPolicy } from '../utils/policy/address.policy'
import { getMockCreateRegistrationInput } from './registration.mock'
import { RegistrationRepository } from './registration.repository'
import { RegistrationService } from './registration.service'
import { LearningNeedOutcomeService } from '../learningNeedOutcome/learningNeedOutcome.service'
import { LearningNeedOutcomeRepository } from '../learningNeedOutcome/learningNeedOutcome.repository'

describe(RegistrationService.name, () => {
    let registrationService: RegistrationService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                RegistrationService,
                PersonService,
                PersonRepository,
                EducationService,
                EducationRepository,
                AddressService,
                AddressPolicy,
                AddressRepository,
                EmployeeRepository,
                RegistrationRepository,
                LearningNeedOutcomeService,
                LearningNeedOutcomeRepository,
            ],
        }).compile()

        registrationService = module.get(RegistrationService)
    })

    describe('getNewRegistrationToSaveFromInput', () => {
        const mockInput = getMockCreateRegistrationInput()
        const getOrCreateReferringPersonSpy = jest.spyOn(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (RegistrationService as any).prototype,
            'getOrCreateReferringPerson'
        )

        it('should link or create referring person if received', async () => {
            jest.spyOn(PersonRepository.prototype, 'findForUsername').mockResolvedValue(null)
            jest.spyOn(PersonRepository.prototype, 'checkIfEmailExists').mockResolvedValue(false)
            getOrCreateReferringPersonSpy.mockResolvedValue(mockInput.referringPerson)

            await expect(registrationService.getNewRegistrationToSaveFromInput(mockInput)).resolves.toMatchObject(
                mockInput
            )
        })
    })
})
