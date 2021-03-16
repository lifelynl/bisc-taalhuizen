import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'

interface UpdateAanbiederAddressInput {
    street?: string | null
    postalCode?: string | null
    locality?: string | null
    houseNumber?: string | null
    houseNumberSuffix?: string | null
}

export interface UpdateAanbiederInput {
    id: string
    address?: UpdateAanbiederAddressInput
    name?: string
    email?: string
    phoneNumber?: string
}

interface AddressNodeType {
    id: string
    street?: string | null
    postalCode?: string | null
    locality?: string | null
    houseNumber?: string | null
    houseNumberSuffix?: string | null
}

interface TelephoneNodeType {
    id: string
    telephone?: string | null
}

interface EmailNodeType {
    id: string
    email?: string | null
}

@Injectable()
export class UpdateAanbiederService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private organizationRepository: OrganizationRepository,
        private addressRepository: AddressRepository,
        private telephoneRepository: TelephoneRepository,
        private emailRepository: EmailRepository
    ) {}

    public async updateAanbieder(input: UpdateAanbiederInput) {
        // TODO: This still returns small ID's instead of full URI's, maybe fix this later
        const aanbieder = await this.organizationRepository.getOneRaw(input.id, OrganizationTypesEnum.AANBIEDER)

        if (!aanbieder) {
            throw new Error(`Aanbieder entity not found`)
        }

        const addressNode = aanbieder.addresses?.edges?.pop()?.node
        assertNotNil(addressNode, `Address not found for aanbieder ${aanbieder.id}`)

        const telephoneNode = aanbieder.telephones?.edges?.pop()?.node ?? null
        const telephoneId = await this.updateTelephone(telephoneNode, input)

        const emailNode = aanbieder.emails?.edges?.pop()?.node ?? null
        const emailId = await this.updateEmail(emailNode, input)

        await this.updateAddress(addressNode, input)

        // TODO: If the name was changed, then we should also update the name in the linked wrc/organization (SourceAanbieder)
        await this.organizationRepository.updateOrganization({
            id: aanbieder.id,
            type: OrganizationTypesEnum.AANBIEDER,
            name: input.name || aanbieder.name,
            addressIds: [addressNode.id],
            emailIds: emailId ? [emailId] : [],
            telephoneIds: telephoneId ? [telephoneId] : [],
        })

        return this.organizationRepository.getOne(aanbieder.id, OrganizationTypesEnum.AANBIEDER)
    }

    private async updateEmail(emailNode: EmailNodeType | null, input: UpdateAanbiederInput): Promise<string | null> {
        if (!input.email) {
            if (emailNode) {
                await this.emailRepository.deleteEmail(emailNode.id)
            }

            return null
        }

        if (!emailNode) {
            const newEmail = await this.emailRepository.createEmail(input.email)

            return newEmail.id
        }

        if (input.email !== emailNode.email) {
            const updatedEmail = await this.emailRepository.updateEmail({ id: emailNode.id, email: input.email })

            if (!updatedEmail) {
                throw new Error(`Failed updating email entity`)
            }

            return updatedEmail.id
        }

        return emailNode.id
    }

    private async updateTelephone(
        telephoneNode: TelephoneNodeType | null,
        input: UpdateAanbiederInput
    ): Promise<string | null> {
        if (!input.phoneNumber) {
            if (telephoneNode) {
                await this.telephoneRepository.deleteTelephone(telephoneNode.id)
            }

            return null
        }

        if (!telephoneNode) {
            const newTelephone = await this.telephoneRepository.createTelephone(input.phoneNumber)

            return newTelephone.id
        }

        if (input.phoneNumber !== telephoneNode.telephone) {
            const updatedTelephone = await this.telephoneRepository.updateTelephone({
                id: telephoneNode.id,
                telephone: input.phoneNumber,
            })

            if (!updatedTelephone) {
                throw new Error(`Failed to update telephone`)
            }

            return updatedTelephone.id
        }

        return telephoneNode.id
    }

    // TODO: This is duplicated in UpdateTaalhuisService, please fix
    private async updateAddress(addressNode: AddressNodeType, input: UpdateAanbiederInput) {
        let somethingActuallyChanged = false
        if (!input.address) {
            return null
        }
        const { houseNumber, postalCode, houseNumberSuffix, locality, street } = input.address
        if (addressNode.houseNumber !== houseNumber) {
            addressNode.houseNumber = houseNumber
            somethingActuallyChanged = true
        }

        if (addressNode.postalCode !== postalCode) {
            addressNode.postalCode = postalCode
            somethingActuallyChanged = true
        }

        if (addressNode.houseNumberSuffix !== houseNumberSuffix) {
            addressNode.houseNumberSuffix = houseNumberSuffix
            somethingActuallyChanged = true
        }

        if (addressNode.locality !== locality) {
            addressNode.locality = locality
            somethingActuallyChanged = true
        }

        if (addressNode.street !== street) {
            addressNode.street = street
            somethingActuallyChanged = true
        }

        if (somethingActuallyChanged) {
            const updatedAddress = await this.addressRepository.updateAddress(addressNode)
            if (!updatedAddress) {
                throw new Error(`Updating address failed`)
            }
            return updatedAddress
        }

        return addressNode
    }
}
