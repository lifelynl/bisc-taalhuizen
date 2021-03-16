import { Field, ObjectType } from '@nestjs/graphql'
import { TaalhuisUserRoleType } from './TaalhuisUserRoleType'

@ObjectType()
export class TaalhuisEmployeeType {
    @Field()
    public id!: string

    @Field()
    public givenName!: string

    @Field()
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    public email!: string

    @Field()
    public telephone?: string

    @Field()
    public dateCreated?: string

    @Field()
    public dateModified?: string

    @Field(() => [TaalhuisUserRoleType])
    public userRoles!: TaalhuisUserRoleType[]
}
