import { Injectable } from '@nestjs/common'
import { Employee, EmployeeRole } from 'src/modules/employee/employee.entity'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { ParticipationService } from 'src/modules/participation/participation.service'
import { StudentRepository } from 'src/modules/student/student.repository'
import { StudentContactMomentRepository } from 'src/modules/studentContactMoment/studentContactMoment.repository'
import { Policy, PolicyAction } from './policy'
import { StudentContactMoment } from 'src/modules/studentContactMoment/studentContactMoment.entity'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    studentId?: string
    studentContactMomentId?: string
}
@Injectable()
export class StudentContactMomentPolicy extends Policy<Args> {
    protected policy = 'studentContactMoment'
    private studentOrganizationId: string | null
    private contextOrganizationId: string
    private contextUserEmployee: Employee
    private targetStudentId: string
    private createdByEmployeeId: string | null
    private studentContactMoment: StudentContactMoment | null

    public constructor(
        private studentContactMomentRepository: StudentContactMomentRepository,
        private studentRepository: StudentRepository,
        private participationService: ParticipationService
    ) {
        super()
    }
    protected async isSatisfiedBy(args: Args) {
        this.contextUserEmployee = this.user.currentEmployee
        this.contextOrganizationId = this.contextUserEmployee.organizationId

        const { studentOrganizationId, studentId, createdByEmployeeId, studentContactMoment } = await this.getTargets(
            args
        )
        this.studentOrganizationId = studentOrganizationId
        this.targetStudentId = studentId
        this.createdByEmployeeId = createdByEmployeeId ?? null
        this.studentContactMoment = studentContactMoment ?? null

        switch (this.action) {
            case PolicyAction.read:
                return this.handleRead()
            case PolicyAction.create:
                return this.handleCreate()
            case PolicyAction.update:
            case PolicyAction.delete:
                return this.handleEdit()
            default:
                throw new DomainError('policy action not provided')
        }
    }

    private handleRead() {
        if (this.isAdminUser()) {
            return false
        }

        if (!this.studentOrganizationId) {
            return false
        }

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return this.contextOrganizationId === this.studentOrganizationId
        }

        if (this.user.accessGroup === OrganizationTypeEnum.provider) {
            if (
                this.contextUserEmployee.role === EmployeeRole.coordinator ||
                this.contextUserEmployee.role === EmployeeRole.coordinatorMentor
            ) {
                return (
                    this.contextOrganizationId === this.studentOrganizationId ||
                    this.studentRepository.isStudentParticipatingInProvider(
                        this.targetStudentId,
                        this.contextOrganizationId
                    )
                )
            } else {
                return this.studentRepository.isEmployeeMenteeOrInEmployeeEducationGroup(
                    this.targetStudentId,
                    this.contextUserEmployee.id
                )
            }
        }

        return false
    }

    private handleCreate() {
        if (this.isAdminUser()) {
            return false
        }

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return this.contextOrganizationId === this.studentOrganizationId
        }

        if (this.user.accessGroup === OrganizationTypeEnum.provider) {
            return this.participationService.isStudentConnectedToProviderByParticipation(
                this.targetStudentId,
                this.contextOrganizationId
            )
        }

        return false
    }

    private handleEdit() {
        if (this.isAdminUser()) {
            return false
        }

        return (
            this.createdByEmployeeId === this.contextUserEmployee.id ||
            this.contextOrganizationId === this.studentContactMoment?.createdByOrganizationId
        )
    }

    private async getTargets(args: Args) {
        if (args.studentId) {
            const student = await this.studentRepository.findOneOrFail(args.studentId)
            return { studentId: student.id, studentOrganizationId: student.organizationId }
        } else if (args.studentContactMomentId) {
            const studentContactMoment = await this.studentContactMomentRepository.getWithStudentOrFail(
                args.studentContactMomentId
            )
            return {
                studentId: studentContactMoment.studentId,
                studentOrganizationId: studentContactMoment.student.organizationId,
                createdByEmployeeId: studentContactMoment.createdByEmployeeId,
                studentContactMoment,
            }
        }

        throw new DomainError('missing-target')
    }
}
