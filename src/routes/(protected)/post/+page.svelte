<script>
    import BackToHome from "$lib/components/BackToHome.svelte";
    import { Button } from "$lib/components/ui/button";
    import { CirclePlus, MessageCircleQuestion } from "lucide-svelte";
    import PostForm from "./PostForm.svelte";
    import RequestForm from "./RequestForm.svelte";

    let { data } = $props();
    let isPost = $state(true);
</script>

<BackToHome pageTitle={isPost ? "New Post" : "New Request"} mb={8} />
<div class="cont">
    <nav class="flex items-center gap-4 mb-6">
        <Button
            variant={isPost ? "secondary" : "ghost"}
            class="flex-1"
            onclick={() => (isPost = true)}>
            <CirclePlus class="mr-2" />
            Post Item
        </Button>
        <Button
            variant={!isPost ? "secondary" : "ghost"}
            class="flex-1"
            onclick={() => (isPost = false)}>
            <MessageCircleQuestion class="mr-2" />
            Request Item</Button>
    </nav>
    <div>
        {#if isPost}
            <PostForm {data} />
        {:else}
            <RequestForm {data} />
        {/if}
    </div>
</div>
