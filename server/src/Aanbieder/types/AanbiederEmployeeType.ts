import { Field, ObjectType } from '@nestjs/graphql'
import { AanbiederUserRoleType } from './AanbiederUserRoleType'

@ObjectType()
export class AanbiederEmployeeType {
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

    @Field(() => [AanbiederUserRoleType])
    public userRoles!: AanbiederUserRoleType[]
}
