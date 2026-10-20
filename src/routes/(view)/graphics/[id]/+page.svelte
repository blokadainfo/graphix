<script lang="ts">
	import { onMount, type Component } from 'svelte';
	import type { PageProps } from './$types';
	import { io } from 'socket.io-client';
	import type { VariableUpdatedMessage } from '$lib/shared/types';

	let View: Component<{ variables: unknown }> | undefined = $state();
	const { params, data }: PageProps = $props();
	const graphicID = $derived(params.id);
	// svelte-ignore state_referenced_locally
	let variables = $state(data.variables);

	onMount(async () => {
		let viewName = data.viewName;
		if (viewName == null) {
			viewName = 'View';
		}
		View = (await import(`$graphics/${graphicID}/views/${viewName}.svelte`)).default;

		const webSocketIO = io();
		webSocketIO.on(`VariableUpdated_${graphicID}`, (message: VariableUpdatedMessage) => {
			variables[message.variable] = message.value;
		});
	});
</script>

<svelte:head>
	<title>graphix - '{graphicID}'</title>
</svelte:head>

<View {variables} />
