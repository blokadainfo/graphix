<script lang="ts">
	import type { BooleanVariableDefinition } from '$lib/shared/variables';
	import { Switch } from 'bits-ui';

	let {
		variable,
		onchange,
		getvalue,
		inTable
	}: {
		variable: BooleanVariableDefinition;
		onchange: (value: boolean) => void;
		getvalue: () => boolean;
		inTable?: boolean;
	} = $props();

	// svelte-ignore state_referenced_locally
	let value = $state(getvalue());
</script>

<div class="mb-2 flex items-center gap-2">
	<Switch.Root
		class="h-6 w-16 cursor-pointer rounded-full bg-control outline-1 outline-chrome transition hover:bg-control-hover data-[state=checked]:bg-neutral-500 data-[state=checked]:hover:bg-neutral-400"
		checked={value}
		onCheckedChange={onchange}
	>
		<Switch.Thumb
			class="block h-6 w-8 rounded-full bg-white transition-transform data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0"
		/>
	</Switch.Root>
	{#if !inTable}
		<span class="text-md">
			{variable.display_name}
		</span>
	{/if}
</div>
