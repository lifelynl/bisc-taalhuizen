import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { User } from './user.entity'

export class UserRepository extends CustomBaseRepository<User> {
    protected readonly entityName = 'User'

    public async findOneByUsername(username: string) {
        return await this.qb().where('LOWER(username) = LOWER(?)', [username]).getSingleResult()
    }

    public async findOneByUsernameAndOrganizationSlug(username: string, organizationSlug: string) {
        return await this.qb()
            .where('LOWER(username) = LOWER(?)', [username])
            .andWhere(
                `
				"person" IN (
					SELECT "person" FROM "Employee" WHERE "organization" IN (
						SELECT id FROM "Organization" WHERE LOWER(slug) = LOWER(?)
					)
				)
				`,
                [organizationSlug]
            )
            .getSingleResult()
    }

    public async findOneByUsernameAndSlugWithPersonEmployeeOrganization(username: string, slug: string) {
        return await this.qb()
            .leftJoinAndSelect('person', 'person')
            .leftJoinAndSelect('person.employees', 'employee')
            .leftJoinAndSelect('employee.organization', 'organization')
            .where('LOWER(username) = LOWER(?)', [username])
            .andWhere('organization.slug = ?', [slug])
            .getSingleResult()
    }

    public async findOneByUsernameWithPerson(username: string) {
        return await this.qb()
            .leftJoinAndSelect('person', 'person')
            .where('LOWER(username) = LOWER(?)', [username])
            .getSingleResult()
    }

    public getForDocument(documentId: string) {
        return this.qb()
            .select('*')
            .where('id IN (SELECT "createdByUser" FROM "UploadedDocument" WHERE id = ?)', [documentId])
            .getSingleResult()
    }

    public async doesUsernameExist(email: string) {
        return !!(await this.qb().where('LOWER(username) = LOWER(?)', [email]).getCount())
    }
}
