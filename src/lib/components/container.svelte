<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		children: Snippet;
	}

	const { children, class: classname = '', ...rest }: Props = $props();
</script>

<div class={`md:w-150 w-full p-6 ${classname}`} {...rest}>
	{@render children()}
</div>
