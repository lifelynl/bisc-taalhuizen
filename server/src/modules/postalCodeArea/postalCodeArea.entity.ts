import { Entity, EntityRepositoryType, ManyToOne, Property, Unique } from '@mikro-orm/core'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Organization } from '../organization/organization.entity'
import { Team } from '../team/team.entity'
import { PostalCodeAreaRepository } from './postalCodeArea.repository'

@Entity({ customRepository: () => PostalCodeAreaRepository })
export class PostalCodeArea extends CustomBaseEntity {
    public [EntityRepositoryType]?: PostalCodeAreaRepository

    @ManyToOne({ nullable: true })
    public organization?: Organization | null

    @Property({ persist: false })
    public get organizationId() {
        return this.organization?.id
    }

    @ManyToOne({ nullable: true, onDelete: 'set null' }) // set null so the org doesnt lose it when a team is removed
    public team?: Team

    @Property({ persist: false })
    public get teamId() {
        return this.team?.id
    }

    @Unique()
    @Property({ length: 4, nullable: false })
    public code: number
}
