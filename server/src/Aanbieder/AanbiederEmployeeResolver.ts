import { Args, ArgsType, Field, Mutation, Query, Resolver } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { ContextUser } from 'src/User/entities/UserEntity'
import { AanbiederEmployeeService } from './AanbiederEmployeeService'
import { CreateAanbiederEmployeeService } from './CreateAanbiederEmployeeService'
import {
    AanbiederEmployeeType,
    CreateAanbiederEmployeeInputType,
    UpdateAanbiederEmployeeInputType,
} from './types/CreateAanbiederEmployeeInputType'
import { DeleteAanbiederEmployeeService } from './DeleteAanbiederEmployeeService'
import { UpdateAanbiederEmployeeService } from './UpdateAanbiederEmployeeService'
import { AanbiederEmployeePolicyService } from './AanbiederEmployeePolicyService'
import { UnauthorizedException } from '@nestjs/common'

@ArgsType()
class AanbiederEmployeesArgs {
    @Field()
    @IsUrl()
    public aanbiederId!: string
}

@ArgsType()
class AanbiederEmployeeArgs {
    @Field()
    @IsUrl()
    public userId!: string
}

@Resolver(() => AanbiederEmployeeType)
export class AanbiederEmployeeResolver {
    public constructor(
        private aanbiederEmployeeService: AanbiederEmployeeService,
        private createAanbiederEmployeeService: CreateAanbiederEmployeeService,
        private updateAanbiederEmployeeService: UpdateAanbiederEmployeeService,
        private deleteAanbiederEmployeeService: DeleteAanbiederEmployeeService,
        private aanbiederEmployeePolicyService: AanbiederEmployeePolicyService
    ) {}

    @Query(() => [AanbiederEmployeeType])
    public async aanbiederEmployees(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: AanbiederEmployeesArgs
    ): Promise<AanbiederEmployeeType[]> {
        const isAuthorized = this.aanbiederEmployeePolicyService.canListForAanbieder(contextUser, args.aanbiederId)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.aanbiederEmployeeService.findByAanbiederId(args.aanbiederId) as any
    }

    @Query(() => AanbiederEmployeeType)
    public async aanbiederEmployee(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: AanbiederEmployeeArgs
    ): Promise<AanbiederEmployeeType> {
        const aanbiederEmployee = await this.aanbiederEmployeeService.findByUserId(args.userId)

        const isAuthorized = this.aanbiederEmployeePolicyService.canView(contextUser, aanbiederEmployee)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return aanbiederEmployee as any
    }

    @Mutation(() => AanbiederEmployeeType)
    public async createAanbiederEmployee(
        @CurrentUser() contextUser: ContextUser,
        @Args('input') input: CreateAanbiederEmployeeInputType
    ): Promise<AanbiederEmployeeType> {
        const isAuthorized = this.aanbiederEmployeePolicyService.canCreateForAanbieder(contextUser, input.aanbiederId)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.createAanbiederEmployeeService.createAanbiederEmployee(input) as any
    }

    @Mutation(() => AanbiederEmployeeType)
    public async updateAanbiederEmployee(
        @CurrentUser() contextUser: ContextUser,
        @Args('input') input: UpdateAanbiederEmployeeInputType
    ): Promise<AanbiederEmployeeType> {
        const aanbiederEmployee = await this.aanbiederEmployeeService.findByUserId(input.userId)

        const isAuthorized = this.aanbiederEmployeePolicyService.canUpdate(contextUser, aanbiederEmployee)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.updateAanbiederEmployeeService.updateAanbiederEmployee(input) as any
    }

    @Mutation(() => Boolean)
    public async deleteAanbiederEmployee(
        @CurrentUser() contextUser: ContextUser,
        @Args('userId') userId: string
    ): Promise<boolean> {
        const aanbiederEmployee = await this.aanbiederEmployeeService.findByUserId(userId)

        const isAuthorized = this.aanbiederEmployeePolicyService.canDelete(contextUser, aanbiederEmployee)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.deleteAanbiederEmployeeService.deleteAanbiederEmployee(userId)
    }
}
