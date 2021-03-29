import { ApolloError } from '@apollo/client'
import { ContextUserType } from '../../../generated/graphql'

export interface SessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    user?: User | null
}

export type User = ContextUserType
