import { Test } from '@nestjs/testing'
import { EmployeeRole } from 'src/modules/employee/employee.entity'
import { EmployeeRepository } from 'src/modules/employee/employee.repository'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { OrganizationRepository } from 'src/modules/organization/organization.repository'
import { PersonRepository } from 'src/modules/person/person.repository'
import { EmployeePolicy } from './employee.policy'
import { PolicyAction } from './policy'
import { UserWithCurrentEmployee } from 'src/modules/auth/auth.interface'

describe(EmployeePolicy.name, () => {
    const getEmployeeForUser = jest.fn()
    const findOneOrFail = jest.fn()
    const findOneOrFailOrg = jest.fn()
    let employeePolicy: EmployeePolicy
    const findOnePerson = jest.fn()
    const findOnePersonByEmail = jest.fn()

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: EmployeeRepository,
                    useValue: {
                        findOneOrFail,
                        getForUser: getEmployeeForUser,
                        getForUserOrFail: getEmployeeForUser,
                    },
                },
                EmployeePolicy,
                { provide: OrganizationRepository, useValue: { findOneOrFail: findOneOrFailOrg } },
                {
                    provide: PersonRepository,
                    useValue: { findOne: findOnePerson, findOneByEmail: findOnePersonByEmail },
                },
            ],
        }).compile()

        employeePolicy = module.get<EmployeePolicy>(EmployeePolicy)
    })

    beforeEach(() => jest.clearAllMocks())

    it('should not throw if admin', async () => {
        const employee = {
            accessGroup: OrganizationTypeEnum.bisc,
            id: 'some-id',
            currentEmployee: {},
        } as UserWithCurrentEmployee
        const dummyArgs = { employeeId: 'target-id' }

        // will run 4 times
        findOneOrFail.mockResolvedValue({ id: 'context-id' })
        getEmployeeForUser.mockResolvedValue(employee)

        findOnePerson.mockResolvedValue({ user: employee })

        for (const val of Object.values(PolicyAction)) {
            if (val === PolicyAction.export) {
                continue
            }
            await expect(employeePolicy.throwIfNotSatisfiedBy(employee, val, dummyArgs)).resolves.not.toBeDefined()
        }
    })

    it('should throw if trying to access other organizations', async () => {
        findOneOrFail
            .mockResolvedValueOnce({ organizationId: 'org-1' })
            .mockResolvedValueOnce({ organizationId: 'org-2' })

        const user = { accessGroup: OrganizationTypeEnum.languageHouse, id: 'some-id' } as UserWithCurrentEmployee
        const dummyArgs = { organizationId: 'org-2', employeeId: 'id' }

        for (const val of Object.values(PolicyAction)) {
            await expect(employeePolicy.throwIfNotSatisfiedBy(user, val, dummyArgs)).rejects.toThrow()
        }
    })

    it('should not throw if trying to access another user in own organization', async () => {
        const organizationId = 'org-1'
        const dummyArgs = { organizationId, employeeId: 'id' }
        const contextUserEmployee = {
            organizationId,
            id: `1`,
            role: EmployeeRole.coordinator,
            hasOneOfRoles: (x: EmployeeRole[]) => !!x,
            person: { user: {} },
        }
        const targetUserEmployee = {
            organizationId,
            person: { user: { accessGroup: OrganizationTypeEnum.languageHouse } },
            hasOneOfRoles: (x: EmployeeRole[]) => !!x,
        }

        getEmployeeForUser.mockResolvedValue(contextUserEmployee)
        findOneOrFailOrg.mockResolvedValue({ type: OrganizationTypeEnum.languageHouse, id: organizationId })
        findOneOrFail.mockResolvedValue(targetUserEmployee)

        for (const val of Object.values(PolicyAction)) {
            if (val === PolicyAction.export) {
                continue
            }
            await expect(
                employeePolicy.throwIfNotSatisfiedBy(
                    {
                        ...contextUserEmployee.person.user,
                        currentEmployee: contextUserEmployee,
                    } as UserWithCurrentEmployee,
                    val,
                    dummyArgs
                )
            ).resolves.not.toBeDefined()
        }
    })
})
