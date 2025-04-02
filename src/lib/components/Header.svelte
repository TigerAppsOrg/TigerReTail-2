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

<header class="border-std flex h-14 items-center border-b shadow-sm">
    <div class="cont mx-auto flex items-center justify-between">
        <a
            href="/home"
            class="z-50 flex w-fit cursor-pointer items-center text-2xl">
            <img src="/logo.png" alt="TigerReTail logo" class="h-10" />
            <h1 class="font-semibold tracking-tighter">TigerReTail</h1>
        </a>

        <div class="flex items-center space-x-8">
            <Button href="/post">Post</Button>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div>Profile</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    alignOffset={-5}
                    class="rounded-xl shadow-lg">
                    <DropdownMenuItem onclick={() => goto("/settings")}
                        >Settings</DropdownMenuItem>
                    <DropdownMenuItem onclick={() => goto("/profile")}
                        >My Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                        <form method="POST" action="/home?/logout">
                            <button type="submit"> Logout </button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</header>
