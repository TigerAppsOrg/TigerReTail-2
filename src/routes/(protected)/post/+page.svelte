<script>
    import ItemForm from "./ItemForm.svelte";
    import RequestForm from "./RequestForm.svelte";

    let { data } = $props();
    let posting = $state(true);
</script>

<!-- two side by side buttons, one is highlighted if currently posting, clicking the other switches tabs -->
<div class="flex justify-center gap-4">
    <button
        class="btn btn-primary"
        onclick={() => (posting = true)}
        class:active={posting}>
        Post Item
    </button>
    <button
        class="btn btn-primary"
        onclick={() => (posting = false)}
        class:active={!posting}>
        Request Item
    </button>
</div>

{#if posting}
    <ItemForm {data} />
{:else}
    <RequestForm {data} />
{/if}
