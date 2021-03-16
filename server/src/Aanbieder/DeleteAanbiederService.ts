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

export interface DeleteAanbiederInput {
    id: string
}

@Injectable()
export class DeleteAanbiederService {
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

    public async deleteAanbieder(id: string) {
        const aanbieder = await this.organizationRepository.getOne(id, OrganizationTypesEnum.AANBIEDER)
        assertNotNil(aanbieder, `Aanbieder ${id} not found.`)

        const employeesForAanbieder = await this.employeeRepository.findByOrganizationId(aanbieder.id)

        // delete employees and participantobjects
        if (employeesForAanbieder && employeesForAanbieder.length) {
            const employeePersonIds = employeesForAanbieder.map(e => e.person)
            const employeeParticipants = await this.participantRepository.findByPersonIds(employeePersonIds)

            // TODO: Eventually this can be removed because Conduction is working on automatically deleting participants/participations when deleting a program
            for (const participant of employeeParticipants) {
                await this.participantRepository.deleteParticipant(participant.id)
            }

            for (const employee of employeesForAanbieder) {
                // TODO: We also have to delete cc/person and uc/user of the employees, in BISC-40 we'll add a DeleteAanbiederEmployeeService that we can also call from here instead of direct repo call
                await this.employeeRepository.deleteEmployee(employee.id)
            }
        }

        // delete programs
        const programsForAanbieder = await this.programRepository.findPrograms({
            provider: aanbieder.sourceOrganization,
        })
        for (const program of programsForAanbieder) {
            const programParticipants = await this.participantRepository.findByProgramId(program.id)
            // TODO: Eventually this can be removed because Conduction is working on automatically deleting participants/participations when deleting a program
            for (const participant of programParticipants) {
                await this.participantRepository.deleteParticipant(participant.id)
            }

            await this.programRepository.deleteProgram(program.id)
        }

        // delete contact entities
        if (aanbieder.address?.id) {
            await this.addressRepository.deleteAddress(aanbieder.address.id)
        }
        if (aanbieder.telephoneId) {
            await this.telephoneRepository.deleteTelephone(aanbieder.telephoneId)
        }
        if (aanbieder.emailId) {
            await this.emailRepository.deleteEmail(aanbieder.emailId)
        }

        // delete cc/organization
        await this.organizationRepository.deleteOrganization(aanbieder.id)
        // delete wrc/organization
        await this.sourceOrganizationRepository.deleteSourceOrganization(aanbieder.sourceOrganization)

        return true
    }

    private notUndefined<T>(x: T | undefined): x is T {
        return x !== undefined
    }
}
