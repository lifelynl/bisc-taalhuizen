import { Injectable } from '@nestjs/common'
import { CivicIntegration } from './civicIntegration.entity'
import { CivicIntegrationRepository } from './civicIntegration.repository'
import { CreateCivicIntegrationInputType, EditNestedCivicIntegrationInputType } from './civicIntegration.type'

@Injectable()
export class CivicIntegrationService {
    public constructor(private readonly civicIntegrationRepository: CivicIntegrationRepository) {}

    public getNewIntegrationToSave(input: CreateCivicIntegrationInputType) {
        const civicIntegration = new CivicIntegration()

        civicIntegration.reason = input.reason
        civicIntegration.requirement = input.requirement
        civicIntegration.finishDate = input.finishDate

        return civicIntegration
    }

    public async getOrCreateEditedIntegrationToSave(studentId: string, input: EditNestedCivicIntegrationInputType) {
        const integration = await this.civicIntegrationRepository.findOne({ student: studentId })

        if (!integration) {
            return this.getNewIntegrationToSave(input as CreateCivicIntegrationInputType)
        }

        if (input.reason !== undefined) {
            integration.reason = input.reason
        }

        if (input.requirement !== undefined) {
            integration.requirement = input.requirement
        }

        if (input.finishDate !== undefined) {
            integration.finishDate = input.finishDate
        }

        return integration
    }
}
