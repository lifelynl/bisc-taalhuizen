import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { Address } from './address.entity'

export class AddressRepository extends CustomBaseRepository<Address> {
    protected readonly entityName = 'Address'
}
