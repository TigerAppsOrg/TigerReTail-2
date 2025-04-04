import { checkAuthentication } from "$lib/server/security/cas";
import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { items as itemsTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ url, locals }) => {
    checkAuthentication(locals.session.data);

    let limit;
    if (url.searchParams.has("limit")) {
        try {
            limit = parseInt(url.searchParams.get("limit")!);
        } catch {
            return new Response(JSON.stringify({ error: "INVALID_LIMIT" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }

    let offset;
    if (url.searchParams.has("offset")) {
        try {
            offset = parseInt(url.searchParams.get("offset")!);
        } catch {
            return new Response(JSON.stringify({ error: "INVALID_OFFSET" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }

    let items;
    try {
        let query = db
            .select()
            .from(itemsTable)
            .orderBy(itemsTable.time_posted)
            .where(eq(itemsTable.status, "active"))
            .$dynamic();
        if (limit) query = query.limit(limit);
        if (offset) query = query.offset(offset);
        items = await query.execute();
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: "INTERNAL_ERROR" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return new Response(JSON.stringify(items), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};
