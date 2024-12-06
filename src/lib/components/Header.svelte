<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "$lib/components/ui/dropdown-menu";
    import Button from "./ui/button/button.svelte";
</script>

<header
    class="via-orange-150 flex h-16 items-center border-b bg-gradient-to-r from-orange-100 to-orange-200 shadow-sm">
    <div class="container mx-auto flex items-center justify-between">
        <a href="/home" class="flex items-center">
            <div class="mr-3 h-10 w-10 rounded-full bg-gray-200"></div>
            <span
                class="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-2xl font-bold text-transparent">
                Tiger ReTail
            </span>
        </a>

        <div class="flex items-center space-x-4">
            <Button
                class="rounded-full bg-orange-400 px-6 py-2 text-white transition-colors duration-200 hover:bg-orange-600"
                onclick={() => {}}>
                Post
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div
                        class="inline-flex h-10 items-center justify-center rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Profile
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    alignOffset={-5}
                    class="rounded-xl bg-gradient-to-b from-orange-50 to-orange-100 shadow-lg">
                    <DropdownMenuItem onclick={() => goto("/settings")}
                        >Settings</DropdownMenuItem>
                    <DropdownMenuItem onclick={() => goto("/profile")}
                        >My Profile</DropdownMenuItem>
                    <DropdownMenuItem onclick={() => {}}
                        >Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</header>
