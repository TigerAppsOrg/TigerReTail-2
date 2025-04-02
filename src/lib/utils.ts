import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

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
