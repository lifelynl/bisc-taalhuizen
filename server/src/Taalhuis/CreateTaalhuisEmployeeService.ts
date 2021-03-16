import { Injectable, Logger } from '@nestjs/common'
import { AppError } from 'src/AppError'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'
import { ErrorCode } from 'src/ErrorCodes'
import { PasswordHashingService } from 'src/User/services/PasswordHashingService'

export interface CreateTaalhuisEmployeeInput {
    taalhuisId: string
    userGroupId: string
    givenName: string
    additionalName?: string
    familyName: string
    email: string
    telephone?: string
}

@Injectable()
export class CreateTaalhuisEmployeeService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private employeeRepository: EmployeeRepository,
        private userRepository: UserRepository,
        private passwordHashingService: PasswordHashingService
    ) {}

    public async createTaalhuisEmployee(input: CreateTaalhuisEmployeeInput) {
        const existingUser = await this.userRepository.findByEmail(input.email)
        if (existingUser) {
            throw new AppError(ErrorCode.EntityAlreadyExists, {
                entity: 'User',
                field: 'email',
                value: input.email,
            })
        }
        // TODO: Fetch taalhuis, see if it exists

        // cc/organization
        const taalhuis = { id: input.taalhuisId }
        // cc/email
        const email = await this.emailRepository.createEmail(input.email)
        // cc/telephone
        const telephone = input.telephone ? await this.telephoneRepository.createTelephone(input.telephone) : undefined
        // cc/person
        const person = await this.personRepository.createPerson({
            ...input,
            telephoneId: telephone ? telephone.id : undefined,
            emailId: email.id,
        })

        // mrc/employee (link cc/person and cc/organization)
        const employee = await this.employeeRepository.createEmployee(person.id, taalhuis.id)

        // TODO: Fetch userGroup
        // uc/group
        const userGroup = { id: input.userGroupId, name: 'Role name' }

        // uc/user (link cc/person and uc/group)
        const randomPasswordHash = await this.passwordHashingService.hash(this.passwordHashingService.randomPassword())
        const user = await this.userRepository.createUser(
            input.email,
            person.id,
            this.userRepository.stripURLfromID(userGroup.id),
            randomPasswordHash
        )

        return {
            id: user.id,
            email: email.email,
            telephone: telephone ? telephone.telephone : undefined,
            givenName: person.givenName,
            additionalName: person.additionalName,
            familyName: person.familyName,
            dateCreated: user.dateCreated,
            dateModified: user.dateModified,
            userRoles: [userGroup],
        }
    }
}
