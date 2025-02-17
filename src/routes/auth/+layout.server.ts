import { httpCodes } from "$lib/httpCodes";
import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (req) => {
    const sessionData = req.locals.session.data;
    if (sessionData.id) {
        redirect(httpCodes.redirection.seeOther, "/home");
    }
};
