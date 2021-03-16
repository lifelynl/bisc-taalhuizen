import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsUrl, ValidateNested } from 'class-validator'
import { RegisterStudentInput } from '../services/RegisterStudentService'

@InputType()
class RegisterStudentAddresInputType {
    @Field({ nullable: true })
    public street?: string

    @Field({ nullable: true })
    public postalCode?: string

    @Field({ nullable: true })
    public locality?: string

    @Field({ nullable: true })
    public houseNumber?: string

    @Field({ nullable: true })
    public houseNumberSuffix?: string
}

@InputType()
class RegisterStudentStudentInputType {
    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    public email!: string

    @Field()
    public telephone!: string

    @Field({ nullable: true })
    @Type(() => RegisterStudentAddresInputType)
    @ValidateNested()
    public address?: RegisterStudentAddresInputType
}

// TODO: Add captcha security
@InputType()
export class RegisterStudentInputType implements RegisterStudentInput {
    @Field()
    @IsUrl()
    public taalhuisId!: string

    @Field()
    @Type(() => RegisterStudentStudentInputType)
    @ValidateNested()
    public student!: RegisterStudentStudentInputType
}
