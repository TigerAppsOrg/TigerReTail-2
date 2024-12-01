import { relations } from "drizzle-orm";
import {
    integer,
    numeric,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp
} from "drizzle-orm/pg-core";

import {
    AFFILIATIONS,
    CATEGORIES,
    ITEM_TYPES,
    QUALITIES,
    STATUSES
} from "$lib";

export const affiliationEnum = pgEnum("affiliation", AFFILIATIONS);

export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    affiliation: affiliationEnum("affiliation").notNull(),
    age: integer("age").notNull(),
    bio: text("text"),
    phone: text("phone")
});

export const qualityEnum = pgEnum("quality", QUALITIES);
export const statusEnum = pgEnum("status", STATUSES);

export const itemTypesEnum = pgEnum("item_type", ITEM_TYPES);

export const categoriesEnum = pgEnum("category", CATEGORIES);

export const userRelations = relations(user, ({ many }) => ({
    items: many(items),
    requests: many(requests)
}));

export const items = pgTable("items", {
    id: serial("id").primaryKey(),
    user_id: text("user_id")
        .notNull()
        .references(() => user.id, {}),
    time_posted: timestamp("time_posted").notNull(),
    time_expire: timestamp("time_expire").notNull(),
    name: text("name").notNull(),
    price: numeric("price").notNull(),
    quality: qualityEnum("quality"),
    description: text("description"),
    status: statusEnum("status").notNull(),
    item_type: itemTypesEnum("item_type").notNull(),
    category: categoriesEnum("category").notNull()
});

export const itemsRelations = relations(items, ({ one, many }) => ({
    user: one(user, {
        fields: [items.user_id],
        references: [user.id]
    }),
    images: many(itemImages)
}));

export const itemImages = pgTable("item_images", {
    id: serial("id").primaryKey(),
    item_id: integer("item_id")
        .notNull()
        .references(() => items.id, {}),
    url: text("url").notNull()
});

export const itemImagesRelations = relations(itemImages, ({ one }) => ({
    item: one(items, {
        fields: [itemImages.item_id],
        references: [items.id]
    })
}));

export const requests = pgTable("requests", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id")
        .notNull()
        .references(() => user.id, {}),
    time_posted: timestamp("time_posted").notNull(),
    time_expire: timestamp("time_expire").notNull(),
    name: text("name").notNull(),
    price: numeric("price").notNull(),
    description: text("description"),
    category: categoriesEnum("category").notNull()
});

export const requestsRelations = relations(requests, ({ one, many }) => ({
    user: one(user, {
        fields: [requests.user_id],
        references: [user.id]
    }),
    images: many(requestImages)
}));

export const requestImages = pgTable("request_images", {
    id: serial("id").primaryKey(),
    request_id: integer("request_id")
        .notNull()
        .references(() => requests.id, {}),
    url: text("url").notNull()
});

export const requestImagesRelations = relations(requestImages, ({ one }) => ({
    request: one(requests, {
        fields: [requestImages.request_id],
        references: [requests.id]
    })
}));
