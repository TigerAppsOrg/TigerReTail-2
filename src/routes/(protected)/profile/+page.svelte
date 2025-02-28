<script>
    import MyItems from "./MyItems.svelte";

    import ProfileInfo from "./ProfileInfo.svelte";
</script>

<div class="flex h-full flex-col">
    <header class="border-b bg-blue-50 p-2">
        <button> Back to Image Gallery </button>
    </header>
    <div class="flex flex-1 flex-col">
        <h2 class="mx-auto mb-2 w-[90%] border-b">Profile</h2>
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
