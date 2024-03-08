import { registerEnumType } from '@nestjs/graphql'

export enum SortInput {
    ASC = 'ASC',
    DESC = 'DESC',
}
registerEnumType(SortInput, { name: 'SortInput' })
