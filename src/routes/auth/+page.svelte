<script>
    import Footer from "$lib/components/Footer.svelte";
    import { Button } from "$lib/components/ui/button";
</script>

<div class="relative flex min-h-screen flex-col bg-gray-50">
    <div id="pattern" class="absolute inset-0 z-0"></div>

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
            <div class="space-y-2 text-center">
                <h2 class="text-2xl font-bold">Sign in to TigerReTail</h2>
                <p class="text-gray-600">
                    Choose your institutional affiliation to continue
                </p>
            </div>

            <div class="flex flex-col space-y-4">
                <Button
                    href="/auth/princeton"
                    class="flex w-full items-center justify-center space-x-2 py-4 text-lg"
                    variant="default">
                    <span>Sign in with Princeton</span>
                </Button>
                <Button
                    href="/auth/ias"
                    class="flex w-full items-center justify-center space-x-2 py-4 text-lg"
                    variant="default">
                    <span>Sign in with IAS</span>
                </Button>
            </div>
        </div>
    </main>

    <Footer />
</div>

<style>
    #pattern {
        background-image: url("/dots.svg");
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
