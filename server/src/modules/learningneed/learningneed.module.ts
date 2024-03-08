import { Module } from '@nestjs/common'
import { LearningNeedService } from './learningneed.service'
import { LearningNeedResolver } from './learningneed.resolver'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { LearningNeed } from './learningneed.entity'
import { Student } from '../student/student.entity'
import { Participation } from '../participation/participation.entity'
import { LearningNeedOutcomeModule } from '../learningNeedOutcome/learningNeedOutcome.module'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { Organization } from '../organization/organization.entity'

@Module({
    imports: [
        MikroOrmModule.forFeature({
            entities: [LearningNeed, Student, Participation, LearningNeedOutcome, Organization],
        }),
        LearningNeedOutcomeModule,
    ],
    providers: [LearningNeedService, LearningNeedResolver],
    exports: [LearningNeedService],
})
export class LearningNeedModule {}
