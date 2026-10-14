<script lang="ts">
	import { Ellipsis } from '@lucide/svelte';
	import { DropdownMenu, Separator } from 'bits-ui';
	import { onMount } from 'svelte';
	import DropdownItem from './DropdownItem.svelte';
	import { resolve } from '$app/paths';
	import BooleanVariableInput from './BooleanVariableInput.svelte';
	import {
		isBooleanVariable,
		isLongTextVariable,
		isTextVariable,
		type GraphicInfo,
		type VariableDefinition
	} from '$lib/shared/types';
	import TextVariableInput from './TextVariableInput.svelte';
	let {
		graphic,
		onvariablechange,
		getvariablevalue
	}: {
		graphic: string;
		onvariablechange: (variable: VariableDefinition, value: unknown) => void;
		getvariablevalue: (variable: VariableDefinition, defaultValue: unknown) => unknown;
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
			{#if isLongTextVariable(variable) || isTextVariable(variable)}
				<TextVariableInput
					{variable}
					onchange={(value) => onvariablechange(variable, value)}
					getvalue={(defaultValue) => getvariablevalue(variable, defaultValue)}
				/>
			{:else if isBooleanVariable(variable)}
				<BooleanVariableInput
					{variable}
					onchange={(value) => onvariablechange(variable, value)}
					getvalue={(defaultValue) => getvariablevalue(variable, defaultValue)}
				/>
			{:else}
				<p class="font-bold text-red-400">
					Please check your definition for variable '{variable.name}'.
				</p>
				<p class="text-red-300">
					Unknown type '{variable.type}'.
				</p>
			{/if}
		{/each}
	</div>
</div>
