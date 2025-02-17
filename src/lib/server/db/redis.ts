import { createClient, type RedisClientType } from "redis";
import { REDIS_URL } from "$env/static/private";

/**
 * Service for interacting with Redis using a reference-counted connection.
 * Manages a single Redis connection that is shared across multiple operations
 * and automatically cleaned up when no operations are in progress.
 *
 * @example
 * // Single operation
 * await RedisService.set("key", "value");
 *
 * // Multiple operations sharing one connection
 * await RedisService.withConnection(async (client) => {
 *     await client.set("key1", "value1");
 *     await client.set("key2", "value2");
 *     const value = await client.get("key1");
 * });
 */

export class RedisService {
    private static client: RedisClientType | null = null;
    private static connectionCount = 0;

    // Get a Redis client
    private static async getClient(): Promise<RedisClientType> {
        if (!this.client || this.connectionCount === 0) {
            this.client = createClient({
                url: REDIS_URL
            });
            await this.client.connect();
        }
        this.connectionCount++;
        return this.client;
    }

    // Release the Redis client
    private static async releaseClient(): Promise<void> {
        this.connectionCount--;
        if (this.connectionCount === 0 && this.client) {
            await this.client.quit();
            this.client = null;
        }
    }

    // Connect to the Redis server and run an operation
    private static async withConnection<T>(
        fn: (client: RedisClientType) => Promise<T>
    ): Promise<T> {
        const client = await this.getClient();

        try {
            return await fn(client);
        } finally {
            await client.quit();
        }
    }

    // Set a key in the database
    public static async set(key: string, value: string): Promise<void> {
        await this.withConnection((client) => client.set(key, value));
    }

    // Get a key from the database
    public static async get(key: string): Promise<string | null> {
        return await this.withConnection((client) => client.get(key));
    }

    // Remove a key from the database
    public static async del(key: string): Promise<void> {
        await this.withConnection((client) => client.del(key));
    }

    // Increment a key by 1
    public static async incr(key: string): Promise<number> {
        return await this.withConnection((client) => client.incr(key));
    }

    // Decrement a key by 1
    public static async decr(key: string): Promise<number> {
        return await this.withConnection((client) => client.decr(key));
    }

    // Check if a key exists
    public static async exists(key: string): Promise<boolean> {
        return (
            (await this.withConnection((client) => client.exists(key))) === 1
        );
    }
}
