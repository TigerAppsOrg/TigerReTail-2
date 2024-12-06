import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "$env/dynamic/private";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const client = postgres(env.DATABASE_URL);
export const db = drizzle(client);

export const getUserByNetID = async (netid: string) => {
    const user = await db
        .select()
        .from(schema.user)
        .where(eq(schema.user.netid, netid))
        .execute();

    if (user.length === 0) return null;
    return user[0];
};

export const createUser = async (
    netid: string,
    name: string,
    email: string
) => {
    let user = await db
        .insert(schema.user)
        .values({
            name,
            email,
            affiliation: "princeton",
            netid
        })
        .returning({ id: schema.user.id });
    return user[0].id;
};
