import { Injectable } from '@nestjs/common'
import { RegistrationService } from '../registration/registration.service'
import { OrganizationTypeEnum } from '../organization/organization.entity'
import { OrganizationRepository } from '../organization/organization.repository'
import { PersonService } from '../person/person.service'
import { Student } from './student.entity'
import { StudentRepository } from './student.repository'
import {
    CreateStudentInput,
    EditStudentInput,
    GetProviderStudentsArgs,
    GetStudentsArgs,
    RegisterStudentInput,
    StudentsSortInputType,
} from './student.type'
import { Registration, RegistrationStatus } from '../registration/registration.entity'
import { CivicIntegrationService } from '../civicIntegration/civicIntegration.service'
import { EmployeeRepository } from '../employee/employee.repository'
import { TeamRepository } from '../team/team.repository'
import { PaginatedInputType } from '../utils/pagination.type'
import { StudentPolicy } from '../utils/policy/student.policy'
import { QueryBuilder } from '@mikro-orm/postgresql'
import { PolicyAction } from '../utils/policy/policy'
import { QBQueryOrderMap } from '@mikro-orm/core'
import { set } from 'lodash'
import { EmployeeRole } from '../employee/employee.entity'
import { PersonRepository } from '../person/person.repository'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { SortInput } from 'src/utils/graphql/SortingInputField'
import { DomainError } from '../../errors/DomainError'
import { MailService } from '../utils/mail.service'

