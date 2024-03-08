import { Injectable } from '@nestjs/common'
import { AddressPolicy } from '../utils/policy/address.policy'
import { PolicyAction } from '../utils/policy/policy'
import { Address } from './address.entity'
import { AddressRepository } from './address.repository'
import { CreateAddressInputType, EditAddressInputType } from './address.type'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

@Injectable()
export class AddressService {
    public constructor(private addressPolicy: AddressPolicy, private addressRepository: AddressRepository) {}

    public async createAddress(user: UserWithCurrentEmployee, input: CreateAddressInputType, organizationId: string) {
        await this.addressPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, organizationId)

        const newAddress = this.getNewAddressObject(input)

        await this.addressRepository.persistAndFlush(newAddress)
        return newAddress
    }

    public getNewAddressObject(input: CreateAddressInputType) {
        const newAddress = new Address()
        newAddress.name = input.name
        newAddress.street = input.street
        newAddress.houseNumber = input.houseNumber
        newAddress.houseNumberSuffix = input.houseNumberSuffix
        newAddress.postalCode = input.postalCode
        newAddress.locality = input.locality
        newAddress.country = input.country

        return newAddress
    }

    public getEditedAddress(address: Address, input: EditAddressInputType) {
        if (input.name !== undefined) {
            address.name = input.name
        }

        if (input.street !== undefined) {
            address.street = input.street
        }

        if (input.houseNumber !== undefined) {
            address.houseNumber = input.houseNumber
        }

        if (input.houseNumberSuffix !== undefined) {
            address.houseNumberSuffix = input.houseNumberSuffix
        }

        if (input.postalCode !== undefined) {
            address.postalCode = input.postalCode
        }

        if (input.locality !== undefined) {
            address.locality = input.locality
        }

        if (input.country !== undefined) {
            address.country = input.country
        }

        return address
    }
}
