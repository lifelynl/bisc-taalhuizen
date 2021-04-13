import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ParticipantRepository } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantStatusEnum'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { StudentService } from './StudentService'

export enum StudentCivicIntegrationRequirementEnum {
    NO = 'NO',
    YES = 'YES',
    CURRENTLY_WORKING_ON_INTEGRATION = 'CURRENTLY_WORKING_ON_INTEGRATION',
}

export enum StudentCivicIntegrationRequirementReasonEnum {
    FINISHED = 'FINISHED',
    FROM_EU_COUNTRY = 'FROM_EU_COUNTRY',
    EXEMPTED_OR_ZROUTE = 'EXEMPTED_OR_ZROUTE',
}

export enum StudentGenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    X = 'X',
}

export interface CreateStudentInput {
    taalhuisId: string

    // civicIntegrationRequirement: boolean
    // civicIntegrationRequirementReason?: StudentCivicIntegrationRequirementReasonEnum
    // civicIntegrationRequirementFinishDate?: Date

    givenName: string
    additionalName?: string | null
    familyName: string

    // gender: StudentGenderEnum

    email?: string | null
    telephone?: string | null
}

@Injectable()
export class CreateStudentService {
    public constructor(
        private organizationRepository: OrganizationRepository,
        private programRepository: ProgramRepository,
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private participantRepository: ParticipantRepository,
        private studentService: StudentService
    ) {}

    public async createStudent(input: CreateStudentInput) {
        const taalhuis = await this.organizationRepository.getOne(input.taalhuisId, OrganizationTypesEnum.TAALHUIS)
        assertNotNil(taalhuis, `Taalhuis ${input.taalhuisId} not found`)
        const sourceOrganizationId = taalhuis.sourceOrganization
        assertNotNil(
            sourceOrganizationId,
            `Taalhuis ${input.taalhuisId} should have a sourceOrganization, but it hasn't`
        )

        const program = await this.programRepository.findBySourceOrganizationId(sourceOrganizationId)
        assertNotNil(program, `Program not found for wrc/organization ${sourceOrganizationId}`)

        // cc/email
        const email = input.email ? await this.emailRepository.createEmail(input.email) : undefined
        // cc/telephone
        const telephone = input.telephone ? await this.telephoneRepository.createTelephone(input.telephone) : undefined
        // cc/person
        const person = await this.personRepository.createPerson({
            givenName: input.givenName,
            additionalName: input.additionalName ?? undefined,
            familyName: input.familyName,
            telephoneId: telephone ? telephone.id : undefined,
            emailId: email ? email.id : undefined,
        })

        // edu/participant
        const participant = await this.participantRepository.createParticipant({
            status: ParticipantStatusEnum.accepted,
            personId: person.id,
            programId: program.id,
        })

        return this.studentService.findByStudentId(participant.id)
    }
}
