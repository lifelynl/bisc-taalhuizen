import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { PersonType } from '../person/person.type'
import { EmployeeType } from '../employee/employee.type'

@ObjectType()
export class UserType extends BaseEntityObjectType {
    @Field(() => String)
    public id: string

    @Field(() => String)
    public username: string

    @Field(() => String)
    public locale: string

    @Field(() => PersonType, { nullable: true })
    public person?: PersonType

    @Field(() => EmployeeType, { nullable: true, description: 'the current employee for the logged in user' })
    public currentEmployee?: EmployeeType
}
