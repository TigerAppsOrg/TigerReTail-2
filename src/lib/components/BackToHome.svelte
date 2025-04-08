<script lang="ts">
    import { Button } from "./ui/button";

    interface Props {
        pageTitle: string;
        mb?: number; // In pixels
    }

    const { pageTitle, mb = 24 }: Props = $props();
</script>

<header
    style={`margin-bottom: ${mb}px`}
    class="border-b border-std p-2 flex items-center justify-between cont">
    <h2 class="text-xl font-bold">{pageTitle}</h2>
    <Button href="/home" variant="outline">Back to Image Gallery</Button>
</header>
