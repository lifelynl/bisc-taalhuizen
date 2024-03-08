import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { Registration } from './registration.entity'

export class RegistrationRepository extends CustomBaseRepository<Registration> {
    protected readonly entityName = 'Registration'

    public async getForStudent(studentId: string) {
        return this.qb()
            .select('*')
            .where('id IN (SELECT registration FROM "Student" WHERE id = ?)', [studentId])
            .execute('get')
    }
}
