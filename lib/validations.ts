import { z } from "zod";

export const LoginFormValidation = z.object({
  email: z.string().email("wrong email"),
  password: z
    .string()
    .min(8, "Password must be at least 6 characters")
    .max(10, "Password must be at most 10 characters"),
});

export const SignUpFormValidation = z.object({
  firstName: z
    .string()
    .min(2, "firstName must be at least 2 characters")
    .max(50, "firstName must be at most 50 characters"),
  lastName: z
    .string()
    .min(2, "lastName must be at least 2 characters")
    .max(50, "lastName must be at most 50 characters"),
  email: z.string().email("invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 6 characters")
    .max(10, "Password must be at most 10 characters"),
});

export const ForgetPasswordFormValidation = z.object({
  email: z.string().email("wrong email"),
});
