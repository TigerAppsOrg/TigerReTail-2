import { type Box } from "$lib/utils";

export type SortValue =
    | "date_new"
    | "date_old"
    | "name_asc"
    | "name_desc"
    | "price_low"
    | "price_high";

export const sortValues = [
    { value: "date_new", label: "Date (newest first)" },
    { value: "date_old", label: "Date (oldest first)" },
    { value: "name_asc", label: "Name (A-Z)" },
    { value: "name_desc", label: "Name (Z-A)" },
    { value: "price_low", label: "Price (low to high)" },
    { value: "price_high", label: "Price (high to low)" }
];

export type FilterGroup = "category" | "quality";

export type Filters = {
    // This is an array instead of a set because Svelte $state()
    // rune is naturally reactive to changes in arrays
    // and with sets it is a bit more complicated
    [key in FilterGroup]: string[];
};

export type SearchState = {
    query: string;
    sortBy: SortValue;
    filters: Filters;
};

export const searchState = $state<Box<SearchState>>({
    value: {
        query: "",
        sortBy: "date_new",
        filters: {
            category: [],
            quality: []
        }
    }
});
