import { z } from "zod";

export const LoginFormValidation = z.object({
  email: z.string().email("wrong email"),
  password: z
    .string()
    .min(8, "Password must be at least 6 characters")
    .max(10, "Password must be at most 10 characters"),
});

export const SignUpFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("invalid email"),
  age: z
    .number()
    .min(13, "You must be at least 13 years old")
    .max(60, "Please enter a valid age below 60"),
  location: z.string().min(2, "Please enter a valid location"),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "Gender is required",
    invalid_type_error: "Please select a valid gender",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});

export const ForgetPasswordFormValidation = z.object({
  email: z.string().email("wrong email"),
});
