/**
 * @file +server.ts (/auth)
 * @author Joshua Lau '26
 *
 * Takes a CAS login ticket and validates it. If the ticket is valid, the user's session data is set.
 * Otherwise, the user is redirected to the CAS server.
 */

import {
    redirect,
    type RequestEvent,
    type RequestHandler
} from "@sveltejs/kit";
// import * as schema from "$lib/server/db/schema";
import { CASClient } from "$lib/server/db/cas";
import { createUser, getUserByNetID } from "$lib/server/db";

// Validate a CAS login ticket and set the user's session data
export const GET: RequestHandler = async (req: RequestEvent) => {
    const ticket = req.url.searchParams.get("ticket");
    if (!ticket) {
        CASClient.authenticate();
        return new Response("Redirecting to CAS server...", {
            status: 302
        });
    }

    let userInfo = await CASClient.validate(ticket);
    if (!userInfo || !userInfo.netid) {
        console.error("CAS authentication failed");
        return new Response("CAS authentication failed", {
            status: 401
        });
    }

    const existingUser = getUserByNetID(userInfo.netid);
    if (!existingUser) {
        const id = await createUser(
            userInfo.netid!,
            userInfo.name,
            userInfo.mail
        );
        userInfo.id = id;
    }

    await req.locals.session.set(userInfo);
    redirect(302, "/home");
};
