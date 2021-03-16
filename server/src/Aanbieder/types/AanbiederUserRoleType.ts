import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AanbiederUserRoleType {
    @Field()
    public id!: string

    @Field()
    public name!: string
}
