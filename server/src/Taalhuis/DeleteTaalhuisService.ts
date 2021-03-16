import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ParticipantRepository } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { SourceOrganizationRepository } from 'src/CommonGroundAPI/wrc/SourceOrganizationRepository'

export interface DeleteTaalhuisInput {
    id: string
}

@Injectable()
export class DeleteTaalhuisService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private participantRepository: ParticipantRepository,
        private organizationRepository: OrganizationRepository,
        private employeeRepository: EmployeeRepository,
        private programRepository: ProgramRepository,
        private sourceOrganizationRepository: SourceOrganizationRepository,
        private addressRepository: AddressRepository,
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository
    ) {}

    public async deleteTaalhuis(id: string) {
        const taalhuis = await this.organizationRepository.getOne(id, OrganizationTypesEnum.TAALHUIS)
        assertNotNil(taalhuis, `Taalhuis ${id} not found.`)

        const employeesForTaalhuis = await this.employeeRepository.findByOrganizationId(taalhuis.id)

        // delete employees and participantobjects
        if (employeesForTaalhuis && employeesForTaalhuis.length) {
            const employeePersonIds = employeesForTaalhuis.map(e => e.person)
            const employeeParticipants = await this.participantRepository.findByPersonIds(employeePersonIds)

            // TODO: Eventually this can be removed because Conduction is working on automatically deleting participants/participations when deleting a program
            for (const participant of employeeParticipants) {
                await this.participantRepository.deleteParticipant(participant.id)
            }

            for (const employee of employeesForTaalhuis) {
                // TODO: We also have to delete cc/person and uc/user of the employees, in BISC-40 we'll add a DeleteTaalhuisEmployeeService that we can also call from here instead of direct repo call
                await this.employeeRepository.deleteEmployee(employee.id)
            }
        }

        // delete programs
        const programsForTaalhuis = await this.programRepository.findPrograms({ provider: taalhuis.sourceOrganization })
        for (const program of programsForTaalhuis) {
            const programParticipants = await this.participantRepository.findByProgramId(program.id)
            // TODO: Eventually this can be removed because Conduction is working on automatically deleting participants/participations when deleting a program
            for (const participant of programParticipants) {
                await this.participantRepository.deleteParticipant(participant.id)
            }

            await this.programRepository.deleteProgram(program.id)
        }

        // delete contact entities
        if (taalhuis.address?.id) {
            await this.addressRepository.deleteAddress(taalhuis.address.id)
        }
        if (taalhuis.telephoneId) {
            await this.telephoneRepository.deleteTelephone(taalhuis.telephoneId)
        }
        if (taalhuis.emailId) {
            await this.emailRepository.deleteEmail(taalhuis.emailId)
        }

        // delete cc/organization
        await this.organizationRepository.deleteOrganization(taalhuis.id)
        // delete wrc/organization
        await this.sourceOrganizationRepository.deleteSourceOrganization(taalhuis.sourceOrganization)

        return true
    }

    private notUndefined<T>(x: T | undefined): x is T {
        return x !== undefined
    }
}
