import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class AanbiederAddressType {
    @Field()
    public street!: string

    @Field()
    public houseNumber!: string

    @Field()
    public houseNumberSuffix?: string

    @Field()
    public postalCode!: string

    @Field()
    public locality!: string
}

@ObjectType()
export class AanbiederType {
    @Field()
    public id!: string

    @Field()
    public name!: string

    @Field({ nullable: true })
    public address?: AanbiederAddressType

    @Field({ nullable: true })
    public email?: string

    @Field({ nullable: true })
    public telephone?: string

    @Field({ nullable: true })
    public type?: string
}
