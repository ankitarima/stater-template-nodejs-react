import { db } from "@config/db";
import { Response, Request } from "express";
import _response from "@utils/response.util";
import asyncHandler from "@middlewares/async.middleware";

/**
 * Register user
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return _response(res, 200, false, {}, "Email and password are required");
  }

  const is_email_exists = await db.user.findFirst({
    where: { email },
  });

  if (is_email_exists) {
    return _response(
      res,
      200,
      false,
      {},
      `Email ${email} is already registered`
    );
  }

  const is_mobile_exists = await db.user.findFirst({
    where: { mobile: req.body.mobile },
  });
  if (is_mobile_exists) {
    return _response(
      res,
      200,
      false,
      {},
      `Mobile ${req.body.mobile} is already registered`
    );
  }

  const user = await db.adminUser.create({
    data: {
      ...req.body,
    },
  });

  return _response(res, 200, true, user, "User registered successfully");
});
