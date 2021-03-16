import { UseGuards } from '@nestjs/common'
import { Args, ArgsType, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql'
import { AuthService } from './AuthService'
import { PublicGuard } from './guards/PublicGuardDecorator'

@ObjectType()
export class UserType {
    @Field()
    public id!: string

    @Field()
    public username!: string
}

@ObjectType()
export class UserEdgeType {
    @Field()
    public node!: UserType
}

@ObjectType()
export class RawReturnType {
    @Field()
    public accessToken!: string
}

@ArgsType()
class LoginArgs {
    @Field()
    public username!: string

    @Field()
    public password!: string
}

@Resolver()
export class AuthResolver {
    public constructor(private authService: AuthService) {}

    // TODO: Maybe move auth logic to LocalAuthGuard? Unguarded login mutation looks like an easier solution though,
    // see docs https://docs.nestjs.com/security/authentication#implementing-passport-local
    @Mutation(() => RawReturnType)
    @PublicGuard()
    public async login(@Args() args: LoginArgs): Promise<RawReturnType> {
        return this.authService.login(args.username, args.password)
    }
}
