import { isArray } from 'lodash'
import { UserWithCurrentEmployee } from 'src/modules/auth/auth.interface'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { DomainError } from '../../../errors/DomainError'

export enum PolicyAction {
    create = 'CREATE',
    read = 'READ',
    update = 'UPDATE',
    delete = 'DELETE',
    export = 'EXPORT',
}

export abstract class Policy<Args> {
    protected abstract policy: string
    protected user: UserWithCurrentEmployee
    protected action: PolicyAction

    public async throwIfNotSatisfiedBy(user: UserWithCurrentEmployee, action: PolicyAction, args?: Args) {
        this.user = user
        this.action = action

        if ((await this.isSatisfiedBy(args)) !== true) {
            throw new DomainError(`user does not satisfy ${this.policy} policy for ${this.action}`)
        }
    }

    protected abstract isSatisfiedBy(args?: Args): boolean | Promise<boolean>

    protected doesAccessGroupSatisfy(accessGroupToCheckAgainst: OrganizationTypeEnum | OrganizationTypeEnum[]) {
        return isArray(accessGroupToCheckAgainst)
            ? accessGroupToCheckAgainst.includes(this.user.accessGroup)
            : this.user.accessGroup === accessGroupToCheckAgainst
    }

    protected isAdminUser() {
        return this.user.accessGroup === OrganizationTypeEnum.bisc
    }
}
