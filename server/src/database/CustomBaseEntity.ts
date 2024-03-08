import { PrimaryKey, Property } from '@mikro-orm/core'

export abstract class CustomBaseEntity {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    public id: string

    @Property()
    public createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    public updatedAt = new Date()

    protected static getArrayEnumCheck(enumObj: Record<string, string> = {}, fieldName: string) {
        const vals = Object.values(enumObj)
            .map(v => `'${v}'`)
            .join(',')

        return `"${fieldName}" <@ ARRAY[${vals}]`
    }
}

export abstract class CustomDeletableBaseEntity extends CustomBaseEntity {
    @Property()
    public deletedAt?: Date | null
}
