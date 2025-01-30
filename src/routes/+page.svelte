<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import { Button } from "$lib/components/ui/button";
    import GithubIcon from "$lib/icons/GithubIcon.svelte";
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
            Princeton's Modern <span class="text-primary">Marketplace</span>
        </h2>

        <p class="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Buy, sell, and trade with the Princeton community. From textbooks to
            furniture, club merchandise to event tickets — all in one trusted
            campus marketplace.
        </p>

        <Button href="/auth" size="lg" class="text-lg">Get Started</Button>
    </main>

    <section
        id="features"
        class="flex min-h-screen flex-col items-center justify-center px-4 py-16 md:px-8">
        <h2 class="mb-16 text-4xl font-bold tracking-tight sm:text-5xl">
            What You Can Do
        </h2>

        <div class="grid max-w-6xl gap-8 md:grid-cols-3">
            <!-- Current Features -->
            <div
                class="rounded-lg border p-6 transition-all hover:border-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mb-4 h-8 w-8 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2">
                    <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18" />
                </svg>
                <h3 class="mb-2 text-xl font-semibold">List & Sell</h3>
                <p class="text-muted-foreground">
                    Create listings for items you want to sell or rent. Set your
                    price, add photos, and connect with interested buyers on
                    campus.
                </p>
            </div>

            <div
                class="rounded-lg border p-6 transition-all hover:border-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mb-4 h-8 w-8 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2">
                    <path
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <h3 class="mb-2 text-xl font-semibold">Request Items</h3>
                <p class="text-muted-foreground">
                    Looking for something specific? Post requests for items or
                    services you need, and let sellers come to you.
                </p>
            </div>

            <div
                class="rounded-lg border p-6 transition-all hover:border-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mb-4 h-8 w-8 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path
                        d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <h3 class="mb-2 text-xl font-semibold">Connect & Trade</h3>
                <p class="text-muted-foreground">
                    Get matched with sellers when you find what you're looking
                    for. Arrange meetups and complete transactions safely on
                    campus.
                </p>
            </div>
        </div>

        <!-- Coming Soon Section -->
        <div class="mt-24">
            <h3 class="mb-8 text-3xl font-semibold">Coming Spring 2025</h3>
            <div class="grid max-w-6xl gap-8 md:grid-cols-2">
                <div
                    class="rounded-lg border border-primary/20 bg-primary/5 p-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mb-4 h-8 w-8 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M12 20V10M18 20V4M6 20v-4" />
                    </svg>
                    <h3 class="mb-2 text-xl font-semibold">Auctions</h3>
                    <p class="text-muted-foreground">
                        Bid on items in real-time with our automated auction
                        system. Get notifications when you're outbid and when
                        auctions end.
                    </p>
                </div>

                <div
                    class="rounded-lg border border-primary/20 bg-primary/5 p-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mb-4 h-8 w-8 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path
                            d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <h3 class="mb-2 text-xl font-semibold">
                        Senior Sale Experience
                    </h3>
                    <p class="text-muted-foreground">
                        Create virtual yard sales for efficient move-out.
                        Organize your items, set bundle prices, and manage
                        multiple buyers seamlessly.
                    </p>
                </div>

                <div
                    class="rounded-lg border border-primary/20 bg-primary/5 p-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mb-4 h-8 w-8 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path
                            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <h3 class="mb-2 text-xl font-semibold">In-App Messaging</h3>
                    <p class="text-muted-foreground">
                        Chat directly with buyers and sellers within the app.
                        Negotiate prices, arrange meetups, and keep all your
                        marketplace conversations in one place.
                    </p>
                </div>

                <div
                    class="rounded-lg border border-primary/20 bg-primary/5 p-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mb-4 h-8 w-8 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-4-4h-2" />
                    </svg>
                    <h3 class="mb-2 text-xl font-semibold">Service Profiles</h3>
                    <p class="text-muted-foreground">
                        Create a professional profile to showcase your skills
                        and services. Whether you're a photographer, tutor, or
                        developer, connect with peers looking for your
                        expertise.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section
        id="about"
        class="flex min-h-[50vh] flex-col items-center justify-center bg-primary/5 px-4 py-24 md:px-8">
        <div class="max-w-3xl text-center">
            <h2 class="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
                Built for Princeton, by Princeton
            </h2>
            <p class="mb-6 text-lg text-muted-foreground">
                TigerReTail is developed and maintained by the TigerApps team,
                making it free and open-source for the entire Princeton
                community.
            </p>
            <p class="text-lg text-muted-foreground">
                Available exclusively to Princeton University and Institute for
                Advanced Study members, creating a trusted marketplace for our
                community.
            </p>
            <div class="mt-8 flex justify-center gap-4">
                <a
                    href="https://github.com/TigerAppsOrg/TigerRetail-2"
                    target="_blank"
                    class="inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                    <GithubIcon />
                    View on GitHub
                </a>
            </div>
        </div>
    </section>

    <section
        class="relative flex min-h-[40vh] flex-col items-center justify-center bg-primary/[0.03] px-4 py-16 pb-32 md:px-8">
        <div class="relative max-w-3xl text-center">
            <span
                class="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Ready to dive in?
            </span>
            <h2 class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Your Campus Marketplace Awaits
            </h2>
            <p class="mb-8 text-lg text-muted-foreground">
                Join thousands of Tigers already using TigerReTail today.
            </p>
            <div class="flex flex-col items-center gap-4">
                <Button
                    href="/auth"
                    variant="default"
                    size="lg"
                    class="px-8 py-6 text-lg">
                    Get Started
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="ml-2 h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Button>
                <div
                    class="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Princeton/IAS Affiliation Required
                </div>
            </div>
        </div>
    </section>

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
