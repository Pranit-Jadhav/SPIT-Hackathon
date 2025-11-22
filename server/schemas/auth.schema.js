import { z } from "zod";

export const signupSchema = z.object({
  loginId: z
    .string()
    .min(6, "Login ID must be at least 6 characters")
    .max(12, "Login ID cannot exceed 12 characters"),

  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^a-zA-Z0-9]/, "Must include a special character"),
});




