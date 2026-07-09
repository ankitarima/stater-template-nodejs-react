import crypto from "crypto";
import bcrypt from "bcryptjs";
import { db } from "@config/db";
import { Response, Request } from "express";
import _response from "@utils/response.util";
import asyncHandler from "@middlewares/async.middleware";
import { sendEmail } from "@utils/email.util";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Forgot password — issues a reset token and emails a reset link.
 * Always responds with success to avoid account enumeration.
 */
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const admin = await db.adminUser.findFirst({ where: { email } });

    if (admin) {
      const token = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + RESET_TOKEN_TTL_MS);

      await db.adminUser.update({
        where: { id: admin.id },
        data: { reset_token: token, reset_token_expiry: expiry },
      });

      const resetLink = `${req.headers.origin ?? ""}/auth/password-reset/${token}`;

      try {
        sendEmail(
          "Reset your password",
          email,
          `<p>You requested a password reset.</p>
           <p>Click the link below to choose a new password. This link expires in 1 hour.</p>
           <p><a href="${resetLink}">${resetLink}</a></p>`
        );
      } catch (err) {
        console.log("Failed to send reset email:", err);
      }
    }

    return _response(
      res,
      200,
      true,
      {},
      "If an account exists for that email, a reset link has been sent"
    );
  }
);

/**
 * Reset password — validates the token and sets a new password.
 */
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { hash, new_password } = req.body;

    const admin = await db.adminUser.findFirst({
      where: { reset_token: hash },
    });

    if (
      !admin ||
      !admin.reset_token_expiry ||
      admin.reset_token_expiry.getTime() < Date.now()
    ) {
      return _response(res, 200, false, {}, "Invalid or expired reset token");
    }

    const hashed_password = await bcrypt.hash(new_password, 10);

    await db.adminUser.update({
      where: { id: admin.id },
      data: {
        password: hashed_password,
        reset_token: null,
        reset_token_expiry: null,
      },
    });

    return _response(res, 200, true, {}, "Password reset successfully");
  }
);
