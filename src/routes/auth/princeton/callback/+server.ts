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
import { CASClient } from "$lib/server/db/cas";
import { createUser, db, getUserByNetID } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

// Validate a CAS login ticket and set the user's session data
export const GET: RequestHandler = async (req: RequestEvent) => {
    const ticket = req.url.searchParams.get("ticket");
    if (!ticket) {
        CASClient.authenticate();
        return new Response("Redirecting to CAS server...", {
            status: 302
        });
    }

    const userInfo = await CASClient.validate(ticket);
    if (!userInfo || !userInfo.netid) {
        console.error("CAS authentication failed");
        return new Response("CAS authentication failed", {
            status: 401
        });
    }

    const existingUser = await getUserByNetID(userInfo.netid!).catch((e) => {
        console.error("Error getting user:", e);
        throw new Response("Error getting user", {
            status: 500
        });
    });

    if (!existingUser) {
        try {
            const id = await createUser(
                userInfo.netid!,
                userInfo.name,
                userInfo.mail
            );
            userInfo.id = id;
        } catch (e) {
            console.error("Error creating user:", e);
            return new Response("Error creating user", {
                status: 500
            });
        }
    } else {
        // Update user's name if it does not match CAS display name
        if (existingUser.name !== userInfo.name) {
            try {
                await db
                    .update(user)
                    .set({
                        name: userInfo.name
                    })
                    .where(eq(user.netid, userInfo.netid!));
            } catch (e) {
                console.error("Error updating user:", e);
                return new Response("Error updating user", {
                    status: 500
                });
            }
        }

        userInfo.id = existingUser.id;
        userInfo.mail = existingUser.email;
    }

    await req.locals.session.set(userInfo);
    redirect(302, "/home");
};
