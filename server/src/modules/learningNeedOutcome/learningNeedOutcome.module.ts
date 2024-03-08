import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { LearningNeedOutcome } from './learningNeedOutcome.entity'
import { LearningNeedOutcomeService } from './learningNeedOutcome.service'

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [LearningNeedOutcome] })],
    providers: [LearningNeedOutcomeService],
    exports: [LearningNeedOutcomeService],
})
export class LearningNeedOutcomeModule {}
