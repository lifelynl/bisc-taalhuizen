import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { HashingService } from '../utils/hashing.service'
import { CurrentUser, DevOnlyGuard, DisableDefaultGuard } from './auth.decorator'
import { AuthService } from './auth.service'
import {
    LoginResponse,
    LoginInput,
    ResetPasswordResponse,
    ResetPasswordInput,
    HashResponse,
    ForgotPasswordArgs,
    ChangePasswordArgs,
    HashInput,
    RefreshTokenArgs,
    RefreshTokenResponse,
} from './auth.type'
import { UserWithCurrentEmployee } from './auth.interface'

@Resolver()
export class AuthResolver {
    public constructor(private authService: AuthService, private hashingService: HashingService) {}

    @Mutation(() => LoginResponse)
    @DisableDefaultGuard()
    public async login(@Args('credentials') args: LoginInput) {
        return this.authService.login(args)
    }

    @Mutation(() => RefreshTokenResponse)
    @DisableDefaultGuard()
    public async refreshToken(@Args() { refreshToken }: RefreshTokenArgs) {
        return this.authService.refreshAccessAndRefreshTokens(refreshToken)
    }

    @Mutation(() => ResetPasswordResponse)
    @DisableDefaultGuard()
    public async resetPassword(@Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput) {
        return this.authService.resetPassword(resetPasswordInput)
    }

    @Query(() => HashResponse)
    @DevOnlyGuard()
    public async hashSomething(@Args('input') { hash }: HashInput) {
        return { hash: await this.hashingService.hash(hash) }
    }

    @Mutation(() => Boolean)
    @DisableDefaultGuard()
    public async forgotPassword(@Args() { email }: ForgotPasswordArgs) {
        await this.authService.requestForgotPasswordMail(email)
        return true
    }

    @Mutation(() => Boolean)
    public changePassword(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args() { oldPassword, newPassword }: ChangePasswordArgs
    ) {
        return this.authService.changePassword(user, oldPassword, newPassword)
    }
}
