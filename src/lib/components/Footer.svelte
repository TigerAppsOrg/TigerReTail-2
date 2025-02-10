<script>
    import { GITHUB_LINK } from "$lib/constants";
    import GithubIcon from "$lib/icons/GithubIcon.svelte";
</script>

<footer
    class="z-10 flex w-full items-center justify-center gap-4 p-4 text-sm text-gray-500">
    <p>
        &copy; 2025 <a
            href="https://tigerapps.org"
            target="_blank"
            class="underline transition-colors hover:text-primary">TigerApps</a
        >. All rights reserved.
    </p>
    <a
        href={GITHUB_LINK}
        target="_blank"
        class="transition-colors hover:text-primary">
        <GithubIcon />
    </a>
</footer>
