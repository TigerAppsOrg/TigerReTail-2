<script lang="ts">
    import "../app.css";
    let { children } = $props();
</script>

<svelte:head>
    <title>TigerReTail</title>
</svelte:head>

{@render children()}
