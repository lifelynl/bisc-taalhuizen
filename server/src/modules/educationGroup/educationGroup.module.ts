import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Employee } from '../employee/employee.entity'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { LearningNeedOutcomeModule } from '../learningNeedOutcome/learningNeedOutcome.module'
import { Organization } from '../organization/organization.entity'
import { Participation } from '../participation/participation.entity'
import { ParticipationModule } from '../participation/participation.module'
import { EducationGroup } from './educationGroup.entity'
import { EducationGroupResolver } from './educationGroup.resolver'
import { EducationGroupService } from './educationGroup.service'

@Module({
    providers: [EducationGroupResolver, EducationGroupService],
    exports: [EducationGroupService],
    imports: [
        MikroOrmModule.forFeature({
            entities: [EducationGroup, Organization, Employee, LearningNeedOutcome, Participation],
        }),
        LearningNeedOutcomeModule,
        ParticipationModule,
    ],
})
export class EducationGroupModule {}
