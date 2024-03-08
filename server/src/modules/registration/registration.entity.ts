import { Entity, EntityRepositoryType, Enum, ManyToOne, OneToOne, Property } from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Person } from '../person/person.entity'
import { RegistrationRepository } from './registration.repository'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { DomainError } from '../../errors/DomainError'

export enum RegistrationStatus {
    pending = 'pending',
    accepted = 'accepted',
    rejected = 'rejected',
}
registerEnumType(RegistrationStatus, { name: 'RegistrationStatus' })

export enum IntakeFoundVia {
    volunteerCenter = 'volunteerCenter',
    libraryWebsite = 'libraryWebsite',
    socialMedia = 'socialMedia',
    newspaper = 'newspaper',
    viaVia = 'viaVia',
    other = 'other',
}
registerEnumType(IntakeFoundVia, { name: 'IntakeFoundVia' })

export enum IntakeNetwork {
    householdMembers = 'householdMembers',
    neighbors = 'neighbors',
    familyMembers = 'familyMembers',
    aidWorkers = 'aidWorkers',
    friendsAcquaintances = 'friendsAcquaintances',
    peopleAtMosqueChurch = 'peopleAtMosqueChurch',
    acquaintancesSpeakingOwnLanguage = 'acquaintancesSpeakingOwnLanguage',
    acquaintancesSpeakingDutch = 'acquaintancesSpeakingDutch',
    colleagues = 'colleagues',
}
registerEnumType(IntakeNetwork, { name: 'IntakeNetwork' })

export enum IntakeParticipationLadder {
    isolated = 'isolated',
    socialContactsOutside = 'socialContactsOutside',
    organizedActivityParticipation = 'organizedActivityParticipation',
    volunteerWork = 'volunteerWork',
    paidWithSupport = 'paidWithSupport',
    paid = 'paid',
}
registerEnumType(IntakeParticipationLadder, { name: 'IntakeParticipationLadder' })

export enum DutchNTType {
    nt1 = 'nt1',
    nt2 = 'nt2',
}
registerEnumType(DutchNTType, { name: 'DutchNTType' })

export enum DutchNT2Level {
    a0 = 'a0',
    a1 = 'a1',
    a2 = 'a2',
    b1 = 'b1',
    b2 = 'b2',
    c1 = 'c1',
    c2 = 'c2',
    unknown = 'unknown',
}
registerEnumType(DutchNT2Level, { name: 'DutchNT2Level' })

export enum SpeakingLevel {
    beginner = 'beginner',
    reasonable = 'reasonable',
    advanced = 'advanced',
}
registerEnumType(SpeakingLevel, { name: 'SpeakingLevel' })

export enum DesiredLearningMethod {
    inAGroup = 'inAGroup',
    oneOnOne = 'oneOnOne',
    homeEnvironment = 'homeEnvironment',
    inLibraryOrOther = 'inLibraryOrOther',
    online = 'online',
}
registerEnumType(DesiredLearningMethod, { name: 'DesiredLearningMethod' })

export enum IntakeDayTimeActivities {
    searchingForJob = 'searchingForJob',
    reIntegration = 'reIntegration',
    school = 'school',
    volunteerJob = 'volunteerJob',
    job = 'job',
    other = 'other',
}
registerEnumType(IntakeDayTimeActivities, { name: 'IntakeDayTimeActivities' })

export enum ReadingTestResult {
    canNotRead = 'canNotRead',
    a0 = 'a0',
    a1 = 'a1',
    a2 = 'a2',
    b1 = 'b1',
    b2 = 'b2',
    c1 = 'c1',
    c2 = 'c2',
}
registerEnumType(ReadingTestResult, { name: 'ReadingTestResult' })

export enum WritingTestResult {
    canNotWrite = 'canNotWrite',
    writeNawDetails = 'writeNawDetails',
    writeSimpleTexts = 'writeSimpleTexts',
    writeSimpleLetters = 'writeSimpleLetters',
}
registerEnumType(WritingTestResult, { name: 'WritingTestResult' })

