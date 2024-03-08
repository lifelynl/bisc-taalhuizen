import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { Employee } from './employee.entity'
import { isArray } from 'lodash'
import { DomainError } from '../../errors/DomainError'

export class EmployeeRepository extends CustomBaseRepository<Employee> {
    protected readonly entityName = 'Employee'

    public getAllForPerson(personId: string) {
        return this.qb().select('*').where('"person" = ?', [personId]).getResult()
    }

    public getForDocument(documentId: string) {
        return this.qb()
            .select('*')
            .where(
                'id IN (SELECT employee FROM "Person" WHERE id IN (SELECT person FROM "UploadedDocument" WHERE id = ?))',
                [documentId]
            )
            .getSingleResult()
    }

    public async existsForPersonAndOrganization(personId: string, organizationId: string) {
        return !!(await this.qb()
            .select('*')
            .where('"person" = ?', [personId])
            .andWhere('organization = ?', [organizationId])
            .getCount())
    }

    public getForUserAndOrganization(userId: string, organizationId: string) {
        return this.qb()
            .select('*')
            .where('"person" IN (SELECT "person" FROM "User" WHERE id = ?)', [userId])
            .andWhere('organization = ?', [organizationId])
            .getSingleResult()
    }

    public getAllForUser(userId: string) {
        return this.qb()
            .select('*')
            .where('"person" IN (SELECT "person" FROM "User" WHERE id = ?)', [userId])
            .getResult()
    }

    public async getAllForUserOrFail(userId: string) {
        const result = await this.getAllForUser(userId)
        if (!result || !result.length) {
            throw new DomainError('No employees found for user')
        }

        return result
    }

    public async getMentorForStudent(studentId: string) {
        return this.findOne({ mentees: studentId })
    }

    public async getMembersForTeam(teamId: string) {
        return this.find({ teams: teamId })
    }

    public async findWithPersonAndUserOrFail(id: string) {
        const res = await this.qb()
            .leftJoinAndSelect('"Employee".person', 'person')
            .leftJoinAndSelect('person.user', 'user')
            .where({ id })
            .getSingleResult()

        if (!res) {
            throw new DomainError(`employee ${id} not found`)
        }

        return res
    }

    public async belongsToSingleTeam(employeeIds: string[]) {
        const p = await this.qb().raw<unknown>(
            `
			SELECT EXISTS (
				SELECT e.id FROM "Employee" e
				INNER JOIN "Team_members" tm ON tm.employee = e.id
				WHERE e.id IN (${employeeIds.map(() => '?').join(',')})
				GROUP BY e.id
				HAVING COUNT(DISTINCT tm.team) = 1
			)
			`,
            employeeIds
        )

        // this (along with the "unknown" when calling "raw") is needed because "raw" return type
        // is not correctly defined in node_modules
        if (!p || typeof p !== 'object' || !('rows' in p) || !isArray(p.rows) || !p.rows.length) {
            return false
        }

        return !!p.rows[0].exists
    }
}
