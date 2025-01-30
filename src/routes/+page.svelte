<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import { Button } from "$lib/components/ui/button";
</script>

<div class="flex min-h-screen flex-col" id="home">
    <div id="pattern" class="absolute inset-0 z-0"></div>

    <header
        class="z-10 grid h-14 w-full grid-cols-2 items-center px-4 md:grid-cols-3">
        <button
            class="flex w-fit cursor-pointer items-center text-2xl"
            onclick={() => {
                document.getElementById("home")!.scrollIntoView({
                    behavior: "smooth"
                });
            }}>
            <img src="/logo.png" alt="TigerReTail logo" class="h-10" />
            <h1 class="font-semibold tracking-tighter">TigerReTail</h1>
        </button>
        <div class="hidden gap-8 justify-self-center md:flex">
            <button
                onclick={() => {
                    document.getElementById("features")!.scrollIntoView({
                        behavior: "smooth"
                    });
                }}
                class="nav-link">Features</button>
            <button
                onclick={() => {
                    document.getElementById("about")!.scrollIntoView({
                        behavior: "smooth"
                    });
                }}
                class="nav-link">About</button>
        </div>
        <div class="justify-self-end">
            <Button href="/auth">Sign in</Button>
        </div>
    </header>

    <main class="z-10"></main>

    <section id="features"></section>

    <section id="about"></section>

    <div class="flex-1"></div>
    <Footer />
</div>

<style lang="postcss">
    section {
        @apply z-10;
    }

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

    #pattern {
        background-image: url("/grid.svg");
        background-repeat: repeat;
        background-size: 60px 60px;
        mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.3), black 30%);
        -webkit-mask-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.3),
            black 30%
        );
    }
</style>
