import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { CivicIntegration } from './civicIntegration.entity'

export class CivicIntegrationRepository extends CustomBaseRepository<CivicIntegration> {
    protected readonly entityName = 'CivicIntegration'
}
