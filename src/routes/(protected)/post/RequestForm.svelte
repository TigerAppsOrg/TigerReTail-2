<script lang="ts">
    import {
        type Infer,
        superForm,
        type SuperValidated
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { goto } from "$app/navigation";
    import { requestFormSchema, type RequestFormSchema } from "./schema";
    import { X } from "lucide-svelte";
    import { CATEGORIES } from "$lib";
    import type { CreateRequestState } from "../../api/requests/create/schema";
    import type { CreateRequestImageState } from "../../api/requests/createImage/schema";
    import type { CreateImageUrlState } from "../../api/createImageURL/schema";

    let { data } = $props();

    const { form, enhance } = superForm(data.requestForm, {
        validators: zodClient(requestFormSchema),
        dataType: "json"
    });

    async function uploadForm() {
        const postData: CreateRequestState = {
            name: $form.name,
            price: $form.price,
            description: $form.description || "",
            categories: $form.categories
        };

        let response;
        try {
            response = await fetch("/api/requests/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                console.error("Failed to upload request");
                return;
            }
        } catch (error) {
            console.error("Failed to upload request", error);
            return;
        }

        const responseJson = await response.json();

        for (const image of $form.images) {
            // Get file type
            const validTypes = ["image/jpeg", "image/png", "image/webp"];

            if (!validTypes.includes(image.type)) {
                console.error("Bad file type");
                return;
            }

            const uuid = crypto.randomUUID();
            const extension = image.type.split("/")[1];

            const uploadLinkRequest: CreateImageUrlState = {
                extension
            };

            let writeSignedUrl: string;
            try {
                const imageUrlResponse = await fetch("/api/createImageURL", {
                    method: "POST",
                    body: JSON.stringify(uploadLinkRequest)
                });

                if (!imageUrlResponse.ok) {
                    console.error("Failed to upload image");
                    return;
                }
                let json = await imageUrlResponse.json();
                writeSignedUrl = json.writeSignedUrl;
            } catch (error) {
                console.error("Failed to upload image");
                return;
            }

            const uploadResponse = await fetch(writeSignedUrl, {
                method: "PUT",
                body: image,
                headers: {
                    "Content-Type": image.type
                }
            });

            if (!uploadResponse.ok) {
                console.error("Failed to upload image");
                return;
            }

            const uploadedImageUrl = writeSignedUrl.split("?")[0];

            const uploadData: CreateRequestImageState = {
                request_id: responseJson.id,
                url: uploadedImageUrl
            };

            try {
                const imageResponse = await fetch("/api/requests/createImage", {
                    method: "POST",
                    body: JSON.stringify(uploadData)
                });

                if (!imageResponse.ok) {
                    console.error("Failed to upload image");
                    return;
                }
            } catch (error) {
                console.error("Failed to upload image", error);
                return;
            }
        }

        goto("/home");
    }
</script>

<div>
    <!-- <h2>Item Request Form</h2>
    <hr /> -->

    <div>
        <!-- Item Name -->
        <div>
            <label for="name">What are you looking for?</label>
            <input type="text" id="name" bind:value={$form.name} required />
        </div>

        <!-- Price -->
        <div>
            <label for="price">Budget ($)</label>
            <input
                type="text"
                id="price"
                bind:value={$form.price}
                placeholder="e.g. $20-50 or 'Any'"
                required />
        </div>

        <!-- Categories -->
        <div>
            <label id="categories-label" for="categories">Categories</label>
            <div role="group" aria-labelledby="categories-label">
                {#each CATEGORIES as category}
                    <label>
                        <input
                            type="checkbox"
                            value={category}
                            id={`category-${category}`}
                            checked={$form.categories?.includes(category)}
                            onchange={(e) => {
                                const checked = e.currentTarget.checked;
                                if (
                                    checked &&
                                    !$form.categories.includes(category)
                                ) {
                                    $form.categories = [
                                        ...$form.categories,
                                        category
                                    ];
                                } else if (!checked) {
                                    $form.categories = $form.categories.filter(
                                        (cat: string) => cat !== category
                                    );
                                }
                            }} />
                        <span>{category}</span>
                    </label>
                {/each}
            </div>
        </div>

        <!-- Description -->
        <div>
            <label for="description">Details (optional)</label>
            <textarea
                id="description"
                bind:value={$form.description}
                rows="4"
                placeholder="Provide any additional details about what you're looking for"
            ></textarea>
        </div>

        <!-- Image Upload -->
        <div>
            <label for="images">Upload Reference Images (optional)</label>
            <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onchange={(e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files) {
                        $form.images = Array.from(files);
                    }
                }} />
        </div>

        <!-- Image Preview -->
        {#if $form.images && $form.images.length > 0}
            <div>
                <span id="image-previews-label">Image Previews</span>
                <div role="group" aria-labelledby="image-previews-label">
                    {#each $form.images as image, i}
                        <div
                            style="position: relative; display: inline-block; margin: 5px;">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style="max-width: 100px; max-height: 100px;" />
                            <button
                                type="button"
                                style="position: absolute; top: 0; right: 0;"
                                onclick={() => {
                                    $form.images = $form.images.filter(
                                        (_: any, index: number) => index !== i
                                    );
                                }}>
                                <X size={16} />
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- Submit Button -->
        <div>
            <button type="submit" onclick={uploadForm}>Submit Request</button>
        </div>
    </div>
</div>
