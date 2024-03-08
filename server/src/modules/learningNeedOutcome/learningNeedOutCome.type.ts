import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsOptional, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { LearningResultApplication, LearningResultLevel, LearningResultSubject } from './learningNeedOutcome.entity'

@ObjectType()
export class LearningNeedOutcomeType extends BaseEntityObjectType {
    @Field(() => LearningResultSubject, { nullable: true })
    public subject: LearningResultSubject

    @Field(() => String, { nullable: true })
    public subjectOther: string

    @Field(() => LearningResultApplication, { nullable: true })
    public application: LearningResultApplication

    @Field(() => String, { nullable: true })
    public applicationOther: string

    @Field(() => LearningResultLevel, { nullable: true })
    public level: LearningResultLevel

    @Field(() => String, { nullable: true })
    public levelOther: string
}

@InputType()
export class LearningNeedOutcomeInputType {
    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsUUID()
    public id?: string

    @Field(() => LearningResultSubject, { nullable: true })
    @IsOptional()
    public subject?: LearningResultSubject

    @Field(() => LearningResultApplication, { nullable: true })
    @IsOptional()
    public application?: LearningResultApplication

    @Field(() => LearningResultLevel, { nullable: true })
    @IsOptional()
    public level?: LearningResultLevel

    @Field({ nullable: true })
    @IsOptional()
    public subjectOther?: string

    @Field({ nullable: true })
    @IsOptional()
    public applicationOther?: string

    @Field({ nullable: true })
    @IsOptional()
    public levelOther?: string
}

@InputType()
export class CreateLearningNeedOutcomeInputType extends LearningNeedOutcomeInputType {}

@InputType()
export class CreateOrEditLearningNeedOutcomeInputType extends LearningNeedOutcomeInputType {
    @Field(() => ID, { nullable: true })
    @IsUUID()
    @IsOptional()
    public id: string
}
