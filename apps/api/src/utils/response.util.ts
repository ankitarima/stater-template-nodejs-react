import { Response } from "express";

/**
 * Response wrapper
 * @param res
 * @param statusCode
 * @param success
 * @param data
 * @param message
 */
const _response = (
  res: Response,
  statusCode: number,
  success: boolean,
  data: unknown,
  message?: unknown
) => {
  if (success) {
    res.status(statusCode).json({ success, message, data });
  } else {
    let error = message;
    if (Array.isArray(message) && message.length > 0) {
      error = message[0];
    }
    res.status(statusCode).json({
      success,
      message: "An error encountered",
      data: data ? data : {},
      error,
    });
  }
};

export default _response;
