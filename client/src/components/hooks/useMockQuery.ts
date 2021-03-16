import * as Apollo from '@apollo/client'
import { ApolloError } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'

export function useMockQuery<T, V = {}>(
    fakeData: T,
    errorData?: any,
    baseOptions?: Apollo.QueryHookOptions<T, V>,
    shouldError?: boolean
): { loading: boolean; error?: ApolloError; data?: T } {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApolloError | undefined>(undefined)
    const [data, setData] = useState<T | undefined>(undefined)

    const myQuery = useCallback(
        () =>
            new Promise<T>(resolve => {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    setError(shouldError ? new ApolloError({}) : undefined)
                    setData(!shouldError ? fakeData : errorData)
                    resolve(fakeData)
                }, 1000)
            }),
        []
    )
    useEffect(() => {
        myQuery()
    }, [myQuery])

    return {
        loading,
        error,
        data,
    }
}