export enum ReferringOrganizationEnum {
    uwv = 'uwv',
    socialService = 'socialService',
    library = 'library',
    welfareWork = 'welfareWork',
    neighborhoodTeam = 'neighborhoodTeam',
    volunteerOrganization = 'volunteerOrganization',
    languageProvider = 'languageProvider',
    other = 'other',
}
registerEnumType(ReferringOrganizationEnum, { name: 'ReferringOrganizationEnum' })

@Entity({ customRepository: () => RegistrationRepository })
export class Registration extends CustomBaseEntity {
    public [EntityRepositoryType]?: RegistrationRepository

    @Property()
    public selfRegistered?: boolean

    @Property()
    public referringOrganization?: ReferringOrganizationEnum

    @Property()
    public referringOrganizationOther?: string

    @Property()
    public referringTeam?: string

    @ManyToOne({ onDelete: 'set null' })
    public referringPerson?: Person

    @Property({ persist: false })
    public get referringPersonId() {
        return this.referringPerson?.id
    }

    @Property({ type: 'text' })
    public remarks?: string

    @Enum({ default: RegistrationStatus.pending })
    @Property()
    public status: RegistrationStatus

    @Property({ default: false })
    public registeredPublicly: boolean

    @Enum(() => IntakeFoundVia)
    @Property()
    public foundVia?: IntakeFoundVia

    @Property()
    public foundViaOther?: string

    @Property()
    public wentToLanguageHouseBefore?: boolean

    @Property()
    public wentToLanguageHouseBeforeReason?: string

    @Property()
    public wentToLanguageHouseBeforeYear?: number

    @Property({ type: 'array', check: CustomBaseEntity.getArrayEnumCheck(IntakeNetwork, 'network') })
    public network?: IntakeNetwork[]

    @Enum(() => IntakeParticipationLadder)
    @Property()
    public participationLadder?: IntakeParticipationLadder

    @Enum(() => DutchNTType)
    @Property()
    public dutchNTLevel?: DutchNTType

    @Property()
    public inNetherlandsSinceYear?: number

    @Property()
    public languageInDailyLife?: string

    @Property()
    public knowsLatinAlphabet?: boolean

    @Enum(() => DutchNT2Level)
    @Property()
    public lastKnownLevel?: DutchNT2Level

    @Enum(() => SpeakingLevel)
    @Property()
    public speakingLevel?: SpeakingLevel

    @Property()
    public trainedForJob?: string

    @Property()
    public lastJob?: string

    @OneToOne(() => LearningNeedOutcome, learningNeedOutcome => learningNeedOutcome.registration, {
        owner: true,
        nullable: true,
        onDelete: 'cascade',
    })
    public desiredLearningNeedOutcome?: LearningNeedOutcome | null

    @Property({ persist: false })
    public get desiredLearningNeedOutcomeId() {
        return this.desiredLearningNeedOutcome?.id
    }

    @Property()
    public hasTriedThisBefore?: boolean

    @Property()
    public hasTriedThisBeforeExplanation?: string

    @Property()
    public whyWantTheseskills?: string

    @Property()
    public whyWantThisNow?: string

    @Property({
        type: 'array',
        check: CustomBaseEntity.getArrayEnumCheck(DesiredLearningMethod, 'desiredLearningMethod'),
    })
    public desiredLearningMethod?: DesiredLearningMethod[]

    @Property({
        type: 'array',
        check: CustomBaseEntity.getArrayEnumCheck(IntakeDayTimeActivities, 'dayTimeActivities'),
    })
    public dayTimeActivities?: IntakeDayTimeActivities[]

    @Property()
    public dayTimeActivitiesOther?: string

    @Enum(() => ReadingTestResult)
    @Property()
    public readingTestResult?: ReadingTestResult

    @Enum(() => WritingTestResult)
    @Property()
    public writingTestResult?: WritingTestResult

    @Property({ persist: false })
    public get translated_lastKnownLevel() {
        if (!this.lastKnownLevel) {
            return
        }

        switch (this.lastKnownLevel) {
            case DutchNT2Level.a0:
                return 'A0'
            case DutchNT2Level.a1:
                return 'A1'
            case DutchNT2Level.a2:
                return 'A2'
            case DutchNT2Level.b1:
                return 'B1'
            case DutchNT2Level.b2:
                return 'B2'
            case DutchNT2Level.c1:
                return 'C1'
            case DutchNT2Level.c2:
                return 'C2'
            case DutchNT2Level.unknown:
                return 'Onbekend'
            default:
                throw new DomainError(`translation for lastKnownLevel ${this.lastKnownLevel} not implemented`)
        }
    }

