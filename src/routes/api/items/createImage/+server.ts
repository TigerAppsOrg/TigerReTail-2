import { checkAuthentication } from "$lib/server/db/cas";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";
import { db } from "$lib/server/db";
import { itemImages } from "$lib/server/db/schema";

const schema = z.object({
    item_id: z.number(),
    file: z.custom<File>(file => file instanceof File)
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
    const { item_id, file } = data.data;
    if (!file.type.startsWith("image/")) {
        return new Response(JSON.stringify({ error: "INVALID_FILE_TYPE" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const url = "images/";

    // convert below to transaction
    const imageID = await db.transaction(async tx => {
        const image = await tx
            .insert(itemImages)
            .values({
                item_id,
                url
            })
            .returning({ id: itemImages.id })
            .execute();
        if (image.length === 0) {
            return new Response(JSON.stringify({ error: "CREATION_ERROR" }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        // TODO: upload image to cloud storage

        return image[0].id;
    });

    if (imageID instanceof Response) {
        return imageID;
    }

    return new Response(JSON.stringify({ url, id: imageID }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};
