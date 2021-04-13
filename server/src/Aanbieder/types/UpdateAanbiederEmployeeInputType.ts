import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsUrl, MinLength } from 'class-validator'
import { UpdateAanbiederEmployeeInput } from '../UpdateAanbiederEmployeeService'

// @InputType()
// export class UpdateAanbiederEmployeeInputType implements UpdateAanbiederEmployeeInput {
//     @Field()
//     @IsUrl() // TODO make custom ID validator
//     public userId!: string

//     @Field()
//     public givenName!: string

//     @Field({ nullable: true })
//     public additionalName?: string

//     @Field()
//     public familyName!: string

//     @Field(() => String, { nullable: true })
//     @MinLength(1)
//     @IsOptional()
//     public telephone?: string | null

//     @Field()
//     @IsEmail()
//     public email!: string

//     @Field(() => [String])
//     public userGroupIds!: string[]
// }
