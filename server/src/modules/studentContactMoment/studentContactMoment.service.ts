import { QBQueryOrderMap, QueryOrder } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { set } from 'lodash'
import { StudentRepository } from '../student/student.repository'
import { PaginatedInputType } from '../utils/pagination.type'
import { PolicyAction } from '../utils/policy/policy'
import { StudentContactMomentPolicy } from '../utils/policy/studentContactMoment.policy'
import { StudentContactMoment } from './studentContactMoment.entity'
import { StudentContactMomentRepository } from './studentContactMoment.repository'
import {
    CreateStudentContactMomentInputType,
    EditStudentContactMomentInputType,
    GetStudentContactMomentsArgs,
    StudentContactMomentsSortInputType,
} from './studentContactMoment.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

@Injectable()
export class StudentContactMomentService {
    public constructor(
        private studentContactMomentPolicy: StudentContactMomentPolicy,
        private studentRepository: StudentRepository,
        private studentContactMomentRepository: StudentContactMomentRepository
    ) {}

    public async getStudentContactMoments(
        user: UserWithCurrentEmployee,
        { take, skip }: PaginatedInputType,
        args: GetStudentContactMomentsArgs,
        sort?: StudentContactMomentsSortInputType
    ) {
        await this.studentContactMomentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            studentId: args.studentId,
        })

        const qb = this.studentContactMomentRepository.qb().where({ student: args.studentId })

        if (sort) {
            const { date, type } = sort
            const orderBy: QBQueryOrderMap<StudentContactMoment> = {}

            if (date) {
                set(orderBy, 'date', date)
            }

            if (type) {
                set(orderBy, 'type', type)
            }

            qb.orderBy(orderBy)
        } else {
            qb.orderBy({ date: QueryOrder.DESC })
        }

        return this.studentContactMomentRepository.queryPaginated(qb, take, skip)
    }

    public async createStudentContactMoment(
        contextUser: UserWithCurrentEmployee,
        input: CreateStudentContactMomentInputType
    ) {
        const employee = contextUser.currentEmployee
        const student = await this.studentRepository.findOneOrFail(input.student)

        const newStudentContactMoment = new StudentContactMoment()
        newStudentContactMoment.createdByEmployee = employee
        newStudentContactMoment.student = student
        newStudentContactMoment.date = input.date
        newStudentContactMoment.explanation = input.explanation
        newStudentContactMoment.type = input.type
        await this.studentContactMomentRepository.persistAndFlush(newStudentContactMoment)

        return newStudentContactMoment
    }

    public async editStudentContactMoment(input: EditStudentContactMomentInputType) {
        const studentContactMoment = await this.studentContactMomentRepository.findOneOrFail(input.id)

        if (input.date !== undefined) {
            studentContactMoment.date = input.date
        }
        if (input.type !== undefined) {
            studentContactMoment.type = input.type
        }
        if (input.explanation !== undefined) {
            studentContactMoment.explanation = input.explanation
        }

        await this.studentContactMomentRepository.persistAndFlush(studentContactMoment)
        return studentContactMoment
    }

    public async deleteStudentContactMoment(studentContactMomentId: string) {
        const studentContactMoment = await this.studentContactMomentRepository.findOneOrFail(studentContactMomentId)
        await this.studentContactMomentRepository.removeAndFlush(studentContactMoment)
        return true
    }
}
