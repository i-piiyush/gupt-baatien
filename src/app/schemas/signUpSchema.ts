import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "username should be minimum 2 character's long")
  .max(20, "username should be at max 20 character's long")
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email");

export const signUpValidation = z.object({
  username: usernameValidation,
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
