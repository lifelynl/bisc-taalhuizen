import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import introspectionResult from './generated/introspection-result.json'
import { setContext } from '@apollo/client/link/context'
import { accessTokenLocalstorageKey } from './components/Providers/SessionProvider/constants'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(accessTokenLocalstorageKey)
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `${token}` : '',
        },
    }
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
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
