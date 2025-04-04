import type { ServerLoad } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { itemFormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: ServerLoad = async () => {
    const form = await superValidate(zod(itemFormSchema));
    return {
        form
    };
};
