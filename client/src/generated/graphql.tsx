import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type PersonType = {
    __typename?: 'PersonType'
    id: Scalars['String']
    name: Scalars['String']
}

export type PersonEdgeType = {
    __typename?: 'PersonEdgeType'
    node: PersonType
}

export type ProgramType = {
    __typename?: 'ProgramType'
    id: Scalars['String']
    name: Scalars['String']
}

export type ProgramEdgeType = {
    __typename?: 'ProgramEdgeType'
    node: ProgramType
}

export type UserType = {
    __typename?: 'UserType'
    id: Scalars['String']
    username: Scalars['String']
}

export type RawReturnType = {
    __typename?: 'RawReturnType'
    accessToken: Scalars['String']
}

export type UserRoleType = {
    __typename?: 'UserRoleType'
    id: Scalars['String']
    name: Scalars['String']
}

export type TaalhuisEmployeeType = {
    __typename?: 'TaalhuisEmployeeType'
    id: Scalars['String']
    givenName: Scalars['String']
    additionalName: Scalars['String']
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<UserRoleType>
}

export type TaalhuisAddressType = {
    __typename?: 'TaalhuisAddressType'
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix: Scalars['String']
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type TaalhuisType = {
    __typename?: 'TaalhuisType'
    id: Scalars['String']
    name: Scalars['String']
    address: TaalhuisAddressType
    email: Scalars['String']
    telephone: Scalars['String']
}

export type Query = {
    __typename?: 'Query'
    persons: Array<PersonEdgeType>
    programs: Array<ProgramEdgeType>
    myPrograms: Array<ProgramType>
    taalhuizen: Array<TaalhuisType>
    userRolesByTaalhuisId: Array<UserRoleType>
    taalhuisEmployees: Array<TaalhuisEmployeeType>
    taalhuisEmployee: TaalhuisEmployeeType
}

export type QueryUserRolesByTaalhuisIdArgs = {
    taalhuisId: Scalars['String']
}

export type QueryTaalhuisEmployeesArgs = {
    taalhuisId: Scalars['String']
}

export type QueryTaalhuisEmployeeArgs = {
    employeeId: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    addPerson: PersonEdgeType
    enrollPersonInProgram: Scalars['Boolean']
    login: RawReturnType
    requestPasswordReset: Scalars['Boolean']
    resetPassword: Scalars['Boolean']
    changePassword: Scalars['Boolean']
    createTaalhuis: TaalhuisType
    updateTaalhuis: TaalhuisType
    deleteTaalhuis: Scalars['Boolean']
    createTaalhuisEmployee: TaalhuisEmployeeType
    updateTaalhuisEmployee: TaalhuisEmployeeType
}

export type MutationAddPersonArgs = {
    name: Scalars['String']
}

export type MutationEnrollPersonInProgramArgs = {
    personId: Scalars['String']
    programId: Scalars['String']
}

export type MutationLoginArgs = {
    username: Scalars['String']
    password: Scalars['String']
}

export type MutationRequestPasswordResetArgs = {
    email: Scalars['String']
}

export type MutationResetPasswordArgs = {
    email: Scalars['String']
    token: Scalars['String']
    password: Scalars['String']
}

export type MutationChangePasswordArgs = {
    currentPassword: Scalars['String']
    newPassword: Scalars['String']
}

export type MutationCreateTaalhuisArgs = {
    address: CreateTaalhuisAddressInputType
    name: Scalars['String']
    email: Scalars['String']
    phoneNumber: Scalars['String']
}

export type MutationUpdateTaalhuisArgs = {
    id: Scalars['String']
    address?: Maybe<UpdateTaalhuisAddressInputType>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationDeleteTaalhuisArgs = {
    id: Scalars['String']
}

export type MutationCreateTaalhuisEmployeeArgs = {
    input: CreateTaalhuisEmployeeInputType
}

export type MutationUpdateTaalhuisEmployeeArgs = {
    input: UpdateTaalhuisEmployeeInputType
}

export type CreateTaalhuisAddressInputType = {
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type UpdateTaalhuisAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type CreateTaalhuisEmployeeInputType = {
    taalhuisId: Scalars['String']
    userGroupId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
}

export type UpdateTaalhuisEmployeeInputType = {
    taalhuisId: Scalars['String']
    userGroupId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
    employeeId: Scalars['String']
}

export type AddPersonMutationVariables = Exact<{
    name: Scalars['String']
}>

export type AddPersonMutation = { __typename?: 'Mutation' } & {
    addPerson: { __typename?: 'PersonEdgeType' } & {
        node: { __typename?: 'PersonType' } & Pick<PersonType, 'id' | 'name'>
    }
}

export type ChangePasswordMutationVariables = Exact<{
    currentPassword: Scalars['String']
    newPassword: Scalars['String']
}>

export type ChangePasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'changePassword'>

export type EnrollPersonInProgramMutationVariables = Exact<{
    personId: Scalars['String']
    programId: Scalars['String']
}>

export type EnrollPersonInProgramMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'enrollPersonInProgram'>

export type LoginMutationVariables = Exact<{
    username: Scalars['String']
    password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
    login: { __typename?: 'RawReturnType' } & Pick<RawReturnType, 'accessToken'>
}

export type MyProgramsQueryVariables = Exact<{ [key: string]: never }>

export type MyProgramsQuery = { __typename?: 'Query' } & {
    myPrograms: Array<{ __typename?: 'ProgramType' } & Pick<ProgramType, 'id' | 'name'>>
}

export type PersonsQueryVariables = Exact<{ [key: string]: never }>

export type PersonsQuery = { __typename?: 'Query' } & {
    persons: Array<
        { __typename?: 'PersonEdgeType' } & { node: { __typename?: 'PersonType' } & Pick<PersonType, 'id' | 'name'> }
    >
}

export type ProgramsQueryVariables = Exact<{ [key: string]: never }>

export type ProgramsQuery = { __typename?: 'Query' } & {
    programs: Array<
        { __typename?: 'ProgramEdgeType' } & { node: { __typename?: 'ProgramType' } & Pick<ProgramType, 'id' | 'name'> }
    >
}

export type RequestPasswordResetMutationVariables = Exact<{
    email: Scalars['String']
}>

export type RequestPasswordResetMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'requestPasswordReset'>

export type ResetPasswordMutationVariables = Exact<{
    email: Scalars['String']
    token: Scalars['String']
    password: Scalars['String']
}>

export type ResetPasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'resetPassword'>

export const AddPersonDocument = gql`
    mutation addPerson($name: String!) {
        addPerson(name: $name) {
            node {
                id
                name
            }
        }
    }
`

/**
 * __useAddPersonMutation__
 *
 * To run a mutation, you first call `useAddPersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPersonMutation, { data, loading, error }] = useAddPersonMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddPersonMutation(
    baseOptions?: Apollo.MutationHookOptions<AddPersonMutation, AddPersonMutationVariables>
) {
    return Apollo.useMutation<AddPersonMutation, AddPersonMutationVariables>(AddPersonDocument, baseOptions)
}
export type AddPersonMutationHookResult = ReturnType<typeof useAddPersonMutation>
export type AddPersonMutationResult = Apollo.MutationResult<AddPersonMutation>
export type AddPersonMutationOptions = Apollo.BaseMutationOptions<AddPersonMutation, AddPersonMutationVariables>
export const ChangePasswordDocument = gql`
    mutation changePassword($currentPassword: String!, $newPassword: String!) {
        changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
    }
`

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>
) {
    return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
        ChangePasswordDocument,
        baseOptions
    )
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>
export const EnrollPersonInProgramDocument = gql`
    mutation enrollPersonInProgram($personId: String!, $programId: String!) {
        enrollPersonInProgram(personId: $personId, programId: $programId)
    }
`

/**
 * __useEnrollPersonInProgramMutation__
 *
 * To run a mutation, you first call `useEnrollPersonInProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollPersonInProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollPersonInProgramMutation, { data, loading, error }] = useEnrollPersonInProgramMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      programId: // value for 'programId'
 *   },
 * });
 */
export function useEnrollPersonInProgramMutation(
    baseOptions?: Apollo.MutationHookOptions<EnrollPersonInProgramMutation, EnrollPersonInProgramMutationVariables>
) {
    return Apollo.useMutation<EnrollPersonInProgramMutation, EnrollPersonInProgramMutationVariables>(
        EnrollPersonInProgramDocument,
        baseOptions
    )
}
export type EnrollPersonInProgramMutationHookResult = ReturnType<typeof useEnrollPersonInProgramMutation>
export type EnrollPersonInProgramMutationResult = Apollo.MutationResult<EnrollPersonInProgramMutation>
export type EnrollPersonInProgramMutationOptions = Apollo.BaseMutationOptions<
    EnrollPersonInProgramMutation,
    EnrollPersonInProgramMutationVariables
>
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            accessToken
        }
    }
`

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const MyProgramsDocument = gql`
    query myPrograms {
        myPrograms {
            id
            name
        }
    }
`

/**
 * __useMyProgramsQuery__
 *
 * To run a query within a React component, call `useMyProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProgramsQuery(baseOptions?: Apollo.QueryHookOptions<MyProgramsQuery, MyProgramsQueryVariables>) {
    return Apollo.useQuery<MyProgramsQuery, MyProgramsQueryVariables>(MyProgramsDocument, baseOptions)
}
export function useMyProgramsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MyProgramsQuery, MyProgramsQueryVariables>
) {
    return Apollo.useLazyQuery<MyProgramsQuery, MyProgramsQueryVariables>(MyProgramsDocument, baseOptions)
}
export type MyProgramsQueryHookResult = ReturnType<typeof useMyProgramsQuery>
export type MyProgramsLazyQueryHookResult = ReturnType<typeof useMyProgramsLazyQuery>
export type MyProgramsQueryResult = Apollo.QueryResult<MyProgramsQuery, MyProgramsQueryVariables>
export const PersonsDocument = gql`
    query persons {
        persons {
            node {
                id
                name
            }
        }
    }
`

