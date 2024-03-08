import { Cascade, Entity, EntityRepositoryType, OneToOne, Property } from '@mikro-orm/core'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Organization } from '../organization/organization.entity'
import { Person } from '../person/person.entity'
import { AddressRepository } from './address.repository'
@Entity({ customRepository: () => AddressRepository })
export class Address extends CustomBaseEntity {
    public [EntityRepositoryType]?: AddressRepository

    @Property()
    public name?: string | null

    @Property()
    public street?: string | null

    @Property()
    public houseNumber?: string | null

    @Property()
    public houseNumberSuffix?: string | null

    @Property()
    public postalCode?: string | null

    @Property()
    public locality?: string | null

    @Property()
    public country?: string | null

    @OneToOne(() => Organization, org => org.address, { cascade: [Cascade.REMOVE] })
    public organization: Organization

    @OneToOne(() => Person, per => per.address, { cascade: [Cascade.REMOVE] })
    public person: Person

    public get formatted_streetAndHouseNumber() {
        return [this.street, this.houseNumber, this.houseNumberSuffix].filter(v => !!v).join(' ')
    }
}
