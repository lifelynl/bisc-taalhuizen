import { Entity, EntityRepositoryType, Enum, OneToOne, Property } from '@mikro-orm/core'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { LearningNeedOutcome } from '../learningNeedOutcome/learningNeedOutcome.entity'
import { Participation } from '../participation/participation.entity'
import { TestResultRepository } from './testResult.repository'

export enum DidAchieveResultResponse {
    yes = 'yes',
    no = 'no',
    partly = 'partly',
}

export enum UnsuccessfulResultReasonResponse {
    quit = 'quit',
    tooDifficult = 'tooDifficult',
    notNeeded = 'notNeeded',
}

export enum AchievedResultResponse {
    satisfactory = 'satisfactory',
    newLearningNeedAdded = 'newLearningNeedAdded',
    other = 'other',
}

@Entity({ customRepository: () => TestResultRepository })
export class TestResult extends CustomBaseEntity {
    public [EntityRepositoryType]?: TestResultRepository

    @Property({ nullable: true })
    public examDate?: Date

    @Property({ nullable: true })
    public memo?: string

    @Property({ nullable: true })
    public usedExam?: string

    @OneToOne({ onDelete: 'cascade' })
    public learningNeedOutcome: LearningNeedOutcome

    @Property({ persist: false })
    public get learningNeedOutcomeId() {
        return this.learningNeedOutcome.id
    }

    @OneToOne({ onDelete: 'cascade' })
    public participation: Participation

    @Property({ persist: false })
    public get participationId() {
        return this.participation.id
    }

    @Enum(() => DidAchieveResultResponse)
    @Property()
    public didAchieveResultResponse?: DidAchieveResultResponse

    @Enum(() => UnsuccessfulResultReasonResponse)
    @Property()
    public unsuccessfulResultReasonResponse?: UnsuccessfulResultReasonResponse

    @Enum(() => AchievedResultResponse)
    @Property()
    public achievedResultResponse?: AchievedResultResponse

    @Property()
    public achievedResultResponseOther?: string | null
}
