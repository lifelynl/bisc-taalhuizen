import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ParticipantRepository, ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'

interface RegisterStudentAddressInput {
    street?: string
    postalCode?: string
    locality?: string
    houseNumber?: string
    houseNumberSuffix?: string
}

export interface RegisterStudentInput {
    taalhuisId: string
    // TODO: How are we going to store the registrar/aanmelder?
    // registrar: {
    //     organisationName: string
    //     personName: string
    //     telephone: string
    // }
    student: {
        givenName: string
        additionalName?: string
        familyName: string
        email: string
        telephone: string
        address?: RegisterStudentAddressInput
    }
    // TODO: Add toelichting field
}

@Injectable()
export class RegisterStudentService {
    public constructor(
        private organizationRepository: OrganizationRepository,
        private programRepository: ProgramRepository,
        private addressRepository: AddressRepository,
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private participantRepository: ParticipantRepository
    ) {}

    public async registerStudent(input: RegisterStudentInput) {
        const taalhuis = await this.organizationRepository.getOne(input.taalhuisId, OrganizationTypesEnum.TAALHUIS)
        const sourceOrganizationId = taalhuis.sourceOrganization

        const programsForTaalhuis = await this.programRepository.findPrograms({ provider: sourceOrganizationId })

        if (programsForTaalhuis.length === 0) {
            throw new Error(`No Program found for wrc/organisation ${sourceOrganizationId}`)
        }
        if (programsForTaalhuis.length > 1) {
            throw new Error(
                `Expected only 1 Program for wrc/organisation ${sourceOrganizationId}, but got ${programsForTaalhuis.length}`
            )
        }

        const program = programsForTaalhuis.pop()
        assertNotNil(program)

        // cc/address
        const address = await this.addressRepository.createAddress(input.student?.address ? input.student?.address : {})
        // cc/email
        const email = await this.emailRepository.createEmail(input.student.email)
        // cc/telephone
        const telephone = await this.telephoneRepository.createTelephone(input.student.telephone)

        // cc/person
        const person = await this.personRepository.createPerson({
            givenName: input.student.givenName,
            additionalName: input.student.additionalName,
            familyName: input.student.familyName,
            telephoneId: telephone.id,
            emailId: email.id,
            addressIds: [address.id],
        })

        const participant = await this.participantRepository.createParticipant({
            status: ParticipantStatusEnum.pending,
            personId: person.id,
            programId: program.id,
        })

        // TODO: Create cc/person and cc/org for Aanmelder and set org ID in referredBy

        // TODO: Add toelichting veld

        return true
    }
}
