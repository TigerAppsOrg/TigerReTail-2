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
            <div class="flex items-center">
                <a
                    href="/auth"
                    class="group flex items-center text-gray-600 hover:text-gray-900">
                    <svg
                        class="mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                </a>
            </div>

            <div class="space-y-2 text-center">
                <h2 class="text-2xl font-bold">Create your account</h2>
                <p class="text-gray-600">
                    Sign up with your IAS email (@ias.edu required)
                </p>
            </div>

            <!-- Registration form -->
            <form class="flex flex-col space-y-4">
                <div class="flex flex-col space-y-2">
                    <label for="name" class="text-sm font-medium"
                        >Full Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        class="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        required />
                </div>

                <div class="flex flex-col space-y-2">
                    <label for="email" class="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="your.email@ias.edu"
                        class="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        required />
                </div>

                <div class="flex flex-col space-y-2">
                    <label for="password" class="text-sm font-medium"
                        >Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        class="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        required />
                </div>

                <div class="flex flex-col space-y-2">
                    <label for="confirm-password" class="text-sm font-medium"
                        >Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Confirm your password"
                        class="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        required />
                </div>

                <Button
                    type="submit"
                    class="flex w-full items-center justify-center space-x-2 py-4 text-lg"
                    variant="default">
                    <span>Create Account</span>
                </Button>
            </form>

            <div class="text-center text-sm">
                <span class="text-gray-600">Already have an account? </span>
                <a href="/auth/ias/" class="text-blue-600 hover:underline"
                    >Sign In</a>
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
