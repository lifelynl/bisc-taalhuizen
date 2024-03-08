import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { LearningNeedOutcomeModule } from '../learningNeedOutcome/learningNeedOutcome.module'
import { Participation } from '../participation/participation.entity'
import { Student } from '../student/student.entity'
import { TestResult } from './testResult.entity'
import { TestResultResolver } from './testResult.resolver'
import { TestResultService } from './testResult.service'

@Module({
    imports: [
        MikroOrmModule.forFeature({ entities: [TestResult, Participation, Student, LearningNeedOutcome] }),
        LearningNeedOutcomeModule,
    ],
    providers: [TestResultService, TestResultResolver],
    exports: [TestResultService],
})
export class TestResultModule {}
