<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	interface Props extends HTMLAttributes<HTMLElement> {
		children: Snippet;
	}

	const { children,  class: classname = '', ...rest }: Props = $props();
</script>

<div class={twMerge(`md:w-200 w-full p-6 ${classname}`)} {...rest}>
<!-- <div class={`md:w-${width} w-full p-6 ${classname}`} {...rest}> -->
	{@render children()}
</div>
