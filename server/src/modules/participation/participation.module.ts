import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { EducationGroup } from '../educationGroup/educationGroup.entity'
import { Employee } from '../employee/employee.entity'
import { LearningNeed } from '../learningneed/learningneed.entity'
import { LearningNeedModule } from '../learningneed/learningneed.module'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { LearningNeedOutcomeModule } from '../learningNeedOutcome/learningNeedOutcome.module'
import { Organization } from '../organization/organization.entity'
import { TestResult } from '../testResult/testResult.entity'
import { TestResultModule } from '../testResult/testResult.module'
import { Participation } from './participation.entity'
import { ParticipationResolver } from './participation.resolver'
import { ParticipationService } from './participation.service'

@Module({
    providers: [ParticipationResolver, ParticipationService],
    exports: [ParticipationService],
    imports: [
        MikroOrmModule.forFeature({
            entities: [
                Employee,
                Organization,
                Participation,
                LearningNeed,
                TestResult,
                EducationGroup,
                LearningNeedOutcome,
            ],
        }),
        LearningNeedModule,
        LearningNeedOutcomeModule,
        TestResultModule,
    ],
})
export class ParticipationModule {}
