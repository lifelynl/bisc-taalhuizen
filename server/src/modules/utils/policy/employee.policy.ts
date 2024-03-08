import { Injectable } from '@nestjs/common'
import { Policy, PolicyAction } from './policy'
import { EmployeeRepository } from '../../employee/employee.repository'
import { Employee, EmployeeRole } from 'src/modules/employee/employee.entity'
import { Organization, OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { OrganizationRepository } from 'src/modules/organization/organization.repository'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    employeeId?: string
    organizationId?: string
}

@Injectable()
export class EmployeePolicy extends Policy<Args> {
    protected policy = 'employee'

    public constructor(
        private readonly employeeRepository: EmployeeRepository,
        private readonly organizationRepository: OrganizationRepository
    ) {
        super()
    }

    protected async isSatisfiedBy(args: Args) {
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
        if (this.isAdminUser()) {
            return true
        }

        const userEmployee = this.user.currentEmployee
        const { targetOrganization, targetUserEmployee } = await this.getTargetEmployeeAndOrganizationOrFail(args)
        const inSameOrganization = userEmployee.organizationId === targetOrganization.id

        if (targetOrganization.type === OrganizationTypeEnum.languageHouse) {
            return inSameOrganization
        }

        if (OrganizationTypeEnum.provider === targetOrganization.type) {
            if (!targetUserEmployee) {
                return false
            }

            if (userEmployee.id === targetUserEmployee.id) {
                return true
            }

            return inSameOrganization
        }

        throw new DomainError(`policy for organization type ${targetOrganization.type} not implemented`)
    }

    private async handleEdit(args: Args) {
        const userEmployee = this.user.currentEmployee

        if (this.action === PolicyAction.delete) {
            if (args.employeeId === userEmployee.id) {
                throw new DomainError('Kan eigen gebruiker niet verwijderen')
            }
        }

        if (this.isAdminUser()) {
            return true
        }

        const { targetOrganization } = await this.getTargetEmployeeAndOrganizationOrFail(args)
        const inSameOrganization = userEmployee.organizationId === targetOrganization.id

        if (targetOrganization.type === OrganizationTypeEnum.bisc) {
            return inSameOrganization
        }

        if (targetOrganization.type === OrganizationTypeEnum.languageHouse) {
            return inSameOrganization && userEmployee.role === EmployeeRole.coordinator
        }

        if (OrganizationTypeEnum.provider === targetOrganization.type) {
            return (
                inSameOrganization &&
                userEmployee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])
            )
        }

        throw new DomainError(`policy for organization type ${targetOrganization.type} not implemented`)
    }

    private async getTargetEmployeeAndOrganizationOrFail(args: Args) {
        let targetUserEmployee: Employee | undefined
        let targetOrganization: Organization

        if (!args.employeeId && !args.organizationId) {
            throw new DomainError('employee-or-organization-required')
        }

        if (args.employeeId) {
            targetUserEmployee = await this.employeeRepository.findOneOrFail(args.employeeId)
            targetOrganization = await this.organizationRepository.findOneOrFail({ employees: args.employeeId })
        } else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            targetOrganization = await this.organizationRepository.findOneOrFail(args.organizationId!)
        }

        return { targetOrganization, targetUserEmployee }
    }
}
