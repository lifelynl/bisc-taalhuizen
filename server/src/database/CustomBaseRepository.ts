import { AnyEntity } from '@mikro-orm/core'
import { EntityRepository, QueryBuilder } from '@mikro-orm/postgresql'

export interface DateFilters {
    start?: string
    end?: string
}

export abstract class CustomBaseRepository<Entity extends AnyEntity> extends EntityRepository<Entity> {
    protected abstract entityName: string

    public get transaction() {
        return this._em.transactional
    }

    public get em() {
        return this._em
    }

    public qb() {
        return super.qb(this.entityName)
    }

    public async queryPaginated(qb: QueryBuilder<Entity>, take = 10, skip = 0) {
        const totalCount = await qb.getCount()
        // qb.groupBy('id')
        const nodes = await qb.limit(take).offset(skip).getResult()

        return {
            totalCount,
            nodes,
            hasMore: nodes.length + skip < totalCount,
        }
    }

    public getDateFilters(dateFilters: DateFilters) {
        if (!dateFilters?.start && !dateFilters?.end) {
            return {}
        }

        const start = dateFilters?.start ? new Date(dateFilters.start) : undefined
        const end = dateFilters?.end ? new Date(dateFilters.end) : undefined

        // set to beginning of day
        start?.setHours(0, 0, 0, 0)
        end?.setHours(23, 59, 59, 999)

        return { $gte: dateFilters.start, $lte: dateFilters.end }
    }
}
