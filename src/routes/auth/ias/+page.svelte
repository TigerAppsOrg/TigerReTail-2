<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import BackButton from "./BackButton.svelte";
    import ValidationErrors from "./ValidationErrors.svelte";

    let { form } = $props();

    // Form validation
    let email = $state("");
    let password = $state("");

    const generalErrors: string[] = form ? [form.body.error] : [];
    let emailErrors: string[] = $state([]);
    let passwordErrors: string[] = $state([]);

    const handleSubmit = (event: SubmitEvent) => {
        // Reset errors
        emailErrors = [];
        passwordErrors = [];

        if (!email) {
            emailErrors = ["Email is required"];
            event.preventDefault();
        }

        if (!password) {
            passwordErrors = ["Password is required"];
            event.preventDefault();
        }
    };
</script>

<BackButton href="/auth" text="Back" />

<div class="space-y-2 text-center">
    <h2 class="text-2xl font-bold">Sign in to TigerReTail</h2>
    <p class="text-gray-600">Sign in with your IAS email (@ias.edu required)</p>
</div>

<form
    class="flex flex-col space-y-4"
    method="POST"
    action="?/login"
    onsubmit={handleSubmit}>
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

    <div class="flex flex-col space-y-2">
        <ValidationErrors errors={passwordErrors} />
        <label for="password" class="text-sm font-medium">Password</label>
        <input
            bind:value={password}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            class="auth-input" />
    </div>

    <Button
        type="submit"
        class="flex w-full items-center justify-center space-x-2 py-4 text-lg"
        variant="default">
        <span>Sign in</span>
    </Button>
</form>

<div class="space-y-2 text-center text-sm">
    <div>
        <span class="text-gray-600">Don't have an account? </span>
        <a href="/auth/ias/signup" class="text-blue-600 hover:underline"
            >Sign Up</a>
    </div>
    <div>
        <a href="/auth/ias/forgot" class="text-blue-600 hover:underline"
            >Forgot Password?</a>
    </div>
</div>
