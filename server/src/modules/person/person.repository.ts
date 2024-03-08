import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { Person } from './person.entity'
import { DomainError } from '../../errors/DomainError'

export class PersonRepository extends CustomBaseRepository<Person> {
    protected readonly entityName = 'Person'

    public getForUser(userId: string) {
        return this.qb().select('*').where('id IN (SELECT person FROM "User" WHERE id = ?)', [userId]).getSingleResult()
    }

    public getForRegistrationReferrer(registrationId: string) {
        return this.qb()
            .select('*')
            .where('id IN (SELECT "referringPerson" FROM "Registration" WHERE id = ?)', [registrationId])
            .getSingleResult()
    }

    public getForDocument(documentId: string) {
        return this.qb()
            .select('*')
            .where('id IN (SELECT "person" FROM "UploadedDocument" WHERE id = ?)', [documentId])
            .getSingleResult()
    }

    public async getWithUserAndEmployeeAndMenteesOrFail(employeeId: string) {
        const person = await this.qb()
            .leftJoinAndSelect('user', 'user')
            .leftJoinAndSelect('employees', 'employee')
            .leftJoinAndSelect('employee.mentees', 'mentee')
            .where('employee.id = ?', [employeeId])
            .getSingleResult()

        if (!person) {
            throw new DomainError(`person for employee ${employeeId} not found`)
        }

        return person
    }

    public async checkIfEmailExists(email: string) {
        const res = await this.qb().where('LOWER(email) = LOWER(?)', [email]).getSingleResult()

        return !!res
    }

    public async findForUsername(username: string) {
        return this.qb()
            .where('id IN (SELECT person FROM "User" WHERE LOWER(username) = LOWER(?))', [username])
            .getSingleResult()
    }

    public async findForEmail(email: string) {
        return this.qb().where('LOWER(email) = LOWER(?)', [email]).getSingleResult()
    }

    public async findAnotherForEmail(email: string, personId: string) {
        return this.qb().where('LOWER(email) = LOWER(?)', [email]).andWhere('id != ?', [personId]).getSingleResult()
    }
}
