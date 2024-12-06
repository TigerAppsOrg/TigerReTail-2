import type { Affiliation } from "$lib/server/db/schema";
import type { Session } from "svelte-kit-cookie-session";

export type SessionData = {
    name: string;
    mail: string;
    affiliation: Affiliation;
    netid: string | null;
    id: number;
};

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            session: Session<SessionData>;
        }
        interface PageData {
            session: Session<SessionData>;
        }
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
