import { ZodCategory, ZodQuality } from "$lib";
import { z } from "zod";
import { ZodFile } from "../../api/items/createImage/schema";

export const itemFormSchema = z.object({
    images: z.array(ZodFile),
    name: z.string().min(1, "Name is required"),
    price: z.number().min(0, "Price must be a positive number"),
    quality: ZodQuality.optional(),
    description: z.string().optional(),
    expirationDate: z.date(),
    // item_type: ZodItemType,
    categories: z.array(ZodCategory)
});

export type ItemFormSchema = typeof itemFormSchema;
export type ItemFormData = z.infer<ItemFormSchema>;

export const requestFormSchema = z.object({
    images: z.array(ZodFile),
    name: z.string(),
    price: z.string(),
    description: z.string().optional(),
    categories: z.array(ZodCategory)
});

export type RequestFormSchema = typeof requestFormSchema;
export type RequestFormData = z.infer<RequestFormSchema>;
