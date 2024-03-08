import { Injectable } from '@nestjs/common'
import { PersonRepository } from '../person/person.repository'
import { PersonService } from '../person/person.service'
import { CreatePersonInputType } from '../person/person.type'
import { Registration } from './registration.entity'
import { RegistrationRepository } from './registration.repository'
import { CreateRegistrationInputType, EditRegistrationInputType } from './registration.type'
import { LearningNeedOutcomeService } from '../learningNeedOutcome/learningNeedOutcome.service'

@Injectable()
export class RegistrationService {
    public constructor(
        private readonly personService: PersonService,
        private readonly personRepository: PersonRepository,
        private readonly registrationRepository: RegistrationRepository,
        private readonly learningNeedOutcomeService: LearningNeedOutcomeService
    ) {}

    public async getNewRegistrationToSaveFromInput(input: CreateRegistrationInputType, selfRegistered?: boolean) {
        const registration = new Registration()

        if (input.referringPerson) {
            registration.referringPerson = await this.getOrCreateReferringPerson(input.referringPerson)
        }

        if (input.desiredLearningNeedOutcome !== undefined) {
            registration.desiredLearningNeedOutcome =
                await this.learningNeedOutcomeService.updateOrGetNewWithoutPersist(input.desiredLearningNeedOutcome)
        }

        registration.selfRegistered = selfRegistered
        registration.referringOrganization = input.referringOrganization
        registration.referringOrganizationOther = input.referringOrganizationOther
        registration.referringTeam = input.referringTeam
        registration.remarks = input.remarks
        registration.foundVia = input.foundVia
        registration.foundViaOther = input.foundViaOther
        registration.wentToLanguageHouseBefore = input.wentToLanguageHouseBefore
        registration.wentToLanguageHouseBeforeReason = input.wentToLanguageHouseBeforeReason
        registration.wentToLanguageHouseBeforeYear = input.wentToLanguageHouseBeforeYear
        registration.network = input.network
        registration.participationLadder = input.participationLadder
        registration.dutchNTLevel = input.dutchNTLevel
        registration.inNetherlandsSinceYear = input.inNetherlandsSinceYear
        registration.languageInDailyLife = input.languageInDailyLife
        registration.knowsLatinAlphabet = input.knowsLatinAlphabet
        registration.lastKnownLevel = input.lastKnownLevel
        registration.speakingLevel = input.speakingLevel
        registration.trainedForJob = input.trainedForJob
        registration.lastJob = input.lastJob
        registration.hasTriedThisBefore = input.hasTriedThisBefore
        registration.hasTriedThisBeforeExplanation = input.hasTriedThisBeforeExplanation
        registration.whyWantTheseskills = input.whyWantTheseskills
        registration.whyWantThisNow = input.whyWantThisNow
        registration.desiredLearningMethod = input.desiredLearningMethod
        registration.dayTimeActivities = input.dayTimeActivities
        registration.dayTimeActivitiesOther = input.dayTimeActivitiesOther
        registration.readingTestResult = input.readingTestResult
        registration.writingTestResult = input.writingTestResult

        return registration
    }

    public async getEditedRegistrationToSave(id: string, input: EditRegistrationInputType) {
        const registration = await this.registrationRepository.findOneOrFail(id)

        if (input.referringPerson) {
            registration.referringPerson = await this.getOrCreateReferringPerson(input.referringPerson)
        }

        if (input.referringOrganization !== undefined) {
            registration.referringOrganization = input.referringOrganization
        }

        if (input.referringOrganizationOther !== undefined) {
            registration.referringOrganizationOther = input.referringOrganizationOther
        }

        if (input.referringTeam !== undefined) {
            registration.referringTeam = input.referringTeam
        }

        if (input.remarks !== undefined) {
            registration.remarks = input.remarks
        }

        if (input.foundVia !== undefined) {
            registration.foundVia = input.foundVia
        }

        if (input.foundViaOther !== undefined) {
            registration.foundViaOther = input.foundViaOther
        }

        if (input.wentToLanguageHouseBefore !== undefined) {
            registration.wentToLanguageHouseBefore = input.wentToLanguageHouseBefore
        }

        if (input.wentToLanguageHouseBeforeReason !== undefined) {
            registration.wentToLanguageHouseBeforeReason = input.wentToLanguageHouseBeforeReason
        }

        if (input.wentToLanguageHouseBeforeYear !== undefined) {
            registration.wentToLanguageHouseBeforeYear = input.wentToLanguageHouseBeforeYear
        }

        if (input.network !== undefined) {
            registration.network = input.network
        }

        if (input.participationLadder !== undefined) {
            registration.participationLadder = input.participationLadder
        }

        if (input.dutchNTLevel !== undefined) {
            registration.dutchNTLevel = input.dutchNTLevel
        }

        if (input.inNetherlandsSinceYear !== undefined) {
            registration.inNetherlandsSinceYear = input.inNetherlandsSinceYear
        }

        if (input.languageInDailyLife !== undefined) {
            registration.languageInDailyLife = input.languageInDailyLife
        }

        if (input.knowsLatinAlphabet !== undefined) {
            registration.knowsLatinAlphabet = input.knowsLatinAlphabet
        }

        if (input.lastKnownLevel !== undefined) {
            registration.lastKnownLevel = input.lastKnownLevel
        }

        if (input.speakingLevel !== undefined) {
            registration.speakingLevel = input.speakingLevel
        }

        if (input.trainedForJob !== undefined) {
            registration.trainedForJob = input.trainedForJob
        }

        if (input.lastJob !== undefined) {
            registration.lastJob = input.lastJob
        }

        if (input.desiredLearningNeedOutcome !== undefined) {
            registration.desiredLearningNeedOutcome =
                await this.learningNeedOutcomeService.updateOrGetNewWithoutPersist(
                    input.desiredLearningNeedOutcome,
                    registration.desiredLearningNeedOutcomeId
                )
        }

        if (input.hasTriedThisBefore !== undefined) {
            registration.hasTriedThisBefore = input.hasTriedThisBefore
        }

        if (input.hasTriedThisBeforeExplanation !== undefined) {
            registration.hasTriedThisBeforeExplanation = input.hasTriedThisBeforeExplanation
        }

        if (input.whyWantTheseskills !== undefined) {
            registration.whyWantTheseskills = input.whyWantTheseskills
        }

        if (input.whyWantThisNow !== undefined) {
            registration.whyWantThisNow = input.whyWantThisNow
        }

        if (input.desiredLearningMethod !== undefined) {
            registration.desiredLearningMethod = input.desiredLearningMethod
        }

        if (input.dayTimeActivities !== undefined) {
            registration.dayTimeActivities = input.dayTimeActivities
        }

        if (input.dayTimeActivitiesOther !== undefined) {
            registration.dayTimeActivitiesOther = input.dayTimeActivitiesOther
        }

        if (input.readingTestResult !== undefined) {
            registration.readingTestResult = input.readingTestResult
        }

        if (input.writingTestResult !== undefined) {
            registration.writingTestResult = input.writingTestResult
        }

        return registration
    }

    private async getOrCreateReferringPerson(input: CreatePersonInputType) {
        if (input.email) {
            const existingPerson = await this.personRepository.findForEmail(input.email)
            if (existingPerson) {
                return existingPerson
            }
        }

        return this.personService.getNewPersonToSaveFromInput(input)
    }
}
