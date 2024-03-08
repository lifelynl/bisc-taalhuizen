import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Organization } from '../organization/organization.entity'
import { PostalCodeArea } from './postalCodeArea.entity'
import { PostalCodeAreaResolver } from './postalCodeArea.resolver'
import { PostalCodeAreaService } from './postalCodeArea.service'

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [PostalCodeArea, Organization] })],
    providers: [PostalCodeAreaService, PostalCodeAreaResolver],
    exports: [PostalCodeAreaService],
})
export class PostalCodeAreaModule {}
