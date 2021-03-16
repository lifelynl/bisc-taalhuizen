import { FetchResult } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { useState } from 'react'

type ResultFetched<TResponse> = FetchResult<TResponse, Record<string, any>, Record<string, any>>
type Result<TResponse, TVariables> = [
    mutate: (variables: TVariables) => Promise<ResultFetched<TResponse>> | null,
    values: {
        loading: boolean
        error: GraphQLError | null
        data: ResultFetched<TResponse> | null
    }
]
export function useMockMutation<TResponse, TVariables>(
    fakeData: TResponse,
    shouldError?: boolean,
    errorData?: any
): Result<TResponse, TVariables> {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<GraphQLError | null>(null)
    const [data, setData] = useState<ResultFetched<TResponse> | null>(null)
    const mutate = () =>
        new Promise<ResultFetched<TResponse>>(resolve => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setError(shouldError ? new GraphQLError('error') : null)
                setData(!shouldError ? fakeData : errorData)
                resolve(fakeData)
            }, 2000)
        })
    return [mutate, { loading, error, data }]
}
