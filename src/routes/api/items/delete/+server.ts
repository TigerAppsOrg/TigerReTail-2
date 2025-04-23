import { checkAuthentication } from "$lib/server/security/cas";
import type { RequestHandler } from "@sveltejs/kit";
import { deleteItemSchema } from "./schema";
import { db } from "$lib/server/db";
import { items as itemsTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ locals, request }) => {
    checkAuthentication(locals.session.data);

    const data = deleteItemSchema.safeParse(await request.json());
    if (!data.success) {
        return new Response(JSON.stringify({ error: data.error }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const { id } = data.data;
    try {
        // find item, then set delete flag to true
        const item = await db
            .update(itemsTable)
            .set({ deleted: true })
            .where(eq(itemsTable.id, id))
            .returning();

        if (item.length === 0) {
            return new Response(JSON.stringify({ error: "ITEM_NOT_FOUND" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error", error);
        return new Response(JSON.stringify({ error: "INERNAL_ERROR" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};
