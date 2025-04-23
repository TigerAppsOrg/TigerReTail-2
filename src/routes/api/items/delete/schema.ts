import { z } from "zod";

export const deleteItemSchema = z.object({
    id: z.number()
});

export type DeleteItemState = z.infer<typeof deleteItemSchema>;
