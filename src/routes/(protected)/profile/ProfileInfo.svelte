<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let ogProfile = {
        name: "TigerApps",
        email: "TigerApps@gmail.com",
        bio: "Hello, I am TigerApps",
        number: "123-456-7890",
        payment: "@TigerApps"
    };

    let profile = $state({ ...ogProfile });
    let isEditing = $state(false);

    const handleEdit = () => {
        if (isEditing) {
            ogProfile = { ...profile };
            console.log("Profile saved:", ogProfile);
        } else {
            profile = { ...ogProfile };
        }
        isEditing = !isEditing;
    };

    // Revert to original values
    const handleCancel = () => {
        if (isEditing) {
            profile = { ...ogProfile };
            isEditing = false;
        }
    };

    let isFormValid = $derived(
        profile.name.trim() !== "" &&
            profile.email.includes("@") &&
            profile.number.trim() !== ""
    );
</script>

<div
    class="relative w-full max-w-6xl rounded-lg border border-std p-6 shadow-md">
    <div class="w-full">
        <div class="mb-6 flex items-center justify-between">
            <span>Profile Info</span>
            <div class="space-x-2">
                {#if isEditing}
                    <Button onclick={handleCancel} variant="outline"
                        >Cancel</Button>
                    <Button onclick={handleEdit} disabled={!isFormValid}
                        >Save</Button>
                {:else}
                    <Button onclick={handleEdit}>Edit</Button>
                {/if}
            </div>
        </div>

        <div class="mb-6 flex justify-center">
            <div
                class="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <!-- You can add an img tag here if you have a specific image -->
                <span class="text-gray-500">Profile Pic</span>
            </div>
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
