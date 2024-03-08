import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { IsOptional, IsUUID, ValidateIf } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { IsNotBlankString } from 'src/utils/graphql/IsNotBlankString'
import {
    EducationCurrentlyFollowingStatusEnum,
    EducationGroupTypeEnum,
    EducationLevelEnum,
    CourseTeacherTypeEnum,
    EducationTypeEnum,
    EducationNameEnum,
} from './education.entity'

@ObjectType()
export class EducationType extends BaseEntityObjectType {
    @Field(() => EducationNameEnum)
    public name: EducationNameEnum

    @Field()
    public type: EducationTypeEnum

    @Field(() => EducationLevelEnum, { nullable: true })
    public level?: EducationLevelEnum

    @Field({ nullable: true })
    public levelOther?: string

    @Field({ nullable: true })
    public degree?: boolean

    @Field({ nullable: true })
    public degreeGranted?: boolean

    @Field({ nullable: true })
    public other?: string

    @Field(() => EducationCurrentlyFollowingStatusEnum, { nullable: true })
    public currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum

    @Field({ nullable: true })
    public startDate?: string

    @Field({ nullable: true })
    public endDate?: string

    @Field(() => Int, { nullable: true })
    public yearsFollowed?: number

    @Field({ nullable: true })
    public institution?: string

    @Field(() => EducationGroupTypeEnum, { nullable: true })
    public group?: EducationGroupTypeEnum

    @Field(() => CourseTeacherTypeEnum, { nullable: true })
    public courseTeacherType?: CourseTeacherTypeEnum

    @Field(() => Int, { nullable: true })
    public hours?: number
}

@InputType()
export class CreateEducationInputType {
    @Field()
    public name: EducationNameEnum

    @Field(() => EducationTypeEnum)
    public type: EducationTypeEnum

    @Field(() => EducationLevelEnum, { nullable: true })
    @IsOptional()
    public level?: EducationLevelEnum

    @Field({ nullable: true })
    @ValidateIf(o => o.level === EducationLevelEnum.other)
    @IsNotBlankString()
    public levelOther?: string

    @Field({ nullable: true })
    @IsOptional()
    public degree?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public degreeGranted?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public other?: string

    @Field(() => EducationCurrentlyFollowingStatusEnum, { nullable: true })
    @IsOptional()
    public currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum

    @Field({ nullable: true })
    @IsOptional()
    public startDate?: string

    @Field({ nullable: true })
    @IsOptional()
    public endDate?: string

    @Field(() => Int, { nullable: true })
    @IsOptional()
    public yearsFollowed?: number

    @Field({ nullable: true })
    @IsOptional()
    public institution?: string

    @Field(() => EducationGroupTypeEnum, { nullable: true })
    @IsOptional()
    public group?: EducationGroupTypeEnum

    @Field(() => CourseTeacherTypeEnum, { nullable: true })
    @IsOptional()
    public courseTeacherType?: CourseTeacherTypeEnum

    @Field(() => Int, { nullable: true })
    @IsOptional()
    public hours?: number
}

@InputType()
export class EditNestedEducationInputType {
    @Field({ nullable: true })
    @IsUUID()
    @IsOptional()
    public id?: string

    @Field(() => EducationNameEnum, { nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public name?: EducationNameEnum

    @Field(() => EducationTypeEnum, { nullable: true })
    @IsOptional()
    public type?: EducationTypeEnum

    @Field(() => EducationLevelEnum, { nullable: true })
    @IsOptional()
    public level?: EducationLevelEnum

    @Field({ nullable: true })
    @ValidateIf(o => o.level === EducationLevelEnum.other)
    @IsNotBlankString()
    public levelOther?: string

    @Field({ nullable: true })
    @IsOptional()
    public degree?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public degreeGranted?: boolean

    @Field({ nullable: true })
    @IsOptional()
    public other?: string

    @Field(() => EducationCurrentlyFollowingStatusEnum, { nullable: true })
    @IsOptional()
    public currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum

    @Field({ nullable: true })
    @IsOptional()
    public startDate?: string

    @Field({ nullable: true })
    @IsOptional()
    public endDate?: string

    @Field(() => Int, { nullable: true })
    @IsOptional()
    public yearsFollowed?: number

    @Field({ nullable: true })
    @IsOptional()
    public institution?: string

    @Field(() => EducationGroupTypeEnum, { nullable: true })
    @IsOptional()
    public group?: EducationGroupTypeEnum

    @Field(() => CourseTeacherTypeEnum, { nullable: true })
    @IsOptional()
    public courseTeacherType?: CourseTeacherTypeEnum

    @Field(() => Int, { nullable: true })
    @IsOptional()
    public hours?: number
}
