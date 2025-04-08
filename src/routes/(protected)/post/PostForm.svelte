<script lang="ts">
    import { goto } from "$app/navigation";
    import { CATEGORIES, QUALITIES } from "$lib";
    import { X } from "lucide-svelte";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import type { CreateImageUrlState } from "../../api/createImageURL/schema";
    import type { CreateItemState } from "../../api/items/create/schema";
    import type { CreateItemImageState } from "../../api/items/createImage/schema";
    import { itemFormSchema } from "./schema";
    import { Button } from "$lib/components/ui/button";
    import Input from "$lib/components/ui/input/input.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import DatePicker from "$lib/components/DatePicker.svelte";
    import * as Select from "$lib/components/ui/select";

    let { data } = $props();

    const { form, enhance } = superForm(data.itemForm, {
        validators: zodClient(itemFormSchema),
        dataType: "json"
    });

    const uploadForm = async () => {
        const postData: CreateItemState = {
            name: $form.name,
            price: $form.price.toString(),
            quality: $form.quality,
            description: $form.description,
            expirationDate: $form.expirationDate,
            item_type: "sell",
            categories: $form.categories
        };

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

            const uploadData: CreateItemImageState = {
                item_id: responseJson.id,
                url: uploadedImageUrl
            };

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
    };

    const fmtStr = (str: string) =>
        str
            .split(" ")
            .map((x: string) => x[0].toUpperCase() + x.slice(1))
            .join(" ");
</script>

<div class="flex gap-4">
    <section id="images">
        <!-- Image Upload -->
        <div>
            <label for="images">Upload Images</label>
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
    </section>
    <section id="post-form" class="std-area flex-1">
        <div class="-space-y-1 mb-6">
            <h2 class="text-lg">Item Information</h2>
            <p class="text-light text-sm">
                Fill out the form below to create a new item listing.
            </p>
        </div>

        <div class="space-y-4">
            <div>
                <label for="name">
                    <span> Name </span>
                    <span class="text-red-500">*</span>
                </label>
                <Input
                    type="text"
                    id="name"
                    bind:value={$form.name}
                    required
                    class="w-full"
                    placeholder="Enter item name" />
            </div>

            <div>
                <label for="description">
                    <span> Description </span>
                    <span class="text-red-500">*</span>
                </label>
                <Textarea id="description" bind:value={$form.description} />
            </div>

            <div id="field-grid">
                <div>
                    <label for="price">
                        <span> Price ($) </span>
                        <span class="text-red-500">*</span>
                    </label>
                    <Input
                        type="number"
                        id="price"
                        bind:value={$form.price}
                        min="0"
                        step="1"
                        required
                        class="w-full"
                        placeholder="Enter item price" />
                </div>

                <div>
                    <div>
                        <span> Expiration Date </span>
                        <span>
                            <span class="text-red-500">*</span>
                        </span>
                    </div>
                    <DatePicker bind:value={$form.expirationDate} />
                </div>

                <div>
                    <div>
                        <span> Quality </span>
                        <span>
                            <span class="text-red-500">*</span>
                        </span>
                    </div>
                    <Select.Root type="single" bind:value={$form.quality}>
                        <Select.Trigger class="w-full">
                            {$form.quality
                                ? fmtStr($form.quality)
                                : "Select Quality"}
                        </Select.Trigger>
                        <Select.Content>
                            {#each QUALITIES as quality}
                                <Select.Item value={quality} label="quality">
                                    {fmtStr(quality)}
                                </Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>

                <div>
                    <div>
                        <span> Categories </span>
                        <span>
                            <span class="text-red-500">*</span>
                        </span>
                    </div>
                    <Select.Root type="single" bind:value={$form.quality}>
                        <Select.Trigger class="w-full">
                            {$form.quality
                                ? fmtStr($form.quality)
                                : "Select Quality"}
                        </Select.Trigger>
                        <Select.Content>
                            {#each QUALITIES as quality}
                                <Select.Item value={quality} label="quality">
                                    {fmtStr(quality)}
                                </Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>
            </div>
        </div>
    </section>
</div>

<!-- Submit Button -->
<div class="w-full flex justify-end mt-6">
    <Button size="lg" type="submit" onclick={uploadForm}>Submit</Button>
</div>

<style lang="postcss">
    #field-grid {
        @apply grid grid-cols-1 md:grid-cols-2 gap-4;
    }
</style>
