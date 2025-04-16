import { checkAuthentication } from "$lib/server/security/cas";
import type { RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import {
    itemCategories,
    itemImages,
    items as itemsTable
} from "$lib/server/db/schema";
import { eq, inArray, sql, type SQLWrapper } from "drizzle-orm";
import { getItemsSchema, SORT_OPTIONS } from "./schema";
import { and } from "drizzle-orm";

const getQuery = (search: string) => sql`(
    setweight(to_tsvector('english', ${itemsTable.name}), 'A') ||
    setweight(to_tsvector('english', coalesce(${itemsTable.description}, '')), 'B')
    ) @@ to_tsquery('english', ${search})
`;

const getSort = (sort: (typeof SORT_OPTIONS)[number]) => {
    switch (sort) {
        case "date_new":
            return sql`${itemsTable.time_posted} DESC`;
        case "date_old":
            return sql`${itemsTable.time_posted} ASC`;
        case "name_asc":
            return sql`${itemsTable.name} ASC`;
        case "name_desc":
            return sql`${itemsTable.name} DESC`;
        case "price_low":
            return sql`${itemsTable.price} ASC`;
        case "price_high":
            return sql`${itemsTable.price} DESC`;
    }
};

export const POST: RequestHandler = async ({ locals, request }) => {
    checkAuthentication(locals.session.data);

    const json = await request.json();

    const data = getItemsSchema.safeParse(json);
    if (!data.success) {
        return new Response(JSON.stringify({ error: data.error }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    const { limit, offset, search, categories, qualities, sort } = data.data;

    try {
        const whereFilters: SQLWrapper[] = [];
        const items = await db.transaction(async (tx) => {
            let query = tx
                .selectDistinct({
                    id: itemsTable.id,
                    user_id: itemsTable.user_id,
                    name: itemsTable.name,
                    time_posted: itemsTable.time_posted,
                    time_expire: itemsTable.time_expire,
                    price: itemsTable.price,
                    quality: itemsTable.quality,
                    description: itemsTable.description,
                    status: itemsTable.status,
                    item_type: itemsTable.item_type
                })
                .from(itemsTable)
                .orderBy(getSort(sort))
                // .where(eq(itemsTable.status, "active"))
                .$dynamic();

            whereFilters.push(eq(itemsTable.status, "active"));

            if (limit) query = query.limit(limit);
            if (offset) query = query.offset(offset);
            if (search) {
                // query = query.where(getQuery(search));
                whereFilters.push(getQuery(search));
            }

            if (categories && categories.length > 0) {
                query = query.innerJoin(
                    itemCategories,
                    eq(itemsTable.id, itemCategories.item_id)
                );
                // .where(inArray(itemCategories.category, categories))

                // NOTE: group by unnecessary because of distinct
                // .groupBy(itemsTable.id);
                whereFilters.push(inArray(itemCategories.category, categories));
            }

            if (qualities && qualities.length > 0) {
                // query = query.where(inArray(itemsTable.quality, qualities));
                whereFilters.push(inArray(itemsTable.quality, qualities));
            }
            if (whereFilters.length > 0) {
                // query = query.where(...whereFilters);
                query = query.where(and(...whereFilters));
            }
            // console.log("query", query.toSQL().sql);

            const items = await query;

            const itemIDs = items.map((item) => item.id);

            const imageResults = await tx
                .select({
                    id: itemImages.id,
                    item_id: itemImages.item_id,
                    url: itemImages.url
                })
                .from(itemImages)
                .where(inArray(itemImages.item_id, itemIDs));
            const categoryResults = await tx
                .select({
                    id: itemCategories.id,
                    item_id: itemCategories.item_id,
                    category: itemCategories.category
                })
                .from(itemCategories)
                .where(inArray(itemCategories.item_id, itemIDs));

            const itemsResults = items.map((item) => {
                const images = imageResults
                    .filter((image) => image.item_id === item.id)
                    .map((image) => image.url);
                const categories = categoryResults
                    .filter((category) => category.item_id === item.id)
                    .map((category) => category.category);
                return {
                    ...item,
                    images,
                    categories
                };
            });

            return itemsResults;
        });

        return new Response(JSON.stringify({ items }), {
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
