/**
 * @file +page.server.ts (/home)
 * @author Joshua Lau '26
 *
 * Entry point for home page. Checks if user is logged in.
 */

import type { Actions, ServerLoad } from "@sveltejs/kit";
import { CASClient } from "$lib/server/db/cas";

// export const load: ServerLoad = async req => {
//     const sessionData = req.locals.session.data;
//     if (!sessionData.name) {
//         // Redirect to CAS server if no session
//         CASClient.authenticate();
//     }

//     return {};
// };

// export const actions: Actions = {
//     logout: async ({ locals }) => {
//         await CASClient.logout(locals);
//     }
// };
