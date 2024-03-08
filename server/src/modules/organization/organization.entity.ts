import {
    Cascade,
    Collection,
    Entity,
    EntityRepositoryType,
    Enum,
    ManyToMany,
    OneToMany,
    OneToOne,
    Property,
} from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Address } from '../address/address.entity'
import { Employee } from '../employee/employee.entity'
import { PostalCodeArea } from '../postalCodeArea/postalCodeArea.entity'
import { Student } from '../student/student.entity'
import { Team } from '../team/team.entity'
import { OrganizationRepository } from './organization.repository'

export enum OrganizationTypeEnum {
    bisc = 'bisc',
    languageHouse = 'languageHouse',
    provider = 'provider',
}
registerEnumType(OrganizationTypeEnum, { name: 'OrganizationTypeEnum' })

export enum OrganizationIntakeFields {
    integrationMandatory = 'integrationMandatory',
    contactData = 'contactData',
    general = 'general',
    referer = 'referer',
    background = 'background',
    dutchNT = 'dutchNT',
    level = 'level',
    education = 'education',
    course = 'course',
    employment = 'employment',
    motivation = 'motivation',
    availability = 'availability',
    readingTest = 'readingTest',
    writingTest = 'writingTest',
}
registerEnumType(OrganizationIntakeFields, { name: 'OrganizationIntakeFields' })

@Entity({ customRepository: () => OrganizationRepository })
export class Organization extends CustomBaseEntity {
    public [EntityRepositoryType]?: OrganizationRepository

    @Property()
    public name: string

    @Property()
    public description?: string

    @Property({ unique: true })
    public slug: string

    @Enum(() => OrganizationTypeEnum)
    @Property()
    public type: OrganizationTypeEnum

    @OneToMany(() => Employee, employee => employee.organization, { cascade: [Cascade.REMOVE] })
    public employees = new Collection<Employee>(this)

    @OneToMany(() => Student, student => student.organization)
    public students = new Collection<Student>(this)

    @OneToOne({ nullable: true, cascade: [Cascade.PERSIST] })
    public address: Address | null

    @Property({ persist: false })
    public get addressId() {
        return this.address?.id
    }

    @Property()
    public email?: string

    @Property()
    public telephone?: string

    @OneToMany(() => PostalCodeArea, postalCodes => postalCodes.organization)
    public postalCodes = new Collection<PostalCodeArea>(this)

    @OneToMany(() => Team, 'parentOrganization')
    public teams = new Collection<Team>(this)

    @Enum({ items: () => OrganizationIntakeFields, array: true })
    @Property({ nullable: true })
    public disabledIntakeFields: OrganizationIntakeFields[] | null

    @ManyToMany(() => Organization, provider => provider.providerOf, {
        owner: true,
        joinColumn: 'languageHouse',
        inverseJoinColumn: 'provider',
    })
    public providers = new Collection<Organization>(this)

    @ManyToMany(() => Organization, languageHouse => languageHouse.providers, { mappedBy: 'providers' })
    public providerOf = new Collection<Organization>(this)

    @Property({ nullable: true, comment: 'Used only to limit provider editing rights at the moment' })
    public hasLimitedEditRights?: boolean | null
}
