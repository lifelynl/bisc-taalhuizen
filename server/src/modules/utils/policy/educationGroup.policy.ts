import { Injectable } from '@nestjs/common'
import { EducationGroupRepository } from 'src/modules/educationGroup/educationGroup.repository'
import { EmployeeRole } from 'src/modules/employee/employee.entity'
import { EmployeeRepository } from 'src/modules/employee/employee.repository'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { Policy, PolicyAction } from './policy'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    organizationId?: string
    educationGroupId?: string
}

@Injectable()
export class EducationGroupPolicy extends Policy<Args> {
    protected policy = 'educationGroup'

    public constructor(
        private readonly employeeRepository: EmployeeRepository,
        private readonly educationGroupRepository: EducationGroupRepository
    ) {
        super()
    }

    protected isSatisfiedBy(args?: Args) {
        if (this.isAdminUser()) {
            return true
        }

        // early exit for any read, allowed for admin+LH
        if (
            this.action === PolicyAction.read &&
            [OrganizationTypeEnum.bisc, OrganizationTypeEnum.languageHouse].includes(this.user.accessGroup)
        ) {
            return true
        }

        if (!args?.organizationId && !args?.educationGroupId) {
            throw new DomainError('must pass either organizationId or educationGroupId')
        }

        switch (this.action) {
            case PolicyAction.read:
                return this.handleRead(args)
            case PolicyAction.create:
            case PolicyAction.delete:
            case PolicyAction.update:
                return this.handleUpdate(args)
            default:
                throw new DomainError('action not implemented')
        }
    }

    private async handleRead(args: Args) {
        // user is provider -- because if admin user or LH, isSatisfiedBy should return early

        const educationGroup = args.educationGroupId
            ? await this.educationGroupRepository.findOneOrFail(args.educationGroupId)
            : null

        const organizationId = educationGroup?.organizationId || args.organizationId
        if (!organizationId) {
            // this should not be possible because the policy should receive either
            // an organizationId or an educationGroupId
            return false
        }

        const userEmployee = await this.employeeRepository.getForUserAndOrganization(this.user.id, organizationId)

        if (!userEmployee) {
            return false
        }

        if (!educationGroup) {
            // if no education group is provided, this is considered a bulk action
            // and the policy logic is handled in the resolver, with the query builder
            return true
        }

        if (userEmployee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])) {
            return true
        }

        if (educationGroup) {
            return !!(await this.educationGroupRepository.findOne({
                id: educationGroup.id,
                employees: userEmployee.id,
            }))
        }

        return false
    }

    private async handleUpdate(args: Args) {
        if (this.doesAccessGroupSatisfy(OrganizationTypeEnum.languageHouse)) {
            return false
        }

        // user is provider -- because if admin user, isSatisfiedBy should return early

        const educationGroup = args.educationGroupId
            ? await this.educationGroupRepository.findOneOrFail(args.educationGroupId)
            : null

        const organizationId = educationGroup?.organizationId || args.organizationId
        if (!organizationId) {
            // this should not be possible because the policy should receive either
            // an organizationId or an educationGroupId
            return false
        }

        const userEmployee = await this.employeeRepository.getForUserAndOrganization(this.user.id, organizationId)

        if (userEmployee?.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])) {
            return true
        }

        return false
    }
}
