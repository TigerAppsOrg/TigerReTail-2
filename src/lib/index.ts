// place files you want to import through the `$lib` alias in this folder.

import { z } from "zod";

// weird Array<String> types to be used for database types as well
export const CATEGORIES = [
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
] as const;

export const ZodCategory = z.enum(CATEGORIES);

export const AFFILIATIONS = ["ias", "princeton"] as const;

export const ZodAffiliation = z.enum(AFFILIATIONS);

export const ITEM_TYPES = ["sell", "rent"] as const;

export const ZodItemType = z.enum(ITEM_TYPES);

export const QUALITIES = ["new", "like new", "good", "fair", "poor"] as const;

export const ZodQuality = z.enum(QUALITIES);

export const STATUSES = ["active", "inactive", "sold", "expired"] as const;

export const ZodStatus = z.enum(STATUSES);
