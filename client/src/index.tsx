import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { apolloClient } from './apollo'
import App from './App'
import { I18nLoader } from './components/Providers/I18nLoader/I18nLoader'
import { SessionProvider } from './components/Providers/SessionProvider/SessionProvider'
import reportWebVitals from './reportWebVitals'
import './styles/index.scss'

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <I18nLoader>
                <SessionProvider>
                    <Router>
                        <App />
                    </Router>
                </SessionProvider>
            </I18nLoader>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
