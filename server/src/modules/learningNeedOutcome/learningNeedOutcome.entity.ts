import { Entity, EntityRepositoryType, Enum, OneToOne, Property } from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { LearningNeed } from '../learningneed/learningneed.entity'
import { Participation } from '../participation/participation.entity'
import { LearningNeedOutcomeRepository } from './learningNeedOutcome.repository'
import { Registration } from '../registration/registration.entity'
import { DomainError } from '../../errors/DomainError'

export enum LearningResultSubject {
    dutchRead = 'dutchRead',
    dutchWrite = 'dutchWrite',
    dutchSpeaking = 'dutchSpeaking',
    math = 'math',
    digitalSkills = 'digitalSkills',
    knowledge = 'knowledge',
    skills = 'skills',
    attitude = 'attitude',
    behaviour = 'behaviour',
    other = 'other',
}
registerEnumType(LearningResultSubject, { name: 'LearningResultSubject' })

export enum LearningResultApplication {
    familyAndUpbringing = 'familyAndUpbringing',
    laborMarketAndWork = 'laborMarketAndWork',
    healthAndWellbeing = 'healthAndWellbeing',
    livingAndNeighborhood = 'livingAndNeighborhood',
    selfSustainability = 'selfSustainability',
    other = 'other',
}
registerEnumType(LearningResultApplication, { name: 'LearningResultApplication' })

export enum LearningResultLevel {
    influx = 'influx',
    nlqf1 = 'nlqf1',
    nlqf2 = 'nlqf2',
    nlqf3 = 'nlqf3',
    nlqf4 = 'nlqf4',
    other = 'other',
}
registerEnumType(LearningResultLevel, { name: 'LearningResultLevel' })

@Entity({ customRepository: () => LearningNeedOutcomeRepository })
export class LearningNeedOutcome extends CustomBaseEntity {
    public [EntityRepositoryType]?: LearningNeedOutcomeRepository

    @Enum(() => LearningResultSubject)
    @Property({ nullable: true })
    public subject?: LearningResultSubject

    @Enum(() => LearningResultApplication)
    @Property({ nullable: true })
    public application?: LearningResultApplication

    @Enum(() => LearningResultLevel)
    @Property({ nullable: true })
    public level?: LearningResultLevel

    @Property()
    public subjectOther?: string

    @Property()
    public applicationOther?: string

    @Property()
    public levelOther?: string

    @OneToOne(() => LearningNeed, learningNeed => learningNeed.desiredLearningNeedOutcome, {
        orphanRemoval: true,
    })
    public learningNeed?: LearningNeed

    @OneToOne(() => Participation, participation => participation.offerLearningNeedOutcome, {
        orphanRemoval: true,
    })
    public participation?: Participation

    @OneToOne(() => Registration, registration => registration.desiredLearningNeedOutcome, {
        orphanRemoval: true,
    })
    public registration?: Registration

    @Property({ persist: false })
    public get translated_subject() {
        if (!this.subject) {
            return
        }

        switch (this.subject) {
            case LearningResultSubject.attitude:
                return 'Houding'
            case LearningResultSubject.behaviour:
                return 'Gedrag'
            case LearningResultSubject.digitalSkills:
                return 'Digitale vaardigheden'
            case LearningResultSubject.dutchRead:
                return 'Nederlands: Lezen'
            case LearningResultSubject.dutchWrite:
                return 'Nederlands: Schrijven'
            case LearningResultSubject.dutchSpeaking:
                return 'Nederlands: Spreken'
            case LearningResultSubject.knowledge:
                return 'Kennis'
            case LearningResultSubject.math:
                return 'Rekenen'
            case LearningResultSubject.other:
                return 'Anders'
            case LearningResultSubject.skills:
                return 'Vaardigheden'
            default:
                throw new DomainError(`translation for subject ${this.subject} not implemented`)
        }
    }

    @Property({ persist: false })
    public get translated_application() {
        if (!this.application) {
            return
        }

        switch (this.application) {
            case LearningResultApplication.laborMarketAndWork:
                return 'Arbeidsmarkt en werk'
            case LearningResultApplication.familyAndUpbringing:
                return 'Gezin en opvoeden'
            case LearningResultApplication.healthAndWellbeing:
                return 'Gezondheid en welzijn'
            case LearningResultApplication.livingAndNeighborhood:
                return 'Wonen en buurt'
            case LearningResultApplication.selfSustainability:
                return 'Zelfredzaamheid'
            case LearningResultApplication.other:
                return 'Anders'
            default:
                throw new DomainError(`translation for application ${this.application} not implemented`)
        }
    }

    @Property({ persist: false })
    public get translated_level() {
        if (!this.level) {
            return
        }

        switch (this.level) {
            case LearningResultLevel.influx:
                return 'Instroom'
            case LearningResultLevel.nlqf1:
                return 'NLQF 1'
            case LearningResultLevel.nlqf2:
                return 'NLQF 2'
            case LearningResultLevel.nlqf3:
                return 'NLQF 3'
            case LearningResultLevel.nlqf4:
                return 'NLQF 4'
            case LearningResultLevel.other:
                return 'Anders'
            default:
                throw new DomainError(`translation for level ${this.level} not yet implemented`)
        }
    }
}
