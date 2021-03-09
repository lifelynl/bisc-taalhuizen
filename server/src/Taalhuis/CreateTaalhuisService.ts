import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository, CreateTaalhuisAddressInput } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { Address } from 'src/generated/cc-graphql'
import { Organization } from 'src/generated/wrc-graphql'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { GroupRepository } from '../CommonGroundAPI/uc/GroupRepository'
import { SourceOrganizationRepository } from '../CommonGroundAPI/wrc/SourceOrganizationRepository'
import { OrganizationRepository } from '../CommonGroundAPI/cc/OrganizationRepository'
import { TaalhuisAddressType, TaalhuisType } from './types/TaalhuisType'

export interface CreateTaalhuisInput {
    address: CreateTaalhuisAddressInput
    name: string
    email: string
    phoneNumber: string
}
@Injectable()
export class CreateTaalhuisService {
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

    public async createTaalhuis(input: CreateTaalhuisInput): Promise<TaalhuisType> {
        // cc/address
        const address = await this.addressRepository.createAddress(input.address)
        // cc/email
        const email = await this.emailRepository.createEmail(input.email)
        // cc/telephone
        const telephone = await this.telephoneRepository.createTelephone(input.phoneNumber)

        // wrc/organization
        const sourceTaalhuis = await this.sourceOrganizationRepository.createSourceTaalhuis(input.name)
        // uc/group
        await this.createGroupsForSourceTaalhuis(sourceTaalhuis)
        // edu/program
        await this.createProgramForSourceTaalhuis(sourceTaalhuis)

        // cc/organization
        const taalhuis = await this.organizationRepository.addTaalhuis({
            name: input.name,
            addressIds: address ? [address.id] : undefined,
            emailIds: [email.id],
            telephoneIds: [telephone.id],
            sourceOrganizationId: sourceTaalhuis.id,
        })

        // update wrc/organization to include the cc/organization
        await this.sourceOrganizationRepository.updateSourceTaalhuis(sourceTaalhuis.id, {
            ccOrganizationId: taalhuis.id,
        })

        const emailString = taalhuis.emails?.edges?.pop()?.node?.email
        assertNotNil(emailString, `Email not found for taalhuis ${taalhuis.id}`)

        const telephoneString = taalhuis.telephones?.edges?.pop()?.node?.telephone
        assertNotNil(telephoneString, `Telephone not found for taalhuis ${taalhuis.id}`)

        const addressObject = taalhuis.addresses?.edges?.pop()?.node
        assertNotNil(addressObject, `Address not found for taalhuis ${taalhuis.id}`)

        return {
            id: taalhuis.id,
            name: taalhuis.name,
            email: emailString,
            telephone: telephoneString,
            address: this.parseAddressObject(addressObject),
        }
    }

    private parseAddressObject(input: Address): TaalhuisAddressType {
        return {
            houseNumber: input?.houseNumber ?? '',
            locality: input?.locality ?? '',
            postalCode: input?.postalCode ?? '',
            street: input?.street ?? '',
            houseNumberSuffix: input?.houseNumberSuffix ?? '',
        }
    }

    private async createGroupsForSourceTaalhuis(sourceTaalhuis: Organization) {
        // TODO: Check for existing UserGroups for this wrc/organization and only create new if they dont exist

        const coordinatorUserGroup = await this.groupRepository.createGroup({
            organization: sourceTaalhuis.id,
            name: `Coördinator`,
            description: `Coördinator rol voor organisatie ${sourceTaalhuis.name}`,
        })

        const employeeUserGroup = await this.groupRepository.createGroup({
            organization: sourceTaalhuis.id,
            name: `Medewerker`,
            description: `Medewerker rol voor organisatie ${sourceTaalhuis.name}`,
        })

        // TODO: Error handling

        this.logger.debug(
            `Created uc/group objects for sourceTaalhuis: ${coordinatorUserGroup?.id} and ${employeeUserGroup?.id}`
        )
    }

    private async createProgramForSourceTaalhuis(sourceTaalhuis: Organization) {
        const createdProgram = await this.programRepository.createProgram(
            `${sourceTaalhuis.name} program`,
            sourceTaalhuis.id
        )

        return createdProgram
    }
}
