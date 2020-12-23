import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import introspectionResult from './generated/introspection-result.json'

const apolloClient = new ApolloClient({
    uri: window.ENVIRONMENT.GRAPHQL_URI,
    cache: new InMemoryCache({
        possibleTypes: introspectionResult.possibleTypes,
    }),
    defaultOptions: {
        query: {
            errorPolicy: 'all',
        },
        watchQuery: {
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
})

export { apolloClient }
