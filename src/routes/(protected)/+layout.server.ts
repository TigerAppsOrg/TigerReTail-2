import { type ServerLoad } from "@sveltejs/kit";
import { checkAuthentication } from "$lib/server/db/cas";

export const load: ServerLoad = async (req) => {
    checkAuthentication(req.locals.session.data);
    return {};
};
