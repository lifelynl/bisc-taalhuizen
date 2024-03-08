import { MikroORM } from '@mikro-orm/core'
import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Address } from '../address/address.entity'
import { mockAddress } from '../address/address.mock'
import { AddressRepository } from '../address/address.repository'
import { AddressService } from '../address/address.service'
import { EditAddressInputType } from '../address/address.type'
import { EmployeeRepository } from '../employee/employee.repository'
import { PostalCodeAreaRepository } from '../postalCodeArea/postalCodeArea.repository'
import { PostalCodeAreaService } from '../postalCodeArea/postalCodeArea.service'
import { mockUser } from '../user/user.mock'
import { UserRepository } from '../user/user.repository'
import { UserService } from '../user/user.service'
import { HashingService } from '../utils/hashing.service'
import { AddressPolicy } from '../utils/policy/address.policy'
import { OrganizationPolicy } from '../utils/policy/organization.policy'
import { PostalCodeAreaPolicy } from '../utils/policy/postalCodeArea.policy'
import { Organization, OrganizationTypeEnum } from './organization.entity'
import { mockOrganization } from './organization.mock'
import { OrganizationRepository } from './organization.repository'
import { OrganizationResolver } from './organization.resolver'
import { OrganizationService } from './organization.service'
import { CreateOrganizationInputType, EditOrganizationInputType } from './organization.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

