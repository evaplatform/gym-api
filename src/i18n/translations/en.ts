import { GeneralMessages } from '@/errors/GeneralMessages';
import { ErrorCode } from '../../errors/ErrorMessages';
import { MessageType } from '@/shared/types/MessageType';

export const enErrorMessages: MessageType = {
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

    // Messages for validation errors
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

    // User Messages
    [GeneralMessages.USER_NOT_FOUND]: 'User not found',
    [GeneralMessages.USER_DELETED_SUCCESSFULLY]: 'User deleted successfully',
    [GeneralMessages.USER_UPDATED_SUCCESSFULLY]: 'User updated successfully',
    [GeneralMessages.USER_CREATED_SUCCESSFULLY]: 'User created successfully',
    [GeneralMessages.USER_ID_REQUIRED_FOR_UPDATE]: 'User ID is required for update',

    // Academy Messages
    [GeneralMessages.ACADEMY_COURSE_NOT_FOUND]: 'Academy course not found',
    [GeneralMessages.ACADEMY_ENROLLMENT_SUCCESSFUL]: 'Enrollment successful',
    [GeneralMessages.ACADEMY_COURSE_COMPLETED]: 'Course completed',
    [GeneralMessages.ACADEMY_ACCESS_DENIED]: 'Access denied',
    [GeneralMessages.ACADEMY_NOT_ASSOCIATED]: 'User not associated with any academy',
};
;