import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { WRCRepository } from 'src/CommonGroundAPI/WRCRepository'

@Injectable()
export class SourceOrganizationRepository extends WRCRepository {
    public async createSourceTaalhuis(name: string) {
        const result = await this.sdk.createSourceOrganization({ input: { name } })

        const organization = result.createOrganization?.organization
        assertNotNil(organization, `Failed to create SourceTaalhuis`)

        organization.id = this.makeURLfromID(organization.id)

        return this.returnNonNullable(organization)
    }

    public async updateSourceTaalhuis(id: string, fields: { name?: string; ccOrganizationId?: string }) {
        const result = await this.sdk.updateSourceOrganization({
            input: { id: this.stripURLfromID(id), name: fields.name, contact: fields.ccOrganizationId },
        })

        const organization = result.updateOrganization?.organization
        assertNotNil(organization, `Failed to update SourceTaalhuis ${id}`)

        organization.id = this.makeURLfromID(organization.id)

        return this.returnNonNullable(organization)
    }

    public async deleteSourceTaalhuis(id: string) {
        const result = await this.sdk.deleteSourceOrganization({ input: { id: this.stripURLfromID(id) } })

        return !!result
    }
}
