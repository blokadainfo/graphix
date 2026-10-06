<script lang="ts">
	import { Switch } from 'bits-ui';
	import type { BooleanVariableDefinition } from '$lib/shared/types';

	let {
		variable
	}: {
		variable: BooleanVariableDefinition;
	} = $props();

    let value = $derived(variable.default_value);
</script>

<div class="mb-2 flex items-center gap-2">
	<Switch.Root
		class="h-6 w-16 cursor-pointer rounded-full bg-control outline-1 outline-chrome transition hover:bg-control-hover data-[state=checked]:bg-neutral-500 data-[state=checked]:hover:bg-neutral-400"
        checked={value}
    >
		<Switch.Thumb
			class="block h-6 w-8 rounded-full bg-white transition-transform data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0"
		/>
	</Switch.Root>
	<span class="text-md">
		{variable.display_name}
	</span>
</div>
