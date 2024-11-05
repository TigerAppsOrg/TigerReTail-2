<script>
    import Header from "$lib/components/Header.svelte";
    import ItemView from "$lib/components/ItemView.svelte";
    import LeftBar from "$lib/components/LeftBar.svelte";
</script>

<div class="flex h-screen flex-col overflow-hidden">
    <Header />
    <div class="flex flex-1 bg-green-200">
        <aside>
            <LeftBar />
        </aside>
        <main class="flex-1 bg-blue-200">
            <ItemView />
        </main>
    </div>
</div>
