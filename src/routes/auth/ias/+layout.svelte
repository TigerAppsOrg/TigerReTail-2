<script>
    import Footer from "$lib/components/Footer.svelte";
    let { children } = $props();
</script>

<div class="relative flex min-h-screen flex-col bg-gray-50">
    <div class="dots-bg absolute inset-0 z-0"></div>

    <header
        class="relative z-10 grid h-16 w-full grid-cols-2 items-center px-8 pt-6 md:grid-cols-3">
        <a href="/" class="flex w-fit cursor-pointer items-center text-2xl">
            <img src="/logo.png" alt="TigerReTail logo" class="h-10" />
            <h1 class="font-semibold tracking-tighter">TigerReTail</h1>
        </a>
    </header>

    <main class="relative z-10 flex flex-1 items-center justify-center p-4">
        <div
            class="w-full max-w-md space-y-6 rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
            {@render children()}
        </div>
    </main>

    <Footer />
</div>
