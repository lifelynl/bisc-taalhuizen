import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsDate, IsOptional } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { dateMiddleware } from 'src/utils/graphql/DateMiddleware'
import { CivicIntegrationReason, CivicIntegrationRequirement } from './civicIntegration.entity'

@ObjectType()
export class CivicIntegrationType extends BaseEntityObjectType {
    @Field(() => CivicIntegrationReason, { nullable: true })
    public reason: CivicIntegrationReason

    @Field(() => CivicIntegrationRequirement, { nullable: true })
    public requirement: CivicIntegrationRequirement

    @Field(() => String, { middleware: [dateMiddleware], nullable: true })
    public finishDate: Date
}

@InputType()
export class CreateCivicIntegrationInputType {
    @Field(() => CivicIntegrationReason, { nullable: true })
    @IsOptional()
    public reason?: CivicIntegrationReason

    @Field(() => CivicIntegrationRequirement, { nullable: true })
    @IsOptional()
    public requirement?: CivicIntegrationRequirement

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsDate()
    public finishDate?: Date
}

@InputType()
export class EditNestedCivicIntegrationInputType {
    @Field({ nullable: true })
    @IsOptional()
    public reason?: CivicIntegrationReason

    @Field({ nullable: true })
    @IsOptional()
    public requirement?: CivicIntegrationRequirement

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsDate()
    public finishDate?: Date
}
