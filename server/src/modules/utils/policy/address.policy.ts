import { Injectable } from '@nestjs/common'
import { EmployeeRepository } from '../../employee/employee.repository'
import { Policy, PolicyAction } from './policy'
import { DomainError } from '../../../errors/DomainError'

@Injectable()
export class AddressPolicy extends Policy<string> {
    protected policy = 'address'

    public constructor(private employeeRepository: EmployeeRepository) {
        super()
    }

    protected async isSatisfiedBy(organizationId: string) {
        if (this.isAdminUser()) {
            return true
        }

        const employee = await this.employeeRepository.getForUserAndOrganization(this.user.id, organizationId)
        if (!employee) {
            return false
        }

        switch (this.action) {
            case PolicyAction.create:
                throw new DomainError('policy not yet implemented')
            case PolicyAction.read:
                return true
            case PolicyAction.update:
                throw new DomainError('policy not yet implemented')
            case PolicyAction.delete:
                throw new DomainError('policy not yet implemented')
            default:
                throw new DomainError('policy action not provided')
        }
    }
}
