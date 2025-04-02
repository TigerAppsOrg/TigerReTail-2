<script lang="ts">
    import {
        type Infer,
        superForm,
        type SuperValidated
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { goto } from "$app/navigation";
    import { formSchema, type FormSchema } from "./schema";
    import { X } from "lucide-svelte";
    import { CATEGORIES, QUALITIES } from "$lib";
    import type { CreateItemState } from "../../api/items/create/schema";
    import type { CreateItemImageState } from "../../api/items/createImage/schema";

    let { data } = $props();

    const { form, enhance } = superForm(data.form, {
        validators: zodClient(formSchema),
        dataType: "json"
    });

    async function uploadForm() {
        console.log($form);
        const postData: CreateItemState = {
            name: $form.name,
            price: $form.price.toString(),
            quality: $form.quality,
            description: $form.description,
            item_type: "sell",
            categories: $form.categories
        };

        console.log(postData);

        let response;
        try {
            response = await fetch("/api/items/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                console.error("Failed to upload item");
                return;
            }
        } catch (error) {
            console.error("Failed to upload item", error);
            return;
        }

        const responseJson = await response.json();

        for (const image of $form.images) {
            const uploadData: CreateItemImageState = {
                item_id: responseJson.id,
                file: image
            };

            console.log(uploadData);
            try {
                const imageResponse = await fetch("/api/items/createImage", {
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
    <h2>Item Post Form</h2>
    <hr />

    <div>
        <!-- Item Name -->
        <div>
            <label for="name">Item Name</label>
            <input type="text" id="name" bind:value={$form.name} required />
        </div>

        <!-- Price -->
        <div>
            <label for="price">Price ($)</label>
            <input
                type="number"
                id="price"
                bind:value={$form.price}
                min="0"
                step="0.01"
                required />
        </div>

        <!-- Quality -->
        <div>
            <label for="quality">Quality</label>
            <select id="quality" bind:value={$form.quality} required>
                <option value="" disabled selected>Select quality</option>
                {#each QUALITIES as quality}
                    <option value={quality}>{quality}</option>
                {/each}
            </select>
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
                            on:change={(e) => {
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
                                        (cat) => cat !== category
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
            <label for="description">Description</label>
            <textarea
                id="description"
                bind:value={$form.description}
                rows="4"
                required></textarea>
        </div>

        <!-- Image Upload -->
        <div>
            <label for="images">Upload Images</label>
            <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                on:change={(e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files) {
                        $form.images = Array.from(files);
                    }
                }} />
        </div>

        <!-- Image Preview -->
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
                                on:click={() => {
                                    $form.images = $form.images.filter(
                                        (_, index) => index !== i
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
            <button type="submit" on:click={uploadForm}> Submit </button>
        </div>
    </div>
</div>
