/**
 * Enum representing HTTP status codes.
 *
 * Each member of this enum corresponds to a standard HTTP status code
 * and its associated numeric value.
 *
 * @enum {number}
 */

export enum HttpStatusCodeEnum {
  /**
   * Indicates that the request has succeeded.
   * @value 200
   */
  OK = 200,

  /**
   * Indicates that the request has succeeded and a new resource has been created as a result.
   * @value 201
   */
  CREATED = 201,

  /**
   * Indicates that the request has been received but not yet acted upon.
   * @value 202
   */
  ACCEPTED = 202,

  /**
   * Indicates that the server successfully processed the request, but is not returning any content.
   * @value 204
   */
  NO_CONTENT = 204,

  /**
   * Indicates that the server cannot or will not process the request due to a client error.
   * @value 400
   */
  BAD_REQUEST = 400,

  /**
   * Indicates that the request requires user authentication.
   * @value 401
   */
  UNAUTHORIZED = 401,

  /**
   * Indicates that the server understood the request but refuses to authorize it.
   * @value 403
   */
  FORBIDDEN = 403,

  /**
   * Indicates that the server cannot find the requested resource.
   * @value 404
   */
  NOT_FOUND = 404,

  /**
   * Indicates that the request could not be completed due to a conflict with the current state of the resource.
   * @value 409
   */
  CONFLICT = 409,

  /**
   * Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
   * @value 500
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * Indicates that the server is currently unable to handle the request due to temporary overload or maintenance.
   * @value 503
   */
  SERVICE_UNAVAILABLE = 503,

  /**
   * Indicates that the server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.
   * @value 504
   */
  GATEWAY_TIMEOUT = 504,

  /**
   * Indicates that the JSON Web Token (JWT) has expired.
   * @value 'jwt expired'
   */
  JWT_EXPIRED = 'jwt expired'
}
