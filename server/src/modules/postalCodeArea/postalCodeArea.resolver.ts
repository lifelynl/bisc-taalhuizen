import { Args, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../auth/auth.decorator'
import { PaginatedInputType } from '../utils/pagination.type'
import { PolicyAction } from '../utils/policy/policy'
import { PostalCodeAreaPolicy } from '../utils/policy/postalCodeArea.policy'
import { PostalCodeAreaRepository } from './postalCodeArea.repository'
import { PostalCodeAreaService } from './postalCodeArea.service'
import {
    GetAvailablePostCodeAreaArgs,
    GetPostalCodeAreasForOrganizationArgs,
    PaginatedPostalCodeAreaResponse,
    PostalCodeAreaType,
} from './postalCodeArea.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { QueryOrder } from '@mikro-orm/core'

interface WhereParams {
    organization: string
    team?: null
}
@Resolver(PostalCodeAreaType)
export class PostalCodeAreaResolver {
    public constructor(
        private readonly postalCodeAreaService: PostalCodeAreaService,
        private readonly postalCodeAreaPolicy: PostalCodeAreaPolicy,
        private readonly postalCodeAreaRepository: PostalCodeAreaRepository
    ) {}

    @Query(() => PaginatedPostalCodeAreaResponse)
    public async availablePostalCodes(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') paginationArgs: PaginatedInputType,
        @Args() { search }: GetAvailablePostCodeAreaArgs
    ) {
        await this.postalCodeAreaPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {})

        return this.postalCodeAreaService.getAvailablePostalCodeAreas(paginationArgs, search)
    }

    @Query(() => PaginatedPostalCodeAreaResponse)
    public async postalCodeAreasForOrganization(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') { skip, take }: PaginatedInputType,
        @Args() { organizationId, hasNoTeam }: GetPostalCodeAreasForOrganizationArgs
    ) {
        await this.postalCodeAreaPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { organizationId })
        const whereParams: WhereParams = { organization: organizationId }
        if (hasNoTeam) {
            whereParams.team = null
        }
        const qb = this.postalCodeAreaRepository.qb().where(whereParams).orderBy({ code: QueryOrder.ASC })
        return this.postalCodeAreaRepository.queryPaginated(qb, take, skip)
    }
}
