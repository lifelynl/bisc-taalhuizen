import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { FindParticipantByIdQuery, Participant } from 'src/generated/edu-graphql'
import { EDURepository } from '../EDURepository'

// Options in Conduction API: "pending", "accepted", "rejected", "completed", "active"
export enum ParticipantStatusEnum {
    pending = 'pending',
    accepted = 'accepted',
}

interface CreateParticipantInput {
    personId: string
    programId: string
    status: ParticipantStatusEnum
}

interface ParticipantsParams {
    ccPersonUrl?: string
    ccPersonUrls?: string[]
    programId?: string
}

type ParticipantEntity = Pick<Participant, 'id' | 'person'> & { status: ParticipantStatusEnum; dateCreated: string }

@Injectable()
export class ParticipantRepository extends EDURepository {
    public async createParticipant(input: CreateParticipantInput) {
        const result = await this.sdk.createParticipant({
            input: {
                status: input.status,
                person: input.personId,
                program: this.stripURLfromID(input.programId),
            },
        })

        const participantObject = result?.createParticipant?.participant
        assertNotNil(participantObject, `Failed to create participant`)

        participantObject.id = this.makeURLfromID(participantObject.id)

        return this.returnNonNullable(participantObject)
    }

    public async updateParticipantStatus(participantId: string, newStatus: ParticipantStatusEnum) {
        const result = await this.sdk.updateParticipant({
            input: {
                id: this.stripURLfromID(participantId),
                status: newStatus,
            },
        })

        const participantObject = result?.updateParticipant?.participant
        assertNotNil(participantObject, `Failed to update participant`)

        participantObject.id = this.makeURLfromID(participantObject.id)

        return this.returnNonNullable(participantObject)
    }

    public async findById(participantId: string) {
        const result = await this.sdk.findParticipantById({ id: this.stripURLfromID(participantId) })

        const participantNode = result.participant
        assertNotNil(participantNode, `Participant with id ${participantId} not found`)

        return this.parseParticipantNode(participantNode)
    }

    public async findByProgramId(programId: string) {
        return this.findByParams({ programId: this.stripURLfromID(programId) })
    }

    public async findByPersonIds(personIds: string[]) {
        return this.findByParams({ ccPersonUrls: personIds })
    }

    private async findByParams(params: ParticipantsParams) {
        const result = await this.sdk.participants(params)

        const participantEdges = result.participants?.edges

        if (!participantEdges) {
            return []
        }

        const participantEntities: ParticipantEntity[] = participantEdges.map(participantEdge => {
            const participantNode = participantEdge?.node
            assertNotNil(participantNode)

            return this.parseParticipantNode(participantNode)
        })

        return participantEntities
    }

    public async deleteParticipant(id: string) {
        const result = await this.sdk.deleteParticipant({ input: { id: this.stripURLfromID(id) } })

        return !!result
    }

    private parseParticipantNode(
        participantNode: NonNullable<NonNullable<FindParticipantByIdQuery>['participant']>
    ): ParticipantEntity {
        const id = participantNode.id
        assertNotNil(id)

        const person = participantNode.person
        assertNotNil(person)

        const status = participantNode.status
        assertNotNil(status)

        const dateCreated = participantNode.dateCreated
        assertNotNil(dateCreated)

        const participantEntity = {
            id: this.makeURLfromID(id),
            person,
            status: this.parseStringToParticipantStatus(status),
            dateCreated,
        }

        return participantEntity
    }

    // TODO: Maybe make this generic, because we do the same in OrganizationRepository
    private parseStringToParticipantStatus(input: string) {
        for (const val of Object.values(ParticipantStatusEnum)) {
            if (input.toUpperCase() === val.toUpperCase()) {
                // case insensitive match just in case
                return val
            }
        }

        throw new Error(`Unsupported participant status: ${input}`)
    }
}
