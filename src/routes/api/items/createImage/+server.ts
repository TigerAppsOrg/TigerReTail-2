import { checkAuthentication } from "$lib/server/security/cas";
import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { itemImages } from "$lib/server/db/schema";
import s3Client from "$lib/server/aws/s3";
import { env } from "$env/dynamic/private";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createItemImageSchema } from "./schema";

export const POST: RequestHandler = async ({ locals, request }) => {
    checkAuthentication(locals.session.data);

    const data = createItemImageSchema.safeParse(await request.json());
    console.log(data);
    if (!data.success) {
        return new Response(JSON.stringify({ error: data.error }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    const { item_id, file } = data.data;
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
        return new Response(JSON.stringify({ error: "INVALID_FILE_TYPE" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const uuid = crypto.randomUUID();
    const url = "images/" + "trt2_" + uuid + "." + file.type.split("/")[1];
    // TODO: maybe compress image (with sharp?)

    // convert below to transaction
    const imageID = await db
        .transaction(async (tx) => {
            const image = await tx
                .insert(itemImages)
                .values({
                    item_id,
                    url
                })
                .returning({ id: itemImages.id })
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

            const params = {
                Bucket: env.AWS_STORAGE_BUCKET_NAME!,
                Key: url,
                Body: file.stream()
            };
            const command = new PutObjectCommand(params);
            await s3Client.send(command);
            return image[0].id;
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
