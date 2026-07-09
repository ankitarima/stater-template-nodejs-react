import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import _response from "@utils/response.util";

/**
 * Validate middleware using zod and zod schema
 * @param schema
 * @returns
 */
const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      const issues = e instanceof ZodError ? e.issues : [];
      _response(res, 400, false, {}, issues);
    }
  };

export default validate;
