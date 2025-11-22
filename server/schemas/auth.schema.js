import { z } from "zod";

export const signupSchema = z.object({
  loginId: z
    .string()
    .min(3, "Login ID must be at least 3 characters")
    .max(64, "Login ID cannot exceed 64 characters"),
  email: z.string().email("Invalid email format"),
  name: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^a-zA-Z0-9]/, "Must include a special character"),
});

export const signinSchema = z.object({
  loginId: z.string().min(1),
  password: z.string().min(1),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email(),
});

export const passwordResetConfirmSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(4),
  newPassword: z
    .string()
    .min(8)
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^a-zA-Z0-9]/, "Must include a special character"),
});
