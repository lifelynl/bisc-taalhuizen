import { Injectable } from '@nestjs/common'
import { EmployeeRole } from 'src/modules/employee/employee.entity'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { Participation, ParticipationProviderOption } from 'src/modules/participation/participation.entity'
import { ParticipationRepository } from 'src/modules/participation/participation.repository'
import { Student } from 'src/modules/student/student.entity'
import { StudentRepository } from 'src/modules/student/student.repository'
import { TestResultRepository } from 'src/modules/testResult/testResult.repository'
import { Policy } from './policy'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    participationId?: string
    testResultId?: string
}

@Injectable()
export class TestResultPolicy extends Policy<Args> {
    protected policy = 'testResult'

    private student: Student
    private participation: Participation

    public constructor(
        private readonly studentRepository: StudentRepository,
        private readonly participationRepository: ParticipationRepository,
        private readonly testResultRepository: TestResultRepository
    ) {
        super()
    }

    protected async isSatisfiedBy(args?: Args | undefined) {
        if (this.isAdminUser()) {
            return false
        }

        if (!args?.participationId && !args?.testResultId) {
            return false
        }

        this.student = await this.getStudentForTestResult(args)
        this.participation = await this.getParticipationForTestResult(args)

        if (this.participation.providerOption === ParticipationProviderOption.other) {
            if (!this.isStudentOfSameOrganization()) {
                return false
            }

            return true
        }

        if (this.participation.providerOption === ParticipationProviderOption.provider) {
            if (!this.isReferralToSameOrganization()) {
                return false
            }

            if (!this.user.currentEmployee.role) {
                return false
            }

            if ([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor].includes(this.user.currentEmployee.role)) {
                return true
            }

            if ([EmployeeRole.mentor, EmployeeRole.volunteer].includes(this.user.currentEmployee.role)) {
                if (this.participation.mentorId) {
                    return this.participation.mentorId === this.user.currentEmployee.id
                }

                if (this.participation.educationGroupId) {
                    // todo check if i am linked to education group
                    return false
                }
            }

            return false
        }

        if (
            this.user.accessGroup === OrganizationTypeEnum.provider &&
            this.user.currentEmployee.role === EmployeeRole.volunteer
        ) {
            return this.isStudentMenteeOrInEducationGroup(args)
        }

        if (this.user.accessGroup) {
            return this.isStudentOfSameOrganization()
        }

        return false
    }

    private async isStudentOfSameOrganization() {
        return this.student.organizationId === this.user.currentEmployee.organizationId
    }

    private async isReferralToSameOrganization() {
        return this.participation.providerId === this.user.currentEmployee.organizationId
    }

    private async isStudentMenteeOrInEducationGroup(args: Args | undefined) {
        if (!args?.participationId && !args?.testResultId) {
            return false
        }

        const student = await this.getStudentForTestResult(args)

        if (student?.mentorId && student.mentorId === this.user.currentEmployee.id) {
            return true
        }

        // TODO: check if user is employee in student's education group (when implemented)

        return false
    }

    private async getStudentForTestResult(args: Args | undefined) {
        if (args?.participationId) {
            return await this.studentRepository.getForParticipationOrFail(args.participationId)
        }

        if (args?.testResultId) {
            return await this.studentRepository.getForTestResultOrFail(args.testResultId)
        }

        throw new DomainError('Could not find student')
    }

    private async getParticipationForTestResult(args: Args | undefined) {
        if (args?.participationId) {
            return await this.participationRepository.findOneOrFail(args?.participationId)
        }

        if (args?.testResultId) {
            const testResult = await this.testResultRepository.findOneOrFail(args.testResultId)
            return await this.participationRepository.findOneOrFail(testResult.participationId)
        }

        throw new DomainError('Could not find participation')
    }
}
