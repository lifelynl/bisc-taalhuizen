import { Type } from 'class-transformer'
import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { ValidateNested, IsEmail, IsOptional } from 'class-validator'
import { UpdateAanbiederInput } from '../UpdateAanbiederService'

@InputType()
class UpdateAanbiederAddressInputType {
    @Field({ nullable: true })
    public street?: string

    @Field({ nullable: true })
    public houseNumber?: string

    @Field({ nullable: true })
    public houseNumberSuffix?: string

    @Field({ nullable: true })
    public postalCode?: string

    @Field({ nullable: true })
    public locality?: string
}

@ArgsType()
export class UpdateAanbiederInputType implements UpdateAanbiederInput {
    @Field()
    public id!: string

    @Field({ nullable: true })
    @Type(() => UpdateAanbiederAddressInputType)
    @ValidateNested()
    public address?: UpdateAanbiederAddressInputType

    @Field({ nullable: true })
    public name?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    public email?: string

    @Field({ nullable: true })
    public phoneNumber?: string
}
