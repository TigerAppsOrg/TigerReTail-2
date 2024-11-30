import type { Kysely } from "kysely";
import type { DB } from "./old";
import type { Affiliation, Category, Quality } from "../db/schema";
import { db } from "../db";
import { user as userTable, items as itemTable } from "../db/schema";
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

    const newUsers = users.map(user => {
        const [username, affiliation] = getUsernameAndAffiliation(
            user.username
        );
        return {
            email: user.email,
            name: username,
            affiliation,
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
        case 9:
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
        .innerJoin(
            "marketplace_item_categories",
            "marketplace_item.id",
            "marketplace_item_categories.item_id"
        )
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

        const category = oldItemCategory(item.category_id);

        newItems.push({
            user_id: userId,
            time_posted: timePosted,
            time_expire: timeExpire,
            name,
            price,
            quality: condition,
            description,
            status,
            category,
            item_type: "sell",
            legacy_id: item.id
        });
    }

    await db.insert(itemTable).values(newItems).onConflictDoNothing().execute();
};
