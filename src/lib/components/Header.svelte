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

<header class="flex h-16 items-center border-b shadow-sm">
    <div class="container mx-auto flex items-center justify-between">
        <a href="/home" class="flex items-center">
            <div class="mr-2 h-8 w-8 rounded-full bg-gray-200"></div>
            <span class="text-xl font-bold">TigerReTail</span>
        </a>

        <div class="flex items-center space-x-4">
            <Button onclick={() => {}}>Post</Button>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div
                        class="inline-flex h-10 items-center justify-center
                        rounded-md border border-input bg-background px-4 py-2
                        text-sm font-medium ring-offset-background transition-colors
                        hover:bg-accent hover:text-accent-foreground focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                        disabled:pointer-events-none disabled:opacity-50">
                        Profile
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" alignOffset={-5}>
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
