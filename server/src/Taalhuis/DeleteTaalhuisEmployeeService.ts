import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'

@Injectable()
export class DeleteTaalhuisEmployeeService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private employeeRepository: EmployeeRepository,
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private userRepository: UserRepository
    ) {}

    public async deleteTaalhuisEmplyoee(userId: string) {
        // get data
        const user = await this.userRepository.findById(userId)
        assertNotNil(user, `User with id ${userId} not found`)

        assertNotNil(user.person, `User ${userId} does not have a person`)
        const person = await this.personRepository.findById(user.person)
        assertNotNil(person, `Person with id ${user.person} not found`)

        const employee = await this.employeeRepository.findByPersonId(person.id)
        assertNotNil(employee, `Employee with id ${person.id} not found`)

        // delete cc
        await this.emailRepository.deleteEmail(person.emailId)

        if (person.telephoneId) {
            await this.telephoneRepository.deleteTelephone(person.telephoneId)
        }

        await this.personRepository.deletePerson(person.id)

        // delete mrc
        await this.employeeRepository.deleteEmployee(employee.id)

        // delete uc
        await this.userRepository.deleteUser(user.id)

        return true
    }
}
