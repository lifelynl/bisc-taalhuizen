import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ParticipantRepository, ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'

type StudentEntity = {
    id: string
    status: ParticipantStatusEnum
    dateCreated: string
    givenName: string
    additionalName?: string
    familyName: string
}

@Injectable()
export class RegistrationService {
    public constructor(
        private organizationRepository: OrganizationRepository,
        private programRepository: ProgramRepository,
        private addressRepository: AddressRepository,
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private participantRepository: ParticipantRepository
    ) {}

    public async findByTaalhuisId(taalhuisId: string) {
        const taalhuis = await this.organizationRepository.getOne(taalhuisId, OrganizationTypesEnum.TAALHUIS)
        const program = await this.programRepository.findBySourceOrganizationId(taalhuis.sourceOrganization)
        const participants = await this.participantRepository.findByProgramId(program.id)

        const students: StudentEntity[] = await Promise.all(
            participants.map(async participant => {
                const person = await this.personRepository.findById(participant.person)
                assertNotNil(person, `Person ${participant.person} not found for Participant ${participant.id}`)

                return {
                    id: participant.id,
                    status: participant.status,
                    dateCreated: participant.dateCreated,
                    givenName: person.givenName,
                    additionalName: person.additionalName,
                    familyName: person.familyName,
                }
            })
        )

        return students
    }

    public async findByStudentId(studentId: string) {
        const participant = await this.participantRepository.findById(studentId)

        const person = await this.personRepository.findById(participant.person)
        assertNotNil(person, `Person ${participant.person} not found for Participant ${participant.id}`)

        const student: StudentEntity = {
            id: participant.id,
            status: participant.status,
            dateCreated: participant.dateCreated,
            givenName: person.givenName,
            additionalName: person.additionalName,
            familyName: person.familyName,
        }

        return student
    }

    public async deleteRegistration(studentId: string) {
        const student = await this.participantRepository.findById(studentId)
        if (student.status !== ParticipantStatusEnum.pending) {
            throw new Error(
                `Registration can only be deleted when status = pending, student ${studentId} has status ${student.status}`
            )
        }

        const person = await this.personRepository.findById(student.person)
        assertNotNil(person, `Person ${student.person} not found for Participant ${student.id}`)

        await this.participantRepository.deleteParticipant(student.id)

        for (const addressId of person.addressIds) {
            await this.addressRepository.deleteAddress(addressId)
        }

        await this.emailRepository.deleteEmail(person.emailId)

        if (person.telephoneId) {
            await this.telephoneRepository.deleteTelephone(person.telephoneId)
        }

        await this.personRepository.deletePerson(person.id)

        return true
    }

    public async acceptRegistration(studentId: string) {
        const student = await this.participantRepository.findById(studentId)
        if (student.status !== ParticipantStatusEnum.pending) {
            throw new Error(
                `Registration can only be accepted when status = pending, student ${studentId} has status ${student.status}`
            )
        }

        await this.participantRepository.updateParticipantStatus(student.id, ParticipantStatusEnum.accepted)

        return true
    }
}
