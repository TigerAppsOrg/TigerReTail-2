<script>
    import { Button } from "$lib/components/ui/button";
    import { ChevronLeft } from "lucide-svelte";
    import MyItems from "./MyItems.svelte";

    import ProfileInfo from "./ProfileInfo.svelte";
</script>

<div class="flex h-full flex-col">
    <div class="cont flex flex-1 flex-col">
        <div class="my-4 flex items-center justify-between border-b p-2">
            <h2 class="text-xl font-semibold">Profile</h2>
            <Button href="/home" variant="outline">
                <ChevronLeft class="mr-1" />
                Back to Home
            </Button>
        </div>
        <div class="flex flex-1 gap-4">
            <div>
                <ProfileInfo />
            </div>
            <div>
                <MyItems />
            </div>
        </div>
    </div>
</div>
