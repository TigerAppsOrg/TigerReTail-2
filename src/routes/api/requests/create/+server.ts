import { db } from "$lib/server/db";
import { checkAuthentication } from "$lib/server/security/cas";
import type { RequestHandler } from "@sveltejs/kit";
import { requestCategories, requests } from "$lib/server/db/schema";
import { createRequestSchema } from "./schema";

export const POST: RequestHandler = async ({ locals, request }) => {
    checkAuthentication(locals.session.data);

    const json = await request.json();
    console.log(json);

    const data = createRequestSchema.safeParse(json);
    if (!data.success) {
        return new Response(JSON.stringify({ error: data.error }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    const { name, price, description, categories } = data.data;

    const requestID = await db
        .transaction(async (tx) => {
            const request = await tx
                .insert(requests)
                .values({
                    user_id: locals.session.data.id,
                    time_posted: new Date(),
                    time_expire: new Date(),
                    name,
                    price,
                    description
                })
                .returning({ id: requests.id })
                .execute();
            if (request.length === 0) {
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
                    request_id: request[0].id,
                    category
                }));

                const success = await tx
                    .insert(requestCategories)
                    .values(values)
                    .returning({ id: requestCategories.id })
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

            return request[0].id;
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

    return new Response(JSON.stringify({ id: requestID }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};
