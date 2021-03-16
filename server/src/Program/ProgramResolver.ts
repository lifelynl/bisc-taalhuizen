import { Args, ArgsType, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { OldProgramRepository } from './OldProgramRepository'

@ObjectType()
export class ProgramType {
    @Field()
    public id!: string

    @Field()
    public name!: string
}

@ObjectType()
export class ProgramEdgeType {
    @Field()
    public node!: ProgramType
}

@ArgsType()
class EnrollPersonInProgramArgs {
    @Field()
    public personId!: string

    @Field()
    public programId!: string
}

@Resolver(() => ProgramType)
export class ProgramResolver {
    public constructor(private programRepository: OldProgramRepository) {}

    @Query(() => [ProgramEdgeType])
    public async programs(): Promise<ProgramEdgeType[]> {
        const result = await this.programRepository.findPrograms()

        return result
    }

    @Query(() => [ProgramType])
    public async myPrograms(): Promise<ProgramType[]> {
        const result = await this.programRepository.findProgramsByPerson('/people/1db5d8ee-fe16-4303-b2bb-577621068c75')

        return result
    }

    @Mutation(() => Boolean)
    public async enrollPersonInProgram(@Args() args: EnrollPersonInProgramArgs): Promise<boolean> {
        const result = this.programRepository.createParticipant(args.personId, args.programId)

        return result
    }
}
