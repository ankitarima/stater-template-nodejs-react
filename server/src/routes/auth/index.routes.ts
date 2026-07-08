import express from "express";
import validate from "@middlewares/validate.middleware";
import { login } from "@controllers/auth/login.controller";
import { register } from "@controllers/auth/user.controller";
import {
  forgotPassword,
  resetPassword,
} from "@controllers/auth/password.controller";
import {
  userLoginSchema,
  registerAdminSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@schema/user.schema";

const authRouter = express.Router();

authRouter.post("/login", validate(userLoginSchema), login);
authRouter.post("/register", validate(registerAdminSchema), register);
authRouter.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);
authRouter.post("/password-reset", validate(resetPasswordSchema), resetPassword);

export default authRouter;
