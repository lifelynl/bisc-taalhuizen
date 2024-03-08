import { QueryBuilder } from '@mikro-orm/postgresql'
import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { EducationGroup, EducationGroupStatus } from './educationGroup.entity'
import { DomainError } from '../../errors/DomainError'

export class EducationGroupRepository extends CustomBaseRepository<EducationGroup> {
    protected readonly entityName = 'EducationGroup'

    public applyStatusFilter(qb: QueryBuilder<EducationGroup>, status: EducationGroupStatus) {
        switch (status) {
            case EducationGroupStatus.active:
                qb.andWhere('start <= NOW() AND ("end" IS NULL OR "end" > NOW())')
                break
            case EducationGroupStatus.past:
                qb.andWhere('"end" <= NOW()')
                break
            case EducationGroupStatus.future:
                qb.andWhere('(start IS NULL OR start > NOW()) AND ("end" IS NULL OR "end" > NOW())')
                break
            default:
                throw new DomainError(`filter type ${status} for education group not yet implemented`)
        }
    }

    public applyOneOfStatusesFilter(qb: QueryBuilder<EducationGroup>, oneOfStatuses: EducationGroupStatus[]) {
        const orWhereList = []

        if (oneOfStatuses.includes(EducationGroupStatus.active)) {
            orWhereList.push('start <= NOW() AND ("end" IS NULL OR "end" > NOW())')
        }

        if (oneOfStatuses.includes(EducationGroupStatus.past)) {
            orWhereList.push('"end" <= NOW()')
        }

        if (oneOfStatuses.includes(EducationGroupStatus.future)) {
            orWhereList.push('(start IS NULL OR start > NOW()) AND ("end" IS NULL OR "end" > NOW())')
        }

        if (orWhereList.length > 0) {
            /**
             * Using separate orWhere methods doesn't work,
             * because they need to be enclosed together in one andWhere method.
             * Because there is no Brackets functionality in Mikro ORM,
             * we are manually concatenating the clauses: `() OR () OR ()`
             */
            qb.andWhere(orWhereList.map(clause => `(${clause})`).join(' OR '))
        }
    }
}
