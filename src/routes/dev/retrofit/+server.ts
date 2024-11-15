import { env } from "$env/dynamic/private";
import postgres from "postgres";
import type { DB } from "$lib/server/retrofit/old";
import type { RequestEvent } from "@sveltejs/kit";

export let POST = async (req: RequestEvent) => {
    return new Response("Disabled in production", {
        status: 403
    });
};

if (import.meta.env.MODE === "development") {
    const { Kysely } = await import("kysely");
    const { PostgresJSDialect } = await import("kysely-postgres-js");

    POST = async (req: RequestEvent) => {
        const { SECRET } = await req.request.json();
        if (SECRET !== env.SECRET) {
            return new Response("Invalid secret", {
                status: 403
            });
        }

        const oldDB = new Kysely<DB>({
            dialect: new PostgresJSDialect({
                postgres: postgres(env.OLD_DATABASE_URL)
            })
        });

        const users = await oldDB
            .selectFrom("marketplace_account")
            .selectAll()
            .execute();
        console.log(users);

        const response = {
            message: "Completed!"
        };

        return new Response(JSON.stringify(response), {
            status: 200
        });
    };
}
