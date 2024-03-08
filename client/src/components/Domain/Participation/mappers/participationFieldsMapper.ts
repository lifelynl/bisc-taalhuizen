import { LearningNeedsReferenceFormModel } from 'components/Domain/LanguageHouse/Fields/ParticipationFields'
import {
    CreateLearningNeedInputType,
    CreateParticipationInputType,
    EditParticipationInputType,
    Maybe,
    ParticipationProviderOption,
    ParticipationsQuery,
} from 'graphql/v2/generated/graphql'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { CreateLearningNeedWithReferralFormModel } from 'views/Authorized/LanguageHouse/Participants/Detail/LearningNeeds/ParticipantsLearningNeedsCreateWithReferralView'

export function createParticipationFieldsMapper(
    formData: LearningNeedsReferenceFormModel,
    learningNeedId: string
): CreateParticipationInputType {
    return {
        learningNeedId,
        ...getParticipationCreateFields(formData),
    }
}

export function createParticipationWithReferralFieldsMapper(
    formData: CreateLearningNeedWithReferralFormModel,
    studentId: string
): CreateParticipationInputType {
    const learningNeedId = formData['learningNeed']

    const newLearningNeed: CreateLearningNeedInputType | undefined = learningNeedId
        ? undefined
        : {
              student: studentId,
              description: formData['description'],
              motivation: formData['motivation'],
          }

    return {
        learningNeedId,
        newLearningNeed: newLearningNeed,
        ...getParticipationCreateFields(formData),
    }
}

function getParticipationCreateFields(formData: LearningNeedsReferenceFormModel) {
    const providerOption = inferProviderOption(formData['provider'])

    if (providerOption === ParticipationProviderOption.Provider) {
        return {
            providerOption: ParticipationProviderOption.Provider,
            provider: formData['provider'],
            providerExplanation: formData['providerExplanation'],
        }
    }

    if (providerOption === ParticipationProviderOption.Other) {
        return {
            providerOption: ParticipationProviderOption.Other,
            providerOther: formData['providerOther'],

            offerName: formData['offerName'] ?? '',
            offerType: formData['offerType'],
            formality: formData['formality'],
            groupFormation: formData['groupFormation'],
            degree: getBooleanValueByDegreeRadioValue(formData['degree']),
            start: formData['start'] ? DateFormatters.parseDateString(formData['start']) : undefined,
            end: formData['end'] ? DateFormatters.parseDateString(formData['end']) : undefined,
            agreement: formData['agreement'],
        }
    }

    throw new Error('No provider option provided')
}

export function editParticipationFieldsMapper(
    defaultParticipation: ParticipationsQuery['participations']['nodes'][0],
    formData: LearningNeedsReferenceFormModel
): EditParticipationInputType {
    const providerOption = inferProviderOption(formData['provider'])

    if (providerOption === ParticipationProviderOption.Provider) {
        return {
            id: defaultParticipation.id,
            providerOption: ParticipationProviderOption.Provider,
            provider: formData['provider'],
            providerExplanation: formData['providerExplanation'],
        }
    }

    if (providerOption === ParticipationProviderOption.Other) {
        return {
            id: defaultParticipation.id,
            providerOption: ParticipationProviderOption.Other,
            providerOther: formData['providerOther'],

            startParticipation: formData['startParticipation']
                ? DateFormatters.parseDateString(formData['startParticipation'])
                : null,

            offerName: formData['offerName'] ?? null,
            offerType: formData['offerType'] ?? null,

            formality: formData['formality'] ?? null,
            groupFormation: formData['groupFormation'] ?? null,
            degree: getBooleanValueByDegreeRadioValue(formData['degree']) ?? null,
            start: formData['start'] ? DateFormatters.parseDateString(formData['start']) : null,
            end: formData['end'] ? DateFormatters.parseDateString(formData['end']) : null,
            agreement: formData['agreement'],
        }
    }

    throw new Error('No provider option provided')
}

function inferProviderOption(provider?: Maybe<string>): ParticipationProviderOption {
    if (provider === ParticipationProviderOption.Other) {
        return ParticipationProviderOption.Other
    }

    return ParticipationProviderOption.Provider
}

function getBooleanValueByDegreeRadioValue(degreeValue?: Maybe<'false' | 'true'>) {
    if (degreeValue) {
        if (degreeValue === 'true') {
            return true
        }

        if (degreeValue === 'false') {
            return false
        }
    }
}
