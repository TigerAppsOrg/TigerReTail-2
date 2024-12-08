<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    let items = [
        { id: "accessories", label: "Accessories", checked: false },
        { id: "beauty", label: "Beauty Supplies", checked: false },
        { id: "clothing", label: "Clothing", checked: false },
        { id: "dorm", label: "Dorm Essentials", checked: false },
        { id: "event", label: "Event Tickets", checked: false },
        { id: "food", label: "Food", checked: false },
        { id: "furniture", label: "Furniture", checked: false },
        { id: "housing", label: "Housing", checked: false },
        { id: "other", label: "Other", checked: false },
        { id: "schoolsupp", label: "School Supplies", checked: false },
        { id: "services", label: "Services", checked: false },
        { id: "tech", label: "Tech", checked: false },
        { id: "textbooks", label: "Texbooks", checked: false },
        { id: "transportation", label: "Transportation", checked: false }
    ];
    let items2 = [
        { id: "new", label: "New", checked: false },
        { id: "excellent", label: "Excellent", checked: false },
        { id: "good", label: "Good", checked: false },
        { id: "fair", label: "Fair", checked: false },
        { id: "poor", label: "Poor", checked: false }
    ];
</script>

<div class="flex size-full flex-col space-y-2">
    <p class="size-10 text-xl">Categories</p>
    {#each items as item (item.id)}
        <div class="flex items-center space-x-2">
            <Checkbox
                id={item.id}
                bind:checked={item.checked}
                aria-labelledby={`${item.id}-label`} />
            <Label
                id={`${item.id}-label`}
                for={item.id}
                class="font-small rounded-sm text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {item.label}
            </Label>
        </div>
    {/each}
    <p class="size-10 text-xl">Conditions</p>
    {#each items2 as item (item.id)}
        <div class="flex items-center space-x-2">
            <div class="flex items-center space-x-2">
                <Checkbox
                    id={item.id}
                    bind:checked={item.checked}
                    aria-labelledby={`${item.id}-label`} />
                <Label
                    id={`${item.id}-label`}
                    for={item.id}
                    class="font-small rounded-sm text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {item.label}
                </Label>
            </div>
        </div>
    {/each}
</div>
