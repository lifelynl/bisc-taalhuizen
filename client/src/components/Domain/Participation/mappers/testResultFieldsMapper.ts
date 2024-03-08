import { ParticipantsLearningNeedReferenceTestFieldsModel } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { CreateTestResultInputType, EditTestResultInputType, TestResultType } from 'graphql/v2/generated/graphql'
import { DateFormatters } from 'utils/formatters/Date/Date'

export function createTestResultFieldsMapper(
    formData: ParticipantsLearningNeedReferenceTestFieldsModel,
    participationId: string
): CreateTestResultInputType {
    return {
        participationId,
        usedExam: formData['usedExam'] ?? '',
        examDate: DateFormatters.parseDateString(formData['examDate'])!,
        memo: formData['memo'] ?? '',
        learningNeedOutcome: {
            application: formData['learningNeedOutcome.application'],
            applicationOther: formData['learningNeedOutcome.applicationOther'] ?? '',
            level: formData['learningNeedOutcome.level'],
            levelOther: formData['learningNeedOutcome.levelOther'] ?? '',
            subject: formData['learningNeedOutcome.subject'],
            subjectOther: formData['learningNeedOutcome.subjectOther'] ?? '',
        },
        endParticipation: formData['endParticipation']
            ? DateFormatters.parseDateString(formData['endParticipation'])
            : null,
        reasonEndParticipation: formData['reasonEndParticipation'] ?? null,
        outFlowParticipation: formData['outFlowParticipation'] ?? null,
        outFlowReasonOther: formData['outFlowReasonOther'] ?? null,
    }
}

export function editTestResultFieldsMapper(
    defaultTestResult: Partial<TestResultType>,
    formData: ParticipantsLearningNeedReferenceTestFieldsModel
): any | EditTestResultInputType {
    return {
        id: defaultTestResult.id,
        usedExam: formData['usedExam'] ?? '',
        examDate: DateFormatters.parseDateString(formData['examDate'])!,
        memo: formData['memo'] ?? '',
        learningNeedOutcome: {
            id: defaultTestResult.learningNeedOutcome?.id,
            application: formData['learningNeedOutcome.application'],
            applicationOther: formData['learningNeedOutcome.applicationOther'] ?? '',
            level: formData['learningNeedOutcome.level'],
            levelOther: formData['learningNeedOutcome.levelOther'] ?? '',
            subject: formData['learningNeedOutcome.subject'],
            subjectOther: formData['learningNeedOutcome.subjectOther'] ?? '',
        },
        endParticipation: formData['endParticipation']
            ? DateFormatters.parseDateString(formData['endParticipation'])
            : null,
        reasonEndParticipation: formData['reasonEndParticipation'] ?? null,
        outFlowParticipation: formData['outFlowParticipation'] ?? null,
        outFlowReasonOther: formData['outFlowReasonOther'] ?? null,
    }
}
