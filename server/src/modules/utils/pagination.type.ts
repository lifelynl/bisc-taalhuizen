import { ObjectType, Field, Int, InputType } from '@nestjs/graphql'
import { Type } from '@nestjs/common'
import { IsOptional } from 'class-validator'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function paginatedTypes<T>(type: Type<T>): any {
    const { name } = type
    @ObjectType(`Paginated${name}`, { isAbstract: true })
    class paginationType {
        public name = `Paginated${name}`

        @Field({ nullable: true })
        public hasMore!: boolean

        @Field(() => Int, { nullable: true })
        public totalCount!: number

        @Field(() => [type])
        public nodes!: T[]
    }

    return paginationType
}

@InputType()
export class PaginatedInputType {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    public skip?: number

    @Field(() => Int, { nullable: true })
    @IsOptional()
    public take?: number
}
