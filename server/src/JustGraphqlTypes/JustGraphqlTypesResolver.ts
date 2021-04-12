import { Args, Field, InputType, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@InputType()
class CreateBiscEmployeeInputType {
    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    @IsEmail()
    public email!: string

    @Field({ nullable: true })
    public telephone?: string
}

@InputType()
class UpdateBiscEmployeeInputType {
    @Field()
    public biscEmployeeId!: string

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    @IsEmail()
    public email!: string

    @Field({ nullable: true })
    public telephone?: string
}

@ObjectType()
export class BiscEmployeeType {
    @Field()
    public id!: string

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    public email!: string

    @Field({ nullable: true })
    public telephone?: string

    @Field()
    public dateCreated?: string

    @Field()
    public dateModified?: string
}

@ObjectType()
class DownloadReportType {
    @Field()
    public filename!: string

    @Field()
    public base64data!: string
}

@InputType()
class DownloadParticipantReportInputType {
    @Field()
    public taalhuisId!: string

    @Field({ nullable: true })
    public dateFrom?: string

    @Field({ nullable: true })
    public dateUntil?: string
}

@Resolver()
export class JustGraphqlTypesResolver {
    // BiscEmployee
    @Mutation(() => BiscEmployeeType)
    public async createBiscEmployee(@Args('input') input: CreateBiscEmployeeInputType) {
        return undefined
    }

    @Mutation(() => BiscEmployeeType)
    public async updateBiscEmployee(@Args('input') input: UpdateBiscEmployeeInputType) {
        return undefined
    }

    @Mutation(() => Boolean)
    public async deleteBiscEmployee(@Args('biscEmployeeId') biscEmployeeId: string): Promise<boolean> {
        return true
    }

    @Query(() => BiscEmployeeType)
    public async biscEmployee(@Args('biscEmployeeId') biscEmployeeId: string) {
        return undefined
    }

    @Query(() => [BiscEmployeeType])
    public async biscEmployees() {
        return undefined
    }

    // Participants report
    @Mutation(() => DownloadReportType)
    public async downloadParticipantsReport(@Args('input') input: DownloadParticipantReportInputType) {
        return undefined
    }
}
