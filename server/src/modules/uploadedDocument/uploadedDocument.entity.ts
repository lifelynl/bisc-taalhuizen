import { Entity, EntityRepositoryType, ManyToOne, Property } from '@mikro-orm/core'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Person } from '../person/person.entity'
import { UploadedDocumentRepository } from './uploadedDocument.repository'
import { User } from '../user/user.entity'

@Entity({ customRepository: () => UploadedDocumentRepository })
export class UploadedDocument extends CustomBaseEntity {
    public [EntityRepositoryType]?: UploadedDocumentRepository

    @ManyToOne({ onDelete: 'cascade' })
    public person: Person

    @Property({ persist: false })
    public get personId() {
        return this.person.id
    }

    @ManyToOne({ onDelete: 'cascade' })
    public createdByUser: User

    @Property({ persist: false })
    public get createdByUserId() {
        return this.createdByUser.id
    }

    @Property()
    public name: string

    @Property()
    public extension: string

    @Property()
    public mimeType: string

    @Property()
    public size: number

    @Property()
    public path: string
}
