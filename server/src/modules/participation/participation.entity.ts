import { Entity, EntityRepositoryType, Enum, ManyToOne, OneToOne, Property } from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { EducationGroup } from '../educationGroup/educationGroup.entity'
import { Employee } from '../employee/employee.entity'
import { LearningNeed } from '../learningneed/learningneed.entity'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { Organization } from '../organization/organization.entity'
import { ParticipationRepository } from './participation.repository'
import { DomainError } from '../../errors/DomainError'

export enum ParticipationProviderOption {
    provider = 'provider',
    other = 'other',
}
registerEnumType(ParticipationProviderOption, { name: 'ParticipationProviderOption' })

export enum ParticipationEndReason {
    moved = 'moved',
    work = 'work',
    health = 'health',
    deceased = 'deceased',
    completedSuccessfully = 'completedSuccessfully',
    family = 'family',
    doesNotMeetExpectations = 'doesNotMeetExpectations',
    other = 'other',
}
registerEnumType(ParticipationEndReason, { name: 'ParticipationEndReason' })

export enum ParticipationOutFlow {
    study = 'study',
    work = 'work',
    volunteerWork = 'volunteerWork',
    formalFollowUp = 'formalFollowUp',
    nonFormalFollowUp = 'nonFormalFollowUp',
    unknown = 'unknown',
    other = 'other',
}
registerEnumType(ParticipationOutFlow, { name: 'ParticipationOutFlow' })

export enum ParticipationOfferType {
    language = 'language',
    math = 'math',
    digital = 'digital',
    other = 'other',
}
registerEnumType(ParticipationOfferType, { name: 'ParticipationOfferType' })

export enum ParticipationFormality {
    formal = 'formal',
    nonFormal = 'nonFormal',
}
registerEnumType(ParticipationFormality, { name: 'ParticipationFormality' })

export enum ParticipationGroupType {
    individually = 'individually',
    group = 'group',
}
registerEnumType(ParticipationGroupType, { name: 'ParticipationGroupType' })

export enum ParticipationStatus {
    referred = 'referred',
    ongoing = 'ongoing',
    finished = 'finished',
    autoCreated = 'autoCreated',
}
registerEnumType(ParticipationStatus, { name: 'ParticipationStatus' })

@Entity({ customRepository: () => ParticipationRepository })
export class Participation extends CustomBaseEntity {
    public [EntityRepositoryType]?: ParticipationRepository

    @ManyToOne(() => Organization, { onDelete: 'cascade' })
    public provider?: Organization | null

    @Property({ persist: false })
    public get providerId() {
        return this.provider?.id
    }

    @ManyToOne(() => LearningNeed, { onDelete: 'cascade' })
    public learningNeed: LearningNeed

    @Property({ persist: false })
    public get learningNeedId() {
        return this.learningNeed.id
    }

    @Property()
    public cascadeOnLearningNeedDelete?: boolean

    @ManyToOne(() => Employee, { onDelete: 'SET NULL' })
    public mentor?: Employee | null

    @Property({ persist: false })
    public get mentorId() {
        return this.mentor?.id
    }

    @Enum(() => ParticipationProviderOption)
    @Property({ nullable: true })
    public providerOption?: ParticipationProviderOption

    @Property({ nullable: true })
    public providerOther?: string | null

    @Property({ nullable: true, type: 'varchar(255)' })
    public providerExplanation?: string | null

    // start date of student
    @Property({ nullable: true })
    public startParticipation?: Date | null

    // end date of student
    @Property({ nullable: true })
    public endParticipation?: Date | null

    // start date of activity
    @Property({ nullable: true })
    public start?: Date | null

    // end date of activity
    @Property({ nullable: true })
    public end?: Date | null

    @Enum(() => ParticipationEndReason)
    @Property({ nullable: true })
    public reasonEndParticipation?: ParticipationEndReason | null

    @Enum(() => ParticipationOutFlow)
    @Property({ nullable: true })
    public outFlowParticipation?: ParticipationOutFlow | null

    @Property({ nullable: true, type: 'text' })
    public outFlowReasonOther?: string | null

    @Property({ nullable: true })
    public offerName?: string | null

    @Enum(() => ParticipationOfferType)
    @Property({ nullable: true })
    public offerType?: ParticipationOfferType | null

    @Enum(() => ParticipationFormality)
    @Property({ nullable: true })
    public formality?: ParticipationFormality | null

