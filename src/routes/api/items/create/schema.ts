import { ZodQuality, ZodItemType, ZodCategory } from "$lib";
import { z } from "zod";

export const createItemSchema = z.object({
    name: z.string(),
    price: z.string(),
    quality: ZodQuality.optional(),
    description: z.string().optional(),
    item_type: ZodItemType,
    expirationDate: z.date(),
    categories: z.array(ZodCategory)
});

export type CreateItemState = z.infer<typeof createItemSchema>;
