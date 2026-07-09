import { NextFunction, Request, Response } from "express";
import ErrorResponse from "@utils/error.util";

/**
 * Custom Error Handler Middleware
 * @param err
 * @param req
 * @param res
 * @param next
 */
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };

  console.log(err);

  error.message = err.message;

  if (err.name === "CastError") {
    error = new ErrorResponse("Resource not found", 200);
  }

  // error handling for duplicate entry
  if (err.code === 11000) {
    error = new ErrorResponse("Duplicate entry", 200);
  }

  if (err.name === "ValidationError") {
    const message = <any>(
      Object.values(err.errors).map((val: any) => val.message)
    );
    error = new ErrorResponse(message, 200);
  }

  // custom error code and message generator
  res.status(error.statusCode || 200).json({
    success: false,
    message: "An error have been encounter",
    data: {},
    error: error.message || " Server Error",
  });
};

export default errorHandler;
