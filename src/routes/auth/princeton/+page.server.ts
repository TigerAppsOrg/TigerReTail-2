import { redirect, type ServerLoad } from "@sveltejs/kit";
import { CASClient } from "$lib/server/security/cas";

export const load: ServerLoad = async (req) => {
    const sessionData = req.locals.session.data;
    if (sessionData.netid) {
        redirect(302, "/home");
    }
    CASClient.authenticate();
};
