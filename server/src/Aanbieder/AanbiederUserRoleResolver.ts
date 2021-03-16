import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { AanbiederUserRoleType } from './types/AanbiederUserRoleType'

@ArgsType()
export class UserRolesByAanbiederIdArgs {
    @Field()
    public aanbiederId!: string
}

@Resolver(() => AanbiederUserRoleType)
export class AanbiederUserRoleResolver {
    public constructor(private groupRepository: GroupRepository) {}

    @Query(() => [AanbiederUserRoleType])
    public async userRolesByAanbiederId(
        @CurrentUser() user: UserEntity,
        @Args() args: UserRolesByAanbiederIdArgs
    ): Promise<AanbiederUserRoleType[]> {
        // TODO: Authorization checks (user type, user role, can user see given Aanbieder?)

        return this.groupRepository.findByOrganizationId(args.aanbiederId)
    }
}
