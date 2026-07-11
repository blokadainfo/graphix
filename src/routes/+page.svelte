<script lang="ts">
	import logo from '$lib/assets/graphix.svg';
	import PanelHolder from '$lib/components/PanelHolder.svelte';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

	let { data } = $props();
	const graphics_variables = data.graphics;

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
						if (graphic && graphics_variables[graphic] && graphics_variables[graphic].variables) {
							window.postMessage({
								msg: "send_variables",
								graphic: graphic,
								variables: graphics_variables[graphic].variables
							})
						}
					}
					break;
			}
		});
	});
</script>

<title>graphix - Dashboard</title>

<div class="flex flex-col">
	<div
		class="sticky top-0 z-10 h-16 shrink-0 grow-0 content-center bg-black px-4 py-0"
		style="filter: drop-shadow(0px 0px 12px #000000ae);"
	>
		<img class="h-[70%]" src={logo} alt="graphiX" />
	</div>
	<div class="flex grow flex-wrap gap-4 overflow-hidden p-8">
		{#each Object.keys(data.graphics) as graphic_name (graphic_name)}
			<PanelHolder graphic={graphic_name} />
		{/each}
	</div>
</div>

<style>
	:global(body) {
		background-color: #101e17;
		color: #ffffff;
	}
</style>
