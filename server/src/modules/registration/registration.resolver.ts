import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { PersonRepository } from '../person/person.repository'
import { RegistrationType } from './registration.type'
import { LearningNeedOutcomeRepository } from '../learningNeedOutcome/learningNeedOutcome.repository'

@Resolver(RegistrationType)
export class RegistrationResolver {
    public constructor(
        private readonly personRepository: PersonRepository,
        private readonly learningNeedOutcomeRepository: LearningNeedOutcomeRepository
    ) {}

    @ResolveField()
    public async referringPerson(@Parent() registration: RegistrationType) {
        return this.personRepository.getForRegistrationReferrer(registration.id)
    }

    @ResolveField()
    public async desiredLearningNeedOutcome(@Parent() registration: RegistrationType) {
        return this.learningNeedOutcomeRepository.findOne({ registration: registration.id })
    }
}
