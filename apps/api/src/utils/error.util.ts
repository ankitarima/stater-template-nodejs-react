/**
 * Custom error handling using next function
 */
class ErrorResponse extends Error {
  [x: string]: any;

  constructor(message: string | undefined, statusCode: any) {
    super(message);
    Object.setPrototypeOf(this, ErrorResponse.prototype);
    this["statusCode"] = statusCode;
  }
}

export default ErrorResponse;
