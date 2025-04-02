import type { ServerLoad } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: ServerLoad = async () => {
    const form = await superValidate(zod(formSchema));
    return {
        form
    };
};
