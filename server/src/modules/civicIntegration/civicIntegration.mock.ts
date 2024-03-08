import { CivicIntegrationReason, CivicIntegrationRequirement } from './civicIntegration.entity'
import { CreateCivicIntegrationInputType, EditNestedCivicIntegrationInputType } from './civicIntegration.type'

export function getMockCreateCivicIntegrationInput(): CreateCivicIntegrationInputType {
    return {
        reason: CivicIntegrationReason.exemptedOrZRoute,
        requirement: CivicIntegrationRequirement.inProgress,
        finishDate: new Date(),
    }
}

export function getMockEditCivicIntegrationInput(): EditNestedCivicIntegrationInputType {
    return {
        finishDate: new Date(),
    }
}
