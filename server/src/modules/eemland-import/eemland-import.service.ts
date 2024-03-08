import { EEMLAND_STUDENTS } from './eemland-data'

import { Injectable } from '@nestjs/common'
import { StudentRepository } from '../student/student.repository'
import { PersonRepository } from '../person/person.repository'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class EemlandImportService {
    public constructor(
        private readonly personRepository: PersonRepository,
        private readonly studentRepository: StudentRepository
    ) {}

    public async run() {
        for (const _STUDENT of EEMLAND_STUDENTS.results) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const STUDENT = _STUDENT as any
            try {
                const student = await this.studentRepository
                    .qb()
                    .leftJoinAndSelect('person', 'person')
                    .where({ id: STUDENT.studentId })
                    .getSingleResult()

                if (!student) {
                    throw new DomainError(`student ${STUDENT.studentId} not found`)
                }

                student.createdAt = STUDENT.newCreatedAt
                const person = await this.personRepository.findOneOrFail({ student: student.id })
                person.createdAt = STUDENT.newCreatedAt
                student.person = person

                await this.studentRepository.persistAndFlush(student)
            } catch (err) {
                console.log('Could not update student', STUDENT)
                console.log(err)
            }
        }
    }
}
