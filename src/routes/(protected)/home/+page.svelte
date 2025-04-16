<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import * as Select from "$lib/components/ui/select/";

    import { SearchIcon } from "lucide-svelte";

    import ItemView from "./ItemView.svelte";
    import LeftBar from "./LeftBar.svelte";
    import {
        itemList,
        searchState,
        sortValues,
        type SearchState
    } from "$lib/client/state.svelte";
    import {
        getItemsResponseSchema,
        getItemsSchema,
        type GetItemsState
    } from "../../api/items/get/schema";
    import { z } from "zod";
    import { ZodCategory, ZodQuality } from "$lib";

    let { data } = $props();

    let searchValue = $state("");
    let isCompact = $state(false);
    let sortByDisplay = $derived(
        sortValues.find((s) => s.value === searchState.value.sortBy)!.label
    );

    function handleSearch() {
        searchState.value.query = searchValue;
    }

    $effect(() => {
        const state = searchState.value;
        fetchItems(state);
    });

    const fetchItems = async (state: SearchState) => {
        const categories = z
            .array(ZodCategory)
            .safeParse(state.filters.category);
        const qualities = z.array(ZodQuality).safeParse(state.filters.quality);

        if (!categories.success) {
            console.error("Invalid categories", categories.error);
            return;
        }
        if (!qualities.success) {
            console.error("Invalid qualities", qualities.error);
            return;
        }

        const request: GetItemsState = {
            sort: state.sortBy,
            search: state.query,
            categories: categories.data,
            qualities: qualities.data,
            limit: state.limit,
            offset: state.offset
        };
        // Validate the request
        const validation = getItemsSchema.safeParse(request);
        if (!validation.success) {
            console.error("Invalid request", validation.error);
            return;
        }

        // TODO: sorting
        const response = await fetch("/api/items/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validation.data)
        });

        if (!response.ok) {
            console.error("Failed 1");
            return;
        }
        const result = await response.json();
        if (!result) {
            console.error("Failed 2", result);
            return;
        }

        // verify with getItemsResponseSchema
        const itemsValidation = getItemsResponseSchema.safeParse(result);
        if (!itemsValidation.success) {
            console.error("Invalid response", itemsValidation.error);
            return;
        }
        itemList.value = itemsValidation.data.items;
    };
</script>

<div class="flex flex-col h-full">
    <header class="border-b border-std p-2 pb-4 flex flex-col cont mb-6">
        <div
            class="flex flex-col md:flex-row md:items-center md:justify-between w-full md:gap-16 gap-2">
            <div>
                <h2 class="text-xl font-bold">Items for Sale</h2>
                <p class="text-sm">
                    Find items to purchase here. Check out our FAQ for more.
                </p>
            </div>
            <div class="flex items-center flex-1 max-w-96 gap-1">
                <Input
                    type="text"
                    placeholder="Search..."
                    bind:value={searchValue}
                    onkeydown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }} />
                <Button onclick={handleSearch}
                    ><SearchIcon class="size-4" /></Button>
            </div>
        </div>
        <div class="flex items-center justify-between mt-4">
            <div
                class="flex items-center space-x-2 border p-2 rounded-xl bg-secondary">
                <Checkbox
                    id="compact"
                    bind:checked={isCompact}
                    aria-labelledby="compact" />
                <Label
                    id="compact"
                    for="compact"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Compact View
                </Label>
            </div>

            <div>
                <Select.Root
                    type="single"
                    name="sortBy"
                    bind:value={searchState.value.sortBy}>
                    <Select.Trigger>
                        {sortByDisplay}
                    </Select.Trigger>
                    <Select.Content>
                        {#each sortValues as option}
                            <Select.Item
                                value={option.value}
                                label={option.label}>
                                {option.label}
                            </Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
        </div>
    </header>
    <section class="flex flex-1 cont">
        <aside>
            <LeftBar />
        </aside>
        <main class="flex-1">
            <ItemView {isCompact} />
        </main>
    </section>
</div>
