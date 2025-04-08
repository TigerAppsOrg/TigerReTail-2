import type { ServerLoad } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { itemFormSchema, requestFormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: ServerLoad = async () => {
    const itemForm = await superValidate(zod(itemFormSchema));
    const requestForm = await superValidate(zod(requestFormSchema));
    return {
        itemForm,
        requestForm
    };
};
