import { Injectable } from '@nestjs/common'
import { Policy, PolicyAction } from './policy'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    organizationId?: string
}
@Injectable()
export class PostalCodeAreaPolicy extends Policy<Args> {
    protected policy = 'postalcode'
    private contextEmployeeOrganizationId: string

    public constructor() {
        super()
    }

    protected async isSatisfiedBy(args: Args) {
        if (args.organizationId) {
            this.contextEmployeeOrganizationId = this.user.currentEmployee.organizationId
        }

        switch (this.action) {
            case PolicyAction.read:
                return args.organizationId ? this.contextEmployeeOrganizationId === args.organizationId : true
            case PolicyAction.create:
            case PolicyAction.update:
            case PolicyAction.delete:
                throw new DomainError('not allowed')
            default:
                throw new DomainError('policy action not provided')
        }
    }
}
