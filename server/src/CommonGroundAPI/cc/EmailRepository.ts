import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

export interface UpdateEmailInputType {
    id: string
    email?: string | null
}
@Injectable()
export class EmailRepository extends CCRepository {
    public async createEmail(email: string) {
        const result = await this.sdk.createEmail({
            input: { email },
        })

        const emailObject = result?.createEmail?.email
        assertNotNil(emailObject, `Failed to create email`)

        emailObject.id = this.makeURLfromID(emailObject.id)

        return this.returnNonNullable(emailObject)
    }

    public async deleteEmail(id: string) {
        try {
            await this.sdk.deleteEmail({ input: { id: this.stripURLfromID(id) } })
        } catch (e) {
            return false
        }

        return true
    }

    public async updateEmail(input: UpdateEmailInputType) {
        const result = await this.sdk.updateEmail({
            input: {
                id: this.stripURLfromID(input.id),
                email: input.email,
            },
        })

        return result.updateEmail?.email
    }
}
