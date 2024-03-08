import { Injectable } from '@nestjs/common'
import { EmployeeRepository } from '../employee/employee.repository'
import { LearningNeedOutcomeService } from '../learningNeedOutcome/learningNeedOutcome.service'
import { OrganizationRepository } from '../organization/organization.repository'
import { ParticipationService } from '../participation/participation.service'
import { EducationGroup } from './educationGroup.entity'
import { EducationGroupRepository } from './educationGroup.repository'
import {
    CreateEducationGroupInputType,
    EditEducationGroupInputType,
    OptionalEducationGroupInputType,
} from './educationGroup.type'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class EducationGroupService {
    public constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly educationGroupRepository: EducationGroupRepository,
        private readonly learningNeedOutcomeService: LearningNeedOutcomeService,
        private readonly employeeRepository: EmployeeRepository,
        private readonly participationService: ParticipationService
    ) {}

    public async createGroup(input: CreateEducationGroupInputType) {
        const educationGroup = new EducationGroup()

        educationGroup.organization = await this.organizationRepository.findOneOrFail(input.organizationId)

        if (input.desiredLearningNeedOutcome !== undefined) {
            educationGroup.desiredLearningNeedOutcome =
                await this.learningNeedOutcomeService.updateOrGetNewWithoutPersist(input.desiredLearningNeedOutcome)
        }

        if (input.employees?.length) {
            const employees = await this.employeeRepository.find({
                id: { $in: input.employees },
                organization: input.organizationId,
            })

            educationGroup.employees.add(employees)
        }

        educationGroup.name = input.name
        educationGroup.lessonHours = input.lessonHours
        educationGroup.location = input.location
        educationGroup.type = input.type

        this.setOptionalFields(input, educationGroup)

        await this.educationGroupRepository.persistAndFlush(educationGroup)

        return educationGroup
    }

    public async editGroup(input: EditEducationGroupInputType) {
        const educationGroup = await this.educationGroupRepository.findOneOrFail(input.educationGroupId)

        const previousStart = educationGroup.start
        const previousEnd = educationGroup.end

        if (input.desiredLearningNeedOutcome !== undefined) {
            educationGroup.desiredLearningNeedOutcome =
                await this.learningNeedOutcomeService.updateOrGetNewWithoutPersist(
                    input.desiredLearningNeedOutcome,
                    educationGroup.desiredLearningNeedOutcomeId
                )
        }

        if (input.employees !== undefined) {
            await this.editGroupEmployees(educationGroup, input.employees)
        }

        if (input.name) {
            educationGroup.name = input.name
        }

        if (input.lessonHours) {
            educationGroup.lessonHours = input.lessonHours
        }

        if (input.location) {
            educationGroup.location = input.location
        }

        if (input.type) {
            educationGroup.type = input.type
        }

        this.setOptionalFields(input, educationGroup)

        await this.educationGroupRepository.persistAndFlush(educationGroup)

        try {
            await this.participationService.updateParticipationsForUpdatedEducationGroup(
                educationGroup,
                previousStart,
                previousEnd
            )
        } catch (e) {
            console.error(e)
        }

        return educationGroup
    }

    public async deleteGroup(id: string) {
        const educationGroup = await this.educationGroupRepository.findOneOrFail(id)

        await this.educationGroupRepository.removeAndFlush(educationGroup)

        return true
    }

    // does not set employees, because logic for create & edit are different
    private setOptionalFields(input: OptionalEducationGroupInputType, educationGroup: EducationGroup) {
        if (input.formality !== undefined) {
            educationGroup.formality = input.formality
        }

        if (input.degree !== undefined) {
            educationGroup.degree = input.degree
        }

        if (input.start !== undefined) {
            educationGroup.start = input.start
        }

        if (input.end !== undefined) {
            educationGroup.end = input.end
        }

        if (input.start !== undefined || input.end !== undefined) {
            const newStart = input.start !== undefined ? input.start : educationGroup.start
            const newEnd = input.end !== undefined ? input.end : educationGroup.end

            if (newStart && newEnd && newStart > newEnd) {
                throw new DomainError('Startdatum kan niet na einddatum liggen')
            }
        }

        if (input.availability !== undefined) {
            educationGroup.availability = input.availability
        }

        if (input.availabilityNotes !== undefined) {
            educationGroup.availabilityNotes = input.availabilityNotes
        }

        if (input.minimumParticipants !== undefined) {
            educationGroup.minimumParticipants = input.minimumParticipants
        }

        if (input.maximumParticipants !== undefined) {
            educationGroup.maximumParticipants = input.maximumParticipants
        }

        if (input.minimumParticipants !== undefined || input.maximumParticipants !== undefined) {
            const newMinimumParticipants =
                input.minimumParticipants !== undefined ? input.minimumParticipants : educationGroup.minimumParticipants
            const newMaximumParticipants =
                input.maximumParticipants !== undefined ? input.maximumParticipants : educationGroup.maximumParticipants

            if (
                typeof newMinimumParticipants === 'number' &&
                typeof newMaximumParticipants === 'number' &&
                newMinimumParticipants > newMaximumParticipants
            ) {
                throw new DomainError('Minimum aantal deelnemers kan niet meer zijn dan maximum aantal deelnemers')
            }
        }

        if (input.evaluation !== undefined) {
            educationGroup.evaluation = input.evaluation
        }
    }

    private async editGroupEmployees(educationGroup: EducationGroup, employeeIds: string[] | null) {
        if (!educationGroup.employees.isInitialized()) {
            await educationGroup.employees.init()
        }

        if (employeeIds === null || employeeIds?.length === 0) {
            educationGroup.employees.removeAll()
            return
        }

        if (employeeIds?.length) {
            const employees = await this.employeeRepository.find({
                id: { $in: employeeIds },
                organization: educationGroup.organizationId,
            })

            educationGroup.employees.removeAll()
            educationGroup.employees.add(employees)
        }
    }
}