    @Property({ persist: false })
    public get translated_dutchNTLevel() {
        if (!this.dutchNTLevel) {
            return
        }

        switch (this.dutchNTLevel) {
            case DutchNTType.nt1:
                return 'NT1'
            case DutchNTType.nt2:
                return 'NT2'
            default:
                throw new DomainError(`translation for dutchntlevel ${this.dutchNTLevel} not implemented`)
        }
    }

    @Property({ persist: false })
    public get translated_foundVia() {
        if (!this.foundVia) {
            return
        }

        switch (this.foundVia) {
            case IntakeFoundVia.volunteerCenter:
                return 'Vrijwilliger'
            case IntakeFoundVia.libraryWebsite:
                return 'Website van de bibliotheek'
            case IntakeFoundVia.socialMedia:
                return 'Social media'
            case IntakeFoundVia.newspaper:
                return 'Krant'
            case IntakeFoundVia.viaVia:
                return 'Via via'
            case IntakeFoundVia.other:
                return 'Anders'
            default:
                throw new DomainError(`translation for foundVia ${this.foundVia} not implemented`)
        }
    }

    @Property({ persist: false })
    public get translated_status() {
        if (!this.status) {
            return
        }

        switch (this.status) {
            case RegistrationStatus.pending:
                return 'In afwachting'
            case RegistrationStatus.accepted:
                return 'Geaccepteerd'
            case RegistrationStatus.rejected:
                return 'Afgewezen'
            default:
                throw new DomainError(`translation for status ${this.status} not implemented`)
        }
    }

    @Property({ persist: false })
    public get translated_referringOrganization() {
        return Registration.getTranslatedReferringOrganization(this.referringOrganization)
    }

    public get translated_dayTimeActivities() {
        if (!this.dayTimeActivities) {
            return ''
        }

        return this.dayTimeActivities
            .map(a => {
                switch (a) {
                    case IntakeDayTimeActivities.searchingForJob:
                        return 'Op zoek naar werk'
                    case IntakeDayTimeActivities.reIntegration:
                        return 'Re-integratie'
                    case IntakeDayTimeActivities.school:
                        return 'Studie/school'
                    case IntakeDayTimeActivities.volunteerJob:
                        return 'Vrijwilligerswerk'
                    case IntakeDayTimeActivities.job:
                        return 'Werk'
                    case IntakeDayTimeActivities.other:
                        return 'Anders, namelijk...'
                    default:
                        throw new DomainError(`Day time activity ${a} is not yet translated`)
                }
            })
            .join(', ')
    }

    public get translated_speakingLevel() {
        if (!this.speakingLevel) {
            return
        }

        switch (this.speakingLevel) {
            case SpeakingLevel.beginner:
                return 'Beginnende deelnemer'
            case SpeakingLevel.advanced:
                return 'Gevorderde deelnemer'
            case SpeakingLevel.reasonable:
                return 'Enigszins geoefende deelnemer'
            default:
                throw new DomainError(`translation for speaking level ${this.speakingLevel} not implemented`)
        }
    }

    public static getTranslatedReferringOrganization(referringOrganization?: ReferringOrganizationEnum) {
        if (!referringOrganization) {
            return
        }

        switch (referringOrganization) {
            case ReferringOrganizationEnum.uwv:
                return 'Uitvoeringsinstituut Werknemersverzekeringen'
            case ReferringOrganizationEnum.socialService:
                return 'Sociale service'
            case ReferringOrganizationEnum.library:
                return 'Bibliotheek'
            case ReferringOrganizationEnum.welfareWork:
                return 'Welzijn'
            case ReferringOrganizationEnum.neighborhoodTeam:
                return 'Woonplaats team'
            case ReferringOrganizationEnum.volunteerOrganization:
                return 'Vrijwillige organisatie'
            case ReferringOrganizationEnum.languageProvider:
                return 'Taal aanbieder'
            case ReferringOrganizationEnum.other:
                return 'Anders'
            default:
                throw new DomainError(`translation for referring organization ${referringOrganization} not implemented`)
        }
    }
}
