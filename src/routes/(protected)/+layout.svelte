<script>
    import Header from "$lib/components/Header.svelte";

    const { children } = $props();
</script>

<div class="flex h-screen flex-col">
    <div>
        <Header />
    </div>
    <div class="flex-1 pb-8">
        {@render children()}
    </div>
</div>
