import { Field, ID, ObjectType } from '@nestjs/graphql'
import { dateMiddleware } from './DateMiddleware'

@ObjectType({ isAbstract: true })
export abstract class BaseEntityObjectType {
    @Field(() => ID)
    public id: string

    @Field(() => String, { middleware: [dateMiddleware] })
    public createdAt: Date

    @Field(() => String, { middleware: [dateMiddleware] })
    public updatedAt: Date
}
