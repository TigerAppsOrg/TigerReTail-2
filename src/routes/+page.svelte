<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import { Button } from "$lib/components/ui/button";
</script>

<div class="flex min-h-screen flex-col" id="home">
    <div id="pattern" class="absolute inset-0 z-0"></div>

    <header
        class="fixed grid h-14 w-full grid-cols-2 items-center px-4 transition-all duration-200 md:grid-cols-3">
        <button
            class="z-50 flex w-fit cursor-pointer items-center text-2xl"
            onclick={() => {
                document.getElementById("home")!.scrollIntoView({
                    behavior: "smooth"
                });
            }}>
            <img src="/logo.png" alt="TigerReTail logo" class="h-10" />
            <h1 class="font-semibold tracking-tighter">TigerReTail</h1>
        </button>
        <div class="z-50 hidden gap-8 justify-self-center md:flex">
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
        <div class="z-50 justify-self-end">
            <Button href="/auth">Sign in</Button>
        </div>
    </header>

    <main
        class="z-10 flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 text-center">
        <h2
            class="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            The Future of <span class="text-primary">Retail</span> Management
        </h2>

        <p class="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Streamline your retail operations with powerful inventory
            management, real-time analytics, and seamless POS integration.
        </p>

        <Button href="/auth" size="lg" class="text-lg">Get Started</Button>
    </main>

    <section id="features" class="h-screen"></section>

    <section id="about"></section>

    <div class="flex-1"></div>
    <Footer />
</div>

<style lang="postcss">
    header {
        background-color: transparent;
        view-timeline-name: --scroll;
        animation: header-scroll linear forwards;
        animation-timeline: scroll();
        animation-range: 0 100px;
        z-index: 20;
    }

    @keyframes header-scroll {
        to {
            background-color: hsl(var(--background));
            border-bottom: 1px solid hsl(var(--border));
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
    }

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