    @Enum(() => ParticipationGroupType)
    @Property({ nullable: true })
    public groupFormation?: ParticipationGroupType | null

    @Property({ nullable: true })
    public degree?: boolean | null

    @Property({ nullable: true, type: 'text' })
    public agreement?: string | null

    @Property({ persist: false })
    public get status(): ParticipationStatus {
        if (this.endParticipation && this.endParticipation <= new Date()) {
            return ParticipationStatus.finished
        }

        if (this.providerOption === ParticipationProviderOption.other) {
            return ParticipationStatus.ongoing
        }

        if (this.startParticipation && (!this.endParticipation || this.endParticipation > new Date())) {
            return ParticipationStatus.ongoing
        }

        if (this.cascadeOnLearningNeedDelete) {
            return ParticipationStatus.autoCreated
        }

        return ParticipationStatus.referred
    }

    @ManyToOne(() => EducationGroup, { onDelete: 'set null' })
    public educationGroup?: EducationGroup | null

    @Property({ persist: false })
    public get educationGroupId() {
        return this.educationGroup?.id
    }

    @OneToOne(() => LearningNeedOutcome, learningNeedOutcome => learningNeedOutcome.participation, {
        owner: true,
        nullable: true,
        onDelete: 'cascade',
    })
    public offerLearningNeedOutcome?: LearningNeedOutcome | null

    @Property({ persist: false })
    public get offerLearningNeedOutcomeId() {
        return this.offerLearningNeedOutcome?.id
    }

    public get translated_status() {
        switch (this.status) {
            case ParticipationStatus.autoCreated:
                return 'Nieuw'
            case ParticipationStatus.referred:
                return 'Verwezen'
            case ParticipationStatus.ongoing:
                return 'Lopend'
            case ParticipationStatus.finished:
                return 'Afgerond'
            default:
                throw new DomainError(`Status ${this.status} is not translated`)
        }
    }

    public get translated_offerType() {
        if (!this.offerType) {
            return ''
        }

        switch (this.offerType) {
            case ParticipationOfferType.digital:
                return 'Digitale vaardigheden'
            case ParticipationOfferType.language:
                return 'Taal'
            case ParticipationOfferType.math:
                return 'Rekenen'
            case ParticipationOfferType.other:
                return 'Overige'
            default:
                throw new DomainError(`Offer type ${this.offerType} is not translated`)
        }
    }

    public get translated_formality() {
        if (!this.formality) {
            return ''
        }

        switch (this.formality) {
            case ParticipationFormality.formal:
                return 'Formeel'
            case ParticipationFormality.nonFormal:
                return 'Non-formeel'
            default:
                throw new DomainError(`Formality ${this.formality} is not translated`)
        }
    }

    public get translated_reasonEndParticipation() {
        if (!this.reasonEndParticipation) {
            return ''
        }

        switch (this.reasonEndParticipation) {
            case ParticipationEndReason.moved:
                return 'Verhuisd'
            case ParticipationEndReason.work:
                return 'Werk'
            case ParticipationEndReason.health:
                return 'Ziekte/gezondheid'
            case ParticipationEndReason.deceased:
                return 'Overlijden'
            case ParticipationEndReason.completedSuccessfully:
                return 'Succesvol afgerond'
            case ParticipationEndReason.family:
                return 'Familie omstandigheden'
            case ParticipationEndReason.doesNotMeetExpectations:
                return 'Voldoet niet aan verwachting deelnemer'
            case ParticipationEndReason.other:
                return 'Overig'
            default:
                throw new DomainError(`Reason end participation ${this.reasonEndParticipation} is not translated`)
        }
    }

    public get translated_outFlowParticipation() {
        if (!this.outFlowParticipation) {
            return ''
        }

        switch (this.outFlowParticipation) {
            case ParticipationOutFlow.study:
                return 'Studeren'
            case ParticipationOutFlow.work:
                return 'Werken'
            case ParticipationOutFlow.volunteerWork:
                return 'Vrijwilligerswerk'
            case ParticipationOutFlow.formalFollowUp:
                return 'Vervolgtraject formeel'
            case ParticipationOutFlow.nonFormalFollowUp:
                return 'Vervolgtraject non formeel'
            case ParticipationOutFlow.unknown:
                return 'Onbekend'
            case ParticipationOutFlow.other:
                return 'Anders'

            default:
                throw new DomainError(`Reason outflow ${this.outFlowParticipation} is not translated`)
        }
    }
}
