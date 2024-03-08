import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { AddressResolver } from './address.resolver'
import { AddressService } from './address.service'
import { Address } from './address.entity'

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [Address] })],
    providers: [AddressService, AddressResolver],
    exports: [AddressService],
})
export class AddressModule {}
