import { Collection, Entity, EntityRepositoryType, ManyToMany, ManyToOne, OneToMany, Property } from '@mikro-orm/core'
import { CustomDeletableBaseEntity } from 'src/database/CustomBaseEntity'
import { Employee } from '../employee/employee.entity'
import { Organization } from '../organization/organization.entity'
import { PostalCodeArea } from '../postalCodeArea/postalCodeArea.entity'
import { Student } from '../student/student.entity'
import { TeamRepository } from './team.repository'

@Entity({ customRepository: () => TeamRepository })
export class Team extends CustomDeletableBaseEntity {
    public [EntityRepositoryType]?: TeamRepository

    @Property({ nullable: false })
    public name: string

    @ManyToMany(() => Employee, 'teams', { owner: true })
    public members = new Collection<Employee>(this)

    @ManyToOne(() => Organization, { onDelete: 'cascade' })
    public parentOrganization: Organization

    @Property({ persist: false })
    public get parentOrganizationId() {
        return this.parentOrganization.id
    }

    @OneToMany(() => PostalCodeArea, 'team')
    public postalCodeAreas = new Collection<PostalCodeArea>(this)

    @OneToMany(() => Student, 'team')
    public students = new Collection<Student>(this)

    @Property()
    public hiddenFromPublic?: boolean
}
