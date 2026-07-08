import bcrypt from "bcryptjs";
import { db } from "@config/db";
import { Response, Request } from "express";
import _response from "@utils/response.util";
import asyncHandler from "@middlewares/async.middleware";
import { signAccessToken, signRefreshToken } from "@services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return _response(res, 200, false, {}, "Email and password are required");
  }

  const user = await db.adminUser.findFirst({
    where: { email },
  });

  if (user) {
    return _response(res, 200, false, {}, "User already exists");
  }

  const hashed_password = await bcrypt.hash(password, 10);

  const new_user = await db.adminUser.create({
    data: {
      email,
      name,
      password: hashed_password,
    },
  });

  const user_data = await db.adminUser.findFirst({
    omit: {
      password: true,
      reset_token: true,
      reset_token_expiry: true,
    },
    where: { id: new_user.id },
  });

  // sign a access token
  const access_token = await signAccessToken(user_data);

  // sign a refresh token
  const refresh_token = await signRefreshToken({
    userId: new_user.id.toString(),
  });

  return _response(
    res,
    200,
    true,
    { user: user_data, access_token, refresh_token },
    "User registered successfully"
  );
});
