<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import MyItems from "./MyItems.svelte";
    import ProfileInfo from "./ProfileInfo.svelte";
</script>

<div class="flex h-full flex-col">
    <header
        class="border-b border-std p-2 flex items-center justify-between cont mb-6">
        <h2 class="text-xl font-bold">My Profile</h2>
        <Button href="/home" variant="outline">Back to Image Gallery</Button>
    </header>
    <div class="cont flex flex-1 flex-col">
        <div class="flex flex-1 gap-4">
            <div class="w-96">
                <ProfileInfo />
            </div>
            <div class="flex-1">
                <MyItems />
            </div>
        </div>
    </div>
</div>
