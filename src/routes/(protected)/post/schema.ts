import { ZodCategory, ZodQuality } from "$lib";
import { z } from "zod";
import { ZodFile } from "../../api/items/createImage/schema";

export const formSchema = z.object({
    images: z.array(ZodFile),
    name: z.string().min(1, "Name is required"),
    price: z.number().min(0, "Price must be a positive number"),
    quality: ZodQuality.optional(),
    description: z.string().optional(),
    // item_type: ZodItemType,
    categories: z.array(ZodCategory)
});

export type FormSchema = typeof formSchema;
export type FormData = z.infer<FormSchema>;
