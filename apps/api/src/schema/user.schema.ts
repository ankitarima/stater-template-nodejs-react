import { z } from "zod";

export const registerAdminSchema = z.object({
  body: z.object({
    name: z.string({ error: "Name is required" }).min(2, "Name is too short"),
    email: z.email("Not a valid email"),
    password: z
      .string({ error: "Password is required" })
      .min(8, "Password is too short - should be min 8 chars"),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    first_name: z.string({ error: "First name is required" }),
    password: z
      .string({ error: "Password is required" })
      .min(6, "Password is too short - should be min 6 chars"),
    email: z.email("Not a valid email"),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    first_name: z.string({ error: "First name is required" }),
    email: z.email("Not a valid email"),
  }),
});

export const userLoginSchema = z.object({
  body: z.object({
    password: z.string({ error: "Password is required" }),
    email: z.string({ error: "Email is required" }),
  }),
});

export const verifyUserSchema = z.object({
  params: z.object({
    id: z.string(),
    verificationCode: z.string(),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.email("Not a valid email"),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    hash: z.string({ error: "Token is required" }).min(1, "Token is required"),
    new_password: z
      .string({ error: "Password is required" })
      .min(8, "Password is too short - should be min 8 chars"),
  }),
});
