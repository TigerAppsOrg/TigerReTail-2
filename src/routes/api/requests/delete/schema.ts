import { z } from "zod";

export const deleteRequestSchema = z.object({
    id: z.number()
});

export type DeleteRequestState = z.infer<typeof deleteRequestSchema>;
