<script lang="ts">
    import ItemCard from "./ItemCard.svelte";

    interface Props {
        isCompact: boolean;
    }

    let { isCompact }: Props = $props();
</script>

<section class="ml-8 pb-8 h-full overflow-y-auto">
    {#if isCompact}
        <div>Compact View</div>
    {:else}
        <div>
            <ItemCard />
        </div>
    {/if}
</section>
