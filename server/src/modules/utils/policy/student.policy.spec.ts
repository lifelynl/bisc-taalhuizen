import { Test } from '@nestjs/testing'
import { EmployeeRepository } from 'src/modules/employee/employee.repository'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { StudentRepository } from 'src/modules/student/student.repository'
import { PolicyAction } from './policy'
import { StudentPolicy } from './student.policy'
import { UserWithCurrentEmployee } from 'src/modules/auth/auth.interface'
import { OrganizationRepository } from 'src/modules/organization/organization.repository'

describe(StudentPolicy.name, () => {
    let studentPolicy: StudentPolicy
    const getForUserOrFail = jest.fn()

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                StudentPolicy,
                StudentRepository,
                OrganizationRepository,
                { provide: EmployeeRepository, useValue: { getForUserOrFail: getForUserOrFail } },
            ],
        }).compile()

        studentPolicy = module.get<StudentPolicy>(StudentPolicy)
    })

    beforeEach(() => jest.clearAllMocks())

    it('should throw if admin', async () => {
        const user = { accessGroup: OrganizationTypeEnum.bisc, id: 'some-id' } as UserWithCurrentEmployee
        const dummyArgsCreateRead = { organizationId: 'target-org-id' }
        const dummyArgsUpdateDelete = { studentId: 'target-student-id' }
        getForUserOrFail.mockResolvedValue({ organizationId: 'bisc-org-id' })

        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, dummyArgsCreateRead)
        ).rejects.toThrow()
        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, dummyArgsCreateRead)
        ).rejects.toThrow()
        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, dummyArgsUpdateDelete)
        ).rejects.toThrow()
        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, dummyArgsUpdateDelete)
        ).rejects.toThrow()
    })

    it('should not throw if same organization', async () => {
        const user = { accessGroup: OrganizationTypeEnum.languageHouse, id: 'some-id' } as UserWithCurrentEmployee
        const dummyArgsCreateRead = { organizationId: 'target-org-id' }
        const dummyArgsUpdateDelete = { studentId: 'target-student-id' }
        getForUserOrFail.mockResolvedValue({ organizationId: 'org-id' })

        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, dummyArgsCreateRead)
        ).rejects.toThrow()
        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, dummyArgsCreateRead)
        ).rejects.toThrow()
        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, dummyArgsUpdateDelete)
        ).rejects.toThrow()
        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, dummyArgsUpdateDelete)
        ).rejects.toThrow()
    })

    it('should throw if different organization', async () => {
        const user = { accessGroup: OrganizationTypeEnum.languageHouse, id: 'some-id' } as UserWithCurrentEmployee
        const dummyArgsCreateRead = { organizationId: 'target-org-id' }
        const dummyArgsUpdateDelete = { studentId: 'target-student-id' }
        getForUserOrFail.mockResolvedValue({ organizationId: 'context-org-id' })

        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, dummyArgsCreateRead)
        ).rejects.toThrow()
        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, dummyArgsCreateRead)
        ).rejects.toThrow()
        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, dummyArgsUpdateDelete)
        ).rejects.toThrow()
        await expect(
            studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, dummyArgsUpdateDelete)
        ).rejects.toThrow()
    })
})
