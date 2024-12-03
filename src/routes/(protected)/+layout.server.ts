import { redirect, type ServerLoad } from "@sveltejs/kit";
import { CASClient } from "$lib/server/db/cas";

export const load: ServerLoad = async req => {
    const sessionData = req.locals.session.data;
    if (!sessionData.name) {
        redirect(302, "/");
    }

    return {};
};
