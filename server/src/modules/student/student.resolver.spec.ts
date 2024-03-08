import { Test } from '@nestjs/testing'
import { AddressRepository } from '../address/address.repository'
import { AddressService } from '../address/address.service'
import { CivicIntegrationRepository } from '../civicIntegration/civicIntegration.repository'
import { CivicIntegrationService } from '../civicIntegration/civicIntegration.service'
import { EducationRepository } from '../education/education.repository'
import { EducationService } from '../education/education.service'
import { EmployeeRepository } from '../employee/employee.repository'
import { LearningNeedRepository } from '../learningneed/learningneed.repository'
import { OrganizationRepository } from '../organization/organization.repository'
import { PersonRepository } from '../person/person.repository'
import { PersonService } from '../person/person.service'
import { RegistrationStatus } from '../registration/registration.entity'
import { RegistrationRepository } from '../registration/registration.repository'
import { RegistrationService } from '../registration/registration.service'
import { TeamRepository } from '../team/team.repository'
import { AddressPolicy } from '../utils/policy/address.policy'
import { PolicyAction } from '../utils/policy/policy'
import { StudentPolicy } from '../utils/policy/student.policy'
import { getMockCreateStudentInput, getMockEditStudentInput } from './student.mock'
import { StudentRepository } from './student.repository'
import { StudentResolver } from './student.resolver'
import { StudentService } from './student.service'
import { LearningNeedOutcomeRepository } from '../learningNeedOutcome/learningNeedOutcome.repository'
import { LearningNeedOutcomeService } from '../learningNeedOutcome/learningNeedOutcome.service'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { StudentContactMomentPolicy } from '../utils/policy/studentContactMoment.policy'
import { StudentContactMomentRepository } from '../studentContactMoment/studentContactMoment.repository'
import { ParticipationService } from '../participation/participation.service'
import { LearningNeedService } from '../learningneed/learningneed.service'
import { ParticipationRepository } from '../participation/participation.repository'
import { EducationGroupRepository } from '../educationGroup/educationGroup.repository'
import { TestResultRepository } from '../testResult/testResult.repository'
import { TestResultService } from '../testResult/testResult.service'
import { LearningneedPolicy } from '../utils/policy/learningneed.policy'
import { MailService } from '../utils/mail.service'

