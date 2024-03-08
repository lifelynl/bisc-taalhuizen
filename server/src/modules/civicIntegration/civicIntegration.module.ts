import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { CivicIntegration } from './civicIntegration.entity'
import { CivicIntegrationService } from './civicIntegration.service'

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [CivicIntegration] })],
    providers: [CivicIntegrationService],
    exports: [CivicIntegrationService],
})
export class CivicIntegrationModule {}
