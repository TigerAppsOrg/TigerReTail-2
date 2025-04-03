<script lang="ts">
    import { QUALITIES, CATEGORIES } from "$lib";
    import { searchState, type FilterGroup } from "$lib/client/state.svelte";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
</script>

{#snippet filterSection(
    title: FilterGroup,
    optionList: readonly [string, ...string[]]
)}
    <div>
        <h2 class="text-lg mb-1">
            {title === "category" ? "Category" : "Quality"}
        </h2>
        <div class="flex flex-col gap-2">
            {#each optionList as option}
                {@render filterToggle(title, option)}
            {/each}
        </div>
    </div>
{/snippet}

{#snippet filterToggle(category: FilterGroup, label: string)}
    <div class="flex items-center space-x-2">
        <Checkbox
            id={label}
            aria-labelledby={label}
            checked={searchState.value.filters[category].includes(label)}
            onCheckedChange={(checked) => {
                if (checked) searchState.value.filters[category].push(label);
                else
                    searchState.value.filters[category] =
                        searchState.value.filters[category].filter(
                            (item) => item !== label
                        );
            }} />
        <Label
            id={label}
            for={label}
            class="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
        </Label>
    </div>
{/snippet}

<aside class="space-y-4">
    {@render filterSection("category", CATEGORIES)}
    {@render filterSection("quality", QUALITIES)}
</aside>
