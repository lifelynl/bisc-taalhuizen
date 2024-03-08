import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Education } from './education.entity'
import { EducationService } from './education.service'

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [Education] })],
    providers: [EducationService],
    exports: [EducationService],
})
export class EducationModule {}
