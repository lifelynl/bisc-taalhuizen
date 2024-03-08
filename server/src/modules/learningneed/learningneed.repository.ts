import { FilterQuery } from '@mikro-orm/core'
import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { LearningNeed } from './learningneed.entity'

export class LearningNeedRepository extends CustomBaseRepository<LearningNeed> {
    protected readonly entityName = 'LearningNeed'

    public getForOrganization(organizationId: string, start?: string, end?: string) {
        const filters: FilterQuery<LearningNeed> = {
            student: { organization: { id: organizationId } },
        }

        if (start || end) {
            filters.createdAt = this.getDateFilters({ start, end })
        }

        return this.find(filters)
    }

    public async getLearningNeedWithStudent(learningNeedId: string) {
        return this.qb().where({ id: learningNeedId }).leftJoinAndSelect('student', 'student').getSingleResult()
    }

    public async getByParticipation(participationId: string) {
        return this.qb()
            .select('*')
            .where('id = (SELECT "learningNeed" FROM "Participation" WHERE id = ?)', [participationId])
            .getSingleResult()
    }
}
