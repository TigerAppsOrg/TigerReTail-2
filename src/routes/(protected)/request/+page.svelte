<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";

    import {
        type Infer,
        superForm,
        type SuperValidated
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { z } from "zod";

    import { goto } from "$app/navigation";
    import moment from "moment";

    import { CATEGORIES, QUALITIES } from "$lib";

    const formSchema = z.object({
        image: z.union([z.string(), z.instanceof(File)]).optional(),
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        price: z.number().min(0, "Price must be a positive number"),
        negotiable: z.boolean(), // Changed to enum for radio options
        deadline: z.string().optional(),
        category: z.enum(CATEGORIES, {
            required_error: "Category is required"
        }),
        quality: z.enum(QUALITIES, {
            required_error: "Quality is required"
        })
    });

    type FormSchema = typeof formSchema;
    type FormData = z.infer<FormSchema>;

    export let data: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data, {
        validators: zodClient(formSchema)
    });

    const { form: formData, enhance } = form;

    // Handle image upload
    function handleImageUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            const files = Array.from(target.files);
            // Process the uploaded files as needed
            console.log("Uploaded files:", files);
        }
    }
</script>

<div class="my-6 px-32 py-6">
    <div class="mb-4">
        <h2 class="text-2xl font-semibold text-gray-800">Item Request Form</h2>
        <hr class="my-2 border-gray-300" />
    </div>

    <form method="POST" use:enhance class="flex flex-col py-6">
        <div class="flex-4 mb-5 flex w-full">
            <div class="flex w-1/2 flex-col items-center pr-4">
                <div class="h-max w-full max-w-xs p-1">
                    <Card.Root>
                        <Card.Content
                            class="flex aspect-square items-center justify-center p-1">
                            {#if $formData.image}
                                <img
                                    class="h-full w-auto rounded-xl object-cover"
                                    src={typeof $formData.image === "string"
                                        ? $formData.image
                                        : URL.createObjectURL($formData.image)}
                                    alt="Uploaded request" />
                            {:else}
                                <p class="text-gray-500">No image uploaded</p>
                            {/if}
                        </Card.Content>
                    </Card.Root>
                </div>
                <Form.Field {form} name="image">
                    <Form.Control>
                        <Input
                            type="file"
                            accept="image/*"
                            onchange={(event: Event): void => {
                                const target = event.target as HTMLInputElement;
                                if (target.files) {
                                    const files = Array.from(target.files);
                                    $formData.image = files[0]; // Assign the first selected image to formData.image
                                    console.log("Uploaded file:", files[0]);
                                }
                            }}
                            class="cursor-pointer rounded-lg border border-gray-300 text-sm text-gray-500 focus:outline-none" />
                    </Form.Control>
                    <Form.Description class="text-center"
                        >Upload an image of what you are requesting.</Form.Description>
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
                    <Form.Field {form} name="negotiable">
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
                    </Form.Field>
                </div>

                <Form.Field {form} name="deadline">
                    <Form.Control>
                        <Form.Label>Deadline to Buy</Form.Label>
                        <Input
                            type="date"
                            bind:value={$formData.deadline}
                            required />
                        {#if $formData.deadline}
                            <p class="mt-1 pl-2 text-xs text-gray-500">
                                {moment($formData.deadline).fromNow(true)} from today
                            </p>
                        {/if}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <div class="flex space-x-8">
                    <Form.Field {form} name="category">
                        <Form.Control>
                            <Form.Label>Category</Form.Label>
                            <select
                                bind:value={$formData.category}
                                required
                                placeholder="select category"
                                class="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option value="" disabled selected
                                    >Select category</option>
                                {#each CATEGORIES as category}
                                    <option value={category}>{category}</option>
                                {/each}
                            </select>
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Field {form} name="quality">
                        <Form.Control>
                            <Form.Label>Quality</Form.Label>
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
