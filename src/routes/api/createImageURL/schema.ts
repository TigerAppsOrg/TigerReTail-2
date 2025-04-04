import { z } from "zod";

export const createItemImageUrlSchema = z.object({
    extension: z.string()
});

export type CreateItemImageUrlState = z.infer<typeof createItemImageUrlSchema>;
