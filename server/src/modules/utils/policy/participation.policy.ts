import { Injectable } from '@nestjs/common'
import { Args } from '@nestjs/graphql'
import { Employee, EmployeeRole } from 'src/modules/employee/employee.entity'
import { EmployeeRepository } from 'src/modules/employee/employee.repository'
import { LearningNeedRepository } from 'src/modules/learningneed/learningneed.repository'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { Participation } from 'src/modules/participation/participation.entity'
import { ParticipationRepository } from 'src/modules/participation/participation.repository'
import { StudentRepository } from 'src/modules/student/student.repository'
import { Student } from 'src/modules/student/student.entity'
import { Policy, PolicyAction } from './policy'
import { ParticipationService } from 'src/modules/participation/participation.service'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    paticipationId?: string
    learningNeedId?: string
    studentIdForNewLearningNeed?: string
    providerId?: string
    studentId?: string
}

@Injectable()
export class ParticipationPolicy extends Policy<Args> {
    protected policy = 'participation'
    private targetProviderOrganizationId: string | null
    private targetLanguageHouseOrganizationId: string | null
    private contextOrganizationId: string
    private contextUserEmployee: Employee
    private participation: Participation | null
    private targetStudent: Student
    private targetStudentId: string

    public constructor(
        private participationRepository: ParticipationRepository,
        private employeeRepository: EmployeeRepository,
        private learningNeedRepository: LearningNeedRepository,
        private studentRepository: StudentRepository,
        private participationService: ParticipationService
    ) {
        super()
    }

    protected async isSatisfiedBy(args: Args) {
        this.contextUserEmployee = this.user.currentEmployee
        this.contextOrganizationId = this.contextUserEmployee.organizationId
        this.participation = args.paticipationId
            ? await this.participationRepository.getWithLearningNeedOrFail(args.paticipationId)
            : null

        this.targetStudentId = await this.getStudentId(args)
        this.targetProviderOrganizationId = await this.getTargetProviderOrganizationId(args)
        this.targetLanguageHouseOrganizationId = await this.getTargetLanguageHouseOrganizationId(this.targetStudentId)

        switch (this.action) {
            case PolicyAction.read:
                return this.handleRead()
            case PolicyAction.create:
                return this.handleCreate()
            case PolicyAction.update:
                return this.handleUpdate()
            case PolicyAction.delete:
                return this.handleDelete()
            default:
                throw new DomainError('policy action not provided')
        }
    }

    private async handleRead() {
        if (this.isAdminUser()) {
            return false
        }

        if (!this.contextUserEmployee.role) {
            return false
        }

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return this.contextOrganizationId === this.targetLanguageHouseOrganizationId
        }

        if (this.user.accessGroup === OrganizationTypeEnum.provider) {
            if (this.contextUserEmployee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])) {
                return (
                    this.targetProviderOrganizationId === this.contextOrganizationId ||
                    this.studentRepository.isStudentParticipatingInProvider(
                        this.targetStudentId,
                        this.contextUserEmployee.organizationId
                    )
                )
            }

            if (this.contextUserEmployee.hasOneOfRoles([EmployeeRole.mentor, EmployeeRole.volunteer])) {
                return this.studentRepository.isEmployeeMenteeOrInEmployeeEducationGroup(
                    this.targetStudentId,
                    this.contextUserEmployee.id
                )
            }
        }

        return false
    }

    private async handleCreate() {
        if (this.isAdminUser()) {
            return false
        }

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return this.contextOrganizationId === this.targetLanguageHouseOrganizationId
        }

        if (this.user.accessGroup === OrganizationTypeEnum.provider) {
            return this.participationService.isStudentConnectedToProviderByParticipation(
                this.targetStudent.id,
                this.contextOrganizationId
            )
        }

        return false
    }

    private async handleUpdate() {
        if (this.isAdminUser()) {
            return false
        }

        if (!this.contextUserEmployee.role) {
            return false
        }

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return this.contextOrganizationId === this.targetLanguageHouseOrganizationId
        }

        if (OrganizationTypeEnum.provider === this.user.accessGroup) {
            if (this.contextUserEmployee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])) {
                return (
                    this.targetProviderOrganizationId === this.contextOrganizationId ||
                    this.studentRepository.isStudentParticipatingInProvider(
                        this.targetStudentId,
                        this.contextUserEmployee.organizationId
                    )
                )
            }

            if (this.contextUserEmployee.hasOneOfRoles([EmployeeRole.mentor, EmployeeRole.volunteer])) {
                return this.studentRepository.isEmployeeMenteeOrInEmployeeEducationGroup(
                    this.targetStudentId,
                    this.contextUserEmployee.id
                )
            }
        }

        return false
    }

    private async handleDelete() {
        if (this.isAdminUser()) {
            return false
        }

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return this.contextOrganizationId === this.targetLanguageHouseOrganizationId
        }
        return false
    }

    private getTargetProviderOrganizationId(args: Args): string | null {
        if (args.providerId) {
            return args.providerId
        } else if (this.participation && this.participation.providerId) {
            return this.participation.providerId
        }

        return null
    }

    private async getStudentId(args: Args): Promise<string> {
        // existing participation
        if (this.participation) {
            const learningNeed =
                this.participation.learningNeed ??
                (await this.learningNeedRepository.findOneOrFail(this.participation.learningNeedId))

            return learningNeed.studentId
        }

        // new participation, new learning need
        if (args.studentIdForNewLearningNeed) {
            return args.studentIdForNewLearningNeed
        }

        if (args.studentId) {
            return args.studentId
        }

        // new participation, existing learning need
        if (args.learningNeedId) {
            const learningNeed = await this.learningNeedRepository.findOneOrFail(args.learningNeedId)
            return learningNeed.studentId
        }

        throw new DomainError('[ParticipationPolicy] Could not determine student')
    }

    private async getTargetLanguageHouseOrganizationId(studentId: string) {
        this.targetStudent = await this.studentRepository.findOneOrFail(studentId)
        return this.targetStudent.organizationId
    }
}
