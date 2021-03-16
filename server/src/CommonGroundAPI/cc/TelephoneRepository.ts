import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

export interface UpdateTaalhuisTelephoneInput {
    id: string
    telephone?: string
}

@Injectable()
export class TelephoneRepository extends CCRepository {
    public async createTelephone(telephone: string) {
        const result = await this.sdk.createTelephone({
            input: { telephone },
        })

        const telephoneObject = result?.createTelephone?.telephone
        assertNotNil(telephoneObject, `Failed to create telephone`)

        telephoneObject.id = this.makeURLfromID(telephoneObject.id)

        return this.returnNonNullable(telephoneObject)
    }

    public async deleteTelephone(id: string) {
        const result = await this.sdk.deleteTelephone({ input: { id: this.stripURLfromID(id) } })

        return !!result
    }

    public async updateTelephone(input: UpdateTaalhuisTelephoneInput) {
        const result = await this.sdk.updateTelephone({
            input: {
                id: this.stripURLfromID(input.id),
                telephone: input.telephone,
            },
        })

        const telephoneObject = result.updateTelephone?.telephone
        assertNotNil(telephoneObject, `Failed to update telephone`)

        telephoneObject.id = this.makeURLfromID(telephoneObject.id)

        return telephoneObject
    }
}
