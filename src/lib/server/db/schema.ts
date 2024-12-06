import {
    pgTable,
    serial,
    text,
    integer,
    pgEnum,
    timestamp,
    numeric,
    boolean
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Each user has either a netid or a pwdAuth entry. If no netid but no pwdAuth, then user should be migrated.
export const pwdAuth = pgTable("pwd_auth", {
    id: serial("id").primaryKey(),
    password: text("password").notNull(),
    user_id: integer("user_id")
        .notNull()
        .references(() => user.id, {}),
    verified: boolean("verified").notNull()
});

export const pwdAuthRelations = relations(pwdAuth, ({ one }) => ({
    user: one(user, {
        fields: [pwdAuth.user_id],
        references: [user.id]
    })
}));

export const affiliationEnum = pgEnum("affiliation", ["ias", "princeton"]);
export type Affiliation = (typeof affiliationEnum.enumValues)[number];
export const ZodAffiliation = z.enum(affiliationEnum.enumValues);

export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    affiliation: affiliationEnum("affiliation").notNull(),
    netid: text("netid"),
    // class_year: integer("age"),
    bio: text("text"),
    phone: text("phone"),
    legacy_id: integer("legacy_id").unique()
});

export const qualityEnum = pgEnum("quality", [
    "new",
    "like new",
    "good",
    "fair",
    "poor"
]);
export type Quality = (typeof qualityEnum.enumValues)[number];
export const ZodQuality = z.enum(qualityEnum.enumValues);

export const statusEnum = pgEnum("status", [
    "active",
    "inactive",
    "sold",
    "expired"
]);
export type Status = (typeof statusEnum.enumValues)[number];
export const ZodStatus = z.enum(statusEnum.enumValues);

export const itemTypesEnum = pgEnum("item_type", ["sell", "rent"]);
export type ItemType = (typeof itemTypesEnum.enumValues)[number];
export const ZodItemType = z.enum(itemTypesEnum.enumValues);

export const categoriesEnum = pgEnum("category", [
    "accessories",
    "beauty supplies",
    "clothing",
    "dorm essentials",
    "event tickets",
    "food",
    "furniture",
    "housing",
    "other",
    "school supplies",
    "services",
    "tech",
    "textbooks",
    "transportation"
]);
export type Category = (typeof categoriesEnum.enumValues)[number];
export const ZodCategory = z.enum(categoriesEnum.enumValues);

export const userRelations = relations(user, ({ many }) => ({
    items: many(items),
    requests: many(requests)
}));

export const items = pgTable("items", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id")
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
    legacy_id: integer("legacy_id").unique()
});

export const itemsRelations = relations(items, ({ one, many }) => ({
    user: one(user, {
        fields: [items.user_id],
        references: [user.id]
    }),
    categories: many(itemCategories),
    images: many(itemImages)
}));

export const itemCategories = pgTable("item_categories", {
    id: serial("id").primaryKey(),
    item_id: integer("item_id")
        .notNull()
        .references(() => items.id, {}),
    category: categoriesEnum("category").notNull(),
    legacy_id: integer("legacy_id").unique()
});

export const itemCategoriesRelations = relations(itemCategories, ({ one }) => ({
    item: one(items, {
        fields: [itemCategories.item_id],
        references: [items.id]
    })
}));

export const itemImages = pgTable("item_images", {
    id: serial("id").primaryKey(),
    item_id: integer("item_id")
        .notNull()
        .references(() => items.id, {}),
    url: text("url").notNull().unique()
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
    legacy_id: integer("legacy_id").unique()
});

export const requestsRelations = relations(requests, ({ one, many }) => ({
    user: one(user, {
        fields: [requests.user_id],
        references: [user.id]
    }),
    categories: many(requestCategories),
    images: many(requestImages)
}));

export const requestCategories = pgTable("request_categories", {
    id: serial("id").primaryKey(),
    request_id: integer("request_id")
        .notNull()
        .references(() => requests.id, {}),
    category: categoriesEnum("category").notNull(),
    legacy_id: integer("legacy_id").unique()
});

export const requestCategoriesRelations = relations(
    requestCategories,
    ({ one }) => ({
        request: one(requests, {
            fields: [requestCategories.request_id],
            references: [requests.id]
        })
    })
);

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
