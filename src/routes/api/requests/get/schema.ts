import { ZodCategory } from "$lib";
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

export const getRequestsSchema = z.object({
    sort: ZodSortOption.optional().default("date_new"),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().optional(),
    categories: z.array(ZodCategory).optional()
});

export type GetRequestsState = z.infer<typeof getRequestsSchema>;

export const getRequestResponseItemSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    name: z.string(),
    time_posted: z.coerce.date(),
    time_expire: z.coerce.date(),
    price: z.string(),
    description: z.string().nullable(),
    categories: z.array(z.string()),
    images: z.array(z.string())
});

export const getRequestsResponseSchema = z.object({
    requests: z.array(getRequestResponseItemSchema)
});

// Infer types from Zod schemas
export type GetRequestResponseItem = z.infer<
    typeof getRequestResponseItemSchema
>;
export type GetRequestsResponse = z.infer<typeof getRequestsResponseSchema>;
