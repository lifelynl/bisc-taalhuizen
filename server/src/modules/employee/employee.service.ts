import { QBQueryOrderMap } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { set } from 'lodash'
import { Organization, OrganizationTypeEnum } from '../organization/organization.entity'
import { OrganizationRepository } from '../organization/organization.repository'
import { Person } from '../person/person.entity'
import { PersonRepository } from '../person/person.repository'
import { PersonService } from '../person/person.service'
import { StudentRepository } from '../student/student.repository'
import { User } from '../user/user.entity'
import { UserRepository } from '../user/user.repository'
import { HashingService } from '../utils/hashing.service'
import { MailService } from '../utils/mail.service'
import { PaginatedInputType } from '../utils/pagination.type'
import { OrganizationPolicy } from '../utils/policy/organization.policy'
import { PolicyAction } from '../utils/policy/policy'
import { Employee } from './employee.entity'
import { EmployeeRepository } from './employee.repository'
import {
    CreateEmployeeInputType,
    EditEmployeeInputType,
    GetOrganizationsArgs,
    OrganizationEmployeesSortInputType,
} from './employee.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { TeamRepository } from '../team/team.repository'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class EmployeeService {
    public constructor(
        private readonly userRepository: UserRepository,
        private readonly mailService: MailService,
        private readonly hashingService: HashingService,
        private readonly configService: ConfigService,
        private readonly personRepository: PersonRepository,
        private readonly personService: PersonService,
        private readonly employeeRepository: EmployeeRepository,
        private readonly organizationRepository: OrganizationRepository,
        private readonly studentRepository: StudentRepository,
        private readonly organizationPolicy: OrganizationPolicy,
        private readonly teamRepository: TeamRepository
    ) {}

    public async getOrganizationEmployees(
        user: UserWithCurrentEmployee,
        { skip, take }: PaginatedInputType,
        args: GetOrganizationsArgs,
        sort?: OrganizationEmployeesSortInputType
    ) {
        await this.organizationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            organizationId: args.organizationId,
        })

        const qb = this.employeeRepository.qb().where({ organization: args.organizationId })

        if (args.role) {
            qb.andWhere({ role: args.role })
        }

        if (args.oneOfRoles) {
            qb.andWhere({
                role: {
                    $in: args.oneOfRoles,
                },
            })
        }

        if (args.teamId) {
            qb.andWhere({ teams: args.teamId })
        }

        qb.groupBy('"Employee".id')

        if (sort) {
            const { createdAt, familyName, givenName, updatedAt } = sort
            const orderBy: QBQueryOrderMap<Employee> = {}

            if (createdAt) {
                set(orderBy, 'createdAt', createdAt)
            }

            // if there are more than one entity joined that starts with "P", we might
            // need to check if the "p1" table alias is working as intended
            if (familyName || givenName) {
                qb.groupBy('"Employee".id, p1.id')
            }

            if (familyName) {
                set(orderBy, 'person.familyName', familyName)
            }

            if (givenName) {
                set(orderBy, 'person.givenName', givenName)
            }

            if (updatedAt) {
                set(orderBy, 'updatedAt', updatedAt)
            }

            qb.orderBy(orderBy)
        }

        return this.employeeRepository.queryPaginated(qb, take, skip)
    }

    public async createEmployee(input: CreateEmployeeInputType): Promise<Employee> {
        const email = typeof input.person.email === 'string' ? input.person.email.trim() : undefined
        if (!email) {
            throw new DomainError('Email is required')
        }

        const organization = await this.validateInputAndGetOrganization(input)

        const existingPerson = await this.personRepository.findForEmail(email)
        if (existingPerson?.studentId) {
            throw new DomainError('E-mailadres is in gebruik door een student')
        }

        const employee = new Employee()
        this.employeeRepository.persist(employee)

        employee.organization = organization
        employee.role = input.employeeRole

        if (input.teams?.length) {
            const teams = await this.teamRepository.getAllInOrganizationOrFail(input.teams, organization.id)
            employee.teams.add(teams)
        }

        if (existingPerson) {
            await this.personService.updateFields(existingPerson, { ...input.person, id: existingPerson.id })
            employee.person = existingPerson

            await this.employeeRepository.persistAndFlush([employee, existingPerson])
            return employee
        }

        return this.createNewUserForEmployeeAndInvite(email, input, organization, employee)
    }

    public async editEmployee(currentUser: User, input: EditEmployeeInputType) {
        const employee = await this.employeeRepository.findOneOrFail(input.id)
        const person = await this.personRepository.getWithUserAndEmployeeAndMenteesOrFail(input.id)

        if (!person.user) {
            throw new DomainError(`person ${person.id} does not have a user`)
        }

        const isEditingSelf = person.user.id === currentUser.id

        if (input.employeeRole && employee.role && input.employeeRole !== employee.role) {
            if (isEditingSelf) {
                throw new DomainError('A user can not change their own role')
            }

            const organization = await this.organizationRepository.findOneOrFail(employee.organization)
            if (!Employee.isValidRoleForAccessGroup(organization.type, input.employeeRole)) {
                throw new DomainError('Invalid role for organization')
            }

            employee.role = input.employeeRole
        }

        if (input.mentees !== undefined) {
            if (!employee.mentees.isInitialized()) {
                await employee.mentees.init()
            }

            if (!input.mentees || input.mentees.length === 0) {
                employee.mentees.removeAll()
            } else {
                const mentees = await this.studentRepository.find({ id: input.mentees })
                employee.mentees.set(mentees)
            }
        }

        if (input.person) {
            // if incoming email exists for a different person
            if (input.person.email && input.person.email !== person.email) {
                const personToMergeTo = await this.personRepository.findAnotherForEmail(input.person.email, person.id)
                if (personToMergeTo) {
                    if (personToMergeTo.studentId) {
                        throw new DomainError('E-mailadres is in gebruik door een student')
                    }

                    const editingAnotherUser = person.userId !== currentUser.id
                    const changingEmailToOwnEmail =
                        input.person.email.trim().toLowerCase() === currentUser.username.trim().toLowerCase()

                    if (editingAnotherUser && changingEmailToOwnEmail) {
                        throw new DomainError(
                            'Je kunt het e-mailadres van iemand anders niet wijzigen in uw eigen e-mailadres'
                        )
                    }

                    if (
                        await this.employeeRepository.existsForPersonAndOrganization(
                            personToMergeTo.id,
                            employee.organizationId
                        )
                    ) {
                        throw new DomainError('E-mailadres is in gebruik door een andere medewerker in de organisatie')
                    }

                    await this.personService.updateFields(personToMergeTo, { ...input.person, id: personToMergeTo.id })
                    employee.person = personToMergeTo

                    this.personRepository.remove(person)
                    this.personRepository.persist(personToMergeTo)
                    this.employeeRepository.persist(employee)
                    await this.employeeRepository.flush()

                    return employee
                }
                // if it's not an existing person, allow fallthrough (we can safely update the email)
            }

            await this.personService.updateFields(person, input.person)
        }

        if (person.email !== person.user.username) {
            if (!person.email) {
                throw new DomainError('E-mailadres is verplicht')
            }

            person.user.username = person.email
        }

        this.employeeRepository.persist(employee)
        await this.personRepository.persistAndFlush(person)

        return employee
    }

    public async deleteEmployee(id: string) {
        const employee = await this.employeeRepository.findOneOrFail({ id }, { populate: ['person'] })

        if (!employee.person.employees.isInitialized()) {
            await employee.person.employees.init()
        }

        if (employee.person.employees.length === 1) {
            const user = await this.userRepository.findOneOrFail({ person: employee.person.id })

            this.employeeRepository.remove(user)
            this.employeeRepository.remove(employee.person)
        }

        await this.employeeRepository.removeAndFlush(employee)

        return true
    }

    private async validateInputAndGetOrganization(input: CreateEmployeeInputType) {
        if (!input.person.familyName) {
            throw new DomainError('Last name is required')
        }

        if (!input.person.givenName) {
            throw new DomainError('First name is required')
        }

        const organization = await this.organizationRepository.findOneOrFail(input.organization)

        if (!Employee.isValidRoleForAccessGroup(organization.type, input.employeeRole)) {
            throw new DomainError('Invalid role for organization')
        }

        if (!input.teams?.length && organization.type === OrganizationTypeEnum.languageHouse) {
            throw new DomainError('A team is required for language house employees')
        }

        if (input.teams?.length && organization.type !== OrganizationTypeEnum.languageHouse) {
            throw new DomainError('Only LH employees can be assigned to a team')
        }

        return organization
    }

    private async createNewUserForEmployeeAndInvite(
        email: string,
        input: CreateEmployeeInputType,
        organization: Organization,
        employee: Employee
    ) {
        const user = new User()
        user.person = await this.personService.getNewPersonToSaveFromInput(input.person)
        employee.person = user.person

        const resetToken = await this.hashingService.randomBytes()
        const hashedResetToken = await this.hashingService.hash(resetToken)

        user.username = email
        user.passwordResetToken = hashedResetToken
        user.passwordResetRequestedAt = new Date()

        await this.userRepository.persistAndFlush([user, user.person, employee])

        // TECH-DEBT: move this to a queue
        await this.sendInviteMail(user, user.person, organization, resetToken)

        return employee
    }

    private async sendInviteMail(user: User, person: Person, organization: Organization, token: string) {
        const url = await this.getResetPasswordUrl(user.username, token)

        await this.mailService.sendInviteUserMail({
            to: user.username,
            inviteURL: url,
            name: person.givenName,
            organization: organization.name,
        })
    }

    private async getResetPasswordUrl(email: string, token: string) {
        const base64Email = Buffer.from(email).toString('base64')
        const URIEncodedBase64Email = encodeURIComponent(base64Email)

        const base64Token = Buffer.from(token).toString('base64')
        const URIEncodedBase64Token = encodeURIComponent(base64Token)

        return `${this.configService.getOrThrow(
            'FRONT_URL'
        )}/auth/resetpassword/${URIEncodedBase64Email}/${URIEncodedBase64Token}`
    }
}