describe(StudentResolver.name, () => {
    let studentResolver: StudentResolver
    const studentPolicyFn = jest.fn()
    const getForOrganizationFN = jest.fn()
    const getQBForOrganizationFN = jest.fn()
    const findOneOrFail = jest.fn()
    const persistAndFlush = jest.fn()
    const removeAndFlush = jest.fn()
    const qb = jest.fn()
    const queryPaginated = jest.fn()
    const getWithRegistrationOrFail = jest.fn()

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                StudentResolver,
                PersonRepository,
                PersonService,
                OrganizationRepository,
                RegistrationRepository,
                RegistrationService,
                StudentService,
                {
                    provide: MailService,
                    useValue: {},
                },
                {
                    provide: StudentRepository,
                    useValue: {
                        getForOrganization: getForOrganizationFN,
                        getQBForOrganization: getQBForOrganizationFN,
                        getWithRegistrationOrFail,
                        findOneOrFail,
                        persistAndFlush,
                        removeAndFlush,
                        qb,
                        queryPaginated,
                    },
                },
                AddressService,
                AddressPolicy,
                AddressRepository,
                EmployeeRepository,
                LearningNeedRepository,
                { provide: StudentPolicy, useValue: { throwIfNotSatisfiedBy: studentPolicyFn } },
                EducationRepository,
                EducationService,
                CivicIntegrationRepository,
                CivicIntegrationService,
                TeamRepository,
                LearningNeedOutcomeRepository,
                LearningNeedOutcomeService,
                StudentContactMomentPolicy,
                StudentContactMomentRepository,
                ParticipationService,
                LearningNeedService,
                ParticipationRepository,
                EducationGroupRepository,
                TestResultRepository,
                TestResultService,
                LearningneedPolicy,
            ],
        }).compile()

        studentResolver = module.get(StudentResolver)
    })

    beforeEach(() => jest.clearAllMocks())

    describe('students and registrations', () => {
        const mockCreateStudentInput = getMockCreateStudentInput()
        const mockEditStudentInput = getMockEditStudentInput()

        it('should check access', async () => {
            const organizationId = 'some-org-id'
            const studentId = 'some-student-id'

            try {
                await studentResolver.students({} as UserWithCurrentEmployee, { skip: 0, take: 10 }, { organizationId })
            } catch {}
            expect(studentPolicyFn).toBeCalledWith({}, PolicyAction.read, { organizationId })

            try {
                await studentResolver.students(
                    {} as UserWithCurrentEmployee,
                    { skip: 0, take: 10 },
                    { organizationId, status: RegistrationStatus.pending }
                )
            } catch {}
            expect(studentPolicyFn).toBeCalledWith({}, PolicyAction.read, { organizationId })

            try {
                await studentResolver.acceptRegistration({} as UserWithCurrentEmployee, studentId)
            } catch {}
            expect(studentPolicyFn).toBeCalledWith({}, PolicyAction.update, { studentId })

            try {
                await studentResolver.rejectRegistration({} as UserWithCurrentEmployee, studentId)
            } catch {}
            expect(studentPolicyFn).toBeCalledWith({}, PolicyAction.update, { studentId })

            try {
                await studentResolver.rejectRegistration({} as UserWithCurrentEmployee, studentId)
            } catch {}
            expect(studentPolicyFn).toBeCalledWith({}, PolicyAction.delete, { studentId })

            try {
                await studentResolver.createStudent({} as UserWithCurrentEmployee, mockCreateStudentInput)
            } catch {}
            expect(studentPolicyFn).toBeCalledWith({}, PolicyAction.create, {
                organizationId: mockCreateStudentInput.organization,
            })

            try {
                await studentResolver.editStudent({} as UserWithCurrentEmployee, mockEditStudentInput)
            } catch {}
            expect(studentPolicyFn).toBeCalledWith({}, PolicyAction.update, {
                studentId: mockEditStudentInput.id,
            })
        })

        it.skip('students should call getForOrganization with organizationId and type', async () => {
            studentPolicyFn.mockResolvedValue(true)
            const organizationId = 'some-org-id'

            await studentResolver.students({} as UserWithCurrentEmployee, { skip: 0, take: 10 }, { organizationId })

            expect(getQBForOrganizationFN).toBeCalledWith(organizationId, undefined)
            expect(queryPaginated).toBeCalledTimes(1)

            try {
                await studentResolver.students(
                    {} as UserWithCurrentEmployee,
                    { skip: 0, take: 10 },
                    { organizationId, status: RegistrationStatus.pending }
                )
            } catch {}
            expect(getQBForOrganizationFN).toBeCalledWith(organizationId, RegistrationStatus.pending)
        })

        it('acceptStudent should save with status accepted', async () => {
            studentPolicyFn.mockResolvedValue(true)
            const studentId = 'some-student-id'
            getWithRegistrationOrFail.mockResolvedValue({ registration: { status: RegistrationStatus.pending } })
            await studentResolver.acceptRegistration({} as UserWithCurrentEmployee, studentId)

            expect(persistAndFlush).toBeCalledWith({ registration: { status: RegistrationStatus.accepted } })
        })

        it('acceptStudent and rejectStudent should throw if student is not pending', async () => {
            studentPolicyFn.mockResolvedValue(true)
            const studentId = 'some-student-id'
            findOneOrFail.mockResolvedValue({ registration: { status: RegistrationStatus.accepted } })
            await expect(studentResolver.acceptRegistration({} as UserWithCurrentEmployee, studentId)).rejects.toThrow()
            await expect(studentResolver.rejectRegistration({} as UserWithCurrentEmployee, studentId)).rejects.toThrow()
        })

        it('rejectStudent should call removeAndFlush', async () => {
            studentPolicyFn.mockResolvedValue(true)
            const studentId = 'some-student-id'
            const mockedStudentReturn = { registration: { status: RegistrationStatus.pending } }
            getWithRegistrationOrFail.mockResolvedValue(mockedStudentReturn)
            await studentResolver.rejectRegistration({} as UserWithCurrentEmployee, studentId)

            expect(removeAndFlush).toBeCalledWith(mockedStudentReturn)
        })

        it('createStudent should call editStudent', async () => {
            studentPolicyFn.mockResolvedValue(true)
            const createStudent = jest.spyOn(StudentService.prototype, 'createStudent')

            try {
                await studentResolver.createStudent({} as UserWithCurrentEmployee, mockCreateStudentInput)
            } catch {}

            expect(createStudent).toBeCalledWith(expect.any(Object), mockCreateStudentInput)
        })

        it('editStudent should call editStudent', async () => {
            studentPolicyFn.mockResolvedValue(true)
            const editStudent = jest.spyOn(StudentService.prototype, 'editStudent')

            try {
                await studentResolver.editStudent({} as UserWithCurrentEmployee, mockEditStudentInput)
            } catch {}

            expect(editStudent).toBeCalledWith(mockEditStudentInput)
        })
    })
})
