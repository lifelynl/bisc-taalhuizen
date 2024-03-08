import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { IsNotBlankString } from 'src/utils/graphql/IsNotBlankString'
import paginationType from '../utils/pagination.type'

@ObjectType()
export class PostalCodeAreaType extends BaseEntityObjectType {
    @Field(() => String)
    public id: string

    @Field(() => Int)
    public code: number
}

@ObjectType()
export class PaginatedPostalCodeAreaResponse extends paginationType<PostalCodeAreaType>(PostalCodeAreaType) {}

@ArgsType()
export class GetAvailablePostCodeAreaArgs {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotBlankString()
    public search?: string
}

@ArgsType()
export class GetPostalCodeAreasForOrganizationArgs {
    @Field(() => String, { nullable: false })
    @IsUUID()
    public organizationId: string

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    public hasNoTeam?: boolean
}
