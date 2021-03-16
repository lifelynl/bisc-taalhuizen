import { Args, ArgsType, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { PersonRepository } from '../CommonGroundAPI/cc/PersonRepository'

@ObjectType()
export class PersonType {
    @Field()
    public id!: string

    @Field()
    public name!: string
}

@ObjectType()
export class PersonEdgeType {
    @Field()
    public node!: PersonType
}

@ArgsType()
class AddPersonArgs {
    @Field()
    public name!: string
}

@Resolver(() => PersonType)
export class PersonResolver {
    public constructor(private personRepository: PersonRepository) {}

    @Query(() => [PersonEdgeType])
    public async persons(): Promise<PersonEdgeType[]> {
        const result = await this.personRepository.findPersons()

        return result as any
    }

    @Mutation(() => PersonEdgeType)
    public async addPerson(@Args() args: AddPersonArgs): Promise<PersonEdgeType> {
        return {
            node: {
                id: 'id',
                name: args.name,
            },
        }
    }
}
