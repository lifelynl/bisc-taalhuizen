import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { Organization, OrganizationTypeEnum } from './organization.entity'
import { DomainError } from '../../errors/DomainError'

export class OrganizationRepository extends CustomBaseRepository<Organization> {
    protected readonly entityName = 'Organization'

    public async getForStudent(studentId: string) {
        return this.qb()
            .select('*')
            .where('id IN (SELECT organization FROM "Student" WHERE id = ?)', [studentId])
            .execute('get')
    }

    public async getForStudentEmail(studentEmail: string) {
        return this.qb()
            .select('*')
            .where(
                `id IN (
					SELECT organization FROM "Student" WHERE id IN (
						SELECT student FROM "Person" WHERE LOWER(email) = LOWER(?)
					)
				)`,
                [studentEmail]
            )
            .execute('get')
    }

    public async getForEmployee(employeeId: string) {
        return this.qb()
            .select('*')
            .where('id IN (SELECT organization FROM "Employee" WHERE id = ?)', [employeeId])
            .execute('get')
    }

    public async getAllForUser(userId: string) {
        return this.qb()
            .leftJoin('employees', 'employee')
            .leftJoin('employee.person', 'person')
            .leftJoin('person.user', 'user')
            .where('"user"."id" = ?', [userId])
            .getResult()
    }

    public async getAllForUserOrFail(userId: string) {
        const organizations = await this.getAllForUser(userId)
        if (!organizations || !organizations.length) {
            throw new DomainError(`organizations for user ${userId} not found`)
        }

        return organizations
    }

    public async getWithPostalCodeAreasOrFail(organizationId: string) {
        const organization = await this.qb()
            .leftJoinAndSelect('postalCodes', 'postalCodeAreas')
            .where({ id: organizationId })
            .getSingleResult()

        if (!organization) {
            throw new DomainError(`organization ${organizationId} not found`)
        }

        return organization
    }

    public async getForEducationGroupOrFail(educationGroupId: string) {
        const res = await this.qb()
            .where('id IN (SELECT organization FROM "EducationGroup" WHERE id = ?)', [educationGroupId])
            .getSingleResult()

        if (!res) {
            throw new DomainError(`organization for education group ${educationGroupId} not found`)
        }

        return res
    }

    public async isLanguageHouseProvider(languageHouseId: string, providerId: string) {
        return !!(await this.qb()
            .select('id')
            .from('Organization_providers')
            .where('"languageHouse" = ?', [languageHouseId])
            .andWhere('provider = ?', [providerId])
            .getCount())
    }

    public async isProviderWithoutEditRights(organizationId: string) {
        return !!(await this.qb()
            .select('id')
            .where('"id" = ?', [organizationId])
            .andWhere('"type" = ?', [OrganizationTypeEnum.provider])
            .andWhere('"hasLimitedEditRights" IS TRUE')
            .getCount())
    }
}
