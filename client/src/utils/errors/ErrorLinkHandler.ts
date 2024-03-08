import { NextLink, Operation } from '@apollo/client'
import { i18n } from '@lingui/core'

import { GraphQLError } from 'graphql'
import { NotificationsManager } from '../../components/Core/Feedback/Notifications/NotificationsManager'
import { EntityAlreadyExistsHandler } from './ErrorCodeHandlers/EntityAlreadyExistsHandler'
import { InputErrorsHandler } from './ErrorCodeHandlers/InputErrorsHandler'
import { genericErrorTranslations } from './translations'
import { ErrorCode } from './types'
import { handleUnauthenticatedGraphqlError } from 'auth'
import { NetworkError } from '@apollo/client/errors'

interface Args {
    graphQLErrors?: readonly GraphQLError[]
    networkError?: NetworkError
    operation: Operation
    forward: NextLink
}

export class ErrorLinkHandler {
    public constructor(private args: Args) {
        if (this.args.graphQLErrors) {
            this.handleGraphqlErrors()
        }

        if (this.args.networkError) {
            this.handleNetworkErrors()
        }
    }

    private handleGraphqlErrors() {
        this.args.graphQLErrors?.forEach(graphQLError => {
            // eslint-disable-next-line no-console
            console.log('GraphQL error', graphQLError)

            this.handleAppError(graphQLError)
        })
    }

    private handleAppError(graphQLError: GraphQLError) {
        if (graphQLError.extensions) {
            this.handleExtensions(graphQLError)
            return
        }
    }

    private handleExtensions(graphQLError: GraphQLError) {
        // @ts-ignore
        const errorCode = graphQLError.extensions?.exception?.response?.errorCode || graphQLError.extensions.code
        switch (errorCode) {
            case ErrorCode.InputValidation:
                new InputErrorsHandler(graphQLError)
                break
            case ErrorCode.EntityAlreadyExists:
                new EntityAlreadyExistsHandler(graphQLError)
                break
            case ErrorCode.Unauthenticated:
                handleUnauthenticatedGraphqlError(graphQLError, this.args.operation, this.args.forward)
                break
            default:
                this.handleGenericErrors(errorCode)
                break
        }
    }

    private handleGenericErrors(errorCode: unknown) {
        const translation = genericErrorTranslations.find(translation => translation.errorCode === errorCode)
        if (translation) {
            NotificationsManager.error(translation.title, translation.message)
            return
        }
        NotificationsManager.error(i18n._(`Wij konden de gegevens niet ophalen`), i18n._(`Probeer het later opnieuw`))
    }

    private handleNetworkErrors() {
        NotificationsManager.error(
            i18n._(`Wij kunnen geen verbinding maken met onze services`),
            i18n._(`Probeer het later opnieuw`)
        )
    }
}
