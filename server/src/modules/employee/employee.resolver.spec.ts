import { Loaded } from '@mikro-orm/core'
import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { AddressRepository } from '../address/address.repository'
import { AddressService } from '../address/address.service'
import { EducationRepository } from '../education/education.repository'
import { EducationService } from '../education/education.service'
import { OrganizationTypeEnum } from '../organization/organization.entity'
import { OrganizationRepository } from '../organization/organization.repository'
import { Person } from '../person/person.entity'
import { getMockPerson } from '../person/person.mock'
import { PersonRepository } from '../person/person.repository'
import { PersonService } from '../person/person.service'
import { StudentRepository } from '../student/student.repository'
import { TeamRepository } from '../team/team.repository'
import { getMockUserWithoutPassword } from '../user/user.mock'
import { UserRepository } from '../user/user.repository'
import { HashingService } from '../utils/hashing.service'
import { MailService } from '../utils/mail.service'
import { AddressPolicy } from '../utils/policy/address.policy'
import { EmployeePolicy } from '../utils/policy/employee.policy'
import { OrganizationPolicy } from '../utils/policy/organization.policy'
import { PolicyAction } from '../utils/policy/policy'
import { EmployeeRole } from './employee.entity'
import { getMockEmployee } from './employee.mock'
import { EmployeeRepository } from './employee.repository'
import { EmployeeResolver } from './employee.resolver'
import { EmployeeService } from './employee.service'
import { CreateEmployeeInputType, EditEmployeeInputType } from './employee.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

