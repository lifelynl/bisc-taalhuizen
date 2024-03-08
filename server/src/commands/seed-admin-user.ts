import { isEmail } from 'class-validator'
import { Command } from 'nest-commander'
import { OrganizationService } from 'src/modules/organization/organization.service'
import { BaseCommand } from './base-command'

@Command({
    name: 'seed-admin-user',
    description: 'Seeds an empty database with a root organization (BISC) and root user',
})
export class SeedAdminUserCommand extends BaseCommand {
    public constructor(private readonly organizationService: OrganizationService) {
        super('SeedAdminUser')
    }

    // expects user email & password (in plain text)
    public async runCommand(passedParam: string[]): Promise<void> {
        if (!passedParam.length || passedParam.length !== 2) {
            throw new Error('invalid input')
        }

        const emailInput = passedParam[0].trim()
        if (!isEmail(emailInput)) {
            throw new Error(`Given email ${emailInput} is not a valid email`)
        }

        const passwordInput = passedParam[1].trim()
        if (passwordInput.length < 8 || passwordInput.length > 24) {
            throw new Error(`Given password ${passwordInput} must be between 8 & 24 chars long`)
        }

        await this.organizationService.seedInitialOrganization(passwordInput, emailInput)
    }
}
