<script lang="ts"> 
	import { Button } from "bits-ui";
	import type { Snippet } from "svelte";
    let { children, classes }: {
        children: Snippet,
        classes?: string
    } = $props();
</script>
<Button.Root class="px-4 bg-control rounded-md p-1 border border-chrome hover:bg-control-hover cursor-pointer {classes}">
    {@render children?.()}
</Button.Root>