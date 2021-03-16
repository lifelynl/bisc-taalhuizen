import { Args, ArgsType, Field, Mutation, ObjectType, Query, registerEnumType, Resolver } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { PublicGuard } from 'src/User/guards/PublicGuardDecorator'
import { RegisterStudentService } from './services/RegisterStudentService'
import { RegistrationService } from './services/RegistrationService'
import { RegisterStudentInputType } from './types/RegisterStudentInputType'

registerEnumType(ParticipantStatusEnum, { name: 'ParticipantStatusEnum' })

@ArgsType()
class RegistrationsArgs {
    @Field()
    @IsUrl()
    public taalhuisId!: string
}

@ArgsType()
class FindAcceptAndDeleteRegistrationArgs {
    @Field()
    @IsUrl()
    public studentId!: string
}

@ObjectType()
class StudentType {
    @Field()
    public id!: string

    @Field()
    public dateCreated!: string

    @Field(() => ParticipantStatusEnum)
    public status!: ParticipantStatusEnum

    @Field()
    public givenName!: string

    @Field()
    public additionalName?: string

    @Field()
    public familyName!: string
}

@Resolver(() => StudentType)
export class StudentResolver {
    public constructor(
        private registerStudentService: RegisterStudentService,
        private registrationService: RegistrationService
    ) {}

    @PublicGuard()
    @Mutation(() => Boolean)
    public async registerStudent(@Args('input') args: RegisterStudentInputType): Promise<boolean> {
        return this.registerStudentService.registerStudent(args)
    }

    @Query(() => [StudentType])
    public async registrations(
        @CurrentUser() user: UserEntity,
        @Args() args: RegistrationsArgs
    ): Promise<StudentType[]> {
        // TODO: Authorization checks (user type, user role, can user see given Taalhuis and Students?)

        return this.registrationService.findByTaalhuisId(args.taalhuisId)
    }

    @Mutation(() => Boolean)
    public async deleteRegistration(@Args() args: FindAcceptAndDeleteRegistrationArgs): Promise<boolean> {
        // TODO: Authorization checks

        return this.registrationService.deleteRegistration(args.studentId)
    }

    @Mutation(() => StudentType)
    public async acceptRegistration(@Args() args: FindAcceptAndDeleteRegistrationArgs): Promise<StudentType> {
        // TODO: Authorization checks

        await this.registrationService.acceptRegistration(args.studentId)

        return this.registrationService.findByStudentId(args.studentId)
    }
}
