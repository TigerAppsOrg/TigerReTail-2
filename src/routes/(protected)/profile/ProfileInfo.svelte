<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Avatar } from "$lib/components/ui/avatar/index.js";

    let ogProfile = {
        name: "TigerApps",
        email: "TigerApps@gmail.com",
        bio: "Hello, I am TigerApps",
        number: "123-456-7890",
        payment: "@TigerApps",
        image: null as string | null
    };

    let profile = { ...ogProfile };
    let isEditing = false;
    let fileInput: HTMLInputElement;

    const handleImageChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profile.image = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = () => {
        if (isEditing) {
            ogProfile = { ...profile };
            console.log("Profile saved:", ogProfile);
        } else {
            profile = { ...ogProfile };
        }
        isEditing = !isEditing;
    };

    const handleCancel = () => {
        if (isEditing) {
            profile = { ...ogProfile };
            isEditing = false;
        }
    };

    $: isFormValid =
        profile.name.trim() !== "" &&
        profile.email.includes("@") &&
        profile.number.trim() !== "";
</script>

<div class="relative w-full max-w-6xl border border-blue-400 p-6">
    <div class="w-full">
        <div class="mb-6 flex items-center justify-between">
            <span>Profile Info</span>
            <div class="space-x-2">
                {#if isEditing}
                    <button
                        on:click={handleCancel}
                        class="rounded bg-gray-400 px-3 py-1 font-bold text-white hover:bg-gray-500">
                        Cancel
                    </button>
                    <button
                        on:click={handleEdit}
                        disabled={!isFormValid}
                        class="rounded bg-blue-400 px-3 py-1 font-bold text-white hover:bg-blue-200 disabled:bg-gray-300">
                        Save
                    </button>
                {:else}
                    <button
                        on:click={handleEdit}
                        class="rounded bg-blue-400 px-3 py-1 font-bold text-white hover:bg-blue-200">
                        Edit
                    </button>
                {/if}
            </div>
        </div>

        <div class="mb-6 flex justify-center relative">
            <Avatar class="h-32 w-32">
                {#if profile.image}
                <img src={profile.image} alt="Profile" class="h-full w-full object-cover"/>
                {:else}
                <span class="text-4xl">
                    {profile.name.charAt(0).toUpperCase()}
                </span>
                {/if}
            </Avatar>

            {#if isEditing}
            <div class="absolute bottom-0 right-1/2 transform translate-x-1/2">
                <input 
                bind:this={fileInput}
                type="file"
                accept="image/*"
                on:change={handleImageChange}
                class="hidden"
                id="profile-image"
                />
                <button
                    on:click={() => fileInput.click()}
                    class="bg-blue-400 text-white px-2 py-1 rounded-full text-sm hover:bg-blue-500"
                    >
                    Change
                </button>
            </div>
            {/if}
        </div>

        <div class="flex flex-col items-center gap-4">
            <div class="flex w-full max-w-sm flex-col gap-1.5">
                <Label for="name">Name</Label>
                <div class:disabled={!isEditing}>
                    <Input
                        type="text"
                        id="name"
                        bind:value={profile.name}
                        disabled={!isEditing}
                        class={isEditing
                            ? ""
                            : "cursor-not-allowed bg-gray-100 text-gray-500"} />
                </div>
            </div>

            <div class="flex w-full max-w-sm flex-col gap-1.5">
                <Label for="email">Email</Label>
                <div class:disabled={!isEditing}>
                    <Input
                        type="email"
                        id="email"
                        bind:value={profile.email}
                        disabled={!isEditing}
                        class={isEditing
                            ? ""
                            : "cursor-not-allowed bg-gray-100 text-gray-500"} />
                </div>
            </div>

            <div class="max-sm flex w-full flex-col gap-1.5">
                <Label for="bio">Bio</Label>
                <div class:disabled={!isEditing}>
                    <Input
                        type="bio"
                        id="bio"
                        bind:value={profile.bio}
                        disabled={!isEditing}
                        class={isEditing
                            ? ""
                            : "cursor-not-allowed bg-gray-100 text-gray-500"} />
                </div>
            </div>
            <div class="max-sm flex w-full flex-col gap-1.5">
                <Label for="number">Phone #</Label>
                <div class:disabled={!isEditing}>
                    <Input
                        type="tel"
                        id="number"
                        bind:value={profile.number}
                        disabled={!isEditing}
                        class={isEditing
                            ? ""
                            : "cursor-not-allowed bg-gray-100 text-gray-500"} />
                </div>
            </div>
            <div class="max-sm flex w-full flex-col gap-1.5">
                <Label for="payment">Venmo/Zelle</Label>
                <div class:disabled={!isEditing}>
                    <Input
                        type="payment"
                        id="payment"
                        bind:value={profile.payment}
                        disabled={!isEditing}
                        class={isEditing
                            ? ""
                            : "cursor-not-allowed bg-gray-100 text-gray-500"} />
                </div>
            </div>
        </div>
    </div>
</div>
