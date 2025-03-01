<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	interface Props extends HTMLImgAttributes {}

	let { ...rest }: Props = $props();

	let loading = $state(true);
</script>

<div class="size-full">
	{#if loading}
		<div transition:fade class="size-full animate-pulse bg-stone-300"></div>
	{/if}
	<img
		class={`${rest.class} ${loading ? 'hidden' : ''}`}
		src={rest.src}
		alt={rest.alt}
		onload={() => (loading = false)}
	/>
</div>
