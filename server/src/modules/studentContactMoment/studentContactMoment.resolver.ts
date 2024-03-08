import { Args, Resolver, Query, Mutation, Parent, ResolveField } from '@nestjs/graphql'
import { CurrentUser } from '../auth/auth.decorator'
import {
    CreateStudentContactMomentInputType,
    DeleteStudentContactMomentInputType,
    EditStudentContactMomentInputType,
    GetStudentContactMomentArgs,
    GetStudentContactMomentsArgs,
    PaginatedStudentContactMomentResponse,
    StudentContactMomentsSortInputType,
    StudentContactMomentType,
} from './studentContactMoment.type'
import { StudentRepository } from '../student/student.repository'
import { EmployeeRepository } from '../employee/employee.repository'
import { PaginatedInputType } from '../utils/pagination.type'
import { StudentContactMomentPolicy } from '../utils/policy/studentContactMoment.policy'
import { PolicyAction } from '../utils/policy/policy'
import { StudentContactMomentRepository } from './studentContactMoment.repository'
import { StudentContactMomentService } from './studentContactMoment.service'
import { StudentContactMoment } from './studentContactMoment.entity'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

@Resolver(StudentContactMomentType)
export class StudentContactMomentResolver {
    public constructor(
        private studentContactMomentPolicy: StudentContactMomentPolicy,
        private studentRepository: StudentRepository,
        private employeeRepository: EmployeeRepository,
        private studentContactMomentRepository: StudentContactMomentRepository,
        private studentContactMomentService: StudentContactMomentService
    ) {}

    @Query(() => StudentContactMomentType)
    public async studentContactMoment(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args() args: GetStudentContactMomentArgs
    ) {
        await this.studentContactMomentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            studentContactMomentId: args.studentContactMomentId,
        })

        return this.studentContactMomentRepository.findOneOrFail(args.studentContactMomentId)
    }

    @Query(() => PaginatedStudentContactMomentResponse)
    public async studentContactMoments(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') paginationArgs: PaginatedInputType,
        @Args() args: GetStudentContactMomentsArgs,
        @Args('sort', { nullable: true }) sort?: StudentContactMomentsSortInputType
    ) {
        return this.studentContactMomentService.getStudentContactMoments(user, paginationArgs, args, sort)
    }

    @Mutation(() => StudentContactMomentType)
    public async createStudentContactMoment(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') args: CreateStudentContactMomentInputType
    ) {
        await this.studentContactMomentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, {
            studentId: args.student,
        })

        return this.studentContactMomentService.createStudentContactMoment(user, args)
    }

    @Mutation(() => StudentContactMomentType)
    public async editStudentContactMoment(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') args: EditStudentContactMomentInputType
    ) {
        await this.studentContactMomentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, {
            studentContactMomentId: args.id,
        })

        return this.studentContactMomentService.editStudentContactMoment(args)
    }

    @Mutation(() => Boolean)
    public async deleteStudentContactMoment(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') args: DeleteStudentContactMomentInputType
    ) {
        await this.studentContactMomentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, {
            studentContactMomentId: args.id,
        })

        return this.studentContactMomentService.deleteStudentContactMoment(args.id)
    }

    @ResolveField()
    public async student(@Parent() studentContactMoment: StudentContactMoment) {
        return this.studentRepository.findOneOrFail(studentContactMoment.student)
    }

    @ResolveField()
    public async createdByEmployee(@Parent() studentContactMoment: StudentContactMoment) {
        if (!studentContactMoment.createdByEmployee) {
            return null
        }

        return this.employeeRepository.findOneOrFail(studentContactMoment.createdByEmployee)
    }

    @ResolveField()
    public async canEdit(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Parent() studentContactMoment: StudentContactMoment
    ) {
        try {
            await this.studentContactMomentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, {
                studentContactMomentId: studentContactMoment.id,
            })
            return true
        } catch {
            return false
        }
    }
}
