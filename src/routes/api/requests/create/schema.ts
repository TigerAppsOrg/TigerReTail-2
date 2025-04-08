import { ZodCategory } from "$lib";
import { z } from "zod";

export const createRequestSchema = z.object({
    name: z.string(),
    price: z.string(),
    description: z.string().optional(),
    categories: z.array(ZodCategory),
    expirationDate: z.date()
});

export type CreateRequestState = z.infer<typeof createRequestSchema>;
