<script lang="ts">
	import logo from '$lib/assets/graphix.svg';
	import PanelHolder from '$lib/components/PanelHolder.svelte';
	import type { Graphics, UpdateGraphicMessage } from '$lib/shared/types.js';
	import { getDefaultVariableValue, type VariableDefinition } from '$lib/shared/variables.js';
	import { io } from 'socket.io-client';

	let { data } = $props();
	let graphics: Graphics = $derived(data.graphics);
	const webSocketIO = io();

	function getVariableValue<T>(graphic: string, variable: VariableDefinition): T {
		const variableName = variable.name;
		const currentValue = graphics[graphic].variables[variableName];
		if (currentValue == undefined) {
			const defaultValue = getDefaultVariableValue<T>(variable);
			updateGraphicVariable(graphic, variable, defaultValue);
			return defaultValue;
		} else {
			return currentValue;
		}
	}

	function updateGraphicVariable<T>(graphic: string, variable: VariableDefinition, value: T) {
		const message: UpdateGraphicMessage = {
			graphic,
			variable: variable.name,
			value
		};

		webSocketIO.emit('UpdateGraphic', message);
	}
</script>

<title>graphix - Dashboard</title>

<div class="h-fill flex flex-col">
	<div
		class="sticky top-0 z-10 h-16 shrink-0 grow-0 content-center bg-black px-4 py-2 outline outline-chrome"
	>
		<img class="h-full" src={logo} alt="graphix" />
	</div>
	{#if Object.keys(graphics).length > 0}
		<div class="flex grow flex-wrap gap-6 overflow-hidden p-4">
			{#each Object.keys(graphics) as graphic_name (graphic_name)}
				<PanelHolder
					graphic={graphic_name}
					getvariablevalue={(variable) => getVariableValue(graphic_name, variable)}
					onvariablechange={(variable, value) =>
						updateGraphicVariable(graphic_name, variable, value)}
				/>
			{/each}
		</div>
	{:else}
		<div class="flex grow content-center items-center justify-center">
			<p class="text-2xl">No graphics added yet</p>
		</div>
	{/if}
</div>
