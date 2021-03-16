import { Type } from 'class-transformer'
import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { ValidateNested, IsEmail, IsOptional } from 'class-validator'
import { UpdateTaalhuisInput } from '../UpdateTaalhuisService'

@InputType()
class UpdateTaalhuisAddressInputType {
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
export class UpdateTaalhuisInputType implements UpdateTaalhuisInput {
    @Field()
    public id!: string

    @Field({ nullable: true })
    @Type(() => UpdateTaalhuisAddressInputType)
    @ValidateNested()
    public address?: UpdateTaalhuisAddressInputType

    @Field({ nullable: true })
    public name?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    public email?: string

    @Field({ nullable: true })
    public phoneNumber?: string
}
