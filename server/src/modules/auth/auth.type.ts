import { InputType, Field, ObjectType, ArgsType } from '@nestjs/graphql'
import { MinLength, MaxLength, IsEmail, IsString } from 'class-validator'
import { EmployeeType } from '../employee/employee.type'
import { PersonType } from '../person/person.type'
import { Employee } from '../employee/employee.entity'
import { Person } from '../person/person.entity'

@InputType()
export class LoginInput {
    @Field(() => String)
    public username: string

    @Field(() => String)
    @IsString()
    public password: string
}

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    public id: string

    @Field(() => String)
    public username: string

    @Field(() => String)
    public locale: string

    @Field(() => String)
    public accessToken: string

    @Field(() => String)
    public refreshToken: string

    @Field(() => [EmployeeType])
    public employees: EmployeeType[] | Employee[]

    @Field(() => PersonType, { nullable: true })
    public person?: PersonType | Person | null
}

@ObjectType()
export class RefreshTokenResponse {
    @Field(() => String)
    public accessToken: string

    @Field(() => String)
    public refreshToken: string
}

@InputType()
export class HashInput {
    @Field(() => String)
    @IsString()
    public hash: string
}
@ObjectType()
export class HashResponse {
    @Field(() => String)
    public hash: string
}
@InputType()
export class ResetPasswordInput {
    @Field(() => String)
    public token: string

    @Field(() => String)
    @MinLength(8)
    @MaxLength(24)
    public password: string

    @Field(() => String)
    public username: string
}
@ObjectType()
export class ResetPasswordResponse {
    @Field(() => String)
    public username: string
}

@ArgsType()
export class ForgotPasswordArgs {
    @Field(() => String, { nullable: false })
    @IsEmail()
    public email: string
}
@ArgsType()
export class ChangePasswordArgs {
    @Field(() => String, { nullable: false })
    @IsString()
    public oldPassword: string

    @Field(() => String, { nullable: false })
    @IsString()
    @MinLength(8)
    @MaxLength(24)
    public newPassword: string
}

@ArgsType()
export class RefreshTokenArgs {
    @Field(() => String, { nullable: false })
    @IsString()
    public refreshToken: string
}
