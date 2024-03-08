import { Injectable } from '@nestjs/common'
import { Employee, EmployeeRole } from 'src/modules/employee/employee.entity'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { Student } from 'src/modules/student/student.entity'
import { StudentRepository } from 'src/modules/student/student.repository'
import { Policy, PolicyAction } from './policy'
import { OrganizationRepository } from 'src/modules/organization/organization.repository'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    organizationId?: string
    studentId?: string
}

@Injectable()
export class StudentPolicy extends Policy<Args> {
    protected policy = 'student'
    private contextUserEmployee: Employee
    private targetStudent: Student
    private targetOrganizationId: string

    public constructor(
        private studenteRepository: StudentRepository,
        private organizationRepository: OrganizationRepository
    ) {
        super()
    }

    protected async isSatisfiedBy(args: Args) {
        this.contextUserEmployee = this.user.currentEmployee

        if (!args.organizationId && this.action === PolicyAction.create) {
            throw new DomainError('organizationId is required')
        }

        if (!args.studentId && [PolicyAction.delete, PolicyAction.update].includes(this.action)) {
            throw new DomainError('studentId is required')
        }

        if (!args.studentId && !args.organizationId && this.action === PolicyAction.read) {
            throw new DomainError('studentId or organizationId is required')
        }

        if (args.studentId) {
            this.targetStudent = await this.studenteRepository.findOneOrFail(args.studentId)
            this.targetOrganizationId = this.targetStudent.organizationId
        } else if (args.organizationId) {
            this.targetOrganizationId = args.organizationId
        }

        const isProviderUser = this.doesAccessGroupSatisfy([OrganizationTypeEnum.provider])

        switch (this.action) {
            case PolicyAction.create:
                if (isProviderUser && (await this.isUserOfProviderWithoutEdit())) {
                    return false
                }

                return this.contextUserEmployee.organizationId === this.targetOrganizationId
            case PolicyAction.read:
                if (isProviderUser) {
                    return this.checkReadForProvider(args)
                } // otherwise, allow fallthrough
            case PolicyAction.update:
                if (isProviderUser) {
                    if (await this.isUserOfProviderWithoutEdit()) {
                        return false
                    }

                    return this.contextUserEmployee.hasOneOfRoles([
                        EmployeeRole.coordinator,
                        EmployeeRole.coordinatorMentor,
                    ])
                }
            case PolicyAction.delete:
                if (isProviderUser) {
                    if (await this.isUserOfProviderWithoutEdit()) {
                        return false
                    }

                    return this.contextUserEmployee.organizationId === this.targetStudent.organizationId
                }

                return (
                    !isProviderUser &&
                    this.contextUserEmployee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.employee]) &&
                    this.contextUserEmployee.organizationId === this.targetOrganizationId
                )
            default:
                throw new DomainError('policy action not provided')
        }
    }

    private async checkReadForProvider({ studentId }: Args) {
        // if studentId isn't provided, it must be a bulk action
        if (!studentId) {
            // the results will/should get filtered in query
            return true
        }

        if (
            !(await this.isUserOfProviderWithoutEdit()) &&
            this.contextUserEmployee.organizationId === this.targetStudent.organizationId
        ) {
            return true
        }

        if (this.contextUserEmployee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])) {
            return this.studenteRepository.isStudentParticipatingInProvider(
                studentId,
                this.contextUserEmployee.organizationId
            )
        }

        return this.studenteRepository.isEmployeeMenteeOrInEmployeeEducationGroup(
            studentId,
            this.contextUserEmployee.id
        )
    }

    private isUserOfProviderWithoutEdit() {
        return this.organizationRepository.isProviderWithoutEditRights(this.contextUserEmployee.organizationId)
    }
}
