import { Injectable } from '@nestjs/common'
import { EmployeeRole } from 'src/modules/employee/employee.entity'
import { OrganizationTypeEnum } from 'src/modules/organization/organization.entity'
import { TeamRepository } from 'src/modules/team/team.repository'
import { Policy, PolicyAction } from './policy'
import { DomainError } from '../../../errors/DomainError'

interface Args {
    teamId?: string
    teamIds?: string[]
    targetOrganizationId?: string
}

@Injectable()
export class TeamPolicy extends Policy<Args> {
    protected policy = 'team'
    private targetOrganizationId: string

    public constructor(private teamRepository: TeamRepository) {
        super()
    }

    protected async isSatisfiedBy(args: Args) {
        if (this.user.accessGroup === OrganizationTypeEnum.provider) {
            return false
        }

        this.targetOrganizationId = await this.getTargetOrganizationId(args)

        switch (this.action) {
            case PolicyAction.read:
                return this.handleRead()
            case PolicyAction.create:
            case PolicyAction.update:
            case PolicyAction.delete:
                return this.handleEdit()
            default:
                throw new DomainError('policy action not provided')
        }
    }

    private handleRead() {
        if (this.user.accessGroup === OrganizationTypeEnum.bisc) {
            return true
        }

        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return this.targetOrganizationId === this.user.currentEmployee.organizationId
        }

        return false
    }

    private handleEdit() {
        if (this.user.accessGroup === OrganizationTypeEnum.languageHouse) {
            if (this.user.currentEmployee.role === EmployeeRole.coordinator) {
                return this.targetOrganizationId === this.user.currentEmployee.organizationId
            }
        }

        return false
    }

    private async getTargetOrganizationId(args: Args) {
        if (args.targetOrganizationId) {
            return args.targetOrganizationId
        }

        if (args.teamId) {
            const team = await this.teamRepository.findOneOrFail(args.teamId)
            return team.parentOrganizationId
        }

        if (args.teamIds) {
            const teams = await this.teamRepository.getAllInOrganizationOrFail(
                args.teamIds,
                this.user.currentEmployee.organizationId
            )
            return teams[0].parentOrganizationId
        }

        throw new DomainError('teamId or targetOrganizationId is required')
    }
}