/**
 * __usePersonsQuery__
 *
 * To run a query within a React component, call `usePersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonsQuery(baseOptions?: Apollo.QueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
    return Apollo.useQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions)
}
export function usePersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
    return Apollo.useLazyQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions)
}
export type PersonsQueryHookResult = ReturnType<typeof usePersonsQuery>
export type PersonsLazyQueryHookResult = ReturnType<typeof usePersonsLazyQuery>
export type PersonsQueryResult = Apollo.QueryResult<PersonsQuery, PersonsQueryVariables>
export const ProgramsDocument = gql`
    query programs {
        programs {
            node {
                id
                name
            }
        }
    }
`

/**
 * __useProgramsQuery__
 *
 * To run a query within a React component, call `useProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProgramsQuery(baseOptions?: Apollo.QueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
    return Apollo.useQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, baseOptions)
}
export function useProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
    return Apollo.useLazyQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, baseOptions)
}
export type ProgramsQueryHookResult = ReturnType<typeof useProgramsQuery>
export type ProgramsLazyQueryHookResult = ReturnType<typeof useProgramsLazyQuery>
export type ProgramsQueryResult = Apollo.QueryResult<ProgramsQuery, ProgramsQueryVariables>
export const RequestPasswordResetDocument = gql`
    mutation requestPasswordReset($email: String!) {
        requestPasswordReset(email: $email)
    }
`

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetMutation, { data, loading, error }] = useRequestPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(
    baseOptions?: Apollo.MutationHookOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>
) {
    return Apollo.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(
        RequestPasswordResetDocument,
        baseOptions
    )
}
export type RequestPasswordResetMutationHookResult = ReturnType<typeof useRequestPasswordResetMutation>
export type RequestPasswordResetMutationResult = Apollo.MutationResult<RequestPasswordResetMutation>
export type RequestPasswordResetMutationOptions = Apollo.BaseMutationOptions<
    RequestPasswordResetMutation,
    RequestPasswordResetMutationVariables
>
export const ResetPasswordDocument = gql`
    mutation resetPassword($email: String!, $token: String!, $password: String!) {
        resetPassword(email: $email, token: $token, password: $password)
    }
`

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>
) {
    return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions)
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
>