describe(EmployeeResolver.name, () => {
    const findOneOrFail = jest.fn()
    const findOneOrFailOrganization = jest.fn()
    const find = jest.fn()
    const findOnePerson = jest.fn()
    const findOneUser = jest.fn()
    const findForUsername = jest.fn()
    const findForEmail = jest.fn()
    const checkIfEmailExists = jest.fn()
    const sendInviteUserMail = jest.fn()
    const removeAndFlush = jest.fn()
    const queryPaginated = jest.fn()
    const getWithUserAndEmployeeAndMenteesOrFail = jest.fn()

    const employeePolicyFn = jest.fn()
    const organizationPolicyFn = jest.fn()

    let employeeResolver: EmployeeResolver
    let personRepository: PersonRepository

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AddressPolicy,
                AddressRepository,
                AddressService,
                EducationService,
                EducationRepository,
                EmployeeResolver,
                EmployeeService,
                HashingService,
                ConfigService,
                { provide: OrganizationRepository, useValue: { findOneOrFail: findOneOrFailOrganization } },
                {
                    provide: PersonRepository,
                    useValue: {
                        findOne: findOnePerson,
                        findOneOrFail: jest.fn(),
                        findForUsername: findForUsername,
                        findForEmail: findForEmail,
                        checkIfEmailExists,
                        getWithUserAndEmployeeAndMenteesOrFail,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        persistAndFlush: (entities: any) => entities,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        persist: (entities: any) => entities,
                    },
                },
                PersonService,
                {
                    provide: UserRepository,
                    useValue: {
                        findOne: findOneUser,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        persistAndFlush: (entities: any) => entities,
                    },
                },
                { provide: MailService, useValue: { sendInviteUserMail } },
                {
                    provide: EmployeeRepository,
                    useValue: {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        persist: (entities: any) => entities,
                        findOneOrFail,
                        find,
                        removeAndFlush,
                        qb: () => ({ where: () => ({ groupBy: jest.fn() }) }),
                        queryPaginated,
                    },
                },
                { provide: EmployeePolicy, useValue: { throwIfNotSatisfiedBy: employeePolicyFn } },
                {
                    provide: OrganizationPolicy,
                    useValue: { throwIfNotSatisfiedBy: organizationPolicyFn },
                },
                StudentRepository,
                TeamRepository,
            ],
        }).compile()

        employeeResolver = module.get(EmployeeResolver)
        personRepository = module.get(PersonRepository)
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('employee', () => {
        it('should check access', async () => {
            const employeeId = ''
            try {
                await employeeResolver.employee({} as UserWithCurrentEmployee, employeeId)
            } catch {}

            expect(employeePolicyFn).toBeCalledTimes(1)
            expect(employeePolicyFn).toBeCalledWith({}, PolicyAction.read, {
                employeeId,
            })
        })

        it('should get employee with id', async () => {
            employeePolicyFn.mockResolvedValueOnce(null)
            const id = 'some-id'

            try {
                await employeeResolver.employee({} as UserWithCurrentEmployee, id)
            } catch {}

            expect(findOneOrFail).toBeCalledWith({ id })
        })
    })

    describe('organizationEmployees', () => {
        it('should check access', async () => {
            const organizationId = ''
            try {
                await employeeResolver.organizationEmployees(
                    {} as UserWithCurrentEmployee,
                    { skip: 0, take: 20 },
                    { organizationId }
                )
            } catch {}

            expect(organizationPolicyFn).toBeCalledTimes(1)
            expect(organizationPolicyFn).toBeCalledWith({}, PolicyAction.read, { organizationId })
        })

        it('should get employees for organization', async () => {
            organizationPolicyFn.mockResolvedValueOnce(null)
            const id = 'some-id'
            const skip = 0
            const take = 20

            await employeeResolver.organizationEmployees(
                {} as UserWithCurrentEmployee,
                { skip, take },
                { organizationId: id }
            )

            // undefined, because the mocked qb isnt returning anything
            expect(queryPaginated).toBeCalledWith(expect.anything(), take, skip)
        })
    })

    describe('createEmployee', () => {
        const mockInput: CreateEmployeeInputType = {
            organization: 'some-id',
            person: {
                email: 'some-email',
                givenName: 'name',
                familyName: 'lastname',
            },
            employeeRole: EmployeeRole.coordinator,
        }

        it.skip('should check access', async () => {
            findOnePerson.mockResolvedValueOnce(null)
            findOneOrFailOrganization.mockResolvedValue({ id: 'some-id', type: OrganizationTypeEnum.languageHouse })
            await employeeResolver.createEmployee({} as UserWithCurrentEmployee, mockInput)

            expect(employeePolicyFn).toBeCalledTimes(1)
            expect(employeePolicyFn).toBeCalledWith({}, PolicyAction.create, {
                organizationId: mockInput.organization,
            })
        })

        it('should throw if email belongs to another user', async () => {
            checkIfEmailExists.mockResolvedValue(true)
            employeePolicyFn.mockResolvedValue(null)

            await expect(employeeResolver.createEmployee({} as UserWithCurrentEmployee, mockInput)).rejects.toThrow()
        })

        it.skip('should create all entites, return new employee and send invitation email', async () => {
            const existingUser = null
            jest.spyOn(personRepository, 'checkIfEmailExists').mockResolvedValue(!!existingUser)
            employeePolicyFn.mockResolvedValue(null)

            await expect(
                employeeResolver.createEmployee({} as UserWithCurrentEmployee, mockInput)
            ).resolves.toMatchObject({
                organization: { id: mockInput.organization, type: OrganizationTypeEnum.languageHouse },
                role: mockInput.employeeRole,
            })

            expect(sendInviteUserMail).toBeCalledTimes(1)
        })
    })

    describe('deleteEmployee', () => {
        const id = 'some-id'

        it('should check access', async () => {
            try {
                await employeeResolver.deleteEmployee({} as UserWithCurrentEmployee, id)
            } catch {}

            expect(employeePolicyFn).toBeCalledTimes(1)
            expect(employeePolicyFn).toBeCalledWith({}, PolicyAction.delete, { employeeId: id })
        })

        it('should delete employee and return true', async () => {
            const mockUser = {
                id: 'some-id',
                person: { employees: { length: 2, isInitialized: () => true } },
            }

            employeePolicyFn.mockResolvedValue(null)
            findOneOrFail.mockResolvedValue(mockUser)

            await expect(employeeResolver.deleteEmployee({} as UserWithCurrentEmployee, id)).resolves.toBe(true)
            expect(removeAndFlush).toBeCalledTimes(1)
            expect(removeAndFlush).toBeCalledWith(mockUser)
        })
    })

    describe('editEmployee', () => {
        const mockInput: EditEmployeeInputType = {
            person: {
                email: 'some-email',
                givenName: 'name',
                familyName: 'lastname',
                id: 'some-id',
            },
            employeeRole: EmployeeRole.coordinator,
            id: 'some-id',
        }

        it('should check access', async () => {
            try {
                await employeeResolver.editEmployee({} as UserWithCurrentEmployee, mockInput)
            } catch {}

            expect(employeePolicyFn).toBeCalledTimes(1)
            expect(employeePolicyFn).toBeCalledWith({}, PolicyAction.update, { employeeId: mockInput.id })
        })

        it('should throw if email belongs to another user', async () => {
            const existingUser = { id: 'some-id' }
            findOnePerson.mockResolvedValue(existingUser)
            employeePolicyFn.mockResolvedValue(null)

            await expect(employeeResolver.editEmployee({} as UserWithCurrentEmployee, mockInput)).rejects.toThrow()
        })

        xit('should throw if trying to change own role and current employee isnt a coordinator', async () => {
            const mockUser = getMockUserWithoutPassword()
            const mockPerson = getMockPerson()
            const mockEmployee = getMockEmployee()
            mockEmployee.role = EmployeeRole.employee

            mockPerson.employees.init()
            mockPerson.employees.add(mockEmployee)
            mockPerson.user = mockUser

            jest.spyOn(PersonService.prototype, 'throwIfEmailExists').mockResolvedValue()
            jest.spyOn(personRepository, 'getWithUserAndEmployeeAndMenteesOrFail').mockResolvedValue(
                mockPerson as Loaded<Person, string>
            )
            employeePolicyFn.mockResolvedValue(null)

            await expect(employeeResolver.editEmployee({} as UserWithCurrentEmployee, mockInput)).rejects.toThrow(
                new Error('employee must be a coordinator to change own role')
            )
        })
    })
})
