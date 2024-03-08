import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { PostalCodeArea } from './postalCodeArea.entity'
import { QueryOrder } from '@mikro-orm/core'

export class PostalCodeAreaRepository extends CustomBaseRepository<PostalCodeArea> {
    protected readonly entityName = 'PostalCodeArea'

    public getPostalCodeAreasForTeam(teamId: string) {
        return this.find({ team: teamId }, { orderBy: { code: QueryOrder.ASC } })
    }
}
