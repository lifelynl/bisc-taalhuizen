import { Injectable } from '@nestjs/common'
import { EducationGroup } from '../educationGroup/educationGroup.entity'
import { EducationGroupRepository } from '../educationGroup/educationGroup.repository'
import { EmployeeRepository } from '../employee/employee.repository'
import { LearningNeed } from '../learningneed/learningneed.entity'
import { LearningNeedRepository } from '../learningneed/learningneed.repository'
import { LearningNeedService } from '../learningneed/learningneed.service'
import { LearningNeedOutcomeService } from '../learningNeedOutcome/learningNeedOutcome.service'
import { OrganizationTypeEnum } from '../organization/organization.entity'
import { OrganizationRepository } from '../organization/organization.repository'
import { TestResultRepository } from '../testResult/testResult.repository'
import { TestResultService } from '../testResult/testResult.service'
import { Participation, ParticipationProviderOption } from './participation.entity'

import { ParticipationRepository } from './participation.repository'
import { CreateParticipationInputType, EditParticipationInputType, ParticipationInputType } from './participation.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class ParticipationService {
    public constructor(
        private readonly learningNeedService: LearningNeedService,
        private readonly participationRepository: ParticipationRepository,
        private readonly learningNeedRepository: LearningNeedRepository,
        private readonly employeeRepository: EmployeeRepository,
        private readonly educationGroupRepository: EducationGroupRepository,
        private readonly organizationRepository: OrganizationRepository,
        private readonly learningNeedOutcomeService: LearningNeedOutcomeService,
        private readonly testResultRepository: TestResultRepository,
        private readonly testResultService: TestResultService
    ) {}

    public async createParticipation(input: CreateParticipationInputType, user: UserWithCurrentEmployee) {
        const participation = new Participation()
        participation.learningNeed = await this.getLearningNeedForNewParticipation(input, user)
        participation.providerOption = input.providerOption

        if (input.providerExplanation && input.providerExplanation.length > 255) {
            throw new DomainError('Toelichting op verwijzing mag niet langer zijn dan 255 tekens.')
        }

        /**
         * Case 1: provider is a real selected provider.
         * Participation details are not provided by the language house, so
         * they cannot be saved using the createParticipation flow.
         */
        if (participation.providerOption === ParticipationProviderOption.provider) {
            if (!input.provider) {
                throw new DomainError('Aanbieder is verplicht')
            }

            participation.provider = await this.organizationRepository.findOneOrFail(input.provider)
            participation.providerExplanation = input.providerExplanation
        }

        /**
         * Case 2: provider is not selected from the list.
         * The language house is providing the participation details.
         */
        if (participation.providerOption === ParticipationProviderOption.other) {
            if (!input.providerOther) {
                throw new DomainError('Aanbieder is verplicht')
            }

            participation.providerOther = input.providerOther

            await this.applyParticipationDetailsForLanguageHouse(participation, input)
        }

        await this.participationRepository.persistAndFlush(participation)

        return participation
    }

    public async editParticipation(
        input: EditParticipationInputType,
        user: UserWithCurrentEmployee
    ): Promise<Participation> {
        const participation = await this.participationRepository.findOneOrFail(input.id)

        if (input.providerExplanation && input.providerExplanation.length > 255) {
            throw new DomainError('Toelichting op verwijzing mag niet langer zijn dan 255 tekens.')
        }

        if (user.accessGroup === OrganizationTypeEnum.languageHouse) {
            return this.editParticipationFromLanguageHouse(participation, input)
        }

        if (user.accessGroup === OrganizationTypeEnum.provider) {
            return this.editParticipationFromProvider(participation, input)
        }

        throw new DomainError('Not authorized to edit participation')
    }

    public async deleteParticipation(participationId: string) {
        const participation = await this.participationRepository.findOneOrFail(participationId)
        await this.participationRepository.removeAndFlush(participation)
        return true
    }

    public isAssignedToEducationGroupOrMentorByProvider(participation: Participation) {
        if (participation.providerOption !== ParticipationProviderOption.provider) {
            return false
        }

        return !!participation.educationGroupId || !!participation.mentorId
    }

    private async editParticipationFromLanguageHouse(
        participation: Participation,
        input: EditParticipationInputType
    ): Promise<Participation> {
        if (this.isAssignedToEducationGroupOrMentorByProvider(participation)) {
            /**
             * After the participation is assigned to education group or mentor,
             * the language house should not be able to edit the participation anymore.
             */
            throw new DomainError('Can not edit participation: already assigned to education group or mentor')
        }

        if (input.providerOption !== undefined) {
            participation.providerOption = input.providerOption
        }

        /**
         * Case 1: provider is a real selected provider.
         * Participation details are not provided by the language house, so
         * they cannot be saved using the createParticipation flow.
         */
        if (participation.providerOption === ParticipationProviderOption.provider) {
            if (!input.provider) {
                throw new DomainError('Aanbieder is verplicht')
            }

            participation.provider = await this.organizationRepository.findOneOrFail(input.provider)
            if (input.providerExplanation !== undefined) {
                participation.providerExplanation = input.providerExplanation
            }

            participation.providerOther = null

            /**
             * Since the provider did not assign participation group or mentor yet,
             * we can safely clear the participation details.
             */
            await this.clearParticipationDetails(participation)
        }

        /**
         * Case 2: provider is not selected from the list.
         * The language house is providing the participation details.
         */
        if (participation.providerOption === ParticipationProviderOption.other) {
            if (input.providerOther !== undefined) {
                if (!input.providerOther) {
                    throw new DomainError('Aanbieder is verplicht')
                }

                participation.providerOther = input.providerOther
            }

            participation.provider = null
            participation.providerExplanation = null

            await this.applyParticipationDetailsForLanguageHouse(participation, input)
        }

        await this.participationRepository.persistAndFlush(participation)

        return participation
    }

    private async editParticipationFromProvider(participation: Participation, input: EditParticipationInputType) {
        /**
         * The only things a provider should be able to do, are:
         * - link/unlink educationGroup or mentor
         * - set agreements
         * - set startParticipation, endParticipation and reasonEndParticipation
         */

        // Education Group
        if (input.educationGroup && input.educationGroup !== participation.educationGroupId) {
            participation.educationGroup = await this.educationGroupRepository.findOneOrFail(input.educationGroup)
            if (participation.educationGroup.end && participation.educationGroup.end < new Date()) {
                throw new DomainError('Het is niet mogelijk een afgeronde groep te selecteren')
            }

            participation.offerName = participation.educationGroup.name

            // Sync startParticipation/endParticipation
            participation.start = participation.educationGroup.start
            participation.end = participation.educationGroup.end

            // Assign start/end
            const now = new Date()
            if (participation.start) {
                if (participation.start < now && participation.end && participation.end > now) {
                    // If the group has started and not yet finished, let start be 'now'
                    participation.startParticipation = now
                } else {
                    // In all other cases, let the start be the education group start date
                    participation.startParticipation = participation.start
                }
            }
        } else if (input.educationGroup === null) {
            participation.educationGroup = null
            participation.startParticipation = null
            participation.endParticipation = null
            participation.start = null
            participation.end = null
            participation.reasonEndParticipation = null
            participation.offerName = null
        }

        // Mentor
        if (input.mentor && input.mentor !== participation.mentorId) {
            participation.mentor = await this.employeeRepository.findOneOrFail({ id: input.mentor })
            participation.startParticipation = new Date() // when establishing link, autofill the startParticipation
        } else if (input.mentor === null) {
            participation.mentor = null
            participation.start = null
            participation.end = null
            participation.startParticipation = null
            participation.endParticipation = null
            participation.reasonEndParticipation = null
        }

        if (input.startParticipation !== undefined) {
            const newStart =
                input.startParticipation !== undefined ? input.startParticipation : participation.startParticipation
            const newEnd = participation.endParticipation

            if (newStart && newEnd && newStart > newEnd) {
                throw new DomainError('Start deelname kan niet na eind deelname liggen')
            }
        }

        if (input.startParticipation !== undefined) {
            if (participation.startParticipation && !input.startParticipation) {
                throw new DomainError('Start deelname kan niet worden leeggemaakt')
            }

            if (participation.start && input.startParticipation < participation.start) {
                throw new DomainError('Start deelname kan niet voor de start van de activiteit plaatsvinden')
            }
        }

        /**
         * Participation cannot be linked to BOTH a group and a mentor
         */
        if (participation.educationGroup && participation.mentor) {
            throw new DomainError('Can only link a participation to either an education group or a mentor.')
        }

        await this.applyParticipationDetailsForProvider(participation, input)

        await this.participationRepository.persistAndFlush(participation)

        if (!participation.educationGroupId && !participation.mentorId) {
            await this.findAndDeleteLinkedTestResults(participation.id)
        }

        return participation
    }

    private async applyParticipationDetailsForLanguageHouse(
        participation: Participation,
        input: ParticipationInputType
    ) {
        if (input.startParticipation !== undefined) {
            participation.startParticipation = input.startParticipation
        }

        if (input.offerName !== undefined) {
            participation.offerName = input.offerName
        }

        if (input.offerType !== undefined) {
            participation.offerType = input.offerType
        }

        if (input.offerLearningNeedOutcome !== undefined) {
            participation.offerLearningNeedOutcome = await this.learningNeedOutcomeService.updateOrGetNewWithoutPersist(
                input.offerLearningNeedOutcome,
                participation.offerLearningNeedOutcomeId
            )
        }

        if (input.formality !== undefined) {
            participation.formality = input.formality
        }

        if (input.groupFormation !== undefined) {
            participation.groupFormation = input.groupFormation
        }

        if (input.degree !== undefined) {
            participation.degree = input.degree
        }

        if (input.start !== undefined) {
            participation.start = input.start
        }

        if (input.end !== undefined) {
            participation.end = input.end
        }

        if (input.agreement !== undefined) {
            participation.agreement = input.agreement
        }
    }

    private async applyParticipationDetailsForProvider(participation: Participation, input: ParticipationInputType) {
        if (input.startParticipation !== undefined) {
            participation.startParticipation = input.startParticipation
        }

        if (input.agreement !== undefined) {
            participation.agreement = input.agreement
        }
    }

    private async clearParticipationDetails(participation: Participation) {
        participation.startParticipation = null
        participation.endParticipation = null
        participation.reasonEndParticipation = null
        participation.offerName = null
        participation.offerType = null
        participation.offerLearningNeedOutcome = null
        participation.formality = null
        participation.groupFormation = null
        participation.degree = null
        participation.start = null
        participation.end = null
        participation.agreement = null

        return participation
    }

    private async getLearningNeedForNewParticipation(
        input: CreateParticipationInputType,
        user: UserWithCurrentEmployee
    ): Promise<LearningNeed> {
        if (input.learningNeedId) {
            return this.learningNeedRepository.findOneOrFail(input.learningNeedId)
        }

        if (input.newLearningNeed) {
            return this.learningNeedService.createLearningNeed(user, input.newLearningNeed)
        }

        throw new DomainError('Expected either existing learning need or new learning need')
    }

    // needed for policies
    public async isStudentConnectedToProviderByParticipation(studentId: string, providerId: string) {
        return this.participationRepository.existsForStudentInProvider(studentId, providerId)
    }

    public async updateParticipationsForUpdatedEducationGroup(
        educationGroup: EducationGroup,
        previousStart: Date | undefined,
        previousEnd: Date | undefined
    ): Promise<void> {
        const participations = await this.participationRepository.getAllForEducationGroupId(educationGroup.id)

        for (const participation of participations) {
            this.setParticipationDatesForUpdatedEducationGroup(
                participation,
                educationGroup,
                previousStart,
                previousEnd
            )

            participation.offerName = educationGroup.name
        }

        await this.participationRepository.persistAndFlush(participations)
    }

    private setParticipationDatesForUpdatedEducationGroup(
        participation: Participation,
        educationGroup: EducationGroup,
        previousStart: Date | undefined,
        previousEnd: Date | undefined
    ) {
        // Sync startParticipation/endParticipation
        participation.startParticipation = educationGroup.start
        participation.endParticipation = educationGroup.end

        /**
         * If the old educationGroup's start date matches the
         * student's start date (participation.start),
         * the user's intent is probably to keep them in sync
         */
        if (previousStart && participation.start && previousStart.getTime() === participation.start.getTime()) {
            participation.start = educationGroup.start
        } else {
            // If the start of the educationGroup is suddenly after the student's start date (participation.start), we'll want to move the participation.start
            if (participation.startParticipation && participation.start) {
                if (participation.startParticipation > participation.start) {
                    participation.start = participation.startParticipation
                }
            }
        }

        /**
         * If the old educationGroup's end date matches the
         * student's end date (participation.end),
         * the user's intent is probably to keep them in sync
         */
        if (previousEnd && participation.end && previousEnd.getTime() === participation.end.getTime()) {
            participation.end = educationGroup.end
        } else {
            // If the end of the educationGroup is suddenly before the student's end date (participation.end), we'll want to move the participation.end
            if (participation.endParticipation && participation.end) {
                if (participation.endParticipation < participation.end) {
                    participation.end = participation.endParticipation
                }
            }
        }
    }

    private async findAndDeleteLinkedTestResults(participationId: string) {
        const existingTestResults = await this.testResultRepository.find({ participation: participationId })

        for (const testResult of existingTestResults) {
            await this.testResultService.deleteTestResult(testResult.id)
        }
    }
}
