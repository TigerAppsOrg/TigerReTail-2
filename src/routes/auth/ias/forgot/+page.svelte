<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import BackButton from "../BackButton.svelte";
    import ValidationErrors from "../ValidationErrors.svelte";

    // Form validation
    let email = "";

    let generalErrors: string[] = [];
    let emailErrors: string[] = [];

    const handleSubmit = (event: SubmitEvent) => {
        // Reset errors
        generalErrors = [];
        emailErrors = [];

        if (!email) {
            emailErrors = ["Email is required"];
            event.preventDefault();
        }
    };
</script>

<BackButton href="/auth/ias" text="Back to Sign In" />

<div class="space-y-2 text-center">
    <h2 class="text-2xl font-bold">Reset Password</h2>
    <p class="text-gray-600">
        Enter your IAS email address and we'll send you instructions to reset
        your password if it exists.
    </p>
</div>

<!-- Email submission form -->
<form class="flex flex-col space-y-4" onsubmit={handleSubmit}>
    <ValidationErrors errors={generalErrors} />
    <div class="flex flex-col space-y-2">
        <ValidationErrors errors={emailErrors} />
        <label for="email" class="text-sm font-medium">Email</label>
        <input
            bind:value={email}
            type="email"
            id="email"
            name="email"
            placeholder="your.email@ias.edu"
            class="auth-input" />
    </div>

    <Button
        type="submit"
        class="flex w-full items-center justify-center space-x-2 py-4 text-lg"
        variant="default">
        <span>Send Reset Instructions</span>
    </Button>
</form>

<div class="text-center text-sm">
    <span class="text-gray-600">Remember your password? </span>
    <a href="/auth/ias/" class="text-blue-600 hover:underline">Sign In</a>
</div>
