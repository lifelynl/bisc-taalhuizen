export enum UserEnvironment {
    BISC = 'BISC',
    TAALHUIS = 'TAALHUIS',
    AANBIEDER = 'AANBIEDER',
}

export class UserEntity {
    public id!: string
    public username!: string
    public dateCreated!: Date
    public dateModified!: Date
}

export class UserEdge {
    public node!: UserEntity
}
