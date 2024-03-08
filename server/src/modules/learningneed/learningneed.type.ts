import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { IsNotBlankString } from 'src/utils/graphql/IsNotBlankString'
import { SortInput } from 'src/utils/graphql/SortingInputField'
import {
    CreateLearningNeedOutcomeInputType,
    CreateOrEditLearningNeedOutcomeInputType,
    LearningNeedOutcomeType,
} from '../learningNeedOutcome/learningNeedOutCome.type'
import { Organization } from '../organization/organization.entity'
import { OrganizationType } from '../organization/organization.type'
import { ParticipationType } from '../participation/participation.type'
import { StudentType } from '../student/student.type'
import paginationType from '../utils/pagination.type'
import { OfferDifference } from './learningneed.entity'

@ObjectType()
export class LearningNeedType extends BaseEntityObjectType {
    @Field(() => StudentType)
    public student: StudentType

    @Field(() => String)
    public description: string

    @Field(() => String)
    public motivation: string

    @Field(() => LearningNeedOutcomeType, { nullable: true })
    public desiredLearningNeedOutcome: LearningNeedOutcomeType

    @Field(() => String, { nullable: true })
    public advisedOffer: string

    @Field(() => String, { nullable: true })
    public desiredOffer: string

    @Field(() => OfferDifference, { nullable: true })
    public offerDifference: OfferDifference

    @Field(() => String, { nullable: true })
    public offerDifferenceOther: string

    @Field(() => String, { nullable: true })
    public agreements: string

    @Field(() => [ParticipationType], { nullable: true })
    public participations: ParticipationType[]

    @Field(() => OrganizationType)
    public createdByOrganization: Organization
}

@ObjectType()
export class PaginatedLearningNeedResponse extends paginationType<LearningNeedType>(LearningNeedType) {}

@InputType()
export class CreateLearningNeedInputType {
    @Field(() => String)
    public student: string

    @Field(() => String)
    @IsNotBlankString()
    public description: string

    @Field(() => String)
    @IsNotBlankString()
    public motivation: string

    @Field(() => CreateLearningNeedOutcomeInputType, { nullable: true })
    @IsOptional()
    public desiredLearningNeedOutcome?: CreateLearningNeedOutcomeInputType

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    public advisedOffer?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public desiredOffer?: string

    @Field(() => OfferDifference, { nullable: true })
    @IsOptional()
    public offerDifference?: OfferDifference

    @Field(() => String, { nullable: true })
    @IsOptional()
    public offerDifferenceOther?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public agreements?: string
}

@InputType()
export class EditLearningNeedInputType {
    @Field(() => String)
    public id: string

    @Field(() => String)
    @IsOptional()
    @IsNotBlankString()
    public description?: string

    @Field(() => String)
    @IsOptional()
    @IsNotBlankString()
    public motivation?: string

    @Field(() => CreateOrEditLearningNeedOutcomeInputType, { nullable: true })
    @IsOptional()
    public desiredLearningNeedOutcome?: CreateOrEditLearningNeedOutcomeInputType

    @Field(() => String, { nullable: true })
    @IsOptional()
    public advisedOffer?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public desiredOffer?: string

    @Field(() => OfferDifference, { nullable: true })
    @IsOptional()
    public offerDifference?: OfferDifference

    @Field(() => String, { nullable: true })
    @IsOptional()
    public offerDifferenceOther?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    public agreements?: string
}

@InputType()
export class LearningNeedsSortInputType {
    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public learningNeedDescription?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public organizationName?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public providerName?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public providerExplanation?: SortInput
}
