<script>
    import Header from "$lib/components/Header.svelte";
    import ItemView from "$lib/components/ItemView.svelte";
    import LeftBar from "$lib/components/LeftBar.svelte";
</script>

<div class="flex h-screen flex-col overflow-hidden bg-green-200">
    <div class="flex flex-1">
        <aside>
            <LeftBar />
        </aside>
        <main class="flex-1 bg-white">
            <ItemView />
        </main>
    </div>
</div>
