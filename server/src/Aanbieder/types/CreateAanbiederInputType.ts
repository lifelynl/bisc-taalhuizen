import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsEmail, IsOptional, IsPostalCode, ValidateNested } from 'class-validator'
import { CreateAanbiederInput } from '../CreateAanbiederService'

@InputType()
class CreateAanbiederAddressInputType {
    @Field()
    public street!: string

    @Field()
    public houseNumber!: string

    @Field({ nullable: true })
    @IsOptional()
    public houseNumberSuffix?: string

    @Field()
    @IsPostalCode('NL')
    public postalCode!: string

    @Field()
    public locality!: string
}

@ArgsType()
export class CreateAanbiederInputType implements CreateAanbiederInput {
    @Field({ nullable: true })
    @Type(() => CreateAanbiederAddressInputType)
    @ValidateNested()
    public address?: CreateAanbiederAddressInputType

    @Field()
    public name!: string

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    public email?: string

    @Field({ nullable: true })
    public phoneNumber?: string
}
