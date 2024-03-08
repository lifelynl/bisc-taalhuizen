import {
    LoginMutationVariables,
    useLoginMutation,
    useCurrentUserLazyQuery,
    LoginMutation,
    CurrentUserQuery,
    OrganizationTypeEnum,
} from 'graphql/v2/generated/graphql'
import { handleLogout } from 'auth'
import { FunctionComponent, useState } from 'react'
import { accessTokenLocalstorageKey, refreshTokenLocalstorageKey } from './constants'
import { SessionContext } from './context'
import { permissions } from 'utils/helpers'
import { apolloClient } from 'index'

interface Props {}

export interface SessionLocationState {
    userHasRequestedLogout?: boolean
    intendedLocation?: Location
    switchingOrganization?: boolean
}

export const SessionProvider: FunctionComponent<Props> = props => {
    const { children } = props

    const [loggedInUser, setLoggedInUser] = useState<LoginMutation['login'] | undefined>()
    const [currentUser, setCurrentUser] = useState<
        CurrentUserQuery['currentUser'] & { accessGroup?: OrganizationTypeEnum }
    >()
    const [login, loginMutation] = useLoginMutation()

    /**
     * because the apollo client depends on the slug to be present, to automatically include it in the
     * request headers, we need to use a lazy query to fetch the current user when the slug is not
     * available
     */
    const [fetchCurrentUser, { loading, refetch }] = useCurrentUserLazyQuery()

    // becase handleLogout in auth.ts clears apollo store, we need to clear the user state when
    // that happens
    apolloClient.onClearStore(() => {
        setLoggedInUser(undefined)
        setCurrentUser(undefined)
        return Promise.resolve()
    })

    return (
        <SessionContext.Provider
            value={{
                loginLoading: loginMutation.loading,
                loginError: loginMutation.error,
                login: handleLogin,
                loggedInUser,
                hasMultipleEmployees: !!loggedInUser?.employees.length && loggedInUser.employees.length > 1,
                userLoading: loading,
                user: currentUser,
                fetchUser,
                refetch,
                organizationSlug: currentUser?.currentEmployee?.organization.slug,
                logout,
                permissions: permissions(
                    currentUser?.currentEmployee?.organization.type,
                    currentUser?.currentEmployee?.role,
                    !!currentUser?.currentEmployee?.organization.hasLimitedEditRights
                ),
            }}
        >
            {children}
        </SessionContext.Provider>
    )

    async function handleLogin(variables: LoginMutationVariables) {
        const response = await login({
            variables,
        })

        if (response.data?.login) {
            const { accessToken, refreshToken, employees } = response.data.login

            localStorage.setItem(accessTokenLocalstorageKey, accessToken)
            localStorage.setItem(refreshTokenLocalstorageKey, refreshToken)

            if (employees.length === 1) {
                await fetchUser(employees[0].organization.slug)
            }

            setLoggedInUser(response.data.login)
        }

        return response
    }

    function fetchUser(slug: string) {
        return fetchCurrentUser({
            context: {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(accessTokenLocalstorageKey)}`,
                    'organization-slug': slug,
                },
            },
            onCompleted: onFetchUser,
            fetchPolicy: 'cache-and-network',
        })
    }

    async function logout() {
        setLoggedInUser(undefined)
        await handleLogout()

        // this is a workaround to force a reload of the page, because the apollo client..
        setCurrentUser(undefined)
    }

    function onFetchUser(data: CurrentUserQuery) {
        if (!data?.currentUser) {
            return setCurrentUser(undefined)
        }

        return setCurrentUser({ ...data.currentUser, accessGroup: data.currentUser.currentEmployee?.organization.type })
    }
}
