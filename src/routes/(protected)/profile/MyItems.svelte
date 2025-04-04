<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";

    const items = [
        { id: 1, title: "Floor lamps" },
        { id: 2, title: "Table lamps" },
        { id: 3, title: "Desk accessories" },
        { id: 4, title: "Wall art" }
    ];

    let sellingApi: CarouselAPI;
    let soldApi: CarouselAPI;

    let sellCurrent = 0;
    let sellCount = 0;
    let sellPage = 1;
    let soldCurrent = 0;
    let soldCount = 0;
    let soldPage = 1;

    $: sellCount = items.length;
    $: sellCurrent = sellingApi?.selectedScrollSnap() ?? 0;
    $: sellPage = sellingApi ? sellCurrent + 1 : 1;
    $: if (sellingApi) {
        sellingApi.on("select", () => {
            sellCurrent = sellingApi.selectedScrollSnap();
        });
    }

    $: soldCount = items.length;
    $: soldCurrent = soldApi?.selectedScrollSnap() ?? 0;
    $: soldPage = soldApi ? soldCurrent + 1 : 1;
    $: if (soldApi) {
        soldApi.on("select", () => {
            soldCurrent = soldApi.selectedScrollSnap();
        });
    }

    function handlePrev(api: CarouselAPI) {
        console.log("Previous clicked, API:", api);
        api.scrollPrev();
    }

    function handleNext(api: CarouselAPI) {
        console.log("Next clicked, API:", api);
        api.scrollNext();
    }
</script>

<div class="p-4">
    <div class="mx-auto max-w-3xl space-y-6">
        <!-- Selling Carousel -->
        <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 class="mb-4 text-xl font-bold">Selling</h2>
            <div class="relative min-h-[300px]">
                <Carousel.Root
                    bind:api={sellingApi}
                    opts={{ loop: true, align: "start", skipSnaps: false }}>
                    <Carousel.Content>
                        {#each items as item (item.id)}
                            <Carousel.Item class="basis-full md:basis-1/3">
                                <div class="p-2">
                                    <Card.Root>
                                        <Card.Content
                                            class="flex min-h-[200px] flex-col items-center rounded-lg bg-amber-50 p-4">
                                            <div
                                                class="mb-2 aspect-[3/4] w-full rounded-md bg-gray-200">
                                            </div>
                                            <p class="text-sm font-medium">
                                                {item.title}
                                            </p>
                                            <button
                                                class="mt-2 rounded-md bg-black px-4 py-1 text-sm text-white">
                                                More
                                            </button>
                                        </Card.Content>
                                    </Card.Root>
                                </div>
                            </Carousel.Item>
                        {/each}
                    </Carousel.Content>
                    <div class="absolute inset-y-0 left-0 flex items-center">
                        <button
                            on:click={() =>
                                sellingApi && handlePrev(sellingApi)}
                            class="z-10 ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100">
                            ←
                        </button>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center">
                        <button
                            on:click={() =>
                                sellingApi && handleNext(sellingApi)}
                            class="z-10 mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100">
                            →
                        </button>
                    </div>
                </Carousel.Root>
                <div class="mt-2 text-center text-sm text-gray-500">
                    {#if sellingApi}
                        Page {sellPage} of {sellCount}
                    {:else}
                        Loading...
                    {/if}
                </div>
            </div>
        </div>

        <!-- Sold Carousel -->
        <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 class="mb-4 text-xl font-bold">Sold</h2>
            <div class="relative min-h-[300px]">
                <Carousel.Root
                    bind:api={soldApi}
                    opts={{ loop: true, align: "start", skipSnaps: false }}>
                    <Carousel.Content>
                        {#each items as item (item.id)}
                            <Carousel.Item class="basis-full md:basis-1/3">
                                <div class="p-2">
                                    <Card.Root>
                                        <Card.Content
                                            class="flex min-h-[200px] flex-col items-center rounded-lg bg-amber-50 p-4">
                                            <div
                                                class="mb-2 aspect-[3/4] w-full rounded-md bg-gray-200">
                                            </div>
                                            <p class="text-sm font-medium">
                                                {item.title}
                                            </p>
                                            <button
                                                class="mt-2 rounded-md bg-black px-4 py-1 text-sm text-white">
                                                More
                                            </button>
                                        </Card.Content>
                                    </Card.Root>
                                </div>
                            </Carousel.Item>
                        {/each}
                    </Carousel.Content>
                    <div class="absolute inset-y-0 left-0 flex items-center">
                        <button
                            on:click={() => soldApi && handlePrev(soldApi)}
                            class="z-10 ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100">
                            ←
                        </button>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center">
                        <button
                            on:click={() => soldApi && handleNext(soldApi)}
                            class="z-10 mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100">
                            →
                        </button>
                    </div>
                </Carousel.Root>
                <div class="mt-2 text-center text-sm text-gray-500">
                    {#if soldApi}
                        Page {soldPage} of {soldCount}
                    {:else}
                        Loading...
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
