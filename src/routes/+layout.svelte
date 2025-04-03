<script lang="ts">
    import "../app.css";
    import { ModeWatcher } from "mode-watcher";

    let { children } = $props();
</script>

<svelte:head>
    <title>TigerReTail</title>
</svelte:head>

<ModeWatcher />
{@render children()}
