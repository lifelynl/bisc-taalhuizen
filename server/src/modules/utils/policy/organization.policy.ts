import { Injectable } from '@nestjs/common'
import { EmployeeRole } from 'src/modules/employee/employee.entity'
import { Organization, OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { OrganizationRepository } from 'src/modules/organization/organization.repository'
import { EmployeeRepository } from '../../employee/employee.repository'
import { Policy, PolicyAction } from './policy'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    organizationId?: string
    organizationType?: OrganizationTypeEnum
    forProviderListForParticipations?: boolean
    filterQueryOnProvidersFor?: string
}

@Injectable()
export class OrganizationPolicy extends Policy<Args> {
    protected policy = 'organization'

    public constructor(
        private readonly employeeRepository: EmployeeRepository,
        private readonly organizationRepository: OrganizationRepository
    ) {
        super()
    }

    protected async isSatisfiedBy(args: Args) {
        if (this.isAdminUser()) {
            return true
        }

        if (!args) {
            throw new DomainError('no arguments provided')
        }

        if (this.action === PolicyAction.create) {
            return this.checkForCreateOrDelete(args.organizationType)
        }

        if (
            this.action === PolicyAction.read &&
            args.organizationType === OrganizationTypeEnum.provider &&
            this.user.accessGroup === OrganizationTypeEnum.languageHouse
        ) {
            if (args.forProviderListForParticipations === true) {
                return true
            }

            // trying to bulk read providers beyond the language house's own providers
            if (!args.organizationId && !args.filterQueryOnProvidersFor) {
                return false
            }
        }

        if (this.action === PolicyAction.read && !args.organizationId) {
            // only admins are allowed
            return false
        }

        if (!args.organizationId) {
            throw new DomainError('organization id must be provided')
        }

        const organization = await this.organizationRepository.findOneOrFail({ id: args.organizationId })

        switch (this.action) {
            case PolicyAction.update:
                return this.checkForUpdate(organization)
            case PolicyAction.read:
                return this.checkForRead(organization)
            case PolicyAction.delete:
                return this.checkForCreateOrDelete(organization.type)
            default:
                throw new DomainError('policy action not provided')
        }
    }

    private async checkForUpdate(organization: Organization) {
        const userEmployee = await this.findUserEmployeeWithinOrganization(organization.id)
        if (!userEmployee) {
            return false
        }

        if (organization.type === OrganizationTypeEnum.languageHouse) {
            return userEmployee.role === EmployeeRole.coordinator
        }

        if (organization.type === OrganizationTypeEnum.provider) {
            return userEmployee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])
        }

        return false
    }

    private async checkForRead(organization: Organization) {
        if (
            organization.type === OrganizationTypeEnum.languageHouse ||
            organization.type === OrganizationTypeEnum.provider
        ) {
            return !!(await this.findUserEmployeeWithinOrganization(organization.id))
        }

        return false
    }

    private checkForCreateOrDelete(organizationType?: OrganizationTypeEnum) {
        if (!organizationType) {
            throw new DomainError('no organization type passed')
        }

        if (organizationType === OrganizationTypeEnum.bisc) {
            throw new DomainError('cannot create/delete a bisc organization')
        }

        if (
            organizationType === OrganizationTypeEnum.languageHouse ||
            organizationType === OrganizationTypeEnum.provider
        ) {
            // must be an admin to create/delete
            return false
        }

        return false
    }

    private findUserEmployeeWithinOrganization(organizationId: string) {
        return this.employeeRepository.getForUserAndOrganization(this.user.id, organizationId)
    }
}
