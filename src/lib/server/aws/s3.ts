import { S3Client } from "@aws-sdk/client-s3";
import { env } from "$env/dynamic/private";

if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS credentials are not set");
}

const client = new S3Client({
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    },
    region: env.AWS_REGION || "us-east-1"
});

export default client;
