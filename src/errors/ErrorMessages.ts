// src/errors/ErrorMessages.ts

export enum ErrorCode {
    // Erros gerais
    GENERIC_ERROR = 'GENERIC_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',

    // Erros específicos
    FAILED_TO_DELETE_IMAGE = 'FAILED_TO_DELETE_IMAGE',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
    VALIDATION_ERROR = 'VALIDATION_ERROR',

    // Erros de sistema
    DATABASE_CONNECTION_ERROR = 'DATABASE_CONNECTION_ERROR',
    EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
    FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR',


    // Códigos para erros de validação
    VALIDATION_REQUIRED = 'VALIDATION_REQUIRED',
    VALIDATION_MIN_LENGTH = 'VALIDATION_MIN_LENGTH',
    VALIDATION_MAX_LENGTH = 'VALIDATION_MAX_LENGTH',
    VALIDATION_MIN_VALUE = 'VALIDATION_MIN_VALUE',
    VALIDATION_MAX_VALUE = 'VALIDATION_MAX_VALUE',
    VALIDATION_PATTERN = 'VALIDATION_PATTERN',
    VALIDATION_EMAIL = 'VALIDATION_EMAIL',
    VALIDATION_ENUM = 'VALIDATION_ENUM',
    VALIDATION_UNIQUE = 'VALIDATION_UNIQUE',
    VALIDATION_TYPE = 'VALIDATION_TYPE',
    VALIDATION_CUSTOM = 'VALIDATION_CUSTOM',
}

// Mensagens padrão em inglês (fallback)
export const DEFAULT_ERROR_MESSAGES: Record<ErrorCode, string> = {
    [ErrorCode.GENERIC_ERROR]: 'An unexpected error occurred',
    [ErrorCode.UNAUTHORIZED]: 'Authentication required',
    [ErrorCode.FORBIDDEN]: 'You do not have permission to perform this action',
    [ErrorCode.NOT_FOUND]: 'The requested resource was not found',

    [ErrorCode.FAILED_TO_DELETE_IMAGE]: 'Failed to delete image',
    [ErrorCode.USER_NOT_FOUND]: 'User not found',
    [ErrorCode.INVALID_CREDENTIALS]: 'Invalid username or password',
    [ErrorCode.DUPLICATE_ENTRY]: 'A record with this information already exists',
    [ErrorCode.VALIDATION_ERROR]: 'The provided data is invalid',

    [ErrorCode.DATABASE_CONNECTION_ERROR]: 'Database connection error',
    [ErrorCode.EXTERNAL_API_ERROR]: 'Error connecting to external service',
    [ErrorCode.FILE_UPLOAD_ERROR]: 'Error uploading file',

    // Mensagens para erros de validação
    [ErrorCode.VALIDATION_REQUIRED]: '{field} is required',
    [ErrorCode.VALIDATION_MIN_LENGTH]: '{field} must be at least {min} characters long',
    [ErrorCode.VALIDATION_MAX_LENGTH]: '{field} cannot exceed {max} characters',
    [ErrorCode.VALIDATION_MIN_VALUE]: '{field} must be at least {min}',
    [ErrorCode.VALIDATION_MAX_VALUE]: '{field} cannot exceed {max}',
    [ErrorCode.VALIDATION_PATTERN]: '{field} format is invalid',
    [ErrorCode.VALIDATION_EMAIL]: '{field} must be a valid email address',
    [ErrorCode.VALIDATION_ENUM]: '{field} must be one of: {values}',
    [ErrorCode.VALIDATION_UNIQUE]: '{field} already exists',
    [ErrorCode.VALIDATION_TYPE]: '{field} must be a valid {type}',
    [ErrorCode.VALIDATION_CUSTOM]: '{field} is invalid',
};