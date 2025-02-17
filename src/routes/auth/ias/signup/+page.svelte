<script>
    import { Button } from "$lib/components/ui/button";
    import BackButton from "../BackButton.svelte";
</script>

<BackButton href="/auth" text="Back" />

<div class="space-y-2 text-center">
    <h2 class="text-2xl font-bold">Create your account</h2>
    <p class="text-gray-600">Sign up with your IAS email (@ias.edu required)</p>
</div>

<!-- Registration form -->
<form class="flex flex-col space-y-4">
    <div class="flex flex-col space-y-2">
        <label for="name" class="text-sm font-medium">Full Name</label>
        <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            class="auth-input"
            required />
    </div>

    <div class="flex flex-col space-y-2">
        <label for="email" class="text-sm font-medium">Email</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="your.email@ias.edu"
            class="auth-input"
            required />
    </div>

    <div class="flex flex-col space-y-2">
        <label for="password" class="text-sm font-medium">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            class="auth-input"
            required />
    </div>

    <div class="flex flex-col space-y-2">
        <label for="confirm-password" class="text-sm font-medium"
            >Confirm Password</label>
        <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm your password"
            class="auth-input"
            required />
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