@Injectable()
export class StudentService {
    public constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly personService: PersonService,
        private readonly registrationService: RegistrationService,
        private readonly studentRepository: StudentRepository,
        private readonly civicIntegrationService: CivicIntegrationService,
        private readonly employeeRepository: EmployeeRepository,
        private readonly teamRepository: TeamRepository,
        private readonly studentPolicy: StudentPolicy,
        private readonly personRepository: PersonRepository,
        private readonly mailService: MailService
    ) {}

    public async getProviderStudents(
        user: UserWithCurrentEmployee,
        { skip, take }: PaginatedInputType,
        args: GetProviderStudentsArgs,
        sort?: StudentsSortInputType
    ) {
        const organization = await this.organizationRepository.getForEmployee(user.currentEmployee.id)
        if (!organization || OrganizationTypeEnum.provider !== organization.type) {
            throw new DomainError('Invalid organization for user')
        }

        await this.studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { organizationId: organization.id })
        const employee = user.currentEmployee

        const qb: QueryBuilder<Student> = this.studentRepository
            .qb()
            .andWhere('registration IN (SELECT id FROM "Registration" WHERE status = ?)', [RegistrationStatus.accepted])

        this.studentRepository.filterForProvider(qb, organization.id)

        if (args.searchName) {
            this.addNameSearchFilter(qb, args.searchName)
        }

        if (args.participationStatus) {
            this.studentRepository.filterForProviderParticipationStatus(qb, organization.id, args.participationStatus)
        }

        if (args.newOrReferred) {
            this.studentRepository.filterForProviderNewOrParticipationStatusReferred(qb, organization.id)
        }

        if (args.educationGroupId) {
            this.studentRepository.filterForParticipationEducationGroup(qb, args.educationGroupId)
        }

        if (args.mentorId) {
            this.studentRepository.filterForParticipationMentor(qb, args.mentorId)
        }

        if (!employee.hasOneOfRoles([EmployeeRole.coordinator, EmployeeRole.coordinatorMentor])) {
            if (employee.hasOneOfRoles([EmployeeRole.mentor, EmployeeRole.volunteer])) {
                this.studentRepository.filterForStudentMentorOrEducationGroupEmployee(employee.id, qb)
            }
        }

        if (sort) {
            const { intakeDate, familyName, givenName, mentor, teamName, referringOrganizationOther } = sort
            const orderBy: QBQueryOrderMap<Student> = {}

            if (familyName) {
                set(orderBy, 'person.familyName', familyName)
            }

            if (givenName) {
                set(orderBy, 'person.givenName', givenName)
            }

            if (mentor) {
                set(orderBy, 'mentor.person.familyName', mentor)
                set(orderBy, 'mentor.person.givenName', mentor)
            }

            if (teamName) {
                set(orderBy, 'team.name', teamName)
            }

            if (referringOrganizationOther) {
                set(orderBy, 'registration.referringOrganizationOther', referringOrganizationOther)
            }

            set(orderBy, 'intakeDate', SortInput.DESC)

            if (intakeDate) {
                set(orderBy, 'intakeDate', intakeDate)
            }

            qb.orderBy(orderBy)
        }

        return this.studentRepository.queryPaginated(qb, take, skip)
    }

    public async getStudents(
        user: UserWithCurrentEmployee,
        { skip, take }: PaginatedInputType,
        args: GetStudentsArgs,
        sort?: StudentsSortInputType
    ) {
        await this.studentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { organizationId: args.organizationId })

        const qb: QueryBuilder<Student> = this.studentRepository.getQBForOrganization(args.organizationId, args.status)

        if (args.educationGroupId) {
            this.studentRepository.filterForParticipationEducationGroup(qb, args.educationGroupId)
        }

        if (args.mentorEmployeeId) {
            qb.andWhere({ mentor: args.mentorEmployeeId })
        }

        if (args.participationStatus) {
            this.studentRepository.filterForParticipationStatus(qb, args.participationStatus)
        }

        if (args.team) {
            qb.andWhere({ team: args.team })
        }

        if (args.searchName) {
            this.addNameSearchFilter(qb, args.searchName)
        }

        if (sort) {
            const { intakeDate, familyName, givenName, mentor, teamName, referringOrganizationOther } = sort
            const orderBy: QBQueryOrderMap<Student> = {}

            if (familyName) {
                set(orderBy, 'person.familyName', familyName)
            }

            if (givenName) {
                set(orderBy, 'person.givenName', givenName)
            }

            if (mentor) {
                set(orderBy, 'mentor.person.familyName', mentor)
                set(orderBy, 'mentor.person.givenName', mentor)
            }

            if (teamName) {
                set(orderBy, 'team.name', teamName)
            }

            if (referringOrganizationOther) {
                set(orderBy, 'registration.referringOrganizationOther', referringOrganizationOther)
            }

            set(orderBy, 'intakeDate', SortInput.DESC)

            if (intakeDate) {
                set(orderBy, 'intakeDate', intakeDate)
            }

            qb.orderBy(orderBy)
        }

        return this.studentRepository.queryPaginated(qb, take, skip)
    }

    public async registerStudent(input: RegisterStudentInput) {
        // TODO refactor validation error to better place + translations

        if (!input.forSelf) {
            this.validateReferredRegistration(input)
        }

        if (!input.person.givenName) {
            throw new DomainError('Deelnemer roepnaam is verpicht')
        }

        if (!input.person.familyName) {
            throw new DomainError('Deelnemer achternaam is verpicht')
        }

        if (!input.person.telephone) {
            throw new DomainError('Deelnemer telefoonnummer is verpicht')
        }

        if (!input.person.address?.street || !input.person.address?.houseNumber) {
            throw new DomainError('Deelnemer adres is onvolledig')
        }

        if (!input.person.address?.postalCode || !input.person.address?.locality) {
            throw new DomainError('Deelnemer adres is onvolledig')
        }

        const email = (input.person.email || '').trim()
        if (email && (await this.personRepository.checkIfEmailExists(email))) {
            await this.sendDuplicateRegistrationEmails(input, email)

            return true
        }

        const student = await this.getNewStudentToRegister(input)
        student.registration.registeredPublicly = true

        await this.studentRepository.persistAndFlush(student)

        if (email) {
            await this.sendSuccessfulRegistrationEmail(
                await this.stringifyRegistrationInput(input),
                email,
                student.organization.name
            )
        }

        return true
    }

    public async createStudent(user: UserWithCurrentEmployee, input: CreateStudentInput) {
        const student = await this.getNewStudentToRegister(input)
        student.registration.registeredPublicly = false
        student.registration.status = RegistrationStatus.accepted

        if (input.civicIntegration) {
            student.civicIntegration = this.civicIntegrationService.getNewIntegrationToSave(input.civicIntegration)
        }

        if (user.accessGroup === OrganizationTypeEnum.languageHouse) {
            if (!input.team) {
                throw new DomainError('Team is required')
            }

            student.mentor = user.currentEmployee
        }

        await this.studentRepository.persistAndFlush(student)

        return this.studentRepository.findOneOrFail(student)
    }

    public async editStudent(input: EditStudentInput) {
        const student = await this.studentRepository.getWithRegistrationOrFail(input.id)

        if (student.registration.status !== RegistrationStatus.accepted) {
            throw new DomainError('student is not yet accepted')
        }

        if (input.intakeDate) {
            student.intakeDate = input.intakeDate
        }

        if (input.civicIntegration) {
            student.civicIntegration = await this.civicIntegrationService.getOrCreateEditedIntegrationToSave(
                student.id,
                input.civicIntegration
            )
        }

        if (input.person) {
            const person = await this.personRepository.findOneOrFail({ student: student.id })
            await this.personService.updateFields(person, { id: person.id, ...input.person })
            student.person = person
        }

        if (input.registration) {
            student.registration = await this.registrationService.getEditedRegistrationToSave(
                student.registrationId,
                input.registration
            )
        }

        if (input.team !== undefined && student.teamId !== input.team) {
            if (input.team === null) {
                student.team = null
            } else {
                const team = await this.teamRepository.findOneOrFail({
                    id: input.team,
                    parentOrganization: student.organizationId,
                })
                student.team = team
            }
        }

        if (input.mentor && student.mentorId !== input.mentor) {
            student.mentor = await this.employeeRepository.findOneOrFail(input.mentor)
        }

        await this.studentRepository.persistAndFlush(student)

        return this.studentRepository.findOneOrFail(student)
    }

    public async deleteStudent(studentId: string) {
        const student = await this.studentRepository.findOneOrFail(studentId)
        await this.studentRepository.removeAndFlush(student)

        return true
    }

    private async getNewStudentToRegister(input: RegisterStudentInput) {
        const student = new Student()

        const organization = await this.organizationRepository.findOneOrFail({
            id: input.organization,
        })

        const team = input.team
            ? await this.teamRepository.findOneOrFail({
                  id: input.team,
                  parentOrganization: organization,
              })
            : null

        student.organization = organization

        student.team = team

        if (!input.person.familyName) {
            throw new DomainError('Last name is required')
        }

        if (!input.person.givenName) {
            throw new DomainError('First name is required')
        }

        student.person = await this.personService.getNewPersonToSaveFromInput(input.person)
        student.registration = await this.registrationService.getNewRegistrationToSaveFromInput(
            input.registration,
            input.forSelf
        )

        return student
    }

    public async acceptStudent(studentId: string) {
        const student = await this.studentRepository.getWithRegistrationOrFail(studentId)

        if (!student.registration || student.registration.status !== RegistrationStatus.pending) {
            throw new DomainError('student is not pending registration')
        }

        student.registration.status = RegistrationStatus.accepted
        await this.studentRepository.persistAndFlush(student)

        return this.studentRepository.findOneOrFail(student)
    }

    public async rejectStudent(studentId: string) {
        const student = await this.studentRepository.getWithRegistrationOrFail(studentId)

        if (!student.registration || student.registration.status !== RegistrationStatus.pending) {
            throw new DomainError('student is not pending registration')
        }

        await this.studentRepository.removeAndFlush(student)
        return true
    }

    private addNameSearchFilter(qb: QueryBuilder<Student>, searchName: string) {
        return qb.andWhere({
            $or: [
                { person: { familyName: { $ilike: `%${searchName}%` } } },
                { person: { givenName: { $ilike: `%${searchName}%` } } },
            ],
        })
    }

    private validateReferredRegistration(input: RegisterStudentInput) {
        if (!input.registration.referringOrganizationOther) {
            throw new DomainError('Aanmeldende organisatie is verpicht')
        }

        if (!input.registration.referringPerson?.familyName) {
            throw new DomainError('Uw naam is verpicht')
        }

        if (!input.registration.referringPerson?.telephone) {
            throw new DomainError('Uw telefoonnummer is verpicht')
        }

        if (!input.registration.referringPerson?.email) {
            throw new DomainError('Uw e-mailadres is verpicht')
        }

        if (!input.person.email) {
            throw new DomainError('Deelnemer e-mailadres is verpicht')
        }
    }

    private async sendDuplicateRegistrationEmails(input: RegisterStudentInput, email: string) {
        const stringifiedRegistrationInput = await this.stringifyRegistrationInput(input)

        const studentOrganization = await this.organizationRepository.getForStudentEmail(email)
        if (!studentOrganization) {
            throw new DomainError('student organization not found')
        }

        await this.sendSuccessfulRegistrationEmail(stringifiedRegistrationInput, email, studentOrganization.name)

        if (studentOrganization.email) {
            await this.mailService.sendDuplicateRegistrationMail({
                to: studentOrganization.email,
                stringifiedRegistrationInput,
                warn: input.organization !== studentOrganization.id,
            })
        }

        if (!input.organization || input.organization === studentOrganization.id) {
            return
        }

        const attemptedOrganization = await this.organizationRepository.findOne({ id: input.organization })
        if (attemptedOrganization?.email) {
            await this.mailService.sendDuplicateAttemptedRegistrationMail({
                to: attemptedOrganization.email,
                stringifiedRegistrationInput,
            })
        }
    }

    private async sendSuccessfulRegistrationEmail(
        stringifiedRegistrationInput: Record<string, string | undefined>,
        email: string,
        organizationName: string
    ) {
        await this.mailService.sendSuccessfulRegistrationMail({
            to: email,
            stringifiedRegistrationInput,
            organizationName,
        })
    }

    private async stringifyRegistrationInput(input: RegisterStudentInput) {
        const organization = await this.organizationRepository.findOneOrFail({ id: input.organization })
        const team = input.registration.referringTeam
            ? await this.teamRepository.findOneOrFail({ id: input.team })
            : null

        return {
            organization: organization.name,
            team: team?.name,
            ['student-given-name']: input.person.givenName,
            ['student-family-name']: input.person.familyName,
            ['student-additional-name']: input.person.additionalName,
            ['student-email']: input.person.email,
            ['student-telephone']: input.person.telephone,
            ['student-address-street']: input.person.address?.street,
            ['student-address-house-number']: input.person.address?.houseNumber,
            ['student-address-house-number-suffix']: input.person.address?.houseNumberSuffix,
            ['student-address-postal-code']: input.person.address?.postalCode,
            ['student-address-locality']: input.person.address?.locality,
            ['student-address-country']: input.person.address?.country,
            ['registration-referring-organization']: Registration.getTranslatedReferringOrganization(
                input.registration.referringOrganization
            ),
            ['registration-referring-organization-other']: input.registration.referringOrganizationOther,
            ['registration-referring-team']: input.registration.referringTeam,
            ['registration-remarks']: input.registration.remarks,
            ['registration-referring-person-family-name']: input.registration.referringPerson?.familyName,
            ['registration-referring-person-telephone']: input.registration.referringPerson?.telephone,
            ['registration-referring-person-email']: input.registration.referringPerson?.email,
        }
    }
}
