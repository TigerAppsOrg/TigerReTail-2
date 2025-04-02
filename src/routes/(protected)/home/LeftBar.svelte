<script lang="ts">
    import { QUALITIES, CATEGORIES } from "$lib";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
</script>

{#snippet filterSection(
    title: string,
    optionList: readonly [string, ...string[]]
)}
    <div>
        <h2 class="text-lg mb-1">{title}</h2>
        <div class="flex flex-col gap-2">
            {#each optionList as option}
                {@render filterToggle(option)}
            {/each}
        </div>
    </div>
{/snippet}

{#snippet filterToggle(label: string)}
    <div class="flex items-center space-x-2">
        <Checkbox id={label} aria-labelledby={label} />
        <Label
            id={label}
            for={label}
            class="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
        </Label>
    </div>
{/snippet}

<aside>
    {@render filterSection("Categories", CATEGORIES)}
    {@render filterSection("Qualities", QUALITIES)}
</aside>
