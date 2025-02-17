import { EMAIL_WHITELIST, type Result } from "./constants";

/**
 * Validates user input for authentication and registration.
 * Provides methods to validate emails, names, and passwords according to security requirements.
 *
 * All validation methods return a Result type indicating success/failure with associated data or errors.
 *
 * Can run on both client and server.
 *
 * @example
 * const validator = new Validator();
 *
 * // Validate password
 * const passwordResult = validator.isStrongPassword("Password123!");
 * if (!passwordResult.ok) {
 *   console.log(passwordResult.error); // Array of validation errors
 * }
 */
export class Validator {
    MAX_NAME_LENGTH = 100;
    MIN_PASSWORD_LENGTH = 8;
    MAX_PASSWORD_LENGTH = 72;

    isIAS(email: string): Result<boolean, string> {
        const iasPattern = /@ias.edu$/;

        if (iasPattern.test(email)) {
            return { ok: true, data: true };
        } else {
            return { ok: false, error: "Invalid email domain" };
        }
    }

    isValidEmail(email: string): Result<boolean, string[]> {
        const errorList: string[] = [];

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorList.push("Invalid email format");
        }

        if (!this.isIAS(email).ok && !EMAIL_WHITELIST.includes(email)) {
            errorList.push("Invalid email domain");
        }

        return errorList.length > 0
            ? { ok: false, error: errorList }
            : { ok: true, data: true };
    }

    isValidName(name: string): Result<boolean, string[]> {
        const errorList: string[] = [];

        if (name.length <= 0) {
            errorList.push("Name cannot be empty");
        }

        if (name.length > this.MAX_NAME_LENGTH) {
            errorList.push("Name is too long");
        }

        return errorList.length > 0
            ? { ok: false, error: errorList }
            : { ok: true, data: true };
    }

    isStrongPassword(password: string): Result<boolean, string[]> {
        const errorList: string[] = [];

        if (password.length < this.MIN_PASSWORD_LENGTH) {
            errorList.push("Password is too short");
        }

        if (password.length > this.MAX_PASSWORD_LENGTH) {
            errorList.push("Password is too long");
        }

        if (!/[A-Z]/.test(password)) {
            errorList.push("Password must contain an uppercase letter");
        }

        if (!/[a-z]/.test(password)) {
            errorList.push("Password must contain a lowercase letter");
        }

        if (!/[0-9]/.test(password)) {
            errorList.push("Password must contain a number");
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            errorList.push("Password must contain a special character");
        }

        return errorList.length > 0
            ? { ok: false, error: errorList }
            : { ok: true, data: true };
    }
}
