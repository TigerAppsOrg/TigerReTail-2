import { z } from "zod";

export const ZodFile = z.custom<File>((file) => file instanceof File);

export const createRequestImageSchema = z.object({
    request_id: z.number(),
    url: z.string()
});

export type CreateRequestImageState = z.infer<typeof createRequestImageSchema>;
