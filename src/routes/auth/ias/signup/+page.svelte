<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Validator } from "$lib/validate";
    import BackButton from "../BackButton.svelte";
    import ValidationErrors from "../ValidationErrors.svelte";

    let { form } = $props();

    // Form validation
    let name = $state("");
    let email = $state("");
    let password = $state("");
    let confirmPassword = $state("");

    const generalErrors: string[] = form ? [form.body.error] : [];

    let nameErrors: string[] = $state([]);
    let emailErrors: string[] = $state([]);
    let passwordErrors: string[] = $state([]);
    let confirmPasswordErrors: string[] = $state([]);

    const handleSubmit = (event: SubmitEvent) => {
        const v = new Validator();

        // Reset errors
        nameErrors = [];
        emailErrors = [];
        passwordErrors = [];
        confirmPasswordErrors = [];

        const vName = v.isValidName(name);
        if (!vName.ok) {
            nameErrors = vName.error;
            event.preventDefault();
        }

        const vEmail = v.isValidEmail(email);
        if (!vEmail.ok) {
            emailErrors = vEmail.error;
            event.preventDefault();
        }

        const vPassword = v.isStrongPassword(password);
        if (!vPassword.ok) {
            passwordErrors = vPassword.error;
            event.preventDefault();
        }

        if (password !== confirmPassword) {
            confirmPasswordErrors = ["Passwords do not match"];
            event.preventDefault();
        }
    };
</script>

<BackButton href="/auth" text="Back" />

<div class="space-y-2 text-center">
    <h2 class="text-2xl font-bold">Create your account</h2>
    <p class="text-gray-600">Sign up with your IAS email (@ias.edu required)</p>
</div>

<!-- Registration form -->
<form class="flex flex-col space-y-4" onsubmit={handleSubmit}>
    <ValidationErrors errors={generalErrors} />
    <div class="flex flex-col space-y-2">
        <ValidationErrors errors={nameErrors} />
        <label for="name" class="text-sm font-medium">Full Name</label>
        <input
            bind:value={name}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            class="auth-input" />
    </div>

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
            placeholder="Create a password"
            class="auth-input" />
    </div>

    <div class="flex flex-col space-y-2">
        <ValidationErrors errors={confirmPasswordErrors} />
        <label for="confirm-password" class="text-sm font-medium"
            >Confirm Password</label>
        <input
            bind:value={confirmPassword}
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm your password"
            class="auth-input" />
    </div>

    <Button
        type="submit"
        class="flex w-full items-center justify-center space-x-2 py-4 text-lg"
        variant="default">
        <span>Create Account</span>
    </Button>
</form>

<div class="text-center text-sm">
    <span class="text-gray-600">Already have an account? </span>
    <a href="/auth/ias/" class="text-blue-600 hover:underline">Sign In</a>
</div>
