import { z } from "zod";

export const ZodFile = z.custom<File>((file) => file instanceof File);

export const createItemImageSchema = z.object({
    item_id: z.number(),
    url: z.string()
});

export type CreateItemImageState = z.infer<typeof createItemImageSchema>;
