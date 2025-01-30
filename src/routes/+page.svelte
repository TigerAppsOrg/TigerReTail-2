<script>
    import Footer from "$lib/components/Footer.svelte";
    import { Button } from "$lib/components/ui/button";
</script>

<div class="flex min-h-screen flex-col">
    <header
        class="grid h-14 w-full grid-cols-2 items-center px-4 md:grid-cols-3">
        <div class="flex cursor-pointer items-center text-2xl">
            <img src="/logo.png" alt="TigerReTail logo" class="h-10" />
            <h1 class="font-semibold tracking-tighter">TigerReTail</h1>
        </div>
        <div class="hidden gap-8 justify-self-center md:flex">
            <a href="#features" class="nav-link">Features</a>
            <a href="#about" class="nav-link">About</a>
        </div>
        <div class="justify-self-end">
            <Button href="/auth">Sign in</Button>
        </div>
    </header>

    <main></main>

    <section id="features"></section>

    <section id="about"></section>

    <div class="flex-1"></div>
    <Footer />
</div>

<style lang="postcss">
    .nav-link {
        position: relative;
        text-decoration: none;
    }

    .nav-link::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.3s ease-out;
        @apply bg-primary;
    }

    .nav-link:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
</style>
