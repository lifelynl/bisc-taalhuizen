import { Injectable } from '@nestjs/common'
import { EmployeeRole } from 'src/modules/employee/employee.entity'
import { EmployeeRepository } from 'src/modules/employee/employee.repository'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { Policy, PolicyAction } from './policy'
import { Student } from 'src/modules/student/student.entity'
import { StudentRepository } from 'src/modules/student/student.repository'
import { ParticipationRepository } from 'src/modules/participation/participation.repository'
import { OrganizationRepository } from 'src/modules/organization/organization.repository'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    studentId?: string
    learningneedId?: string
}

@Injectable()
export class LearningneedPolicy extends Policy<Args> {
    protected policy = 'learningneed'

    public constructor(
        private employeeRepository: EmployeeRepository,
        private studentRepository: StudentRepository,
        private participationRepository: ParticipationRepository,
        private organizationRepository: OrganizationRepository
    ) {
        super()
    }

    protected async isSatisfiedBy(args: Args) {
        if (this.isAdminUser()) {
            return false
        }

        switch (this.action) {
            case PolicyAction.read:
                return this.handleRead(args)
            case PolicyAction.create:
                return this.handleCreate(args)
            case PolicyAction.update:
            case PolicyAction.delete:
                return this.handleEdit(args)
            default:
                throw new DomainError('policy action not provided')
        }
    }

    private async handleRead(args: Args) {
        const { userEmployee, target } = await this.getUserEmployeeAndTarget(args)

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return userEmployee.organizationId === target.organizationId
        }

        if (this.user.accessGroup === OrganizationTypeEnum.provider) {
            if (!userEmployee.role) {
                return false
            }
            if ([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor].includes(userEmployee.role)) {
                if (userEmployee.organization.id === target.organizationId) {
                    return true
                }
                return this.organizationIsConnectedToStudent(userEmployee.organization.id, target.student.id)
            }
            if ([EmployeeRole.mentor, EmployeeRole.volunteer].includes(userEmployee.role)) {
                return this.studentRepository.isEmployeeMenteeOrInEmployeeEducationGroup(
                    target.student.id,
                    userEmployee.id
                )
            }
        }

        return false
    }

    private async handleCreate(args: Args) {
        const { userEmployee, target } = await this.getUserEmployeeAndTarget(args)

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return userEmployee.organizationId === target.organizationId
        }

        if (OrganizationTypeEnum.provider === this.user.accessGroup) {
            if (!userEmployee.role) {
                return false
            }

            if (await this.organizationRepository.isProviderWithoutEditRights(userEmployee.organizationId)) {
                return false
            }

            if ([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor].includes(userEmployee.role)) {
                return true
            }

            if ([EmployeeRole.mentor, EmployeeRole.volunteer].includes(userEmployee.role)) {
                return this.studentRepository.isEmployeeMenteeOrInEmployeeEducationGroup(
                    target.student.id,
                    userEmployee.id
                )
            }
        }

        return false
    }

    private async handleEdit(args: Args) {
        const { userEmployee, target } = await this.getUserEmployeeAndTarget(args)

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return userEmployee.organizationId === target.organizationId
        }

        if (this.user.accessGroup === OrganizationTypeEnum.provider) {
            if (!userEmployee.role) {
                return false
            }

            if (await this.organizationRepository.isProviderWithoutEditRights(userEmployee.organizationId)) {
                return false
            }

            if ([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor].includes(userEmployee.role)) {
                return this.organizationIsConnectedToStudent(userEmployee.organization.id, target.student.id)
            }

            if ([EmployeeRole.mentor, EmployeeRole.volunteer].includes(userEmployee.role)) {
                return this.studentRepository.isEmployeeMenteeOrInEmployeeEducationGroup(
                    target.student.id,
                    userEmployee.id
                )
            }
        }

        return false
    }

    private async organizationIsConnectedToStudent(contextOrganizationId: string, studentId: string) {
        return this.participationRepository.existsForStudentInProvider(studentId, contextOrganizationId)
    }

    private async getUserEmployeeAndTarget(args: Args) {
        if (!args.studentId && !args.learningneedId) {
            throw new DomainError('student-or-learningneed-required')
        }

        let targetStudent: Student | null = null

        if (args.studentId) {
            targetStudent = await this.studentRepository.findOne(args.studentId)
        } else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            targetStudent = await this.studentRepository.getForLearningneed(args.learningneedId!)
        }

        if (!targetStudent) {
            throw new DomainError(`target student not found`)
        }

        const targetOrganizationId = targetStudent?.organizationId

        return {
            userEmployee: this.user.currentEmployee,
            target: {
                student: targetStudent,
                organizationId: targetOrganizationId,
            },
        }
    }
}
