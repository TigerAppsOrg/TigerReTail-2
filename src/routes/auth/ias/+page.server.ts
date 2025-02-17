import { httpCodes } from "$lib/httpCodes";
import { AuthService } from "$lib/server/security/auth";
import { db } from "$lib/server/db";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    register: async ({ request, locals }) => {
        const data = await request.formData();
        const name = data.get("name") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        if (!name || !email || !password) {
            return {
                status: httpCodes.error.badRequest,
                body: { error: "Missing name, email, or password" }
            };
        }

        const auth = new AuthService(db);
        const regRes = await auth.register(name, email, password);

        if (!regRes.ok) {
            return {
                status: httpCodes.error.badRequest,
                body: { error: regRes.error }
            };
        }

        await locals.session.set(regRes.data);
        redirect(httpCodes.redirection.seeOther, "/home");
    },

    login: async ({ request, locals }) => {
        const data = await request.formData();
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        if (!email || !password) {
            return {
                status: httpCodes.error.badRequest,
                body: { error: "Missing email or password" }
            };
        }

        const auth = new AuthService(db);
        const loginRes = await auth.login(email, password);

        if (!loginRes.ok) {
            return {
                status: httpCodes.error.badRequest,
                body: { error: loginRes.error }
            };
        }

        await locals.session.set(loginRes.data);
        redirect(httpCodes.redirection.seeOther, "/home");
    },

    forgotPassword: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email") as string;

        if (!email) {
            return {
                status: httpCodes.error.badRequest,
                body: { error: "Missing email" }
            };
        }

        const auth = new AuthService(db);
    }
};
