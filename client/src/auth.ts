import { Observable, FetchResult, Operation, NextLink } from '@apollo/client'
import { ContextSetter, setContext } from '@apollo/client/link/context'
import { accessTokenLocalstorageKey, refreshTokenLocalstorageKey } from 'components/Providers/SessionProvider/constants'
import { RefreshTokenDocument, RefreshTokenMutation } from 'graphql/v2/generated/graphql'
import { GraphQLError } from 'graphql'
import { apolloClient } from 'index'

const NO_AUTH_HEADER_FOR_OPERATIONS = ['registerStudent']

export const handleUnauthenticatedGraphqlError = (error: GraphQLError, operation: Operation, forward: NextLink) => {
    if (operation.operationName === 'refreshToken') {
        handleLogout()
        return
    }

    if (!localStorage.getItem(refreshTokenLocalstorageKey)) {
        handleLogout()
        return
    }

    getRefreshTokenObservable(error, operation).subscribe({
        error: () => handleLogout(),
        next: () => forward(operation),
    })
}

function getRefreshTokenObservable(error: GraphQLError, operation: Operation) {
    return new Observable<FetchResult<Record<string, any>>>(observer => {
        refreshAccessToken()
            .then(accessToken => {
                if (!accessToken) {
                    observer.error(error)
                    handleLogout()
                    return
                }

                // Update headers to operation
                operation.setContext((prevContext: any) => {
                    return apolloContextSetter(operation, prevContext)
                })

                observer.next({})
                observer.complete()
            })
            .catch(() => {
                observer.error(error)
                handleLogout()
            })
    })
}

const apolloContextSetter: ContextSetter = (operation, prevContext) => {
    const token = localStorage.getItem(accessTokenLocalstorageKey)

    if (operation.operationName && NO_AUTH_HEADER_FOR_OPERATIONS.includes(operation.operationName)) {
        return prevContext
    }

    return {
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
}

export const authLink = setContext(apolloContextSetter)

// Request a refresh token to then stores and returns the accessToken.
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem(refreshTokenLocalstorageKey)
    if (!refreshToken) {
        return
    }

    const refreshResolverResponse = await apolloClient.mutate<RefreshTokenMutation>({
        mutation: RefreshTokenDocument,
        variables: {
            refreshToken,
        },
    })
    if (!refreshResolverResponse.data) {
        return
    }
    const { accessToken, refreshToken: newRefreshToken } = refreshResolverResponse.data.refreshToken

    localStorage.setItem(accessTokenLocalstorageKey, accessToken)
    localStorage.setItem(refreshTokenLocalstorageKey, newRefreshToken)

    return accessToken
}

export async function handleLogout() {
    localStorage.removeItem(accessTokenLocalstorageKey)
    localStorage.removeItem(refreshTokenLocalstorageKey)

    try {
        await apolloClient.clearStore()
    } catch {}
}
