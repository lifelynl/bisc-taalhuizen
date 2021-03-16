import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TaalhuisUserRoleType {
    @Field()
    public id!: string

    @Field()
    public name!: string
}
