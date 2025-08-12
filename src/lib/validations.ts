import { z } from "zod";

export const SearchSchema = z.object({
  search: z
    .string()
    .min(1, "Please enter a search term")
    .trim()
    .refine(
      (val) => val.length > 0,
      "Search term cannot be empty or just spaces"
    ),
});

// Zod enums for validation
export const GenderEnum = z.enum(["Men", "Women", "Boys", "Girls", "Unisex"]);
export const SeasonEnum = z.enum(["Summer", "Winter", "Spring", "Fall"]);
export const UsageEnum = z.enum(["Casual", "Formal", "Sports", "Ethnic", "Party"]);

// TypeScript types derived from enums
export type Gender = z.infer<typeof GenderEnum>;
export type Season = z.infer<typeof SeasonEnum>;
export type Usage = z.infer<typeof UsageEnum>;

// Product validation schema
export const productSchema = z.object({
  productDisplayName: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters")
    .refine(
      (val) => !/^\d/.test(val),
      "Product name cannot start with a number"
    )
    .refine(
      (val) => /^[a-zA-Z]/.test(val),
      "Product name must start with a letter"
    ),
  price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(999999.99, "Price cannot exceed 999,999.99"),
  articleType: z
    .string()
    .min(1, "Article type is required")
    .max(50, "Article type must be less than 50 characters"),
  baseColour: z
    .string()
    .min(1, "Base colour is required")
    .max(30, "Base colour must be less than 30 characters")
    .refine(
      (val) => /^[a-zA-Z\s]+$/.test(val),
      "Base colour can only contain letters and spaces"
    ),
  gender: GenderEnum.refine(
    (val) => GenderEnum.options.includes(val),
    "Please select a valid gender"
  ),
  image: z
    .string()
    .url("Please provide a valid image URL")
    .min(1, "Image is required"),
  masterCategory: z
    .string()
    .min(1, "Master category is required")
    .max(50, "Master category must be less than 50 characters"),
  season: SeasonEnum.refine(
    (val) => SeasonEnum.options.includes(val),
    "Please select a valid season"
  ),
  subCategory: z
    .string()
    .min(1, "Sub category is required")
    .max(50, "Sub category must be less than 50 characters"),
  usage: UsageEnum.refine(
    (val) => UsageEnum.options.includes(val),
    "Please select a valid usage"
  ),
  year: z
    .string()
    .refine(
      (val) => {
        const year = parseInt(val);
        return !isNaN(year) && year >= 1900 && year <= 2025;
      },
      "Year must be between 1900 and 2025"
    ),
});

// Product type derived from the validation schema
export type Product = z.infer<typeof productSchema>;

// User management validation schemas
export const UserRoleEnum = z.enum(["admin", "user"]);
export const UserStatusEnum = z.enum(["active", "deleted"]);

export const UserUpdateSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: UserRoleEnum.optional(),
  action: z.enum(["updateRole", "activate", "deactivate"]),
});

export const UserSearchSchema = z.object({
  search: z.string().optional(),
  role: z.enum(["all", "admin", "user"]).optional(),
  status: z.enum(["all", "active", "deleted"]).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

// User management types
export type UserRole = z.infer<typeof UserRoleEnum>;
export type UserStatus = z.infer<typeof UserStatusEnum>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserSearch = z.infer<typeof UserSearchSchema>;
