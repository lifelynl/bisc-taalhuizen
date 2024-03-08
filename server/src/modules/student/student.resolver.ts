import { LearningNeedRepository } from '../learningneed/learningneed.repository'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CurrentUser, DisableDefaultGuard } from '../auth/auth.decorator'
import { RegistrationRepository } from '../registration/registration.repository'
import { OrganizationRepository } from '../organization/organization.repository'
import { PersonRepository } from '../person/person.repository'
import { StudentService } from './student.service'
import {
    CreateStudentInput,
    DeleteStudentInputType,
    EditStudentInput,
    GetProviderStudentsArgs,
    GetStudentArgs,
    GetStudentsArgs,
    PaginatedStudentResponse,
    RegisterStudentInput,
    StudentsSortInputType,
    StudentType,
} from './student.type'
import { StudentPolicy } from '../utils/policy/student.policy'
import { PolicyAction } from '../utils/policy/policy'
import { StudentRepository } from './student.repository'
import { CivicIntegrationRepository } from '../civicIntegration/civicIntegration.repository'
import { PaginatedInputType } from '../utils/pagination.type'
import { EmployeeRepository } from '../employee/employee.repository'
import { TeamRepository } from '../team/team.repository'
import { OrganizationTypeEnum } from '../organization/organization.entity'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { StudentContactMomentPolicy } from '../utils/policy/studentContactMoment.policy'
import { DomainError } from '../../errors/DomainError'

@Resolver(StudentType)
export class StudentResolver {
    public constructor(
        private readonly personRepository: PersonRepository,
        private readonly organizationRepository: OrganizationRepository,
        private readonly learningNeedRepository: LearningNeedRepository,
        private readonly registrationRepository: RegistrationRepository,
        private readonly studentService: StudentService,
        private readonly studentRepository: StudentRepository,
        private readonly studentPolicy: StudentPolicy,
        private readonly civicIntegrationRepository: CivicIntegrationRepository,
        private readonly employeeRepository: EmployeeRepository,
        private readonly teamRepository: TeamRepository,
        private readonly studentContactMomentPolicy: StudentContactMomentPolicy
    ) {}

    @Query(() => PaginatedStudentResponse)
    public async students(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') paginationArgs: PaginatedInputType,
        @Args() args: GetStudentsArgs,
        @Args('sort', { nullable: true }) sort?: StudentsSortInputType
    ) {
        return this.studentService.getStudents(user, paginationArgs, args, sort)
    }

    @Query(() => PaginatedStudentResponse)
    public async providerStudents(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args() args: GetProviderStudentsArgs,
        @Args('paginationArgs') paginationArgs: PaginatedInputType,
        @Args('sort', { nullable: true }) sort?: StudentsSortInputType
    ) {
        return this.studentService.getProviderStudents(user, paginationArgs, args, sort)
    }

    @Query(() => StudentType)
    public async student(@CurrentUser() user: UserWithCurrentEmployee, @Args() args: GetStudentArgs) {
        await this.studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { studentId: args.studentId })

        return this.studentRepository.findOneOrFail(args.studentId)
    }

    @Mutation(() => StudentType)
    public async acceptRegistration(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('studentId') studentId: string
    ) {
        await this.studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, { studentId })

        return this.studentService.acceptStudent(studentId)
    }

    @Mutation(() => Boolean)
    public async rejectRegistration(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('studentId') studentId: string
    ) {
        await this.studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, { studentId })

        return this.studentService.rejectStudent(studentId)
    }

    @Mutation(() => Boolean)
    @DisableDefaultGuard()
    public async registerStudent(@Args('registerStudentInput') input: RegisterStudentInput) {
        return this.studentService.registerStudent(input)
    }

    @Mutation(() => StudentType)
    public async createStudent(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('createStudentInput') input: CreateStudentInput
    ) {
        await this.studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, {
            organizationId: input.organization,
        })

        return this.studentService.createStudent(user, input)
    }

    @Mutation(() => StudentType)
    public async editStudent(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('editStudentInput') input: EditStudentInput
    ) {
        await this.studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, { studentId: input.id })

        if (input.intakeDate && user.accessGroup !== OrganizationTypeEnum.languageHouse) {
            throw new DomainError('Only language house employees are allowed to change student intake date')
        }

        return this.studentService.editStudent(input)
    }

    @Mutation(() => Boolean)
    public async deleteStudent(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') input: DeleteStudentInputType
    ) {
        await this.studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, { studentId: input.id })

        return this.studentService.deleteStudent(input.id)
    }

    @ResolveField()
    public async person(@Parent() student: StudentType) {
        return this.personRepository.findOne({ student: student.id })
    }

    @ResolveField()
    public async mentor(@Parent() student: StudentType) {
        return this.employeeRepository.getMentorForStudent(student.id)
    }

    @ResolveField()
    public async organization(@Parent() student: StudentType) {
        return this.organizationRepository.getForStudent(student.id)
    }

    @ResolveField()
    public async registration(@Parent() student: StudentType) {
        return this.registrationRepository.getForStudent(student.id)
    }

    @ResolveField()
    public async learningNeeds(@Parent() student: StudentType) {
        return this.learningNeedRepository.find({ student: student.id })
    }

    @ResolveField()
    public async civicIntegration(@Parent() student: StudentType) {
        return this.civicIntegrationRepository.findOne({ student: student.id })
    }

    @ResolveField()
    public async team(@Parent() student: StudentType) {
        return this.teamRepository.findOne({ students: student.id })
    }

    @ResolveField()
    public async canCreateContactMoment(@CurrentUser() user: UserWithCurrentEmployee, @Parent() student: StudentType) {
        try {
            await this.studentContactMomentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, {
                studentId: student.id,
            })
            return true
        } catch {
            return false
        }
    }
}
