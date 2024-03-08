import { Injectable } from '@nestjs/common'
import { PolicyAction } from '../utils/policy/policy'
import { User } from '../user/user.entity'
import { OrganizationPolicy } from '../utils/policy/organization.policy'
import { OrganizationRepository } from './organization.repository'
import {
    CreateOrganizationInputType,
    EditOrganizationInputType,
    OrganizationFiltersInputType,
    OrganizationsSortInputType,
} from './organization.type'
import { Organization, OrganizationTypeEnum } from './organization.entity'
import { AddressService } from '../address/address.service'
import { HashingService } from '../utils/hashing.service'
import { Person } from '../person/person.entity'
import { Employee } from '../employee/employee.entity'
import { PaginatedInputType } from '../utils/pagination.type'
import { AddressRepository } from '../address/address.repository'
import { EditAddressInputType } from '../address/address.type'
import { PostalCodeAreaService } from '../postalCodeArea/postalCodeArea.service'
import { MikroORM, QBQueryOrderMap, QueryOrder, UseRequestContext } from '@mikro-orm/core'
import { Team } from '../team/team.entity'
import { set } from 'lodash'
import slugify from 'slugify'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { DomainError } from '../../errors/DomainError'

interface OrganizationFilters {
    type?: OrganizationTypeEnum[]
    id?: string
}

