import { redirect, type ServerLoad } from "@sveltejs/kit";
import { CASClient, checkAuthentication } from "$lib/server/db/cas";

export const load: ServerLoad = async req => {
    checkAuthentication(req.locals.session.data);
    return {};
};
