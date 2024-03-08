import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { dateMiddleware } from 'src/utils/graphql/DateMiddleware'
import { Employee } from '../employee/employee.entity'
import { EmployeeType } from '../employee/employee.type'
import { Student } from '../student/student.entity'
import { StudentType } from '../student/student.type'
import { IsNotBlankString } from 'src/utils/graphql/IsNotBlankString'
import paginationType from '../utils/pagination.type'
import { StudentContactMomentContactType } from './studentContactMoment.entity'
import { SortInput } from 'src/utils/graphql/SortingInputField'

@ArgsType()
export class GetStudentContactMomentArgs {
    @Field()
    @IsUUID()
    public studentContactMomentId: string
}

@ArgsType()
export class GetStudentContactMomentsArgs {
    @Field()
    @IsUUID()
    public studentId: string
}

@ObjectType()
export class StudentContactMomentType extends BaseEntityObjectType {
    @Field(() => String, { middleware: [dateMiddleware] })
    public date: Date

    @Field(() => EmployeeType, { nullable: true })
    public createdByEmployee?: Employee | null

    @Field(() => String)
    public explanation: string

    @Field(() => StudentType)
    public student: Student

    @Field(() => StudentContactMomentContactType, { nullable: false })
    public type: StudentContactMomentContactType

    @Field({ description: 'Can the current user edit this student contact moment?' })
    public canEdit: boolean
}

@ObjectType()
export class PaginatedStudentContactMomentResponse extends paginationType(StudentContactMomentType) {}

@InputType()
export class StudentContactMomentInputType {
    @Field({ nullable: false })
    public date: Date

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotBlankString()
    public explanation: string

    @Field(() => StudentContactMomentContactType, { nullable: false })
    public type: StudentContactMomentContactType
}

@InputType()
export class CreateStudentContactMomentInputType extends StudentContactMomentInputType {
    @Field(() => ID)
    @IsUUID()
    public student: string
}

@InputType()
export class EditStudentContactMomentInputType extends StudentContactMomentInputType {
    @Field()
    @IsUUID()
    public id: string
}

@InputType()
export class DeleteStudentContactMomentInputType {
    @Field()
    @IsUUID()
    public id: string
}

@InputType()
export class StudentContactMomentsSortInputType {
    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public date?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public type?: SortInput
}
