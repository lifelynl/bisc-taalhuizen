import { Test } from '@nestjs/testing'
import { AddressRepository } from '../address/address.repository'
import { AddressService } from '../address/address.service'
import { EmployeeRepository } from '../employee/employee.repository'
import { RegistrationService } from '../registration/registration.service'
import { OrganizationRepository } from '../organization/organization.repository'
import { PersonRepository } from '../person/person.repository'
import { PersonService } from '../person/person.service'
import { AddressPolicy } from '../utils/policy/address.policy'
import { getMockRegisterStudentInput } from './student.mock'
import { StudentRepository } from './student.repository'
import { StudentService } from './student.service'
import { CivicIntegrationService } from '../civicIntegration/civicIntegration.service'
import { EducationService } from '../education/education.service'
import { RegistrationRepository } from '../registration/registration.repository'
import { CivicIntegrationRepository } from '../civicIntegration/civicIntegration.repository'
import { EducationRepository } from '../education/education.repository'
import { TeamRepository } from '../team/team.repository'
import { StudentPolicy } from '../utils/policy/student.policy'
import { LearningNeedOutcomeRepository } from '../learningNeedOutcome/learningNeedOutcome.repository'
import { LearningNeedOutcomeService } from '../learningNeedOutcome/learningNeedOutcome.service'
import { Registration } from '../registration/registration.entity'
import { MailService } from '../utils/mail.service'

describe(StudentService.name, () => {
    let studentService: StudentService
    const findOneOrFailTeam = jest.fn()

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                StudentService,
                OrganizationRepository,
                PersonService,
                RegistrationService,
                StudentRepository,
                PersonRepository,
                AddressService,
                AddressPolicy,
                AddressRepository,
                EmployeeRepository,
                CivicIntegrationService,
                EducationService,
                RegistrationRepository,
                CivicIntegrationRepository,
                EducationRepository,
                StudentPolicy,
                LearningNeedOutcomeRepository,
                LearningNeedOutcomeService,
                { provide: MailService, useValue: {} },
                { provide: TeamRepository, useValue: { findOneOrFail: findOneOrFailTeam } },
            ],
        }).compile()

        studentService = module.get(StudentService)
    })

    describe('registerStudent', () => {
        const mockInput = getMockRegisterStudentInput()
        const findOneOrFailSpy = jest.spyOn(OrganizationRepository.prototype, 'findOneOrFail')

        const getNewRegistrationToSaveFromInputSpy = jest.spyOn(
            RegistrationService.prototype,
            'getNewRegistrationToSaveFromInput'
        )

        it('should throw if languageHouse input isnt valid', async () => {
            findOneOrFailSpy.mockRejectedValueOnce(new Error())
            jest.spyOn(PersonRepository.prototype, 'checkIfEmailExists').mockResolvedValue(false)

            await expect(studentService.registerStudent(mockInput)).rejects.toThrow()
            expect(findOneOrFailSpy).toBeCalledWith({
                id: mockInput.organization,
            })
        })

        it.skip('should create necessary entities & return true', async () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            findOneOrFailSpy.mockResolvedValueOnce(null!)
            getNewRegistrationToSaveFromInputSpy.mockResolvedValueOnce(new Registration())
            jest.spyOn(PersonRepository.prototype, 'findForUsername').mockResolvedValue(null)
            jest.spyOn(PersonService.prototype, 'throwIfEmailExists').mockResolvedValue()
            jest.spyOn(StudentRepository.prototype, 'persistAndFlush').mockResolvedValueOnce()

            await expect(studentService.registerStudent(mockInput)).resolves.toBe(true)
        })
    })
})
