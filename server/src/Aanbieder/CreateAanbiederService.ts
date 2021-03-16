import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository, CreateOrganizationAddressInput } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { SourceOrganizationRepository } from 'src/CommonGroundAPI/wrc/SourceOrganizationRepository'
import { Address } from 'src/generated/cc-graphql'
import { Organization } from 'src/generated/wrc-graphql'
import { AanbiederAddressType } from './types/AanbiederType'

export interface CreateAanbiederInput {
    address?: CreateOrganizationAddressInput
    name: string
    email?: string
    phoneNumber?: string
}

@Injectable()
export class CreateAanbiederService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private organizationRepository: OrganizationRepository,
        private addressRepository: AddressRepository,
        private sourceOrganizationRepository: SourceOrganizationRepository,
        private groupRepository: GroupRepository,
        private programRepository: ProgramRepository
    ) {}

    public async createAanbieder(input: CreateAanbiederInput) {
        // cc/address
        const address = await this.addressRepository.createAddress(input.address ?? {})
        // cc/email
        const email = input.email ? await this.emailRepository.createEmail(input.email) : undefined
        // cc/telephone
        const telephone = input.phoneNumber
            ? await this.telephoneRepository.createTelephone(input.phoneNumber)
            : undefined

        // wrc/organization
        const sourceAanbieder = await this.sourceOrganizationRepository.createSourceOrganization(input.name)
        // uc/group
        await this.createGroupsForSourceAanbieder(sourceAanbieder)
        // edu/program
        await this.createProgramForSourceAanbieder(sourceAanbieder)

        // cc/organization
        const aanbieder = await this.organizationRepository.createOrganization({
            name: input.name,
            type: OrganizationTypesEnum.AANBIEDER,
            addressIds: address ? [address.id] : undefined,
            emailIds: email ? [email.id] : undefined,
            telephoneIds: telephone ? [telephone.id] : undefined,
            sourceOrganizationId: sourceAanbieder.id,
        })

        // update wrc/organization to include the cc/organization
        await this.sourceOrganizationRepository.updateSourceOrganization(sourceAanbieder.id, {
            ccOrganizationId: aanbieder.id,
        })

        const emailString = aanbieder.emails?.edges?.pop()?.node?.email
        const telephoneString = aanbieder.telephones?.edges?.pop()?.node?.telephone

        const addressObject = aanbieder.addresses?.edges?.pop()?.node
        assertNotNil(addressObject, `Address not found for aanbieder ${aanbieder.id}`)

        return {
            id: aanbieder.id,
            name: aanbieder.name,
            email: emailString,
            telephone: telephoneString,
            address: this.parseAddressObject(addressObject),
        }
    }

    private parseAddressObject(input: Address): AanbiederAddressType {
        return {
            houseNumber: input?.houseNumber ?? '',
            locality: input?.locality ?? '',
            postalCode: input?.postalCode ?? '',
            street: input?.street ?? '',
            houseNumberSuffix: input?.houseNumberSuffix ?? '',
        }
    }

    private async createGroupsForSourceAanbieder(sourceAanbieder: Organization) {
        // TODO: Check for existing UserGroups for this wrc/organization and only create new if they dont exist

        const coordinatorUserGroup = await this.groupRepository.createGroup({
            organization: sourceAanbieder.id,
            name: `Coördinator`,
            description: `Coördinator rol voor aanbeider organisatie ${sourceAanbieder.name}`,
        })

        const guideUserGroup = await this.groupRepository.createGroup({
            organization: sourceAanbieder.id,
            name: `Begeleider`,
            description: `Begeleider rol voor aanbieder organisatie ${sourceAanbieder.name}`,
        })

        const volunteerUserGroup = await this.groupRepository.createGroup({
            organization: sourceAanbieder.id,
            name: `Vrijwilliger`,
            description: `Vrijwilliger rol voor aanbieder organisatie ${sourceAanbieder.name}`,
        })

        // TODO: Error handling

        this.logger.debug(
            `Created uc/group objects for sourceAanbieder: ${coordinatorUserGroup?.id}, ${guideUserGroup?.id} and ${volunteerUserGroup?.id}`
        )
    }

    private async createProgramForSourceAanbieder(sourceAanbieder: Organization) {
        const createdProgram = await this.programRepository.createProgram(
            `${sourceAanbieder.name} program`,
            sourceAanbieder.id
        )

        return createdProgram
    }
}
