import * as bcrypt from "bcrypt";
import PEPPER_SECRET from "$env/static/private";
import { db } from "./db";
import { pwdAuth, user } from "./db/schema";
import { and, eq, sql } from "drizzle-orm";
import type { SessionData } from "../../app";

type AuthUser = {
    name: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
};

/**
 * Password authentication service for IAS users.
 */
export class AuthService {
    private SALT_ROUNDS = 10;
    private PEPPER = PEPPER_SECRET;

    private isIAS(email: string): boolean {
        const iasPattern = /@ias.edu$/;
        return iasPattern.test(email);
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && this.isIAS(email);
    }

    private isValidName(name: string): boolean {
        return name.length > 0 && name.length <= 100;
    }

    private isStrongPassword(password: string): boolean {
        return (
            password.length >= 8 && // At least 8 characters
            /[A-Z]/.test(password) && // At least one uppercase letter
            /[a-z]/.test(password) && // At least one lowercase letter
            /[0-9]/.test(password) && // At least one number
            /[^A-Za-z0-9]/.test(password) // At least one special character
        );
    }

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
    ): Promise<AuthUser> {
        if (!this.isValidEmail(email)) {
            throw new Error("Email must be from @ias.edu");
        }

        if (!this.isValidName(name)) {
            throw new Error("Invalid name");
        }

        if (!this.isStrongPassword(password)) {
            throw new Error("Password is not strong enough");
        }

        const existingUser = await db
            .select({
                exists: sql<number>`1`
            })
            .from(user)
            .where(eq(user.email, email.toLowerCase()))
            .limit(1);
        if (existingUser.length > 0) {
            throw new Error("Email is already registered");
        }

        const { hash, salt } = await this.hashPassword(password);

        return {
            name,
            email: email.toLowerCase(),
            passwordHash: hash,
            passwordSalt: salt
        };
    }

    /**
     * Hash password with salt
     * @param password Input password
     * @returns Hashed password and salt
     */
    async hashPassword(
        password: string
    ): Promise<{ hash: string; salt: string }> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        const pepperedPassword = password + this.PEPPER;
        const hash = await bcrypt.hash(pepperedPassword, salt);

        return { hash, salt };
    }

    /**
     * Verify password against hash
     * @param password Plain text password
     * @param hash Hashed password
     * @returns True if password matches hash
     */
    async verifyPassword(password: string, hash: string): Promise<boolean> {
        const pepperedPassword = password + this.PEPPER;
        return await bcrypt.compare(pepperedPassword, hash);
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
    ): Promise<SessionData> {
        const userData = await this.processRegData(name, email, password);

        const newUser = await db
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
            name: userData.name,
            mail: userData.email,
            affiliation: "ias",
            netid: null,
            id: newUser.id
        };
    }

    /**
     * Log in with email and password
     * @param email Input email
     * @param password Input password
     * @returns User session data
     */
    async login(email: string, password: string): Promise<SessionData> {
        // Error message is the same to prevent attackers from gaining information
        const ERR_MESSAGE = "Invalid email or password";

        const existingUser = await db
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

        if (existingUser.length === 0) {
            throw new Error(ERR_MESSAGE);
        }

        const isValidPassword = await this.verifyPassword(
            password,
            existingUser[0].password
        );

        if (!isValidPassword) {
            throw new Error(ERR_MESSAGE);
        }

        return {
            name: existingUser[0].name,
            mail: existingUser[0].email,
            affiliation: "ias",
            netid: null,
            id: existingUser[0].id
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
        if (!this.isStrongPassword(newPassword)) {
            throw new Error("New password is not strong enough");
        }
    }
}
