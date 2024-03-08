import {
    Cascade,
    Collection,
    Entity,
    EntityRepositoryType,
    Enum,
    ManyToOne,
    OneToMany,
    OneToOne,
    Property,
} from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { Organization } from '../organization/organization.entity'
import { Participation } from '../participation/participation.entity'
import { Student } from '../student/student.entity'
import { LearningNeedRepository } from './learningneed.repository'
import { DomainError } from '../../errors/DomainError'

export enum OfferDifference {
    no = 'no',
    yesNotOfferedInTravelRange = 'yesNotOfferedInTravelRange',
    yesQueue = 'yesQueue',
    yesOther = 'yesOther',
}

registerEnumType(OfferDifference, { name: 'OfferDifference' })
@Entity({ customRepository: () => LearningNeedRepository })
export class LearningNeed extends CustomBaseEntity {
    public [EntityRepositoryType]?: LearningNeedRepository

    @ManyToOne({ onDelete: 'cascade' })
    public student: Student

    @Property({ persist: false })
    public get studentId() {
        return this.student.id
    }

    @Property({ type: 'text' })
    public motivation: string

    @Property()
    public description: string

    @Enum(() => OfferDifference)
    @Property({ nullable: true })
    public offerDifference?: OfferDifference

    @Property({ nullable: true })
    public advisedOffer?: string

    @Property({ nullable: true })
    public desiredOffer?: string

    @Property({ nullable: true })
    public offerDifferenceOther?: string

    @Property({ nullable: true, type: 'text' })
    public agreements?: string

    @OneToOne(() => LearningNeedOutcome, learningNeedOutcome => learningNeedOutcome.learningNeed, {
        cascade: [Cascade.REMOVE],
        owner: true,
        nullable: true,
    })
    public desiredLearningNeedOutcome?: LearningNeedOutcome | null

    @Property({ persist: false })
    public get desiredLearningNeedOutcomeId() {
        return this.desiredLearningNeedOutcome?.id
    }

    @OneToMany(() => Participation, participation => participation.learningNeed)
    public participations = new Collection<Participation>(this)

    @ManyToOne(() => Organization, { nullable: true })
    public createdByProvider?: Organization | null

    @Property({ persist: false })
    public get createdByProviderId() {
        return this.createdByProvider?.id
    }

    public get translated_offerDifference() {
        if (!this.offerDifference) {
            return
        }

        switch (this.offerDifference) {
            case OfferDifference.no:
                return 'Nee, er is geen verschil'
            case OfferDifference.yesNotOfferedInTravelRange:
                return 'Ja, want: niet aangeboden binnen bereisbare afstand'
            case OfferDifference.yesOther:
                return 'Ja, want: anders'
            case OfferDifference.yesQueue:
                return 'Ja, want: wachtlijst'
            default:
                throw new DomainError(`translation for offer difference ${this.offerDifference} not implemented`)
        }
    }
}
