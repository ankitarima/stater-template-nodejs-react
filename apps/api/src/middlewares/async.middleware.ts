import { Request, Response, NextFunction } from "express";

/**
 * Custom async handler to eliminate the use of try catch
 * Implementation of dry concept
 * @param fn
 * @returns
 */
const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
