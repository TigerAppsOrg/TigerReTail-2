import { type Result } from "$lib/constants";
import { Validator } from "$lib/validate";
import * as bcrypt from "bcrypt";
import { and, eq, sql } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { SessionData } from "../../app";
import { pwdAuth, user } from "./db/schema";

type AuthUser = {
    name: string;
    email: string;
    passwordHash: string;
};

/**
 * Password authentication service for IAS users.
 */
export class AuthService {
    private readonly SALT_ROUNDS = 10;
    private db: PostgresJsDatabase;
    private validator = new Validator();

    constructor(database: PostgresJsDatabase) {
        this.db = database;
    }

    //------------------------------------------------------------------

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    private async verifyPassword(
        password: string,
        hash: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    //------------------------------------------------------------------

    /**
     * Validate registration data and hash password
     * @param name Input name
     * @param email Input email
     * @param password Input password
     * @returns User object with hashed password
     */
    private async processRegData(
        name: string,
        email: string,
        password: string
    ): Promise<Result<AuthUser, string>> {
        if (!this.validator.isValidEmail(email).ok)
            return { ok: false, error: "Invalid email" };

        if (!this.validator.isValidName(name).ok)
            return { ok: false, error: "Invalid name" };

        if (!this.validator.isStrongPassword(password).ok)
            return { ok: false, error: "Password is not strong enough" };

        const existingUser = await this.db
            .select({
                exists: sql<number>`1`
            })
            .from(user)
            .where(eq(user.email, email.toLowerCase()))
            .limit(1);
        if (existingUser.length > 0) {
            return { ok: false, error: "Email already in use" };
        }

        const hash = await this.hashPassword(password);

        return {
            ok: true,
            data: {
                name,
                email: email.toLowerCase(),
                passwordHash: hash
            }
        };
    }

    /**
     * Register a new user
     * @param name Input name
     * @param email Input email
     * @param password Input password
     * @returns User session data
     */
    async register(
        name: string,
        email: string,
        password: string
    ): Promise<Result<SessionData, string>> {
        const userRes = await this.processRegData(name, email, password);
        if (!userRes.ok) return { ok: false, error: userRes.error };
        const userData = userRes.data;

        const newUser = await this.db
            .transaction(async (tx) => {
                const [newUser] = await tx
                    .insert(user)
                    .values({
                        name: userData.name,
                        email: userData.email,
                        affiliation: "ias"
                    })
                    .returning();

                await tx.insert(pwdAuth).values({
                    user_id: newUser.id,
                    password: userData.passwordHash,
                    verified: false
                });

                return newUser;
            })
            .catch((e) => {
                console.error("Error creating user:", e);
                throw new Error("Error creating user");
            });

        return {
            ok: true,
            data: {
                name: userData.name,
                mail: userData.email,
                affiliation: "ias",
                netid: null,
                id: newUser.id
            }
        };
    }

    /**
     * Log in with email and password
     * @param email Input email
     * @param password Input password
     * @returns User session data
     */
    async login(
        email: string,
        password: string
    ): Promise<Result<SessionData, string>> {
        // Error message is the same to prevent attackers from gaining information
        const ERR_MESSAGE = "Invalid email or password";

        const existingUser = await this.db
            .select({
                id: user.id,
                name: user.name,
                email: user.email,
                password: pwdAuth.password
            })
            .from(user)
            .where(
                and(
                    eq(user.email, email.toLowerCase()),
                    eq(user.affiliation, "ias")
                )
            )
            .innerJoin(pwdAuth, eq(user.id, pwdAuth.user_id))
            .limit(1);
        if (existingUser.length === 0) return { ok: false, error: ERR_MESSAGE };

        const isValidPassword = await this.verifyPassword(
            password,
            existingUser[0].password
        );
        if (!isValidPassword) return { ok: false, error: ERR_MESSAGE };

        return {
            ok: true,
            data: {
                name: existingUser[0].name,
                mail: existingUser[0].email,
                affiliation: "ias",
                netid: null,
                id: existingUser[0].id
            }
        };
    }

    /**
     * Change a user's password
     * @param userId ID of the user changing their password
     * @param oldPassword Old password
     * @param newPassword New password
     */
    async changePassword(
        userId: number,
        oldPassword: string,
        newPassword: string
    ) {
        if (!this.validator.isStrongPassword(newPassword).ok) {
            throw new Error("New password is not strong enough");
        }
    }
}
