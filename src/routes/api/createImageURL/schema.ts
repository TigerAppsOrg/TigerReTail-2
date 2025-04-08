import { z } from "zod";

export const createImageUrlSchema = z.object({
    extension: z.string()
});

export type CreateImageUrlState = z.infer<typeof createImageUrlSchema>;
