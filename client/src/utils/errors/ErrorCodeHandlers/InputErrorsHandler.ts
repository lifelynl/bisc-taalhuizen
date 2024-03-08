import { i18n } from '@lingui/core'

import { GraphQLError } from 'graphql'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'

/**
 * Validation error description.
 * @see https://github.com/typestack/class-validator
 *
 * class-validator@0.13.0
 *
 * @publicApi
 */
interface ValidationError {
    /**
     * Object that was validated.
     *
     * OPTIONAL - configurable via the ValidatorOptions.validationError.target option
     */
    target?: Record<string, any>
    /**
     * Object's property that hasn't passed validation.
     */
    property: string
    /**
     * Value that haven't pass a validation.
     *
     * OPTIONAL - configurable via the ValidatorOptions.validationError.value option
     */
    value?: any
    /**
     * Constraints that failed validation with error messages.
     */
    constraints?: {
        [type: string]: string
    }
    /**
     * Contains all nested validation errors of the property.
     */
    children?: ValidationError[]
    /**
     * A transient set of data passed through to the validation result for response mapping
     */
    contexts?: {
        [type: string]: any
    }
}

export class InputErrorsHandler {
    public constructor(private readonly graphQLError: GraphQLError) {
        this.handleInputErrors()
    }

    private handleInputErrors() {
        // @ts-ignore
        const validationErrors = this.graphQLError.extensions?.exception?.response
            ?.validationErrors as ValidationError[]

        if (!validationErrors || !validationErrors.length) {
            NotificationsManager.error(
                i18n._(`Er gaat iets fout met het opsturen van de gegevens`),
                i18n._(`Controleer de ingevoerde gegevens`)
            )
            return
        }

        const formattedErrors: string[] = []
        InputErrorsHandler.formatErrors(validationErrors, formattedErrors)

        NotificationsManager.error(formattedErrors.join('\n'))
    }

    private static formatErrors(validationErrors: ValidationError[], formattedErrors: string[]) {
        if (!validationErrors.length) {
            return
        }

        validationErrors.forEach(error => {
            if (error.constraints) {
                formattedErrors.push(Object.values(error.constraints).join('\n'))
            }

            if (error.children) {
                InputErrorsHandler.formatErrors(error.children, formattedErrors)
            }
        })
    }
}
