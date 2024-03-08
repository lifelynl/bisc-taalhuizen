import { FilterQuery } from '@mikro-orm/core'
import { QueryBuilder } from '@mikro-orm/postgresql'
import { CustomBaseRepository, DateFilters } from 'src/database/CustomBaseRepository'
import { ParticipationStatus } from '../participation/participation.entity'
import { ParticipationRepository } from '../participation/participation.repository'
import { RegistrationStatus } from '../registration/registration.entity'
import { Student } from './student.entity'
import { DomainError } from '../../errors/DomainError'

export class StudentRepository extends CustomBaseRepository<Student> {
    protected readonly entityName = 'Student'

    public getForPerson(personId: string) {
        return this.qb()
            .select('*')
            .where('id IN (SELECT student FROM "Person" WHERE id = ?)', [personId])
            .getSingleResult()
    }

    public getForDocument(documentId: string) {
        return this.qb()
            .select('*')
            .where(
                'id IN (SELECT student FROM "Person" WHERE id IN (SELECT person FROM "UploadedDocument" WHERE id = ?))',
                [documentId]
            )
            .getSingleResult()
    }

    public getForLearningneed(learningNeedId: string) {
        return this.qb()
            .select('*')
            .where('id IN (SELECT student FROM "LearningNeed" WHERE id = ?)', [learningNeedId])
            .getSingleResult()
    }

    public getForOrganization(organizationId: string, filters?: DateFilters) {
        const queryFilters: FilterQuery<Student> = {
            organization: { id: organizationId },
        }

        if (filters?.start || filters?.end) {
            queryFilters.createdAt = this.getDateFilters(filters)
        }

        return this.find(queryFilters)
    }

    public getQBForOrganization(organizationId: string, registrationStatus?: RegistrationStatus) {
        const qb = this.qb().select('*').where('"Student".organization = ?', [organizationId])
        if (registrationStatus) {
            qb.leftJoinAndSelect('registration', 'registration')
            qb.andWhere('registration.status = ?', [registrationStatus])
        }

        return qb
    }

    public async getForTestResultOrFail(testResultId: string) {
        const res = await this.qb()
            .where(
                `id IN (
                    SELECT student FROM "LearningNeed"
                    WHERE id IN (
                        SELECT "learningNeed" FROM "Participation"
                        WHERE id IN (SELECT participation FROM "TestResult" WHERE id = ?)
                    )
                )`,
                [testResultId]
            )
            .getSingleResult()

        if (!res) {
            throw new DomainError(`learning need for test result ${testResultId} not found`)
        }

        return res
    }

    public async getForParticipationOrFail(participationId: string) {
        const res = await this.qb()
            .where(
                `id IN (
                    SELECT student FROM "LearningNeed"
                    WHERE id IN (SELECT "learningNeed" FROM "Participation" WHERE id = ?)
                )`,
                [participationId]
            )
            .getSingleResult()

        if (!res) {
            throw new DomainError(`learning need for participation ${participationId} not found`)
        }

        return res
    }

    public async getWithRegistrationOrFail(studentId: string) {
        const student = await this.qb()
            .leftJoinAndSelect('registration', 'registration')
            .where({ id: studentId })
            .getSingleResult()

        if (!student) {
            throw new DomainError(`student ${studentId} not found`)
        }

        return student
    }

    public async getWithRegistrationAndEducationsOrFail(studentId: string) {
        const student = await this.qb()
            .leftJoinAndSelect('registration', 'registration')
            .leftJoinAndSelect('educations', 'educations')
            .where({ id: studentId })
            .getSingleResult()

        if (!student) {
            throw new DomainError(`student ${studentId} not found`)
        }

        return student
    }

    public filterForParticipationStatus(qb: QueryBuilder<Student>, participationStatus: ParticipationStatus) {
        const dateCondition = ParticipationRepository.getDateConditionForParticipationStatus(participationStatus)

        qb.andWhere(
            `"Student".id IN (
                SELECT student FROM "LearningNeed"
                WHERE id IN (SELECT "learningNeed" FROM "Participation" WHERE ${dateCondition})
            )`
        )
    }

