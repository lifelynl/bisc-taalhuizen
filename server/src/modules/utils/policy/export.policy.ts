import { Injectable } from '@nestjs/common'
import { EmployeeRole } from 'src/modules/employee/employee.entity'
import { EmployeeRepository } from 'src/modules/employee/employee.repository'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { StudentRepository } from 'src/modules/student/student.repository'
import { Policy } from './policy'
import { DomainError } from '../../../errors/DomainError'

type Args = LearningNeedExportArgs | StudentLearningNeedExportArgs | ParticipationExportArgs | StudentExportArgs

interface ParticipationExportArgs {
    type: 'participation' | 'providerParticipation'
    organizationId: string
}

interface LearningNeedExportArgs {
    type: 'learningNeed'
    organizationId: string
}

interface StudentLearningNeedExportArgs {
    type: 'studentLearningNeed'
    studentId: string
}

interface StudentExportArgs {
    type: 'student'
    organizationId: string
}

@Injectable()
export class ExportPolicy extends Policy<Args> {
    protected policy = 'export'

    public constructor(
        private readonly employeeRepository: EmployeeRepository,
        private readonly studentRepository: StudentRepository
    ) {
        super()
    }

    protected isSatisfiedBy(args?: Args) {
        if (!args) {
            throw new DomainError('export policy args not passed')
        }

        if (args.type === 'learningNeed') {
            return this.checkForLearningNeed(args)
        }

        if (args.type === 'student') {
            return this.checkForStudent(args)
        }

        if (args.type === 'participation') {
            return this.checkForParticipation(args)
        }

        if (args.type === 'providerParticipation') {
            return this.checkForParticipationForProvider(args)
        }
        if (args.type === 'studentLearningNeed') {
            return this.checkForStudentLearningNeed(args)
        }

        return true
    }

    private async checkForLearningNeed(args: LearningNeedExportArgs) {
        if (this.isAdminUser()) {
            return true
        }

        const employee = await this.employeeRepository.getForUserAndOrganization(this.user.id, args.organizationId)
        if (!employee) {
            return false
        }

        return employee.role === EmployeeRole.coordinator
    }

    private async checkForStudent(args: StudentExportArgs) {
        if (this.isAdminUser()) {
            return true
        }

        const employee = await this.employeeRepository.getForUserAndOrganization(this.user.id, args.organizationId)
        if (!employee) {
            return false
        }

        return employee.role === EmployeeRole.coordinator
    }

    private async checkForParticipation(args: ParticipationExportArgs) {
        if (this.isAdminUser()) {
            return false
        }

        const employee = await this.employeeRepository.getForUserAndOrganization(this.user.id, args.organizationId)
        if (!employee) {
            return false
        }

        return (
            this.user.accessGroup === OrganizationTypeEnum.languageHouse && employee.role === EmployeeRole.coordinator
        )
    }

    private async checkForParticipationForProvider(args: ParticipationExportArgs) {
        if (this.isAdminUser()) {
            return false
        }

        const employee = await this.employeeRepository.getForUserAndOrganization(this.user.id, args.organizationId)
        if (!employee?.role) {
            return false
        }

        return (
            this.user.accessGroup === OrganizationTypeEnum.provider &&
            [EmployeeRole.coordinator, EmployeeRole.coordinatorMentor].includes(employee.role)
        )
    }

    private async checkForStudentLearningNeed(args: StudentLearningNeedExportArgs) {
        if (this.user.accessGroup !== OrganizationTypeEnum.languageHouse) {
            return false
        }

        const student = await this.studentRepository.findOneOrFail(args.studentId)

        return this.user.currentEmployee.organizationId === student.organizationId
    }
}
