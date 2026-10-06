<script lang="ts">
	import { onMount, type Component } from 'svelte';
	import type { PageProps } from './$types';
	import { io } from 'socket.io-client';

	let View: Component | undefined = $state();
	const { params, data }: PageProps = $props();
	const graphics_id = $derived(params.id);
	onMount(async () => {
		View = (await import(`$graphics/${graphics_id}/View.svelte`)).default;

		window.postMessage(data.variables);

		const socket = io();

		socket.on(`graphics_updated_${graphics_id}`, (message) => {
			console.log(message);
			window.postMessage(message);
		});
	});
</script>

<svelte:head>
	<title>graphix - '{graphics_id}'</title>
</svelte:head>

<View />
