<!-- <script>
    import { Button } from "$lib/components/ui/button";
</script>

<Button href="/home">
    Login
</Button> -->

<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "$lib/components/ui/dropdown-menu";
    import { goto } from "$app/navigation";

    function handlePost() {
        console.log("Post button clicked");
    }

    function handleLogout() {
        console.log("Logout clicked");
    }

    function goToHome() {
        goto("/home");
    }
</script>

<header class="flex h-16 items-center border-b shadow-sm">
    <div class="container mx-auto flex items-center justify-between">
        <div
            role="button"
            tabindex="0"
            class="flex cursor-pointer items-center"
            onclick={goToHome}
            onkeydown={e => e.key === "Enter" && goToHome()}>
            <div class="mr-2 h-8 w-8 rounded-full bg-gray-200"></div>
            <span class="text-xl font-bold">TigerReTail</span>
        </div>

        <div class="flex items-center space-x-4">
            <Button onclick={handlePost}>Post</Button>

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
                    <DropdownMenuItem onclick={handleLogout}
                        >Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</header>
