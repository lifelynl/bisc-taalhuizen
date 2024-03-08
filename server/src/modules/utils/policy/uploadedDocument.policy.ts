import { Injectable } from '@nestjs/common'
import { EmployeeRole } from 'src/modules/employee/employee.entity'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { Policy, PolicyAction } from './policy'
import { Student } from 'src/modules/student/student.entity'
import { StudentRepository } from 'src/modules/student/student.repository'
import { UploadedDocumentRepository } from 'src/modules/uploadedDocument/uploadedDocument.repository'
import { Args } from '@nestjs/graphql'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    uploadedDocumentId?: string
    personId?: string
}

@Injectable()
export class UploadedDocumentPolicy extends Policy<Args> {
    protected policy = 'uploadedDocument'

    public constructor(
        private studentRepository: StudentRepository,
        private uploadedDocumentRepository: UploadedDocumentRepository
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

        // user is provider -- if admin, isSatisfiedBy should return early & not reach here

        if (target.student) {
            if (userEmployee.organizationId === target.organizationId) {
                return true
            }

            if (userEmployee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])) {
                return this.studentRepository.isStudentParticipatingInProvider(
                    target.student.id,
                    userEmployee.organizationId
                )
            }

            return this.studentRepository.isEmployeeMenteeOrInEmployeeEducationGroup(target.student.id, userEmployee.id)
        }

        // target is employee & user is provider
        return userEmployee.organizationId === target.organizationId
    }

    private async handleEdit(args: Args) {
        const { userEmployee, target } = await this.getUserEmployeeAndTarget(args)

        if (this.user.accessGroup === OrganizationTypeEnum.provider) {
            return target.createdByUserId ? this.user.id === target.createdByUserId : false
        }

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return userEmployee.organizationId === target.organizationId
        }

        // user is provider -- if admin, isSatisfiedBy should return early & not reach here

        if (target.student) {
            // provider users cannot edit student docs
            return false
        }

        // target is employee & user is provider
        return userEmployee.organizationId === target.organizationId
    }

    private async getUserEmployeeAndTarget(args: Args) {
        if (!args.personId && !args.uploadedDocumentId) {
            throw new DomainError('document-or-person-required')
        }

        const userEmployee = this.user.currentEmployee

        let targetStudent: Student | null = null
        let createdByUserId: string | null = null

        if (args.personId) {
            targetStudent = await this.studentRepository.getForPerson(args.personId)
        } else if (args.uploadedDocumentId) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            targetStudent = await this.studentRepository.getForDocument(args.uploadedDocumentId!)

            const uploadedDocument = await this.uploadedDocumentRepository.findOneOrFail(args.uploadedDocumentId)
            createdByUserId = uploadedDocument.createdByUserId
        } else {
            throw new DomainError('invalid target')
        }

        if (!targetStudent) {
            throw new DomainError(`person ${args.personId} has neither employee or student`)
        }

        return {
            userEmployee,
            target: {
                student: targetStudent,
                organizationId: targetStudent.organizationId,
                createdByUserId,
            },
        }
    }
}
