<script lang="ts">
    import { goto } from "$app/navigation";
    import { CATEGORIES } from "$lib";
    import { X } from "lucide-svelte";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import type { CreateImageUrlState } from "../../api/createImageURL/schema";
    import type { CreateRequestState } from "../../api/requests/create/schema";
    import type { CreateRequestImageState } from "../../api/requests/createImage/schema";
    import { requestFormSchema } from "./schema";
    import { Input } from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select";
    import { Textarea } from "$lib/components/ui/textarea";
    import DatePicker from "$lib/components/DatePicker.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    let { data } = $props();

    const { form, enhance } = superForm(data.requestForm, {
        validators: zodClient(requestFormSchema),
        dataType: "json"
    });

    const uploadForm = async () => {
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
    };

    const fmtStr = (str: string) =>
        str
            .split(" ")
            .map((x: string) => x[0].toUpperCase() + x.slice(1))
            .join(" ");
</script>

<div class="flex gap-4">
    <section id="request-form" class="std-area flex-1">
        <div class="-space-y-1 mb-6">
            <h2 class="text-lg">Request Information</h2>
            <p class="text-light text-sm">
                Fill out the form below to request an item. Please be as
                specific as possible.
            </p>
        </div>

        <div class="space-y-4">
            <div>
                <label for="name">
                    <span> Item Name </span>
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
                    <span> Details </span>
                    <span class="text-red-500">*</span>
                </label>
                <Textarea
                    id="description"
                    placeholder="Enter a detailed description of the item"
                    bind:value={$form.description} />
            </div>

            <div id="field-grid">
                <div>
                    <label for="price">
                        <span> Budget </span>
                        <span class="text-red-500">*</span>
                    </label>
                    <Input
                        type="text"
                        id="price"
                        bind:value={$form.price}
                        required
                        class="w-full"
                        placeholder="e.g. $20-50 or 'Any'" />
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
                        <span> Categories </span>
                        <span>
                            <span class="text-red-500">*</span>
                        </span>
                    </div>
                    <Select.Root type="multiple" bind:value={$form.categories}>
                        <Select.Trigger class="w-full">
                            {$form.categories.length} selected
                        </Select.Trigger>
                        <Select.Content>
                            {#each CATEGORIES as category}
                                <Select.Item value={category} label={category}>
                                    {fmtStr(category)}
                                </Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>
            </div>
        </div>
    </section>

    <section>
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
    </section>
</div>

<!-- Submit Button -->
<div class="w-full flex justify-end mt-6">
    <Button size="lg" type="submit" onclick={uploadForm}>Post Request</Button>
</div>

<style lang="postcss">
    #field-grid {
        @apply grid grid-cols-1 lg:grid-cols-3 gap-4;
    }
</style>
