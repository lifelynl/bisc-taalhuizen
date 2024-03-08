import { Entity, EntityRepositoryType, Enum, OneToOne, Property } from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Student } from '../student/student.entity'
import { CivicIntegrationRepository } from './civicIntegration.repository'

export enum CivicIntegrationRequirement {
    yes = 'yes',
    no = 'no',
    inProgress = 'inProgress',
}
registerEnumType(CivicIntegrationRequirement, { name: 'CivicIntegrationRequirement' })

export enum CivicIntegrationReason {
    finished = 'finished',
    fromEuCountry = 'fromEuCountry',
    exemptedOrZRoute = 'exemptedOrZRoute',
}
registerEnumType(CivicIntegrationReason, { name: 'CivicIntegrationReason' })

@Entity({ customRepository: () => CivicIntegrationRepository })
export class CivicIntegration extends CustomBaseEntity {
    public [EntityRepositoryType]?: CivicIntegrationRepository

    @OneToOne({ onDelete: 'cascade' })
    public student: Student

    @Property({ persist: false })
    public get studentId() {
        return this.student.id
    }

    @Enum(() => CivicIntegrationReason)
    @Property({ nullable: true })
    public reason?: CivicIntegrationReason

    @Enum(() => CivicIntegrationRequirement)
    @Property({ nullable: true })
    public requirement?: CivicIntegrationRequirement

    @Property({ nullable: true })
    public finishDate?: Date
}
