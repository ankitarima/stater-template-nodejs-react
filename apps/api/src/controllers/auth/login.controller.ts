import { db } from "@config/db";
import bcrypt from "bcryptjs";
import _response from "@utils/response.util";
import { Response, Request } from "express";
import asyncHandler from "@middlewares/async.middleware";
import { signAccessToken, signRefreshToken } from "@services/auth.service";

/**
 * Login user
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return _response(res, 200, false, {}, "Email and password are required");
  }

  const user = await db.adminUser.findFirst({
    where: { email },
  });

  if (!user) {
    return _response(res, 200, false, {}, "User not found");
  }

  if (!user?.password) {
    return _response(res, 200, false, {}, "Password not set");
  }

  const password_matched = await bcrypt.compare(password, user?.password);

  if (!password_matched) {
    return _response(res, 200, false, {}, "Invalid credentials");
  }

  const user_data = await db.adminUser.findFirst({
    omit: {
      password: true,
      reset_token: true,
      reset_token_expiry: true,
    },
    where: { id: user.id },
  });

  // sign a access token
  const access_token = await signAccessToken(user_data);

  // sign a refresh token
  const refresh_token = await signRefreshToken({ userId: user.id.toString() });

  return _response(
    res,
    200,
    true,
    { user: user_data, access_token, refresh_token },
    "Login success"
  );
});
