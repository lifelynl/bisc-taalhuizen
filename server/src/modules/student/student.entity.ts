import {
    Cascade,
    Collection,
    Entity,
    EntityRepositoryType,
    ManyToOne,
    OneToMany,
    OneToOne,
    Property,
} from '@mikro-orm/core'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { LearningNeed } from '../learningneed/learningneed.entity'
import { Registration } from '../registration/registration.entity'
import { Organization } from '../organization/organization.entity'
import { Person } from '../person/person.entity'
import { StudentRepository } from './student.repository'
import { CivicIntegration } from '../civicIntegration/civicIntegration.entity'
import { Employee } from '../employee/employee.entity'
import { Team } from '../team/team.entity'

@Entity({ customRepository: () => StudentRepository })
export class Student extends CustomBaseEntity {
    public [EntityRepositoryType]?: StudentRepository

    @Property()
    public intakeDate = new Date()

    @ManyToOne({ onDelete: 'cascade' })
    public organization: Organization

    @Property({ persist: false })
    public get organizationId() {
        return this.organization.id
    }

    @OneToOne(() => Person, person => person.student, { onDelete: 'cascade' })
    public person: Person

    @ManyToOne({ onDelete: 'set null', nullable: true })
    public team?: Team | null

    @Property({ persist: false })
    public get teamId() {
        return this.team?.id
    }

    @OneToMany(() => LearningNeed, learningNeed => learningNeed.student, { nullable: true })
    public learningNeeds = new Collection<LearningNeed>(this)

    @OneToOne({ cascade: [Cascade.REMOVE] })
    public registration: Registration

    @Property({ persist: false })
    public get registrationId() {
        return this.registration.id
    }

    @OneToOne(() => CivicIntegration, civicIntegration => civicIntegration.student)
    public civicIntegration?: CivicIntegration

    @Property({ persist: false })
    public get civicIntegrationId() {
        return this.civicIntegration?.id
    }

    @ManyToOne({ nullable: true, onDelete: 'set null' })
    public mentor?: Employee

    @Property({ persist: false })
    public get mentorId() {
        return this.mentor?.id
    }
}
