<script lang="ts">
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import { Calendar } from "$lib/components/ui/calendar/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { cn } from "$lib/utils.js";
    import {
        DateFormatter,
        type DateValue,
        getLocalTimeZone,
        today
    } from "@internationalized/date";
    import CalendarIcon from "@lucide/svelte/icons/calendar";

    interface Props {
        value: DateValue | undefined;
    }

    let { value = $bindable() }: Props = $props();

    const df = new DateFormatter("en-US", {
        dateStyle: "long"
    });

    const valueString = $derived(
        value ? df.format(value.toDate(getLocalTimeZone())) : ""
    );

    const items = [
        { value: 1, label: "Tomorrow" },
        { value: 7, label: "In a week" },
        { value: 30, label: "In a month" },
        { value: 182, label: "In 6 months" }
    ];
</script>

<Popover.Root>
    <Popover.Trigger
        class={cn(
            buttonVariants({
                variant: "outline",
                class: "w-full justify-start text-left font-normal"
            }),
            !value && "text-muted-foreground"
        )}>
        <CalendarIcon class="mr-2 size-4" />
        {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
    </Popover.Trigger>
    <Popover.Content class="flex w-auto flex-col space-y-2 p-2">
        <Select.Root
            type="single"
            bind:value={
                () => valueString,
                (v) => {
                    if (!v) return;
                    value = today(getLocalTimeZone()).add({
                        days: Number.parseInt(v)
                    });
                }
            }>
            <Select.Trigger>
                {valueString}
            </Select.Trigger>
            <Select.Content>
                {#each items as item (item.value)}
                    <Select.Item value={`${item.value}`}
                        >{item.label}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
        <div class="rounded-md border">
            <Calendar type="single" bind:value />
        </div>
    </Popover.Content>
</Popover.Root>
