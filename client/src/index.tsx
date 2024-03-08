import { SessionProvider } from 'components/Providers/SessionProvider/SessionProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from, ApolloLink } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { I18nLoader } from './components/Providers/I18nLoader/I18nLoader'
import reportWebVitals from './reportWebVitals'
import './styles/index.scss'
import { env } from 'env'
import { CachePolicies } from 'configs/CachePolicies'
import { onError } from '@apollo/client/link/error'
import { authLink } from 'auth'
import { AUTHENTICATED_PATH_STARTS } from 'routes/routes'
import { ErrorLinkHandler } from 'utils/errors/ErrorLinkHandler'

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    new ErrorLinkHandler({ graphQLErrors, networkError, operation, forward })
})

const httpLink = createHttpLink({
    uri: env.apiBasePath + '/graphql',
})

const organizationSlugMiddleware = new ApolloLink((operation, forward) => {
    const paths = window.location.pathname.split('/')
    const onAuthenticatedPath = paths.length > 2 && AUTHENTICATED_PATH_STARTS.includes(paths[1])

    if (onAuthenticatedPath) {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                'organization-slug': paths[2],
            },
        }))
    }

    return forward(operation)
})

export const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, organizationSlugMiddleware, httpLink]),
    cache: new InMemoryCache({ typePolicies: CachePolicies }),
})

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <SessionProvider>
                <I18nLoader>
                    <Router>
                        <App />
                    </Router>
                </I18nLoader>
            </SessionProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