@Injectable()
export class OrganizationService {
    public constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly organizationPolicy: OrganizationPolicy,
        private readonly addressService: AddressService,
        private readonly hashingService: HashingService,
        private readonly addressRepository: AddressRepository,
        private readonly postalCodeAreaService: PostalCodeAreaService,
        private readonly orm: MikroORM
    ) {}

    public async getOrganization(user: UserWithCurrentEmployee, organizationId: string) {
        await this.organizationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { organizationId })

        const criteria: OrganizationFilters = {}
        criteria.id = organizationId

        return this.organizationRepository.findOneOrFail(criteria)
    }

    public async getOrganizations(
        user: UserWithCurrentEmployee,
        paginationArgs: PaginatedInputType,
        type?: OrganizationTypeEnum,
        sort?: OrganizationsSortInputType,
        filters?: OrganizationFiltersInputType
    ) {
        await this.organizationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            organizationType: type,
            filterQueryOnProvidersFor: filters?.providersFor,
        })

        const criteria: OrganizationFilters = {}

        if (type) {
            criteria.type = [type]
        }

        const qb = this.organizationRepository.createQueryBuilder()
        qb.andWhere(criteria)

        if (filters?.providersFor) {
            if (type !== OrganizationTypeEnum.languageHouse) {
                throw new DomainError('Only language houses can have providers')
            }

            qb.andWhere(
                '"Organization".id IN (SELECT provider FROM "Organization_providers" WHERE "languageHouse" = ?)',
                [filters.providersFor]
            )
        }

        if (sort) {
            const { locality, name, street } = sort
            const orderBy: QBQueryOrderMap<Organization> = {}

            if (locality) {
                set(orderBy, 'address.locality', locality)
            }

            if (name) {
                set(orderBy, 'name', name)
            }

            if (street) {
                set(orderBy, 'address.street', street)
            }

            qb.orderBy(orderBy)
        }

        return this.organizationRepository.queryPaginated(qb, paginationArgs.take, paginationArgs.skip)
    }

    public async getPublicOrganizations() {
        return this.organizationRepository
            .qb()
            .where({ type: OrganizationTypeEnum.languageHouse })
            .orderBy({ name: QueryOrder.ASC })
            .getResult()
    }

    public async getParticipationProviderOrganizations(user: UserWithCurrentEmployee) {
        await this.organizationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            organizationType: OrganizationTypeEnum.provider,
            forProviderListForParticipations: true,
        })

        const qb = this.organizationRepository
            .qb()
            .where({ type: OrganizationTypeEnum.provider })
            .orderBy({ name: QueryOrder.ASC })

        if (user.accessGroup === OrganizationTypeEnum.languageHouse) {
            qb.andWhere(
                '"Organization".id IN (SELECT provider FROM "Organization_providers" WHERE "languageHouse" = ?)',
                [user.currentEmployee.organization.id]
            )
        }

        return qb.getResult()
    }

    public async createOrganization(user: UserWithCurrentEmployee, input: CreateOrganizationInputType) {
        await this.organizationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, { organizationType: input.type })

        const newOrganization = new Organization()
        newOrganization.name = input.name
        newOrganization.email = input.email
        newOrganization.telephone = input.telephone
        newOrganization.type = input.type
        newOrganization.address = input.address ? this.addressService.getNewAddressObject(input.address) : null
        newOrganization.slug = this.getSlug(newOrganization)

        if (newOrganization.type === OrganizationTypeEnum.languageHouse) {
            const postalCodes = this.validatePostalCodeInput(input.postalCodes)

            const postalcodes = await this.postalCodeAreaService.getValidatedPostalCodeAreas(
                postalCodes,
                newOrganization
            )

            postalcodes.forEach(postalCode => (postalCode.organization = newOrganization))
            await this.organizationRepository.persist([...postalcodes])

            // create a default team
            const newTeam = new Team()
            newTeam.name = newOrganization.name
            newTeam.parentOrganization = newOrganization
        }

        if (newOrganization.type === OrganizationTypeEnum.provider) {
            newOrganization.hasLimitedEditRights = input.hasLimitedEditRights
        }

        await this.organizationRepository.persistAndFlush([newOrganization])
        return newOrganization
    }

    // Had to do it like this because class validator didnt want to coopoerate
    private validatePostalCodeInput(input?: number[]): number[] {
        if (!input || !input.length) {
            // TODO refactor for translations
            throw new DomainError('Postcodegebied(en) zijn verplicht')
        }

        if (!input.every(i => i >= 1000 && i <= 9999)) {
            // TODO refactor for translations
            throw new DomainError('Postcodegebied(en) zijn ongeldig')
        }

        return input as number[]
    }

    public async editOrganization(user: UserWithCurrentEmployee, input: EditOrganizationInputType) {
        await this.organizationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, { organizationId: input.id })

        const organization = await this.organizationRepository.getWithPostalCodeAreasOrFail(input.id)

        if (input.name !== undefined) {
            organization.name = input.name
            organization.slug = this.getSlug(organization)
        }

        if (input.email !== undefined) {
            organization.email = input.email
        }

        if (input.telephone !== undefined) {
            organization.telephone = input.telephone
        }

        if (input.address) {
            await this.editOrganizationAddress(organization, input.address)
        }

        if (input.postalCodes !== undefined) {
            const result = await this.postalCodeAreaService.getValidatedPostalCodeAreas(input.postalCodes, organization)

            if (!organization.postalCodes.isInitialized()) {
                await organization.postalCodes.init()
            }

            organization.postalCodes.set(result)
        }

        if (input.disabledIntakeFields !== undefined) {
            organization.disabledIntakeFields = input.disabledIntakeFields
        }

        if (input.providers !== undefined) {
            if (user.accessGroup !== OrganizationTypeEnum.bisc) {
                throw new DomainError('Only admins can edit providers')
            }

            if (organization.type !== OrganizationTypeEnum.languageHouse) {
                throw new DomainError('Only language houses can have providers')
            }

            const providers = await this.organizationRepository.find({
                id: { $in: input.providers },
                type: OrganizationTypeEnum.provider,
            })
            if (providers.length !== input.providers.length) {
                throw new DomainError('Unable to find one or more providers')
            }

            if (!organization.providers.isInitialized()) {
                await organization.providers.init()
            }

            organization.providers.removeAll()
            organization.providers.add(providers)
        }

        if (organization.type === OrganizationTypeEnum.provider) {
            organization.hasLimitedEditRights = input.hasLimitedEditRights
        }

        await this.organizationRepository.persistAndFlush(organization)
        return organization
    }

    public async deleteOrganization(user: UserWithCurrentEmployee, id: string) {
        await this.organizationPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, { organizationId: id })

        const organization = await this.organizationRepository.findOneOrFail({ id })

        await this.organizationRepository.removeAndFlush(organization)

        return true
    }

    @UseRequestContext()
    public async seedInitialOrganization(passwordInput: string, emailInput: string) {
        const rootOrg = new Organization()
        rootOrg.name = 'BISC'
        rootOrg.type = OrganizationTypeEnum.bisc
        rootOrg.slug = this.getSlug(rootOrg)

        const rootUser = new User()
        rootUser.username = emailInput
        rootUser.password = await this.hashingService.hash(passwordInput)

        rootUser.person = new Person()
        rootUser.person.familyName = 'Doe'
        rootUser.person.givenName = 'Jane'
        rootUser.person.email = rootUser.username

        const employee = new Employee()
        employee.person = rootUser.person
        employee.organization = rootOrg
        rootOrg.employees.add(employee)

        return this.organizationRepository.persistAndFlush([rootOrg, rootUser, employee])
    }

    private async editOrganizationAddress(organization: Organization, addressInput: EditAddressInputType) {
        const address = await this.addressRepository.findOne({ organization: organization.id })

        if (!address) {
            if (!addressInput.name) {
                throw new DomainError('address must have a name')
            }

            organization.address = this.addressService.getNewAddressObject({
                name: addressInput.name,
                street: addressInput.street,
                houseNumber: addressInput.houseNumber,
                houseNumberSuffix: addressInput.houseNumberSuffix,
                postalCode: addressInput.postalCode,
                locality: addressInput.locality,
                country: addressInput.country,
            })

            return
        }

        organization.address = this.addressService.getEditedAddress(address, addressInput)
    }

    /**
     * expects the organization to contain (updated) type & name values
     */
    private getSlug(organization: Organization) {
        return slugify(`${organization.type}-${organization.name}`, {
            trim: true,
            lower: true,
            strict: true,
            replacement: '-',
        })
    }
}
