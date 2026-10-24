<script lang="ts">
	import { Plus, Trash } from '@lucide/svelte';
	import Button from './Button.svelte';
	import VariableControl from './VariableControl.svelte';
	import {
		getDefaultVariableValue,
		type TableMetaVariableDefinition,
		type VariableDefinition
	} from '$lib/shared/variables';
	import type { GraphicVariables, VariableData } from '$lib/shared/types';

	let {
		variable,
		onchange,
		getvalue
	}: {
		variable: TableMetaVariableDefinition;
		onchange: (value: GraphicVariables[]) => void;
		getvalue: () => GraphicVariables[];
	} = $props();

	// svelte-ignore state_referenced_locally
	let value: GraphicVariables[] = $state(getvalue());

	function newRow() {
		value.push({});
		onchange(value);
	}

	function deleteRow(index: number) {
		value.splice(index, 1);
		onchange(value);
	}

	function onRowChange<T>(row: number, varDef: VariableDefinition, varValue: T) {
		value[row][varDef.name] = varValue as VariableData;
	}

	function onGetValue<T>(row: number, varDef: VariableDefinition): T {
		const varValue = value[row][varDef.name];
		if (varValue == undefined) {
			const defaultValue = getDefaultVariableValue<T>(varDef);
			value[row][varDef.name] = defaultValue as VariableData;
			return defaultValue;
		} else {
			return varValue;
		}
	}

	function onApply() {
		onchange(value);
	}
</script>

<table>
	<thead>
		<tr>
			{#each variable.variables as varDef (varDef.name)}
				<th class="pr-2 pb-2 text-left text-sm">{varDef.display_name}</th>
			{/each}
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each value.entries() as [i, row] (row)}
			<tr>
				{#each variable.variables as varDef (varDef.name)}
					<td class="pr-2">
						<VariableControl
							variable={varDef}
							onchange={(value) => onRowChange(i, varDef, value)}
							getvalue={() => onGetValue(i, varDef)}
							inTable
						/>
					</td>
				{/each}
				<td class="flex">
					<Button
						classes="h-10.5 w-10.5 flex justify-center items-center text-red-500"
						custom_padding
						onclick={() => deleteRow(i)}
					>
						<Trash size="18" />
					</Button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<div class="flex w-full justify-center">
	<Button onclick={newRow} classes="flex justify-center items-center gap-1"
		><Plus size="18" />New row</Button
	>
</div>

<Button onclick={onApply}>Apply</Button>
