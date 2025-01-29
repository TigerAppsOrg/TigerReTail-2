import { db } from "$lib/server/db";
import { checkAuthentication } from "$lib/server/db/cas";
import {
    itemCategories,
    items,
    ZodCategory,
    ZodItemType,
    ZodQuality
} from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const schema = z.object({
    name: z.string(),
    price: z.string(),
    quality: ZodQuality.optional(),
    description: z.string().optional(),
    item_type: ZodItemType,
    categories: z.array(ZodCategory).optional()
});

export const POST: RequestHandler = async ({ locals, request }) => {
    checkAuthentication(locals.session.data);

    const data = schema.safeParse(request.json());
    if (!data.success) {
        return new Response(JSON.stringify({ error: data.error }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    const { name, price, quality, description, item_type, categories } =
        data.data;

    const itemID = await db
        .transaction(async (tx) => {
            const item = await tx
                .insert(items)
                .values({
                    user_id: locals.session.data.id,
                    time_posted: new Date(),
                    time_expire: new Date(),
                    name,
                    price,
                    quality,
                    description,
                    status: "active",
                    item_type
                })
                .returning({ id: items.id })
                .execute();
            if (item.length === 0) {
                return new Response(
                    JSON.stringify({ error: "CREATION_ERROR" }),
                    {
                        status: 500,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
            }

            // insert categories
            if (categories) {
                const values = categories.map((category) => ({
                    item_id: item[0].id,
                    category
                }));

                const success = await tx
                    .insert(itemCategories)
                    .values(values)
                    .returning({ id: itemCategories.id })
                    .execute();
                if (success.length !== values.length) {
                    return new Response(
                        JSON.stringify({ error: "CREATION_ERROR" }),
                        {
                            status: 500,
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    );
                }
            }

            return item[0].id;
        })
        .catch((e) => {
            console.error(e);
            return new Response(JSON.stringify({ error: "DATABASE_ERROR" }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });

    return new Response(JSON.stringify({ id: itemID }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};
