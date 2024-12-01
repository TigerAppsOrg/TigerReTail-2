<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    // import * as RadioGroup from "$lib/components/ui/radio-group";
    import * as Card from "$lib/components/ui/card";
    import * as Carousel from "$lib/components/ui/carousel";
    import { Textarea } from "$lib/components/ui/textarea";
    import {
        type Infer,
        superForm,
        type SuperValidated
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { z } from "zod";

    const formSchema = z.object({
        images: z.array(z.string()).optional(),
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        price: z.number().min(0, "Price must be a positive number"),
        negotiable: z.enum(["yes", "no"]).optional(), // Changed to enum for radio options
        deadline: z.string().optional(),
        category: z.string().min(1, "Category is required"),
        condition: z.string().min(1, "Condition is required")
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
        <h2 class="text-2xl font-semibold text-gray-800">Item Post Form</h2>
        <hr class="my-2 border-gray-300" />
    </div>

    <form method="POST" use:enhance class="flex py-6">
        <div class="flex w-full flex-col items-center pr-4">
            <Carousel.Root class="h-max w-full">
                <Carousel.Content>
                    {#if $formData.images && $formData.images.length > 0}
                        {#each $formData.images as image, i}
                            <Carousel.Item>
                                <div class="relative p-1">
                                    <Card.Root>
                                        <Card.Content
                                            class="flex aspect-square items-center justify-center p-1">
                                            <img
                                                class="h-full w-auto rounded-md object-cover"
                                                src={image}
                                                alt="Image {i}" />
                                        </Card.Content>
                                    </Card.Root>
                                    <button
                                        class="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
                                        on:click={() => {
                                            $formData.images.splice(i, 1);
                                            form.update();
                                        }}>
                                        Remove
                                    </button>
                                </div>
                            </Carousel.Item>
                        {/each}
                    {:else}
                        <Carousel.Item>
                            <!-- <div
                            
                                class="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-gray-300">
                                <p class="text-gray-500">No images chosen</p>
                            </div> -->
                        </Carousel.Item>
                    {/if}
                </Carousel.Content>
                <Carousel.Previous />
                <Carousel.Next />
            </Carousel.Root>
            <Form.Field {form} name="images">
                <Form.Control let:attrs>
                    <Form.Label>Add Images</Form.Label>
                    <Input
                        type="file"
                        multiple
                        accept="image/*"
                        {...attrs}
                        on:change={handleImageUpload}
                        class="block w-full cursor-pointer rounded-lg border border-gray-300 text-sm text-gray-500 focus:outline-none" />
                </Form.Control>
                <Form.Description
                    >Upload images for your post.</Form.Description>
                <Form.FieldErrors />
            </Form.Field>
        </div>
        <div class="w-1/2">
            <Form.Field {form} name="name">
                <Form.Control let:attrs>
                    <Form.Label>Name</Form.Label>
                    <Input {...attrs} bind:value={$formData.name} required />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="description">
                <Form.Control let:attrs>
                    <Form.Label>Description</Form.Label>
                    <Textarea
                        {...attrs}
                        bind:value={$formData.description}
                        required />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="price">
                <Form.Control let:attrs>
                    <Form.Label>Price</Form.Label>
                    <Input
                        type="number"
                        {...attrs}
                        bind:value={$formData.price}
                        required />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <!-- <Form.Field {form} name="negotiable">
            <Form.Control let:attrs>
                <Form.Label>Negotiable</Form.Label>
                <RadioGroup.Root bind:value={$formData.negotiable} {...attrs}>
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value="yes" id="negotiable-yes">
                            <RadioGroup.Indicator />
                        </RadioGroup.Item>
                        <Label for="negotiable-yes">Yes</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value="no" id="negotiable-no">
                            <RadioGroup.Indicator />
                        </RadioGroup.Item>
                        <Label for="negotiable-no">No</Label>
                    </div>
                </RadioGroup.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field> -->

            <Form.Field {form} name="deadline">
                <Form.Control let:attrs>
                    <Form.Label>Deadline to Sell</Form.Label>
                    <Input
                        type="date"
                        {...attrs}
                        bind:value={$formData.deadline}
                        required />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="category">
                <Form.Control let:attrs>
                    <Form.Label>Category</Form.Label>
                    <Input
                        {...attrs}
                        bind:value={$formData.category}
                        required />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="condition">
                <Form.Control let:attrs>
                    <Form.Label>Condition</Form.Label>
                    <Input
                        {...attrs}
                        bind:value={$formData.condition}
                        required />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Button>Submit</Form.Button>
        </div>
    </form>
</div>
