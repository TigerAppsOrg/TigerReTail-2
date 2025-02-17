<script lang="ts">
    interface Props {
        errors: string[];
    }

    let { errors }: Props = $props();
</script>

{#if errors.length > 0}
    <div class="auth-validation-error-area">
        {#each errors as error}
            <p>{error}</p>
        {/each}
    </div>
{/if}

<style lang="postcss">
    .auth-validation-error-area {
        @apply min-h-6 text-red-500;
    }
</style>
