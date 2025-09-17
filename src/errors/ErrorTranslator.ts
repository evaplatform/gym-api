// src/errors/ErrorTranslator.ts
import { ErrorCode, DEFAULT_ERROR_MESSAGES } from './ErrorMessages';
import { i18n } from '../i18n';

export class ErrorTranslator {
  /**
   * Translates an error code to the message in the current language
   */
  static translate(code: ErrorCode): string {
    return i18n.translate(code);
  }
  
  /**
   * Retrieves the error code from an error message
   * Useful when receiving errors from external APIs
   */
  static getCodeFromMessage(message: string): ErrorCode {
    // Reverse lookup to find the code corresponding to the message
    for (const [code, msg] of Object.entries(DEFAULT_ERROR_MESSAGES)) {
      if (msg === message) {
        return code as ErrorCode;
      }
    }
    return ErrorCode.GENERIC_ERROR;
  }
}