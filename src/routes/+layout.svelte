<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import { navigating, page } from '$app/state';
	import Fullscreenloading from '$lib/components/modal/fullscreenloading.svelte';

	let { children } = $props();

	let visible = $state(false);

	$effect(() => {
		if (navigating.from) {
			visible = true;
		}

		if (navigating.to?.url.href === page.url.href) {
			visible = false;
		}
	});
</script>

{#if visible}
	<Fullscreenloading />
{/if}

{@render children()}

<Footer />
