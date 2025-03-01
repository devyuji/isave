<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	interface propsType {
		children: Snippet;
		onClose: () => void;
		class?: string;
		shouldCloseByEsc?: boolean;
	}

	let { children, onClose, class: className = '', shouldCloseByEsc = true }: propsType = $props();

	$effect(() => {
		document.body.style.overflow = 'hidden';

		return () => (document.body.style.overflow = 'visible');
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={`fixed top-0 right-0 left-0 z-50 h-full w-full bg-stone-300/80 ${className}`}
	onclick={onClose}
	transition:fade={{ duration: 250 }}
>
	{@render children()}
</div>
