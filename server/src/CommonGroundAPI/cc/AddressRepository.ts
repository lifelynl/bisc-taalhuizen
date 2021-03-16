import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'
import { Address } from 'src/generated/cc-graphql'

export interface CreateOrganizationAddressInput {
    street?: string
    postalCode?: string
    locality?: string
    houseNumber?: string
    houseNumberSuffix?: string
}
export interface UpdateTaalhuisAddressInput {
    id: string
    street?: string | null
    postalCode?: string | null
    locality?: string | null
    houseNumber?: string | null
    houseNumberSuffix?: string | null
}

export type AddressEntity = Pick<
    Address,
    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality' | 'id'
>

@Injectable()
export class AddressRepository extends CCRepository {
    public async createAddress(addressInput: CreateOrganizationAddressInput) {
        const result = await this.sdk.createAddress({
            input: {
                street: addressInput.street || undefined,
                postalCode: addressInput.postalCode,
                houseNumber: addressInput.houseNumber,
                houseNumberSuffix: addressInput.houseNumberSuffix || undefined,
                locality: addressInput.locality || undefined,
            },
        })

        const address = result?.createAddress?.address
        assertNotNil(address, `Failed to create address`)

        address.id = this.makeURLfromID(address.id)

        return this.returnNonNullable(address)
    }

    public async findByIds(ids: readonly string[]): Promise<AddressEntity[]> {
        const result = await this.sdk.addresses({
            id_list: ids as string[],
        })

        const addressEdges = result?.addresses?.edges

        if (!addressEdges) {
            return []
        }

        const addresses: AddressEntity[] = addressEdges.map(addressEdge => {
            const address = addressEdge?.node
            assertNotNil(address)

            address.id = this.makeURLfromID(address.id)

            return this.returnNonNullable(address)
        })

        return addresses
    }

    public async deleteAddress(id: string) {
        const result = await this.sdk.deleteAddress({ input: { id: this.stripURLfromID(id) } })

        return !!result
    }

    public async findById(ids: string): Promise<AddressEntity | null> {
        const result = await this.sdk.addresses({
            id_list: [ids],
        })

        const addressEdges = result?.addresses?.edges

        if (!addressEdges) {
            return null
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.returnNonNullable(addressEdges.pop()!.node)
    }

    public async updateAddress(input: UpdateTaalhuisAddressInput) {
        const result = await this.sdk.updateAddress({ input })

        return result.updateAddress?.address
    }
}
