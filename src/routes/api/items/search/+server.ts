import { db } from "$lib/server/db";
import { checkAuthentication } from "$lib/server/db/cas";
import { items as itemsTable } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";
import { and } from "drizzle-orm/sql";

const getQuery = (query: string) => sql`(
    setweight(to_tsvector('english', ${itemsTable.name}), 'A') ||
    setweight(to_tsvector('english', coalesce(${itemsTable.description}, '')), 'B')
    ) @@ to_tsquery('english', ${query})
`;

export const GET: RequestHandler = async ({ url, locals }) => {
    checkAuthentication(locals.session.data);

    const query = url.searchParams.get("query");
    if (!query) {
        return new Response(JSON.stringify({ error: "MISSING_QUERY" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    let items;
    try {
        items = await db
            .select()
            .from(itemsTable)
            .where(and(getQuery(query), eq(itemsTable.status, "active")))
            .execute();
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
