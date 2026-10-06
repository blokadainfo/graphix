<script lang="ts">
	import { Ellipsis} from '@lucide/svelte';
	import { DropdownMenu, Separator } from 'bits-ui';
	import { onMount } from 'svelte';
	import DropdownItem from './DropdownItem.svelte';
	import { resolve } from '$app/paths';
	import BooleanVariableInput from './BooleanVariableInput.svelte';
	import { isBooleanVariable, isLongTextVariable, isTextVariable, type GraphicInfo} from '$lib/shared/types';
	import TextVariableInput from './TextVariableInput.svelte';
	let { graphic } = $props();

	let loaded = $state(false);
	let info: GraphicInfo | undefined = $state();
	onMount(async () => {
		info = (await import(`$graphics/${graphic}/graphix_info.json`));
		loaded = true;
	});
</script>

<div
	class="h-fit rounded-xl bg-element px-4 py-2 outline-2 outline-chrome"
>
	<div class="flex min-w-80 items-center gap-8">
		<div class="grow font-bold">
			{#if loaded}
				{info ? info.name : graphic}
			{:else}
				...
			{/if}
		</div>
		<div class="grow-0">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="bg-control outline outline-chrome rounded-md p-1 hover:bg-control-hover cursor-pointer">
					<Ellipsis size=24/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Portal>
					<DropdownMenu.Content class="bg-control w-fit p-1 mt-2 outline outline-chrome rounded-md">
						<a href={resolve(`/graphics/${graphic}`)} title="View graphic in a new tab" target="_blank">
							<DropdownItem>
								View graphic
							</DropdownItem>
						</a>
						<DropdownItem>
							Copy graphic link
						</DropdownItem>
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	</div>
	<div>
		{#each info?.variables as variable (variable.name)}
			<Separator.Root class="border my-2 border-chrome"/>
			{#if isLongTextVariable(variable) || isTextVariable(variable)}
				<TextVariableInput variable={variable}/>
			{:else if isBooleanVariable(variable)}
				<BooleanVariableInput variable={variable}/>
			{:else}
				<p class="text-red-400 font-bold">
					Please check your definition for variable '{variable.name}'.
				</p>
				<p class="text-red-300">
					Unknown type '{variable.type}'.
				</p>
			{/if}
		{/each}
	</div>
</div>