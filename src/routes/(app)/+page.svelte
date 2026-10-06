<script lang="ts">
	import logo from '$lib/assets/graphix.svg';
	import PanelHolder from '$lib/components/PanelHolder.svelte';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

	let { data } = $props();
	let graphics = $derived(data.graphics);

	onMount(async () => {
		const socket = io();
		window.addEventListener('message', ({ data }) => {
			switch (data.msg) {
				case "update":
					if (data.graphic && data.variables) {
						socket.emit('update_graphic', {
							graphic: data.graphic,
							variables: data.variables
						});
					}
					break;
				case "get_variables":
					{
						const graphic = data.graphic;
						if (graphic && graphics[graphic] && graphics[graphic].variables) {
							window.postMessage({
								msg: "send_variables",
								graphic: graphic,
								variables: graphics[graphic].variables
							})
						}
					}
					break;
			}
		});
	});
</script>

<title>graphix - Dashboard</title>

<div class="flex flex-col h-fill">
	<div
		class="sticky top-0 z-10 h-16 shrink-0 grow-0 content-center bg-black px-4 py-2 outline outline-chrome"
	>
		<img class="h-full" src={logo} alt="graphiX" />
	</div>
	{#if Object.keys(graphics).length > 0 }
		<div class="flex grow flex-wrap gap-6 overflow-hidden p-4">
			{#each Object.keys(graphics) as graphic_name (graphic_name)}
				<PanelHolder graphic={graphic_name} />
			{/each}
		</div>
	{:else}
		<div class="flex grow justify-center content-center align-center">
			<p class="text-2xl">No graphics added yet</p>
		</div>
	{/if}
</div>