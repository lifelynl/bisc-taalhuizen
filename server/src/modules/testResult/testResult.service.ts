import { Injectable } from '@nestjs/common'
import { LearningNeedOutcomeService } from '../learningNeedOutcome/learningNeedOutcome.service'
import { ParticipationRepository } from '../participation/participation.repository'
import { AchievedResultResponse, TestResult } from './testResult.entity'
import { TestResultRepository } from './testResult.repository'
import { CreateTestResultInputType, EditTestResultInputType } from './testResult.type'
import { ParticipationOutFlow } from '../participation/participation.entity'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class TestResultService {
    public constructor(
        private readonly testResultRepository: TestResultRepository,
        private readonly participationRepository: ParticipationRepository,
        private readonly learningNeedOutcomeService: LearningNeedOutcomeService
    ) {}

    public async createTestResult(input: CreateTestResultInputType) {
        const existingTestResult = await this.testResultRepository.findOne({ participation: input.participationId })
        if (existingTestResult) {
            throw new DomainError('Deze activiteit is reeds afgerond')
        }

        if (!input.endParticipation) {
            throw new DomainError('Einde deelname is verplicht')
        }

        if (!input.reasonEndParticipation) {
            throw new DomainError('Reden einde deelname is verplicht')
        }

        const testResult = new TestResult()
        testResult.participation = await this.participationRepository.findOneOrFail(input.participationId)

        if (input.learningNeedOutcome !== undefined) {
            testResult.learningNeedOutcome = await this.learningNeedOutcomeService.updateOrGetNewWithoutPersist(
                input.learningNeedOutcome
            )
        }

        testResult.memo = input.memo
        testResult.examDate = input.examDate
        testResult.usedExam = input.usedExam
        testResult.didAchieveResultResponse = input.didAchieveResultResponse
        testResult.unsuccessfulResultReasonResponse = input.unsuccessfulResultReasonResponse
        testResult.achievedResultResponse = input.achievedResultResponse
        if (input.achievedResultResponseOther) {
            if (input.achievedResultResponse !== AchievedResultResponse.other) {
                throw new DomainError('other details can only be filled if achieved result response is marked as other')
            }

            testResult.achievedResultResponseOther = input.achievedResultResponseOther
        }

        const newStart = testResult.participation.startParticipation
        const newEnd =
            input.endParticipation !== undefined ? input.endParticipation : testResult.participation.endParticipation

        if (newStart && newEnd && newStart > newEnd) {
            throw new DomainError('Start deelname kan niet na eind deelname liggen')
        }

        if (
            testResult.participation.end &&
            input.endParticipation &&
            input.endParticipation > testResult.participation.end
        ) {
            throw new DomainError('Einde deelname kan niet na het einde van de activiteit plaatsvinden')
        }

        testResult.participation.endParticipation = input.endParticipation
        testResult.participation.reasonEndParticipation = input.reasonEndParticipation
        testResult.participation.outFlowParticipation = input.outFlowParticipation
        if (input.outFlowReasonOther) {
            if (input.outFlowParticipation !== ParticipationOutFlow.other) {
                throw new DomainError('Een reden is alleen mogelijk wanneer anders namelijk is geselecteerd.')
            }
            testResult.participation.outFlowReasonOther = input.outFlowReasonOther
        }

        await this.testResultRepository.persistAndFlush(testResult)

        return testResult
    }

    public async editTestResult(input: EditTestResultInputType) {
        const testResult = await this.testResultRepository.findOneOrFail(input.id)

        if (!input.endParticipation) {
            throw new DomainError('Einde deelname is verplicht')
        }

        if (!input.reasonEndParticipation) {
            throw new DomainError('Reden einde deelname is verplicht')
        }

        if (input.learningNeedOutcome !== undefined) {
            testResult.learningNeedOutcome = await this.learningNeedOutcomeService.updateOrGetNewWithoutPersist(
                input.learningNeedOutcome,
                testResult.learningNeedOutcomeId
            )
        }

        if (input.memo !== undefined) {
            testResult.memo = input.memo
        }

        if (input.examDate !== undefined) {
            testResult.examDate = input.examDate
        }

        if (input.usedExam !== undefined) {
            testResult.usedExam = input.usedExam
        }

        if (input.didAchieveResultResponse) {
            testResult.didAchieveResultResponse = input.didAchieveResultResponse
        }

        if (input.unsuccessfulResultReasonResponse) {
            testResult.unsuccessfulResultReasonResponse = input.unsuccessfulResultReasonResponse
        }

        if (input.achievedResultResponse) {
            testResult.achievedResultResponse = input.achievedResultResponse

            if (testResult.achievedResultResponse !== AchievedResultResponse.other) {
                testResult.achievedResultResponseOther = null
            }
        }

        if (input.achievedResultResponseOther) {
            if (testResult.achievedResultResponse !== AchievedResultResponse.other) {
                throw new DomainError('other details can only be filled if achieved result response is marked as other')
            }

            testResult.achievedResultResponseOther = input.achievedResultResponseOther
        }

        const newStart = testResult.participation.startParticipation
        const newEnd =
            input.endParticipation !== undefined ? input.endParticipation : testResult.participation.endParticipation

        if (newStart && newEnd && newStart > newEnd) {
            throw new DomainError('Start deelname kan niet na eind deelname liggen')
        }

        if (
            testResult.participation.end &&
            input.endParticipation &&
            input.endParticipation > testResult.participation.end
        ) {
            throw new DomainError('Einde deelname kan niet na het einde van de activiteit plaatsvinden')
        }

        if (input.endParticipation !== undefined) {
            testResult.participation.endParticipation = input.endParticipation
        }

        if (input.reasonEndParticipation !== undefined) {
            testResult.participation.reasonEndParticipation = input.reasonEndParticipation
        }

        if (input.outFlowParticipation !== undefined) {
            testResult.participation.outFlowParticipation = input.outFlowParticipation

            if (input.outFlowParticipation !== ParticipationOutFlow.other) {
                testResult.participation.outFlowReasonOther = null
            }
        }

        if (input.outFlowReasonOther) {
            if (testResult.participation.outFlowParticipation !== ParticipationOutFlow.other) {
                throw new DomainError('Een reden is alleen mogelijk wanneer anders namelijk is geselecteerd.')
            }
            testResult.participation.outFlowReasonOther = input.outFlowReasonOther
        }

        await this.testResultRepository.persistAndFlush(testResult)

        return testResult
    }

    public async deleteTestResult(id: string) {
        const testResult = await this.testResultRepository.findOneOrFail(id)

        testResult.participation.endParticipation = null
        testResult.participation.reasonEndParticipation = null

        await this.testResultRepository.removeAndFlush(testResult)

        return true
    }
}
