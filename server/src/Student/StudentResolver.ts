import { UnauthorizedException } from '@nestjs/common'
import { Args, ArgsType, Field, Mutation, Query, registerEnumType, Resolver } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantStatusEnum'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { ContextUser, UserEntity } from 'src/User/entities/UserEntity'
import { PublicGuard } from 'src/User/guards/PublicGuardDecorator'
import { CreateStudentService } from './services/CreateStudentService'
import { RegisterStudentService } from './services/RegisterStudentService'
import { RegistrationService } from './services/RegistrationService'
import { StudentPolicyService } from './services/StudentPolicyService'
import { StudentService } from './services/StudentService'
import { CreateStudentInputType } from './types/CreateStudentInputType'
import { RegisterStudentInputType } from './types/RegisterStudentInputType'
import { StudentType } from './types/StudentType'
import { UpdateStudentInputType } from './types/UpdateStudentInputType'

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

@Resolver(() => StudentType)
export class StudentResolver {
    public constructor(
        private registerStudentService: RegisterStudentService,
        private studentService: StudentService,
        private registrationService: RegistrationService,
        private createStudentService: CreateStudentService,
        private studentPolicyService: StudentPolicyService
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

        return this.studentService.findByTaalhuisId(args.taalhuisId, ParticipantStatusEnum.pending)
    }

    @Query(() => StudentType)
    public async registration(
        @CurrentUser() user: UserEntity,
        @Args() args: FindAcceptAndDeleteRegistrationArgs
    ): Promise<StudentType> {
        // TODO: Authorization checks (user type, user role, can user see given Taalhuis and Students?)

        return this.studentService.findByStudentId(args.studentId)
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

        return this.studentService.findByStudentId(args.studentId)
    }

    @Mutation(() => StudentType)
    public async createStudent(
        @CurrentUser() contextUser: ContextUser,
        @Args('input') input: CreateStudentInputType
    ): Promise<StudentType> {
        const isAuthorized = this.studentPolicyService.canCreateForTaalhuis(contextUser, input.taalhuisId)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.createStudentService.createStudent(input)
    }

    @Mutation(() => StudentType)
    public async updateStudent(
        @CurrentUser() contextUser: ContextUser,
        @Args('input') input: UpdateStudentInputType
    ): Promise<StudentType> {
        const student = await this.studentService.findByStudentId(input.studentId)

        // TODO: canUpdate policy
        const isAuthorized = this.studentPolicyService.canCreateForTaalhuis(contextUser, student.taalhuis.id)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        // TODO: Add updateStudent implementation
        return student
    }

    @Query(() => [StudentType])
    public async students(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: RegistrationsArgs
    ): Promise<StudentType[]> {
        const isAuthorized = this.studentPolicyService.canListForTaalhuis(contextUser, args.taalhuisId)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.studentService.findByTaalhuisId(args.taalhuisId, ParticipantStatusEnum.accepted)
    }

    @Query(() => StudentType)
    public async student(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: FindAcceptAndDeleteRegistrationArgs
    ): Promise<StudentType> {
        const student = await this.studentService.findByStudentId(args.studentId)

        const isAuthorized = this.studentPolicyService.canView(contextUser, student)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return student
    }
}
