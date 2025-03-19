<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
  </script>

<div class="border border-blue-400">Profile Info
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

