<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Carousel from "$lib/components/ui/carousel";
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";

    import {
        type Infer,
        superForm,
        type SuperValidated
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    import { goto } from "$app/navigation";
    // import moment from "moment";
    import { formSchema, type FormSchema } from "./schema";

    import { X } from "lucide-svelte";
    import { CATEGORIES, QUALITIES } from "$lib";
    import type { CreateItemState } from "../../api/items/create/schema";
    import type { CreateItemImageState } from "../../api/items/createImage/schema";

    export let data: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data, {
        validators: zodClient(formSchema)
    });

    const { form: formData, enhance } = form;

    async function uploadForm() {
        const postData: CreateItemState = {
            name: $formData.name,
            price: $formData.price.toString(),
            quality: $formData.quality,
            description: $formData.description,
            item_type: "sell",
            categories: $formData.categories
        };

        let response;
        // Fetch from "/api/items/create" with postData
        try {
            response = await fetch("/api/items/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error("Failed to upload item");
                return;
            }
        } catch (error) {
            console.error("Failed to upload item", error);
            return;
        }

        const responseJson = await response.json();
        console.log(responseJson);

        for (const image of $formData.images) {
            const uploadData: CreateItemImageState = {
                item_id: responseJson.id,
                file: image
            };

            let imageResponse;
            try {
                imageResponse = await fetch("/api/items/createImage", {
                    method: "POST",
                    body: JSON.stringify(uploadData)
                });

                if (imageResponse.ok) {
                    const data = await imageResponse.json();
                    console.log(data);
                } else {
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

<div class="my-6 px-32 py-6">
    <div class="mb-4">
        <h2 class="text-2xl font-semibold text-gray-800">Item Post Form</h2>
        <hr class="my-2 border-gray-300" />
    </div>

    <form
        method="POST"
        use:enhance
        class="flex flex-col py-6"
        on:submit|preventDefault={uploadForm}>
        <div class="flex-4 mb-5 flex w-full">
            <div class="flex w-1/2 flex-col items-center pr-4">
                <Carousel.Root class="h-max w-full max-w-xs">
                    <Carousel.Content>
                        {#if $formData.images && $formData.images.length > 0}
                            {#each $formData.images as image, i (i)}
                                <Carousel.Item>
                                    <div class="p-1">
                                        <Card.Root>
                                            <Card.Content
                                                class="flex aspect-square items-center justify-center p-1">
                                                <img
                                                    class="h-full w-auto rounded-xl object-cover"
                                                    src={URL.createObjectURL(
                                                        image as File
                                                    )}
                                                    alt="Uploaded Image {i}" />
                                            </Card.Content>
                                        </Card.Root>
                                        <Button
                                            class="absolute right-0 top-0 m-5 h-8 w-8 rounded-full bg-red-500 p-1 text-xs text-white shadow-lg"
                                            title="remove this image"
                                            onclick={(_: Event): void => {
                                                console.log("test");
                                                if (
                                                    $formData.images &&
                                                    $formData.images.length > 0
                                                ) {
                                                    $formData.images.splice(
                                                        i,
                                                        1
                                                    );
                                                    console.log("removed");
                                                    console.log(
                                                        $formData.images
                                                    );
                                                }
                                            }}>
                                            <X />
                                        </Button>
                                    </div>
                                </Carousel.Item>
                            {/each}
                        {:else}
                            <Carousel.Item>
                                <div class="p-1">
                                    <Card.Root>
                                        <Card.Content
                                            class="flex aspect-square items-center justify-center p-1">
                                            <p class="text-gray-500">
                                                No images uploaded
                                            </p>
                                        </Card.Content>
                                    </Card.Root>
                                </div>
                            </Carousel.Item>
                        {/if}
                    </Carousel.Content>
                    <Carousel.Previous />
                    <Carousel.Next />
                </Carousel.Root>
                <Form.Field {form} name="images">
                    <Form.Control>
                        <Form.Label class="block w-[100%] text-center text-sm "
                            >Uploaded
                            <span class="font-bold text-blue-600">
                                {$formData.images?.length || 0} out of 5
                            </span>
                            images
                        </Form.Label>
                        <div class="flex items-center">
                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onchange={(event: Event) => {
                                    const target =
                                        event.target as HTMLInputElement | null;
                                    if (target && target.files) {
                                        const files = Array.from(
                                            target.files
                                        ) as File[];
                                        $formData.images = files; // Assign all uploaded files to formData
                                    }
                                    console.log("images", $formData.images);
                                }}
                                class="block w-full cursor-pointer rounded-lg border border-gray-300 text-sm text-gray-500 focus:outline-none"
                                disabled={($formData.images?.length || 0) >=
                                    5} />
                        </div>
                    </Form.Control>
                    <Form.Description class="text-center"
                        >Upload images for your post.</Form.Description>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
            <div class="w-1/2 p-5 shadow-lg">
                <h2 class="text-center text-xl font-bold">Item Information</h2>
                <h3 class="text-md text-center text-gray-600">
                    Fill out the following information.
                </h3>
                <Form.Field {form} name="name">
                    <Form.Control>
                        <Form.Label>Name</Form.Label>
                        <Input bind:value={$formData.name} required />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field {form} name="description">
                    <Form.Control>
                        <Form.Label>Description</Form.Label>
                        <Textarea bind:value={$formData.description} required />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <div class="flex items-center space-x-12">
                    <Form.Field {form} name="price">
                        <Form.Control>
                            <Form.Label>Price (USD)</Form.Label>
                            <Input
                                type="number"
                                bind:value={$formData.price}
                                required />
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                    <!-- <Form.Field {form} name="negotiable">
                        <Form.Control>
                            <Form.Label>Negotiability</Form.Label>
                            <div class="flex items-center">
                                <input
                                    type="checkbox"
                                    class="h-7 w-7 rounded border-gray-900 text-blue-600 outline-none focus:ring-blue-500"
                                    bind:checked={$formData.negotiable} />
                                <label
                                    for="negotiable-checkbox"
                                    class="ml-2 text-xs text-gray-700">
                                    {$formData.negotiable
                                        ? "Negotiable"
                                        : "Non-negotiable"}
                                </label>
                            </div>
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field> -->
                </div>

                <div class="flex space-x-8">
                    <Form.Field {form} name="categories">
                        <Form.Control>
                            <Form.Label>Categories</Form.Label>
                            <select
                                multiple
                                bind:value={$formData.categories}
                                placeholder="select categories"
                                class="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                {#each CATEGORIES as category}
                                    <option value={category}>{category}</option>
                                {/each}
                            </select>
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Field {form} name="quality">
                        <Form.Control>
                            <Form.Label>Condition</Form.Label>
                            <select
                                bind:value={$formData.quality}
                                required
                                class="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option value="" disabled selected
                                    >Select quality</option>
                                {#each QUALITIES as quality}
                                    <option value={quality}>{quality}</option>
                                {/each}
                            </select>
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                </div>
            </div>
        </div>
        <div class="mt-10 flex w-full flex-1 justify-around">
            <Form.Button
                onclick={() => goto("/home")}
                class="rounded-md bg-gray-300 px-12 py-2 text-gray-700 hover:bg-gray-400"
                >Cancel</Form.Button>
            <Form.Button type="submit" class="px-12">Submit</Form.Button>
        </div>
    </form>
</div>