    public filterForProvider(qb: QueryBuilder<Student>, providerId: string) {
        qb.andWhere(
            `
			(
				"Student".id IN (
					SELECT student FROM "LearningNeed"
					WHERE id IN (
						SELECT "learningNeed" FROM "Participation"
						WHERE provider = ?
					)
				)
				OR "Student".organization = ?
            )`,
            [providerId, providerId]
        )
    }

    public filterForProviderParticipationStatus(
        qb: QueryBuilder<Student>,
        providerId: string,
        participationStatus: ParticipationStatus
    ) {
        const dateCondition = ParticipationRepository.getDateConditionForParticipationStatus(participationStatus)

        qb.andWhere(
            `"Student".id IN (
                SELECT student FROM "LearningNeed"
                WHERE id IN (
					SELECT "learningNeed" FROM "Participation"
					WHERE ${dateCondition}
					AND provider = ?
				)
            )`,
            [providerId]
        )
    }

    public filterForProviderNewOrParticipationStatusReferred(qb: QueryBuilder<Student>, providerId: string) {
        const dateCondition = ParticipationRepository.getDateConditionForParticipationStatus(
            ParticipationStatus.referred
        )

        qb.andWhere(
            `(
                -- this matches the query from the 'filterForProviderParticipationStatus' method
				"Student".id IN (
					SELECT student FROM "LearningNeed"
					WHERE id IN (
						SELECT "learningNeed" FROM "Participation"
						WHERE ${dateCondition}
						AND provider = ?
					)
				)

				-- students without a participation to this provider
                -- the permission layer will already make sure that this will only include users that were created by the provider
				OR "Student".id NOT IN (
					SELECT student FROM "LearningNeed"
					WHERE id IN (SELECT "learningNeed" FROM "Participation" WHERE provider = ?)
				)
            )`,
            [providerId, providerId]
        )
    }

    public filterForParticipationEducationGroup(qb: QueryBuilder<Student>, educationGroupId: string) {
        qb.andWhere(
            `"Student".id IN (
                SELECT student FROM "LearningNeed" WHERE id IN (
                    SELECT "learningNeed" FROM "Participation" WHERE "educationGroup" = ?
                )
            )`,
            [educationGroupId]
        )
    }

    public filterForParticipationMentor(qb: QueryBuilder<Student>, mentorId: string) {
        qb.andWhere(
            `"Student".id IN (
                SELECT student FROM "LearningNeed" WHERE id IN (
                    SELECT "learningNeed" FROM "Participation" WHERE "mentor" = ?
                )
            )`,
            [mentorId]
        )
    }

    public async isEmployeeMenteeOrInEmployeeEducationGroup(studentId: string, employeeId: string) {
        const qb = this.qb().where({ id: studentId })
        this.filterForStudentMentorOrEducationGroupEmployee(employeeId, qb)

        return !!(await qb.getCount())
    }

    public filterForStudentMentorOrEducationGroupEmployee(employeeId: string, qb: QueryBuilder<Student>) {
        qb.andWhere(
            `
			(
				"Student".id IN (
                    SELECT student FROM "LearningNeed" WHERE id IN (
                        SELECT "learningNeed" FROM "Participation" WHERE "mentor" = ?
                    )
                )
                OR
				"Student".id IN (
					SELECT student FROM "LearningNeed" WHERE id IN (
						SELECT "learningNeed" FROM "Participation" WHERE "educationGroup" IN (
							SELECT "educationGroup" FROM "EducationGroup_employees" WHERE employee = ?
						)
					)
				)
			)
			`,
            [employeeId, employeeId]
        )
    }

    public async isStudentParticipatingInProvider(studentId: string, providerId: string) {
        return !!(await this.qb()
            .where({ id: studentId })
            .andWhere(
                `
				id IN (
					SELECT student FROM "LearningNeed" WHERE id IN (
						SELECT "learningNeed" FROM "Participation" WHERE provider = ?
					)
				)
				`,
                [providerId]
            )
            .getCount())
    }
}
