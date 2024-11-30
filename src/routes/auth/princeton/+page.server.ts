import { redirect, type ServerLoad } from "@sveltejs/kit";
import { CASClient } from "$lib/server/db/cas";

export const load: ServerLoad = async req => {
    // const sessionData = req.locals.session.data;
    // if (!sessionData.netid) {
    //     // Redirect to CAS server if no session
    //     CASClient.authenticate();
    // }

    // // redirect to home page
    // throw redirect(302, "/home");
    const sessionData = req.locals.session.data;
    if (sessionData.netid) {
        redirect(302, "/home");
    }
    CASClient.authenticate();
};
