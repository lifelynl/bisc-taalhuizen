import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AddressRepository } from '../address/address.repository'
import { CurrentUser, DisableDefaultGuard } from '../auth/auth.decorator'
import { EmployeeRepository } from '../employee/employee.repository'
import { StudentRepository } from '../student/student.repository'
import { PostalCodeAreaRepository } from '../postalCodeArea/postalCodeArea.repository'
import { PaginatedInputType } from '../utils/pagination.type'
import { OrganizationTypeEnum } from './organization.entity'
import { OrganizationService } from './organization.service'
import {
    CreateOrganizationInputType,
    OrganizationType,
    PaginatedOrganisationResponse,
    EditOrganizationInputType,
    PublicOrganizationType,
    ParticipationProviderOrganizationType,
    OrganizationsSortInputType,
    OrganizationFiltersInputType,
} from './organization.type'
import { TeamService } from '../team/team.service'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { OrganizationRepository } from './organization.repository'
import { QueryOrder } from '@mikro-orm/core'

@Resolver(OrganizationType)
export class OrganizationResolver {
    public constructor(
        private readonly organizationService: OrganizationService,
        private readonly organizationRepository: OrganizationRepository,
        private readonly employeeRepository: EmployeeRepository,
        private readonly addressRepository: AddressRepository,
        private readonly studentRepository: StudentRepository,
        private readonly postalCodeAreaRepository: PostalCodeAreaRepository
    ) {}

    @Query(() => OrganizationType)
    public organization(@CurrentUser() user: UserWithCurrentEmployee, @Args('id') id: string) {
        return this.organizationService.getOrganization(user, id)
    }

    @Query(() => PaginatedOrganisationResponse)
    public organizations(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') paginationArgs: PaginatedInputType,
        @Args('type') type: OrganizationTypeEnum,
        @Args('filters', { nullable: true }) filters: OrganizationFiltersInputType,
        @Args('sort', { nullable: true }) sort?: OrganizationsSortInputType
    ) {
        return this.organizationService.getOrganizations(user, paginationArgs, type, sort, filters)
    }

    @Query(() => [PublicOrganizationType])
    @DisableDefaultGuard()
    public publicOrganizations() {
        return this.organizationService.getPublicOrganizations()
    }

    @Query(() => [ParticipationProviderOrganizationType])
    public participationProviderOrganizations(@CurrentUser() user: UserWithCurrentEmployee) {
        return this.organizationService.getParticipationProviderOrganizations(user)
    }

    @Mutation(() => OrganizationType)
    public async createOrganization(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: CreateOrganizationInputType
    ) {
        return this.organizationService.createOrganization(user, input)
    }

    @Mutation(() => OrganizationType)
    public async editOrganization(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: EditOrganizationInputType
    ) {
        return this.organizationService.editOrganization(user, input)
    }

    @Mutation(() => Boolean)
    public async deleteOrganization(@CurrentUser() user: UserWithCurrentEmployee, @Args('id') id: string) {
        return this.organizationService.deleteOrganization(user, id)
    }

    @ResolveField()
    public employees(@Parent() organization: OrganizationType) {
        return this.employeeRepository.find({ organization: organization.id })
    }

    @ResolveField()
    public address(@Parent() organization: OrganizationType) {
        return this.addressRepository.findOne({ organization: organization.id })
    }

    @ResolveField()
    public students(@Parent() organization: OrganizationType) {
        return this.studentRepository.find({ organization: organization.id })
    }

    @ResolveField()
    public postalCodes(@Parent() organization: OrganizationType) {
        return this.postalCodeAreaRepository.find(
            { organization: organization.id },
            { orderBy: { code: QueryOrder.ASC } }
        )
    }

    @ResolveField()
    public isLanguageHouseProvider(
        @Parent() organization: OrganizationType,
        @Args('languageHouseId') languageHouseId: string
    ) {
        return this.organizationRepository.isLanguageHouseProvider(languageHouseId, organization.id)
    }
}

@Resolver(PublicOrganizationType)
export class PublicOrganizationResolver {
    public constructor(private readonly teamService: TeamService) {}
    @ResolveField()
    public teams(@Parent() publicOrg: PublicOrganizationType) {
        return this.teamService.getPublicTeamsForPublicOrganizaiton(publicOrg.id)
    }
}
