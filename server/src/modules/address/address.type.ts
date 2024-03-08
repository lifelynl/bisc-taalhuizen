import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'

@ObjectType()
export class AddressType extends BaseEntityObjectType {
    @Field(() => String, { nullable: true })
    public name?: string

    @Field(() => String, { nullable: true })
    public street?: string

    @Field(() => String, { nullable: true })
    public houseNumber?: string

    @Field(() => String, { nullable: true })
    public houseNumberSuffix?: string

    @Field(() => String, { nullable: true })
    public postalCode?: string

    @Field(() => String, { nullable: true })
    public locality?: string

    @Field(() => String, { nullable: true })
    public country?: string
}

@InputType()
export class CreateAddressInputType {
    @Field(() => String, { nullable: true })
    public name?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public street?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public houseNumber?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public houseNumberSuffix?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public postalCode?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public locality?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public country?: string
}

@InputType()
export class EditAddressInputType {
    @Field(() => String, { nullable: true })
    @IsOptional()
    public name?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public street?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public houseNumber?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public houseNumberSuffix?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public postalCode?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public locality?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public country?: string
}
