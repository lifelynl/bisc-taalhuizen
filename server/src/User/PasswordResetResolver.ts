import { Args, ArgsType, Field, Mutation, Resolver } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength, MinLength, Validate } from 'class-validator'
import { PublicGuard } from './guards/PublicGuardDecorator'
import { PasswordResetService } from './services/PasswordResetService'
import { IsPasswordStrengthSufficientConstraint } from './types/PasswordStrengthConstraint'

@ArgsType()
class RequestPasswordResetArgs {
    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    @IsEmail()
    public email!: string
}

@ArgsType()
class ResetPasswordArgs {
    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    @IsEmail()
    public email!: string

    @Field()
    @IsNotEmpty()
    @MinLength(8)
    public token!: string

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    @Validate(IsPasswordStrengthSufficientConstraint)
    public password!: string
}

@Resolver()
export class PasswordResetResolver {
    public constructor(private passwordResetService: PasswordResetService) {}

    @Mutation(() => Boolean)
    @PublicGuard()
    public async requestPasswordReset(@Args() args: RequestPasswordResetArgs): Promise<boolean> {
        await this.passwordResetService.requestPasswordReset(args.email)
        // We should always return true here to avoid leaking info about emails.
        return true
    }

    @Mutation(() => Boolean)
    @PublicGuard()
    public async resetPassword(@Args() args: ResetPasswordArgs): Promise<boolean> {
        return this.passwordResetService.resetPasswordByToken(args.email, args.token, args.password)
    }
}
