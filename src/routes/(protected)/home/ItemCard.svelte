<script lang="ts">
    import { HeartIcon } from "lucide-svelte";

    // Fetch items from /api/items/get
    import {
        type GetItemsState,
        type ItemElement
    } from "../../api/items/get/schema";
    import Button from "$lib/components/ui/button/button.svelte";
    import { fmtStr } from "$lib/utils";

    interface Props {
        item: ItemElement;
    }

    const { item }: Props = $props();

    const randompicsumId = Math.floor(Math.random() * 500);
    const randompicsumUrl = `https://picsum.photos/id/${randompicsumId}/600/400`;
</script>

<article class="rounded-xl border border-std shadow-sm h-[350px] flex flex-col">
    <div class="h-[180px] overflow-hidden">
        <!-- Filler image -->
        <img
            class="rounded-t-lg object-cover w-full h-full"
            src={randompicsumUrl}
            alt={item.name} />
    </div>
    <div class="p-4 h-[170px] flex flex-col justify-between overflow-y-auto">
        <div>
            <div class="flex justify-between items-center">
                <h3 class="text-light text-sm">
                    {item.price === "0.00" ? "Free" : `$${item.price}`}
                </h3>
                <button>
                    <HeartIcon class="size-4" />
                </button>
            </div>
            <h2 class="font-semibold mt-1">
                {fmtStr(item.name)}
            </h2>
        </div>
        <div class="mt-4">
            <Button class="w-full" variant="outline">More</Button>
        </div>
    </div>
</article>
