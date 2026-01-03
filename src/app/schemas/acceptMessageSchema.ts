import {z} from "zod"

export const acceptMessageValidation = z.object({
  isAcceptingMessages: z.boolean()
});
