import { Command } from 'nest-commander'
import { BaseCommand } from './base-command'
import { EemlandImportService } from 'src/modules/eemland-import/eemland-import.service'

@Command({ name: 'import-eemland-data', description: 'Imports Eemland data' })
export class ImportEemlandCommand extends BaseCommand {
    public constructor(private readonly eemlandImportService: EemlandImportService) {
        super('ImportEemlandCommand')
    }

    public async runCommand(): Promise<void> {
        await this.eemlandImportService.run()
    }
}
