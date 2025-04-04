import { checkAuthentication } from "$lib/server/security/cas";
import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { requestImages } from "$lib/server/db/schema";
import { createRequestImageSchema } from "./schema";

export const POST: RequestHandler = async ({ locals, request }) => {
    checkAuthentication(locals.session.data);

    const data = createRequestImageSchema.safeParse(await request.json());
    console.log(data);
    if (!data.success) {
        return new Response(JSON.stringify({ error: data.error }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    const { request_id, url } = data.data;

    const imageID = await db
        .transaction(async (tx) => {
            const image = await tx
                .insert(requestImages)
                .values({
                    request_id,
                    url
                })
                .returning({ id: requestImages.id })
                .execute();
            if (image.length === 0) {
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
        })
        .catch((e) => {
            console.error(e);
            return new Response(JSON.stringify({ error: "CREATION_ERROR" }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });

    return new Response(JSON.stringify({ url, id: imageID }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};
