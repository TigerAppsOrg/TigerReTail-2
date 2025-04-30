import { checkAuthentication } from "$lib/server/security/cas";
import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import {
    requestCategories,
    requestImages,
    requests as requestsTable
} from "$lib/server/db/schema";
import { eq, inArray, sql, type SQLWrapper } from "drizzle-orm";
import { getRequestsSchema, SORT_OPTIONS } from "./schema";
import { and } from "drizzle-orm";

const getQuery = (search: string) => sql`(
    setweight(to_tsvector('english', ${requestsTable.name}), 'A') ||
    setweight(to_tsvector('english', coalesce(${requestsTable.description}, '')), 'B')
    ) @@ to_tsquery('english', ${search})
`;

const getSort = (sort: (typeof SORT_OPTIONS)[number]) => {
    switch (sort) {
        case "date_new":
            return sql`${requestsTable.time_posted} DESC`;
        case "date_old":
            return sql`${requestsTable.time_posted} ASC`;
        case "name_asc":
            return sql`${requestsTable.name} ASC`;
        case "name_desc":
            return sql`${requestsTable.name} DESC`;
        case "price_low":
            return sql`${requestsTable.price} ASC`;
        case "price_high":
            return sql`${requestsTable.price} DESC`;
    }
};

export const POST: RequestHandler = async ({ locals, request }) => {
    checkAuthentication(locals.session.data);

    const json = await request.json();

    const data = getRequestsSchema.safeParse(json);
    if (!data.success) {
        return new Response(JSON.stringify({ error: data.error }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    const { limit, offset, search, categories, sort } = data.data;

    try {
        const whereFilters: SQLWrapper[] = [];
        const requests = await db.transaction(async (tx) => {
            let query = tx
                .selectDistinct({
                    id: requestsTable.id,
                    user_id: requestsTable.user_id,
                    name: requestsTable.name,
                    time_posted: requestsTable.time_posted,
                    time_expire: requestsTable.time_expire,
                    price: requestsTable.price,
                    description: requestsTable.description
                })
                .from(requestsTable)
                .orderBy(getSort(sort))
                // .where(eq(itemsTable.status, "active"))
                .$dynamic();

            // whereFilters.push(eq(requestsTable.status, "active"));

            if (limit) query = query.limit(limit);
            if (offset) query = query.offset(offset);
            if (search) {
                // query = query.where(getQuery(search));
                whereFilters.push(getQuery(search));
            }

            if (categories && categories.length > 0) {
                query = query.innerJoin(
                    requestCategories,
                    eq(requestsTable.id, requestCategories.request_id)
                );
                // .where(inArray(itemCategories.category, categories))

                // NOTE: group by unnecessary because of distinct
                // .groupBy(itemsTable.id);
                whereFilters.push(
                    inArray(requestCategories.category, categories)
                );
            }

            if (whereFilters.length > 0) {
                // query = query.where(...whereFilters);
                query = query.where(and(...whereFilters));
            }
            // console.log("query", query.toSQL().sql);

            const requests = await query;

            const requestIDs = requests.map((request) => request.id);

            const imageResults = await tx
                .select({
                    id: requestImages.id,
                    item_id: requestImages.request_id,
                    url: requestImages.url
                })
                .from(requestImages)
                .where(inArray(requestImages.request_id, requestIDs));
            const categoryResults = await tx
                .select({
                    id: requestCategories.id,
                    request_id: requestCategories.request_id,
                    category: requestCategories.category
                })
                .from(requestCategories)
                .where(inArray(requestCategories.request_id, requestIDs));

            const itemsResults = requests.map((request) => {
                const images = imageResults
                    .filter((image) => image.item_id === request.id)
                    .map((image) => image.url);
                const categories = categoryResults
                    .filter((category) => category.request_id === request.id)
                    .map((category) => category.category);
                return {
                    ...request,
                    images,
                    categories
                };
            });

            return itemsResults;
        });

        return new Response(JSON.stringify({ requests }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: "INTERNAL_ERROR" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};
