import { z } from "zod";

export const getItemsSchema = z.object({
    limit: z.number().optional(),
    offset: z.number().optional()
});

export type GetItemsState = z.infer<typeof getItemsSchema>;
