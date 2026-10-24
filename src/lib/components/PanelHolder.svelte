<script lang="ts">
	import { Ellipsis } from '@lucide/svelte';
	import { DropdownMenu, Separator } from 'bits-ui';
	import { onMount } from 'svelte';
	import DropdownItem from './DropdownItem.svelte';
	import { resolve } from '$app/paths';
	import { type GraphicInfo } from '$lib/shared/types';
	import VariableControl from './VariableControl.svelte';
	import type { VariableDefinition } from '$lib/shared/variables';
	let {
		graphic,
		onvariablechange,
		getvariablevalue
	}: {
		graphic: string;
		onvariablechange: <T>(variable: VariableDefinition, value: T) => void;
		getvariablevalue: <T>(variable: VariableDefinition) => T;
	} = $props();

	let loaded = $state(false);
	let info: GraphicInfo | undefined = $state();
	onMount(async () => {
		info = await import(`$graphics/${graphic}/graphix_info.json`);
		loaded = true;
	});
</script>

<div class="h-fit rounded-xl bg-element px-4 py-2 outline-2 outline-chrome">
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
				<DropdownMenu.Trigger
					class="cursor-pointer rounded-md bg-control p-1 outline outline-chrome hover:bg-control-hover"
				>
					<Ellipsis size="24" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Portal>
					<DropdownMenu.Content class="mt-2 w-fit rounded-md bg-control p-1 outline outline-chrome">
						<a
							href={resolve(`/graphics/${graphic}`)}
							title="View graphic in a new tab"
							target="_blank"
						>
							<DropdownItem>View graphic</DropdownItem>
						</a>
						<!--
						TODO: Implement this option
						<DropdownItem>
							Copy graphic link
						</DropdownItem>
						-->
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	</div>
	<div>
		{#each info?.variables as variable (variable.name)}
			<Separator.Root class="my-2 border border-chrome" />
			<VariableControl
				{variable}
				onchange={(value) => onvariablechange(variable, value)}
				getvalue={() => getvariablevalue(variable)}
			/>
		{/each}
	</div>
</div>
