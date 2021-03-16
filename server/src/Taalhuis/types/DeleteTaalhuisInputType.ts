import { ArgsType, Field } from '@nestjs/graphql'
import { DeleteTaalhuisInput } from '../DeleteTaalhuisService'

@ArgsType()
export class DeleteTaalhuisInputType implements DeleteTaalhuisInput {
    @Field()
    public id!: string
}
