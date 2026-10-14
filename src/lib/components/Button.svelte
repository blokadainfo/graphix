<script lang="ts">
	import { Button } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	let {
		children,
		classes,
		onclick,
		custom_padding
	}: {
		children: Snippet;
		classes?: string;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		custom_padding?: boolean;
	} = $props();
</script>

<Button.Root
	{onclick}
	class="rounded-md bg-control {custom_padding
		? ''
		: 'p-1 px-4'} cursor-pointer border border-chrome hover:bg-control-hover {classes}"
>
	{@render children?.()}
</Button.Root>
