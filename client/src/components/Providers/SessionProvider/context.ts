import React from 'react'
import { ApolloError, ApolloQueryResult, FetchResult, QueryResult } from '@apollo/client'
import {
    CurrentUserQuery,
    LoginMutation,
    LoginMutationVariables,
    OrganizationTypeEnum,
} from 'graphql/v2/generated/graphql'
import { permissions } from 'utils/helpers'

interface SessionContextValue {
    loginLoading: boolean
    loginError: ApolloError | undefined
    login?: (args: LoginMutationVariables) => Promise<FetchResult<LoginMutation>>
    loggedInUser?: LoginMutation['login']
    hasMultipleEmployees?: boolean
    userLoading: boolean
    user?: CurrentUserQuery['currentUser'] & { accessGroup?: OrganizationTypeEnum }
    fetchUser?: (slug: string) => Promise<QueryResult<CurrentUserQuery, {}>>
    refetch?: () => Promise<ApolloQueryResult<CurrentUserQuery>>
    logout?: () => Promise<void>
    permissions: ReturnType<typeof permissions>
    organizationSlug?: string
}

const DefaultContextValues = {
    loginLoading: false,
    loginError: undefined,
    login: undefined,
    userLoading: false,
    user: undefined,
    logout: undefined,
    permissions: permissions(),
    organizationSlug: undefined,
}

export const SessionContext = React.createContext<SessionContextValue>(DefaultContextValues)
