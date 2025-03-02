<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	interface Props extends HTMLImgAttributes {
		selected: boolean;
	}

	let { selected, ...rest }: Props = $props();

	let loading = $state(true);
</script>

<div class="size-full">
	{#if loading}
		<div transition:fade class="size-full animate-pulse bg-stone-100"></div>
	{/if}
	<img
		class={`${rest.class} transition-transform ${loading ? 'hidden' : ''} ${selected ? 'scale-95' : ''}`}
		src={rest.src}
		alt={rest.alt}
		onload={() => (loading = false)}
	/>
</div>
