import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { LearningNeedOutcome } from './learningNeedOutcome.entity'
import { DomainError } from '../../errors/DomainError'

export class LearningNeedOutcomeRepository extends CustomBaseRepository<LearningNeedOutcome> {
    protected readonly entityName = 'LearningNeedOutcome'

    public async getForTestResultOrFail(testResultId: string) {
        const res = await this.qb()
            .where('id IN (SELECT "learningNeedOutcome" FROM "TestResult" WHERE id = ?)', [testResultId])
            .getSingleResult()

        if (!res) {
            throw new DomainError(`learning need outcome for test result ${testResultId} not found`)
        }

        return res
    }

    public async getForEducationGroupOrFail(educationGroupId: string) {
        const res = await this.qb()
            .where('id IN (SELECT "desiredLearningNeedOutcome" FROM "EducationGroup" WHERE id = ?)', [educationGroupId])
            .getSingleResult()

        if (!res) {
            throw new DomainError(`learning need outcome for education group ${educationGroupId} not found`)
        }

        return res
    }
}
