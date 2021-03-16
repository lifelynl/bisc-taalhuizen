import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'
import { CommonGroundAPIService } from 'src/CommonGroundAPI/CommonGroundAPIService'

@Injectable()
export class OldProgramRepository {
    private client: ApolloClient<NormalizedCacheObject>

    public constructor(private commonGroundAPIService: CommonGroundAPIService) {
        this.client = this.commonGroundAPIService.createAPIClient(
            'https://taalhuizen-bisc.commonground.nu/api/v1/edu/graphql'
        )
    }

    public async findPrograms() {
        // TODO: Try codegen
        const query = gql`
            {
                programs {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        `

        const result = await this.client.query({ query })

        return result.data.programs.edges
    }

    public async findProgramsByPerson(personId: string): Promise<{ id: string; name: string }[]> {
        // TODO: Try codegen
        const query = gql`
            query participants($person: String) {
                participants(person: $person) {
                    pageInfo {
                        hasNextPage
                    }

                    edges {
                        cursor
                        node {
                            id
                            person
                            program {
                                id
                                name
                            }
                        }
                    }
                }
            }
        `

        const result = await this.client.query({ query, variables: { person: personId } })

        const participants: {
            cursor: string
            node: { id: string; person: string; program: { id: string; name: string } }
        }[] = result.data.participants.edges
        const programs = participants.map(participant => participant.node.program)

        return programs
    }

    public async createParticipant(personId: string, programId: string): Promise<boolean> {
        // TODO: Try codegen
        const mutation = gql`
            mutation createParticipant($input: createParticipantInput!) {
                createParticipant(input: $input) {
                    participant {
                        id
                        person
                        program {
                            id
                            name
                        }
                    }
                }
            }
        `

        const variables = { input: { person: personId, program: programId } }

        const result = await this.client.mutate({ mutation, variables })

        if (result.errors) {
            console.error(`createParticipant failed`, { variables })
            console.dir(result.errors)

            return false
        }

        return true
    }
}
