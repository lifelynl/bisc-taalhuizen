export enum ErrorCode {
    AuthorizationFailed = 'AUTHORIZATION_VALIDATION',
    AuthenticationFailed = 'AUTHENTICATION_VALIDATION',
    Unauthenticated = 'UNAUTHENTICATED',
    InputValidation = 'INPUT_VALIDATION',
    EntityAlreadyExists = 'ENTITY_ALREADY_EXISTS',
    PasswordConfirmationFailed = 'PASSWORD_CONFIRMATION_FAILED',
}

export interface ErrorTranslationType {
    errorCode: ErrorCode
    title: string
    message: string
}
