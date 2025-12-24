import {z} from "zod"

export const messageValidation = z.object({
  content: z
    .string()
    .trim()
    .min(2, "Message must be at least 2 characters long")
    .max(300, "Message must be at most 300 characters long")
});
