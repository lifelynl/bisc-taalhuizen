import { ArgsType, Field } from '@nestjs/graphql'
import { DeleteAanbiederInput } from '../DeleteAanbiederService'

@ArgsType()
export class DeleteAanbiederInputType implements DeleteAanbiederInput {
    @Field()
    public id!: string
}
