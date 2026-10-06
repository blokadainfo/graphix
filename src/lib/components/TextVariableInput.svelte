<script lang="ts">
	import type { TextVariableDefinition } from "$lib/shared/types";
	import Button from "./Button.svelte";

    let { variable }: {
        variable: TextVariableDefinition
    } = $props();
</script>

<div class="flex flex-col gap-2 mb-2">
    <span class="text-sm">
        {variable.display_name}
    </span>
    {#if variable.type == "longtext"}
        <textarea class="bg-control rounded-md border border-chrome p-2 min-h-10" placeholder="{variable.placeholder}">{variable.default_value}</textarea>
    {:else}
        <input class="bg-control rounded-md border border-chrome p-2 min-h-10" placeholder="{variable.placeholder}"/>
    {/if}
    
    <div class="flex gap-2">
        <Button classes="grow">
            Apply
        </Button>
        {#if variable.default_value}
            <Button classes="grow">
                Apply default
            </Button>
        {/if}
    </div>
</div>