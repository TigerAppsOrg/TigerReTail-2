<script lang="ts">
    import BackIcon from "$lib/icons/BackIcon.svelte";

    interface Props {
        href?: string;
        text?: string;
    }

    let { href, text }: Props = $props();
</script>

<div class="flex items-center">
    <a {href} class="group flex items-center text-gray-600 hover:text-gray-900">
        <BackIcon />
        <span>{text}</span>
    </a>
</div>
