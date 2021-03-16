export enum ErrorCode {
    AuthorizationFailed = 'AUTHORIZATION_VALIDATION',
    AuthenticationFailed = 'AUTHENTICATION_VALIDATION',
    InputValidation = 'INPUT_VALIDATION',
    EntityAlreadyExists = 'ENTITY_ALREADY_EXISTS',
    PasswordConfirmationFailed = 'PASSWORD_CONFIRMATION_FAILED',
    GeocodingFailed = 'GEOCODING_FAILED',
}

export interface ErrorMetaData {
    [ErrorCode.EntityAlreadyExists]: { entity: string; field: string; value: unknown }
    [ErrorCode.InputValidation]: never
    [ErrorCode.AuthorizationFailed]: never
    [ErrorCode.AuthenticationFailed]: never
    [ErrorCode.PasswordConfirmationFailed]: never
    [ErrorCode.GeocodingFailed]: { message: string }
}
