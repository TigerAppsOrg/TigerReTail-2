import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Utility type to wrap a value in an object
 * Used when creating shared Svelte $state() in .svelte.ts files
 * @template T - type of the value to be wrapped
 */
export type Box<T> = {
    value: T;
};

/**
 * Formats a string by capitalizing the first letter of each word
 * @param str - string to be formatted
 * @returns formatted string
 */
export const fmtStr = (str: string) =>
    str
        .split(" ")
        .map((x: string) => x[0].toUpperCase() + x.slice(1))
        .join(" ");
