<script lang="ts">
	import { DropdownMenu } from "bits-ui";
    let { children } = $props();
</script>
<DropdownMenu.Item class="h-10 w-fill flex items-center pl-2 pr-4 rounded-md hover:bg-control-hover select-none text-sm text-nowrap cursor-pointer">
    {@render children?.()}
</DropdownMenu.Item>