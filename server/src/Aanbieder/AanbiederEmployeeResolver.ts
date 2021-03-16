import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { AanbiederEmployeeService } from './AanbiederEmployeeService'
import { AanbiederEmployeeType } from './types/AanbiederEmployeeType'

@ArgsType()
class AanbiederEmployeesArgs {
    @Field()
    public aanbiederId!: string
}

@Resolver(() => AanbiederEmployeeType)
export class AanbiederEmployeeResolver {
    public constructor(private aanbiederEmployeeService: AanbiederEmployeeService) {}

    @Query(() => [AanbiederEmployeeType])
    public async aanbiederEmployees(
        @CurrentUser() user: UserEntity,
        @Args() args: AanbiederEmployeesArgs
    ): Promise<AanbiederEmployeeType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.aanbiederEmployeeService.findByAanbiederId(args.aanbiederId)
    }
}
