import { Command } from 'nest-commander'
import { PostalCodeAreaService } from 'src/modules/postalCodeArea/postalCodeArea.service'
import { BaseCommand } from './base-command'

@Command({ name: 'seed-postal-codes', description: 'Seeds an empty postal codes table with postal codes' })
export class SeedPostalCodes extends BaseCommand {
    public constructor(private postalCodeAreaService: PostalCodeAreaService) {
        super('SeedPostalCodes')
    }

    // expects user email & password (in plain text)
    public async runCommand(): Promise<void> {
        const currentAmount = await this.postalCodeAreaService.getTotalCount()

        if (currentAmount > 0) {
            throw new Error('Could not seed postal codes: table not empty')
        }

        await this.postalCodeAreaService.insertAllPostalCodes()
    }
}
