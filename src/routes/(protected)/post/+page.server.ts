import type { ServerLoad } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { itemFormSchema, requestFormSchema } from "./schema";

export const load: ServerLoad = async () => {
    const itemForm = await superValidate(zod(itemFormSchema));
    const requestForm = await superValidate(zod(requestFormSchema));
    return {
        itemForm,
        requestForm
    };
};
