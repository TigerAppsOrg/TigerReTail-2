import type { ServerLoad } from "@sveltejs/kit";
import { CASClient } from "$lib/server/db/cas";

export const load: ServerLoad = async req => {
    const sessionData = req.locals.session.data;
    if (!sessionData.name) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
    }

    return {};
};
