/**
 * @file +page.server.ts (/home)
 * @author Joshua Lau '26
 *
 * Entry point for home page. Checks if user is logged in.
 */

import { redirect, type Actions } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { items } from "$lib/server/db/schema";

export const load = async (req) => {
    const sessionData = req.locals.session.data;
    console.log(sessionData);

    const res = await db.select().from(items).limit(10);
    return {
        props: {
            items: res
        }
    };
};

export const actions: Actions = {
    logout: async ({ locals }) => {
        await locals.session.destroy();
        redirect(302, "/");
    }
};