describe(OrganizationResolver.name, () => {
    const findOneOrFail = jest.fn()
    const queryPaginated = jest.fn()
    const throwIfNotSatisfiedBy = jest.fn()
    const persistAndFlush = jest.fn()
    const persist = jest.fn()
    const findOneAddress = jest.fn()
    const find = jest.fn()
    const getWithPostalCodeAreasOrFail = jest.fn()

    let organizationService: OrganizationService
    let hashingService: HashingService
    let addressService: AddressService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                OrganizationService,
                AddressService,
                AddressPolicy,
                PostalCodeAreaService,
                { provide: MikroORM, useValue: {} },
                { provide: AddressRepository, useValue: { persistAndFlush, findOne: findOneAddress } },
                { provide: PostalCodeAreaRepository, useValue: { find } },
                EmployeeRepository,
                HashingService,
                ConfigService,
                { provide: PostalCodeAreaPolicy, useValue: { throwIfNotSatisfiedBy } },
                { provide: OrganizationPolicy, useValue: { throwIfNotSatisfiedBy } },
                {
                    provide: OrganizationRepository,
                    useValue: {
                        findOneOrFail,
                        persistAndFlush,
                        persist,
                        queryPaginated,
                        getWithPostalCodeAreasOrFail,
                        createQueryBuilder: () => {
                            return {
                                andWhere: jest.fn(),
                            }
                        },
                    },
                },
                UserRepository,
                UserService,
            ],
        }).compile()

        organizationService = module.get(OrganizationService)
        hashingService = module.get(HashingService)
        addressService = module.get(AddressService)
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getOrganization', () => {
        it('should check access', async () => {
            try {
                await organizationService.getOrganization({} as UserWithCurrentEmployee, '')
            } catch {}

            expect(throwIfNotSatisfiedBy).toBeCalledTimes(1)
        })

        it('should get organization with id', async () => {
            throwIfNotSatisfiedBy.mockResolvedValueOnce(null)
            const id = 'some-id'

            try {
                await organizationService.getOrganization({} as UserWithCurrentEmployee, id)
            } catch {}

            expect(findOneOrFail).toBeCalledWith({ id })
        })
    })

    describe('getOrganizations', () => {
        it('should check access', async () => {
            try {
                await organizationService.getOrganizations({} as UserWithCurrentEmployee, {})
            } catch {}

            expect(throwIfNotSatisfiedBy).toBeCalledTimes(1)
        })

        it('should get an array', async () => {
            throwIfNotSatisfiedBy.mockResolvedValueOnce(null)

            try {
                await organizationService.getOrganizations(
                    {} as UserWithCurrentEmployee,
                    {},
                    OrganizationTypeEnum.languageHouse
                )
            } catch {}

            expect(queryPaginated).toBeCalled()
        })
    })

    describe('createOrganization', () => {
        find.mockResolvedValue([{ code: 1000 }])
        const inputData: CreateOrganizationInputType = {
            name: 'Organization name',
            email: 'email@organization.com',
            telephone: '+31 20 846 1905',
            type: OrganizationTypeEnum.languageHouse,
            address: {
                name: 'Address one',
                country: 'NL',
                street: 'Prinsengracht',
                houseNumber: '197',
                houseNumberSuffix: 'd',
                postalCode: '1015DT',
                locality: 'Amsterdam',
            },
            postalCodes: [1000],
        }
        it('should check access', async () => {
            try {
                await organizationService.createOrganization({} as UserWithCurrentEmployee, inputData)
            } catch {}

            expect(throwIfNotSatisfiedBy).toBeCalledTimes(1)
        })

        it('should create a complete object', async () => {
            const user = await mockUser(hashingService)
            const userWithCurrentEmployee = { ...user, currentEmployee: {} } as UserWithCurrentEmployee
            const organization = await organizationService.createOrganization(userWithCurrentEmployee, inputData)

            expect(organization).toBeInstanceOf(Organization)
            expect(organization?.address).toBeInstanceOf(Address)
            expect(persist).toBeCalledTimes(1)
        })
    })

    describe('editOrganization', () => {
        const sampleOrg = mockOrganization()
        sampleOrg.address = mockAddress()

        const inputData: EditOrganizationInputType = {
            id: 'some-id',
            name: 'Organization name',
            email: 'email@organization.com',
            telephone: '+31 20 846 1905',
        }

        const addressInput: EditAddressInputType = {
            name: 'Address1',
            country: 'US',
            street: 'Prinseng',
            houseNumber: '19',
            houseNumberSuffix: 'dg',
            postalCode: '1015ET',
            locality: 'Den Haag',
        }

        findOneOrFail.mockResolvedValue(sampleOrg)
        getWithPostalCodeAreasOrFail.mockResolvedValue(sampleOrg)

        it('should check access', async () => {
            try {
                await organizationService.editOrganization({} as UserWithCurrentEmployee, inputData)
            } catch {}

            expect(throwIfNotSatisfiedBy).toBeCalledTimes(1)
        })

        it('should only edit organization if no address input given', async () => {
            const user = await mockUser(hashingService)
            const userWithCurrentEmployee = { ...user, currentEmployee: {} } as UserWithCurrentEmployee
            const organization = await organizationService.editOrganization(userWithCurrentEmployee, inputData)

            expect(jest.spyOn(addressService, 'getNewAddressObject')).not.toBeCalled()
            expect(jest.spyOn(addressService, 'getEditedAddress')).not.toBeCalled()
            expect(organization).toMatchObject({
                name: inputData.name,
                email: inputData.email,
                telephone: inputData.telephone,
            })
        })

        it('should create address if no organization address exists and address input given', async () => {
            const user = await mockUser(hashingService)
            const userWithCurrentEmployee = { ...user, currentEmployee: {} } as UserWithCurrentEmployee
            const organization = await organizationService.editOrganization(userWithCurrentEmployee, {
                ...inputData,
                address: addressInput,
            })

            expect(jest.spyOn(addressService, 'getEditedAddress')).not.toBeCalled()
            expect(jest.spyOn(addressService, 'getNewAddressObject')).toBeCalledWith(addressInput)
            expect(organization).toMatchObject({
                name: inputData.name,
                email: inputData.email,
                telephone: inputData.telephone,
                address: expect.objectContaining(addressInput),
            })
        })

        it('should edit address if organization address exists and address input given', async () => {
            findOneAddress.mockResolvedValueOnce(sampleOrg.address)

            const user = await mockUser(hashingService)
            const userWithCurrentEmployee = { ...user, currentEmployee: {} } as UserWithCurrentEmployee
            const organization = await organizationService.editOrganization(userWithCurrentEmployee, {
                ...inputData,
                address: addressInput,
            })

            expect(jest.spyOn(addressService, 'getNewAddressObject')).not.toBeCalled()
            expect(jest.spyOn(addressService, 'getEditedAddress')).toBeCalledWith(sampleOrg.address, addressInput)
            expect(organization).toMatchObject({
                name: inputData.name,
                email: inputData.email,
                telephone: inputData.telephone,
                address: expect.objectContaining(addressInput),
            })
        })
    })
})
