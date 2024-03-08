import { Injectable } from '@nestjs/common'
import { LearningNeedOutcome } from './learningNeedOutcome.entity'
import { LearningNeedOutcomeRepository } from './learningNeedOutcome.repository'
import { LearningNeedOutcomeInputType } from './learningNeedOutCome.type'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class LearningNeedOutcomeService {
    public constructor(private readonly learningNeedOutcomeRepository: LearningNeedOutcomeRepository) {}

    public async updateOrGetNewWithoutPersist(input: LearningNeedOutcomeInputType, idFromRelation?: string) {
        if (input.id && idFromRelation !== input.id) {
            throw new DomainError('Cannot edit learningNeedOutcome from other relation')
        }

        const learningNeedOutcome = idFromRelation
            ? await this.learningNeedOutcomeRepository.findOneOrFail(idFromRelation)
            : new LearningNeedOutcome()

        if (input.subject !== undefined) {
            learningNeedOutcome.subject = input.subject
        }

        if (input.application !== undefined) {
            learningNeedOutcome.application = input.application
        }

        if (input.level !== undefined) {
            learningNeedOutcome.level = input.level
        }

        if (input.subjectOther !== undefined) {
            learningNeedOutcome.subjectOther = input.subjectOther
        }

        if (input.applicationOther !== undefined) {
            learningNeedOutcome.applicationOther = input.applicationOther
        }

        if (input.levelOther !== undefined) {
            learningNeedOutcome.levelOther = input.levelOther
        }

        return learningNeedOutcome
    }
}
