import type { Kysely } from "kysely";
import type { DB } from "./old";
import type { Affiliation, Category, Quality } from "../db/schema";
import { db } from "../db";
import {
    user as userTable,
    items as itemTable,
    itemCategories as itemCategoriesTable,
    itemImages as itemImagesTable,
    requests as requestTable,
    requestCategories as requestCategoriesTable,
    requestImages as requestImagesTable
} from "../db/schema";
import { arrayContains, isNotNull } from "drizzle-orm";

const getUsernameAndAffiliation = (username: string): [string, Affiliation] => {
    // if ias, then ias_username is the original, if princeton then ptn_username is the original
    if (username.startsWith("ias_")) {
        return [username.slice(4), "ias"];
    } else if (username.startsWith("ptn_")) {
        return [username.slice(4), "princeton"];
    } else {
        return [username, "princeton"];
    }
};

export const convertUsers = async (oldDB: Kysely<DB>) => {
    const users = await oldDB
        .selectFrom("marketplace_account")
        .selectAll()
        .execute();

    const newUsers = users.map((user) => {
        const [username, affiliation] = getUsernameAndAffiliation(
            user.username
        );

        const netid: string | undefined =
            affiliation === "princeton" ? username : undefined;

        return {
            email: user.email,
            name: username,
            affiliation,
            netid,
            legacy_id: user.id
        };
    });

    await db.insert(userTable).values(newUsers).onConflictDoNothing().execute();
};

const oldItemCondition = (condition: string): Quality | null => {
    switch (condition) {
        case "0":
            return "new";
        case "1":
            return "like new";
        case "2":
            return "good";
        case "3":
            return "fair";
        case "4":
            return "poor";
        default:
            return null;
    }
};

const oldItemCategory = (id: number): Category => {
    switch (id) {
        case 14:
            return "accessories";
        case 16:
            return "beauty supplies";
        case 9:
            return "clothing";
        case 15:
            return "dorm essentials";
        case 6:
            return "event tickets";
        case 12:
            return "food";
        case 18:
            return "furniture";
        case 11:
            return "housing";
        case 10:
            return "school supplies";
        case 19:
            return "services";
        case 5:
            return "tech";
        case 13:
            return "transportation";
        case 8:
            return "other";
        case 21:
            return "textbooks";
    }

    return "other";
};

export const convertItems = async (oldDB: Kysely<DB>) => {
    const items = await oldDB
        .selectFrom("marketplace_item")
        .selectAll()
        .execute();

    const userMap = new Map<number, number>();
    const users = await db
        .select({ id: userTable.id, legacy_id: userTable.legacy_id })
        .from(userTable)
        .where(isNotNull(userTable.legacy_id));
    for (const user of users) {
        if (user.legacy_id === null) {
            continue;
        }

        userMap.set(user.legacy_id, user.id);
    }

    const newItems: (typeof itemTable.$inferInsert)[] = [];

    for (const item of items) {
        if (item.status != "0") {
            continue;
        }

        const userId = userMap.get(item.seller_id);
        if (userId === undefined) {
            continue;
        }

        const timePosted = item.posted_date;
        const timeExpire = item.deadline;
        const name = item.name;
        const price = item.price;
        const description = item.description;

        const status = "active";
        const condition = oldItemCondition(item.condition);
        if (condition === null) {
            continue;
        }

        newItems.push({
            user_id: userId,
            time_posted: timePosted,
            time_expire: timeExpire,
            name,
            price,
            quality: condition,
            description,
            status,
            item_type: "sell",
            legacy_id: item.id
        });
    }

    await db.insert(itemTable).values(newItems).onConflictDoNothing().execute();

    // create item map
    const itemMap = new Map<number, number>();
    const items2 = await db
        .select({ id: itemTable.id, legacy_id: itemTable.legacy_id })
        .from(itemTable)
        .where(isNotNull(itemTable.legacy_id));
    for (const item of items2) {
        if (item.legacy_id === null) {
            continue;
        }

        itemMap.set(item.legacy_id, item.id);
    }

    const images: (typeof itemImagesTable.$inferInsert)[] = [];
    for (const item of items) {
        const itemId = itemMap.get(item.id);
        if (itemId === undefined) {
            continue;
        }

        const image = item.image;
        images.push({
            item_id: itemId,
            url: image
        });
    }

    await db
        .insert(itemImagesTable)
        .values(images)
        .onConflictDoNothing()
        .execute();
};

