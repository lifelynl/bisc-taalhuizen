import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { UCRepository } from 'src/CommonGroundAPI/UCRepository'
import { CreateGroupInput, Group } from 'src/generated/uc-graphql'

export type UserGroupEntity = Pick<Group, 'id' | 'name'>

// TODO: Rename to UserGroupRepository
@Injectable()
export class GroupRepository extends UCRepository {
    public async createGroup(input: CreateGroupInput) {
        const group = await this.sdk.createGroup({ input })

        return group.createGroup?.group
    }

    // wrcOrganizationId = sourceOrganization
    public async findByOrganizationId(wrcOrganizationId: string) {
        const results = await this.sdk.groupsByOrganizationId({ organizationId: wrcOrganizationId })

        const groupEdges = results.groups?.edges

        if (!groupEdges) {
            return []
        }

        const userGroupEntities = groupEdges.map(groupEdge => {
            const id = groupEdge?.node?.id
            assertNotNil(id)

            const name = groupEdge?.node?.name
            assertNotNil(name)

            return {
                id: this.makeURLfromID(id),
                name,
            }
        })

        return userGroupEntities
    }
}
