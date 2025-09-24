export enum GeneralMessages {
    //user messages
    USER_NOT_FOUND = 'User not found',
    USER_DELETED_SUCCESSFULLY = 'User deleted successfully',
    USER_UPDATED_SUCCESSFULLY = 'User updated successfully',
    USER_CREATED_SUCCESSFULLY = 'User created successfully',
    USER_ID_REQUIRED_FOR_UPDATE = 'USER_ID_REQUIRED_FOR_UPDATE',
    ERROR_PROCESSING_USER_DATA = 'Error processing user data',

    // academy messages
    ACADEMY_COURSE_NOT_FOUND = 'Academy course not found',
    ACADEMY_ENROLLMENT_SUCCESSFUL = 'Enrollment successful',
    ACADEMY_COURSE_COMPLETED = 'Course completed',
    ACADEMY_ACCESS_DENIED = 'Access denied',
    ACADEMY_NOT_ASSOCIATED = 'ACADEMY_NOT_ASSOCIATED',

    // auth messages
    FAILED_REFRESH_TOKEN = 'Failed to refresh token',
    INVALID_GOOGLE_TOKEN = 'Invalid Google token',
    EMAIL_NOT_FOUND_IN_GOOGLE_TOKEN = 'Email not found in Google token',
    REFRESH_TOKEN_NOT_FOUND = 'Refresh token not found',
}