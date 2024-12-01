import { db } from "$lib/server/db";
import { itemImages, items } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { type FormData } from "./schema";
// import { itemImages, items, itemImagesRelations, itemsRelations } from "$lib/server/db/schema";

export const POST: RequestHandler = async ({
    request
}: {
    request: Request;
}): Promise<Response> => {
    // const sessionData = {}
    const formData: FormData = await request.json();
    type Item = typeof items.$inferInsert;

    try {
        const newItem: Item = {
            user_id: "", // Replace with actual user ID from session or context
            time_posted: new Date(),
            time_expire: formData.deadline
                ? new Date(formData.deadline)
                : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Default to one year from now
            name: formData.name,
            price: formData.price.toString(),
            quality: formData.quality,
            description: formData.description,
            // negotiable: formData.negotiable,
            status: "active",
            item_type: "sell",
            category: formData.category
        };
        const [createdItem, ..._] = await db
            .insert(items)
            .values(newItem)
            .returning();

        if (formData.images) {
            const imageInsertions = formData.images.map(image => ({
                item_id: createdItem.id,
                url:
                    typeof image === "string"
                        ? image
                        : URL.createObjectURL(image) // Handle image URL
            }));
            await db.insert(itemImages).values(imageInsertions);
        }

        return new Response(JSON.stringify({ success: true, item: newItem }), {
            status: 201
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        return new Response(
            JSON.stringify({ success: false, error: "Failed to save data" }),
            { status: 500 }
        );
    }
};
