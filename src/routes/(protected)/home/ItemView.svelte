<script lang="ts">
    import { itemList } from "$lib/client/state.svelte";
    import ItemCard from "./ItemCard.svelte";

    interface Props {
        isCompact: boolean;
    }

    let { isCompact }: Props = $props();
</script>

<section class="ml-8 pb-8 h-full overflow-y-auto">
    {#if isCompact}
        <div id="item-list">Compact View</div>
    {:else}
        <div id="item-grid">
            {#each itemList.value as item}
                <ItemCard {item} />
            {/each}
        </div>
    {/if}
</section>

<style lang="postcss">
    #item-grid {
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 xl:gap-12;
    }
</style>
