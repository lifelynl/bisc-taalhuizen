import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../auth/auth.decorator'
import { PersonRepository } from '../person/person.repository'
import { UserType } from './user.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { UserRepository } from './user.repository'
import { isEmail } from 'class-validator'
import { Throttle } from '@nestjs/throttler'

@Resolver(UserType)
export class UserResolver {
    public constructor(
        private readonly personRepository: PersonRepository,
        private readonly userRepository: UserRepository
    ) {}

    @Query(() => UserType, { nullable: true })
    public async currentUser(@CurrentUser() user: UserWithCurrentEmployee) {
        return user
    }

    @Throttle(10, 60)
    @Query(() => Boolean)
    public doesEmailExist(@Args('email') email: string) {
        const trimmed = email.trim()
        if (!trimmed || !isEmail(trimmed)) {
            return false
        }

        return this.userRepository.doesUsernameExist(trimmed)
    }

    @ResolveField()
    public async person(@Parent() user: UserType) {
        return this.personRepository.getForUser(user.id)
    }

    @ResolveField()
    public async currentEmployee(@CurrentUser() user: UserWithCurrentEmployee) {
        return user.currentEmployee
    }
}
