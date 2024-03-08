import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { LearningNeed } from '../learningneed/learningneed.entity'
import { Organization } from '../organization/organization.entity'
import { Participation } from '../participation/participation.entity'
import { Student } from '../student/student.entity'
import { ExportController } from './export.controller'
import { ExportService } from './export.service'

@Module({
    imports: [MikroOrmModule.forFeature([Organization, LearningNeed, Student, Participation])],
    providers: [ExportService],
    exports: [],
    controllers: [ExportController],
})
export class ExportModule {}
