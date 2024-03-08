import { QBQueryOrderMap } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { set } from 'lodash'
import { LearningNeedOutcomeService } from '../learningNeedOutcome/learningNeedOutcome.service'
import { OrganizationTypeEnum } from '../organization/organization.entity'
import { OrganizationRepository } from '../organization/organization.repository'
import { StudentRepository } from '../student/student.repository'
import { PaginatedInputType } from '../utils/pagination.type'
import { LearningneedPolicy } from '../utils/policy/learningneed.policy'
import { PolicyAction } from '../utils/policy/policy'
import { LearningNeed } from './learningneed.entity'
import { LearningNeedRepository } from './learningneed.repository'
import { CreateLearningNeedInputType, EditLearningNeedInputType, LearningNeedsSortInputType } from './learningneed.type'
import { ParticipationRepository } from '../participation/participation.repository'
import { ModuleRef } from '@nestjs/core'
import { Participation, ParticipationProviderOption } from '../participation/participation.entity'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class LearningNeedService {
    public constructor(
        private readonly moduleRef: ModuleRef,
        private readonly learningNeedRepository: LearningNeedRepository,
        private readonly learningNeedOutcomeService: LearningNeedOutcomeService,
        private readonly learningNeedPolicy: LearningneedPolicy,
        private readonly studentRepository: StudentRepository,
        private readonly organizationRepository: OrganizationRepository,
        private readonly participationRepository: ParticipationRepository
    ) {}

    public async getLearningNeed(user: UserWithCurrentEmployee, id: string) {
        const learningNeed = await this.learningNeedRepository.findOneOrFail({ id })

        await this.learningNeedPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            studentId: learningNeed.studentId,
        })

        return learningNeed
    }

    public async getLearningNeeds(
        user: UserWithCurrentEmployee,
        studentId: string,
        paginationArgs: PaginatedInputType,
        sort?: LearningNeedsSortInputType
    ) {
        await this.learningNeedPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { studentId })

        const qb = this.learningNeedRepository.createQueryBuilder()

        qb.andWhere({ student: studentId })

        if (sort) {
            const { learningNeedDescription, organizationName, providerExplanation, providerName } = sort
            const orderBy: QBQueryOrderMap<LearningNeed> = {}

            if (learningNeedDescription) {
                set(orderBy, 'description.learningNeedDescription', learningNeedDescription)
            }

            if (organizationName) {
                set(orderBy, 'student.organization.name', organizationName)
            }

            if (providerExplanation) {
                set(orderBy, 'participations.providerExplanation', providerExplanation)
            }

            if (providerName) {
                set(orderBy, 'participations.provider.name', providerName)
            }

            qb.orderBy(orderBy)
        }

        return this.learningNeedRepository.queryPaginated(qb, paginationArgs.take, paginationArgs.skip)
    }

    public async createLearningNeed(user: UserWithCurrentEmployee, input: CreateLearningNeedInputType) {
        const student = await this.studentRepository.findOneOrFail(input.student)

        await this.learningNeedPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, {
            studentId: input.student,
        })

        const newLearningNeed = new LearningNeed()

        newLearningNeed.student = student
        newLearningNeed.agreements = input.agreements
        newLearningNeed.description = input.description
        newLearningNeed.motivation = input.motivation
        newLearningNeed.advisedOffer = input.advisedOffer
        newLearningNeed.desiredOffer = input.desiredOffer
        newLearningNeed.offerDifference = input.offerDifference
        newLearningNeed.offerDifferenceOther = input.offerDifferenceOther

        if (input.desiredLearningNeedOutcome !== undefined) {
            newLearningNeed.desiredLearningNeedOutcome =
                await this.learningNeedOutcomeService.updateOrGetNewWithoutPersist(input.desiredLearningNeedOutcome)
        }

        if (user.accessGroup === OrganizationTypeEnum.provider) {
            const provider = await this.organizationRepository.getForEmployee(user.currentEmployee.id)
            if (!provider) {
                throw new DomainError('provider not found')
            }

            newLearningNeed.createdByProvider = provider

            const participation = new Participation()
            participation.provider = provider
            participation.providerOption = ParticipationProviderOption.provider
            participation.learningNeed = newLearningNeed
            participation.cascadeOnLearningNeedDelete = true
            this.learningNeedRepository.persist(participation)
        }

        this.learningNeedRepository.persist(newLearningNeed)
        await this.learningNeedRepository.flush()

        return newLearningNeed
    }

    public async editLearningNeed(user: UserWithCurrentEmployee, input: EditLearningNeedInputType) {
        const {
            agreements,
            id,
            motivation,
            description,
            advisedOffer,
            desiredOffer,
            offerDifference,
            offerDifferenceOther,
        } = input

        const learningNeed = await this.learningNeedRepository.findOneOrFail(id)

        await this.learningNeedPolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, {
            studentId: learningNeed.studentId,
            learningneedId: learningNeed.id,
        })

        if (agreements !== undefined) {
            learningNeed.agreements = agreements
        }
        if (motivation !== undefined) {
            learningNeed.motivation = motivation
        }
        if (description !== undefined) {
            learningNeed.description = description
        }
        if (advisedOffer !== undefined) {
            learningNeed.advisedOffer = advisedOffer
        }
        if (desiredOffer !== undefined) {
            learningNeed.desiredOffer = desiredOffer
        }
        if (offerDifference !== undefined) {
            learningNeed.offerDifference = offerDifference
        }
        if (offerDifferenceOther !== undefined) {
            learningNeed.offerDifferenceOther = offerDifferenceOther
        }

        if (input.desiredLearningNeedOutcome !== undefined) {
            learningNeed.desiredLearningNeedOutcome =
                await this.learningNeedOutcomeService.updateOrGetNewWithoutPersist(
                    input.desiredLearningNeedOutcome,
                    learningNeed.desiredLearningNeedOutcomeId
                )
        }

        await this.learningNeedRepository.persistAndFlush(learningNeed)

        return this.learningNeedRepository.findOneOrFail({ id })
    }

    public async deleteLearningNeed(user: UserWithCurrentEmployee, id: string) {
        const learningNeed = await this.learningNeedRepository.findOneOrFail({ id })

        await this.learningNeedPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, {
            studentId: learningNeed.studentId,
            learningneedId: learningNeed.id,
        })

        const participationsToDelete = await this.participationRepository.find({
            learningNeed,
            cascadeOnLearningNeedDelete: true,
        })

        if (participationsToDelete.length) {
            this.learningNeedRepository.remove(participationsToDelete)
        }

        this.learningNeedRepository.remove(learningNeed)
        await this.learningNeedRepository.flush()

        return true
    }

    public async getCreatedByOrganization(learningNeedId: string) {
        const res = await this.learningNeedRepository.getLearningNeedWithStudent(learningNeedId)

        if (!res) {
            throw new DomainError('learningNeed not found')
        }

        if (res.createdByProviderId) {
            return this.organizationRepository.findOneOrFail(res.createdByProviderId)
        }

        return this.organizationRepository.findOneOrFail(res.student.organizationId)
    }
}