export const convertItemCategories = async (oldDB: Kysely<DB>) => {
    const itemCategories = await oldDB
        .selectFrom("marketplace_item_categories")
        .selectAll()
        .execute();

    const itemMap = new Map<number, number>();
    const items = await db
        .select({ id: itemTable.id, legacy_id: itemTable.legacy_id })
        .from(itemTable)
        .where(isNotNull(itemTable.legacy_id));
    for (const item of items) {
        if (item.legacy_id === null) {
            continue;
        }

        itemMap.set(item.legacy_id, item.id);
    }

    const newCategories: (typeof itemCategoriesTable.$inferInsert)[] = [];

    for (const itemCategory of itemCategories) {
        const itemId = itemMap.get(itemCategory.item_id);
        if (itemId === undefined) {
            continue;
        }

        const category = oldItemCategory(itemCategory.category_id);
        newCategories.push({
            item_id: itemId,
            category,
            legacy_id: itemCategory.id
        });
    }

    await db
        .insert(itemCategoriesTable)
        .values(newCategories)
        .onConflictDoNothing()
        .execute();
};

export const convertRequests = async (oldDB: Kysely<DB>) => {
    const requests = await oldDB
        .selectFrom("marketplace_itemrequest")
        .selectAll()
        .execute();

    const userMap = new Map<number, number>();
    const users = await db
        .select({ id: userTable.id, legacy_id: userTable.legacy_id })
        .from(userTable)
        .where(isNotNull(userTable.legacy_id));
    for (const user of users) {
        if (user.legacy_id === null) {
            continue;
        }

        userMap.set(user.legacy_id, user.id);
    }

    const newRequests: (typeof requestTable.$inferInsert)[] = [];

    for (const request of requests) {
        const userId = userMap.get(request.requester_id);
        if (userId === undefined) {
            continue;
        }

        const timePosted = request.posted_date;
        const timeExpire = request.deadline;
        const name = request.name;
        const price = request.price;
        const description = request.description;

        newRequests.push({
            user_id: userId,
            time_posted: timePosted,
            time_expire: timeExpire,
            name,
            price,
            description,
            legacy_id: request.id
        });
    }

    await db
        .insert(requestTable)
        .values(newRequests)
        .onConflictDoNothing()
        .execute();
};

export const convertRequestCategories = async (oldDB: Kysely<DB>) => {
    const requestCategories = await oldDB
        .selectFrom("marketplace_itemrequest_categories")
        .selectAll()
        .execute();

    const requestMap = new Map<number, number>();
    const requests = await db
        .select({ id: requestTable.id, legacy_id: requestTable.legacy_id })
        .from(requestTable)
        .where(isNotNull(requestTable.legacy_id));
    for (const request of requests) {
        if (request.legacy_id === null) {
            continue;
        }

        requestMap.set(request.legacy_id, request.id);
    }

    const newCategories: (typeof requestCategoriesTable.$inferInsert)[] = [];

    for (const requestCategory of requestCategories) {
        const requestId = requestMap.get(requestCategory.itemrequest_id);
        if (requestId === undefined) {
            continue;
        }

        const category = oldItemCategory(requestCategory.category_id);
        newCategories.push({
            request_id: requestId,
            category,
            legacy_id: requestCategory.id
        });
    }

    await db
        .insert(requestCategoriesTable)
        .values(newCategories)
        .onConflictDoNothing()
        .execute();
};
