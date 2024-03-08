import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Person } from '../person/person.entity'
import { PersonModule } from '../person/person.module'
import { Registration } from './registration.entity'
import { RegistrationResolver } from './registration.resolver'
import { RegistrationService } from './registration.service'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { LearningNeedOutcomeModule } from '../learningNeedOutcome/learningNeedOutcome.module'

@Module({
    imports: [
        MikroOrmModule.forFeature({ entities: [Registration, Person, LearningNeedOutcome] }),
        LearningNeedOutcomeModule,
        PersonModule,
    ],
    providers: [RegistrationResolver, RegistrationService],
    exports: [RegistrationService],
})
export class RegistrationModule {}
