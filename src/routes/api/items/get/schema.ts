import { ZodCategory, ZodQuality } from "$lib";
import { z } from "zod";

export const SORT_OPTIONS = [
    "date_new",
    "date_old",
    "name_asc",
    "name_desc",
    "price_low",
    "price_high"
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];
export const ZodSortOption = z.enum(SORT_OPTIONS);

export const getItemsSchema = z.object({
    sort: ZodSortOption.optional().default("date_new"),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().optional(),
    categories: z.array(ZodCategory).optional(),
    qualities: z.array(ZodQuality).optional()
});

export type GetItemsState = z.infer<typeof getItemsSchema>;

export const getItemResponseItemSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    name: z.string(),
    time_posted: z.coerce.date(),
    time_expire: z.coerce.date(),
    price: z.string(),
    quality: z.string().nullable(),
    description: z.string().nullable(),
    status: z.string(),
    item_type: z.string(),
    categories: z.array(z.string()),
    images: z.array(z.string())
});

export const getItemsResponseSchema = z.object({
    items: z.array(getItemResponseItemSchema)
});

// Infer types from Zod schemas
export type GetItemResponseItem = z.infer<typeof getItemResponseItemSchema>;
export type GetItemsResponse = z.infer<typeof getItemsResponseSchema>;
