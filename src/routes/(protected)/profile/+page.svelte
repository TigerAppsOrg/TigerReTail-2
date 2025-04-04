<!-- <script>
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
            <div class="flex-auto">
                <ProfileInfo />
            </div>
            <div class="flex-1">
                <MyItems />
            </div>
        </div>
    </div>
</div> -->
<script>
    import MyItems from "./MyItems.svelte";
    import ProfileInfo from "./ProfileInfo.svelte";
</script>

<div class="flex flex-col overflow-y-auto">
    <!-- Removed min-h-screen to let content define height -->
    <header class="border-b bg-blue-50 p-2">
        <button>Back to Image Gallery</button>
    </header>
    <div class="flex flex-col">
        <!-- Removed flex-1 -->
        <h2 class="mx-auto mb-2 w-[90%] border-b">Profile</h2>
        <div class="flex flex-col gap-4 p-4 md:flex-row">
            <div class="w-full md:w-auto">
                <!-- Removed flex-auto -->
                <ProfileInfo />
            </div>
            <div class="w-full">
                <!-- Removed flex-1 -->
                <MyItems />
            </div>
        </div>
    </div>
</div>
