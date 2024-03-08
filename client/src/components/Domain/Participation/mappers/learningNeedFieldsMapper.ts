import { ParticipantLearningNeedFieldsFormModel } from 'components/Domain/LanguageHouse/Fields/LearningNeedFields'
import {
    CreateLearningNeedInputType,
    EditLearningNeedInputType,
    LearningNeedOutcomeType,
    LearningNeedType,
} from 'graphql/v2/generated/graphql'

export function createLearningNeedFieldsMapper(
    studentId: string,
    formData: ParticipantLearningNeedFieldsFormModel
): CreateLearningNeedInputType {
    return {
        student: studentId,
        description: formData['description'] ?? '',
        motivation: formData['motivation'] ?? '',
        desiredLearningNeedOutcome: {
            application: formData['desiredLearningNeedOutcome.application'],
            applicationOther: formData['desiredLearningNeedOutcome.applicationOther'] ?? '',
            level: formData['desiredLearningNeedOutcome.level'],
            levelOther: formData['desiredLearningNeedOutcome.levelOther'] ?? '',
            subject: formData['desiredLearningNeedOutcome.subject'],
            subjectOther: formData['desiredLearningNeedOutcome.subjectOther'] ?? '',
        },
        desiredOffer: formData['desiredOffer'],
        advisedOffer: formData['advisedOffer'] ?? '',
        offerDifference: formData['offerDifference'],
        offerDifferenceOther: formData['offerDifferenceOther'],
        agreements: formData['agreements'],
    }
}

type DefaultLearningNeed = Pick<LearningNeedType, 'id'> & {
    desiredLearningNeedOutcome?: Pick<LearningNeedOutcomeType, 'id'> | null
}

export function editLearningNeedFieldsMapper(
    formData: ParticipantLearningNeedFieldsFormModel,
    defaultLearningNeed: DefaultLearningNeed
): EditLearningNeedInputType {
    return {
        id: defaultLearningNeed.id,
        description: formData['description'] ?? '',
        motivation: formData['motivation'] ?? '',
        desiredLearningNeedOutcome: {
            id: defaultLearningNeed.desiredLearningNeedOutcome?.id,
            application: formData['desiredLearningNeedOutcome.application'],
            applicationOther: formData['desiredLearningNeedOutcome.applicationOther'] ?? '',
            level: formData['desiredLearningNeedOutcome.level'],
            levelOther: formData['desiredLearningNeedOutcome.levelOther'] ?? '',
            subject: formData['desiredLearningNeedOutcome.subject'],
            subjectOther: formData['desiredLearningNeedOutcome.subjectOther'] ?? '',
        },
        desiredOffer: formData['desiredOffer'] ?? '',
        advisedOffer: formData['advisedOffer'] ?? '',
        offerDifference: formData['offerDifference'],
        offerDifferenceOther: formData['offerDifferenceOther'] ?? '',
        agreements: formData['agreements'] ?? '',
    }
}
