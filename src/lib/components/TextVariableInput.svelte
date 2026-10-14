<script lang="ts">
	import type { TextVariableDefinition } from '$lib/shared/types';
	import { Save, Trash } from '@lucide/svelte';
	import Button from './Button.svelte';

	let {
		variable,
		onchange,
		getvalue
	}: {
		variable: TextVariableDefinition;
		onchange: (value: string) => void;
		getvalue: (defaultValue: string) => unknown;
	} = $props();

	let defaultValue = $derived(variable.default_value || '');
	let value = $derived(String(getvalue(defaultValue)));
	let options: string[] = $state([]);

	function onApply() {
		onchange(value);
	}

	function onApplyDefault() {
		value = variable.default_value || '';
		onApply();
	}

	function onSaveOption() {
		if (options.find((option) => option === value)) return;
		options.push(value);
	}

	function onApplyOption(optionValue: string) {
		value = optionValue;
		onApply();
	}

	function onDeleteOption(index: number) {
		options.splice(index, 1);
	}
</script>

<div class="mb-2 flex flex-col gap-2">
	<span class="text-sm">
		{variable.display_name}
	</span>
	{#each options.entries() as [i, option] (i)}
		<div
			class="flex h-10 items-center justify-between gap-2 rounded-md border border-chrome bg-control p-2 pl-0"
		>
			<Button
				classes="flex justify-between items-center h-8 bg-transparent border-0 grow pl-2"
				custom_padding
				onclick={() => onApplyOption(option)}
			>
				{option}
			</Button>
			<Button
				classes="h-8 w-8 flex justify-center items-center text-red-500"
				custom_padding
				onclick={() => onDeleteOption(i)}
			>
				<Trash size="18" />
			</Button>
		</div>
	{/each}
	{#if variable.type == 'longtext'}
		<textarea
			class="min-h-10 rounded-md border border-chrome bg-control p-2"
			placeholder={variable.placeholder}
			bind:value
		></textarea>
	{:else}
		<input
			class="min-h-10 rounded-md border border-chrome bg-control p-2"
			placeholder={variable.placeholder}
			bind:value
		/>
	{/if}

	<div class="flex gap-2">
		<Button classes="grow" onclick={() => onApply()}>Apply</Button>
		{#if variable.default_value}
			<Button classes="grow" onclick={() => onApplyDefault()}>Apply default</Button>
		{/if}
		{#if variable.can_save_options}
			<Button classes="grow flex justify-center items-center gap-1" onclick={() => onSaveOption()}>
				<Save size="20" />
				Save option
			</Button>
		{/if}
	</div>
</div>
