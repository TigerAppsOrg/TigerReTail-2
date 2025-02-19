// place files you want to import through the `$lib` alias in this folder.

// weird Array<String> types to be used for database types as well
export const CATEGORIES: readonly [string, ...string[]] = [
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
];

export const AFFILIATIONS: readonly [string, ...string[]] = [
    "ias",
    "princeton"
];

export const ITEM_TYPES: readonly [string, ...string[]] = ["sell", "rent"];

export const QUALITIES: readonly [string, ...string[]] = [
    "new",
    "like new",
    "good",
    "fair",
    "poor"
];

export const STATUSES: readonly [string, ...string[]] = [
    "active",
    "inactive",
    "sold",
    "expired"
];
