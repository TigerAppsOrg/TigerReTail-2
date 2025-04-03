<script>
    import Header from "$lib/components/Header.svelte";

    const { children } = $props();
</script>

<div class="flex h-screen flex-col overflow-hidden">
    <div>
        <Header />
    </div>
    <div class="flex-1">
        {@render children()}
    </div>
</div>
