import { Entity, EntityRepositoryType, Enum, ManyToOne, Property } from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Employee } from '../employee/employee.entity'
import { Student } from '../student/student.entity'
import { StudentContactMomentRepository } from './studentContactMoment.repository'
import { Organization } from '../organization/organization.entity'

export enum StudentContactMomentContactType {
    remark = 'remark',
    storyTelling = 'storyTelling',
    intake = 'intake',
    followUp = 'followUp',
    finalTalk = 'finalTalk',
}
registerEnumType(StudentContactMomentContactType, { name: 'StudentContactMomentContactType' })

@Entity({ customRepository: () => StudentContactMomentRepository })
export class StudentContactMoment extends CustomBaseEntity {
    public [EntityRepositoryType]?: StudentContactMomentRepository

    @Property({ nullable: false })
    public date: Date

    @ManyToOne({ onDelete: 'set null', nullable: true })
    public createdByOrganization?: Organization | null

    @Property({ persist: false })
    public get createdByOrganizationId() {
        return this.createdByOrganization?.id
    }

    // nullable in case of delete of employee
    @ManyToOne({ onDelete: 'set null', nullable: true })
    public createdByEmployee?: Employee | null

    @Property({ persist: false })
    public get createdByEmployeeId() {
        return this.createdByEmployee?.id
    }

    @Property({ nullable: false, type: 'text' })
    public explanation: string

    @ManyToOne({ onDelete: 'cascade', nullable: false })
    public student: Student

    @Property({ persist: false })
    public get studentId() {
        return this.student.id
    }

    @Enum(() => StudentContactMomentContactType)
    @Property({ nullable: false })
    public type: StudentContactMomentContactType
}
