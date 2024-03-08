import {
    Collection,
    Entity,
    EntityRepositoryType,
    Enum,
    ManyToMany,
    ManyToOne,
    OneToMany,
    Property,
    Unique,
} from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { EducationGroup } from '../educationGroup/educationGroup.entity'
import { Organization, OrganizationTypeEnum } from '../organization/organization.entity'
import { Person } from '../person/person.entity'
import { Student } from '../student/student.entity'
import { Team } from '../team/team.entity'
import { EmployeeRepository } from './employee.repository'
import { DomainError } from '../../errors/DomainError'

export enum EmployeeRole {
    employee = 'employee',
    coordinator = 'coordinator',
    mentor = 'mentor',
    coordinatorMentor = 'coordinatorMentor',
    volunteer = 'volunteer',
}
registerEnumType(EmployeeRole, { name: 'EmployeeRole' })

const ValidLanguageHouseEmployeeRoles = [EmployeeRole.employee, EmployeeRole.coordinator]
const ValidProviderEmployeeRoles = [
    EmployeeRole.coordinator,
    EmployeeRole.mentor,
    EmployeeRole.coordinatorMentor,
    EmployeeRole.volunteer,
]

@Entity({ customRepository: () => EmployeeRepository })
@Unique({ properties: ['organization', 'person'] })
export class Employee extends CustomBaseEntity {
    public [EntityRepositoryType]?: EmployeeRepository

    @ManyToOne({ onDelete: 'cascade' })
    public organization: Organization

    @Property({ persist: false })
    public get organizationId() {
        return this.organization.id
    }

    @Enum(() => EmployeeRole)
    @Property()
    public role?: EmployeeRole

    @ManyToOne({ onDelete: 'cascade' })
    public person: Person

    @Property({ persist: false })
    public get personId() {
        return this.person.id
    }

    @OneToMany(() => Student, student => student.mentor)
    public mentees = new Collection<Student>(this)

    @ManyToMany(() => Team, team => team.members)
    public teams = new Collection<Team>(this)

    @ManyToMany(() => EducationGroup, educationGroup => educationGroup.employees)
    public educationGroups = new Collection<EducationGroup>(this)

    public hasOneOfRoles(roles: EmployeeRole[]) {
        for (const role of roles) {
            if (this.role === role) {
                return true
            }
        }

        return false
    }

    public static isValidRoleForAccessGroup(accessGroup: OrganizationTypeEnum, role?: EmployeeRole) {
        if (!role) {
            return true
        }

        switch (accessGroup) {
            case OrganizationTypeEnum.bisc:
                return true
            case OrganizationTypeEnum.languageHouse:
                return ValidLanguageHouseEmployeeRoles.includes(role)
            case OrganizationTypeEnum.provider:
                return ValidProviderEmployeeRoles.includes(role)
            default:
                throw new DomainError('invalid-access-group')
        }
    }
}
