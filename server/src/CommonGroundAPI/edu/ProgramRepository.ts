import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { EDURepository } from 'src/CommonGroundAPI/EDURepository'
import { Program } from 'src/generated/edu-graphql'

interface ProgramsParams {
    provider?: string
}

type ProgramEntity = Pick<Program, 'id' | 'name'>

@Injectable()
export class ProgramRepository extends EDURepository {
    public async createProgram(name: string, providerId: string) {
        const result = await this.sdk.createProgram({
            input: {
                name,
                provider: providerId,
            },
        })

        const program = result?.createProgram?.program
        assertNotNil(program, `Failed to create program`)

        return this.returnNonNullable(program)
    }

    public async deleteProgram(id: string) {
        const result = await this.sdk.deleteProgram({ input: { id: this.stripURLfromID(id) } })

        return !!result
    }

    public async findBySourceOrganizationId(sourceOrganizationId: string) {
        const programs = await this.findPrograms({ provider: sourceOrganizationId })

        if (programs.length === 0) {
            throw new Error(`No Program found for wrc/organization ${sourceOrganizationId}`)
        }
        if (programs.length > 1) {
            throw new Error(
                `Expected only 1 Program for wrc/organization ${sourceOrganizationId}, but got ${programs.length}`
            )
        }

        const program = programs.pop()
        assertNotNil(program)

        return program
    }

    // TODO: Only expose findBySourceOrganizationId(). findPrograms() should be private
    public async findPrograms(params: ProgramsParams = {}) {
        const result = await this.sdk.programs(params)

        const programEdges = result.programs?.edges

        if (!programEdges) {
            return []
        }

        const programEntities: ProgramEntity[] = programEdges.map(programEdge => {
            const id = programEdge?.node?.id
            assertNotNil(id)

            const name = programEdge?.node?.name
            assertNotNil(name)

            return {
                id: this.makeURLfromID(id),
                name,
            }
        })

        return programEntities
    }
}
