import {
    Collection,
    Entity,
    EntityRepositoryType,
    Enum,
    ManyToMany,
    ManyToOne,
    OneToOne,
    Property,
} from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Employee } from '../employee/employee.entity'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { Organization } from '../organization/organization.entity'
import { Availability } from '../person/person.entity'
import { EducationGroupRepository } from './educationGroup.repository'
import { DomainError } from '../../errors/DomainError'

export enum GroupOfferType {
    language = 'language',
    math = 'math',
    digital = 'digital',
    other = 'other',
}
registerEnumType(GroupOfferType, { name: 'GroupOfferType' })

export enum GroupFormality {
    formal = 'formal',
    nonFormal = 'nonFormal',
}
registerEnumType(GroupFormality, { name: 'GroupFormality' })

export enum EducationGroupStatus {
    active = 'active',
    future = 'future',
    past = 'past',
}
registerEnumType(EducationGroupStatus, { name: 'EducationGroupStatus' })

@Entity({ customRepository: () => EducationGroupRepository })
export class EducationGroup extends CustomBaseEntity {
    public [EntityRepositoryType]?: EducationGroupRepository

    @Property()
    public name: string

    @Property({ nullable: true })
    public lessonHours?: number

    @Property()
    public location: string

    @Enum(() => GroupOfferType)
    public type: GroupOfferType

    @ManyToOne(() => Organization, { onDelete: 'cascade' })
    public organization: Organization

    @Property({ persist: false })
    public get organizationId() {
        return this.organization.id
    }

    @OneToOne(() => LearningNeedOutcome)
    public desiredLearningNeedOutcome: LearningNeedOutcome

    @Property({ persist: false })
    public get desiredLearningNeedOutcomeId() {
        return this.desiredLearningNeedOutcome.id
    }

    @Property()
    public degree?: boolean

    @Property()
    public start?: Date

    @Property()
    public end?: Date

    @Property()
    public availabilityNotes?: string

    @Property()
    public minimumParticipants?: number

    @Property()
    public maximumParticipants?: number

    @Property()
    public evaluation?: string

    @Enum(() => GroupFormality)
    public formality?: GroupFormality

    // because the enum exists in a different file, this is only way to correctly generate the migration
    @Property({
        type: 'array',
        nullable: true,
        check: CustomBaseEntity.getArrayEnumCheck(Availability, 'availability'),
    })
    public availability?: Availability[]

    @ManyToMany(() => Employee)
    public employees = new Collection<Employee>(this)

    @Property({ persist: false })
    public get status(): EducationGroupStatus | null {
        if (!this.start && !this.end) {
            return null
        }

        if (this.end && this.end <= new Date()) {
            return EducationGroupStatus.past
        }

        if (this.start && this.start <= new Date()) {
            return EducationGroupStatus.active
        }

        return EducationGroupStatus.future
    }

    public get translated_type() {
        switch (this.type) {
            case GroupOfferType.digital:
                return 'Digitale vaardigheden'
            case GroupOfferType.language:
                return 'Taal'
            case GroupOfferType.math:
                return 'Rekenen'
            case GroupOfferType.other:
                return 'Overige'
            default:
                throw new DomainError(`Type ${this.type} not yet translated`)
        }
    }

    public get translated_formality() {
        if (!this.formality) {
            return ''
        }

        switch (this.formality) {
            case GroupFormality.formal:
                return 'Formeel'
            case GroupFormality.nonFormal:
                return 'Non-formeel'
            default:
                throw new DomainError(`Formality ${this.formality} not yet translated`)
        }
    }
}
