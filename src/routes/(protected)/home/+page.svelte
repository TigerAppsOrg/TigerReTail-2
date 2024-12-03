<script>
    import ItemView from "$lib/components/ItemView.svelte";
    import LeftBar from "$lib/components/LeftBar.svelte";
</script>

<div class="flex">
    <aside>
        <LeftBar />
    </aside>
    <main class="flex-1 bg-blue-200">
        <ItemView />
    </main>
</div>
