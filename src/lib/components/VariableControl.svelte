<script lang="ts">
	import {
		isBooleanVariable,
		isLongTextVariable,
		isTableMetaVariable,
		isTextVariable,
		type VariableDefinition
	} from '$lib/shared/variables';
	import BooleanVariableInput from './BooleanVariableInput.svelte';
	import TableMetaVariableInput from './TableMetaVariableInput.svelte';
	import TextVariableInput from './TextVariableInput.svelte';

	let {
		variable,
		onchange,
		getvalue,
		inTable
	}: {
		variable: VariableDefinition;
		onchange: <T>(value: T) => void;
		getvalue: <T>() => T;
		inTable?: boolean;
	} = $props();
</script>

{#if isLongTextVariable(variable) || isTextVariable(variable)}
	<TextVariableInput {variable} {onchange} {getvalue} {inTable} />
{:else if isBooleanVariable(variable)}
	<BooleanVariableInput {variable} {onchange} {getvalue} {inTable} />
{:else if isTableMetaVariable(variable)}
	<TableMetaVariableInput {variable} {onchange} {getvalue} />
{:else}
	<p class="font-bold text-red-400">
		Please check your definition for variable '{variable.name}'.
	</p>
	<p class="text-red-300">
		Unknown type '{variable.type}'.
	</p>
{/if}
