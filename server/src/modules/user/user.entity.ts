import { Entity, EntityDTO, EntityRepositoryType, Enum, OneToOne, Property } from '@mikro-orm/core'
import { UserRepository } from './user.repository'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { registerEnumType } from '@nestjs/graphql'
import { Person } from '../person/person.entity'

export enum Locale {
    en = 'en',
    nl = 'nl',
}
registerEnumType(Locale, { name: 'Locale' })
@Entity({ customRepository: () => UserRepository })
export class User extends CustomBaseEntity {
    public [EntityRepositoryType]?: UserRepository

    @Property({ unique: true })
    public username: string

    @Property({ hidden: true })
    public password?: string

    @Property({ hidden: true })
    public passwordResetToken?: string | null

    @Property({ hidden: true })
    public refreshToken?: string | null

    @Property()
    public passwordResetRequestedAt?: Date | null

    @Enum({ default: Locale.nl })
    @Property()
    public locale: Locale

    @OneToOne({ onDelete: 'CASCADE' })
    public person?: Person

    @Property({ persist: false })
    public get personId() {
        return this.person?.id
    }
}

export type UserDTO = EntityDTO<User>
