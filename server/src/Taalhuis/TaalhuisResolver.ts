import { Args, ArgsType, Field, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateTaalhuisInputType } from './types/CreateTaalhuisInputType'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { TaalhuisType } from './types/TaalhuisType'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { UpdateTaalhuisInputType } from './types/UpdateTaalhuisInputType'
import { UpdateTaalhuisService } from './UpdateTaalhuisService'
import { DeleteTaalhuisService } from './DeleteTaalhuisService'
import { DeleteTaalhuisInputType } from './types/DeleteTaalhuisInputType'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { IsUrl } from 'class-validator'
// import { GetDataloaders as Dataloaders } from 'src/GetDataloadersDecorator'
// import { GetDataLoaders } from 'src/DataloaderInterceptor'

@ArgsType()
class TaalhuisArgs {
    @Field()
    @IsUrl()
    public taalhuisId!: string
}

@Resolver(() => TaalhuisType)
export class TaalhuisResolver {
    public constructor(
        private createTaalhuisService: CreateTaalhuisService,
        private updateTaalhuisService: UpdateTaalhuisService,
        private deleteTaalhuisService: DeleteTaalhuisService,
        private organizationRepository: OrganizationRepository
    ) {}

    @Query(() => [TaalhuisType])
    public async taalhuizen(@CurrentUser() user: UserEntity): Promise<TaalhuisType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.organizationRepository.findAll(OrganizationTypesEnum.TAALHUIS)
    }

    @Query(() => TaalhuisType)
    public async taalhuis(@CurrentUser() user: UserEntity, @Args() args: TaalhuisArgs): Promise<TaalhuisType> {
        // TODO: Authorization checks (user type, user role)
        return this.organizationRepository.getOne(args.taalhuisId, OrganizationTypesEnum.TAALHUIS)
    }

    @Mutation(() => TaalhuisType)
    public async createTaalhuis(@Args() args: CreateTaalhuisInputType): Promise<TaalhuisType> {
        return this.createTaalhuisService.createTaalhuis(args)
    }

    @Mutation(() => TaalhuisType)
    public async updateTaalhuis(@Args() args: UpdateTaalhuisInputType): Promise<TaalhuisType> {
        return this.updateTaalhuisService.updateTaalhuis(args)
    }

    @Mutation(() => Boolean)
    public async deleteTaalhuis(@Args() args: DeleteTaalhuisInputType): Promise<boolean> {
        return !!(await this.deleteTaalhuisService.deleteTaalhuis(args.id))
    }

    // TODO: Taalhuis type (perhaps TaalhuisEntity?)
    // @ResolveField()
    // public async address(
    //     @Parent() taalhuis: { addresses: { id: string }[] },
    //     @Dataloaders() getDataloaders: GetDataLoaders
    // ) {
    //     return this.postsService.findAll({ authorId: id })
    // }
}
