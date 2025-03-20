<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
  </script>

<div class="border border-blue-400 w-full max-w-6xl p-6 relative">
    <div class="w-full">
        <div class="flex justify-between items-center mb-6">
            <span>Profile Info</span>
            <button class="bg-blue-400 hover:bg-blue-200 text-white font-bold py-1 px-3 rounded">
                Edit
            </button>
        </div>
    
        <div class="flex justify-center mb-6">
            <div class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <!-- You can add an img tag here if you have a specific image -->
                <span class="text-gray-500">Profile Pic</span>
            </div>
        </div>
    
        <div class="flex flex-col items-center gap-4">
            <div class="flex w-full max-w-sm flex-col gap-1.5">
                <Label for="name">Name</Label>
                <Input type="name" id="name" placeholder="TigerApps" />
            </div>
            <div class="flex w-full max-w-sm flex-col gap-1.5">
                <Label for="email">Email</Label>
                <Input type="email" id="email" placeholder="TigerApps@gmail.com" />
            </div>
            <div class="flex w-full max-sm flex-col gap-1.5">
                <Label for="bio"> Bio</Label>
                <Input type="bio" id="bio" placeholder="Hello, I am TigerApps" />
            </div>
            <div class="flex w-full max-sm flex-col gap-1.5">
                <Label for="number"> Phone #</Label>
                <Input type="number" id="number" placeholder="123-456-7890" />
            </div>
            <div class="flex w-full max-sm flex-col gap-1.5">
                <Label for="payment"> Venmo/Zelle</Label>
                <Input type="payment" id="payment" placeholder="@TigerApps" />
            </div>
        </div>

    </div>
    
</div>

