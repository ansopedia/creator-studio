import { z } from "zod";

import { userSchema } from "./user";

export const LoginSchema = z
  .object({
    email: userSchema.shape.email.optional(),
    username: userSchema.shape.username.optional().refine((val) => val === undefined || val.length >= 3, {
      message: "Username must be at least 3 characters",
    }),
    password: userSchema.shape.password,
    rememberMe: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.email == null && data.username == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide either an email or a username",
        path: ["email", "username"],
      });
    }
    if (data.password == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
        path: ["password"],
      });
    }
  });

export type LoginSchema = z.infer<typeof LoginSchema>;
