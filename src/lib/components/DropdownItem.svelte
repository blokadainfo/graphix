<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	let { children } = $props();
</script>

<DropdownMenu.Item
	class="w-fill flex h-10 cursor-pointer items-center rounded-md pr-4 pl-2 text-sm text-nowrap select-none data-highlighted:bg-control-hover"
>
	{@render children?.()}
</DropdownMenu.Item>
