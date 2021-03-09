import { Args, ArgsType, Field, InputType, Mutation, Query, Resolver } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { CreateTaalhuisEmployeeInput, CreateTaalhuisEmployeeService } from './CreateTaalhuisEmployeeService'
import { TaalhuisEmployeeService } from './TaalhuisEmployeeService'
import { TaalhuisEmployeeType } from './types/TaalhuisEmployeeType'
import { UpdateTaalhuisEmployeeInput, UpdateTaalhuisEmployeeService } from './UpdateTaalhuisEmployeeService'

@InputType()
class CreateTaalhuisEmployeeInputType implements CreateTaalhuisEmployeeInput {
    @Field()
    public taalhuisId!: string

    @Field()
    public userGroupId!: string

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    @IsEmail()
    public email!: string

    @Field()
    public telephone!: string
}

@InputType()
class UpdateTaalhuisEmployeeInputType extends CreateTaalhuisEmployeeInputType implements UpdateTaalhuisEmployeeInput {
    @Field()
    public employeeId!: string
}

@ArgsType()
class TaalhuisEmployeesArgs {
    @Field()
    public taalhuisId!: string
}

@ArgsType()
class TaalhuisEmployeeArgs {
    @Field()
    public employeeId!: string
}

@Resolver(() => TaalhuisEmployeeType)
export class TaalhuisEmployeeResolver {
    public constructor(
        private createTaalhuisEmployeeService: CreateTaalhuisEmployeeService,
        private updateTaalhuisEmployeeService: UpdateTaalhuisEmployeeService,
        private taalhuisEmployeeService: TaalhuisEmployeeService
    ) {}

    @Query(() => [TaalhuisEmployeeType])
    public async taalhuisEmployees(
        @CurrentUser() user: UserEntity,
        @Args() args: TaalhuisEmployeesArgs
    ): Promise<TaalhuisEmployeeType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.taalhuisEmployeeService.findByTaalhuisId(args.taalhuisId)
    }

    @Mutation(() => TaalhuisEmployeeType)
    public async createTaalhuisEmployee(
        @Args('input') input: CreateTaalhuisEmployeeInputType
    ): Promise<TaalhuisEmployeeType> {
        return this.createTaalhuisEmployeeService.createTaalhuisEmployee(input)
    }

    @Query(() => TaalhuisEmployeeType)
    public async taalhuisEmployee(
        @CurrentUser() user: UserEntity,
        @Args() args: TaalhuisEmployeeArgs
    ): Promise<TaalhuisEmployeeType> {
        // TODO: Authorization checks (user type, user role)
        return this.taalhuisEmployeeService.findById(args.employeeId)
    }

    @Mutation(() => TaalhuisEmployeeType)
    public async updateTaalhuisEmployee(
        @Args('input') input: UpdateTaalhuisEmployeeInputType
    ): Promise<TaalhuisEmployeeType> {
        return this.updateTaalhuisEmployeeService.updateTaalhuisEmployee(input)
    }
}
