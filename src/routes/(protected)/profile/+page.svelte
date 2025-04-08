<script>
    import BackToHome from "$lib/components/BackToHome.svelte";
    import MyItems from "./MyItems.svelte";
    import ProfileInfo from "./ProfileInfo.svelte";
</script>

<div class="flex h-full flex-col">
    <BackToHome pageTitle="My Profile" />
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
