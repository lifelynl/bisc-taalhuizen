import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { StudentContactMoment } from './studentContactMoment.entity'
import { DomainError } from '../../errors/DomainError'

export class StudentContactMomentRepository extends CustomBaseRepository<StudentContactMoment> {
    protected readonly entityName = 'StudentContactMoment'

    public async getWithStudentOrFail(studentContactMomentId: string) {
        const studentContactMoment = await this.qb()
            .leftJoinAndSelect('student', 'student')
            .where({ id: studentContactMomentId })
            .getSingleResult()

        if (!studentContactMoment) {
            throw new DomainError(`studentContactMoment ${studentContactMomentId} not found`)
        }

        return studentContactMoment
    }
}
