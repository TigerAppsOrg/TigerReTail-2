import { checkAuthentication } from "$lib/server/security/cas";
import type { RequestHandler } from "@sveltejs/kit";
import { createItemImageUrlSchema } from "./schema";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "$lib/server/aws/s3";

export const POST: RequestHandler = async ({ locals, request }) => {
    checkAuthentication(locals.session.data);

    const data = createItemImageUrlSchema.safeParse(await request.json());
    console.log(data);

    if (!data.success) {
        return new Response(JSON.stringify({ error: data.error }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const { extension: item_extension } = data.data;

    const validExtensions = ["jpg", "jpeg", "png", "webp"];
    if (!validExtensions.includes(item_extension)) {
        return new Response(JSON.stringify({ error: "INVALID_FILE_TYPE" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const uuid = crypto.randomUUID();
    const url = "images/" + "trt2_" + uuid + "." + item_extension;

    const putCommand = new PutObjectCommand({
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
        Key: url
    });

    const writeSignedUrl = await getSignedUrl(s3Client, putCommand, {
        expiresIn: 900 // 15 minutes in seconds
    });

    return new Response(JSON.stringify({ writeSignedUrl }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};
