import { CustomBaseRepository, DateFilters } from 'src/database/CustomBaseRepository'
import { Participation, ParticipationStatus } from './participation.entity'
import { FilterQuery } from '@mikro-orm/core'
import { DomainError } from '../../errors/DomainError'

export class ParticipationRepository extends CustomBaseRepository<Participation> {
    protected readonly entityName = 'Participation'

    public async getForTestResultOrFail(testResultId: string) {
        const res = await this.qb()
            .where('id IN (SELECT participation FROM "TestResult" WHERE id = ?)', [testResultId])
            .getSingleResult()

        if (!res) {
            throw new DomainError(`learning need for test result ${testResultId} not found`)
        }

        return res
    }

    public async getWithLearningNeedOrFail(participationId: string) {
        const participation = await this.qb()
            .leftJoinAndSelect('learningNeed', 'learningNeed')
            .where({ id: participationId })
            .getSingleResult()

        if (!participation) {
            throw new DomainError(`participation ${participationId} not found`)
        }

        return participation
    }

    public async getAllForStudentWithLearningNeed(studentId: string, learningNeedId: string) {
        if (!studentId) {
            return []
        }

        return this.qb()
            .leftJoinAndSelect('learningNeed', 'learningNeed')
            .where({ 'learningNeed.student': studentId })
            .andWhere({ learningNeed: learningNeedId })
            .getResult()
    }

    public async existsForStudentInProvider(studentId: string, providerId: string) {
        return !!(await this.count({ learningNeed: { student: studentId }, provider: providerId }))
    }

    public async getAllForOrganizationStudents(organizationId: string, dateFilters?: DateFilters) {
        const queryFilters: FilterQuery<Participation> = {}
        if (dateFilters?.start || dateFilters?.end) {
            queryFilters.createdAt = this.getDateFilters(dateFilters)
        }

        return this.qb()
            .andWhere(
                `"learningNeed" IN (
				SELECT id FROM "LearningNeed" WHERE student IN (
					SELECT id FROM "Student" WHERE organization = ?
				)
			)
			`,
                [organizationId]
            )
            .andWhere(queryFilters)
            .getResult()
    }

    public async getAllForEducationGroupId(educationGroupId: string) {
        if (!educationGroupId) {
            return []
        }

        return this.qb()
            .leftJoinAndSelect('educationGroup', 'educationGroup')
            .where({ 'educationGroup.id': educationGroupId })
            .getResult()
    }

    public async getCountForEducationGroupId(educationGroupId: string) {
        if (!educationGroupId) {
            return []
        }

        return this.qb()
            .leftJoinAndSelect('educationGroup', 'educationGroup')
            .where({ 'educationGroup.id': educationGroupId })
            .getCount()
    }

    public async getAllForProvider(providerId: string) {
        return this.qb().andWhere('provider = ?', [providerId]).getResult()
    }

    public async getBasedOnGroupStartForProvider(providerId: string, dateFilters?: DateFilters) {
        const startQueryFilters: FilterQuery<Participation> = {}
        const endQueryFilters: FilterQuery<Participation> = {}
        if (dateFilters?.start) {
            startQueryFilters.start = this.getDateFilters(dateFilters)
        }

        if (dateFilters?.end) {
            endQueryFilters.end = this.getDateFilters(dateFilters)
        }

        return this.qb()
            .andWhere('provider = ?', [providerId])
            .andWhere(startQueryFilters)
            .andWhere(endQueryFilters)
            .getResult()
    }

    public static getDateConditionForParticipationStatus(participationStatus: ParticipationStatus) {
        switch (participationStatus) {
            case ParticipationStatus.referred:
                // DO NOT DIRECTLY PASS VARIABLES -- otherwise, query will be prone to SQL injection
                return '"startParticipation" IS NULL'
            case ParticipationStatus.finished:
                // DO NOT DIRECTLY PASS VARIABLES -- otherwise, query will be prone to SQL injection
                return '"endParticipation" <= NOW()'
            case ParticipationStatus.ongoing:
                // DO NOT DIRECTLY PASS VARIABLES -- otherwise, query will be prone to SQL injection
                return '"startParticipation" IS NOT NULL AND ("endParticipation" IS NULL OR "endParticipation" > NOW())'
            default:
                throw new DomainError(
                    `filter type ${participationStatus} for student participation not yet implemented`
                )
        }
    }
}
