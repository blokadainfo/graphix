<script lang="ts">
	import Button from './Button.svelte';
	import { getDefaultVariableValue, type NumberVariableDefinition } from '$lib/shared/variables';

	let {
		variable,
		onchange,
		getvalue,
		inTable
	}: {
		variable: NumberVariableDefinition;
		onchange: (value: number) => void;
		getvalue: () => number;
		inTable?: boolean;
	} = $props();

	// svelte-ignore state_referenced_locally
	let value = $state(getvalue());

	function onApply() {
		onchange(value);
	}

	function onApplyDefault() {
		value = getDefaultVariableValue(variable);
		onApply();
	}

	function onTextChange() {
		if (inTable) {
			onchange(value);
		}
	}
</script>

<div class="mb-2 flex flex-col gap-2">
	{#if !inTable}
		<span class="text-sm">
			{variable.display_name}
		</span>
	{/if}
	<input
		class="min-h-10 rounded-md border border-chrome bg-control p-2"
		placeholder={variable.placeholder}
		oninput={onTextChange}
		inputmode="numeric"
		pattern="[0-9]*"
		bind:value
	/>

	{#if !inTable}
		<div class="flex gap-2">
			<Button classes="grow" onclick={() => onApply()}>Apply</Button>
			{#if variable.default_value}
				<Button classes="grow" onclick={() => onApplyDefault()}>Apply default</Button>
			{/if}
		</div>
	{/if}
</div>
