import { Test } from '@nestjs/testing'
import { EmployeeRepository } from '../employee/employee.repository'
import { LearningNeedOutcomeRepository } from '../learningNeedOutcome/learningNeedOutcome.repository'
import { LearningNeedOutcomeService } from '../learningNeedOutcome/learningNeedOutcome.service'
import { OrganizationRepository } from '../organization/organization.repository'
import { ParticipationRepository } from '../participation/participation.repository'
import { StudentRepository } from '../student/student.repository'
import { LearningneedPolicy } from '../utils/policy/learningneed.policy'
import { PolicyAction } from '../utils/policy/policy'
import { OfferDifference } from './learningneed.entity'
import { LearningNeedRepository } from './learningneed.repository'
import { LearningNeedResolver } from './learningneed.resolver'
import { LearningNeedService } from './learningneed.service'
import { CreateLearningNeedInputType, EditLearningNeedInputType } from './learningneed.type'
import { ParticipationModule } from '../participation/participation.module'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

describe(LearningNeedService.name, () => {
    const findOneOrFail = jest.fn()
    const persistAndFlush = jest.fn()
    const findOne = jest.fn()

    const throwIfNotSatisfiedBy = jest.fn()
    const studentPolicyFn = jest.fn()
    const remove = jest.fn()

    let learningNeedService: LearningNeedResolver

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                LearningNeedService,
                LearningNeedResolver,
                {
                    provide: LearningNeedRepository,
                    useValue: { persistAndFlush, findOneOrFail, remove, flush: jest.fn() },
                },
                { provide: StudentRepository, useValue: { findOneOrFail } },
                { provide: LearningneedPolicy, useValue: { throwIfNotSatisfiedBy } },
                { provide: EmployeeRepository, useValue: { findOne } },
                OrganizationRepository,
                { provide: ParticipationRepository, useValue: { find: jest.fn().mockResolvedValue([]) } },
                LearningNeedOutcomeService,
                LearningNeedOutcomeRepository,
                ParticipationModule,
            ],
        }).compile()
        learningNeedService = module.get(LearningNeedService)
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('learningneed create', () => {
        const mockInput: CreateLearningNeedInputType = {
            student: 'some-student-id',
            agreements: 'some-agreement',
            description: 'some-description',
            motivation: 'some-motivation',
            advisedOffer: 'some-advised-offer',
            desiredOffer: 'some-desired-offer',
            offerDifference: OfferDifference.no,
            offerDifferenceOther: 'some-offer-difference-other',
            desiredLearningNeedOutcome: {},
        }
        it('should check access', async () => {
            try {
                await learningNeedService.createLearningNeed({} as UserWithCurrentEmployee, mockInput)
            } catch {}

            expect(throwIfNotSatisfiedBy).toBeCalledTimes(1)
            expect(throwIfNotSatisfiedBy).toBeCalledWith({}, PolicyAction.create, {
                studentId: mockInput.student,
            })
        })

        it('should create learningneed for student', async () => {
            studentPolicyFn.mockResolvedValueOnce(null)

            try {
                await expect(
                    learningNeedService.createLearningNeed({} as UserWithCurrentEmployee, mockInput)
                ).resolves.toMatchObject({
                    advisedOffer: mockInput.desiredOffer,
                    agreements: mockInput.agreements,
                    description: mockInput.description,
                    desiredOffer: mockInput.desiredOffer,
                    motivation: mockInput.motivation,
                    offerDifference: mockInput.offerDifference,
                    offerDifferenceOther: mockInput.offerDifferenceOther,
                })
            } catch {}

            expect(findOneOrFail).toBeCalledWith(mockInput.student)
        })
    })
    describe('learningneed edit', () => {
        const studentId = 'some-student-id'
        findOneOrFail.mockResolvedValue({ studentId })
        const mockInput: EditLearningNeedInputType = {
            id: 'some-id',
            agreements: 'some-agreement',
            description: 'some-description',
            motivation: 'some-motivation',
            advisedOffer: 'some-advised-offer',
            desiredOffer: 'some-desired-offer',
            offerDifference: OfferDifference.no,
            offerDifferenceOther: 'some-offer-difference-other',
        }
        it('should check access', async () => {
            try {
                await learningNeedService.editLearningNeed({} as UserWithCurrentEmployee, mockInput)
            } catch {}

            expect(throwIfNotSatisfiedBy).toBeCalledTimes(1)
            expect(throwIfNotSatisfiedBy).toBeCalledWith({}, PolicyAction.update, {
                studentId,
            })
        })

        it('should edit learningneed for student', async () => {
            studentPolicyFn.mockResolvedValueOnce(null)

            try {
                await expect(
                    learningNeedService.editLearningNeed({} as UserWithCurrentEmployee, mockInput)
                ).resolves.toMatchObject({
                    advisedOffer: mockInput.desiredOffer,
                    agreements: mockInput.agreements,
                    description: mockInput.description,
                    desiredOffer: mockInput.desiredOffer,
                    motivation: mockInput.motivation,
                    offerDifference: mockInput.offerDifference,
                    offerDifferenceOther: mockInput.offerDifferenceOther,
                })
            } catch {}

            expect(findOneOrFail).toBeCalledWith(mockInput.id)
        })
    })

    describe('learningneed delete', () => {
        const studentId = 'some-student-id'
        const learningNeedId = 'some-id'
        it('should check access', async () => {
            findOneOrFail.mockResolvedValue({ studentId })
            try {
                await learningNeedService.deleteLearningNeed({} as UserWithCurrentEmployee, learningNeedId)
            } catch {}

            expect(throwIfNotSatisfiedBy).toBeCalledTimes(1)
            expect(throwIfNotSatisfiedBy).toBeCalledWith({}, PolicyAction.delete, {
                studentId,
            })
        })

        it('should delete learningneed', async () => {
            studentPolicyFn.mockResolvedValueOnce(null)
            findOneOrFail.mockResolvedValue({ id: 'some-id' })

            await expect(
                learningNeedService.deleteLearningNeed({} as UserWithCurrentEmployee, learningNeedId)
            ).resolves.toBe(true)
            expect(remove).toBeCalled()
            expect(remove).toBeCalledWith({ id: 'some-id' })
        })
    })
})
