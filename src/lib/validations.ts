import { z } from "zod";

export const LoginFormValidation = z.object({
  email: z.string(),
  password: z.string(),
});

export const SignUpFormValidation = z
  .object({
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
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ForgetPasswordFormValidation = z.object({
  email: z.string().email("wrong email"),
});

export const OTPFormValidation = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});
