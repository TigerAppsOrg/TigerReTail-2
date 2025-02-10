import * as bcrypt from "bcrypt";
import PEPPER_SECRET from "$env/static/private";

type User = {
    name: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
};

export class AuthService {
    private SALT_ROUNDS = 10;
    private PEPPER = PEPPER_SECRET;

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

    private async processRegData(
        name: string,
        email: string,
        password: string
    ): Promise<User> {
        if (!this.isValidEmail(email)) {
            throw new Error("Invalid email address");
        }

        if (!this.isValidName(name)) {
            throw new Error("Invalid name");
        }

        if (!this.isStrongPassword(password)) {
            throw new Error("Password is not strong enough");
        }

        const { hash, salt } = await this.hashPassword(password);

        return {
            name,
            email,
            passwordHash: hash,
            passwordSalt: salt
        };
    }

    async hashPassword(
        password: string
    ): Promise<{ hash: string; salt: string }> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        const pepperedPassword = password + this.PEPPER;
        const hash = await bcrypt.hash(pepperedPassword, salt);

        return { hash, salt };
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        const pepperedPassword = password + this.PEPPER;
        return await bcrypt.compare(pepperedPassword, hash);
    }

    async register(
        name: string,
        email: string,
        password: string
    ): Promise<User> {
        const userData = await this.processRegData(name, email, password);
        return userData;
    }

    async login(email: string, password: string): Promise<User | null> {}
}
