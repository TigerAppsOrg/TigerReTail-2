<script>
    import ItemView from "$lib/components/ItemView.svelte";
    import LeftBar from "$lib/components/LeftBar.svelte";

    let { data } = $props();
</script>

<div class="flex flex-col overflow-hidden">
    <div class="flex flex-1">
        <aside>
            <LeftBar />
        </aside>
        <main class="flex-1 bg-white">
            <ItemView />
        </main>
    </div>
</div>
