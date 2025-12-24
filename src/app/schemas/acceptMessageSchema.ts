import {z} from "zod"

export const acceptMessageValidation = z.object({
  isAcceptingMessage: z.boolean()
});
