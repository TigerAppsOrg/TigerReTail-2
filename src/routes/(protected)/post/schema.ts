import { CATEGORIES, QUALITIES } from "$lib";
import { z } from "zod";

export const formSchema = z.object({
    images: z.array(z.union([z.string(), z.instanceof(File)])).optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number"),
    negotiable: z.boolean(), // Changed to enum for radio options
    deadline: z.string().optional(),
    category: z.enum(CATEGORIES, {
        required_error: "Category is required"
    }),
    quality: z.enum(QUALITIES, {
        required_error: "Condition is required"
    })
});

export type FormSchema = typeof formSchema;
export type FormData = z.infer<FormSchema>;

// constants thtoughout, changes to db/index.ts,
