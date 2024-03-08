import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { createContext, FunctionComponent, ReactNode, useCallback, useEffect } from 'react'
import { NotificationsManager } from '../Feedback/Notifications/NotificationsManager'
import isArray from 'lodash/isArray'

// TODO: this is broken and should use the validationErrors that the server returns.
// For the interface, see InputHandlers.ts in /client/src/utils/form/InputHandlers.ts
export interface MutationError {
    data: MutationErrorField
    message: string
    path: string
    type: string
}

interface MutationErrorField {
    [key: string]: MutationErrorField | string
}

interface MutationErrorContextValue {
    fieldErrors: MutationFieldError[]
    findAndConsumeFieldErrors: (path: string | string[]) => MutationFieldError[]
    error?: MutationError | string
}

export class MutationFieldError {
    public isConsumed: boolean = false

    public constructor(public path: string, public message: string) {}

    public consume(): void {
        this.isConsumed = true
    }
}

export const MutationErrorContext = createContext<MutationErrorContextValue>({
    fieldErrors: [],
    findAndConsumeFieldErrors: () => [],
    error: undefined,
})

interface ProviderProps {
    mutationError?: MutationError | string
    children: ReactNode
}

export const MutationErrorProvider: FunctionComponent<ProviderProps> = props => {
    const { i18n } = useLingui()

    const { children, mutationError } = props

    const fieldErrors = getFieldErrorsFromMutationError(mutationError)

    const findAndConsumeFieldErrors = useCallback(
        (path: string | string[]) => {
            const matchingFieldErrors = isArray(path)
                ? fieldErrors.filter(fieldError => path.includes(fieldError.path))
                : fieldErrors.filter(fieldError => fieldError.path === path || fieldError.path.match(path))

            matchingFieldErrors.forEach(fieldError => {
                fieldError.consume()
            })

            return matchingFieldErrors
        },
        [fieldErrors]
    )

    useEffect(() => {
        if (mutationError) {
            const toastErrorTitle = i18n._(t`Controleer het formulier`)

            if (typeof mutationError === 'string') {
                // Error is a string
                NotificationsManager.error(toastErrorTitle, mutationError)
            } else if (fieldErrors.length > 0) {
                // Field-errors found
                const unconsumedErrors = fieldErrors.filter(fieldError => {
                    return !fieldError.isConsumed
                })

                if (unconsumedErrors.length > 0) {
                    // Toast all remaining (unconsumed) errors
                    for (const unconsumedError of unconsumedErrors) {
                        const message = unconsumedError.path
                            ? `${unconsumedError.path}: ${unconsumedError.message}`
                            : unconsumedError.message

                        NotificationsManager.error(toastErrorTitle, message)
                    }
                } else {
                    // All field errors are successfully shown as inline errors
                    NotificationsManager.error(toastErrorTitle, i18n._(t`Eén of meerdere velden zijn ongeldig`))
                }
            } else {
                // Unclear what the error is, just post the main message
                NotificationsManager.error(toastErrorTitle, mutationError.message)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldErrors])

    return (
        <MutationErrorContext.Provider
            value={{
                fieldErrors,
                findAndConsumeFieldErrors,
                error: mutationError,
            }}
        >
            {children}
        </MutationErrorContext.Provider>
    )
}

function getFieldErrorsFromMutationError(mutationError: MutationError | string | undefined): MutationFieldError[] {
    if (!mutationError || typeof mutationError === 'string' || !mutationError.data) {
        return []
    }

    return flattenMutationErrors(mutationError.data)
}

function flattenMutationErrors(object: MutationErrorField, basePath?: string): MutationFieldError[] {
    return Object.keys(object).reduce<MutationFieldError[]>((output, key) => {
        if (!object.hasOwnProperty(key)) {
            return output
        }

        const value = object[key]
        const path = basePath ? `${basePath}.${key}` : key

        if (typeof value === 'string') {
            return [...output, new MutationFieldError(path, value)]
        }

        return [...output, ...flattenMutationErrors(value, path)]
    }, [])
}
