import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { TaalhuisEmployeeService } from './TaalhuisEmployeeService'

export interface UpdateTaalhuisEmployeeInput {
    employeeId: string
    givenName: string
    additionalName?: string
    familyName: string
    email: string
    telephone?: string
}

@Injectable()
export class UpdateTaalhuisEmployeeService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private taalhuisEmployeeRepository: EmployeeRepository,
        private personRepository: PersonRepository,
        private telephoneRepository: TelephoneRepository,
        private emailRepository: EmailRepository,
        private taalhuisEmployeeService: TaalhuisEmployeeService
    ) {}

    public async updateTaalhuisEmployee(input: UpdateTaalhuisEmployeeInput) {
        const employee = await this.taalhuisEmployeeRepository.findById({ id: input.employeeId })
        if (!employee) {
            throw new Error(`Employee with id ${input.employeeId} not found`)
        }

        assertNotNil(employee.person)
        const person = await this.personRepository.findById(employee.person)
        if (!person) {
            throw new Error(`Person with id ${employee.person} does not exist.`)
        }

        let telephone = null
        if (input.telephone && person.telephone !== input.telephone) {
            if (!person.telephone) {
                telephone = await this.telephoneRepository.createTelephone(input.telephone)
            } else {
                if (!person.telephoneId) {
                    throw new Error(`Person has a phone number but no Id, something went wrong.`)
                }
                telephone = await this.telephoneRepository.updateTelephone({
                    id: person.telephoneId,
                    telephone: input.telephone,
                })
            }
        }

        if (input.email && input.email !== person.email) {
            await this.emailRepository.updateEmail({
                id: person.emailId,
                email: input.email,
            })
        }

        await this.personRepository.updatePerson({
            id: person.id,
            emailId: person.emailId,
            telephoneId: telephone?.id,
            familyName: input.familyName ?? person.familyName,
            givenName: input.givenName ?? person.givenName,
            additionalName: input.additionalName,
        })

        return this.taalhuisEmployeeService.findById(employee.id)
    }
}
